import type { ExperienceScript } from '../types';
import { timurScript } from './timur';

const SCRIPTS: Record<string, ExperienceScript> = {
    'timur-legacy': timurScript,
};

export function getExperienceScript(chapterId: string): ExperienceScript | null {
    return SCRIPTS[chapterId] ?? null;
}

export function hasExperience(chapterId: string): boolean {
    return chapterId in SCRIPTS;
}
