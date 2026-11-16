import type { ExperienceScript } from '../types';
import { timurScript } from './timur';
import { usIndependenceScript } from './usIndependence';
import { frenchRevolutionScript } from './frenchRevolution';

const SCRIPTS: Record<string, ExperienceScript> = {
    'timur-legacy': timurScript,
    'us-independence': usIndependenceScript,
    'french-revolution': frenchRevolutionScript,
};

export function getExperienceScript(chapterId: string): ExperienceScript | null {
    return SCRIPTS[chapterId] ?? null;
}

export function hasExperience(chapterId: string): boolean {
    return chapterId in SCRIPTS;
}
