import { createChapter3DView } from './createChapter3DView';
import { DDayLandingMicroScene } from './micro/chapterMicroScenes';
import { WW2Overlay } from './overlays/chapterOverlays';
import { WW2DualTheaterTerrain } from './overlays/chapterTerrains';

const WorldWarTwo3DView = createChapter3DView({
  theme: {
    name: 'Global War Projection',
    atmosphericTag: 'Multi-theater pressure with sustained overcast operational visibility.',
    particlePreset: 'smoke',
    particleColor: '#94a3b8',
    particleCount: 180,
    bloomBoost: 1.12,
    vignetteDarkness: 0.68,
    frontCoolColor: '#60a5fa',
    frontHotColor: '#ef4444',
  },
  terrainComponent: WW2DualTheaterTerrain,
  sceneOverlayComponent: WW2Overlay,
  microSceneComponent: DDayLandingMicroScene,
});

export default WorldWarTwo3DView;
