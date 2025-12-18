// Core data structures for Multiversity application

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  born?: number;
  died?: number;
  description: string;
  image?: string;
}

export interface HistoricalEvent {
  id: string;
  year: number;
  month?: number;
  day?: number;
  title: string;
  description: string;
  impact: string;
  relatedFigures: string[];
  image?: string;
  location: Coordinates;
  type: 'political' | 'military' | 'social' | 'economic' | 'cultural' | 'technological';
}

export interface ButterflyEffect {
  id: string;
  trigger: string;
  consequence: string;
  magnitude: 'small' | 'medium' | 'large' | 'massive';
  timespan: number; // years
}

export interface Consequence {
  id: string;
  category: 'political' | 'social' | 'economic' | 'cultural' | 'technological' | 'geographic';
  shortTerm: string;
  longTerm: string;
  globalImpact: string;
}

export interface Timeline {
  id: string;
  title: string;
  description: string;
  divergenceDescription: string;
  divergenceYear: number;
  keyEvents: HistoricalEvent[];
  consequences: Consequence[];
  presentDayStatus: string;
  probability: number; // 0-100, how likely this timeline was
  butterfly: ButterflyEffect[];
  color: string; // for visualization
  icon: string;
  image?: string;
}

export interface StoryChoice {
  id: string;
  text: string;
  consequence: string;
  nextSceneId?: string;
  linkedTimelineId?: string;
  modifiers?: { stat: string; value: number }[];
}

export interface InteractiveScenario {
  id: string;
  title: string;
  text: string;
  emoji: string;
  background: string;
  characters: string[];
  sceneType: 'battle' | 'negotiation' | 'exploration' | 'decision' | 'revelation';
  visualEffects?: string[];
  choices?: StoryChoice[];
  timelineYear?: number;
  timelineEvent?: string;
  soundEffect?: string;
}

export interface Chapter {
  id: string;
  title: string;
  period: string;
  startYear: number;
  endYear: number;
  description: string;
  historicalContext: string;
  keyFigures: Person[];
  divergencePoint: string;
  divergenceYear: number;
  alternativeTimelines: Timeline[];
  interactiveScenarios?: InteractiveScenario[];
  mainImage: string;
  icon: string;
  backgroundColor: string;
}

// Application state interfaces
export interface AppState {
  currentChapter: Chapter | null;
  currentTimeline: Timeline | null;
  currentYear: number;
  comparisonTimelines: Timeline[];
  viewMode: 'overview' | 'detail' | 'comparison';
  isLoading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_CURRENT_CHAPTER'; payload: Chapter }
  | { type: 'SET_CURRENT_TIMELINE'; payload: Timeline }
  | { type: 'SET_CURRENT_YEAR'; payload: number }
  | { type: 'ADD_COMPARISON_TIMELINE'; payload: Timeline }
  | { type: 'REMOVE_COMPARISON_TIMELINE'; payload: string }
  | { type: 'SET_VIEW_MODE'; payload: AppState['viewMode'] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATE' };

// Navigation and routing
export interface RouteParams {
  chapterId?: string;
  timelineId?: string;
}

// Timeline visualization
export interface TimelineNode {
  id: string;
  year: number;
  event: HistoricalEvent;
  x: number;
  y: number;
  type: 'divergence' | 'major' | 'minor';
}

export interface TimelineVisualizationProps {
  timeline: Timeline;
  startYear: number;
  endYear: number;
  width: number;
  height: number;
  onEventClick: (event: HistoricalEvent) => void;
  onYearChange: (year: number) => void;
}

// Map visualization
export interface Territory {
  id: string;
  name: string;
  boundaries: Coordinates[];
  year: number;
  controller: string;
  color: string;
}

export interface MapVisualizationProps {
  year: number;
  timeline: Timeline;
  territories: Territory[];
  onTerritoryClick: (territory: Territory) => void;
}