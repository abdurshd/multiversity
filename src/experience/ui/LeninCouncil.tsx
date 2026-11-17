import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentBeat, useExperience } from '../store';
import './lenin.css';

/** Chapter-local, DOM-first navigation: every 3D hotspot has an equivalent
 * keyboard/touch button. Selection is a preview; only commit mutates the run. */
export function LeninCouncil() {
    const { t } = useTranslation('experience-lenin-revolution');
    const beat = useCurrentBeat();
    const active = useExperience((s) => s.activeHotspotId);
    const visited = useExperience((s) => s.visitedHotspots);
    const flags = useExperience((s) => s.flags);
    const [selected, setSelected] = useState<string | null>(null);
    const focusRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const previous = useRef<string | null>(null);
    const id = beat?.id;
    useEffect(() => { setSelected(null); }, [id]);
    useEffect(() => {
        // Preview/lore replace scrollable content; always reveal its heading.
        if (panelRef.current) panelRef.current.scrollTop = 0;
        const openId = active ?? selected;
        if (openId) focusRef.current?.focus({ preventScroll: true });
        else if (previous.current) document.getElementById(`lenin-${previous.current}`)?.focus({ preventScroll: true });
        previous.current = openId;
        const escape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { useExperience.getState().openHotspot(null); setSelected(null); }
        };
        window.addEventListener('keydown', escape);
        return () => window.removeEventListener('keydown', escape);
    }, [active, selected, id]);
    if (!beat || (beat.kind !== 'explore' && beat.kind !== 'choice')) return null;
    const h = beat.kind === 'explore' ? beat.hotspots.find((spot) => spot.id === active) : null;
    const option = beat.kind === 'choice' ? beat.options.find((o) => o.id === selected) : null;
    const commitments = flags.filter((f) => ['accountable', 'coerced', 'deferred', 'plural', 'party', 'election'].includes(f));
    const commit = () => {
        // Rapid clicks / stale handlers must never commit an old choice twice.
        if (useExperience.getState().beatId !== beat.id || !option) return;
        useExperience.getState().choose(option.effects, option.flags, option.next);
        setSelected(null);
    };
    return <section className="lenin-council" aria-label={beat.kind === 'explore' ? t('ui.places') : beat.title}>
        <div className="lenin-caption">{t('ui.note')}</div>
        <div ref={panelRef} className="lenin-panel">
            <header><p className="lenin-eyebrow">{beat.kind === 'explore' ? t('ui.places') : beat.title}</p>
                <h2>{beat.prompt}</h2>
                {beat.kind === 'explore' && <p className="lenin-hint">{t('ui.hint')}</p>}
            </header>
            {beat.kind === 'choice' && <aside className="lenin-commitments" aria-label={t('ui.commitments')}>
                <strong>{t('ui.commitments')}</strong>
                <span>{commitments.length ? commitments.map((f) => t(`ui.${f}`)).join(' · ') : t('ui.empty')}</span>
            </aside>}
            {h ? <article aria-live="polite"><h3>{h.title}</h3><p>{h.description}</p>
                <div className="lenin-actions"><button ref={focusRef} onClick={() => useExperience.getState().openHotspot(null)}>{t('ui.back')}</button>
                    {h.advancesTo && <button className="lenin-primary" onClick={() => {
                        if (useExperience.getState().beatId === beat.id) useExperience.getState().gotoBeat(h.advancesTo!);
                    }}>{t('ui.continue')} →</button>}</div>
            </article> : option ? <article aria-live="polite"><h3>{option.label}</h3><p>{option.description}</p>
                <div className="lenin-actions"><button ref={focusRef} onClick={() => setSelected(null)}>{t('ui.cancel')}</button><button className="lenin-primary" onClick={commit}>{t('ui.confirm')} →</button></div>
            </article> : <div className="lenin-options">
                {beat.kind === 'explore' ? beat.hotspots.map((spot, i) => <button id={`lenin-${spot.id}`} key={spot.id} onClick={() => { useExperience.getState().visitHotspot(spot.id); useExperience.getState().openHotspot(spot.id); }}>
                    <span className="lenin-number">{visited.includes(spot.id) ? '✓' : `0${i + 1}`}</span><strong>{spot.label}</strong><span aria-hidden>↗</span>
                </button>) : beat.options.map((o, i) => <button id={`lenin-${o.id}`} key={o.id} onClick={() => setSelected(o.id)}>
                    <span className="lenin-number">0{i + 1}</span><span><strong>{o.label}</strong><small>{o.description}</small></span><span aria-hidden>→</span>
                </button>)}
            </div>}
        </div>
    </section>;
}
