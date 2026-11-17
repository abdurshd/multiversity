import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCurrentBeat, useExperience } from '../store';
import type { StatKey } from '../types';
import { unionChoose, unionContinue, unionNarration, useUnionCamera } from './unionActions';
import './union.css';

export function UnionOverlay() {
    const { t } = useTranslation('experience-ussr-collapse');
    const beat = useCurrentBeat();
    const s = useExperience();
    const request = useUnionCamera(state => state.request);
    const heading = useRef<HTMLHeadingElement>(null);
    const panel = useRef<HTMLElement>(null);
    const reportHeading = useRef<HTMLHeadingElement>(null);
    const reportCard = useRef<HTMLElement>(null);
    const reportButtons = useRef<Record<string, HTMLButtonElement | null>>({});
    useEffect(() => {
        panel.current?.scrollTo(0, 0);
        heading.current?.focus({ preventScroll: true });
    }, [s.beatId, s.phase, s.narrationIndex]);
    useEffect(() => {
        if (!s.activeHotspotId || beat?.kind !== 'explore') return;
        reportHeading.current?.focus({ preventScroll: true });
        reportCard.current?.scrollIntoView({ block: 'nearest' });
    }, [s.activeHotspotId, beat]);
    const closeReport = () => {
        const id = s.activeHotspotId;
        s.openHotspot(null);
        request('overview');
        if (id) reportButtons.current[id]?.focus({ preventScroll: true });
        if (id) reportButtons.current[id]?.scrollIntoView({ block: 'nearest' });
    };
    if (!s.script || !beat) return null;
    const interactive = s.phase === 'explore' || s.phase === 'choice';
    const reports = beat.kind === 'explore' ? beat.hotspots.filter(h => !h.advancesTo) : [];
    const read = reports.filter(h => s.visitedHotspots.includes(h.id)).length;
    const report = beat.kind === 'explore' ? reports.find(h => h.id === s.activeHotspotId) : undefined;
    const title = s.phase === 'loading' ? s.script.title : s.phase === 'ending' ? s.ending?.title : beat.kind === 'choice' ? beat.title : beat.kind === 'explore' ? beat.prompt : s.script.era;
    return <div className="union-ui">
        {s.phase !== 'loading' && <div className="union-ledger" aria-label={t('ui.ledger')}>
            {(Object.keys(s.stats) as StatKey[]).map(key => <div key={key}><span>{t(`ui.stats.${key}`)}</span><strong>{s.stats[key]}</strong><meter min={0} max={100} value={s.stats[key]} aria-label={t(`ui.stats.${key}`)} /></div>)}
        </div>}
        {interactive && <nav className="union-camera" aria-label={t('ui.camera')}>
            {(['left', 'right', 'in', 'out', 'overview'] as const).map((command, i) => <button key={command} onClick={() => request(command)} aria-label={t(`ui.${command}`)} title={t(`ui.${command}`)}>{['↶', '↷', '+', '−', '⌂'][i]}</button>)}
        </nav>}
        <section ref={panel} onKeyDown={e => { if (e.key === 'Escape' && s.activeHotspotId) { e.preventDefault(); closeReport(); } }} className={`union-panel ${s.phase === 'loading' || s.phase === 'ending' ? 'union-panel-wide' : ''}`} aria-label={t('ui.story')}>
            <div className="union-eyebrow">{t(s.phase === 'ending' && s.ending?.id === 'record' ? 'ui.historical' : 'ui.simulation')}</div>
            <h1 tabIndex={-1} ref={heading}>{title}</h1>
            {s.phase === 'loading' && <>
                <p>{t('ui.intro')}</p><p className="union-muted">{t('ui.help')}</p>
                <button className="union-primary" onClick={() => { if (useExperience.getState().phase === 'loading') s.begin(); }}>{t('ui.begin')}</button>
            </>}
            {s.phase === 'cinematic' && beat.kind === 'cinematic' && <>
                <p className="union-narration">{beat.narration[s.narrationIndex]?.text}</p>
                <div className="union-actions"><button className="union-primary" onClick={() => unionNarration(beat.id, s.narrationIndex)}>{t('ui.next')} <span aria-hidden="true">→</span></button>
                    <button onClick={() => unionNarration(beat.id, s.narrationIndex, true)}>{t('ui.skip')}</button><span>{s.narrationIndex + 1} / {beat.narration.length}</span></div>
            </>}
            {s.phase === 'explore' && beat.kind === 'explore' && <>
                <p className="union-muted">{t('ui.inspect')} <strong aria-live="polite">{read} / {reports.length}</strong></p>
                <div className="union-reports">{reports.map(h => <button key={h.id} ref={node => { reportButtons.current[h.id] = node; }} aria-pressed={report?.id === h.id} onClick={() => { s.visitHotspot(h.id); s.openHotspot(h.id); }}><span aria-hidden="true">{s.visitedHotspots.includes(h.id) ? '✓' : '◇'}</span> {h.label}</button>)}</div>
                {report && <article ref={reportCard} className="union-report"><div className="union-report-title"><h2 ref={reportHeading} tabIndex={-1}>{report.title}</h2><button onClick={closeReport} aria-label={t('ui.close')}>×</button></div><p>{report.description}</p></article>}
                <button className="union-primary" disabled={read < reports.length} onClick={() => unionContinue(beat.id)}>{t(read < reports.length ? 'ui.readFirst' : 'ui.meeting')}</button>
            </>}
            {s.phase === 'choice' && beat.kind === 'choice' && <>
                <p>{beat.prompt}</p><div className="union-options">{beat.options.map(o => <button key={o.id} onClick={() => unionChoose(beat.id, o.id)}><strong>{o.label}</strong><span>{o.description}</span><small>{Object.entries(o.effects ?? {}).map(([k, v]) => `${t(`ui.stats.${k}`)} ${v > 0 ? '+' : ''}${v}`).join(' · ')}</small></button>)}</div>
            </>}
            {s.phase === 'ending' && s.ending && <>
                <p className="union-subtitle">{s.ending.subtitle}</p>{s.ending.epilogue.map((line, i) => <p key={i}>{line.text}</p>)}
                <details><summary>{t('ui.decisions')}</summary><ul>{s.flags.map(flag => <li key={flag}>{t(`ui.flags.${flag}`)}</li>)}</ul></details>
                <div className="union-actions"><button className="union-primary" onClick={() => { s.reset(); request('overview'); }}>{t('ui.replay')}</button><Link to="/chapters/ussr-collapse">{t('ui.exit')}</Link></div>
            </>}
            <details className="union-sources"><summary>{t('ui.sources')}</summary><p>{t('ui.sourceNote')}</p><ul>
                <li><a href="https://www.refworld.org/legal/legislation/cis/1991/150189" target="_blank" rel="noreferrer">{t('ui.alma')}</a></li>
                <li><a href="https://www.rada.gov.ua/en/print/230954.html" target="_blank" rel="noreferrer">{t('ui.ukraine')}</a></li>
                <li><a href="https://history.state.gov/departmenthistory/short-history/berlinwall" target="_blank" rel="noreferrer">{t('ui.resignation')}</a></li>
                <li><a href="https://www.imf.org/external/pubs/ft/ar/archive/pdf/ar1992.pdf" target="_blank" rel="noreferrer">{t('ui.economy')}</a></li>
            </ul></details>
        </section>
    </div>;
}
