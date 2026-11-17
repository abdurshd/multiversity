/* Exhaustive deterministic coordination tests. No epidemiological model or GPU claims. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }, fileName: filename,
    }); module._compile(outputText, filename);
};
const { covidPandemicScript: script } = require('../src/experience/scripts/covidPandemic.ts');
const { useExperience } = require('../src/experience/store.ts');
const { localizeScript } = require('../src/experience/localizeScript.ts');
const model = require('../src/experience/covid/model.ts');
const { useCovidShift, openCovidReport, openCovidManifest, chooseCovidOption, advanceCovidScene, allocate, emptyAllocation, totalCrates, validAllocation, allocationFlags } = model;
const run = () => useExperience.getState(), shift = () => useCovidShift.getState();
let assertions = 0, paths = 0;
function check(condition, message) { assert.ok(condition, message); assertions++; }
function same(a, b, message) { assert.deepEqual(a, b, message); assertions++; }
function snapshot() { return JSON.stringify({ phase: run().phase, beat: run().beatId, stats: run().stats, flags: run().flags, visits: run().visitedHotspots, allocation: shift().allocation, sealed: shift().sealed }); }
function start(skip = true) {
    shift().reset(); run().loadScript(script); run().begin();
    if (skip) advanceCovidScene('arrival', 0, true); else { advanceCovidScene('arrival', 0); advanceCovidScene('arrival', 1); }
}
function inspect() { for (const id of ['ward', 'ledger', 'radio']) openCovidReport(id); openCovidReport(null); openCovidManifest(); }
function fill(a) { for (const id of model.DESTINATIONS) for (let n = 0; n < a[id]; n++) shift().adjust(id, 1); }
const reached = new Set();
function record() { reached.add(run().beatId); }
// Shape and integration.
check(require('../src/experience/scripts/index.ts').hasExperience('covid-pandemic'), 'Chapter is discoverable');
same(new Set(script.endings.map(e => e.id)).size, script.endings.length, 'Ending ids unique');
for (const [id, beat] of Object.entries(script.beats)) {
    same(beat.id, id, 'Beat key matches id'); check(beat.kind !== 'battle', 'No military reskin');
    if (beat.kind === 'cinematic') { check(!!script.beats[beat.next], 'Cinematic target exists'); check(beat.shots.every(s => s.duration > 0 && s.path.length >= 2 && s.lookPath.length > 0), 'Shots valid'); }
    if (beat.kind === 'choice') beat.options.forEach(o => { check(!!script.beats[o.next], 'Choice target exists'); check(!o.effects, 'No numeric health score'); });
}
// Bounds, malformed inputs, zero-sum capacity.
let a = emptyAllocation();
same(allocate(a, 'clinic', -1), a, 'No negative crates');
same(allocate(a, 'clinic', NaN), a, 'Reject NaN');
same(allocate(a, 'hospital', 0.5), a, 'Reject fractional increments');
same(allocate(a, 'invalid', 1), a, 'Reject unknown destination');
check(!validAllocation({hospital:NaN,clinic:0,outreach:0}), 'Reject invalid starting state');
same(allocationFlags(a), [], 'Incomplete manifest cannot create flags');
for (let n = 0; n < 10; n++) a = allocate(a, 'hospital', 1);
same(totalCrates(a), 6, 'Total never exceeds six');
// Read/close/repeat and gate.
start(false); same(run().beatId, 'reports', 'Manual narration reaches reports');
openCovidManifest(); same(run().beatId, 'reports', 'Cannot skip evidence');
openCovidReport('invalid'); same(run().visitedHotspots, [], 'Unknown report ignored');
openCovidReport('ward'); openCovidReport('ward'); same(run().visitedHotspots, ['ward'], 'Report visit idempotent');
openCovidReport(null); same(run().activeHotspotId, null, 'Close preserves progress');
openCovidManifest(); same(run().beatId, 'reports', 'Partial evidence cannot dispatch');
inspect(); const incomplete = snapshot(); shift().seal(); same(snapshot(), incomplete, 'Cannot seal incomplete manifest');
fill({hospital:3,clinic:2,outreach:1}); shift().adjust('hospital', -1); same(totalCrates(shift().allocation), 5, 'Editable before sealing'); shift().adjust('hospital', 1);
shift().seal(); const sealed = snapshot(); shift().seal(); shift().adjust('clinic', -1); openCovidReport('ward'); openCovidManifest(); same(snapshot(), sealed, 'Sealed shipment and old report clicks are immutable');
advanceCovidScene('loading', 0, true); chooseCovidOption('roster', 'continuity'); const chosen = snapshot(); chooseCovidOption('roster', 'surge'); same(snapshot(), chosen, 'Stale repeated choice cannot alter next beat');
chooseCovidOption('briefing', 'certainty'); chooseCovidOption('correction', 'correct');
check(run().flags.includes('choice:briefing:certainty') && !run().flags.includes('choice:briefing:transparent'), 'Corrected promise retains truthful audit trail');
advanceCovidScene('handover', 0, true); const ended = snapshot(); advanceCovidScene('handover', 0, true); same(snapshot(), ended, 'Repeated ending skip is inert');
// Chapter-local helpers also reject inconsistent/non-interactive phases.
start(); useExperience.setState({phase:'loading'}); const nonInteractive = snapshot();
openCovidReport('ward'); openCovidManifest(); same(snapshot(), nonInteractive, 'Report helpers require explore phase');
useExperience.setState({phase:'explore'}); inspect(); fill({hospital:3,clinic:2,outreach:1});
useExperience.setState({phase:'loading'}); const nonManifest = snapshot(); shift().adjust('clinic', -1); shift().seal();
same(snapshot(), nonManifest, 'Manifest helpers require explore phase');
// Every legal final allocation, roster decision, and communication branch.
const outcomes = {};
for (let hospital = 0; hospital <= 6; hospital++) for (let clinic = 0; clinic <= 6 - hospital; clinic++) {
    const outreach = 6 - hospital - clinic;
    for (const roster of ['continuity', 'surge']) for (const communication of ['transparent', 'correct', 'silent']) {
        start(); reached.add('arrival'); record(); inspect(); record(); fill({hospital, clinic, outreach}); shift().seal(); record();
        advanceCovidScene('loading', 0, paths % 2 === 0); record(); chooseCovidOption('roster', roster); record();
        chooseCovidOption('briefing', communication === 'transparent' ? 'transparent' : 'certainty'); record();
        if (communication !== 'transparent') { chooseCovidOption('correction', communication); record(); }
        advanceCovidScene('handover', 0, paths % 2 === 0); record();
        const expected = communication === 'silent' ? 'trust' : [hospital,clinic,outreach].includes(0) || roster === 'surge' ? 'gap' : hospital >= 3 && clinic >= 2 && outreach >= 1 ? 'shared' : 'partial';
        same(run().ending?.id, expected, `Expected ending for ${hospital}/${clinic}/${outreach}, ${roster}, ${communication}`);
        same(run().stats, script.initialStats, 'No disease metric masquerading as forecast');
        check(run().flags.length === new Set(run().flags).size, 'Flags remain unique');
        outcomes[expected] = (outcomes[expected] ?? 0) + 1; paths++;
    }
}
same(paths, 168, 'Exhaust all 28 allocations × 2 rosters × 3 communication paths');
same(reached.size, Object.keys(script.beats).length, 'All beats reached');
same(Object.keys(outcomes).sort(), ['gap','partial','shared','trust'], 'All four endings reachable');
// Reset both stores, reuse, localization parity and namespace coverage.
shift().reset(); run().reset();
check(run().phase === 'loading' && !run().ending && !run().activeHotspotId, 'Reset clears UI state');
same(run().flags, [], 'Reset clears decisions'); same(run().visitedHotspots, [], 'Reset clears evidence'); same(shift().allocation, emptyAllocation(), 'Reset clears manifest'); check(!shift().sealed, 'Reset unseals');
function leaves(obj, prefix = '') { return Object.entries(obj).flatMap(([k,v]) => typeof v === 'string' ? [[prefix+k,v]] : leaves(v, prefix+k+'.')); }
const en = require('../src/locales/en/experience/covid-pandemic.json');
for (const language of ['en', 'uz', 'ko']) {
    const copy = require(`../src/locales/${language}/experience/covid-pandemic.json`);
    same(leaves(copy).map(([k]) => k).sort(), leaves(en).map(([k]) => k).sort(), `${language}: complete key parity`);
    for (const [key,value] of leaves(copy)) check(value.trim().length > 0, `${language}: nonempty ${key}`);
    const requests = [];
    const localized = localizeScript(script, key => {
        const path = key.split(':')[1]; requests.push(path);
        const value = path.split('.').reduce((o,k) => o?.[k], copy);
        check(typeof value === 'string', `${language}: no fallback for ${path}`); return value;
    });
    same(Object.keys(localized.beats), Object.keys(script.beats), 'Translation preserves graph');
    check(requests.length > 30, 'All script text localized');
    run().loadScript(localized); run().begin(); advanceCovidScene('arrival', 0, true); same(run().beatId, 'reports', `${language}: playable localized script`);
}
// CPU-only geometry audit. This does not establish visual quality or frame rate.
const { buildArchitecture } = require('../src/experience/covid/architecture.ts');
for (const env of ['covid-hospital', 'covid-depot', 'covid-briefing']) {
    const batches = buildArchitecture(env);
    check(batches.length <= 16, `${env}: bounded static material batches`);
    let triangles = 0;
    for (const { geometry, material } of batches) {
        check([...geometry.getAttribute('position').array].every(Number.isFinite), `${env}: finite positions`);
        check([...geometry.getAttribute('normal').array].every(Number.isFinite), `${env}: finite normals`);
        geometry.computeBoundingBox(); check(geometry.boundingBox.min.y > -1, `${env}: no underground scene`);
        triangles += (geometry.index?.count ?? geometry.getAttribute('position').count) / 3;
        geometry.dispose(); material.dispose();
    }
    check(triangles < 20000, `${env}: bounded geometry count`);
    console.log(`${env}: ${batches.length} merged static batches, ${triangles} triangles (CPU audit only).`);
}

console.log(`COVID checks passed: ${assertions} assertions; ${paths} complete paths; ${reached.size} beats; endings ${JSON.stringify(outcomes)}. Browser and GPU testing are separate.`);

// Injected capability stubs, not an actual browser/GPU test.
const { canRenderCovid3D } = require('../src/experience/covid/webgl.ts');
let capabilityChecks = 0;
const capabilityCheck = (value, message) => { assert.ok(value, message); capabilityChecks++; };
capabilityCheck(!canRenderCovid3D(), 'No DOM produces text fallback');
capabilityCheck(!canRenderCovid3D(() => ({getContext:()=>null})), 'Missing WebGL2 produces text fallback');
capabilityCheck(!canRenderCovid3D(() => ({getContext:()=>{throw new Error('blocked');}})), 'Context exception produces text fallback');
let releasedContext = 0;
capabilityCheck(canRenderCovid3D(() => ({getContext:(kind,options)=>{
    capabilityCheck(kind==='webgl2'&&options.antialias===true&&options.powerPreference==='low-power', 'Probe matches renderer requirements');
    return {getExtension:()=>({loseContext:()=>releasedContext++})};
}})), 'Supported WebGL2 permits scene');
capabilityCheck(releasedContext===1, 'Probe releases temporary context');
capabilityCheck(canRenderCovid3D(() => ({getContext:()=>({getExtension:()=>null})})), 'Release extension optional');
console.log(`WebGL2 preflight: ${capabilityChecks} injected-stub assertions passed. No GPU claim.`);
