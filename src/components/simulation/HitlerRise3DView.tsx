import { createChapter3DView } from './createChapter3DView';
import { BeerHallPutschMicroScene } from './micro/chapterMicroScenes';
import { HitlerNoirOverlay } from './overlays/chapterOverlays';
import { HitlerCentralEuropeTerrain } from './overlays/chapterTerrains';

const HitlerRise3DView = createChapter3DView({
  theme: {
    name: 'Weimar Fragmentation Lens',
    atmosphericTag: 'Noir street-pressure lines and political corridor destabilization.',
    particlePreset: 'smoke',
    particleColor: '#cbd5e1',
    particleCount: 120,
    bloomBoost: 0.95,
    vignetteDarkness: 0.75,
    frontCoolColor: '#facc15',
    frontHotColor: '#7f1d1d',
  },
  terrainComponent: HitlerCentralEuropeTerrain,
  sceneOverlayComponent: HitlerNoirOverlay,
  microSceneComponent: BeerHallPutschMicroScene,
});

export default HitlerRise3DView;
