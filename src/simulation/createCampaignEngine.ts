import { InteractiveScenario, StoryChoice } from '../types';
import {
  CampaignBuildInput,
  CampaignChoiceImpact,
  CampaignConfig,
  CampaignMicroSceneState,
  CampaignState,
  CampaignStats,
  Vec3,
} from './campaignTypes';

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

const hashString = (value: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const seededUnit = (seed: string): number => (hashString(seed) % 10000) / 10000;

const softmax = (values: number[]): number[] => {
  const maxValue = Math.max(...values);
  const exponentials = values.map((value) => Math.exp(value - maxValue));
  const sum = exponentials.reduce((acc, value) => acc + value, 0);
  return exponentials.map((value) => value / Math.max(sum, 0.0001));
};

const lerpVec3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const buildGeneratedImpact = (
  choice: StoryChoice,
  choiceIndex: number,
  scenarioIndex: number,
  config: CampaignConfig,
): CampaignChoiceImpact => {
  const node = config.nodes[(choiceIndex + scenarioIndex) % config.nodes.length];
  const front = config.fronts[(choiceIndex + scenarioIndex) % config.fronts.length];
  const branch = config.branches[(choiceIndex + scenarioIndex) % config.branches.length];

  const modifierTotals: CampaignStats = {
    chaos: 0,
    freedom: 0,
    diplomacy: 0,
    strength: 0,
  };

  (choice.modifiers ?? []).forEach((modifier) => {
    if (modifier.stat in modifierTotals) {
      const key = modifier.stat as keyof CampaignStats;
      modifierTotals[key] += modifier.value;
    }
  });

  const amplitude = 4 + seededUnit(`${choice.id}:amp`) * 8;
  const nodeShiftValue =
    modifierTotals.strength * 0.25 +
    modifierTotals.diplomacy * 0.15 -
    modifierTotals.chaos * 0.2 +
    modifierTotals.freedom * 0.1 +
    amplitude;

  const frontShiftValue =
    modifierTotals.chaos * 0.3 +
    modifierTotals.strength * 0.2 -
    modifierTotals.diplomacy * 0.15 +
    (choice.linkedTimelineId ? 5 : 0);

  const branchBias: Record<string, number> = {
    [branch.id]: 0.4 + seededUnit(`${choice.id}:branch`) * 0.7,
  };

  if (choice.linkedTimelineId && config.branches.some((item) => item.id === choice.linkedTimelineId)) {
    branchBias[choice.linkedTimelineId] = 1.8;
  }

  return {
    nodeShift: {
      [node.id]: nodeShiftValue,
    },
    frontShift: {
      [front.id]: frontShiftValue,
    },
    branchBias,
    riskDelta: (modifierTotals.chaos * 0.4 + modifierTotals.strength * 0.1) / 10,
  };
};

const buildChoiceImpactMap = (
  config: CampaignConfig,
  scenarios: InteractiveScenario[],
): Record<string, CampaignChoiceImpact> => {
  const generated: Record<string, CampaignChoiceImpact> = {};

  scenarios.forEach((scenario, scenarioIndex) => {
    (scenario.choices ?? []).forEach((choice, choiceIndex) => {
      generated[choice.id] = buildGeneratedImpact(choice, choiceIndex, scenarioIndex, config);
    });
  });

  return {
    ...generated,
    ...(config.choiceImpacts ?? {}),
  };
};

export const createCampaignEngine = (config: CampaignConfig) => {
  return (input: CampaignBuildInput): CampaignState => {
    const choiceImpactMap = buildChoiceImpactMap(config, input.scenarios);

    const aggregatedNodeShift: Record<string, number> = {};
    const aggregatedFrontShift: Record<string, number> = {};
    const aggregatedBranchBias: Record<string, number> = {};
    let aggregatedRiskDelta = 0;

    input.history.forEach((choiceId) => {
      const impact = choiceImpactMap[choiceId];
      if (!impact) {
        return;
      }

      Object.entries(impact.nodeShift ?? {}).forEach(([key, value]) => {
        aggregatedNodeShift[key] = (aggregatedNodeShift[key] ?? 0) + value;
      });

      Object.entries(impact.frontShift ?? {}).forEach(([key, value]) => {
        aggregatedFrontShift[key] = (aggregatedFrontShift[key] ?? 0) + value;
      });

      Object.entries(impact.branchBias ?? {}).forEach(([key, value]) => {
        aggregatedBranchBias[key] = (aggregatedBranchBias[key] ?? 0) + value;
      });

      aggregatedRiskDelta += impact.riskDelta ?? 0;
    });

    const statsSignal = {
      chaos: (input.stats.chaos - 50) / 50,
      freedom: (input.stats.freedom - 50) / 50,
      diplomacy: (input.stats.diplomacy - 50) / 50,
      strength: (input.stats.strength - 50) / 50,
    };

    const scenarioSeed = seededUnit(`${config.chapterId}:${input.scenario.id}:${input.history.join('|')}`);

    const nodes = config.nodes.map((node) => {
      const shift = (aggregatedNodeShift[node.id] ?? 0) / 50;
      const statEffect =
        statsSignal.strength * 0.18 * node.importance +
        statsSignal.diplomacy * 0.11 * (1 - node.importance) -
        statsSignal.chaos * 0.1;
      const scenarioEffect = (seededUnit(`${input.scenario.id}:${node.id}`) - 0.5) * 0.07;
      const control = clamp01(node.baseControl + shift + statEffect + scenarioEffect);

      return {
        ...node,
        control,
      };
    });

    const nodeById = new Map(nodes.map((node) => [node.id, node]));

    const fronts = config.fronts.map((front) => {
      const from = nodeById.get(front.from);
      const to = nodeById.get(front.to);
      const controlDelta = Math.abs((from?.control ?? 0.5) - (to?.control ?? 0.5));
      const impact = (aggregatedFrontShift[front.id] ?? 0) / 65;
      const tension = clamp01(
        front.baseTension +
          impact +
          controlDelta * 0.55 +
          statsSignal.chaos * 0.2 -
          statsSignal.diplomacy * 0.1,
      );

      return {
        ...front,
        tension,
      };
    });

    const maxRouteSegments = Math.max(
      ...config.units.map((unit) => Math.max(1, unit.route.length - 1)),
      1,
    );

    const replayProgress =
      input.scenarios.length <= 1 ? 1 : input.currentScenarioIndex / (input.scenarios.length - 1);

    const units = config.units.map((unit) => {
      if (unit.route.length < 2) {
        const fallbackNode = nodeById.get(unit.route[0] ?? config.nodes[0].id) ?? config.nodes[0];
        return {
          ...unit,
          position: fallbackNode.position,
          routeProgress: 0,
        };
      }

      const drift = seededUnit(`${unit.id}:${input.scenario.id}`) * 0.15;
      const rawProgress =
        replayProgress * (maxRouteSegments / Math.max(1, unit.route.length - 1)) * unit.speed +
        drift +
        input.history.length * 0.02;
      const wrapped = rawProgress % 1;
      const segmentIndex = Math.min(
        Math.floor(rawProgress * (unit.route.length - 1)),
        unit.route.length - 2,
      );

      const startNode = nodeById.get(unit.route[segmentIndex]) ?? config.nodes[0];
      const endNode = nodeById.get(unit.route[segmentIndex + 1]) ?? startNode;
      const position = lerpVec3(startNode.position, endNode.position, wrapped);

      return {
        ...unit,
        position,
        routeProgress: rawProgress,
      };
    });

    const branchScores = config.branches.map((branch) => {
      const statContribution =
        (branch.statWeights.chaos ?? 0) * statsSignal.chaos +
        (branch.statWeights.freedom ?? 0) * statsSignal.freedom +
        (branch.statWeights.diplomacy ?? 0) * statsSignal.diplomacy +
        (branch.statWeights.strength ?? 0) * statsSignal.strength;

      const timelineBias = input.alternativeTimelines.some((timeline) => timeline.id === branch.id) ? 0.25 : 0;

      return (
        branch.baseScore +
        statContribution +
        (aggregatedBranchBias[branch.id] ?? 0) +
        timelineBias +
        scenarioSeed * 0.2
      );
    });

    const branchProbabilities = softmax(branchScores);

    const branches = config.branches.map((branch, index) => ({
      ...branch,
      score: branchScores[index],
      probability: branchProbabilities[index],
    }));

    const dominantBranch =
      branches.reduce((best, branch) => (branch.probability > best.probability ? branch : best), branches[0]) ??
      branches[0];

    const riskLevel = clamp01(
      0.2 +
        aggregatedRiskDelta * 0.15 +
        statsSignal.chaos * 0.4 +
        fronts.reduce((sum, front) => sum + front.tension, 0) / Math.max(fronts.length, 1) * 0.4,
    );

    const microScenes: CampaignMicroSceneState[] = config.microScenes.map((scene) => {
      const isTriggered =
        scene.triggerScenarioIds.includes(input.scenario.id) ||
        input.history.some((choiceId) => scene.triggerScenarioIds.includes(choiceId));

      const focusNode =
        scene.focusNodeIds
          .map((nodeId) => nodeById.get(nodeId))
          .find((node) => Boolean(node)) ??
        nodes[0];

      const primaryMetric = clamp01(0.2 + riskLevel * 0.6 + statsSignal.strength * 0.15 + scenarioSeed * 0.05);
      const secondaryMetric = clamp01(
        0.2 +
          (dominantBranch?.probability ?? 0.33) * 0.5 +
          statsSignal.diplomacy * 0.15 -
          statsSignal.chaos * 0.05,
      );

      return {
        ...scene,
        active: isTriggered,
        focalPoint: focusNode.position,
        primaryMetric,
        secondaryMetric,
      };
    });

    const activeMicroScene = microScenes.find((scene) => scene.active) ?? null;

    return {
      chapterId: config.chapterId,
      chapterTitle: config.chapterTitle,
      terrain: config.terrain,
      palette: config.palette,
      factions: config.factions,
      nodes,
      fronts,
      units,
      branches,
      pulse: {
        color: dominantBranch?.color ?? config.palette.pulse,
        intensity: riskLevel,
        label: dominantBranch?.title ?? 'Branch Flux',
      },
      activeMicroScene,
      educationalNotes: config.educationalNotes,
      meta: {
        scenarioId: input.scenario.id,
        scenarioTitle: input.scenario.title,
        historyDepth: input.history.length,
        replayProgress,
        stats: input.stats,
        statsSignal: {
          chaos: clamp01((statsSignal.chaos + 1) / 2),
          freedom: clamp01((statsSignal.freedom + 1) / 2),
          diplomacy: clamp01((statsSignal.diplomacy + 1) / 2),
          strength: clamp01((statsSignal.strength + 1) / 2),
        },
      },
    };
  };
};
