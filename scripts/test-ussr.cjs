/* Runs actual chapter/store/action/localizer modules; no browser/GPU implied. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText, filename);
const { ussrCollapseScript: script } = require('../src/experience/scripts/ussrCollapse.ts');
const { useExperience } = require('../src/experience/store.ts');
const { unionChoose, unionContinue, unionNarration, useUnionCamera } = require('../src/experience/ui/unionActions.ts');
const { localizeScript } = require('../src/experience/localizeScript.ts');
const i18next = require('i18next');
let count=0; const check=(c,m)=>{assert.ok(c,m);count++;}; const state=()=>useExperience.getState();
const seen=new Set(), paths=[];
function walk(id, choices=[], stack=[]) {
 check(!stack.includes(id), `No infinite cycle at ${id}`); const b=script.beats[id]; check(!!b,`Beat ${id} exists`);check(b.id===id,'Beat id matches key');seen.add(id);
 check(b.kind!=='battle','Negotiation is not reskinned combat');
 if(b.kind==='ending'){paths.push(choices);return;}
 if(b.kind==='cinematic'){
  check(b.narration.length>0,'Narration exists');for(const shot of b.shots)check(shot.path.length>=2&&shot.lookPath.length>=1&&shot.duration>0,'Valid cinematic path');
  walk(b.next,choices,[...stack,id]);
 }else if(b.kind==='choice') for(const o of b.options)walk(o.next,[...choices,[id,o.id]],[...stack,id]);
 else if(b.kind==='explore'){check(b.hotspots.filter(h=>!h.advancesTo).length===3,'Three evidence dispatches');b.hotspots.filter(h=>h.advancesTo).forEach(h=>walk(h.advancesTo,choices,[...stack,id]));}
}
walk(script.startBeat);check(seen.size===Object.keys(script.beats).length,'All beats reachable');check(paths.length===40,'All 40 decision combinations enumerated');
const reached=new Set();
for(const choices of paths)for(const skip of [false,true]){
 state().loadScript(script);state().begin();let step=0;
 while(state().phase!=='ending'){
  check(++step<50,'Finite playthrough');const s=state(),b=s.script.beats[s.beatId];
  if(b.kind==='cinematic'){
   const index=s.narrationIndex;check(unionNarration(b.id,index,skip),'Narrative advances');
   check(!unionNarration(b.id,index,skip),'Stale narrative double tap ignored');
  }else if(b.kind==='explore'){
   check(!unionContinue(b.id),'Evidence gate cannot be bypassed');
   for(const h of b.hotspots.filter(h=>!h.advancesTo)){state().visitHotspot(h.id);state().visitHotspot(h.id);state().openHotspot(h.id);}
   check(new Set(state().visitedHotspots).size===state().visitedHotspots.length,'Repeat reports idempotent');
   const before=JSON.stringify({stats:state().stats,flags:state().flags,beatId:state().beatId});
   for(const c of ['left','right','in','out','overview'])useUnionCamera.getState().request(c);
   check(before===JSON.stringify({stats:state().stats,flags:state().flags,beatId:state().beatId}),'Navigation cannot change story');
   state().openHotspot(null);check(state().activeHotspotId===null,'Report dismissal');
   check(unionContinue(b.id),'All evidence unlocks meeting');check(!unionContinue(b.id),'Stale meeting double tap ignored');
  }else if(b.kind==='choice'){
   const o=choices.find(([id])=>id===b.id)[1];check(!unionChoose(b.id,'invalid'),'Unknown choice rejected');check(unionChoose(b.id,o),'Valid choice commits');
   const before=JSON.stringify({stats:state().stats,flags:state().flags});check(!unionChoose(b.id,o),'Double tap rejected');check(before===JSON.stringify({stats:state().stats,flags:state().flags}),'Effects applied once');
  }
 }
 const flags=state().flags;
 const expected=flags.includes('record')?'record':flags.includes('pressure')?'authority': ['consent','supply','rights','coordination'].every(f=>flags.includes(f)) ? flags.includes('association')?'compact':'protected':'fragmented';
 check(state().ending.id===expected,`Correct outcome: ${expected}`);reached.add(expected);
 for(const v of Object.values(state().stats))check(v>=0&&v<=100,'Meters clamped');
 state().reset();check(state().phase==='loading'&&state().flags.length===0&&state().visitedHotspots.length===0&&!state().ending&&!state().activeHotspotId&&state().narrationIndex===0,'Replay clears progress');check(JSON.stringify(state().stats)===JSON.stringify(script.initialStats),'Replay resets meters');
}
check(reached.size===script.endings.length,'All five endings reachable');
function flatten(o,p=''){return Object.entries(o).flatMap(([k,v])=>typeof v==='string'?[[`${p}${k}`,v]]:flatten(v,`${p}${k}.`));}
const en=JSON.parse(fs.readFileSync('src/locales/en/experience/ussr-collapse.json','utf8'));const keys=flatten(en).map(([k])=>k).sort();
for(const lng of ['en','uz','ko']){
 const d=JSON.parse(fs.readFileSync(`src/locales/${lng}/experience/ussr-collapse.json`,'utf8'));
 check(JSON.stringify(flatten(d).map(([k])=>k).sort())===JSON.stringify(keys),`${lng}: exact translation parity`);
 for(const [key,text]of flatten(d))check(text.trim().length>0,`${lng}: nonempty ${key}`);
 const i=i18next.createInstance();i.init({lng,resources:{[lng]:{'experience-ussr-collapse':d}},initImmediate:false});
 const missing=[];const translated=localizeScript(script,(key,opts)=>{if(!i.exists(key))missing.push(key);return i.t(key,opts);});
 check(missing.length===0,`${lng}: all script text resolves without fallback ${missing}`);check(translated.chapterId===script.chapterId&&Object.keys(translated.beats).length===seen.size,'Localization preserves graph');
 for(const flag of new Set(Object.values(script.beats).flatMap(b=>b.kind==='choice'?b.options.flatMap(o=>o.flags??[]):[])))check(i.exists(`experience-ussr-collapse:ui.flags.${flag}`),`${lng}: decision trail localized`);
}
check(!script.endings.some(e=>e.linkedTimelineId),'No unrelated timeline links');
// Preflight is tested with injected canvas/context stubs, not an actual GPU.
const { canRenderUnion3D } = require('../src/experience/ui/unionWebGL.ts');
check(!canRenderUnion3D(), 'No DOM returns text fallback');
check(!canRenderUnion3D(() => ({getContext:()=>null})), 'Unavailable WebGL2 returns text fallback');
check(!canRenderUnion3D(() => ({getContext:()=>{throw new Error('blocked');}})), 'Context creation exception returns text fallback');
let released=0;
check(canRenderUnion3D(() => ({getContext:(name,options)=>{
 check(name==='webgl2'&&options.antialias===false,'Probe matches renderer WebGL2 requirements');
 return {getExtension:()=>({loseContext:()=>released++})};
}})), 'Usable WebGL2 allows scene mount');
check(released===1,'Temporary capability context is released');
check(canRenderUnion3D(() => ({getContext:()=>({getExtension:()=>null})})), 'Optional release extension need not exist');
console.log(`USSR regression: ${count} assertions; ${seen.size} beats; ${paths.length} paths × full/skip narration; ${reached.size} reachable endings; 3 complete locales. No WebGL/physical-device claims.`);
