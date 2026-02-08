import React, { useRef } from 'react';
import { Html, Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CampaignSceneOverlayProps } from '../GenericCampaign3DView';

const nodeMap = (state: CampaignSceneOverlayProps['state']) => new Map(state.nodes.map((node) => [node.id, node]));

const arcPoints = (
  from: [number, number, number],
  to: [number, number, number],
  lift = 1.1,
): [number, number, number][] => {
  const mid: [number, number, number] = [
    (from[0] + to[0]) / 2,
    Math.max(from[1], to[1]) + lift,
    (from[2] + to[2]) / 2,
  ];
  return [from, mid, to];
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const OrbitSweep: React.FC<{ radius: number; color: string; speed: number; y?: number }> = ({
  radius,
  color,
  speed,
  y = 0.02,
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const angle = clock.elapsedTime * speed;
    mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 10, 10]} />
      <meshBasicMaterial color={color} transparent opacity={0.85} />
    </mesh>
  );
};

export const TimurTerrainOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  const map = nodeMap(state);
  const samarkand = map.get('samarkand')?.position ?? [0, 0, 0];
  const tabriz = map.get('tabriz')?.position ?? [-5, 0, 0];
  const beijing = map.get('beijing')?.position ?? [8, 0, 2];
  const ankara = map.get('ankara')?.position ?? [-7.8, 0, 1.8];

  return (
    <group>
      <Line
        points={[
          [samarkand[0], samarkand[1] + 0.12, samarkand[2]],
          [tabriz[0], tabriz[1] + 0.2, tabriz[2]],
        ]}
        color="#f59e0b"
        lineWidth={2.2}
        transparent
        opacity={0.72}
      />
      <Line
        points={[
          [samarkand[0], samarkand[1] + 0.14, samarkand[2]],
          [beijing[0], beijing[1] + 0.24, beijing[2]],
        ]}
        color="#fbbf24"
        lineWidth={2}
        transparent
        opacity={0.65}
      />
      <Line
        points={arcPoints(
          [samarkand[0], samarkand[1] + 0.14, samarkand[2]],
          [ankara[0], ankara[1] + 0.16, ankara[2]],
          1.2,
        )}
        color="#fb923c"
        lineWidth={1.8}
        transparent
        opacity={0.68}
      />
      <mesh position={[-1.6, 0.45, 2.8]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[6.5, 0.5, 0.45]} />
        <meshStandardMaterial color="#6b7280" emissive="#b45309" emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
};

