import { createChapter3DView } from './createChapter3DView';
import { SarajevoAssassinationMicroScene } from './micro/chapterMicroScenes';
import { WW1TrenchOverlay } from './overlays/chapterOverlays';
import { WW1EuropeTrenchTerrain } from './overlays/chapterTerrains';

const WorldWarOne3DView = createChapter3DView({
  theme: {
    name: 'Great War Trench System',
    atmosphericTag: 'Attritional front arcs and alliance chain-reaction pressure.',
    particlePreset: 'smoke',
    particleColor: '#e5e7eb',
    particleCount: 170,
    bloomBoost: 1.06,
    vignetteDarkness: 0.7,
    frontCoolColor: '#93c5fd',
    frontHotColor: '#f97316',
  },
  terrainComponent: WW1EuropeTrenchTerrain,
  sceneOverlayComponent: WW1TrenchOverlay,
  microSceneComponent: SarajevoAssassinationMicroScene,
});

export default WorldWarOne3DView;
