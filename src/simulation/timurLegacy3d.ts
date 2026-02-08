import { createCampaignEngine } from './createCampaignEngine';
import { chapter3dConfigs } from './chapter3dConfigs';

export const buildTimurLegacyCampaignState = createCampaignEngine(chapter3dConfigs['timur-legacy']);
