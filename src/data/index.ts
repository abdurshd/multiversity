import { Chapter } from '../types';
import { usIndependenceChapter } from './chapters/us-independence';
import { frenchRevolutionChapter } from './chapters/french-revolution';
import { lincolnEraChapter } from './chapters/lincoln-era';
import { russianEmpireChapter } from './chapters/russian-empire';
import { leninRevolutionChapter } from './chapters/lenin-revolution';
import { worldWarOneChapter } from './chapters/world-war-1';
import { hitlerRiseChapter } from './chapters/hitler-rise';
import { worldWarTwoChapter } from './chapters/world-war-2';
import { coldWarChapter } from './chapters/cold-war';
import { ussrCollapseChapter } from './chapters/ussr-collapse';
import { timurLegacyChapter } from './chapters/timur-legacy';
import { covidPandemicChapter } from './chapters/covid-pandemic';
import { aiRevolutionChapter } from './chapters/ai-revolution';
import { futureEarthChapter } from './chapters/future-earth';
import { koreaDestinyChapter } from './chapters/korea-destiny';

// Central data management for all chapters
export const allChapters: Chapter[] = [
  timurLegacyChapter, // Chronologically first
  usIndependenceChapter,
  frenchRevolutionChapter,
  lincolnEraChapter,
  russianEmpireChapter,
  leninRevolutionChapter,
  worldWarOneChapter,
  hitlerRiseChapter,
  worldWarTwoChapter,
  koreaDestinyChapter,
  coldWarChapter,
  ussrCollapseChapter,
  covidPandemicChapter,
  aiRevolutionChapter,
  futureEarthChapter
];

// Helper functions for data access
export const getChapterById = (id: string): Chapter | undefined => {
  return allChapters.find(chapter => chapter.id === id);
};

export const getTimelineById = (chapterId: string, timelineId: string) => {
  const chapter = getChapterById(chapterId);
  return chapter?.alternativeTimelines.find(timeline => timeline.id === timelineId);
};

export const getAllTimelines = () => {
  return allChapters.flatMap(chapter =>
    chapter.alternativeTimelines.map(timeline => ({
      ...timeline,
      chapterId: chapter.id,
      chapterTitle: chapter.title
    }))
  );
};

export const getChaptersByPeriod = () => {
  return allChapters.sort((a, b) => a.startYear - b.startYear);
};

export const searchChapters = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return allChapters.filter(chapter =>
    chapter.title.toLowerCase().includes(lowercaseQuery) ||
    chapter.description.toLowerCase().includes(lowercaseQuery) ||
    chapter.keyFigures.some(figure =>
      figure.name.toLowerCase().includes(lowercaseQuery)
    )
  );
};

export const getRandomTimeline = () => {
  const allTimelines = getAllTimelines();
  return allTimelines[Math.floor(Math.random() * allTimelines.length)];
};

export {
  usIndependenceChapter,
  frenchRevolutionChapter,
  lincolnEraChapter,
  russianEmpireChapter,
  leninRevolutionChapter,
  worldWarOneChapter,
  hitlerRiseChapter,
  worldWarTwoChapter,
  koreaDestinyChapter,
  coldWarChapter,
  ussrCollapseChapter,
  timurLegacyChapter,
  covidPandemicChapter,
  aiRevolutionChapter,
  futureEarthChapter
};