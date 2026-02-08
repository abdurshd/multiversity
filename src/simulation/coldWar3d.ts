import { createCampaignEngine } from './createCampaignEngine';
import { chapter3dConfigs } from './chapter3dConfigs';

export const buildColdWarCampaignState = createCampaignEngine(chapter3dConfigs['cold-war']);
