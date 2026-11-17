import { create } from 'zustand';
import { useExperience } from '../store';
import type { ExperienceScript } from '../types';
export const DOSSIERS = ['appointment', 'rights', 'mandate'] as const;
export type Dossier = typeof DOSSIERS[number];
export const VERDICTS = ['supported', 'contradicted', 'uncertain'] as const;
export type Verdict = typeof VERDICTS[number];
export const PARTNERS = ['archive', 'printer', 'counsel'] as const;
export type Partner = typeof PARTNERS[number];
export const SOURCES = {
    appointment: 'https://encyclopedia.ushmm.org/content/en/article/hitler-comes-to-power',
    decree: 'https://encyclopedia.ushmm.org/content/en/article/reichstag-fire-decree',
    act: 'https://encyclopedia.ushmm.org/content/en/article/the-enabling-act',
    parliament: 'https://www.bundestag.de/resource/blob/189782/fcc189675467bf155755c5b4bd70955a/sham_parliament-data.pdf',
};
export const DOCKETS: Record<Dossier, { records: [string, string]; source: string; verdict: Verdict; next: string }> = {
    appointment: { records: ['appointment-record', 'election-record'], source: 'appointment-record', verdict: 'supported', next: 'editorial' },
    rights: { records: ['decree-record', 'telephone-note'], source: 'decree-record', verdict: 'contradicted', next: 'meeting' },
    mandate: { records: ['conditions-record', 'act-record'], source: 'conditions-record', verdict: 'uncertain', next: 'response' },
};
export const RECORD_URLS: Record<string, string> = {
    'appointment-record': SOURCES.appointment, 'election-record': SOURCES.appointment,
    'decree-record': SOURCES.decree, 'conditions-record': SOURCES.parliament, 'act-record': SOURCES.act,
};
export const isDossier = (id: string): id is Dossier => DOSSIERS.includes(id as Dossier);
export function evidenceMatches(dossier: Dossier, source: string, verdict: Verdict) {
    return isDossier(dossier) && VERDICTS.includes(verdict) && DOCKETS[dossier].source === source && DOCKETS[dossier].verdict === verdict;
}
const interactive = (id: string) => {
    const run = useExperience.getState();
    return run.script?.chapterId === 'hitler-rise' && run.phase === 'explore' && run.beatId === id;
};
interface CivicState {
    read: string[];
    verified: Dossier[];
    selectedSource: string | null;
    verdict: Verdict | null;
    feedback: 'retry' | 'verified' | null;
    partnersSeen: Partner[];
    activePartner: Partner | null;
    agreements: Partner[];
    refused: boolean;
    meetingClosed: boolean;
    viewRevision: number;
    readRecord: (id: string | null) => void;
    assess: (verdict: Verdict) => void;
    verify: () => void;
    continueDossier: () => void;
    meet: (partner: Partner | null) => void;
    agree: (partner: Partner, guarantee: boolean) => void;
    withdraw: (partner: Partner) => void;
    closeMeeting: () => void;
    overview: () => void;
    reset: () => void;
}
const initial = () => ({ read: [] as string[], verified: [] as Dossier[], selectedSource: null, verdict: null, feedback: null, partnersSeen: [] as Partner[], activePartner: null, agreements: [] as Partner[], refused: false, meetingClosed: false, viewRevision: 0 });
export const useCivic = create<CivicState>((set, get) => ({
    ...initial(),
    readRecord: id => {
        const run = useExperience.getState();
        if (!isDossier(run.beatId) || !interactive(run.beatId)) return;
        if (id === null) { run.openHotspot(null); return; }
        if (!DOCKETS[run.beatId].records.includes(id)) return;
        run.openHotspot(id);
        set(s => ({ read: s.read.includes(id) ? s.read : [...s.read, id], selectedSource: s.verified.includes(run.beatId as Dossier) ? s.selectedSource : id, feedback: s.verified.includes(run.beatId as Dossier) ? 'verified' : null }));
    },
    assess: verdict => {
        const run = useExperience.getState();
        if (!isDossier(run.beatId) || !interactive(run.beatId) || get().verified.includes(run.beatId) || !VERDICTS.includes(verdict)) return;
        set({ verdict, feedback: null });
    },
    verify: () => {
        const run = useExperience.getState();
        if (!isDossier(run.beatId) || !interactive(run.beatId) || get().verified.includes(run.beatId)) return;
        const state = get(), docket = DOCKETS[run.beatId];
        if (!state.selectedSource || !state.verdict || !docket.records.every(id => state.read.includes(id))) return;
        if (evidenceMatches(run.beatId, state.selectedSource, state.verdict)) set({ verified: [...state.verified, run.beatId], feedback: 'verified' });
        else set({ feedback: 'retry' });
    },
    continueDossier: () => {
        const run = useExperience.getState();
        if (!isDossier(run.beatId) || !interactive(run.beatId) || !get().verified.includes(run.beatId)) return;
        const next = DOCKETS[run.beatId].next;
        run.addFlags([`verified:${run.beatId}`]);
        set({ selectedSource: null, verdict: null, feedback: null }); run.gotoBeat(next);
    },
    meet: partner => {
        if (!interactive('meeting') || get().meetingClosed || (partner !== null && !PARTNERS.includes(partner))) return;
        set(s => ({ activePartner: partner, refused: false, partnersSeen: partner && !s.partnersSeen.includes(partner) ? [...s.partnersSeen, partner] : s.partnersSeen }));
    },
    agree: (partner, guarantee) => {
        const state = get();
        if (!interactive('meeting') || state.meetingClosed || state.activePartner !== partner || !PARTNERS.includes(partner) || state.agreements.includes(partner) || state.agreements.length >= 2) return;
        if (guarantee) { set({ refused: true }); return; }
        set({ agreements: [...state.agreements, partner], refused: false });
    },
    withdraw: partner => {
        if (!interactive('meeting') || get().meetingClosed) return;
        set(s => ({ agreements: s.agreements.filter(p => p !== partner), refused: false }));
    },
    closeMeeting: () => {
        const state = get();
        if (!interactive('meeting') || state.meetingClosed || state.agreements.length !== 2 || state.partnersSeen.length !== 3) return;
        set({ meetingClosed: true, activePartner: null, refused: false });
        useExperience.getState().choose(undefined, state.agreements.map(p => `agreement:${p}`), 'vote');
    },
    overview: () => set(s => ({ viewRevision: s.viewRevision + 1 })),
    reset: () => set(initial()),
}));
export function responseAllowed(optionId: string, agreements: readonly Partner[]): boolean {
    return optionId === 'private' || optionId === 'bulletin' && agreements.includes('printer') || optionId === 'petition' && agreements.includes('counsel');
}
export function chooseCivic(beatId: string, optionId: string) {
    const run = useExperience.getState();
    if (run.script?.chapterId !== 'hitler-rise' || run.beatId !== beatId || run.phase !== 'choice') return;
    const beat = run.script.beats[beatId];
    if (beat.kind !== 'choice' || beatId === 'response' && !responseAllowed(optionId, useCivic.getState().agreements)) return;
    const option = beat.options.find(o => o.id === optionId);
    if (option) run.choose(option.effects, [...(option.flags ?? []), `choice:${beatId}:${optionId}`], option.next);
}
export function advanceCivic(beatId: string, line: number, skip = false) {
    const run = useExperience.getState();
    if (run.script?.chapterId !== 'hitler-rise' || run.phase !== 'cinematic' || run.beatId !== beatId || run.narrationIndex !== line) return;
    if (skip) run.skipCinematic(); else run.advanceNarration();
}

/** Shared by the live locale switch and regression tests; text changes never replay decisions. */
export function applyCivicScript(script: ExperienceScript, newRun: boolean) {
    if (script.chapterId !== 'hitler-rise') return;
    if (newRun) { useCivic.getState().reset(); useExperience.getState().loadScript(script); }
    else useExperience.setState(s => ({ script, ending: s.ending ? script.endings.find(e => e.id === s.ending?.id) ?? null : null }));
}
