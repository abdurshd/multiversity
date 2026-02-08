import { createChapter3DView } from './createChapter3DView';
import { GettysburgChargeMicroScene } from './micro/chapterMicroScenes';
import { LincolnBoundaryOverlay } from './overlays/chapterOverlays';
import { CivilWarUSATerrain } from './overlays/chapterTerrains';

const LincolnEra3DView = createChapter3DView({
  theme: {
  name: 'Civil War Theater',
  atmosphericTag: 'Battle haze with cannon-flash tension across split U.S. fronts.',
  particlePreset: 'smoke',
  particleColor: '#d1d5db',
  particleCount: 160,
  bloomBoost: 1.15,
  vignetteDarkness: 0.66,
  frontCoolColor: '#60a5fa',
  frontHotColor: '#f97316',
  },
  terrainComponent: CivilWarUSATerrain,
  sceneOverlayComponent: LincolnBoundaryOverlay,
  microSceneComponent: GettysburgChargeMicroScene,
});

export default LincolnEra3DView;
