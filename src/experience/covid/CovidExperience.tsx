import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { ExperienceScript } from '../types';
import { localizeScript } from '../localizeScript';
import { useCurrentBeat, useExperience } from '../store';
import { CovidWorld } from './CovidWorld';
import type { CovidEnvironment } from './architecture';
import { CovidCamera } from './CovidCamera';
import { advanceCovidScene, chooseCovidOption, CRATES, DESTINATIONS, openCovidManifest, openCovidReport, totalCrates, useCovidShift } from './model';
import './covid.css';
import { canRenderCovid3D } from './webgl';

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
function Scene() {
    const beat = useCurrentBeat();
    const environment: CovidEnvironment = beat && beat.kind !== 'ending' ? beat.environment as CovidEnvironment : 'covid-briefing';
    return <><CovidWorld environment={environment} /><CovidCamera /></>;
}
function Sources() {
    const { t } = useTranslation('experience-covid-pandemic');
    return <details className="covid-sources"><summary>{t('ui.sources')}</summary>
        <p>{t('ui.disclaimer')}</p><p>{t('ui.noForecast')}</p>
        <a href="https://www.who.int/europe/emergencies/situations/covid-19/" target="_blank" rel="noreferrer">{t('ui.sourceTimeline')}</a>
        <a href="https://www.who.int/news-room/detail/30-03-2020-who-releases-guidelines-to-help-countries-maintain-essential-health-services-during-the-covid-19-pandemic" target="_blank" rel="noreferrer">{t('ui.sourceServices')}</a>
        <a href="https://www.who.int/publications/i/item/risk-communication-and-community-engagement-readiness-and-initial-response-for-novel-coronaviruses" target="_blank" rel="noreferrer">{t('ui.sourceTrust')}</a>
    </details>;
}
function Manifest() {
    const { t } = useTranslation('experience-covid-pandemic');
    const { allocation, adjust, seal } = useCovidShift();
    const remaining = CRATES - totalCrates(allocation);
    return <>
        <p>{t('ui.allocation')}</p><p className="covid-disclaimer">{t('ui.bridgePlan')}</p>
        <p role="status" className="covid-count">{t('ui.remaining')}: {remaining} / {CRATES}</p>
        <div className="covid-allocation">{DESTINATIONS.map(id => <div className={`covid-destination covid-${id}`} key={id}>
            <h3>{t(`ui.${id}`)}</h3><p>{t(`ui.${id}Need`)}</p>
            <div className="covid-stepper">
                <button disabled={allocation[id] === 0} onClick={() => adjust(id, -1)} aria-label={`${t('ui.remove')}: ${t(`ui.${id}`)}`}>−</button>
                <output aria-label={t(`ui.${id}`)}>{allocation[id]}</output>
                <button disabled={remaining === 0} onClick={() => adjust(id, 1)} aria-label={`${t('ui.add')}: ${t(`ui.${id}`)}`}>+</button>
            </div>
        </div>)}</div>
        <button className="covid-primary" disabled={remaining !== 0} onClick={seal}>{t('ui.confirm')}</button>
    </>;
}
function Record() {
    const { t } = useTranslation('experience-covid-pandemic');
    const allocation = useCovidShift(s => s.allocation);
    const flags = useExperience(s => s.flags);
    const script = useExperience(s => s.script);
    const choices = ['roster', 'briefing', 'correction'].flatMap(id => {
        const beat = script?.beats[id];
        return beat?.kind === 'choice' ? beat.options.filter(o => flags.includes(`choice:${id}:${o.id}`)) : [];
    });
    return <div className="covid-record"><h3>{t('ui.receipt')}</h3>
        <ul>{DESTINATIONS.map(id => <li key={id}>{t(`ui.${id}`)}: {allocation[id]}</li>)}</ul>
        {choices.map(o => <p key={o.id}>{o.label}</p>)}
    </div>;
}
function CovidOverlay({ hidden }: { hidden: boolean }) {
    const { t } = useTranslation('experience-covid-pandemic');
    const run = useExperience();
    const beat = useCurrentBeat();
    const heading = useRef<HTMLHeadingElement>(null);
    const sheet = useRef<HTMLElement>(null);
    const reportHeading = useRef<HTMLHeadingElement>(null);
    const reportButtons = useRef<Record<string, HTMLButtonElement | null>>({});
    const lastReport = useRef<string | null>(null);
    useEffect(() => { heading.current?.focus({ preventScroll: true }); sheet.current?.scrollTo(0, 0); }, [run.beatId, run.phase, run.narrationIndex]);
    useEffect(() => {
        if (run.beatId !== 'reports') { lastReport.current = null; return; }
        if (run.activeHotspotId) {
            lastReport.current = run.activeHotspotId;
            reportHeading.current?.focus({ preventScroll: true });
            reportHeading.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
        } else if (lastReport.current) {
            // Spatial markers have an equivalent DOM button, so closing always
            // returns to a visible, keyboard-reachable report control.
            reportButtons.current[lastReport.current]?.focus();
            lastReport.current = null;
        }
    }, [run.activeHotspotId, run.beatId]);
    useEffect(() => {
        if (run.beatId !== 'reports' || !run.activeHotspotId) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') { event.preventDefault(); openCovidReport(null); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [run.activeHotspotId, run.beatId]);
    const restart = () => { useCovidShift.getState().reset(); run.reset(); };
    if (!run.script) return null;
    const line = beat?.kind === 'cinematic' ? beat.narration[run.narrationIndex] : null;
    const active = beat?.kind === 'explore' ? beat.hotspots.find(h => h.id === run.activeHotspotId) : null;
    const visited = ['ward', 'ledger', 'radio'].filter(id => run.visitedHotspots.includes(id)).length;
    const title = run.phase === 'loading' ? run.script.title : run.phase === 'ending' ? run.ending?.title : line ? line.speaker : beat?.kind === 'choice' ? beat.title : beat?.id === 'manifest' ? t('ui.shipmentTitle') : t('ui.inspectTitle');
    const stage = ['arrival', 'reports'].includes(run.beatId ?? '') ? 0 : ['manifest', 'loading'].includes(run.beatId ?? '') ? 1 : run.beatId === 'roster' ? 2 : ['briefing', 'correction'].includes(run.beatId ?? '') ? 3 : 4;
    return <section hidden={hidden} ref={sheet} className={`covid-sheet ${run.phase === 'loading' || run.phase === 'ending' ? 'covid-full' : ''}`} aria-label={title}>
        <nav className="covid-progress" aria-label={t('ui.shift')}>{['stageReports', 'stageDispatch', 'stageRoster', 'stageBriefing', 'stageHandover'].map((key, i) => <span key={key} className={i === stage ? 'current' : i < stage ? 'done' : ''} aria-current={i === stage ? 'step' : undefined}><b>{i < stage ? '✓' : String(i + 1).padStart(2, '0')}</b>{t(`ui.${key}`)}</span>)}</nav>
        <p className="covid-kicker">{run.script.era}</p>
        <h1 ref={heading} tabIndex={-1}>{title}</h1>
        {run.phase === 'loading' && <><p className="covid-lead">{t('ui.intro')}</p><p className="covid-disclaimer">{t('ui.disclaimer')}</p><button className="covid-primary" onClick={() => { if (useExperience.getState().phase === 'loading') run.begin(); }}>{t('ui.start')}</button><Sources /></>}
        {run.phase === 'cinematic' && line && <><p className="covid-lead">{line.text}</p><div className="covid-actions"><button className="covid-primary" onClick={() => advanceCovidScene(run.beatId, run.narrationIndex)}>{t('ui.next')}</button><button onClick={() => advanceCovidScene(run.beatId, run.narrationIndex, true)}>{t('ui.skip')}</button></div></>}
        {run.phase === 'explore' && beat?.kind === 'explore' && beat.id === 'reports' && <>
            <p>{t('ui.inspect')}</p><p className="covid-count" role="status">{t('ui.evidence')}: {visited} / 3</p>
            <div className="covid-reports">{beat.hotspots.map((h, index) => <button key={h.id} ref={element => { reportButtons.current[h.id] = element; }} aria-pressed={active?.id === h.id} onClick={() => openCovidReport(h.id)}>{index + 1}. {h.label}{run.visitedHotspots.includes(h.id) ? ` · ${t('ui.reviewed')}` : ''}</button>)}</div>
            {active && <article className="covid-report" aria-live="polite"><h2 ref={reportHeading} tabIndex={-1}>{active.title}</h2><p>{active.description}</p><button onClick={() => openCovidReport(null)}>{t('ui.close')}</button></article>}
            <button className="covid-primary" disabled={visited < 3} onClick={openCovidManifest}>{t('ui.dispatch')}</button>
        </>}
        {run.phase === 'explore' && beat?.id === 'manifest' && <Manifest />}
        {run.phase === 'choice' && beat?.kind === 'choice' && <><p className="covid-lead">{beat.prompt}</p><div className="covid-options">{beat.options.map(o => <button key={o.id} onClick={() => chooseCovidOption(beat.id, o.id)}><strong>{o.label}</strong><span>{o.description}</span></button>)}</div></>}
        {run.phase === 'ending' && run.ending && <><p className="covid-lead">{run.ending.subtitle}</p>{run.ending.epilogue.map((l, i) => <p key={i}>{l.text}</p>)}<Record /><p className="covid-disclaimer">{t('ui.noForecast')}</p><div className="covid-actions"><button className="covid-primary" onClick={restart}>{t('ui.replay')}</button><Link to="/chapters/covid-pandemic">{t('ui.back')}</Link></div><Sources /></>}
    </section>;
}
export function CovidExperience({ script }: { script: ExperienceScript }) {
    const { t, i18n } = useTranslation('experience-covid-pandemic');
    const mounted = useRef(false);
    const phase = useExperience(s => s.phase);
    const beatId = useExperience(s => s.beatId);
    const [panelHidden, setPanelHidden] = useState(false);
    useEffect(() => setPanelHidden(false), [beatId, phase]);
    const [webglAvailable] = useState(() => canRenderCovid3D());
    useEffect(() => {
        const localized = localizeScript(script, t);
        if (!mounted.current) {
            useCovidShift.getState().reset(); useExperience.getState().loadScript(localized); mounted.current = true;
        } else {
            // Switching language is presentation-only: preserve manifest, evidence and narrative position.
            useExperience.setState(s => ({ script: localized, ending: s.ending ? localized.endings.find(e => e.id === s.ending?.id) ?? null : null }));
        }
    }, [script, t, i18n.language]);
    useEffect(() => {
        const previous = document.body.style.overflow; document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previous; };
    }, []);
    const fallback = <p className="covid-webgl-notice" role="status">{t('ui.fallback')}</p>;
    return <main className={`covid-experience covid-phase-${phase}${panelHidden ? ' covid-panel-hidden' : ''}`} data-webgl={webglAvailable ? 'available' : 'unavailable'}>
        <div className="covid-viewport" aria-label={t('ui.view')}>
            {webglAvailable ? <SceneBoundary fallback={fallback}><Canvas shadows dpr={[1, 1.5]} camera={{ position: [12, 6.5, 18], fov: 52, near: 0.1, far: 160 }} gl={{ antialias: true, powerPreference: 'low-power' }} fallback={fallback}><Suspense fallback={null}><Scene /></Suspense></Canvas></SceneBoundary> : fallback}
        </div>
        <header className="covid-toolbar"><Link to="/chapters/covid-pandemic">← {t('ui.exit')}</Link>
            <button onClick={() => useCovidShift.getState().overview()}>{t('ui.overview')}</button>
            <span className="covid-shift-label"><i />{t('ui.shift')}</span>
            <button aria-expanded={!panelHidden} className="covid-panel-toggle" onClick={() => setPanelHidden(v => !v)}>{t(panelHidden ? 'ui.showPanel' : 'ui.hidePanel')}</button>
            <select aria-label={t('ui.language')} value={i18n.language.split('-')[0]} onChange={e => void i18n.changeLanguage(e.target.value)}><option value="en">EN</option><option value="uz">UZ</option><option value="ko">KO</option></select>
        </header>
        <p className="covid-scene-hint">{t('ui.sceneHint')}</p>
        <CovidOverlay hidden={panelHidden} />
    </main>;
}
