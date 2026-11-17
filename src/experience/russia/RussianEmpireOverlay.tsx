import { useEffect, useReducer, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentBeat, useExperience } from '../store';
import { newNegotiation, negotiationOutcome, propose, PROPOSALS } from './negotiation';
import { RUSSIA_TEXT } from './text';
import './russia.css';

export function RussianEmpireOverlay() {
    const { i18n } = useTranslation();
    const t = RUSSIA_TEXT[(i18n.resolvedLanguage?.split('-')[0] || 'en') as keyof typeof RUSSIA_TEXT] ?? RUSSIA_TEXT.en;
    const beat = useCurrentBeat();
    const activeId = useExperience((s) => s.activeHotspotId);
    const open = useExperience((s) => s.openHotspot);
    const visit = useExperience((s) => s.visitHotspot);
    const visited = useExperience((s) => s.visitedHotspots);
    const choose = useExperience((s) => s.choose);
    const [deal, dispatch] = useReducer((s: ReturnType<typeof newNegotiation>, a: { round: number; option: number } | { reset: true }) => 'reset' in a ? newNegotiation() : propose(s, a.round, a.option), undefined, newNegotiation);
    const closeRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const lastHotspot = useRef<string | null>(null);
    const sent = useRef(false);
    useEffect(() => {
        if (activeId) closeRef.current?.focus({ preventScroll: true });
        else if (lastHotspot.current) document.getElementById(`russia-${lastHotspot.current}`)?.focus({ preventScroll: true });
        lastHotspot.current = activeId;
    }, [activeId]);
    useEffect(() => {
        const key = (e: KeyboardEvent) => { if (e.key === 'Escape') open(null); };
        window.addEventListener('keydown', key);
        return () => window.removeEventListener('keydown', key);
    }, [open]);
    useEffect(() => {
        panelRef.current?.scrollTo({ top: 0 });
        headingRef.current?.focus({ preventScroll: true });
    }, [deal.round, beat?.id]);
    const labels = [[t.standDown, t.guarded], [t.civic, t.officers], [t.abolition, t.defer]];
    const descriptions = [[t.standDownText, t.guardedText], [t.civicText, t.officersText], [t.abolitionText, t.deferText]];
    if (beat?.kind === 'explore') {
        const evidenceReady = ['monument', 'regiments', 'documents'].every(id => visited.includes(id));
        const h = beat.hotspots.find((spot) => spot.id === activeId);
        return <>
            <header className="russia-objective"><span>{t.historyLabel}</span><h2>{t.explore}</h2><p>{t.instruction}</p></header>
            <section className="russia-dock" aria-label={t.evidence}>
                {h ? <article className="russia-lore"><div className="russia-row"><h3>{h.title}</h3><button ref={closeRef} className="russia-close" onClick={() => open(null)} aria-label={t.close}>×</button></div><p>{h.description}</p>
                    {h.advancesTo && <button className="russia-primary" disabled={!evidenceReady} onClick={() => { if (evidenceReady) choose(undefined, undefined, h.advancesTo!); }}>{evidenceReady ? t.start + ' →' : t.readFirst}</button>}
                </article> : <div className="russia-stations">{beat.hotspots.map(h => <button id={`russia-${h.id}`} key={h.id} onClick={() => { visit(h.id); open(h.id); }}><span aria-hidden>{visited.includes(h.id) ? '✓' : h.icon}</span>{h.label}</button>)}</div>}
            </section>
        </>;
    }
    if (beat?.kind !== 'choice' || beat.id !== 'negotiation') return null;
    const outcome = negotiationOutcome(deal);
    const result = beat.options.find(o => o.id === outcome);
    const rounds = [t.round1, t.round2, t.round3];
    return <section className="russia-negotiation" aria-label={t.negotiationTitle}>
        <div ref={panelRef} className="russia-panel">
            <div className="russia-row"><span className="russia-kicker">{t.negotiationTitle}</span><span>{t.seals}: <strong>{deal.seals}/5</strong></span></div>
            <div className="russia-meters" aria-live="polite">{(['safety','mandate','rights'] as const).map(key => <div key={key}><span>{t[key]}</span><strong>{deal[key]}/{key === 'rights' ? 2 : 3}</strong><meter min={0} max={key === 'rights' ? 2 : 3} value={deal[key]} aria-label={t[key]} /></div>)}</div>
            <h2 ref={headingRef} tabIndex={-1}>{outcome ? t.review : rounds[deal.round]}</h2>
            <p>{outcome ? t.preview + ': ' + result?.label : t.negotiationPrompt}</p>
            {!outcome ? <div className="russia-proposals">{PROPOSALS[deal.round].map((option, i) => <button key={option.id} disabled={option.cost > deal.seals} onClick={() => dispatch({ round: deal.round, option: i })}>
                <span className="russia-cost">{option.cost > deal.seals ? t.insufficient : option.cost ? `${t.cost}: ${option.cost}` : t.free}</span><strong>{labels[deal.round][i]}</strong><p>{descriptions[deal.round][i]}</p>
                <small>{option.safety ? `${t.safety} +${option.safety}` : option.mandate ? `${t.mandate} +${option.mandate}` : option.rights ? `${t.rights} +${option.rights}` : '—'}</small>
            </button>)}</div> : <>
                <ol className="russia-review">{deal.choices.map((id, round) => <li key={id}>{labels[round][PROPOSALS[round].findIndex(p => p.id === id)]}</li>)}</ol>
                <p>{result?.description}</p>
                <button className="russia-primary" onClick={() => { if (result && !sent.current) { sent.current = true; choose(result.effects, result.flags, result.next); } }}>{t.submit} →</button>
            </>}
            <p className="russia-model">{t.outcomeRule}</p><p className="russia-model">{t.modelNote}</p>
            <button className="russia-reset" onClick={() => { sent.current = false; dispatch({ reset: true }); }}>{t.reset}</button>
        </div>
    </section>;
}
