import { createChapter3DView } from './createChapter3DView';
import { BastilleStormMicroScene } from './micro/chapterMicroScenes';
import { FrenchRevolutionOverlay } from './overlays/chapterOverlays';
import { FranceTerrain } from './overlays/chapterTerrains';

const FrenchRevolution3DView = createChapter3DView({
  theme: {
    name: 'Revolutionary Paris Mesh',
    atmosphericTag: 'River-linked urban unrest with escalating terror-phase illumination.',
    particlePreset: 'smoke',
    particleColor: '#fca5a5',
    particleCount: 150,
    bloomBoost: 1.25,
    vignetteDarkness: 0.62,
    frontCoolColor: '#f59e0b',
    frontHotColor: '#dc2626',
  },
  terrainComponent: FranceTerrain,
  sceneOverlayComponent: FrenchRevolutionOverlay,
  microSceneComponent: BastilleStormMicroScene,
});

export default FrenchRevolution3DView;