export const USIndependenceOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  const map = nodeMap(state);
  const chesapeake = map.get('chesapeake')?.position ?? [-2.3, 0.1, -0.1];
  const yorktown = map.get('yorktown')?.position ?? [-2.1, 0.1, -1.1];
  const boston = map.get('boston')?.position ?? [-4.8, 0.2, 3.2];

  return (
    <group>
      <Line
        points={arcPoints(
          [chesapeake[0], chesapeake[1] + 0.15, chesapeake[2]],
          [yorktown[0], yorktown[1] + 0.15, yorktown[2]],
          0.75,
        )}
        color="#38bdf8"
        lineWidth={2}
        transparent
        opacity={0.78}
      />
      <Line
        points={[
          [boston[0], boston[1] + 0.16, boston[2]],
          [boston[0] + 0.8, boston[1] + 0.16, boston[2] - 0.6],
          [boston[0] + 1.4, boston[1] + 0.16, boston[2] - 1.3],
        ]}
        color="#60a5fa"
        lineWidth={1.4}
        transparent
        opacity={0.62}
      />
      <mesh position={[chesapeake[0], 0.04, chesapeake[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.05, 38]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const FrenchRevolutionOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  const map = nodeMap(state);
  const paris = map.get('paris')?.position ?? [0.2, 0.2, 1.3];
  const bastille = map.get('bastille')?.position ?? [0.4, 0.2, 1.5];

  return (
    <group>
      <mesh position={[-0.7, -0.2, 0.35]} rotation={[-Math.PI / 2, 0.2, 0]}>
        <planeGeometry args={[0.28, 6.3]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <Line
        points={arcPoints(
          [paris[0], paris[1] + 0.15, paris[2]],
          [bastille[0], bastille[1] + 0.14, bastille[2]],
          0.45,
        )}
        color="#f97316"
        lineWidth={1.8}
        transparent
        opacity={0.75}
      />
      <mesh position={[0.2, 0.02, 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.64, 42]} />
        <meshStandardMaterial color="#dc2626" transparent opacity={0.18 + state.pulse.intensity * 0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const RussianEmpireOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  const map = nodeMap(state);
  const spb = map.get('st-petersburg')?.position ?? [-6, 0.3, 3.6];
  const vladivostok = map.get('vladivostok')?.position ?? [6.4, 0.3, 2.2];
  const kabul = map.get('kabul')?.position ?? [3.8, 0.16, -2.4];

  return (
    <group>
      <Line
        points={[
          [spb[0], spb[1] + 0.14, spb[2]],
          [-1.2, 0.4, 2.6],
          [vladivostok[0], vladivostok[1] + 0.16, vladivostok[2]],
        ]}
        color="#38bdf8"
        lineWidth={2.1}
        transparent
        opacity={0.72}
      />
      <Line
        points={arcPoints([spb[0], spb[1] + 0.2, spb[2] - 1], [kabul[0], kabul[1] + 0.2, kabul[2]], 1.3)}
        color="#fb923c"
        lineWidth={1.7}
        transparent
        opacity={0.65}
      />
      <mesh position={[-6, 2.1, 3.6]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#bfdbfe" emissive="#93c5fd" emissiveIntensity={0.55} />
      </mesh>
    </group>
  );
};

export const LincolnBoundaryOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  const width = state.terrain.size[0];
  return (
    <group>
      <Line
        points={[
          [-width / 2 + 1.5, 0.18, -0.4],
          [width / 2 - 1.5, 0.25, -0.6],
        ]}
        color="#f59e0b"
        lineWidth={3}
        transparent
        opacity={0.8}
      />
      <mesh position={[0, 0.12, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.95, 24]} />
        <meshStandardMaterial color="#fde68a" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const LeninIndustrialOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  const map = nodeMap(state);
  const petrograd = map.get('petrograd')?.position ?? [-3.8, 0.24, 2.1];

  return (
    <group>
      {Array.from({ length: 4 }, (_, idx) => (
        <mesh key={`smokestack-${idx}`} position={[-4.2 + idx * 2.5, 1.1, -1.6 + (idx % 2) * 1.8]}>
          <sphereGeometry args={[0.32 + idx * 0.08, 12, 12]} />
          <meshBasicMaterial color="#9ca3af" transparent opacity={0.14} />
        </mesh>
      ))}
      <Line
        points={arcPoints(
          [petrograd[0], petrograd[1] + 0.2, petrograd[2]],
          [petrograd[0] + 1.8, petrograd[1] + 0.18, petrograd[2] - 0.8],
          0.62,
        )}
        color="#ef4444"
        lineWidth={2}
        transparent
        opacity={0.72}
      />
      <mesh position={[-3.5, 0.03, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.75, 0.9, 30]} />
        <meshStandardMaterial color="#dc2626" transparent opacity={0.46} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const HitlerNoirOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  const danger = clamp(state.pulse.intensity, 0, 1);
  return (
    <group>
      <mesh position={[-0.6, -0.22, -0.4]} rotation={[-Math.PI / 2, 0.46, 0]}>
        <planeGeometry args={[0.24, 8.8]} />
        <meshStandardMaterial color="#cbd5e1" transparent opacity={0.22 + danger * 0.18} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.2, -0.21, 0.8]} rotation={[-Math.PI / 2, -0.35, 0]}>
        <planeGeometry args={[0.22, 7]} />
        <meshStandardMaterial color="#ef4444" transparent opacity={0.16 + danger * 0.2} side={THREE.DoubleSide} />
      </mesh>
      <Html position={[1.8, 1.4, 1.2]} center distanceFactor={10}>
        <div className="rounded border border-red-500/40 bg-slate-950/80 px-2 py-1 text-[10px] text-red-200">
          Street volatility: {Math.round(danger * 100)}%
        </div>
      </Html>
    </group>
  );
};

export const WW1TrenchOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  return (
    <group>
      {Array.from({ length: 3 }, (_, idx) => (
        <Line
          key={`shell-arc-${idx}`}
          points={arcPoints(
            [-5.6 + idx * 1.8, 0.16, 2.6 - idx * 0.2],
            [0.6 + idx * 1.4, 0.16, 1.8 - idx * 0.2],
            1 + idx * 0.2,
          )}
          color="#f97316"
          lineWidth={1.3}
          transparent
          opacity={0.52 + idx * 0.08}
        />
      ))}
      <mesh position={[-1.5, 0.02, 0.8]} rotation={[-Math.PI / 2, 0.24, 0]}>
        <ringGeometry args={[1.8, 2.05, 40]} />
        <meshStandardMaterial color="#facc15" transparent opacity={0.18 + state.pulse.intensity * 0.14} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const WW2Overlay: React.FC<CampaignSceneOverlayProps> = () => {
  return (
    <group>
      <Line
        points={arcPoints([-6.2, 0.24, 2.4], [-2.8, 0.24, 2], 0.7)}
        color="#60a5fa"
        lineWidth={1.7}
        transparent
        opacity={0.72}
      />
      <Line
        points={arcPoints([5.1, 0.12, -0.9], [8.2, 0.2, 0.4], 1.2)}
        color="#f97316"
        lineWidth={1.8}
        transparent
        opacity={0.7}
      />
      <Line
        points={[
          [-4.8, 0.2, 1.2],
          [-4.2, 0.4, 1],
          [-3.6, 0.22, 0.8],
        ]}
        color="#f8fafc"
        lineWidth={1.5}
        transparent
        opacity={0.76}
      />
    </group>
  );
};

export const KoreaDMZOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  return (
    <group>
      <Line
        points={[
          [-1.4, 0.18, -0.15],
          [1.1, 0.2, -0.2],
        ]}
        color="#f59e0b"
        lineWidth={3}
        transparent
        opacity={0.74}
      />
      <mesh position={[-0.2, 0.02, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.28, 36]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.2 + state.pulse.intensity * 0.14} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const ColdWarGlobeOverlay: React.FC<CampaignSceneOverlayProps> = () => {
  return (
    <group>
      <mesh position={[0, 0.48, -0.3]}>
        <sphereGeometry args={[1.15, 28, 28]} />
        <meshStandardMaterial color="#1e3a8a" transparent opacity={0.22} emissive="#1e40af" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0.35, 0.5, -0.3]}>
        <sphereGeometry args={[1.06, 24, 24]} />
        <meshStandardMaterial color="#991b1b" transparent opacity={0.18} emissive="#dc2626" emissiveIntensity={0.1} />
      </mesh>
      <Line
        points={[
          [-6, 0.35, -0.8],
          [-2.4, 2.1, 1.8],
          [0.6, 0.35, 1.8],
        ]}
        color="#f97316"
        lineWidth={1.8}
        transparent
        opacity={0.8}
      />
      <Line
        points={[
          [0.2, 0.4, 1.9],
          [-1.8, 2.2, 0.8],
          [-8.2, 0.35, 0.8],
        ]}
        color="#22d3ee"
        lineWidth={1.8}
        transparent
        opacity={0.75}
      />
    </group>
  );
};

export const USSRCollapseOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  const desaturation = clamp(state.pulse.intensity * 0.5, 0.16, 0.55);
  return (
    <group>
      {Array.from({ length: 7 }, (_, idx) => (
        <mesh key={`secession-${idx}`} position={[-6 + idx * 2, -0.2, -0.5 + (idx % 2) * 2]} rotation={[-Math.PI / 2, 0.5, 0]}>
          <planeGeometry args={[0.15 + idx * 0.02, 4.8]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={desaturation + idx * 0.02} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <Html position={[-1.6, 1.2, 1]} center distanceFactor={11}>
        <div className="rounded border border-slate-500/60 bg-slate-900/80 px-2 py-1 text-[10px] text-slate-200">
          Secession pressure wave active
        </div>
      </Html>
    </group>
  );
};

export const CovidHeatOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  return (
    <group>
      {state.nodes.map((node) => (
        <mesh
          key={`heat-${node.id}`}
          position={[node.position[0], node.position[1] + 0.03, node.position[2]]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.48 + (1 - node.control) * 0.75, 24]} />
          <meshStandardMaterial color="#ef4444" transparent opacity={0.12 + (1 - node.control) * 0.16} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
};

export const AIGridOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  const lines = [] as React.ReactNode[];
  for (let i = -4; i <= 4; i += 1) {
    lines.push(
      <Line
        key={`grid-x-${i}`}
        points={[
          [i * 1.3, 0.03, -5.2],
          [i * 1.3, 0.03, 5.2],
        ]}
        color="#06b6d4"
        lineWidth={0.8}
        transparent
        opacity={0.45}
      />,
    );
    lines.push(
      <Line
        key={`grid-z-${i}`}
        points={[
          [-6.5, 0.03, i * 1.1],
          [6.5, 0.03, i * 1.1],
        ]}
        color="#22d3ee"
        lineWidth={0.8}
        transparent
        opacity={0.45}
      />,
    );
  }

  return (
    <group>
      {lines}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.1, 2.35, 48]} />
        <meshStandardMaterial color="#a855f7" transparent opacity={0.2 + state.pulse.intensity * 0.14} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const FutureEarthOrbitalOverlay: React.FC<CampaignSceneOverlayProps> = ({ state }) => {
  return (
    <group>
      <mesh position={[0, -0.35, 0]}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
        <ringGeometry args={[2.2, 2.28, 96]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.52} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.5, 0]} position={[0, -0.35, 0]}>
        <ringGeometry args={[3.2, 3.26, 96]} />
        <meshStandardMaterial color="#facc15" transparent opacity={0.48} side={THREE.DoubleSide} />
      </mesh>
      <OrbitSweep radius={2.2} color="#22d3ee" speed={0.7} y={-0.28} />
      <OrbitSweep radius={3.2} color="#f97316" speed={0.44} y={-0.33} />
      <OrbitSweep radius={4.1} color="#a855f7" speed={0.31} y={-0.35} />
      <Html position={[0, 1.6, 0]} center distanceFactor={13}>
        <div className="rounded border border-amber-300/40 bg-slate-950/80 px-2 py-1 text-[10px] text-amber-200">
          Orbital expansion: {Math.round(state.pulse.intensity * 100)}%
        </div>
      </Html>
    </group>
  );
};
