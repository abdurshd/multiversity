/* CPU regression: actual store/model/localizer; not a browser or GPU play-test. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }, fileName: filename }).outputText, filename);
const { russianEmpireScript: script, makeRussianEmpireScript } = require('../src/experience/scripts/russianEmpire.ts');
const { useExperience } = require('../src/experience/store.ts');
const { localizeScript } = require('../src/experience/localizeScript.ts');
const { PROPOSALS, newNegotiation, propose, negotiationOutcome } = require('../src/experience/russia/negotiation.ts');
const { RUSSIA_TEXT } = require('../src/experience/russia/text.ts');
let assertions=0;
const check=(condition,label)=>{ assert.ok(condition,label); assertions++; };
const state=()=>useExperience.getState();
const paths=[];
function enumerate(s,path=[]) {
    check(s.seals>=0 && s.seals<=5,'Budget stays bounded');
    check(s.choices.length===s.round,'One article per round');
    if(s.round===3){ paths.push({path,outcome:negotiationOutcome(s)}); return; }
    check(negotiationOutcome(s)===null,'Cannot resolve incomplete accord');
    for(let option=0;option<2;option++) {
        const before=JSON.stringify(s);
        const next=propose(s,s.round,option);
        check(JSON.stringify(s)===before,'Input not mutated');
        if(PROPOSALS[s.round][option].cost>s.seals) check(next===s,'Unaffordable article rejected');
        else {
            check(next.round===s.round+1,'Article progresses once');
            check(propose(next,s.round,option)===next,'Stale double-click rejected');
            enumerate(next,[...path,option]);
        }
    }
}
enumerate(newNegotiation());
check(paths.length===7,'All seven affordable packages');
check(new Set(paths.map(p=>p.outcome)).size===3,'All three outcomes reachable');
check(propose(newNegotiation(),-1,0).round===0,'Invalid round ignored');
check(propose(newNegotiation(),0,9).round===0,'Invalid choice ignored');
const allBeats=new Set();
function cinematic(skip) {
    while(state().phase==='cinematic') {
        allBeats.add(state().beatId);
        if(skip) state().skipCinematic(); else state().advanceNarration();
    }
}
for(const lang of ['en','uz','ko']) {
    const resources=JSON.parse(fs.readFileSync(`src/locales/${lang}/experience/russian-empire.json`,'utf8'));
    const keys=[];
    const tr=(key,{defaultValue})=>{
        const path=key.split(':')[1];keys.push(path);
        const value=path.split('.').reduce((o,k)=>o?.[k],resources);
        check(typeof value==='string'&&value.trim().length>0,`${lang} localized ${path}`);
        return value??defaultValue;
    };
    const localized=localizeScript(script,tr);
    check(JSON.stringify(localized)===JSON.stringify({...makeRussianEmpireScript(RUSSIA_TEXT[lang]), characters:undefined}),`${lang} resource script agrees with typed authoring copy`);
    check(Object.keys(RUSSIA_TEXT[lang]).length===Object.keys(RUSSIA_TEXT.en).length,`${lang} UI key parity`);
    for(const copy of Object.values(RUSSIA_TEXT[lang])) check(copy.trim().length>0,`${lang} UI nonempty`);
    for(const skip of [true,false]) for(const {path,outcome} of paths) {
        state().loadScript(localized);state().begin();cinematic(skip);
        check(state().beatId==='square','Intro reaches square');allBeats.add('square');
        for(const h of localized.beats.square.hotspots) {
            state().visitHotspot(h.id);state().visitHotspot(h.id);state().openHotspot(h.id);
            check(state().activeHotspotId===h.id,'Evidence opens');
            state().openHotspot(null);check(state().activeHotspotId===null,'Evidence closes');
        }
        check(state().visitedHotspots.length===4,'Visits deduplicate');
        state().choose(undefined,undefined,'negotiation');allBeats.add('negotiation');
        let deal=newNegotiation();path.forEach((option,round)=>{deal=propose(deal,round,option);});
        check(negotiationOutcome(deal)===outcome,'Replay package deterministic');
        const option=localized.beats.negotiation.options.find(o=>o.id===outcome);
        check(!!option,'Outcome has graph option');state().choose(option.effects,option.flags,option.next);cinematic(skip);
        check(state().phase==='ending'&&state().ending.id===outcome,'Expected ending resolved');allBeats.add('ending');
        check(state().flags.includes(`russia:${outcome}`),'Consequences recorded');
        state().reset();check(state().phase==='loading'&&state().flags.length===0&&state().visitedHotspots.length===0,'Replay reset clean');
    }
}
check(allBeats.size===Object.keys(script.beats).length,'All seven beats exercised in store');
check(!Object.values(script.beats).some(b=>b.kind==='battle'),'No battle reskin');
check(script.endings.every(e=>!e.linkedTimelineId),'No link to legacy instant-democracy scenario');
console.log(`PASS: ${assertions} CPU assertions; ${paths.length} affordable packages × 3 languages × full/skip narration; ${allBeats.size} beats; 3 endings. Browser, physical touch and 3D checks NOT included.`);
