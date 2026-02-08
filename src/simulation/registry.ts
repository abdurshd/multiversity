import React from 'react';
import { GenericCampaign3DViewProps } from '../components/simulation/GenericCampaign3DView';
import AIRevolution3DView from '../components/simulation/AIRevolution3DView';
import ColdWar3DView from '../components/simulation/ColdWar3DView';
import CovidPandemic3DView from '../components/simulation/CovidPandemic3DView';
import FrenchRevolution3DView from '../components/simulation/FrenchRevolution3DView';
import FutureEarth3DView from '../components/simulation/FutureEarth3DView';
import HitlerRise3DView from '../components/simulation/HitlerRise3DView';
import KoreaDestiny3DView from '../components/simulation/KoreaDestiny3DView';
import LeninRevolution3DView from '../components/simulation/LeninRevolution3DView';
import LincolnEra3DView from '../components/simulation/LincolnEra3DView';
import RussianEmpire3DView from '../components/simulation/RussianEmpire3DView';
import TimurLegacy3DView from '../components/simulation/TimurLegacy3DView';
import USIndependence3DView from '../components/simulation/USIndependence3DView';
import USSRCollapse3DView from '../components/simulation/USSRCollapse3DView';
import WorldWarOne3DView from '../components/simulation/WorldWarOne3DView';
import WorldWarTwo3DView from '../components/simulation/WorldWarTwo3DView';
import { CampaignBuildInput, CampaignState } from './campaignTypes';
import { buildAIRevolutionCampaignState } from './aiRevolution3d';
import { buildColdWarCampaignState } from './coldWar3d';
import { buildCovidPandemicCampaignState } from './covidPandemic3d';
import { buildFrenchRevolutionCampaignState } from './frenchRevolution3d';
import { buildFutureEarthCampaignState } from './futureEarth3d';
import { buildHitlerRiseCampaignState } from './hitlerRise3d';
import { buildKoreaDestinyCampaignState } from './koreaDestiny3d';
import { buildLeninRevolutionCampaignState } from './leninRevolution3d';
import { buildLincolnEraCampaignState } from './lincolnEra3d';
import { buildRussianEmpireCampaignState } from './russianEmpire3d';
import { buildTimurLegacyCampaignState } from './timurLegacy3d';
import { buildUSIndependenceCampaignState } from './usIndependence3d';
import { buildUSSRCollapseCampaignState } from './ussrCollapse3d';
import { buildWorldWarOneCampaignState } from './worldWarOne3d';
import { buildWorldWarTwoCampaignState } from './worldWarTwo3d';

export interface ChapterSimulationRegistration {
  buildState: (input: CampaignBuildInput) => CampaignState;
  View3D: React.ComponentType<GenericCampaign3DViewProps>;
}

export const campaignSimulationRegistry: Partial<Record<string, ChapterSimulationRegistration>> = {
  'timur-legacy': { buildState: buildTimurLegacyCampaignState, View3D: TimurLegacy3DView },
  'us-independence': { buildState: buildUSIndependenceCampaignState, View3D: USIndependence3DView },
  'french-revolution': { buildState: buildFrenchRevolutionCampaignState, View3D: FrenchRevolution3DView },
  'russian-empire': { buildState: buildRussianEmpireCampaignState, View3D: RussianEmpire3DView },
  'lincoln-era': { buildState: buildLincolnEraCampaignState, View3D: LincolnEra3DView },
  'lenin-revolution': { buildState: buildLeninRevolutionCampaignState, View3D: LeninRevolution3DView },
  'hitler-rise': { buildState: buildHitlerRiseCampaignState, View3D: HitlerRise3DView },
  'world-war-1': { buildState: buildWorldWarOneCampaignState, View3D: WorldWarOne3DView },
  'world-war-2': { buildState: buildWorldWarTwoCampaignState, View3D: WorldWarTwo3DView },
  'korea-destiny': { buildState: buildKoreaDestinyCampaignState, View3D: KoreaDestiny3DView },
  'cold-war': { buildState: buildColdWarCampaignState, View3D: ColdWar3DView },
  'ussr-collapse': { buildState: buildUSSRCollapseCampaignState, View3D: USSRCollapse3DView },
  'covid-pandemic': { buildState: buildCovidPandemicCampaignState, View3D: CovidPandemic3DView },
  'ai-revolution': { buildState: buildAIRevolutionCampaignState, View3D: AIRevolution3DView },
  'future-earth': { buildState: buildFutureEarthCampaignState, View3D: FutureEarth3DView },
};
