import { createChapter3DView } from './createChapter3DView';
import { YorktownArtilleryMicroScene } from './micro/chapterMicroScenes';
import { USIndependenceOverlay } from './overlays/chapterOverlays';
import { USColonialTerrain } from './overlays/chapterTerrains';

const USIndependence3DView = createChapter3DView({
  theme: {
    name: 'Atlantic Rebellion Grid',
    atmosphericTag: 'Coastal fog with winter attrition and naval pressure in Chesapeake lanes.',
    particlePreset: 'smoke',
    particleColor: '#94a3b8',
    particleCount: 130,
    bloomBoost: 1.08,
    vignetteDarkness: 0.58,
    frontCoolColor: '#60a5fa',
    frontHotColor: '#ef4444',
  },
  terrainComponent: USColonialTerrain,
  sceneOverlayComponent: USIndependenceOverlay,
  microSceneComponent: YorktownArtilleryMicroScene,
});

export default USIndependence3DView;
