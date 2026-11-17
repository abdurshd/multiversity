import type { ExperienceScript } from '../types';
import { timurScript } from './timur';
import { usIndependenceScript } from './usIndependence';
import { frenchRevolutionScript } from './frenchRevolution';
import { lincolnEraScript } from './lincolnEra';
import { worldWar1Script } from './worldWar1';

const SCRIPTS: Record<string, ExperienceScript> = {
    'timur-legacy': timurScript,
    'us-independence': usIndependenceScript,
    'french-revolution': frenchRevolutionScript,
    'lincoln-era': lincolnEraScript,
    'world-war-1': worldWar1Script,
};

export function getExperienceScript(chapterId: string): ExperienceScript | null {
    return SCRIPTS[chapterId] ?? null;
}

export function hasExperience(chapterId: string): boolean {
    return chapterId in SCRIPTS;
}
