import type { ExperienceScript } from '../types';
import { russianEmpireScript } from './russianEmpire';
import { timurScript } from './timur';
import { usIndependenceScript } from './usIndependence';
import { frenchRevolutionScript } from './frenchRevolution';
import { lincolnEraScript } from './lincolnEra';
import { worldWar1Script } from './worldWar1';
import { worldWar2Script } from './worldWar2';
import { koreanWarScript } from './koreanWar';

import { leninRevolutionScript } from './leninRevolution';
import { ussrCollapseScript } from './ussrCollapse';

const SCRIPTS: Record<string, ExperienceScript> = {
    'russian-empire': russianEmpireScript,
    'timur-legacy': timurScript,
    'us-independence': usIndependenceScript,
    'french-revolution': frenchRevolutionScript,
    'lincoln-era': lincolnEraScript,
    'world-war-1': worldWar1Script,
    'world-war-2': worldWar2Script,
    'korea-destiny': koreanWarScript,
    'lenin-revolution': leninRevolutionScript,
    'ussr-collapse': ussrCollapseScript,
};

export function getExperienceScript(chapterId: string): ExperienceScript | null {
    return SCRIPTS[chapterId] ?? null;
}

export function hasExperience(chapterId: string): boolean {
    return chapterId in SCRIPTS;
}
