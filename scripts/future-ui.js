/** Development-only DOM fixture. No GPU scene; does not validate 3D or device touch. */
import React from 'react';
import '../src/styles/index.css';
import { createRoot } from 'react-dom/client';
import i18n from '../src/i18n';
import { FutureCinematic } from '../src/experience/future/FutureCinematic';
import { FutureOverlay, FutureStart } from '../src/experience/future/FutureOverlay';
import { futureEarthScript } from '../src/experience/scripts/futureEarth';
import { useExperience } from '../src/experience/store';
import { localizeScript } from '../src/experience/localizeScript';
const params=new URLSearchParams(location.search);
await i18n.changeLanguage(params.get('lang')??'en');
useExperience.getState().loadScript(localizeScript(futureEarthScript,i18n.t.bind(i18n)));
useExperience.getState().gotoBeat(params.get('beat')??'dispatch');
// Match production phase mount/unmount boundaries. A permanently mounted
// FutureOverlay would retain its one-shot dispatch guard across cinematics.
function Fixture() {
 const phase=useExperience(state=>state.phase);
 return React.createElement('main',{className:'future-experience'},
  React.createElement('p',{style:{color:'#b7d9d6',font:'12px system-ui',padding:20}},'DOM QA fixture · 3D deliberately absent'),
  phase==='loading'&&React.createElement(FutureStart),
  phase==='cinematic'&&React.createElement(FutureCinematic),
  phase==='explore'&&React.createElement(FutureOverlay,{key:'future'}),
  phase==='choice'&&React.createElement(FutureOverlay,{key:'future'}));
}
createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode,null,React.createElement(Fixture)));
const wait=()=>new Promise(r=>setTimeout(r,120));
if(params.has('test')){
 try{
  await wait();const s=useExperience.getState;
  const check=(v,m)=>{if(!v)throw Error(m);};
  const click=async selector=>{const b=document.querySelector(selector);check(b&&!b.disabled,`Enabled ${selector}`);b.click();await wait();};
  const shift=async ids=>{
   for(const id of ids)await click(`#future-project-${id}`);
   await click('#future-review');check(document.querySelector('.future-panel').scrollTop===0,'review reveals heading');check(document.activeElement.tagName==='H2','review focuses visible heading');
   const button=document.querySelector('#future-commit-shift');button.click();button.click();await wait();
  };
  await click('#future-project-grid');await click('#future-project-signal');
  await click('#future-review');check(s().flags.length===0,'preview does not export progress');
  window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));await wait();check(document.activeElement.id==='future-review','review Escape restores visible focus');
  await click('#future-review');await click('#future-commit-shift');check(document.querySelector('#future-project-grid').disabled,'completed grid cannot be purchased twice');
  await click('#future-reset');await click('#future-confirm-reset');check(!document.querySelector('#future-project-grid').disabled,'restart clears completed projects');
  await shift(['grid','signal']);check(document.activeElement.tagName==='H2','new shift focuses heading');
  await shift(['water','shelter','garden']);check(document.querySelectorAll('.future-record li[data-ready=true]').length===5,'five projects completed');
  await click('#future-reset');window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));await wait();check(document.querySelectorAll('.future-record li[data-ready=true]').length===5,'cancel reset keeps work');
  const next=document.querySelector('#future-record-next');next.click();next.click();await wait();check(s().beatId==='hearing'&&s().flags.length===5,'record handed over once');
  await click('#future-story-skip');await click('#future-policy-public');check(!s().flags.includes('future:public'),'policy preview is reversible');check(document.activeElement.tagName==='H2','policy preview focuses visible heading');
  window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));await wait();check(document.activeElement.id==='future-policy-public','policy Escape returns focus');
  await click('#future-policy-public');const confirm=document.querySelector('#future-confirm-policy');confirm.click();confirm.click();await wait();check(s().flags.filter(f=>f==='future:public').length===1,'policy committed once');
  await click('#future-story-continue');check(s().ending.id==='connected','actual DOM planner reaches connected ending');s().reset();check(s().flags.length===0&&s().visitedHotspots.length===0,'replay clears run');s().gotoBeat('survey');await wait();
  await click('#future-place-future-water');await click('.future-actions button');check(s().activeHotspotId===null,'lore dismissed');check(document.activeElement.id==='future-place-future-water','lore focus returned');
  const panel=document.querySelector('.future-panel');check(panel.scrollWidth<=panel.clientWidth+1,'no horizontal overflow');document.querySelectorAll('button').forEach(b=>check(b.getBoundingClientRect().height>=44,'44px targets'));
  const result=document.createElement('pre');result.id='qa-result';result.textContent='PASS: actual DOM planner, preview/Escape/focus, duplicate dispatch, reset/cancel, handed-over record, policy confirmation, ending, lore and bounds';result.style.cssText='color:#b6e4c3;white-space:pre-wrap;padding:20px;font:12px system-ui';document.body.append(result);
 }catch(e){document.body.setAttribute('data-qa-failure',String(e));}
}
