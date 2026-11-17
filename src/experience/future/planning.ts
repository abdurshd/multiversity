/** Fictional teaching puzzle. Costs are tokens, not engineering measurements. */
export const PROJECTS = {
    grid: { crews: 2, power: 0 },
    water: { crews: 1, power: 2 },
    shelter: { crews: 1, power: 1 },
    signal: { crews: 1, power: 1 },
    quay: { crews: 2, power: 0 },
    garden: { crews: 1, power: 0 },
} as const;
export type ProjectId = keyof typeof PROJECTS;
export const PROJECT_IDS = Object.keys(PROJECTS) as ProjectId[];
export interface RepairPlan { shift: number; draft: ProjectId[]; completed: ProjectId[]; history: ProjectId[][]; }
export const newRepairPlan = (): RepairPlan => ({ shift: 0, draft: [], completed: [], history: [] });
export const powerCapacity = (p: RepairPlan) => p.completed.includes('grid') ? 4 : 2;
export const powerDemand = (ids: ProjectId[]) => ids.reduce((sum, id) => sum + PROJECTS[id].power, 0);
export const crewDemand = (ids: ProjectId[]) => ids.reduce((sum, id) => sum + PROJECTS[id].crews, 0);
export function planProblem(p: RepairPlan, draft = p.draft): 'finished' | 'duplicate' | 'crews' | 'power' | null {
    if (p.shift >= 2) return 'finished';
    if (new Set(draft).size !== draft.length || draft.some(id => p.completed.includes(id))) return 'duplicate';
    if (crewDemand(draft) > 3) return 'crews';
    // The substation upgrade becomes available NEXT shift. It is not a loophole
    // for energizing services before crews have finished commissioning it.
    if (powerDemand([...p.completed, ...draft]) > powerCapacity(p)) return 'power';
    return null;
}
export function toggleProject(p: RepairPlan, id: ProjectId): RepairPlan {
    if (!PROJECT_IDS.includes(id)) return p;
    const draft = p.draft.includes(id) ? p.draft.filter(x => x !== id) : [...p.draft, id];
    return planProblem(p, draft) ? p : { ...p, draft };
}
export function commitShift(p: RepairPlan, expectedShift: number): RepairPlan {
    if (p.shift !== expectedShift || !p.draft.length || planProblem(p)) return p;
    return { shift: p.shift + 1, draft: [], completed: [...p.completed, ...p.draft], history: [...p.history, [...p.draft]] };
}
export function repairFlags(p: RepairPlan): string[] {
    return p.shift === 2 ? p.completed.map(id => `future:${id}`) : [];
}
