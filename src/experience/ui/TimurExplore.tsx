import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentBeat, useExperience } from '../store';
import { useTimurNavigation } from './timurNavigation';

const COPY = {
    en: { objective: 'Explore the city. Shape an empire.', hint: 'Drag to orbit · Pinch or scroll to zoom', sites: 'Landmarks', visited: 'visited', optional: 'Optional discovery', council: 'Story continues here', close: 'Back to the city', continue: 'Enter the war council', overview: 'Reset view', zoomIn: 'Zoom in', zoomOut: 'Zoom out', title: 'SAMARKAND · 1404', note: 'A stylized historical setting. Campaign outcomes are alternate history.' },
    uz: { objective: 'Shaharni o‘rganing. Imperiya taqdirini belgilang.', hint: 'Aylantirish uchun suring · Yaqinlashtirish uchun ikki barmoqdan foydalaning', sites: 'Diqqatga sazovor joylar', visited: 'ko‘rildi', optional: 'Ixtiyoriy kashfiyot', council: 'Hikoya shu yerda davom etadi', close: 'Shaharga qaytish', continue: 'Harbiy kengashga kirish', overview: 'Ko‘rinishni tiklash', zoomIn: 'Yaqinlashtirish', zoomOut: 'Uzoqlashtirish', title: 'SAMARQAND · 1404', note: 'Tarixdan ilhomlangan stilize qilingan muhit. Harbiy yurish natijalari muqobil tarixdir.' },
    ko: { objective: '도시를 탐험하고 제국의 운명을 결정하세요.', hint: '드래그하여 회전 · 두 손가락이나 스크롤로 확대', sites: '명소', visited: '방문', optional: '선택 탐험', council: '이야기가 이어지는 곳', close: '도시로 돌아가기', continue: '작전 회의 입장', overview: '시점 초기화', zoomIn: '확대', zoomOut: '축소', title: '사마르칸트 · 1404', note: '역사에서 영감을 받은 양식화된 공간입니다. 원정의 결과는 대체 역사입니다.' },
};

export function TimurExplore() {
    const { i18n } = useTranslation();
    const copy = COPY[(i18n.resolvedLanguage?.split('-')[0] ?? 'en') as keyof typeof COPY] ?? COPY.en;
    const beat = useCurrentBeat();
    const activeId = useExperience((s) => s.activeHotspotId);
    const visited = useExperience((s) => s.visitedHotspots);
    const open = useExperience((s) => s.openHotspot);
    const visit = useExperience((s) => s.visitHotspot);
    const choose = useExperience((s) => s.choose);
    const request = useTimurNavigation((s) => s.request);
    const closeRef = useRef<HTMLButtonElement>(null);
    const previousId = useRef<string | null>(null);
    useEffect(() => {
        if (activeId) closeRef.current?.focus({ preventScroll: true });
        else if (previousId.current) document.getElementById(`timur-landmark-${previousId.current}`)?.focus({ preventScroll: true });
        previousId.current = activeId;
    }, [activeId]);
    useEffect(() => {
        const dismiss = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && activeId) { open(null); request('overview'); }
        };
        window.addEventListener('keydown', dismiss);
        return () => window.removeEventListener('keydown', dismiss);
    }, [activeId, open, request]);
    if (beat?.kind !== 'explore') return null;
    const hotspot = beat.hotspots.find((h) => h.id === activeId);
    const count = beat.hotspots.filter((h) => visited.includes(h.id)).length;

    return <>
        <header className="timur-objective">
            <p>{copy.title}</p>
            <h2>{copy.objective}</h2>
            <span>{copy.hint}</span>
        </header>
        <nav className="timur-camera" aria-label={copy.overview}>
            <button onClick={() => request('out')} aria-label={copy.zoomOut} title={copy.zoomOut}>−</button>
            <button onClick={() => { open(null); request('overview'); }} aria-label={copy.overview} title={copy.overview}>⌂</button>
            <button onClick={() => request('in')} aria-label={copy.zoomIn} title={copy.zoomIn}>+</button>
        </nav>
        <section className="timur-discovery" aria-label={copy.sites}>
            {hotspot ? <article className="timur-lore" aria-labelledby="timur-lore-title">
                <div className="timur-lore-heading">
                    <div><p>{hotspot.advancesTo ? copy.council : copy.optional}</p><h3 id="timur-lore-title">{hotspot.icon} {hotspot.title}</h3></div>
                    <button ref={closeRef} onClick={() => { open(null); request('overview'); }} aria-label={copy.close}>×</button>
                </div>
                <p className="timur-description">{hotspot.description}</p>
                {hotspot.advancesTo && <button className="timur-continue" onClick={() => choose(hotspot.effects, undefined, hotspot.advancesTo!)}>{copy.continue} <span aria-hidden>→</span></button>}
            </article> : <>
                <div className="timur-discovery-heading"><span>{copy.sites}</span><span aria-live="polite">{count}/{beat.hotspots.length} {copy.visited}</span></div>
                <div className="timur-landmarks">
                    {beat.hotspots.map((h, index) => <button key={h.id} id={`timur-landmark-${h.id}`} className={h.advancesTo ? 'timur-landmark timur-council' : 'timur-landmark'} onClick={() => { visit(h.id); open(h.id); }}>
                        <span className="timur-landmark-number" aria-hidden>{visited.includes(h.id) ? '✓' : `0${index + 1}`}</span>
                        <span><strong>{h.label}</strong><small>{h.advancesTo ? copy.council : copy.optional}</small></span>
                        <span aria-hidden>↗</span>
                    </button>)}
                </div>
                <p className="timur-history-note">{copy.note}</p>
            </>}
        </section>
    </>;
}
