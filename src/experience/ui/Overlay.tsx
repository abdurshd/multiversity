/* DOM overlay for the 3D experience: narration, choices, battle HUD, endings. */
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCurrentBeat, useExperience } from '../store';
import type { StatEffects, StatKey, TacticalOption } from '../types';
import { applyModifier, useBattleHud } from '../battle/battleSim';
import { simRef } from '../battle/BattleView';

// ─── Typewriter ────────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 22) {
    const [shown, setShown] = useState('');
    const doneRef = useRef(false);
    useEffect(() => {
        setShown('');
        doneRef.current = false;
        let i = 0;
        const id = window.setInterval(() => {
            i += 1;
            setShown(text.slice(0, i));
            if (i >= text.length) {
                doneRef.current = true;
                window.clearInterval(id);
            }
        }, speed);
        return () => window.clearInterval(id);
    }, [text, speed]);
    return { shown, done: shown.length >= text.length };
}

const STAT_META: Record<StatKey, { label: string; icon: string }> = {
    chaos: { label: 'Chaos', icon: '🌪' },
    freedom: { label: 'Freedom', icon: '🕊' },
    diplomacy: { label: 'Diplomacy', icon: '🤝' },
    strength: { label: 'Strength', icon: '⚔️' },
};

function EffectBadges({ effects }: { effects?: StatEffects }) {
    const { t } = useTranslation('components-experience');
    if (!effects) return null;
    return (
        <div className="flex flex-wrap gap-1.5 mt-2">
            {(Object.entries(effects) as [StatKey, number][]).map(([k, v]) => (
                <span
                    key={k}
                    className={`text-[11px] px-2 py-0.5 rounded-full border ${
                        v >= 0
                            ? 'border-emerald-400/40 text-emerald-300 bg-emerald-500/10'
                            : 'border-rose-400/40 text-rose-300 bg-rose-500/10'
                    }`}
                >
                    {STAT_META[k].icon} {t(`stats.${k}`, { defaultValue: STAT_META[k].label })} {v >= 0 ? `+${v}` : v}
                </span>
            ))}
        </div>
    );
}

