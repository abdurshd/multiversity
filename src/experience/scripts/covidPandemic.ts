import type { ExperienceScript, CameraShot, Vec3 } from '../types';
import copy from '../../locales/en/experience/covid-pandemic.json';

const hospitalCamera = { position: [9, 5.7, 15] as Vec3, target: [-1, 2.2, -4] as Vec3 };
const depotCamera = { position: [12, 6.5, 18] as Vec3, target: [0, 2, -2] as Vec3 };
const briefingCamera = { position: [9, 4.9, 13] as Vec3, target: [-1, 2.6, -4.5] as Vec3 };
const glide = (from: Vec3, to: Vec3, target: Vec3): CameraShot[] => [{ path: [from, to], lookPath: [target], duration: 18, fov: 52 }];

/** Fictional civic coordination, deliberately no battle or disease model. */
export const covidPandemicScript: ExperienceScript = {
    chapterId: 'covid-pandemic', title: copy.title, era: copy.era, startBeat: 'arrival',
    initialStats: { chaos: 0, freedom: 0, diplomacy: 0, strength: 0 },
    defaultEnding: 'partial',
    beats: {
        arrival: { kind: 'cinematic', id: 'arrival', environment: 'covid-hospital',
            shots: glide([12, 6.5, 18], [8, 5.3, 14], [-1, 2.2, -4]),
            narration: Object.values(copy.beats.arrival.narration), next: 'reports' },
        reports: { kind: 'explore', id: 'reports', environment: 'covid-hospital', camera: hospitalCamera,
            prompt: copy.beats.reports.prompt,
            hotspots: [
                { id: 'ward', position: [-7, 2, -2], ...copy.beats.reports.hotspots.ward },
                { id: 'ledger', position: [7, 2, -3], ...copy.beats.reports.hotspots.ledger },
                { id: 'radio', position: [0, 2, 8], ...copy.beats.reports.hotspots.radio },
            ] },
        manifest: { kind: 'explore', id: 'manifest', environment: 'covid-depot', camera: depotCamera, prompt: copy.ui.allocation, hotspots: [] },
        loading: { kind: 'cinematic', id: 'loading', environment: 'covid-depot',
            shots: glide([13, 6.8, 19], [10, 5.8, 16], [0, 2, -2]), narration: Object.values(copy.beats.loading.narration), next: 'roster' },
        roster: { kind: 'choice', id: 'roster', environment: 'covid-hospital', camera: hospitalCamera,
            title: copy.beats.roster.title, prompt: copy.beats.roster.prompt,
            options: [
                { id: 'continuity', ...copy.beats.roster.options.continuity, flags: ['continuity'], next: 'briefing' },
                { id: 'surge', ...copy.beats.roster.options.surge, flags: ['surge', 'unserved'], next: 'briefing' },
            ] },
        briefing: { kind: 'choice', id: 'briefing', environment: 'covid-briefing', camera: briefingCamera,
            title: copy.beats.briefing.title, prompt: copy.beats.briefing.prompt,
            options: [
                { id: 'transparent', ...copy.beats.briefing.options.transparent, flags: ['transparent'], next: 'handover' },
                { id: 'certainty', ...copy.beats.briefing.options.certainty, flags: ['overpromise'], next: 'correction' },
            ] },
        correction: { kind: 'choice', id: 'correction', environment: 'covid-briefing', camera: briefingCamera,
            title: copy.beats.correction.title, prompt: copy.beats.correction.prompt,
            options: [
                { id: 'correct', ...copy.beats.correction.options.correct, flags: ['corrected', 'transparent'], next: 'handover' },
                { id: 'silent', ...copy.beats.correction.options.silent, flags: ['uncorrected'], next: 'handover' },
            ] },
        handover: { kind: 'cinematic', id: 'handover', environment: 'covid-briefing',
            shots: glide([11, 5.5, 15], [8, 4.8, 12], [-1, 2.6, -4.5]), narration: Object.values(copy.beats.handover.narration), next: 'end' },
        end: { kind: 'ending', id: 'end' },
    },
    endings: [
        { id: 'trust', ...copy.endings.trust, epilogue: Object.values(copy.endings.trust.epilogue), icon: '◌', color: '#fda4af', priority: 40, requiresFlags: ['uncorrected'] },
        { id: 'gap', ...copy.endings.gap, epilogue: Object.values(copy.endings.gap.epilogue), icon: '△', color: '#fcd34d', priority: 30, requiresFlags: ['unserved'] },
        { id: 'shared', ...copy.endings.shared, epilogue: Object.values(copy.endings.shared.epilogue), icon: '◎', color: '#5eead4', priority: 20, requiresFlags: ['balanced', 'continuity', 'transparent'] },
        { id: 'partial', ...copy.endings.partial, epilogue: Object.values(copy.endings.partial.epilogue), icon: '◇', color: '#93c5fd', priority: 0 },
    ],
};
