import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { ExperienceScript } from '../types';
import { localizeScript } from '../localizeScript';
import { useCurrentBeat, useExperience } from '../store';
import { CivicWorld } from './CivicWorld';
import { CivicCamera } from './CivicCamera';
import type { CivicEnvironment } from './architecture';
import { advanceCivic, applyCivicScript, chooseCivic, DOCKETS, DOSSIERS, isDossier, PARTNERS, RECORD_URLS, responseAllowed, SOURCES, useCivic, VERDICTS } from './model';
import { canRenderCivic3D } from './webgl';
import './civic.css';

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
function Scene() {
    const beat = useCurrentBeat();
    const environment = beat && beat.kind !== 'ending' ? beat.environment as CivicEnvironment : 'civic-newsroom';
    return <><CivicWorld environment={environment} /><CivicCamera /></>;
}
function SourcesPanel() {
    const { t } = useTranslation('experience-hitler-rise');
    return <details className="civic-sources"><summary>{t('ui.sources')}</summary><p>{t('ui.boundary')}</p>
        {Object.entries(SOURCES).map(([id, url]) => <a key={id} href={url} target="_blank" rel="noreferrer">{t(`ui.source${id[0].toUpperCase()}${id.slice(1)}`)}</a>)}
    </details>;
}
function EvidencePanel() {
    const { t } = useTranslation('experience-hitler-rise');
    const beat = useCurrentBeat();
    const activeId = useExperience(s => s.activeHotspotId);
    const civic = useCivic();
    const documentHeading = useRef<HTMLHeadingElement>(null);
    const feedbackHeading = useRef<HTMLHeadingElement>(null);
    const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
    const lastDocument = useRef<string | null>(null);
    useEffect(() => {
        if (activeId) {
            lastDocument.current = activeId; documentHeading.current?.focus({ preventScroll: true });
            documentHeading.current?.scrollIntoView({ block: 'nearest' });
        } else if (lastDocument.current) { buttons.current[lastDocument.current]?.focus(); lastDocument.current = null; }
    }, [activeId]);
    useEffect(() => {
        if (!activeId) return;
        const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); useCivic.getState().readRecord(null); } };
        window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close);
    }, [activeId]);
    useEffect(() => { if (civic.feedback) feedbackHeading.current?.focus(); }, [civic.feedback]);
    if (beat?.kind !== 'explore' || !isDossier(beat.id)) return null;
    const dossier = beat.id, docket = DOCKETS[dossier], done = civic.verified.includes(dossier);
    const active = beat.hotspots.find(h => h.id === activeId);
    const selected = beat.hotspots.find(h => h.id === civic.selectedSource);
    const readCount = docket.records.filter(id => civic.read.includes(id)).length;
    return <>
        <p>{t('ui.evidenceHelp')}</p>
        <div className="civic-claim"><span>{t('ui.claim')}</span><p>{t(`ui.dossiers.${dossier}.claim`)}</p></div>
        <p className="civic-counter">{t('ui.documents')}: {readCount} / 2</p>
        <div className="civic-documents">{beat.hotspots.map((h, i) => <button key={h.id} ref={element => { buttons.current[h.id] = element; }} aria-pressed={civic.selectedSource === h.id} onClick={() => civic.readRecord(h.id)}>{i + 1}. {h.label}{civic.read.includes(h.id) && <small>✓ {t('ui.read')}</small>}</button>)}</div>
        {active && <article className="civic-document"><h2 ref={documentHeading} tabIndex={-1}>{active.title}</h2><p>{active.description}</p><div className="civic-actions">{RECORD_URLS[active.id] && <a href={RECORD_URLS[active.id]} target="_blank" rel="noreferrer">{t('ui.openSource')}</a>}<button onClick={() => civic.readRecord(null)}>{t('ui.close')}</button></div></article>}
        {selected && <p className="civic-selected">{t('ui.source')}: {selected.label}</p>}
        <fieldset disabled={done} className="civic-verdict"><legend>{t('ui.claim')}</legend>{VERDICTS.map(v => <label key={v}><input type="radio" name={`verdict-${dossier}`} value={v} checked={civic.verdict === v} onChange={() => civic.assess(v)} />{t(`ui.${v}`)}</label>)}</fieldset>
        {civic.feedback && <div className={`civic-feedback ${done ? 'civic-verified' : ''}`} role="status"><h3 ref={feedbackHeading} tabIndex={-1}>{t(`ui.${civic.feedback}`)}</h3>{done && <p>{t(`ui.dossiers.${dossier}.explanation`)}</p>}</div>}
        {done ? <button className="civic-primary" onClick={civic.continueDossier}>{t('ui.continue')}</button> : <button className="civic-primary" disabled={readCount < 2 || !civic.selectedSource || !civic.verdict} onClick={civic.verify}>{t('ui.verify')}</button>}
    </>;
}
function MeetingPanel() {
    const { t } = useTranslation('experience-hitler-rise');
    const civic = useCivic();
    const heading = useRef<HTMLHeadingElement>(null);
    useEffect(() => { if (civic.activePartner) { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: 'nearest' }); } }, [civic.activePartner, civic.agreements.length, civic.refused]);
    const partner = civic.activePartner;
    return <><p>{t('ui.meetingHelp')}</p><p className="civic-counter" role="status">{t('ui.agreements')}: {civic.agreements.length} / 2 · {t('ui.read')}: {civic.partnersSeen.length} / 3</p>
        <div className="civic-partners">{PARTNERS.map(id => <button key={id} aria-pressed={partner === id} onClick={() => civic.meet(id)}><strong>{t(`ui.partners.${id}.name`)}</strong><span>{t(`ui.partners.${id}.goal`)}</span>{civic.agreements.includes(id) && <small>✓ {t('ui.agreed')}</small>}</button>)}</div>
        {partner && <article className="civic-document"><h2 ref={heading} tabIndex={-1}>{t(`ui.partners.${partner}.name`)}</h2><p>{t(`ui.partners.${partner}.terms`)}</p>
            {civic.refused && <p className="civic-feedback" role="status">{t('ui.refused')}</p>}
            {civic.agreements.includes(partner) ? <><p>✓ {t('ui.agreed')}</p><button onClick={() => civic.withdraw(partner)}>{t('ui.withdraw')}</button></> : <div className="civic-actions"><button disabled={civic.agreements.length >= 2} className="civic-primary" onClick={() => civic.agree(partner, false)}>{t('ui.accept')}</button><button disabled={civic.agreements.length >= 2} onClick={() => civic.agree(partner, true)}>{t('ui.revise')}</button></div>}
        </article>}
        <button className="civic-primary" disabled={civic.agreements.length !== 2 || civic.partnersSeen.length !== 3} onClick={civic.closeMeeting}>{t('ui.finishMeeting')}</button>
    </>;
}
function Ledger() {
    const { t } = useTranslation('experience-hitler-rise');
    const civic = useCivic();
    const run = useExperience();
    return <div className="civic-ledger"><h2>{t('ui.ledger')}</h2><ul>
        {DOSSIERS.filter(id => civic.verified.includes(id)).map(id => <li key={id}>✓ {run.script?.beats[id].kind === 'explore' ? run.script.beats[id].prompt : id}</li>)}
        {['editorial', 'response'].flatMap(id => { const b = run.script?.beats[id]; return b?.kind === 'choice' ? b.options.filter(o => run.flags.includes(`choice:${id}:${o.id}`)).map(o => <li key={id}>{o.label}</li>) : []; })}
        {civic.agreements.map(id => <li key={id}>{t(`ui.partners.${id}.name`)}: {t(`ui.partners.${id}.goal`)}</li>)}
    </ul></div>;
}
function Overlay() {
    const { t } = useTranslation('experience-hitler-rise');
    const run = useExperience();
    const beat = useCurrentBeat();
    const agreements = useCivic(s => s.agreements);
    const heading = useRef<HTMLHeadingElement>(null);
    const sheet = useRef<HTMLElement>(null);
    useEffect(() => { heading.current?.focus({ preventScroll: true }); sheet.current?.scrollTo(0, 0); }, [run.beatId, run.phase, run.narrationIndex]);
    if (!run.script) return null;
    const line = beat?.kind === 'cinematic' ? beat.narration[run.narrationIndex] : null;
    const title = run.phase === 'loading' ? run.script.title : run.phase === 'ending' ? run.ending?.title : line?.speaker ?? (beat?.kind === 'explore' ? beat.prompt : beat?.kind === 'choice' ? beat.title : run.script.title);
    return <section ref={sheet} className={`civic-sheet ${run.phase === 'loading' || run.phase === 'ending' ? 'civic-full' : ''}`} aria-label={title}>
        <p className="civic-kicker">{run.script.era}</p><h1 ref={heading} tabIndex={-1}>{title}</h1>
        {run.phase === 'loading' && <><p className="civic-lead">{t('ui.intro')}</p><p>{t('ui.warning')}</p><p className="civic-boundary">{t('ui.boundary')}</p><button className="civic-primary" onClick={() => { if (useExperience.getState().phase === 'loading') run.begin(); }}>{t('ui.start')}</button><SourcesPanel /></>}
        {run.phase === 'cinematic' && line && <><p className="civic-lead">{line.text}</p><div className="civic-actions"><button className="civic-primary" onClick={() => advanceCivic(run.beatId, run.narrationIndex)}>{t('ui.continue')}</button><button onClick={() => advanceCivic(run.beatId, run.narrationIndex, true)}>{t('ui.skip')}</button></div></>}
        {run.phase === 'explore' && isDossier(run.beatId) && <EvidencePanel key={run.beatId} />}
        {run.phase === 'explore' && run.beatId === 'meeting' && <MeetingPanel />}
        {run.phase === 'choice' && beat?.kind === 'choice' && <><p>{t('ui.fiction')}</p><p className="civic-lead">{beat.prompt}</p><div className="civic-options">{beat.options.map(o => {
            const allowed = beat.id !== 'response' || responseAllowed(o.id, agreements);
            return <button key={o.id} disabled={!allowed} onClick={() => chooseCivic(beat.id, o.id)}><strong>{o.label}</strong><span>{o.description}</span>{!allowed && <small>{t(o.id === 'bulletin' ? 'ui.requiresPrinter' : 'ui.requiresCounsel')}</small>}</button>;
        })}</div></>}
        {run.phase === 'ending' && run.ending && <><p className="civic-lead">{run.ending.subtitle}</p>{run.ending.epilogue.map((l, i) => <p key={i}>{l.text}</p>)}<Ledger /><p className="civic-boundary">{t('ui.limits')}</p><div className="civic-actions"><button className="civic-primary" onClick={() => { useCivic.getState().reset(); run.reset(); }}>{t('ui.reset')}</button><Link to="/chapters/hitler-rise">{t('ui.back')}</Link></div><SourcesPanel /></>}
    </section>;
}
export function CivicExperience({ script }: { script: ExperienceScript }) {
    const { t, i18n } = useTranslation('experience-hitler-rise');
    const [canRender] = useState(() => canRenderCivic3D());
    const initialized = useRef(false);
    useEffect(() => {
        const localized = localizeScript(script, t);
        applyCivicScript(localized, !initialized.current); initialized.current = true;
    }, [script, t, i18n.language]);
    useEffect(() => { const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previous; }; }, []);
    const fallback = <p className="civic-webgl" role="status">{t('ui.fallback')}</p>;
    return <main className="civic-experience"><div className="civic-viewport" aria-label={t('ui.scene')}>
        {canRender && <p className="civic-navigation">{t('ui.navigation')}</p>}
        {canRender ? <SceneBoundary fallback={fallback}><Canvas shadows dpr={[1, 1.25]} camera={{ position: [34, 24, 36], fov: 48, near: 0.1, far: 160 }} gl={{ antialias: true, powerPreference: 'low-power' }} fallback={fallback}><Suspense fallback={null}><Scene /></Suspense></Canvas></SceneBoundary> : fallback}
        </div><header className="civic-toolbar"><Link to="/chapters/hitler-rise">← {t('ui.exit')}</Link><button onClick={() => useCivic.getState().overview()} title={t('ui.navigation')}>{t('ui.overview')}</button><select aria-label={t('ui.language')} value={i18n.language.split('-')[0]} onChange={e => void i18n.changeLanguage(e.target.value)}><option value="en">EN</option><option value="uz">UZ</option><option value="ko">KO</option></select></header><Overlay />
    </main>;
}
