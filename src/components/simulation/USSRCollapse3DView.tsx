import { createChapter3DView } from './createChapter3DView';
import { AugustCoupMicroScene } from './micro/chapterMicroScenes';
import { USSRCollapseOverlay } from './overlays/chapterOverlays';
import { USSRCollapseTerrain } from './overlays/chapterTerrains';

const USSRCollapse3DView = createChapter3DView({
  theme: {
    name: 'Soviet Fragmentation Grid',
    atmosphericTag: 'Concrete-gray breakup dynamics with center-to-edge secession vectors.',
    particlePreset: 'smoke',
    particleColor: '#d1d5db',
    particleCount: 130,
    bloomBoost: 0.98,
    vignetteDarkness: 0.72,
    frontCoolColor: '#93c5fd',
    frontHotColor: '#ef4444',
  },
  terrainComponent: USSRCollapseTerrain,
  sceneOverlayComponent: USSRCollapseOverlay,
  microSceneComponent: AugustCoupMicroScene,
});

export default USSRCollapse3DView;
