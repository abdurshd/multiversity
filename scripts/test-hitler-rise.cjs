/* CPU model/store/localization/geometry checks, not browser play-tests. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }, fileName: filename });
    module._compile(outputText, filename);
};
const { hitlerRiseScript: script } = require('../src/experience/scripts/hitlerRise.ts');
const { useExperience } = require('../src/experience/store.ts');
const { localizeScript } = require('../src/experience/localizeScript.ts');
const { useCivic, DOCKETS, DOSSIERS, PARTNERS, VERDICTS, RECORD_URLS, advanceCivic, chooseCivic, evidenceMatches, responseAllowed, applyCivicScript } = require('../src/experience/civic/model.ts');
const { canRenderCivic3D } = require('../src/experience/civic/webgl.ts');
const run = () => useExperience.getState(), civic = () => useCivic.getState();
let assertions = 0, paths = 0;
const reached = new Set(), endings = {};
function check(condition, message) { assert.ok(condition, message); assertions++; }
function same(actual, expected, message) { assert.deepEqual(actual, expected, message); assertions++; }
function snapshot() { return JSON.stringify({beat:run().beatId, phase:run().phase, line:run().narrationIndex, flags:run().flags, stats:run().stats, active:run().activeHotspotId, read:civic().read, verified:civic().verified, selected:civic().selectedSource, verdict:civic().verdict, agreements:civic().agreements, seen:civic().partnersSeen, closed:civic().meetingClosed}); }
function mark() { reached.add(run().beatId); }
function start(skip = true) { applyCivicScript(script, true); run().begin(); mark(); if (skip) advanceCivic('arrival', 0, true); else { advanceCivic('arrival', 0); advanceCivic('arrival', 1); } mark(); }
function evidence(id, reversed = false, tryWrong = false) {
    same(run().beatId, id, 'At expected dossier');
    const docket = DOCKETS[id];
    for (const record of reversed ? [...docket.records].reverse() : docket.records) civic().readRecord(record);
    if (tryWrong) { civic().assess(VERDICTS.find(v => v !== docket.verdict)); civic().verify(); same(civic().feedback, 'retry', 'Incorrect verdict is recoverable'); }
    civic().readRecord(docket.source); civic().assess(docket.verdict); civic().verify();
    check(civic().verified.includes(id), 'Dossier verified');
    civic().continueDossier(); mark();
}
function meeting(pair, reverse = false) {
    for (const partner of PARTNERS) civic().meet(partner);
    for (const partner of reverse ? [...pair].reverse() : pair) { civic().meet(partner); civic().agree(partner, false); }
    civic().closeMeeting(); mark();
}
check(require('../src/experience/scripts/index.ts').hasExperience('hitler-rise'), 'Chapter registered');
same(new Set(script.endings.map(e => e.id)).size, script.endings.length, 'Unique ending ids');
for (const [id, beat] of Object.entries(script.beats)) {
    same(beat.id, id, 'Matching beat id'); check(beat.kind !== 'battle', 'No combat');
    if (beat.kind === 'cinematic') { check(!!script.beats[beat.next], 'Cinematic target exists'); check(beat.shots.every(s => s.duration > 0 && s.path.length >= 2 && s.lookPath.length), 'Valid shot'); }
    if (beat.kind === 'choice') for (const option of beat.options) { check(!!script.beats[option.next], 'Choice target exists'); check(!option.effects, 'No outcome probability/health/military stats'); }
}
// Every source/verdict pairing: exactly one valid pair per dossier.
for (const dossier of DOSSIERS) {
    let count = 0;
    for (const source of DOCKETS[dossier].records) for (const verdict of VERDICTS) if (evidenceMatches(dossier, source, verdict)) count++;
    same(count, 1, 'Exactly one supported evidence assessment');
}
check(!evidenceMatches('invalid', undefined, undefined), 'Malformed evidence rejected');
check(!responseAllowed('unknown', PARTNERS), 'Unknown response rejected');
check(!RECORD_URLS['telephone-note'], 'Fictional telephone note never receives fake source URL');
// Evidence gating, duplicate reads, correction, stale narration, phase guards.
start(false); civic().continueDossier(); same(run().beatId, 'appointment', 'Unverified cannot advance');
civic().readRecord('invalid'); same(civic().read, [], 'Unknown record rejected');
civic().readRecord('appointment-record'); civic().readRecord('appointment-record'); same(civic().read, ['appointment-record'], 'Read idempotent');
civic().readRecord(null); same(run().activeHotspotId, null, 'Close clears active document'); same(civic().selectedSource, 'appointment-record', 'Close retains selected citation');
civic().assess('supported'); civic().verify(); same(civic().verified, [], 'Must inspect both records');
civic().readRecord('election-record'); civic().verify(); same(civic().feedback, 'retry', 'Wrong citation rejected even with right verdict');
civic().readRecord('appointment-record'); civic().verify(); const verified = snapshot(); civic().verify(); civic().assess('uncertain'); same(snapshot(), verified, 'Verified assessment cannot be rewritten by repeated/stale action');
civic().continueDossier(); const transitioned = snapshot(); civic().continueDossier(); advanceCivic('arrival', 1, true); same(snapshot(), transitioned, 'Old continue/skip cannot cross beat');
chooseCivic('editorial','publish'); const choice = snapshot(); chooseCivic('editorial','retain'); same(snapshot(), choice, 'Stale option cannot replay effects');
advanceCivic('decree',0,true); evidence('rights', false, true);
// Guarantees are refused, agreements revisable, all offers inspected, capacity two.
civic().meet('archive'); civic().agree('archive',true); check(civic().refused && !civic().agreements.length, 'Safety guarantee refused without commitment');
civic().agree('archive',false); civic().agree('archive',false); same(civic().agreements, ['archive'], 'Agreement idempotent');
civic().meet('printer'); civic().agree('printer',false); civic().closeMeeting(); same(run().beatId, 'meeting', 'Read all offers first');
civic().meet('counsel'); civic().agree('counsel',false); same(civic().agreements.length,2,'Cannot overcommit');
civic().withdraw('printer'); same(civic().agreements,['archive'],'Can withdraw before closure'); civic().agree('counsel',false); same(civic().agreements,['archive','counsel'],'Can replace agreement');
civic().closeMeeting(); const closed = snapshot(); civic().withdraw('archive'); civic().agree('printer',false); civic().closeMeeting(); same(snapshot(),closed,'Closed negotiation immutable');
advanceCivic('vote',0,true); evidence('mandate'); const beforeBlocked = snapshot(); chooseCivic('response','bulletin'); same(snapshot(),beforeBlocked,'No public bulletin without printer');
chooseCivic('response','petition'); advanceCivic('closing',0,true); const endingSnapshot = snapshot(); advanceCivic('closing',0,true); same(snapshot(),endingSnapshot,'Repeated final skip inert'); same(run().ending.id,'legal','Legal ending');
// Guard inconsistent phases; no actions through a loading or ending overlay.
start(); useExperience.setState({phase:'loading'}); const blocked = snapshot(); civic().readRecord('appointment-record'); civic().assess('supported'); civic().verify(); civic().continueDossier(); same(snapshot(),blocked,'Dossier phase guard');
useExperience.setState({beatId:'meeting'}); const blockedMeeting = snapshot(); civic().meet('archive'); civic().agree('archive',false); civic().withdraw('archive'); civic().closeMeeting(); same(snapshot(),blockedMeeting,'Meeting phase guard');
// Every agreement pair and order, initial editorial choice, allowed final response,
// and all three binary document-reading orders: 224 complete paths.
for (const pair of [['archive','printer'],['archive','counsel'],['printer','counsel']]) for (const reverse of [false,true]) for (const first of ['publish','retain']) for (let order = 0; order < 8; order++) for (const response of ['bulletin','petition','private'].filter(id => responseAllowed(id,pair))) {
    start(paths % 2 === 0); evidence('appointment', !!(order & 1)); chooseCivic('editorial',first); mark();
    advanceCivic('decree',0,paths % 2 === 0); mark(); evidence('rights',!!(order & 2)); meeting(pair,reverse);
    advanceCivic('vote',0,paths % 2 === 0); mark(); evidence('mandate',!!(order & 4)); chooseCivic('response',response); mark();
    advanceCivic('closing',0,paths % 2 === 0); mark();
    const expected = response === 'petition' ? 'legal' : response === 'private' ? 'private' : pair.includes('archive') ? 'public-preserved' : 'public-single';
    same(run().ending?.id,expected,'Correct local-record ending'); same(run().stats,script.initialStats,'No numeric ideological/health outcome score');
    same(new Set(run().flags).size,run().flags.length,'No duplicate flags'); same(civic().verified,DOSSIERS,'All chronological dossiers verified');
    endings[expected] = (endings[expected] ?? 0) + 1; paths++;
}
same(paths,224,'All complete paths enumerated'); same(reached.size,Object.keys(script.beats).length,'All beats reached');
same(Object.keys(endings).sort(),script.endings.map(e=>e.id).sort(),'All endings reachable');
// Localization exact key parity, zero fallbacks, and live locale updater preserves runs.
const en = require('../src/locales/en/experience/hitler-rise.json');
function leaves(object,prefix='') { return Object.entries(object).flatMap(([k,v])=>typeof v === 'string' ? [[prefix+k,v]] : leaves(v,prefix+k+'.')); }
for (const language of ['en','uz','ko']) {
    const copy = require(`../src/locales/${language}/experience/hitler-rise.json`);
    same(leaves(copy).map(([k])=>k).sort(),leaves(en).map(([k])=>k).sort(),`${language} key parity`);
    for (const [k,v] of leaves(copy)) check(v.trim().length > 0,`${language}: nonempty ${k}`);
    const localized = localizeScript(script,key => { const value = key.split(':')[1].split('.').reduce((o,k)=>o?.[k],copy); check(typeof value === 'string',`${language}: no fallback for ${key}`); return value; });
    const before = snapshot(), endingId = run().ending.id; applyCivicScript(localized,false); same(snapshot(),before,'Language preserves decisions and position'); same(run().ending.id,endingId,'Language preserves ending identity'); same(run().ending.title,copy.endings[endingId].title,'Resolved ending is translated');
    check(Object.keys(localized.beats).length === Object.keys(script.beats).length,'Translation preserves graph');
}
// Reset/reuse and camera-only control.
applyCivicScript(script,true); same(run().phase,'loading','Reset to title'); same(civic().read,[],'Reset reads'); same(civic().verified,[],'Reset verifications'); same(civic().agreements,[],'Reset agreements'); same(civic().partnersSeen,[],'Reset inspected offers'); check(!civic().meetingClosed && !run().ending && !run().activeHotspotId,'Reset active UI'); same(run().flags,[],'Reset flags');
const cameraOnly = snapshot(); civic().overview(); civic().overview(); same(snapshot(),cameraOnly,'Reset view changes no story state');
start(); evidence('appointment'); same(run().beatId,'editorial','Replay can proceed');
// WebGL preflight stubs, no graphics-context claim.
check(!canRenderCivic3D(),'No DOM returns fallback'); check(!canRenderCivic3D(()=>{throw Error('blocked');}),'Canvas exception fallback');
check(!canRenderCivic3D(()=>({getContext:()=>null})),'Null WebGL2 fallback'); check(!canRenderCivic3D(()=>({getContext:()=>{throw Error('blocked');}})),'Context exception fallback');
let released = 0; check(canRenderCivic3D(()=>({getContext:(name,options)=>{same(name,'webgl2','Only WebGL2 probe');same(options.powerPreference,'low-power','Probe matches canvas');return {getExtension:()=>({loseContext:()=>released++})};}})),'Supported context passes'); same(released,1,'Probe context released');
check(canRenderCivic3D(()=>({getContext:()=>({getExtension:()=>null})})),'Optional lose-context extension');
// Geometry audit, not renderer performance or visual inspection.
const { buildCivicArchitecture } = require('../src/experience/civic/architecture.ts');
for (const environment of ['civic-newsroom','civic-archive','civic-meeting']) {
    const batches = buildCivicArchitecture(environment); check(batches.length <= 16,'Material batch budget'); let triangles=0;
    for (const {geometry,material} of batches) {
        check([...geometry.getAttribute('position').array].every(Number.isFinite),'Finite positions'); check([...geometry.getAttribute('normal').array].every(Number.isFinite),'Finite normals');
        geometry.computeBoundingBox(); check(geometry.boundingBox.min.y > -1,'Geometry above foundation'); triangles+=(geometry.index?.count??geometry.getAttribute('position').count)/3;
        geometry.dispose();material.dispose();
    }
    check(triangles<30000,'Bounded static triangle count'); console.log(`${environment}: ${batches.length} batches, ${triangles} triangles (CPU only).`);
}
console.log(`Civic checks passed: ${assertions} assertions, ${paths} complete deterministic paths, ${reached.size} beats; endings ${JSON.stringify(endings)}. Browser/GPU/physical mobile unverified.`);
