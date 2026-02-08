import { createChapter3DView } from './createChapter3DView';
import { AnkaraSiegeMicroScene } from './micro/chapterMicroScenes';
import { TimurTerrainOverlay } from './overlays/chapterOverlays';
import { TimurSteppeTerrain } from './overlays/chapterTerrains';

const TimurLegacy3DView = createChapter3DView({
  theme: {
    name: 'Timurid Steppe Theater',
    atmosphericTag: 'Dust plumes and golden-hour siege visibility over Silk Road corridors.',
    particlePreset: 'dust',
    particleColor: '#fbbf24',
    particleCount: 140,
    bloomBoost: 1.2,
    vignetteDarkness: 0.52,
    frontCoolColor: '#fde68a',
    frontHotColor: '#f97316',
  },
  terrainComponent: TimurSteppeTerrain,
  sceneOverlayComponent: TimurTerrainOverlay,
  microSceneComponent: AnkaraSiegeMicroScene,
});

export default TimurLegacy3DView;
