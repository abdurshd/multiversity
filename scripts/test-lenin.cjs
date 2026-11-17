/* Run with node scripts/test-lenin.cjs. CPU logic checks, NOT GPU validation. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }, fileName: filename });
  module._compile(outputText, filename);
};
const { leninRevolutionScript: script } = require('../src/experience/scripts/leninRevolution.ts');
const { useExperience } = require('../src/experience/store.ts');
const { localizeScript } = require('../src/experience/localizeScript.ts');
const state = () => useExperience.getState();
const routes = []; const seen = new Set();
function walk(id, route = [], stack = []) {
  assert(!stack.includes(id), `cycle ${id}`);
  const b = script.beats[id]; assert(b, `missing ${id}`); assert.equal(b.id, id); seen.add(id);
  if (b.kind === 'cinematic') { assert(b.narration.length); b.shots.forEach(s => {assert(s.path.length >= 2); assert(s.duration > 0); [...s.path, ...s.lookPath].flat().forEach(n => assert(Number.isFinite(n)));}); walk(b.next, route, [...stack,id]); }
  if (b.kind === 'explore') { assert(b.hotspots.some(h=>h.advancesTo)); b.hotspots.filter(h=>h.advancesTo).forEach(h=>walk(h.advancesTo,route,[...stack,id])); }
  if (b.kind === 'choice') { assert(b.options.length >= 2); b.options.forEach(o=>walk(o.next,[...route,{beat:id,option:o.id}],[...stack,id])); }
  if (b.kind === 'ending') routes.push(route);
}
walk(script.startBeat); assert.equal(seen.size,Object.keys(script.beats).length); assert.equal(routes.length,18);
function resolve(route, skip) {
  state().loadScript(script); state().begin(); let count = 0;
  while(state().phase !== 'ending') {
    assert(++count < 100); const b = script.beats[state().beatId];
    if(b.kind==='cinematic') { if(skip) state().skipCinematic(); else state().advanceNarration(); }
    else if(b.kind==='explore') { for(const h of b.hotspots){ state().openHotspot(h.id); state().visitHotspot(h.id); state().visitHotspot(h.id); state().openHotspot(null); } assert.equal(state().visitedHotspots.length,4); state().gotoBeat(b.hotspots.find(h=>h.advancesTo).advancesTo); }
    else { const step=route.find(r=>r.beat===b.id); const o=b.options.find(o=>o.id===step.option); state().choose(o.effects,o.flags,o.next); }
  }
  assert(state().ending); Object.values(state().stats).forEach(n=>assert(n>=0&&n<=100));
  return {ending:state().ending.id,stats:{...state().stats},flags:[...state().flags]};
}
const results = new Set();
for(const r of routes){ const a=resolve(r,true);const b=resolve(r,false);assert.deepEqual(a,b,'skip and narration equivalent');results.add(a.ending);assert.deepEqual(resolve(r,true),a,'repeat deterministic'); }
assert.equal(results.size,5,'all five endings reachable');
state().reset(); assert.equal(state().phase,'loading');assert.equal(state().beatId,'arrival');assert.equal(state().flags.length,0);assert.equal(state().visitedHotspots.length,0);assert.equal(state().ending,null);assert.deepEqual(state().stats,script.initialStats);state().begin();assert.equal(state().phase,'cinematic');
for(const lang of ['en','uz','ko']){
 const d=JSON.parse(fs.readFileSync(`src/locales/${lang}/experience/lenin-revolution.json`));const keys=[];
 const localized=localizeScript(script,(key)=>{const path=key.split(':')[1];keys.push(path);const value=path.split('.').reduce((v,k)=>v?.[k],d);assert.equal(typeof value,'string',`${lang}:${path}`);assert(value.trim());return value;});
 assert.equal(localized.chapterId,script.chapterId); assert.equal(Object.keys(localized.beats).length,Object.keys(script.beats).length);
 for(const id of Object.keys(script.beats)){const a=script.beats[id],b=localized.beats[id];if(a.kind==='choice')a.options.forEach((o,i)=>{assert.deepEqual(o.flags,b.options[i].flags);assert.deepEqual(o.effects,b.options[i].effects);assert.equal(o.next,b.options[i].next);});}
 assert(d.ui.confirm && d.ui.cancel && d.ui.fallback);assert.deepEqual(Object.keys(d.ui).sort(),Object.keys(JSON.parse(fs.readFileSync('src/locales/en/experience/lenin-revolution.json')).ui).sort(),'UI translation key parity');console.log(`${lang}: ${keys.length} narrative translations verified`);
}
console.log(`PASS: ${seen.size} beats, ${routes.length} paths, ${results.size} endings; all paths replayed, skipped and fully advanced; reset, hotspot deduplication, localization shape.`);

// Evaluate only the pure procedural-set builder, not React or WebGL.
const worldSource=fs.readFileSync('src/experience/world/petrograd.tsx','utf8');
const builderSource=worldSource.slice(worldSource.indexOf('function buildSet('),worldSource.indexOf('function Batch('));
const builderJS=ts.transpileModule(builderSource,{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const buildSet=new Function(builderJS+'; return buildSet;')();
for(const interior of [false,true]){
 const set=buildSet(interior);assert.deepEqual(buildSet(interior),set,'deterministic geometry');
 const solids=Object.values(set).flat();assert(solids.length>100);
 solids.forEach(o=>{assert(o.p.length===3&&o.s.length===3);o.p.forEach(n=>assert(Number.isFinite(n)));o.s.forEach(n=>assert(n>0&&Number.isFinite(n)));assert(/^#[0-9a-f]{6}$/i.test(o.c));});
 console.log(`${interior?'Council':'District'}: ${solids.length} deterministic solids in ${Object.keys(set).length} batches; finite positive transforms`);
}

// Injected capability stubs, not an actual browser/GPU test.
const { canRenderLenin3D } = require('../src/experience/ui/leninWebGL.ts');
let capabilityChecks = 0;
const capabilityCheck = (value, message) => { assert.ok(value, message); capabilityChecks++; };
capabilityCheck(!canRenderLenin3D(), 'No DOM produces text fallback');
capabilityCheck(!canRenderLenin3D(() => ({getContext:()=>null})), 'Missing WebGL2 produces text fallback');
capabilityCheck(!canRenderLenin3D(() => ({getContext:()=>{throw new Error('blocked');}})), 'Context exception produces text fallback');
let releasedContext = 0;
capabilityCheck(canRenderLenin3D(() => ({getContext:(kind,options)=>{
    capabilityCheck(kind==='webgl2'&&options.antialias===false&&options.powerPreference==='high-performance', 'Probe matches renderer requirements');
    return {getExtension:()=>({loseContext:()=>releasedContext++})};
}})), 'Supported WebGL2 permits scene');
capabilityCheck(releasedContext===1, 'Probe releases temporary context');
capabilityCheck(canRenderLenin3D(() => ({getContext:()=>({getExtension:()=>null})})), 'Release extension optional');
console.log(`WebGL2 preflight: ${capabilityChecks} injected-stub assertions passed. No GPU claim.`);
