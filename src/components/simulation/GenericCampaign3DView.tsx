import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { Html, Line, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Pause, Play, Radio, SkipBack } from 'lucide-react';
import { BlendFunction } from 'postprocessing';
import {
  CampaignMicroSceneState,
  CampaignNodeState,
  CampaignSnapshot,
  CampaignState,
  CampaignUnitState,
  TerrainProfile,
  Vec3,
} from '../../simulation/campaignTypes';
import MicroScene from './MicroScene';

export interface CampaignViewTheme {
  name: string;
  atmosphericTag: string;
  particlePreset: 'dust' | 'snow' | 'smoke' | 'data' | 'virus' | 'stars' | 'none';
  particleColor: string;
  particleCount: number;
  bloomBoost: number;
  vignetteDarkness: number;
  frontCoolColor: string;
  frontHotColor: string;
}

export interface CampaignSceneOverlayProps {
  state: CampaignState;
  theme: CampaignViewTheme;
}

export interface CampaignTerrainRenderProps {
  state: CampaignState;
  theme: CampaignViewTheme;
}

export interface CampaignMicroSceneRenderProps {
  scene: CampaignMicroSceneState;
  state: CampaignState;
}

export interface GenericCampaign3DViewProps {
  snapshots: CampaignSnapshot[];
  theme?: CampaignViewTheme;
  terrainComponent?: React.ComponentType<CampaignTerrainRenderProps>;
  sceneOverlayComponent?: React.ComponentType<CampaignSceneOverlayProps>;
  microSceneComponent?: React.ComponentType<CampaignMicroSceneRenderProps>;
}

const DEFAULT_THEME: CampaignViewTheme = {
  name: 'Standard Theater',
  atmosphericTag: 'Balanced strategic atmosphere',
  particlePreset: 'none',
  particleColor: '#cbd5e1',
  particleCount: 120,
  bloomBoost: 1,
  vignetteDarkness: 0.6,
  frontCoolColor: '#38bdf8',
  frontHotColor: '#f97316',
};

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const terrainHeight = (profile: TerrainProfile, x: number, z: number, scale: number): number => {
  const waveA = Math.sin(x * 0.45) * Math.cos(z * 0.35);
  const waveB = Math.sin((x + z) * 0.24);

  switch (profile) {
    case 'mountain':
      return (waveA * 0.8 + waveB * 0.5 + Math.abs(Math.sin(x * 0.22)) * 0.9) * scale;
    case 'steppe':
      return (waveA * 0.22 + waveB * 0.12) * scale;
    case 'desert':
      return (Math.sin(x * 0.3) * 0.4 + Math.cos(z * 0.4) * 0.25) * scale;
    case 'coastal':
      return (waveA * 0.3 + (x > 2 ? 0.18 : -0.08)) * scale;
    case 'river':
      return (waveA * 0.22 - Math.exp(-Math.abs(x * 0.7)) * 0.5) * scale;
    case 'urban':
      return (waveA * 0.08 + waveB * 0.06) * scale;
    case 'global':
      return (waveA * 0.26 + waveB * 0.18) * scale;
    case 'industrial':
      return (waveA * 0.16 + Math.sin(z * 0.4) * 0.08) * scale;
    case 'network':
      return (Math.sin(x * 0.9) * 0.06 + Math.cos(z * 1.2) * 0.06) * scale;
    case 'space':
      return 0;
    case 'battlefield':
      return (waveA * 0.28 + Math.sin(z * 0.7) * 0.1) * scale;
    default:
      return (waveA * 0.2 + waveB * 0.12) * scale;
  }
};

const buildTerrainGeometry = (
  width: number,
  depth: number,
  scale: number,
  profile: TerrainProfile,
): THREE.PlaneGeometry => {
  const geometry = new THREE.PlaneGeometry(width, depth, 48, 48);
  const positionAttr = geometry.attributes.position;

  for (let index = 0; index < positionAttr.count; index += 1) {
    const x = positionAttr.getX(index);
    const z = positionAttr.getY(index);
    const y = terrainHeight(profile, x, z, scale);

    positionAttr.setZ(index, y);
  }

  positionAttr.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
};

