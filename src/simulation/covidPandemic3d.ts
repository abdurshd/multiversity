import { createCampaignEngine } from './createCampaignEngine';
import { chapter3dConfigs } from './chapter3dConfigs';

export const buildCovidPandemicCampaignState = createCampaignEngine(chapter3dConfigs['covid-pandemic']);
