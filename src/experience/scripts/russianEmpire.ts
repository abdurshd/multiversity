import type { ExperienceScript } from '../types';
import { en, type RussiaText } from '../russia/text';

export function makeRussianEmpireScript(t: RussiaText): ExperienceScript {
    return {
        chapterId: 'russian-empire', title: t.title, era: t.era, startBeat: 'intro',
        initialStats: { chaos: 55, freedom: 15, diplomacy: 30, strength: 55 }, defaultEnding: 'suppression',
        beats: {
            intro: { kind: 'cinematic', id: 'intro', environment: 'senate-1825', next: 'square', shots: [
                { path: [[95, 58, 90], [52, 34, 60]], lookPath: [[0, 7, -12]], duration: 12 },
                { path: [[52, 34, 60], [28, 12, 37]], lookPath: [[-14, 5, -8]], duration: 14 },
            ], narration: [{ speaker: t.historyLabel, text: t.intro1 }, { text: t.intro2 }, { text: t.intro3 }] },
            square: { kind: 'explore', id: 'square', environment: 'senate-1825', prompt: t.explore, camera: { position: [52, 35, 62], target: [0, 5, -8] }, hotspots: [
                { id: 'monument', position: [-25, 3, -15], label: t.square, title: t.square, description: t.squareText, icon: '◇' },
                { id: 'regiments', position: [25, 3, -15], label: t.guards, title: t.guards, description: t.guardsText, icon: '♜' },
                { id: 'documents', position: [0, 3, 22], label: t.papers, title: t.papers, description: t.papersText, icon: '▤' },
                { id: 'room', position: [-20, 3, 25], label: t.room, title: t.room, description: t.roomText, icon: '→', advancesTo: 'negotiation' },
            ] },
            // Options are the three model outcomes. RussianEmpireOverlay supplies
            // the bounded three-article negotiation before allowing one to resolve.
            negotiation: { kind: 'choice', id: 'negotiation', environment: 'assembly-1825', title: t.negotiationTitle, prompt: t.negotiationPrompt, camera: { position: [20, 16, 27], target: [0, 3, 0] }, options: [
                { id: 'charter', label: t.charterTitle, description: t.charterSubtitle, flags: ['russia:charter'], effects: { freedom: 35, diplomacy: 25, chaos: -15 }, next: 'charter' },
                { id: 'truce', label: t.truceTitle, description: t.truceSubtitle, flags: ['russia:truce'], effects: { diplomacy: 15, chaos: -15 }, next: 'truce' },
                { id: 'suppression', label: t.suppressionTitle, description: t.suppressionSubtitle, flags: ['russia:suppression'], effects: { freedom: -5, chaos: 10 }, next: 'suppression' },
            ] },
            charter: { kind: 'cinematic', id: 'charter', environment: 'assembly-1825', shots: [{ path: [[17, 10, 24], [7, 7, 18]], lookPath: [[0, 2, 0]], duration: 14 }], narration: [{ speaker: t.charterSubtitle, text: t.charterText }], next: 'ending' },
            truce: { kind: 'cinematic', id: 'truce', environment: 'senate-1825-dusk', shots: [{ path: [[32, 19, 42], [65, 40, 65]], lookPath: [[0, 4, -10]], duration: 14 }], narration: [{ speaker: t.truceSubtitle, text: t.truceText }], next: 'ending' },
            suppression: { kind: 'cinematic', id: 'suppression', environment: 'senate-1825-dusk', shots: [{ path: [[35, 22, 50], [78, 48, 82]], lookPath: [[0, 4, -10]], duration: 14 }], narration: [{ speaker: t.suppressionSubtitle, text: t.suppressionText }], next: 'ending' },
            ending: { kind: 'ending', id: 'ending' },
        },
        endings: [
            { id: 'charter', title: t.charterTitle, subtitle: t.charterSubtitle, icon: '📜', color: '#7bc5b3', priority: 10, requiresFlags: ['russia:charter'], epilogue: [{ text: t.charterText }] },
            { id: 'truce', title: t.truceTitle, subtitle: t.truceSubtitle, icon: '🕯', color: '#e0be82', priority: 10, requiresFlags: ['russia:truce'], epilogue: [{ text: t.truceText }] },
            { id: 'suppression', title: t.suppressionTitle, subtitle: t.suppressionSubtitle, icon: '❄', color: '#a2b7c9', priority: 0, epilogue: [{ text: t.suppressionText }] },
        ],
    };
}
export const russianEmpireScript = makeRussianEmpireScript(en);