const vecToArray = (vector: Vec3): [number, number, number] => [vector[0], vector[1], vector[2]];

const hashString = (value: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const seededUnit = (seed: string): number => (hashString(seed) % 10000) / 10000;

const microMetricClass = (value: number): string => {
  if (value >= 0.72) {
    return 'text-red-300';
  }

  if (value >= 0.42) {
    return 'text-amber-300';
  }

  return 'text-emerald-300';
};

const TerrainMesh: React.FC<{ state: CampaignState }> = ({ state }) => {
  const geometry = useMemo(
    () => buildTerrainGeometry(state.terrain.size[0], state.terrain.size[1], state.terrain.heightScale, state.terrain.profile),
    [state.terrain.heightScale, state.terrain.profile, state.terrain.size],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  if (state.terrain.profile === 'space') {
    return (
      <>
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[2.1, 48, 48]} />
          <meshStandardMaterial color={state.palette.terrain} roughness={0.7} metalness={0.2} />
        </mesh>

        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[4.8, 5.4, 96]} />
          <meshStandardMaterial color={state.palette.terrainAccent} transparent opacity={0.58} side={THREE.DoubleSide} />
        </mesh>
      </>
    );
  }

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.4, 0]} geometry={geometry} receiveShadow>
      <meshStandardMaterial
        color={state.palette.terrain}
        emissive={state.palette.terrainAccent}
        emissiveIntensity={0.1}
        roughness={0.84}
        metalness={0.12}
      />
    </mesh>
  );
};

interface ParticleSpec {
  x: number;
  y: number;
  z: number;
  scale: number;
  speed: number;
  driftX: number;
  driftZ: number;
}

const AnimatedParticle: React.FC<{
  particle: ParticleSpec;
  index: number;
  color: string;
  preset: CampaignViewTheme['particlePreset'];
}> = ({
  particle,
  index,
  color,
  preset,
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) {
      return;
    }

    const t = clock.elapsedTime * (0.45 + particle.speed * 9);
    const swirlX = Math.sin(t + index * 0.7) * particle.speed * 2.8;
    const swirlZ = Math.sin(t * 0.5 + index * 0.3) * particle.speed * 2;
    const bob = Math.cos(t * 0.8 + index * 0.6) * particle.speed * 3.6;

    if (preset === 'snow') {
      const fall = ((clock.elapsedTime * (0.35 + particle.speed * 6) + index * 0.4) % 4.8) - 2.4;
      mesh.position.set(
        particle.x + swirlX * 0.6 + particle.driftX,
        particle.y - fall,
        particle.z + swirlZ * 0.4 + particle.driftZ,
      );
      return;
    }

    if (preset === 'data') {
      const stream = ((clock.elapsedTime * (0.75 + particle.speed * 8) + index * 0.3) % 5.2) - 2.6;
      mesh.position.set(
        particle.x + Math.sin(t * 1.4 + index) * particle.speed * 1.2,
        particle.y + stream,
        particle.z + Math.cos(t * 1.1 + index) * particle.speed * 1.2,
      );
      return;
    }

    if (preset === 'virus') {
      mesh.position.set(
        particle.x + swirlX * 1.3,
        particle.y + bob * 0.7,
        particle.z + swirlZ * 1.3,
      );
      return;
    }

    mesh.position.set(
      particle.x + swirlX + particle.driftX,
      particle.y + bob,
      particle.z + swirlZ + particle.driftZ,
    );
  });

  return (
    <mesh ref={ref} position={[particle.x, particle.y, particle.z]}>
      <sphereGeometry args={[particle.scale, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.28} />
    </mesh>
  );
};