// ─── Stats bar ─────────────────────────────────────────────────────────────
function StatsBar() {
    const { t } = useTranslation('components-experience');
    const stats = useExperience((s) => s.stats);
    return (
        <div className="absolute top-4 right-4 z-30 flex gap-3 px-4 py-2 rounded-xl bg-slate-950/70 backdrop-blur border border-amber-200/15 pointer-events-none">
            {(Object.keys(stats) as StatKey[]).map((k) => (
                <div key={k} className="flex flex-col items-center w-14">
                    <span className="text-[10px] uppercase tracking-wider text-amber-100/60">
                        {STAT_META[k].icon} {t(`stats.${k}`, { defaultValue: STAT_META[k].label })}
                    </span>
                    <div className="w-full h-1.5 mt-1 rounded bg-slate-700/70 overflow-hidden">
                        <div
                            className="h-full rounded bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
                            style={{ width: `${stats[k]}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Loading / title screen ───────────────────────────────────────────────
function StartScreen() {
    const { t } = useTranslation('components-experience');
    const script = useExperience((s) => s.script);
    const begin = useExperience((s) => s.begin);
    if (!script) return null;
    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <p className="text-amber-300/80 tracking-[0.4em] uppercase text-xs mb-4">{script.era}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-amber-50 text-center px-6" style={{ fontFamily: 'Georgia, serif' }}>
                {script.title}
            </h1>
            <p className="text-slate-300/80 mt-4 max-w-xl text-center px-6 text-sm md:text-base">
                {t('start.tagline', { defaultValue: 'A living chronicle. Explore, decide, and command — your choices will carve one of several realities.' })}
            </p>
            <button
                onClick={begin}
                className="mt-10 px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-semibold text-lg shadow-xl shadow-amber-900/40 hover:scale-105 transition-transform"
            >
                {t('start.enter', { defaultValue: '⚔ Enter the Chronicle' })}
            </button>
        </div>
    );
}

// ─── Cinematic narration ───────────────────────────────────────────────────
function CinematicOverlay() {
    const { t } = useTranslation('components-experience');
    const beat = useCurrentBeat();
    const narrationIndex = useExperience((s) => s.narrationIndex);
    const advance = useExperience((s) => s.advanceNarration);
    const skip = useExperience((s) => s.skipCinematic);
    const line = beat?.kind === 'cinematic' ? beat.narration[narrationIndex] : undefined;
    const { shown, done } = useTypewriter(line?.text ?? '');

    // auto-advance after the line's hold time
    useEffect(() => {
        if (!done || !line) return;
        const id = window.setTimeout(advance, (line.hold ?? 3.2) * 1000);
        return () => window.clearTimeout(id);
    }, [done, line, advance, narrationIndex]);

    if (!line) return null;
    return (
        <>
            {/* letterbox bars */}
            <div className="absolute top-0 inset-x-0 h-14 md:h-20 bg-black z-20 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-14 md:h-20 bg-black z-20 pointer-events-none" />
            <button
                onClick={skip}
                className="absolute top-16 md:top-24 right-4 z-30 text-xs px-3 py-1.5 rounded-full border border-slate-400/30 text-slate-300/80 bg-slate-950/50 hover:bg-slate-800/70"
            >
                {t('cinematic.skip', { defaultValue: 'Skip ▸▸' })}
            </button>
            <div
                className="absolute bottom-16 md:bottom-24 inset-x-0 z-30 flex justify-center px-6 cursor-pointer"
                onClick={advance}
            >
                <div className="max-w-3xl w-full rounded-2xl bg-slate-950/75 backdrop-blur border border-amber-200/15 px-6 py-4 shadow-2xl">
                    {line.speaker && (
                        <p className="text-amber-400 text-xs uppercase tracking-[0.25em] mb-1">{line.speaker}</p>
                    )}
                    <p className="text-amber-50/95 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                        {shown}
                        {!done && <span className="animate-pulse">▌</span>}
                    </p>
                </div>
            </div>
        </>
    );
}

// ─── Explore mode ──────────────────────────────────────────────────────────
function ExploreOverlay() {
    const { t } = useTranslation('components-experience');
    const beat = useCurrentBeat();
    const activeHotspotId = useExperience((s) => s.activeHotspotId);
    const openHotspot = useExperience((s) => s.openHotspot);
    const choose = useExperience((s) => s.choose);
    if (beat?.kind !== 'explore') return null;
    const hotspot = beat.hotspots.find((h) => h.id === activeHotspotId);

    return (
        <>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-full bg-slate-950/70 backdrop-blur border border-amber-200/15 text-amber-100/90 text-sm pointer-events-none whitespace-nowrap">
                🧭 {beat.prompt}
            </div>
            {hotspot && (
                <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center px-6">
                    <div className="max-w-xl w-full rounded-2xl bg-slate-950/85 backdrop-blur border border-amber-200/20 p-5 shadow-2xl">
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-amber-200 text-lg font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                                {hotspot.icon} {hotspot.title}
                            </h3>
                            <button
                                onClick={() => openHotspot(null)}
                                className="text-slate-400 hover:text-slate-200 text-xl leading-none"
                                aria-label={t('explore.close', { defaultValue: 'Close' })}
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-slate-200/85 text-sm mt-2 leading-relaxed">{hotspot.description}</p>
                        <EffectBadges effects={hotspot.effects} />
                        {hotspot.advancesTo && (
                            <button
                                onClick={() => choose(hotspot.effects, undefined, hotspot.advancesTo!)}
                                className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-semibold hover:brightness-110"
                            >
                                {t('explore.continue', { defaultValue: 'Continue ➤' })}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

// ─── Choice mode ───────────────────────────────────────────────────────────
function ChoiceOverlay() {
    const beat = useCurrentBeat();
    const choose = useExperience((s) => s.choose);
    if (beat?.kind !== 'choice') return null;
    return (
        <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-6 pt-24 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent">
            <div className="max-w-4xl w-full">
                <p className="text-amber-400 text-xs uppercase tracking-[0.3em] text-center">{beat.title}</p>
                <h2
                    className="text-amber-50 text-xl md:text-2xl font-semibold text-center mt-1 mb-5"
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    {beat.prompt}
                </h2>
                <div className={`grid gap-3 ${beat.options.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                    {beat.options.map((o) => (
                        <button
                            key={o.id}
                            onClick={() => choose(o.effects, o.flags, o.next)}
                            className="text-left rounded-2xl border border-amber-200/20 bg-slate-900/80 backdrop-blur p-4 hover:border-amber-400/60 hover:bg-slate-800/80 hover:-translate-y-0.5 transition-all shadow-xl"
                        >
                            <p className="text-amber-200 font-semibold">
                                {o.icon} {o.label}
                            </p>
                            <p className="text-slate-300/80 text-sm mt-1.5 leading-snug">{o.description}</p>
                            <EffectBadges effects={o.effects} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Battle HUD ────────────────────────────────────────────────────────────
function MoraleBar({ label, value, color, alignRight }: { label: string; value: number; color: string; alignRight?: boolean }) {
    return (
        <div className={`w-56 md:w-72 ${alignRight ? 'text-right' : ''}`}>
            <p className="text-[11px] uppercase tracking-wider text-slate-200/80 mb-1">{label}</p>
            <div className="h-2.5 rounded-full bg-slate-800/80 overflow-hidden border border-slate-600/40">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${Math.round(value * 100)}%`,
                        background: color,
                        marginLeft: alignRight ? 'auto' : undefined,
                    }}
                />
            </div>
        </div>
    );
}

function BattleOverlay() {
    const { t } = useTranslation('components-experience');
    const beat = useCurrentBeat();
    const hud = useBattleHud();
    const applyEffects = useExperience((s) => s.applyEffects);
    const addFlags = useExperience((s) => s.addFlags);
    if (beat?.kind !== 'battle') return null;
    const { battle } = beat;

    const pickTactic = (opt: TacticalOption) => {
        if (simRef.state) applyModifier(simRef.state, opt.mod);
        if (opt.effects) applyEffects(opt.effects);
        if (opt.flags?.length) addFlags(opt.flags);
        useBattleHud.setState({ paused: false, event: null });
    };

    return (
        <>
            {/* morale bars */}
            <div className="absolute top-4 inset-x-4 z-30 flex justify-between pointer-events-none">
                <MoraleBar label={battle.player.name} value={hud.playerMorale} color="linear-gradient(90deg,#f59e0b,#dc2626)" />
                <MoraleBar label={battle.enemy.name} value={hud.enemyMorale} color="linear-gradient(270deg,#64748b,#334155)" alignRight />
            </div>

            {/* intro card */}
            {hud.intro && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm px-6">
                    <div className="max-w-lg w-full rounded-2xl border border-amber-200/25 bg-slate-900/90 p-6 text-center shadow-2xl">
                        <p className="text-amber-400 text-xs uppercase tracking-[0.3em]">{t('battle.badge', { defaultValue: 'Battle' })}</p>
                        <h2 className="text-amber-50 text-2xl font-bold mt-1" style={{ fontFamily: 'Georgia, serif' }}>
                            {battle.name}
                        </h2>
                        <p className="text-slate-300/85 text-sm mt-3 leading-relaxed">{battle.objective}</p>
                        <button
                            onClick={() => useBattleHud.setState({ intro: false, paused: false })}
                            className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-semibold hover:scale-105 transition-transform"
                        >
                            {t('battle.sound_drums', { defaultValue: '⚔ Sound the Drums' })}
                        </button>
                    </div>
                </div>
            )}

            {/* tactical decision modal */}
            {hud.event && (
                <div className="absolute inset-0 z-40 flex items-end md:items-center justify-center bg-slate-950/60 backdrop-blur-[2px] px-4 pb-6">
                    <div className="max-w-2xl w-full rounded-2xl border border-amber-400/30 bg-slate-900/95 p-5 shadow-2xl">
                        <p className="text-amber-400 text-xs uppercase tracking-[0.3em]">{t('battle.hangs', { defaultValue: '⏸ The battle hangs in the balance' })}</p>
                        <h3 className="text-amber-50 text-xl font-bold mt-1" style={{ fontFamily: 'Georgia, serif' }}>
                            {hud.event.title}
                        </h3>
                        <p className="text-slate-300/85 text-sm mt-2">{hud.event.prompt}</p>
                        <div className={`grid gap-3 mt-4 ${hud.event.options.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                            {hud.event.options.map((o) => (
                                <button
                                    key={o.id}
                                    onClick={() => pickTactic(o)}
                                    className="text-left rounded-xl border border-amber-200/20 bg-slate-800/80 p-3.5 hover:border-amber-400/60 hover:bg-slate-700/80 transition-all"
                                >
                                    <p className="text-amber-200 font-semibold text-sm">{o.icon} {o.label}</p>
                                    <p className="text-slate-300/75 text-xs mt-1 leading-snug">{o.description}</p>
                                    <EffectBadges effects={o.effects} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// ─── Ending screen ─────────────────────────────────────────────────────────
function EndingOverlay() {
    const { t } = useTranslation('components-experience');
    const ending = useExperience((s) => s.ending);
    const script = useExperience((s) => s.script);
    const stats = useExperience((s) => s.stats);
    const reset = useExperience((s) => s.reset);
    const [lineIdx, setLineIdx] = useState(0);
    const line = ending?.epilogue[lineIdx];
    const { shown, done } = useTypewriter(line?.text ?? '', 18);

    useEffect(() => setLineIdx(0), [ending]);
    useEffect(() => {
        if (!done || !ending) return;
        if (lineIdx < ending.epilogue.length - 1) {
            const id = window.setTimeout(() => setLineIdx((i) => i + 1), (line?.hold ?? 2.6) * 1000);
            return () => window.clearTimeout(id);
        }
    }, [done, lineIdx, ending, line]);

    if (!ending || !script) return null;
    const finished = lineIdx >= ending.epilogue.length - 1 && done;

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur px-6 text-center">
            <span className="text-5xl">{ending.icon}</span>
            <p className="text-xs uppercase tracking-[0.4em] mt-4" style={{ color: ending.color }}>
                {t('ending.reality_takes_shape', { defaultValue: 'A reality takes shape' })}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-amber-50 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
                {ending.title}
            </h1>
            <p className="text-slate-300/85 mt-1.5">{ending.subtitle}</p>
            <div className="max-w-2xl mt-6 min-h-[5rem]">
                <p className="text-amber-50/90 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    {shown}
                    {!done && <span className="animate-pulse">▌</span>}
                </p>
            </div>
            <div className="flex gap-3 mt-4 pointer-events-none">
                {(Object.keys(stats) as StatKey[]).map((k) => (
                    <span key={k} className="text-xs text-slate-300/70">
                        {STAT_META[k].icon} {stats[k]}
                    </span>
                ))}
            </div>
            <div className={`flex flex-wrap justify-center gap-3 mt-8 transition-opacity duration-700 ${finished ? 'opacity-100' : 'opacity-40'}`}>
                {ending.linkedTimelineId && (
                    <Link
                        to={`/timeline/${script.chapterId}/${ending.linkedTimelineId}`}
                        className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-semibold hover:scale-105 transition-transform"
                    >
                        {t('ending.explore_reality', { defaultValue: '🌍 Explore this Reality' })}
                    </Link>
                )}
                <button
                    onClick={reset}
                    className="px-7 py-3 rounded-full border border-amber-200/30 text-amber-100 hover:bg-slate-800/70"
                >
                    {t('ending.rewrite', { defaultValue: '↺ Rewrite History' })}
                </button>
                <Link
                    to={`/chapters/${script.chapterId}`}
                    className="px-7 py-3 rounded-full border border-slate-400/30 text-slate-300 hover:bg-slate-800/70"
                >
                    {t('ending.back_to_chapter', { defaultValue: 'Back to Chapter' })}
                </Link>
            </div>
        </div>
    );
}

// ─── Root overlay ──────────────────────────────────────────────────────────
export function ExperienceOverlay() {
    const phase = useExperience((s) => s.phase);
    return (
        <div className="absolute inset-0 pointer-events-none [&>*]:pointer-events-auto">
            {phase !== 'loading' && phase !== 'ending' && <StatsBar />}
            {phase === 'loading' && <StartScreen />}
            {phase === 'cinematic' && <CinematicOverlay />}
            {phase === 'explore' && <ExploreOverlay />}
            {phase === 'choice' && <ChoiceOverlay />}
            {phase === 'battle' && <BattleOverlay />}
            {phase === 'ending' && <EndingOverlay />}
        </div>
    );
}
