import { create } from 'zustand';
import { useExperience } from '../store';

export const DESTINATIONS = ['hospital', 'clinic', 'outreach'] as const;
export type Destination = typeof DESTINATIONS[number];
export type Allocation = Record<Destination, number>;
export const CRATES = 6;
export const emptyAllocation = (): Allocation => ({ hospital: 0, clinic: 0, outreach: 0 });
export const totalCrates = (a: Allocation) => DESTINATIONS.reduce((total, id) => total + a[id], 0);
export function validAllocation(a: Allocation): boolean {
    return DESTINATIONS.every(id => Number.isInteger(a[id]) && a[id] >= 0 && a[id] <= CRATES) && totalCrates(a) <= CRATES;
}
export function allocate(a: Allocation, id: Destination, delta: number): Allocation {
    if (!DESTINATIONS.includes(id) || ![-1, 1].includes(delta) || !validAllocation(a)) return a;
    const next = { ...a, [id]: a[id] + delta };
    return validAllocation(next) ? next : a;
}
export function allocationFlags(a: Allocation): string[] {
    if (!validAllocation(a) || totalCrates(a) !== CRATES) return [];
    return [
        ...(a.hospital >= 3 && a.clinic >= 2 && a.outreach >= 1 ? ['balanced'] : []),
        ...(DESTINATIONS.some(id => a[id] === 0) ? ['unserved'] : []),
        'dispatched',
    ];
}
interface ShiftState {
    allocation: Allocation;
    sealed: boolean;
    revision: number;
    adjust: (id: Destination, delta: number) => void;
    seal: () => void;
    reset: () => void;
    overview: () => void;
}
export const useCovidShift = create<ShiftState>((set, get) => ({
    allocation: emptyAllocation(), sealed: false, revision: 0,
    adjust: (id, delta) => {
        const run = useExperience.getState();
        if (get().sealed || run.script?.chapterId !== 'covid-pandemic' || run.beatId !== 'manifest' || run.phase !== 'explore') return;
        set(s => ({ allocation: allocate(s.allocation, id, delta) }));
    },
    seal: () => {
        const run = useExperience.getState();
        const { allocation, sealed } = get();
        if (run.script?.chapterId !== 'covid-pandemic' || run.beatId !== 'manifest' || run.phase !== 'explore' || sealed) return;
        const flags = allocationFlags(allocation);
        if (!flags.length) return;
        set({ sealed: true });
        run.choose(undefined, flags, 'loading');
    },
    reset: () => set({ allocation: emptyAllocation(), sealed: false, revision: 0 }),
    overview: () => set(s => ({ revision: s.revision + 1 })),
}));
/** Read current state inside every action: stale DOM clicks cannot cross beats. */
export function chooseCovidOption(beatId: string, optionId: string) {
    const run = useExperience.getState();
    if (run.script?.chapterId !== 'covid-pandemic' || run.beatId !== beatId || run.phase !== 'choice') return;
    const beat = run.script.beats[beatId];
    if (beat.kind !== 'choice') return;
    const option = beat.options.find(o => o.id === optionId);
    if (option) run.choose(option.effects, [...(option.flags ?? []), `choice:${beatId}:${optionId}`], option.next);
}
export function advanceCovidScene(beatId: string, narrationIndex: number, skip = false) {
    const run = useExperience.getState();
    if (run.script?.chapterId !== 'covid-pandemic' || run.beatId !== beatId || run.narrationIndex !== narrationIndex || run.phase !== 'cinematic') return;
    if (skip) run.skipCinematic(); else run.advanceNarration();
}
export function openCovidReport(id: string | null) {
    const run = useExperience.getState();
    if (run.script?.chapterId !== 'covid-pandemic' || run.beatId !== 'reports' || run.phase !== 'explore') return;
    const beat = run.script.beats.reports;
    if (id === null) { run.openHotspot(null); return; }
    if (beat.kind !== 'explore' || !beat.hotspots.some(h => h.id === id)) return;
    run.visitHotspot(id); run.openHotspot(id);
}
export function openCovidManifest() {
    const run = useExperience.getState();
    if (run.script?.chapterId !== 'covid-pandemic' || run.beatId !== 'reports' || run.phase !== 'explore') return;
    if (['ward', 'ledger', 'radio'].every(id => run.visitedHotspots.includes(id))) run.gotoBeat('manifest');
}
