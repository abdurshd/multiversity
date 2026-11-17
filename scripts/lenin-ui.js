/** Development-only DOM fixture: no WebGL and no claim of 3D render coverage. */
import React from 'react';
import { createRoot } from 'react-dom/client';
import i18n from '../src/i18n';
import { LeninCouncil } from '../src/experience/ui/LeninCouncil';
import { useExperience } from '../src/experience/store';
import { leninRevolutionScript } from '../src/experience/scripts/leninRevolution';
import { localizeScript } from '../src/experience/localizeScript';
const params = new URLSearchParams(location.search);
await i18n.changeLanguage(params.get('lang') ?? 'en');
useExperience.getState().loadScript(localizeScript(leninRevolutionScript, i18n.t.bind(i18n)));
useExperience.getState().gotoBeat(params.get('beat') ?? 'supply');
createRoot(document.getElementById('root')).render(React.createElement(React.StrictMode, null, React.createElement('p', {style:{color:'#afc0cd',font:'13px system-ui',padding:20}}, 'DOM QA fixture · 3D environment intentionally absent'), React.createElement(LeninCouncil)));
const sleep = () => new Promise(r=>setTimeout(r,100));
if(params.has('test')) {
    try {
        await sleep();
        const click = async (selector) => {const el=document.querySelector(selector);if(!el)throw Error(`Missing ${selector}`);el.click();await sleep();};
        const check = (value, message) => { if(!value)throw Error(message); };
        const s = useExperience.getState;
        const scrollPanel=document.querySelector('.lenin-panel');
        scrollPanel.scrollTop=scrollPanel.scrollHeight;
        await click('#lenin-ledger');check(s().flags.length===0,'preview must not commit');
        check(scrollPanel.scrollTop===0,'preview scroll resets to heading');
        window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));await sleep();
        check(document.activeElement?.id==='lenin-ledger','Escape restores focus');
        await click('#lenin-ledger');
        const commit=document.querySelector('.lenin-primary');commit.click();commit.click();await sleep();
        check(s().beatId==='ledger-result'&&s().stats.diplomacy===58,'double commit applied once');
        s().gotoBeat('district');await sleep();await click('#lenin-lenin-bread');await click('.lenin-actions button');
        check(s().activeHotspotId===null,'hotspot dismissed');await click('#lenin-lenin-bread');await click('.lenin-actions button');check(s().visitedHotspots.length===1,'repeat visit deduplicated');
        s().reset();check(s().flags.length===0&&s().activeHotspotId===null,'reset clears state');s().gotoBeat('supply');await sleep();
        const panel=document.querySelector('.lenin-panel');
        check(panel.scrollWidth<=panel.clientWidth+1,'panel no horizontal overflow');
        document.querySelectorAll('button').forEach(b=>check(b.getBoundingClientRect().height>=44,'44px touch target'));
        const result=document.createElement('pre');result.id='qa-result';result.textContent='PASS: preview, Escape/focus, duplicate commit, dismiss/revisit, reset, horizontal overflow, touch targets';result.style.cssText='color:#a4dda5;white-space:pre-wrap;padding:20px;font:12px system-ui';document.body.append(result);
    } catch(error) {document.body.setAttribute('data-qa-failure',String(error));}
}
