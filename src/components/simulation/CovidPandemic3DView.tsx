import { createChapter3DView } from './createChapter3DView';
import { ICUCrisisMicroScene } from './micro/chapterMicroScenes';
import { CovidHeatOverlay } from './overlays/chapterOverlays';
import { CovidGlobalTerrain } from './overlays/chapterTerrains';

const CovidPandemic3DView = createChapter3DView({
  theme: {
    name: 'Epidemiology Response Map',
    atmosphericTag: 'Clinical spread visualization with route-based infection pressure.',
    particlePreset: 'virus',
    particleColor: '#fca5a5',
    particleCount: 200,
    bloomBoost: 1.1,
    vignetteDarkness: 0.56,
    frontCoolColor: '#4ade80',
    frontHotColor: '#ef4444',
  },
  terrainComponent: CovidGlobalTerrain,
  sceneOverlayComponent: CovidHeatOverlay,
  microSceneComponent: ICUCrisisMicroScene,
});

export default CovidPandemic3DView;
