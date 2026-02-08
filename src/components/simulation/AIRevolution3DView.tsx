import { createChapter3DView } from './createChapter3DView';
import { AGIAlignmentMicroScene } from './micro/chapterMicroScenes';
import { AIGridOverlay } from './overlays/chapterOverlays';
import { AINetworkTerrain } from './overlays/chapterTerrains';

const AIRevolution3DView = createChapter3DView({
  theme: {
    name: 'Neural Infrastructure Mesh',
    atmosphericTag: 'Neon data-stream atmosphere with governance and capability contention.',
    particlePreset: 'data',
    particleColor: '#22d3ee',
    particleCount: 220,
    bloomBoost: 1.3,
    vignetteDarkness: 0.5,
    frontCoolColor: '#22c55e',
    frontHotColor: '#a855f7',
  },
  terrainComponent: AINetworkTerrain,
  sceneOverlayComponent: AIGridOverlay,
  microSceneComponent: AGIAlignmentMicroScene,
});

export default AIRevolution3DView;