const AmbientParticles: React.FC<{ state: CampaignState; theme: CampaignViewTheme; countScale: number }> = ({
  state,
  theme,
  countScale,
}) => {
  const particles = useMemo(() => {
    const effectiveCount = Math.max(0, Math.floor(theme.particleCount * countScale));

    if (theme.particlePreset === 'none' || effectiveCount <= 0) {
      return [];
    }

    return Array.from({ length: effectiveCount }, (_, index) => {
      const seedBase = `${state.chapterId}:${state.meta.scenarioId}:${index}`;
      const spreadX = state.terrain.size[0] * 0.52;
      const spreadZ = state.terrain.size[1] * 0.52;
      const lowAltitude =
        theme.particlePreset === 'snow'
          ? 1.2 + seededUnit(`${seedBase}:h`) * 5
          : theme.particlePreset === 'stars'
            ? 4 + seededUnit(`${seedBase}:h`) * 8
            : theme.particlePreset === 'data'
              ? 0.6 + seededUnit(`${seedBase}:h`) * 3.2
              : 0.2 + seededUnit(`${seedBase}:h`) * 2.1;

      return {
        x: (seededUnit(`${seedBase}:x`) - 0.5) * spreadX,
        y: lowAltitude,
        z: (seededUnit(`${seedBase}:z`) - 0.5) * spreadZ,
        scale: 0.02 + seededUnit(`${seedBase}:s`) * 0.12,
        speed: 0.004 + seededUnit(`${seedBase}:v`) * 0.02,
        driftX: (seededUnit(`${seedBase}:dx`) - 0.5) * 0.9,
        driftZ: (seededUnit(`${seedBase}:dz`) - 0.5) * 0.9,
      };
    });
  }, [
    countScale,
    state.chapterId,
    state.meta.scenarioId,
    state.terrain.size,
    theme.particleCount,
    theme.particlePreset,
  ]);

  if (particles.length === 0) {
    return null;
  }

  return (
    <group>
      {particles.map((particle, index) => (
        <AnimatedParticle
          key={`${state.chapterId}-particle-${index}`}
          particle={particle}
          index={index}
          color={theme.particleColor}
          preset={theme.particlePreset}
        />
      ))}
    </group>
  );
};

