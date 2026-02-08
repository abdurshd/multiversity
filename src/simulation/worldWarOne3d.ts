import { createCampaignEngine } from './createCampaignEngine';
import { chapter3dConfigs } from './chapter3dConfigs';

export const buildWorldWarOneCampaignState = createCampaignEngine(chapter3dConfigs['world-war-1']);
