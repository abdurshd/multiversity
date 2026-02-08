import { InteractiveScenario, Timeline } from '../types';

export interface CampaignStats {
  chaos: number;
  freedom: number;
  diplomacy: number;
  strength: number;
}

export type Vec3 = [number, number, number];

export type TerrainProfile =
  | 'steppe'
  | 'coastal'
  | 'river'
  | 'mountain'
  | 'urban'
  | 'global'
  | 'industrial'
  | 'space'
  | 'network'
  | 'desert'
  | 'battlefield';

export interface CampaignPalette {
  terrain: string;
  terrainAccent: string;
  fog: string;
  ambient: string;
  keyLight: string;
  pulse: string;
}

export interface CampaignTerrainConfig {
  profile: TerrainProfile;
  size: [number, number];
  heightScale: number;
  fogDensity: number;
}

export interface CampaignNodeConfig {
  id: string;
  label: string;
  position: Vec3;
  faction: string;
  baseControl: number;
  importance: number;
  subtitle?: string;
}

export interface CampaignFrontConfig {
  id: string;
  from: string;
  to: string;
  baseTension: number;
  label: string;
}

export interface CampaignUnitConfig {
  id: string;
  faction: string;
  color: string;
  route: string[];
  speed: number;
  size: number;
}

export interface CampaignBranchConfig {
  id: string;
  title: string;
  color: string;
  description: string;
  baseScore: number;
  statWeights: Partial<Record<keyof CampaignStats, number>>;
}

export interface CampaignChoiceImpact {
  nodeShift?: Record<string, number>;
  frontShift?: Record<string, number>;
  branchBias?: Record<string, number>;
  riskDelta?: number;
}

export type MicroSceneKind =
  | 'siege'
  | 'naval'
  | 'ceremony'
  | 'uprising'
  | 'urban'
  | 'industrial'
  | 'political'
  | 'landing'
  | 'nuclear'
  | 'medical'
  | 'alignment'
  | 'orbital'
  | 'trench';

export interface CampaignMicroSceneConfig {
  id: string;
  title: string;
  description: string;
  triggerScenarioIds: string[];
  kind: MicroSceneKind;
  focusNodeIds: string[];
  primaryMetricLabel: string;
  secondaryMetricLabel: string;
}

export interface CampaignConfig {
  chapterId: string;
  chapterTitle: string;
  terrain: CampaignTerrainConfig;
  palette: CampaignPalette;
  factions: Record<string, string>;
  nodes: CampaignNodeConfig[];
  fronts: CampaignFrontConfig[];
  units: CampaignUnitConfig[];
  branches: CampaignBranchConfig[];
  microScenes: CampaignMicroSceneConfig[];
  educationalNotes: string[];
  choiceImpacts?: Record<string, CampaignChoiceImpact>;
}

export interface CampaignBuildInput {
  scenario: InteractiveScenario;
  stats: CampaignStats;
  history: string[];
  currentScenarioIndex: number;
  scenarios: InteractiveScenario[];
  alternativeTimelines: Timeline[];
}

export interface CampaignNodeState extends CampaignNodeConfig {
  control: number;
}

export interface CampaignFrontState extends CampaignFrontConfig {
  tension: number;
}

export interface CampaignUnitState extends CampaignUnitConfig {
  position: Vec3;
  routeProgress: number;
}

export interface CampaignBranchState extends CampaignBranchConfig {
  probability: number;
  score: number;
}

export interface CampaignPulseState {
  color: string;
  intensity: number;
  label: string;
}

export interface CampaignMicroSceneState extends CampaignMicroSceneConfig {
  active: boolean;
  focalPoint: Vec3;
  primaryMetric: number;
  secondaryMetric: number;
}

export interface CampaignSnapshot {
  id: string;
  label: string;
  state: CampaignState;
  step: number;
}

export interface CampaignState {
  chapterId: string;
  chapterTitle: string;
  terrain: CampaignTerrainConfig;
  palette: CampaignPalette;
  factions: Record<string, string>;
  nodes: CampaignNodeState[];
  fronts: CampaignFrontState[];
  units: CampaignUnitState[];
  branches: CampaignBranchState[];
  pulse: CampaignPulseState;
  activeMicroScene: CampaignMicroSceneState | null;
  educationalNotes: string[];
  meta: {
    scenarioId: string;
    scenarioTitle: string;
    historyDepth: number;
    replayProgress: number;
    stats: CampaignStats;
    statsSignal: CampaignStats;
  };
}
