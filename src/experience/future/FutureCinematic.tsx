import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentBeat, useExperience } from '../store';
import { captureFutureCinematicActions } from './cinematicActions';

/** Full text and explicit native controls: no typewriter, automatic advance,
 * clickable prose or invisible timing requirement. */
export function FutureCinematic() {
    const { t } = useTranslation('experience-future-earth');
    const beat = useCurrentBeat();
    const index = useExperience(s => s.narrationIndex);
    const actions = captureFutureCinematicActions();
    const content = useRef<HTMLDivElement>(null);
    const text = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        if (content.current) content.current.scrollTop = 0;
        text.current?.focus({ preventScroll: true });
    }, [beat?.id, index]);
    if (beat?.kind !== 'cinematic') return null;
    const line = beat.narration[index];
    if (!line) return null;
    return <section className="future-cinematic" aria-label={t('ui.story')}>
        <div ref={content} className="future-cinematic-card">
            <header><span>{line.speaker ?? t('ui.story')}</span><span>{index + 1} / {beat.narration.length}</span></header>
            <p ref={text} tabIndex={-1}>{line.text}</p>
            <div className="future-cinematic-actions">
                <button id="future-story-skip" onClick={event => { if (event.detail <= 1) actions.skip(); }}>{t('ui.skipScene')}</button>
                <button id="future-story-continue" onClick={event => { if (event.detail <= 1) actions.continue(); }}>{t('ui.continueStory')} →</button>
            </div>
        </div>
    </section>;
}