const CampaignMicroSceneVisual: React.FC<{ scene: CampaignMicroSceneState }> = ({ scene }) => {
  const width = clamp(scene.primaryMetric * 7, 1.2, 7);
  const depth = clamp(scene.secondaryMetric * 6.5, 1.4, 6);
  const baseColor = scene.primaryMetric > 0.66 ? '#ef4444' : '#f59e0b';

  const iconByKind: Record<CampaignMicroSceneState['kind'], string> = {
    siege: 'Siege',
    naval: 'Naval',
    ceremony: 'Ceremony',
    uprising: 'Uprising',
    urban: 'Urban',
    industrial: 'Industrial',
    political: 'Political',
    landing: 'Landing',
    nuclear: 'Nuclear',
    medical: 'Medical',
    alignment: 'Alignment',
    orbital: 'Orbital',
    trench: 'Trench',
  };

  return (
    <group>
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.38, scene.focalPoint[2]]}>
        <boxGeometry args={[width, 0.28, depth]} />
        <meshStandardMaterial color={baseColor} emissive={baseColor} emissiveIntensity={0.36} />
      </mesh>

      {scene.kind === 'naval' && (
        <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.16, scene.focalPoint[2]]}>
          <torusGeometry args={[1.4, 0.06, 10, 36]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.36} />
        </mesh>
      )}

      {scene.kind === 'siege' && (
        <group position={[scene.focalPoint[0], scene.focalPoint[1] + 0.52, scene.focalPoint[2]]}>
          <mesh position={[-0.7, 0, 0]}>
            <boxGeometry args={[0.4, 0.5, 0.4]} />
            <meshStandardMaterial color="#78716c" />
          </mesh>
          <mesh position={[0.7, 0, 0]}>
            <boxGeometry args={[0.4, 0.5, 0.4]} />
            <meshStandardMaterial color="#78716c" />
          </mesh>
        </group>
      )}

      {scene.kind === 'medical' && (
        <group position={[scene.focalPoint[0], scene.focalPoint[1] + 0.55, scene.focalPoint[2]]}>
          <mesh>
            <boxGeometry args={[0.95, 0.24, 0.18]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.95, 0.24, 0.18]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      )}

      {scene.kind === 'alignment' && (
        <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.45, scene.focalPoint[2]]}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.35} wireframe />
        </mesh>
      )}

      {scene.kind === 'orbital' && (
        <group position={[scene.focalPoint[0], scene.focalPoint[1] + 0.18, scene.focalPoint[2]]}>
          <mesh>
            <sphereGeometry args={[0.28, 18, 18]} />
            <meshStandardMaterial color="#fde68a" emissive="#fde68a" emissiveIntensity={0.35} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.55, 0.62, 28]} />
            <meshStandardMaterial color="#facc15" transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.18, scene.focalPoint[2]]}>
        <ringGeometry args={[1.2, 1.45, 36]} />
        <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.33} side={THREE.DoubleSide} />
      </mesh>

      <Html position={[scene.focalPoint[0], scene.focalPoint[1] + 1.85, scene.focalPoint[2]]} center distanceFactor={7.4}>
        <div className="w-56 rounded-lg border border-white/20 bg-slate-900/90 p-3 text-xs text-slate-100 shadow-xl backdrop-blur-sm">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-semibold">{scene.title}</span>
            <span className="text-[10px] uppercase tracking-wider text-blue-200">{iconByKind[scene.kind]}</span>
          </div>
          <p className="mb-2 text-[11px] leading-snug text-slate-300">{scene.description}</p>
          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex justify-between">
              <span>{scene.primaryMetricLabel}</span>
              <span className={microMetricClass(scene.primaryMetric)}>{Math.round(scene.primaryMetric * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span>{scene.secondaryMetricLabel}</span>
              <span className={microMetricClass(scene.secondaryMetric)}>{Math.round(scene.secondaryMetric * 100)}%</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

const pointOnQuadraticBezier = (a: Vec3, b: Vec3, c: Vec3, t: number): Vec3 => {
  const omt = 1 - t;
  return [
    omt * omt * a[0] + 2 * omt * t * b[0] + t * t * c[0],
    omt * omt * a[1] + 2 * omt * t * b[1] + t * t * c[1],
    omt * omt * a[2] + 2 * omt * t * b[2] + t * t * c[2],
  ];
};

const FrontlineArc: React.FC<{
  id: string;
  start: Vec3;
  end: Vec3;
  tension: number;
  theme: CampaignViewTheme;
}> = ({ id, start, end, tension, theme }) => {
  const markerRef = useRef<THREE.Mesh>(null);

  const midpoint: Vec3 = useMemo(
    () => [
      (start[0] + end[0]) / 2,
      Math.max(start[1], end[1]) + 0.65 + tension,
      (start[2] + end[2]) / 2,
    ],
    [end, start, tension],
  );

  useFrame(({ clock }) => {
    const marker = markerRef.current;
    if (!marker) {
      return;
    }

    const travel = (clock.elapsedTime * (0.18 + tension * 0.32) + seededUnit(`${id}:flow`)) % 1;
    const pos = pointOnQuadraticBezier(start, midpoint, end, travel);
    marker.position.set(pos[0], pos[1], pos[2]);
    marker.scale.setScalar(0.45 + tension * 0.55);
  });

  return (
    <group>
      <Line
        points={[vecToArray(start), vecToArray(midpoint), vecToArray(end)]}
        color={tension > 0.6 ? theme.frontHotColor : theme.frontCoolColor}
        lineWidth={1 + tension * 2.5}
        transparent
        opacity={0.48 + tension * 0.4}
      />
      <mesh ref={markerRef} position={vecToArray(start)}>
        <sphereGeometry args={[0.08 + tension * 0.08, 10, 10]} />
        <meshBasicMaterial color={theme.frontHotColor} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

const DynamicUnitMarker: React.FC<{
  unit: CampaignUnitState;
  nodeById: Map<string, CampaignNodeState>;
  index: number;
  replayProgress: number;
  chaosSignal: number;
}> = ({ unit, nodeById, index, replayProgress, chaosSignal }) => {
  const ref = useRef<THREE.Group>(null);
  const routePoints = useMemo(() => {
    const points = unit.route
      .map((nodeId) => nodeById.get(nodeId)?.position)
      .filter((point): point is Vec3 => Boolean(point));
    if (points.length <= 2) {
      return points;
    }
    return [...points, points[0]];
  }, [nodeById, unit.route]);

  useFrame(({ clock }) => {
    const group = ref.current;
    if (!group) {
      return;
    }

    const t = clock.elapsedTime;
    const baseSeed = seededUnit(`${unit.id}:${index}`);

    if (routePoints.length >= 2) {
      const segmentCount = routePoints.length - 1;
      const timeline = (replayProgress + t * 0.035 * unit.speed + baseSeed) % 1;
      const scaled = timeline * segmentCount;
      const segment = Math.floor(scaled);
      const localT = scaled - segment;
      const start = routePoints[segment] ?? routePoints[0];
      const end = routePoints[segment + 1] ?? routePoints[0];
      const x = start[0] + (end[0] - start[0]) * localT;
      const y = start[1] + (end[1] - start[1]) * localT;
      const z = start[2] + (end[2] - start[2]) * localT;
      const wobble = Math.sin(t * (1 + unit.speed * 0.8) + index) * (0.05 + chaosSignal * 0.03);

      group.position.set(x, y + 0.04 + Math.abs(wobble), z);
      group.rotation.set(0, Math.atan2(end[0] - start[0], end[2] - start[2]), 0);
      return;
    }

    const sway = Math.sin(t * (0.7 + unit.speed * 0.8) + index) * 0.08;
    group.position.set(unit.position[0] + sway, unit.position[1] + Math.abs(Math.cos(t + index)) * 0.05, unit.position[2]);
    group.rotation.set(0, unit.routeProgress * Math.PI * 1.8 + t * 0.25, 0);
  });

  return (
    <group ref={ref} position={vecToArray(unit.position)}>
      <mesh castShadow>
        <coneGeometry args={[unit.size, unit.size * 1.8, 8]} />
        <meshStandardMaterial color={unit.color} emissive={unit.color} emissiveIntensity={0.24} />
      </mesh>
      <mesh position={[0, -unit.size * 0.6, 0]}>
        <sphereGeometry args={[unit.size * 0.26, 10, 10]} />
        <meshStandardMaterial color={unit.color} emissive={unit.color} emissiveIntensity={0.14} />
      </mesh>
    </group>
  );
};

const PulseRing: React.FC<{ state: CampaignState }> = ({ state }) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    const material = materialRef.current;
    if (!mesh || !material) {
      return;
    }

    const breath = 1 + Math.sin(clock.elapsedTime * 2.1) * 0.08;
    mesh.scale.setScalar(breath);
    material.opacity = 0.24 + state.pulse.intensity * 0.32 + Math.sin(clock.elapsedTime * 1.9) * 0.08;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <ringGeometry args={[2.2 + state.pulse.intensity * 0.4, 2.5 + state.pulse.intensity * 0.6, 42]} />
      <meshStandardMaterial
        ref={materialRef}
        color={state.pulse.color}
        emissive={state.pulse.color}
        emissiveIntensity={0.35 + state.pulse.intensity * 0.4}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const BranchRail: React.FC<{
  points: [number, number, number][];
  color: string;
  probability: number;
  seed: string;
}> = ({ points, color, probability, seed }) => {
  const markerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const marker = markerRef.current;
    if (!marker) {
      return;
    }

    const progress = (clock.elapsedTime * (0.15 + probability * 0.45) + seededUnit(seed)) % 1;
    const first = points[0];
    const second = points[1];
    const third = points[2];
    const p = pointOnQuadraticBezier(
      [first[0], first[1], first[2]],
      [second[0], second[1], second[2]],
      [third[0], third[1], third[2]],
      progress,
    );
    marker.position.set(p[0], p[1], p[2]);
    marker.scale.setScalar(0.55 + probability * 0.8);
  });

  return (
    <group>
      <Line points={points} color={color} lineWidth={1.2 + probability * 2.6} transparent opacity={0.8} />
      <mesh ref={markerRef} position={points[0]}>
        <sphereGeometry args={[0.07 + probability * 0.07, 10, 10]} />
        <meshBasicMaterial color={color} transparent opacity={0.92} />
      </mesh>
    </group>
  );
};

const BranchRails: React.FC<{ state: CampaignState }> = ({ state }) => {
  const terrainDepth = state.terrain.size[1];
  const startZ = -terrainDepth / 2 + 0.8;
  const spacing = state.branches.length >= 5 ? 2.1 : state.branches.length >= 4 ? 2.6 : 3.2;
  const centeredStart = -((state.branches.length - 1) * spacing) / 2;

  return (
    <group>
      {state.branches.map((branch, index) => {
        const x = centeredStart + index * spacing;
        const yLift = 0.2 + branch.probability * 0.9;
        const points: [number, number, number][] = [
          [x, -0.18, startZ],
          [x, yLift, startZ - 1.4],
          [x, -0.18, startZ - 2.8],
        ];

        return (
          <group key={branch.id}>
            <BranchRail points={points} color={branch.color} probability={branch.probability} seed={branch.id} />
          </group>
        );
      })}
    </group>
  );
};

const CampaignScene: React.FC<{
  state: CampaignState;
  theme: CampaignViewTheme;
  isMobile: boolean;
  TerrainComponent?: React.ComponentType<CampaignTerrainRenderProps>;
  SceneOverlayComponent?: React.ComponentType<CampaignSceneOverlayProps>;
  MicroSceneComponent?: React.ComponentType<CampaignMicroSceneRenderProps>;
}> = ({ state, theme, isMobile, TerrainComponent, SceneOverlayComponent, MicroSceneComponent }) => {
  const nodeById = useMemo(() => new Map(state.nodes.map((node) => [node.id, node])), [state.nodes]);
  const chaosSignal = state.meta.statsSignal.chaos;
  const isCombatScene =
    state.activeMicroScene?.kind === 'siege' ||
    state.activeMicroScene?.kind === 'landing' ||
    state.activeMicroScene?.kind === 'trench' ||
    state.activeMicroScene?.kind === 'uprising';

  return (
    <>
      <color attach="background" args={[state.palette.ambient]} />
      <fog attach="fog" args={[state.palette.fog, 8, 30 - state.terrain.fogDensity * 10]} />

      <ambientLight color={state.palette.ambient} intensity={0.85} />
      <directionalLight
        color={state.palette.keyLight}
        intensity={1.35 + state.meta.statsSignal.strength * 0.45}
        position={[6, 9, 5]}
        castShadow
      />
      <pointLight color={state.pulse.color} intensity={0.45 + state.pulse.intensity * 0.6} position={[0, 4.5, 0]} />

      {(state.terrain.profile === 'space' || theme.particlePreset === 'stars') && (
        <Stars radius={60} depth={30} count={2500} factor={4} fade speed={0.6} />
      )}

      {TerrainComponent ? <TerrainComponent state={state} theme={theme} /> : <TerrainMesh state={state} />}
      <AmbientParticles state={state} theme={theme} countScale={isMobile ? 0.45 : 1 + chaosSignal * 0.25} />
      {SceneOverlayComponent && <SceneOverlayComponent state={state} theme={theme} />}

      {state.fronts.map((front) => {
        const start = nodeById.get(front.from);
        const end = nodeById.get(front.to);

        if (!start || !end) {
          return null;
        }

        return (
          <FrontlineArc
            key={front.id}
            id={front.id}
            start={start.position}
            end={end.position}
            tension={front.tension}
            theme={theme}
          />
        );
      })}

      {state.nodes.map((node, index) => {
        const nodeColor = node.control > 0.65 ? '#22c55e' : node.control > 0.35 ? '#f59e0b' : '#ef4444';
        const shouldShowLabel =
          node.importance > 0.72 ||
          Boolean(state.activeMicroScene?.focusNodeIds.includes(node.id)) ||
          state.nodes.length <= 6;
        const xOffset = ((index % 3) - 1) * 0.25;
        const zOffset = (Math.floor(index / 3) % 2 === 0 ? 1 : -1) * 0.12;

        return (
          <group key={node.id} position={vecToArray(node.position)}>
            <mesh castShadow>
              <sphereGeometry args={[0.24 + node.importance * 0.23, 16, 16]} />
              <meshStandardMaterial color={nodeColor} emissive={nodeColor} emissiveIntensity={0.42} />
            </mesh>

            {shouldShowLabel && (
              <Html position={[xOffset, 0.78, zOffset]} center distanceFactor={8.2}>
                <div className="rounded bg-slate-900/80 px-2 py-1 text-[10px] text-slate-100 shadow-md ring-1 ring-white/10 backdrop-blur-sm">
                  <div className="font-semibold">{node.label}</div>
                  {node.subtitle && <div className="text-[9px] text-slate-300">{node.subtitle}</div>}
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {state.units.map((unit, index) => (
        <DynamicUnitMarker
          key={unit.id}
          unit={unit}
          nodeById={nodeById}
          index={index}
          replayProgress={state.meta.replayProgress}
          chaosSignal={chaosSignal}
        />
      ))}

      <BranchRails state={state} />
      <PulseRing state={state} />

      {state.activeMicroScene && (
        <MicroScene active={state.activeMicroScene.active} target={state.activeMicroScene.focalPoint}>
          {MicroSceneComponent ? (
            <MicroSceneComponent scene={state.activeMicroScene} state={state} />
          ) : (
            <CampaignMicroSceneVisual scene={state.activeMicroScene} />
          )}
        </MicroScene>
      )}

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={7}
        maxDistance={18}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.15}
        target={[0, 0, 0]}
      />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={
            (0.42 + state.pulse.intensity * 0.58) *
            theme.bloomBoost *
            (state.chapterId === 'french-revolution' ? 1.18 + chaosSignal * 0.25 : 1) *
            (isCombatScene ? 1.14 : 1)
          }
          luminanceThreshold={0.2}
          luminanceSmoothing={0.45}
        />
        {state.chapterId === 'ai-revolution' || chaosSignal > 0.7 || state.pulse.intensity > 0.72 ? (
          <>
            <ChromaticAberration
              offset={new THREE.Vector2(0.0014 + chaosSignal * 0.0028 + state.pulse.intensity * 0.0014, 0.001)}
            />
            <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.05 + chaosSignal * 0.1} />
          </>
        ) : (
          <></>
        )}
        {isCombatScene ? (
          <Noise
            premultiply
            blendFunction={BlendFunction.SOFT_LIGHT}
            opacity={0.07 + state.pulse.intensity * 0.08 + state.meta.statsSignal.strength * 0.04}
          />
        ) : (
          <></>
        )}
        <Vignette
          eskil={false}
          offset={0.18}
          darkness={theme.vignetteDarkness + (state.activeMicroScene ? 0.05 : 0) + chaosSignal * 0.08}
        />
      </EffectComposer>
    </>
  );
};

const GenericCampaign3DView: React.FC<GenericCampaign3DViewProps> = ({
  snapshots,
  theme = DEFAULT_THEME,
  terrainComponent,
  sceneOverlayComponent,
  microSceneComponent,
}) => {
  const [isWebGLReady, setIsWebGLReady] = useState(true);
  const [scrubIndex, setScrubIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const liveIndex = Math.max(snapshots.length - 1, 0);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const supported = Boolean(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2'),
    );
    setIsWebGLReady(supported);
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    if (isLive) {
      setScrubIndex(liveIndex);
    }
  }, [isLive, liveIndex]);

  useEffect(() => {
    if (!isPlaying || isLive) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setScrubIndex((current) => {
        const next = Math.min(current + 1, liveIndex);

        if (next >= liveIndex) {
          setIsPlaying(false);
        }

        return next;
      });
    }, 1400);

    return () => window.clearInterval(timer);
  }, [isLive, isPlaying, liveIndex]);

  if (snapshots.length === 0) {
    return null;
  }

  const selectedIndex = isLive ? liveIndex : scrubIndex;
  const snapshot = snapshots[selectedIndex];
  const state = snapshot.state;

  if (!isWebGLReady) {
    return (
      <div className="rounded-xl border border-blue-500/20 bg-slate-900/80 p-4 text-sm text-slate-200">
        <h3 className="mb-2 text-base font-semibold text-blue-200">3D Simulation Unavailable</h3>
        <p className="mb-2 text-slate-300">
          WebGL is not available in this browser context. Historical overlays remain available below.
        </p>
        <ul className="list-disc space-y-1 pl-4 text-xs text-slate-300">
          {state.educationalNotes.slice(0, 3).map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-600/70 bg-slate-950 shadow-2xl">
      <div className="h-[320px] w-full">
        <Canvas camera={{ position: [0, 8, 11], fov: 46 }} dpr={isMobile ? [1, 1.3] : [1, 1.8]} shadows>
          <CampaignScene
            state={state}
            theme={theme}
            isMobile={isMobile}
            TerrainComponent={terrainComponent}
            SceneOverlayComponent={sceneOverlayComponent}
            MicroSceneComponent={microSceneComponent}
          />
        </Canvas>
      </div>

      <div className="border-t border-slate-700/60 bg-slate-900/90 p-4 backdrop-blur-sm">
        <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-slate-400">{state.chapterTitle}</div>
            <div className="text-sm font-semibold text-slate-100">{state.meta.scenarioTitle}</div>
            <div className="mt-1 text-[11px] text-blue-300">{theme.name}</div>
            <div className="mt-1 text-[11px] text-slate-400">Pulse: {state.pulse.label}</div>
            <div className="mt-1 text-[11px] text-slate-500">{theme.atmosphericTag}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsLive(false);
                setIsPlaying((current) => !current);
              }}
              className="inline-flex items-center gap-1 rounded-md border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white"
              type="button"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            <button
              onClick={() => {
                setIsLive(false);
                setIsPlaying(false);
                setScrubIndex(0);
              }}
              className="inline-flex items-center gap-1 rounded-md border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white"
              type="button"
            >
              <SkipBack className="h-3.5 w-3.5" />
              Start
            </button>

            <button
              onClick={() => {
                setIsLive(true);
                setIsPlaying(false);
              }}
              className={`inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                isLive
                  ? 'border-emerald-400/70 bg-emerald-400/10 text-emerald-200'
                  : 'border-slate-600 text-slate-200 hover:border-emerald-400/70 hover:text-emerald-200'
              }`}
              type="button"
            >
              <Radio className="h-3.5 w-3.5" />
              Live
            </button>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={liveIndex}
          value={selectedIndex}
          onChange={(event) => {
            setIsLive(false);
            setIsPlaying(false);
            setScrubIndex(Number(event.target.value));
          }}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700"
        />

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
          <span>
            Snapshot {selectedIndex + 1}/{liveIndex + 1}
          </span>
          <span>History Depth: {state.meta.historyDepth}</span>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
          {state.branches.map((branch) => (
            <div key={branch.id} className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-100">{branch.title}</span>
                <span style={{ color: branch.color }} className="font-mono">
                  {Math.round(branch.probability * 100)}%
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.round(branch.probability * 100)}%`, backgroundColor: branch.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
          {state.educationalNotes.slice(0, 4).map((note) => (
            <div key={note} className="rounded-md border border-slate-700/80 bg-slate-800/40 px-3 py-2 text-xs text-slate-300">
              {note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenericCampaign3DView;
