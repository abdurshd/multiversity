import type { CameraShot, ExperienceScript, Vec3 } from '../types';
import copy from '../../locales/en/experience/hitler-rise.json';
const newsroom = { position: [23, 17, 27] as Vec3, target: [0, 1, 0] as Vec3 };
const archive = { position: [25, 18, 26] as Vec3, target: [0, 1, -1] as Vec3 };
const meeting = { position: [23, 18, 28] as Vec3, target: [0, 1, 0] as Vec3 };
const shot = (from: Vec3, to: Vec3): CameraShot[] => [{ path: [from, to], lookPath: [[0, 1, 0]], duration: 20, fov: 48 }];
export const hitlerRiseScript: ExperienceScript = {
    chapterId: 'hitler-rise', title: copy.title, era: copy.era, startBeat: 'arrival',
    initialStats: { chaos: 0, freedom: 0, diplomacy: 0, strength: 0 }, defaultEnding: 'private',
    beats: {
        arrival: { kind: 'cinematic', id: 'arrival', environment: 'civic-newsroom', shots: shot([34, 24, 36], newsroom.position), narration: Object.values(copy.beats.arrival.narration), next: 'appointment' },
        appointment: { kind: 'explore', id: 'appointment', environment: 'civic-newsroom', camera: newsroom, prompt: copy.beats.appointment.prompt, hotspots: [
            { id: 'appointment-record', position: [-5, 2, 2], ...copy.beats.appointment.hotspots['appointment-record'] },
            { id: 'election-record', position: [7, 2, -3], ...copy.beats.appointment.hotspots['election-record'] },
        ] },
        editorial: { kind: 'choice', id: 'editorial', environment: 'civic-newsroom', camera: newsroom, title: copy.beats.editorial.title, prompt: copy.beats.editorial.prompt, options: [
            { id: 'publish', ...copy.beats.editorial.options.publish, flags: ['early-public'], next: 'decree' },
            { id: 'retain', ...copy.beats.editorial.options.retain, flags: ['early-private'], next: 'decree' },
        ] },
        decree: { kind: 'cinematic', id: 'decree', environment: 'civic-archive', shots: shot([31, 22, 32], archive.position), narration: Object.values(copy.beats.decree.narration), next: 'rights' },
        rights: { kind: 'explore', id: 'rights', environment: 'civic-archive', camera: archive, prompt: copy.beats.rights.prompt, hotspots: [
            { id: 'decree-record', position: [-4, 2, 1], ...copy.beats.rights.hotspots['decree-record'] },
            { id: 'telephone-note', position: [7, 2, 3], ...copy.beats.rights.hotspots['telephone-note'] },
        ] },
        meeting: { kind: 'explore', id: 'meeting', environment: 'civic-meeting', camera: meeting, prompt: copy.beats.meeting.prompt, hotspots: [] },
        vote: { kind: 'cinematic', id: 'vote', environment: 'civic-meeting', shots: shot([32, 23, 35], meeting.position), narration: Object.values(copy.beats.vote.narration), next: 'mandate' },
        mandate: { kind: 'explore', id: 'mandate', environment: 'civic-meeting', camera: meeting, prompt: copy.beats.mandate.prompt, hotspots: [
            { id: 'conditions-record', position: [-7, 2, 3], ...copy.beats.mandate.hotspots['conditions-record'] },
            { id: 'act-record', position: [7, 2, 3], ...copy.beats.mandate.hotspots['act-record'] },
        ] },
        response: { kind: 'choice', id: 'response', environment: 'civic-meeting', camera: meeting, title: copy.beats.response.title, prompt: copy.beats.response.prompt, options: [
            { id: 'bulletin', ...copy.beats.response.options.bulletin, flags: ['bulletin'], next: 'closing' },
            { id: 'petition', ...copy.beats.response.options.petition, flags: ['petition'], next: 'closing' },
            { id: 'private', ...copy.beats.response.options.private, flags: ['private'], next: 'closing' },
        ] },
        closing: { kind: 'cinematic', id: 'closing', environment: 'civic-newsroom', shots: shot([27, 20, 30], newsroom.position), narration: Object.values(copy.beats.closing.narration), next: 'end' },
        end: { kind: 'ending', id: 'end' },
    },
    endings: [
        { id: 'public-preserved', ...copy.endings['public-preserved'], epilogue: Object.values(copy.endings['public-preserved'].epilogue), icon: '▤', color: '#d6c3a2', priority: 30, requiresFlags: ['bulletin', 'agreement:archive'] },
        { id: 'public-single', ...copy.endings['public-single'], epilogue: Object.values(copy.endings['public-single'].epilogue), icon: '▥', color: '#d6c3a2', priority: 20, requiresFlags: ['bulletin'], forbidsFlags: ['agreement:archive'] },
        { id: 'legal', ...copy.endings.legal, epilogue: Object.values(copy.endings.legal.epilogue), icon: '§', color: '#bfc7bd', priority: 10, requiresFlags: ['petition'] },
        { id: 'private', ...copy.endings.private, epilogue: Object.values(copy.endings.private.epilogue), icon: '□', color: '#c1cbd4', priority: 0 },
    ],
};
