import { create } from 'zustand';
import type {
    Beat,
    BattleOutcome,
    EndingDef,
    ExperiencePhase,
    ExperienceScript,
    StatEffects,
    StatKey,
} from './types';

interface ExperienceState {
    script: ExperienceScript | null;
    phase: ExperiencePhase;
    beatId: string;
    stats: Record<StatKey, number>;
    flags: string[];
    /** Index of the narration line currently displayed (cinematics). */
    narrationIndex: number;
    /** Currently open hotspot card (explore mode). */
    activeHotspotId: string | null;
    visitedHotspots: string[];
    /** Resolved ending (ending phase). */
    ending: EndingDef | null;
    battleOutcome: BattleOutcome | null;
    /** Bumped to force-remount the battle view per battle beat. */
    battleRunKey: number;

    // ── actions ──
    loadScript: (script: ExperienceScript) => void;
    begin: () => void;
    gotoBeat: (beatId: string) => void;
    advanceNarration: () => void;
    skipCinematic: () => void;
    openHotspot: (id: string | null) => void;
    visitHotspot: (id: string) => void;
    choose: (effects: StatEffects | undefined, flags: string[] | undefined, next: string) => void;
    applyEffects: (effects?: StatEffects) => void;
    addFlags: (flags: string[]) => void;
    finishBattle: (outcome: BattleOutcome, next: string) => void;
    resolveEnding: () => void;
    reset: () => void;
}

const clamp = (v: number) => Math.max(0, Math.min(100, v));

function phaseFor(beat: Beat): ExperiencePhase {
    switch (beat.kind) {
        case 'cinematic': return 'cinematic';
        case 'explore': return 'explore';
        case 'choice': return 'choice';
        case 'battle': return 'battle';
        case 'ending': return 'ending';
    }
}

export const useExperience = create<ExperienceState>((set, get) => ({
    script: null,
    phase: 'loading',
    beatId: '',
    stats: { chaos: 20, freedom: 50, diplomacy: 50, strength: 50 },
    flags: [],
    narrationIndex: 0,
    activeHotspotId: null,
    visitedHotspots: [],
    ending: null,
    battleOutcome: null,
    battleRunKey: 0,

    loadScript: (script) =>
        set({
            script,
            phase: 'loading',
            beatId: script.startBeat,
            stats: { ...script.initialStats },
            flags: [],
            narrationIndex: 0,
            activeHotspotId: null,
            visitedHotspots: [],
            ending: null,
            battleOutcome: null,
        }),

    begin: () => {
        const { script } = get();
        if (!script) return;
        get().gotoBeat(script.startBeat);
    },

    gotoBeat: (beatId) => {
        const { script } = get();
        const beat = script?.beats[beatId];
        if (!script || !beat) return;
        const phase = phaseFor(beat);
        set((s) => ({
            beatId,
            phase,
            narrationIndex: 0,
            activeHotspotId: null,
            battleRunKey: beat.kind === 'battle' ? s.battleRunKey + 1 : s.battleRunKey,
        }));
        if (beat.kind === 'ending') get().resolveEnding();
    },

    advanceNarration: () => {
        const { script, beatId, narrationIndex } = get();
        const beat = script?.beats[beatId];
        if (!beat || beat.kind !== 'cinematic') return;
        if (narrationIndex + 1 < beat.narration.length) {
            set({ narrationIndex: narrationIndex + 1 });
        } else {
            get().gotoBeat(beat.next);
        }
    },

    skipCinematic: () => {
        const { script, beatId } = get();
        const beat = script?.beats[beatId];
        if (beat?.kind === 'cinematic') get().gotoBeat(beat.next);
    },

    openHotspot: (id) => set({ activeHotspotId: id }),

    visitHotspot: (id) =>
        set((s) => ({
            visitedHotspots: s.visitedHotspots.includes(id)
                ? s.visitedHotspots
                : [...s.visitedHotspots, id],
        })),

    choose: (effects, flags, next) => {
        get().applyEffects(effects);
        if (flags?.length) get().addFlags(flags);
        get().gotoBeat(next);
    },

    applyEffects: (effects) => {
        if (!effects) return;
        set((s) => {
            const stats = { ...s.stats };
            (Object.keys(effects) as StatKey[]).forEach((k) => {
                stats[k] = clamp(stats[k] + (effects[k] ?? 0));
            });
            return { stats };
        });
    },

    addFlags: (flags) =>
        set((s) => ({ flags: [...s.flags, ...flags.filter((f) => !s.flags.includes(f))] })),

    finishBattle: (outcome, next) => {
        set({ battleOutcome: outcome });
        get().gotoBeat(next);
    },

    resolveEnding: () => {
        const { script, flags, stats } = get();
        if (!script) return;
        const matches = script.endings
            .filter((e) => {
                if (e.requiresFlags?.some((f) => !flags.includes(f))) return false;
                if (e.forbidsFlags?.some((f) => flags.includes(f))) return false;
                if (e.statGates) {
                    for (const [key, gate] of Object.entries(e.statGates)) {
                        const v = stats[key as StatKey];
                        if (!gate) continue;
                        if (gate[0] === '<' && !(v < gate[1])) return false;
                        if (gate[0] === '>=' && !(v >= gate[1])) return false;
                    }
                }
                return true;
            })
            .sort((a, b) => b.priority - a.priority);
        const ending =
            matches[0] ?? script.endings.find((e) => e.id === script.defaultEnding) ?? null;
        set({ ending, phase: 'ending' });
    },

    reset: () => {
        const { script } = get();
        if (script) get().loadScript(script);
    },
}));

/** Convenience selector: the current beat object. */
export function useCurrentBeat(): Beat | null {
    const script = useExperience((s) => s.script);
    const beatId = useExperience((s) => s.beatId);
    return script?.beats[beatId] ?? null;
}
