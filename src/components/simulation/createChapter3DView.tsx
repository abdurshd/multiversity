import React from 'react';
import GenericCampaign3DView, {
  CampaignMicroSceneRenderProps,
  CampaignSceneOverlayProps,
  CampaignTerrainRenderProps,
  CampaignViewTheme,
  GenericCampaign3DViewProps,
} from './GenericCampaign3DView';

interface Chapter3DViewOptions {
  theme: CampaignViewTheme;
  terrainComponent?: React.ComponentType<CampaignTerrainRenderProps>;
  sceneOverlayComponent?: React.ComponentType<CampaignSceneOverlayProps>;
  microSceneComponent?: React.ComponentType<CampaignMicroSceneRenderProps>;
}

export const createChapter3DView = (options: Chapter3DViewOptions): React.FC<GenericCampaign3DViewProps> => {
  const Chapter3DView: React.FC<GenericCampaign3DViewProps> = (props) => (
    <GenericCampaign3DView
      {...props}
      theme={options.theme}
      terrainComponent={options.terrainComponent}
      sceneOverlayComponent={options.sceneOverlayComponent}
      microSceneComponent={options.microSceneComponent}
    />
  );

  Chapter3DView.displayName = `${options.theme.name.replace(/\s+/g, '')}3DView`;

  return Chapter3DView;
};
