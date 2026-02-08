import { createChapter3DView } from './createChapter3DView';
import { DysonConstructionMicroScene } from './micro/chapterMicroScenes';
import { FutureEarthOrbitalOverlay } from './overlays/chapterOverlays';
import { FutureEarthSystemTerrain } from './overlays/chapterTerrains';

const FutureEarth3DView = createChapter3DView({
  theme: {
    name: 'Post-Human Orbital Theater',
    atmosphericTag: 'Deep-space orbital logistics with swarm-construction pressure.',
    particlePreset: 'stars',
    particleColor: '#fde68a',
    particleCount: 180,
    bloomBoost: 1.22,
    vignetteDarkness: 0.54,
    frontCoolColor: '#93c5fd',
    frontHotColor: '#fbbf24',
  },
  terrainComponent: FutureEarthSystemTerrain,
  sceneOverlayComponent: FutureEarthOrbitalOverlay,
  microSceneComponent: DysonConstructionMicroScene,
});

export default FutureEarth3DView;
