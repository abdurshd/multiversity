import { useEffect, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentBeat, useExperience } from '../store';
import { commitShift, crewDemand, newRepairPlan, planProblem, powerCapacity, powerDemand, PROJECT_IDS, PROJECTS, repairFlags, toggleProject, type ProjectId, type RepairPlan } from './planning';
import { useFutureNavigation } from './navigation';
import { useFutureRepairs } from './visualState';
import './future.css';

type Action = { kind: 'toggle'; id: ProjectId } | { kind: 'commit'; shift: number } | { kind: 'reset' };
function reducer(s: RepairPlan, a: Action) {
    if (a.kind === 'reset') return newRepairPlan();
    return a.kind === 'toggle' ? toggleProject(s, a.id) : commitShift(s, a.shift);
}
export function FutureStart() {
    const { t } = useTranslation('experience-future-earth');
    const script = useExperience(s => s.script);
    return <div className="future-start"><p>{script?.era}</p><h1>{script?.title}</h1><p>{t('ui.note')}</p><button onClick={() => useExperience.getState().begin()}>{t('ui.enter')} →</button></div>;
}

export function FutureOverlay() {
    const { t } = useTranslation('experience-future-earth');
    const beat = useCurrentBeat();
    const active = useExperience(s => s.activeHotspotId);
    const visited = useExperience(s => s.visitedHotspots);
    const flags = useExperience(s => s.flags);
    const [plan, dispatch] = useReducer(reducer, undefined, newRepairPlan);
    const [review, setReview] = useState(false);
    const [resetPrompt, setResetPrompt] = useState(false);
    const [policy, setPolicy] = useState<string | null>(null);
    const panel = useRef<HTMLDivElement>(null);
    const heading = useRef<HTMLHeadingElement>(null);
    const back = useRef<HTMLButtonElement>(null);
    const previous = useRef<string | null>(null);
    const previousShift = useRef(plan.shift);
    const previousBeat = useRef(beat?.id);
    const sent = useRef(false);
    const beatId = beat?.id;
    useEffect(() => { useFutureRepairs.getState().show(plan.completed); }, [plan.completed]);
    useEffect(() => {
        if (panel.current) panel.current.scrollTop = 0;
        const stageChanged = previousShift.current !== plan.shift || previousBeat.current !== beatId;
        if (active || policy || review || resetPrompt) back.current?.focus({ preventScroll: true });
        else if (stageChanged) heading.current?.focus({ preventScroll: true });
        else {
            const origin = previous.current ? document.getElementById(previous.current) as HTMLButtonElement | null : null;
            if (origin && !origin.disabled) { origin.focus({ preventScroll: true }); origin.scrollIntoView({ block: 'nearest' }); }
            else heading.current?.focus({ preventScroll: true });
        }
        previousShift.current = plan.shift; previousBeat.current = beatId;
        previous.current = active ? `future-place-${active}` : policy ? `future-policy-${policy}` : review ? 'future-review' : resetPrompt ? 'future-reset' : null;
    }, [active, policy, review, resetPrompt, plan.shift, beatId]);
    useEffect(() => {
        const escape = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            useExperience.getState().openHotspot(null); setReview(false); setResetPrompt(false); setPolicy(null);
        };
        window.addEventListener('keydown', escape);
        return () => window.removeEventListener('keydown', escape);
    }, []);
    if (!beat || (beat.kind !== 'explore' && beat.kind !== 'choice')) return null;
    const hotspot = beat.kind === 'explore' ? beat.hotspots.find(h => h.id === active) : null;
    const selectedPolicy = beat.kind === 'choice' ? beat.options.find(o => o.id === policy) : null;
    const current = () => useExperience.getState().beatId === beat.id && useExperience.getState().script?.chapterId === 'future-earth';
    const finished = plan.shift === 2;
    const record = (completed: ProjectId[]) => <ul className="future-record">{PROJECT_IDS.map(id => <li key={id} data-ready={completed.includes(id)}><span aria-hidden>{completed.includes(id) ? '✓' : '○'}</span><span>{t(`projects.${id}.name`)}</span><small>{t(completed.includes(id) ? 'ui.ready' : 'ui.pending')}</small></li>)}</ul>;
    return <section className="future-console" aria-label={beat.kind === 'explore' ? t('ui.places') : beat.title}>
        <div className="future-topline"><span>{t('ui.note')}</span><button onClick={() => { useExperience.getState().openHotspot(null); useFutureNavigation.getState().resetView(); }} aria-label={t('ui.resetView')}>⌂ <span>{t('ui.resetView')}</span></button></div>
        <div ref={panel} className="future-panel">
            {beat.kind === 'explore' ? <>
                <p className="future-kicker">{t('ui.places')} · {visited.length}/5</p><h2 ref={heading} tabIndex={-1}>{beat.prompt}</h2><p className="future-muted">{t('ui.hint')}</p>
                {hotspot ? <article><h3>{hotspot.title}</h3><p>{hotspot.description}</p><div className="future-actions"><button ref={back} onClick={() => useExperience.getState().openHotspot(null)}>{t('ui.close')}</button>{hotspot.advancesTo && <button className="future-primary" onClick={() => { if (current()) useExperience.getState().gotoBeat(hotspot.advancesTo!); }}>{t('ui.begin')} →</button>}</div></article> : <div className="future-places">{beat.hotspots.map((h, i) => <button key={h.id} id={`future-place-${h.id}`} onClick={() => { useExperience.getState().visitHotspot(h.id); useExperience.getState().openHotspot(h.id); }}><span>{visited.includes(h.id) ? '✓' : `0${i + 1}`}</span>{h.label}<span aria-hidden>↗</span></button>)}</div>}
            </> : beat.id === 'dispatch' ? <>
                <p className="future-kicker">{beat.title}</p><h2 ref={heading} tabIndex={-1}>{resetPrompt ? t('ui.resetQuestion') : finished ? t('ui.record') : `${t('ui.shift')} ${plan.shift + 1} / 2 · ${review ? t('ui.review') : beat.title}`}</h2>
                {resetPrompt ? <div role="alertdialog" aria-label={t('ui.resetQuestion')}><div className="future-actions"><button ref={back} onClick={() => setResetPrompt(false)}>{t('ui.cancel')}</button><button id="future-confirm-reset" className="future-primary" onClick={() => { dispatch({ kind: 'reset' }); setResetPrompt(false); setReview(false); sent.current = false; }}>{t('ui.confirmReset')}</button></div></div> : finished ? <>
                    <p>{t('ui.done')}</p>{record(plan.completed)}
                    <ol className="future-history">{plan.history.map((ids, i) => <li key={i}>{t('ui.shift')} {i + 1}: {ids.map(id => t(`projects.${id}.name`)).join(' · ')}</li>)}</ol>
                    <p className="future-muted">{t('ui.field')}</p><button id="future-record-next" className="future-primary" onClick={() => { if (current() && !sent.current) { sent.current = true; useExperience.getState().choose(undefined, repairFlags(plan), 'hearing'); } }}>{t('ui.next')} →</button>
                </> : <>
                    <div className="future-resources" aria-live="polite"><div><span>{t('ui.crew')}</span><strong>{crewDemand(plan.draft)} / 3</strong></div><div><span>{t('ui.power')}</span><strong>{powerDemand([...plan.completed, ...plan.draft])} / {powerCapacity(plan)}</strong></div></div>
                    <p className="future-muted">{plan.shift > 0 ? t('ui.completedShift') : t('ui.crewRule')}</p><p className="future-rule">{t('ui.gridRule')}</p>
                    {review ? <><ul className="future-review-list">{plan.draft.map(id => <li key={id}><strong>{t(`projects.${id}.name`)}</strong><p>{t(`projects.${id}.description`)}</p></li>)}</ul><p>{t('ui.nextPower')}: {plan.completed.includes('grid') || plan.draft.includes('grid') ? 4 : 2}</p><div className="future-actions"><button ref={back} onClick={() => setReview(false)}>{t('ui.edit')}</button><button id="future-commit-shift" className="future-primary" onClick={() => { if (current()) { dispatch({ kind: 'commit', shift: plan.shift }); setReview(false); } }}>{t('ui.dispatch')} →</button></div></> : <>
                        <div className="future-projects">{PROJECT_IDS.map(id => {
                            const selected = plan.draft.includes(id), complete = plan.completed.includes(id);
                            const problem = selected ? null : planProblem(plan, [...plan.draft, id]);
                            const reason = complete ? t('ui.ready') : problem === 'crews' ? t('ui.crews') : problem === 'power' ? t('ui.powerLimit') : selected ? t('ui.selected') : t('ui.add');
                            return <button key={id} id={`future-project-${id}`} aria-pressed={selected} disabled={complete || !!problem} onClick={() => dispatch({ kind: 'toggle', id })} data-ready={complete}><span className="future-project-head"><strong>{t(`projects.${id}.name`)}</strong><span aria-hidden>{complete ? '✓' : selected ? '−' : '+'}</span></span><span className="future-project-copy">{t(`projects.${id}.description`)}</span><span className="future-project-cost">{t('ui.crew')}: {PROJECTS[id].crews} · {t('ui.power')}: {PROJECTS[id].power}</span><small>{reason}</small></button>;
                        })}</div>
                        <button id="future-review" className="future-primary" disabled={!plan.draft.length} onClick={() => setReview(true)}>{t('ui.review')} →</button>{!plan.draft.length && <p className="future-muted">{t('ui.empty')}</p>}
                    </>}
                </>}
                {!resetPrompt && <button id="future-reset" className="future-reset" onClick={() => setResetPrompt(true)}>{t('ui.reset')}</button>}
            </> : <>
                <p className="future-kicker">{beat.title}</p><h2 ref={heading} tabIndex={-1}>{beat.prompt}</h2>{record(PROJECT_IDS.filter(id => flags.includes(`future:${id}`)))}
                {selectedPolicy ? <article><h3>{selectedPolicy.label}</h3><p>{selectedPolicy.description}</p><div className="future-actions"><button ref={back} onClick={() => setPolicy(null)}>{t('ui.reconsider')}</button><button id="future-confirm-policy" className="future-primary" onClick={() => { if (current() && !sent.current) { sent.current = true; useExperience.getState().choose(selectedPolicy.effects, selectedPolicy.flags, selectedPolicy.next); } }}>{t('ui.confirmPolicy')} →</button></div></article> : <div className="future-policy-options">{beat.options.map(o => <button key={o.id} id={`future-policy-${o.id}`} onClick={() => setPolicy(o.id)}><strong>{o.label}</strong><span>{o.description}</span></button>)}</div>}
            </>}
        </div>
    </section>;
}
