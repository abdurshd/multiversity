import { createChapter3DView } from './createChapter3DView';
import { CubanMissileMicroScene } from './micro/chapterMicroScenes';
import { ColdWarGlobeOverlay } from './overlays/chapterOverlays';
import { ColdWarGlobeTerrain } from './overlays/chapterTerrains';

const ColdWar3DView = createChapter3DView({
  theme: {
  name: 'Bipolar Strategic Globe',
  atmosphericTag: 'Radar-like global standoff with deterrence arcs and proxy flashes.',
  particlePreset: 'data',
  particleColor: '#67e8f9',
  particleCount: 160,
  bloomBoost: 1.18,
  vignetteDarkness: 0.66,
  frontCoolColor: '#22d3ee',
  frontHotColor: '#fb923c',
  },
  terrainComponent: ColdWarGlobeTerrain,
  sceneOverlayComponent: ColdWarGlobeOverlay,
  microSceneComponent: CubanMissileMicroScene,
});

export default ColdWar3DView;
