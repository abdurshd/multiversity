import { createChapter3DView } from './createChapter3DView';
import { WinterPalaceMicroScene } from './micro/chapterMicroScenes';
import { LeninIndustrialOverlay } from './overlays/chapterOverlays';
import { LeninIndustrialTerrain } from './overlays/chapterTerrains';

const LeninRevolution3DView = createChapter3DView({
  theme: {
    name: 'Red October Industrial Grid',
    atmosphericTag: 'Factory-smoke overlays and urban uprising pulse in Petrograd-Moscow lanes.',
    particlePreset: 'smoke',
    particleColor: '#f87171',
    particleCount: 170,
    bloomBoost: 1.22,
    vignetteDarkness: 0.68,
    frontCoolColor: '#f472b6',
    frontHotColor: '#dc2626',
  },
  terrainComponent: LeninIndustrialTerrain,
  sceneOverlayComponent: LeninIndustrialOverlay,
  microSceneComponent: WinterPalaceMicroScene,
});

export default LeninRevolution3DView;
