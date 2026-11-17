/* Deterministic source-level regression checks. Browser/GPU checks are separate. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
        fileName: filename,
    });
    module._compile(outputText, filename);
};
const { timurScript: script } = require('../src/experience/scripts/timur.ts');
const { useExperience } = require('../src/experience/store.ts');
const { useTimurNavigation } = require('../src/experience/ui/timurNavigation.ts');
const state = () => useExperience.getState();
let assertions = 0;
function check(condition, message) { assert.ok(condition, message); assertions++; }
const visited = new Set();
function walk(id) {
    check(!!script.beats[id], `Missing beat: ${id}`);
    if (visited.has(id)) return;
    visited.add(id);
    const b = script.beats[id];
    check(b.id === id, `Beat key mismatch: ${id}`);
    if (b.kind === 'cinematic') {
        check(b.narration.length > 0 && b.shots.length > 0, `Empty cinematic: ${id}`);
        b.shots.forEach(s => check(s.duration > 0 && s.path.length > 0 && s.lookPath.length > 0, `Invalid shot: ${id}`));
        walk(b.next);
    }
    if (b.kind === 'explore') b.hotspots.forEach(h => { if (h.advancesTo) walk(h.advancesTo); });
    if (b.kind === 'choice') b.options.forEach(o => walk(o.next));
    if (b.kind === 'battle') { walk(b.battle.onVictory); walk(b.battle.onDefeat); }
}
walk(script.startBeat);
check(visited.size === Object.keys(script.beats).length, 'All beats reachable from title');
const exploration = script.beats['explore-city'];
exploration.hotspots.forEach(h => check(!!h.closeUp?.path.length && !!h.closeUp?.lookPath.length, `Landmark has focus framing: ${h.id}`));
function start() { state().loadScript(script); state().begin(); state().skipCinematic(); }
function choice(id) {
    const beat = script.beats[state().beatId];
    const option = beat.options.find(o => o.id === id);
    check(!!option, `Available choice ${id} in ${beat.id}`);
    state().choose(option.effects, option.flags, option.next);
}
function council() { state().choose(undefined, undefined, 'council-choice'); }
start();
check(state().phase === 'explore', 'Intro reaches exploration');
state().visitHotspot('mosque'); state().openHotspot('mosque'); state().visitHotspot('mosque');
check(state().visitedHotspots.length === 1, 'Repeated discovery is idempotent');
const before = JSON.stringify({stats:state().stats, beatId:state().beatId, visited:state().visitedHotspots});
for (const command of ['in','out','overview','overview']) useTimurNavigation.getState().request(command);
check(before === JSON.stringify({stats:state().stats, beatId:state().beatId, visited:state().visitedHotspots}), 'Camera controls preserve story progress');
state().openHotspot(null); check(state().activeHotspotId === null, 'Dismiss returns to map');
council(); choice('east'); state().skipCinematic(); choice('wait'); state().skipCinematic();
check(state().ending.id === 'historical-fragmentation', 'East / winter produces historical ending');
start(); council(); choice('consolidate'); state().skipCinematic(); choice('shahrukh'); choice('negotiate'); state().skipCinematic();
check(state().ending.id === 'unified-succession', 'Diplomatic succession ending');
for (const [branch, battleId, expected] of [['east','china-campaign','immortal-emir'],['west','gates-of-europe','western-campaign']]) {
    start(); council(); choice(branch); state().skipCinematic(); if (branch === 'east') choice('press-on');
    const beat = script.beats[state().beatId];
    check(beat.kind === 'battle', `${branch} reaches battle`);
    // Test graph outcome wiring, not real-time combat or balance.
    state().addFlags([`${battleId}:victory`, `${battleId}:won`]); state().finishBattle('victory', beat.battle.onVictory); state().skipCinematic();
    check(state().ending.id === expected, `${branch} victory ending`);
    start(); council(); choice(branch); state().skipCinematic(); if (branch === 'east') choice('press-on');
    const defeatBeat = script.beats[state().beatId];
    state().addFlags([`${battleId}:defeat`]); state().finishBattle('defeat', defeatBeat.battle.onDefeat); state().skipCinematic();
    check(state().ending.id === 'historical-fragmentation', `${branch} defeat ending`);
}
state().reset();
check(state().phase === 'loading' && !state().ending && state().flags.length === 0 && state().visitedHotspots.length === 0, 'Replay resets run');
console.log(`Timur regression checks passed: ${assertions} assertions, ${visited.size} reachable beats. No browser or combat simulation claimed.`);
