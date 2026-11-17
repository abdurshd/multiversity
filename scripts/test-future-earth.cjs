/* CPU model/store/localization/geometry tests. Not browser, GPU or touch tests. */
const assert = require('node:assert/strict');
const fs = require('node:fs'); const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020},fileName:filename}).outputText,filename);
const { futureEarthScript: script } = require('../src/experience/scripts/futureEarth.ts');
const { PROJECT_IDS, newRepairPlan, powerCapacity, powerDemand, crewDemand, planProblem, toggleProject, commitShift, repairFlags } = require('../src/experience/future/planning.ts');
const { buildFutureGeometry } = require('../src/experience/future/geometry.ts');
const { useExperience } = require('../src/experience/store.ts');
const { useFutureNavigation } = require('../src/experience/future/navigation.ts');
const { captureFutureCinematicActions } = require('../src/experience/future/cinematicActions.ts');
const { localizeScript } = require('../src/experience/localizeScript.ts');
const { useFutureRepairs } = require('../src/experience/future/visualState.ts');
const { canRenderFuture3D } = require('../src/experience/future/webgl.ts');
const state=()=>useExperience.getState(); let assertions=0;
const check=(v,m)=>{assert.ok(v,m);assertions++;};
const plans=[];
function enumerate(p) {
 check(p.shift<=2&&crewDemand(p.draft)<=3,'bounded shift/crew');
 check(powerDemand(p.completed)<=powerCapacity(p),'sustained loads fit commissioned supply');
 check(new Set(p.completed).size===p.completed.length,'projects not repeated');
 if(p.shift===2){plans.push(p);return;}
 let feasible=0;
 for(let mask=1;mask<(1<<PROJECT_IDS.length);mask++){
  const draft=PROJECT_IDS.filter((_,i)=>mask&(1<<i));
  if(planProblem(p,draft))continue;feasible++;
  let q=p;
  draft.forEach(id=>{const before=JSON.stringify(q); const next=toggleProject(q,id);check(JSON.stringify(q)===before,'selection immutable');q=next;});
  check(q.draft.length===draft.length,'valid set selectable in index order');
  const before=JSON.stringify(q),next=commitShift(q,p.shift);
  check(JSON.stringify(q)===before,'commit immutable');check(next.shift===p.shift+1,'shift increments once');
  check(commitShift(next,p.shift)===next,'duplicate dispatch ignored');
  check(repairFlags(next).length===(next.shift===2?next.completed.length:0),'only completed planning may export flags');
  enumerate(next);
 }
 check(feasible>0,'no stranded incomplete planning state');
}
enumerate(newRepairPlan());check(plans.length>50,'substantial two-shift plan space');
let dependency=newRepairPlan();dependency=toggleProject(dependency,'water');dependency=toggleProject(dependency,'grid');check(dependency.draft.length===2,'grid and water fit first shift');check(toggleProject(dependency,'shelter')===dependency,'cannot borrow next-shift power');dependency=commitShift(dependency,0);check(powerCapacity(dependency)===4,'commissioned grid supplies second shift');dependency=toggleProject(dependency,'shelter');dependency=toggleProject(dependency,'signal');check(dependency.draft.length===2,'second shift uses new supply');
let lateGrid=commitShift(toggleProject(newRepairPlan(),'water'),0);lateGrid=toggleProject(lateGrid,'grid');check(planProblem(lateGrid,[...lateGrid.draft,'shelter'])==='power','next-shift dependency independently rejects power, not crews');check(toggleProject(lateGrid,'shelter')===lateGrid,'cannot energize shelter with uncommissioned grid');
let toggled=toggleProject(newRepairPlan(),'garden');toggled=toggleProject(toggled,'garden');assert.deepEqual(toggled,newRepairPlan());check(commitShift(toggled,0)===toggled,'empty dispatch rejected');check(toggleProject(toggled,'not-a-project')===toggled,'unknown project rejected');
const reached=new Set(), endings=new Set();
function cinematic(skip){while(state().phase==='cinematic'){reached.add(state().beatId);const actions=captureFutureCinematicActions();check(skip?actions.skip():actions.continue(),'captured narration action accepted');}}
function run(p,policy,localized,skip){
 state().loadScript(localized);state().begin();cinematic(skip);check(state().beatId==='survey','intro to survey');reached.add('survey');
 localized.beats.survey.hotspots.forEach(h=>{state().visitHotspot(h.id);state().visitHotspot(h.id);state().openHotspot(h.id);state().openHotspot(null);});check(state().visitedHotspots.length===5,'visits deduplicate');
 state().gotoBeat('dispatch');reached.add('dispatch');state().choose(undefined,repairFlags(p),'hearing');cinematic(skip);check(state().beatId==='accountability','hearing to policy');reached.add('accountability');
 const option=localized.beats.accountability.options.find(o=>o.id===policy);state().choose(option.effects,option.flags,option.next);cinematic(skip);reached.add('ending');check(state().ending,'resolved ending');
 const id=state().ending.id;endings.add(id);check(id==='water-gap'? !p.completed.includes('water') : true,'water gap meaning');check(id==='shelter-gap'?p.completed.includes('water')&&!p.completed.includes('shelter'):true,'shelter gap meaning');
 return {id,flags:[...state().flags],stats:{...state().stats}};
}
for(const lang of ['en','uz','ko']){
 const d=JSON.parse(fs.readFileSync(`src/locales/${lang}/experience/future-earth.json`));let keyCount=0;
 const localized=localizeScript(script,key=>{const path=key.split(':')[1];const value=path.split('.').reduce((v,k)=>v?.[k],d);check(typeof value==='string'&&value.trim().length>0,`${lang}:${path}`);keyCount++;return value;});
 assert.deepEqual(Object.keys(d.ui).sort(),Object.keys(JSON.parse(fs.readFileSync('src/locales/en/experience/future-earth.json')).ui).sort());PROJECT_IDS.forEach(id=>check(!!d.projects[id].name&&!!d.projects[id].description,'project copy present'));
 for(const p of plans)for(const policy of ['public','closed']){
  const a=run(p,policy,localized,true),b=run(p,policy,localized,false);assert.deepEqual(a,b,'skip/full narration equivalence');
 }
 console.log(`${lang}: ${keyCount} narrative keys; ${plans.length} plans × 2 accountability choices × full/skip`);
}
check(reached.size===Object.keys(script.beats).length,'all beats reached');check(endings.size===6,'all six endings reachable');
const sample=plans[Math.floor(plans.length/2)];assert.deepEqual(run(sample,'public',script,true),run(sample,'public',script,true),'repeat deterministic');
const before=JSON.stringify({beat:state().beatId,flags:state().flags,stats:state().stats});useFutureNavigation.getState().resetView();useFutureNavigation.getState().setReducedMotion(true);const visual=['water'];useFutureRepairs.getState().show(visual);visual.push('signal');check(useFutureRepairs.getState().completed.length===1,'visual mirror copies its input');check(before===JSON.stringify({beat:state().beatId,flags:state().flags,stats:state().stats}),'camera commands do not alter run');
state().reset();check(state().phase==='loading'&&state().flags.length===0&&state().visitedHotspots.length===0&&state().ending===null,'reset clean');assert.deepEqual(state().stats,script.initialStats);
for(const interior of [false,true])for(const done of [[],PROJECT_IDS]){
 const a=buildFutureGeometry(interior,done);assert.deepEqual(a,buildFutureGeometry(interior,done),'deterministic geometry');let count=0;
 for(const solids of Object.values(a))for(const s of solids){count++;check(s.position.length===3&&s.position.every(Number.isFinite),'finite position');check(s.scale.length===3&&s.scale.every(n=>Number.isFinite(n)&&n>0),'positive scale');check(/^#[0-9a-f]{6}$/i.test(s.color),'valid color');check(Number.isFinite(s.yaw??0)&&Number.isFinite(s.pitch??0),'finite rotation');}
 check(count>100,'substantial original environment');console.log(`${interior?'Forum':'District'} / ${done.length} completed: ${count} solids in ${Object.keys(a).length} batches`);
}
check(canRenderFuture3D()===false,'SSR fallback');check(canRenderFuture3D(()=>({getContext:()=>null}))===false,'null context fallback');check(canRenderFuture3D(()=>{throw Error('blocked')})===false,'canvas exception fallback');check(canRenderFuture3D(()=>({getContext:()=>{throw Error('blocked')}}))===false,'context exception fallback');let released=0;check(canRenderFuture3D(()=>({getContext:(kind,attrs)=>{check(kind==='webgl2'&&!attrs.antialias&&attrs.powerPreference==='high-performance','probe matches renderer');return {getExtension:()=>({loseContext:()=>released++})};}})),'success probe');check(released===1,'temporary context released');check(canRenderFuture3D(()=>({getContext:()=>({getExtension:()=>null})})),'optional release extension');
// User controls must not advance a stale line, beat, chapter or replay.
state().loadScript(script);state().begin();
let controls=captureFutureCinematicActions();check(controls.continue(),'first continue accepted');check(state().narrationIndex===1,'continue advances one line');check(!controls.continue()&&!controls.skip(),'same captured controls are one-shot');check(state().narrationIndex===1,'repeated callback cannot consume next line');
const staleLine=captureFutureCinematicActions();state().advanceNarration();check(!staleLine.continue()&&!staleLine.skip(),'another action invalidates old line capture');
controls=captureFutureCinematicActions();state().reset();check(!controls.continue()&&!controls.skip(),'reset rejects old controls in loading');check(state().phase==='loading'&&state().narrationIndex===0,'old callback cannot bypass title');state().begin();check(!controls.continue()&&!controls.skip(),'old control rejected after same-script replay');check(state().narrationIndex===0,'replay index unchanged');
const oldFirst=captureFutureCinematicActions();state().reset();state().begin();check(!oldFirst.continue()&&!oldFirst.skip(),'run identity rejects same chapter/phase/beat/index after reset');
controls=captureFutureCinematicActions();check(controls.skip(),'skip accepted');check(state().beatId==='survey','skip reaches next beat');check(!controls.skip()&&!controls.continue(),'stale skip rejected in exploration');
state().gotoBeat('hearing');controls=captureFutureCinematicActions();state().gotoBeat('debrief');check(!controls.continue()&&!controls.skip(),'different cinematic rejects prior beat capture');
state().loadScript({...script,chapterId:'other-chapter'});state().begin();check(!controls.continue()&&!controls.skip(),'other chapter rejects Future capture');const foreign=captureFutureCinematicActions();check(!foreign.continue()&&!foreign.skip(),'cannot create Future control for another chapter');
state().loadScript(script);const loading=captureFutureCinematicActions();state().begin();check(!loading.continue()&&!loading.skip(),'capture from noncinematic phase remains inert');
console.log(`PASS: ${assertions} CPU assertions, ${plans.length} two-shift plans, ${endings.size} endings, ${reached.size} beats. Browser/GPU/physical mobile NOT tested.`);
