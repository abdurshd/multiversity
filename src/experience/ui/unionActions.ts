import { create } from 'zustand';
import { useExperience } from '../store';

/** Chapter-local validation prevents stale/double taps from reapplying effects. */
export function unionChoose(beatId: string, optionId: string): boolean {
    const s = useExperience.getState();
    if (s.script?.chapterId !== 'ussr-collapse' || s.beatId !== beatId || s.phase !== 'choice') return false;
    const b = s.script.beats[beatId];
    if (b.kind !== 'choice') return false;
    const o = b.options.find(option => option.id === optionId);
    if (!o) return false;
    s.choose(o.effects, o.flags, o.next);
    return true;
}
export function unionContinue(beatId: string): boolean {
    const s = useExperience.getState();
    if (s.script?.chapterId !== 'ussr-collapse' || s.beatId !== beatId || s.phase !== 'explore') return false;
    const b = s.script.beats[beatId];
    if (b.kind !== 'explore' || b.hotspots.some(h => !h.advancesTo && !s.visitedHotspots.includes(h.id))) return false;
    const next = b.hotspots.find(h => h.advancesTo)?.advancesTo;
    if (!next) return false;
    s.gotoBeat(next);
    return true;
}
export function unionNarration(beatId: string, index: number, skip = false): boolean {
    const s = useExperience.getState();
    if (s.script?.chapterId !== 'ussr-collapse' || s.beatId !== beatId || s.phase !== 'cinematic' || s.narrationIndex !== index) return false;
    if (skip) s.skipCinematic(); else s.advanceNarration();
    return true;
}
type Command = 'overview' | 'left' | 'right' | 'in' | 'out';
export const useUnionCamera = create<{ command: Command; revision: number; request: (command: Command) => void }>(set => ({
    command: 'overview', revision: 0,
    request: command => set(s => ({ command, revision: s.revision + 1 })),
}));
