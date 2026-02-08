import { createChapter3DView } from './createChapter3DView';
import { GeokTepeMicroScene } from './micro/chapterMicroScenes';
import { RussianEmpireOverlay } from './overlays/chapterOverlays';
import { RussianEmpireTerrain } from './overlays/chapterTerrains';

const RussianEmpire3DView = createChapter3DView({
  theme: {
    name: 'Eurasian Frontier Map',
    atmosphericTag: 'Cold northern corridors and contested southern expansion axes.',
    particlePreset: 'snow',
    particleColor: '#bfdbfe',
    particleCount: 160,
    bloomBoost: 1.1,
    vignetteDarkness: 0.64,
    frontCoolColor: '#38bdf8',
    frontHotColor: '#fb923c',
  },
  terrainComponent: RussianEmpireTerrain,
  sceneOverlayComponent: RussianEmpireOverlay,
  microSceneComponent: GeokTepeMicroScene,
});

export default RussianEmpire3DView;
