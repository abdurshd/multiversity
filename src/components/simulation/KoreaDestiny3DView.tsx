import { createChapter3DView } from './createChapter3DView';
import { IncheonLandingMicroScene } from './micro/chapterMicroScenes';
import { KoreaDMZOverlay } from './overlays/chapterOverlays';
import { KoreaPeninsulaTerrain } from './overlays/chapterTerrains';

const KoreaDestiny3DView = createChapter3DView({
  theme: {
    name: 'Peninsula Escalation Map',
    atmosphericTag: 'Mountain chokepoints and armistice-line volatility.',
    particlePreset: 'snow',
    particleColor: '#e0f2fe',
    particleCount: 140,
    bloomBoost: 1.04,
    vignetteDarkness: 0.62,
    frontCoolColor: '#38bdf8',
    frontHotColor: '#f97316',
  },
  terrainComponent: KoreaPeninsulaTerrain,
  sceneOverlayComponent: KoreaDMZOverlay,
  microSceneComponent: IncheonLandingMicroScene,
});

export default KoreaDestiny3DView;
