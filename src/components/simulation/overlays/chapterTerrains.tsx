import React, { useMemo } from 'react';
import * as THREE from 'three';
import { CampaignTerrainRenderProps } from '../GenericCampaign3DView';

const MapShapeMesh: React.FC<{
  points: [number, number][];
  color: string;
  emissive: string;
  positionY?: number;
  opacity?: number;
}> = ({ points, color, emissive, positionY = -0.28, opacity = 1 }) => {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    points.forEach(([x, y], index) => {
      if (index === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    });
    shape.closePath();
    return new THREE.ShapeGeometry(shape, 80);
  }, [points]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, positionY, 0]}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.14}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const RidgeStrip: React.FC<{
  position: [number, number, number];
  rotationY: number;
  length: number;
  width?: number;
  height?: number;
  color?: string;
}> = ({ position, rotationY, length, width = 0.38, height = 0.3, color = '#64748b' }) => (
  <mesh position={position} rotation={[0, rotationY, 0]}>
    <boxGeometry args={[length, height, width]} />
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.09} />
  </mesh>
);

export const CivilWarUSATerrain: React.FC<CampaignTerrainRenderProps> = ({ state }) => {
  const coast: [number, number][] = [
    [-6.8, 2.9],
    [-7.6, 1.2],
    [-7.1, -2.5],
    [-5.2, -4.4],
    [-2.3, -4.2],
    [0.6, -3.1],
    [2.8, -2.2],
    [3.9, -0.6],
    [4.3, 1.5],
    [3.2, 3.5],
    [0.2, 3.8],
    [-2.5, 3.6],
    [-5.3, 3.3],
  ];

  return (
    <group>
      <MapShapeMesh points={coast} color="#334155" emissive="#1d4ed8" />
      <mesh position={[-0.4, -0.24, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15.5, 9.2]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-3.2, -0.23, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.4, 8.1]} />
        <meshStandardMaterial color="#2563eb" transparent opacity={0.14} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[1.5, -0.23, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.8, 6.5]} />
        <meshStandardMaterial color="#6b7280" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.8, -0.2, -0.5]} rotation={[-Math.PI / 2, 0.05, 0]}>
        <ringGeometry args={[0.9, 0.98, 40]} />
        <meshStandardMaterial color="#f59e0b" transparent opacity={0.78} side={THREE.DoubleSide} />
      </mesh>
      <RidgeStrip position={[-2.3, 0.08, 1.8]} rotationY={0.35} length={5.6} width={0.36} height={0.36} color="#475569" />
      <RidgeStrip position={[-1.2, 0.05, 0.3]} rotationY={0.5} length={3.3} width={0.28} height={0.24} color="#475569" />
      <mesh position={[0.4, -0.22, -0.8]} rotation={[-Math.PI / 2, 0.4, 0]}>
        <planeGeometry args={[0.5 + state.pulse.intensity * 0.7, 6.2]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.38} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const USColonialTerrain: React.FC<CampaignTerrainRenderProps> = ({ state }) => {
  const eastCoast: [number, number][] = [
    [-5.5, 3.6],
    [-6.6, 2.4],
    [-6.3, 0.4],
    [-5.6, -1.9],
    [-4.4, -3.8],
    [-2.6, -4.4],
    [-0.5, -4.2],
    [0.9, -3.2],
    [1.4, -1.5],
    [0.8, 0.5],
    [0.2, 2.2],
    [-1.8, 3.4],
    [-3.9, 3.8],
  ];

  return (
    <group>
      <MapShapeMesh points={eastCoast} color="#1e3a8a" emissive="#3b82f6" />
      <mesh position={[-2.9, -0.22, -0.6]} rotation={[-Math.PI / 2, 0.42, 0]}>
        <planeGeometry args={[0.55 + state.pulse.intensity * 0.4, 6.5]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.34} side={THREE.DoubleSide} />
      </mesh>
      <RidgeStrip position={[-1.6, 0.04, 0.95]} rotationY={0.42} length={3.1} width={0.2} height={0.2} color="#64748b" />
      <RidgeStrip position={[-0.5, 0.03, 0.4]} rotationY={0.39} length={2.5} width={0.16} height={0.16} color="#64748b" />
      <mesh position={[-1.9, 0.07, 2.2]} rotation={[0, 0.48, 0]}>
        <boxGeometry args={[3.8, 0.3, 0.42]} />
        <meshStandardMaterial color="#475569" emissive="#475569" emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
};

export const FranceTerrain: React.FC<CampaignTerrainRenderProps> = () => {
  const france: [number, number][] = [
    [-2.8, 2.8],
    [-3.5, 0.6],
    [-2.7, -2.2],
    [-0.8, -3.4],
    [1.5, -3],
    [3, -1.2],
    [2.8, 1.3],
    [1.1, 3.2],
    [-1.2, 3.4],
  ];

  return (
    <group>
      <MapShapeMesh points={france} color="#4c1d1d" emissive="#f97316" />
      <mesh position={[-0.7, -0.21, 0.35]} rotation={[-Math.PI / 2, 0.2, 0]}>
        <planeGeometry args={[0.42, 6.1]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.9, 0.06, 0.5]}>
        <boxGeometry args={[1.2, 0.35, 1.2]} />
        <meshStandardMaterial color="#6b7280" emissive="#ef4444" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[1.2, 0.03, -1.8]}>
        <cylinderGeometry args={[0.45, 0.5, 0.18, 24]} />
        <meshStandardMaterial color="#7f1d1d" emissive="#dc2626" emissiveIntensity={0.08} />
      </mesh>
    </group>
  );
};

export const TimurSteppeTerrain: React.FC<CampaignTerrainRenderProps> = ({ state }) => {
  const region: [number, number][] = [
    [-8.8, 4.6],
    [-10, 2.2],
    [-9.5, -1.6],
    [-7.8, -4.2],
    [-4.4, -5.1],
    [0.1, -5.6],
    [4.6, -4.9],
    [8.2, -3.5],
    [10.1, -0.7],
    [9.6, 3.1],
    [6.2, 4.9],
    [1, 5.3],
    [-4.8, 5.1],
  ];

  return (
    <group>
      <MapShapeMesh points={region} color="#6b4f2f" emissive="#b45309" positionY={-0.3} />
      <mesh position={[-3.2, -0.24, 1.6]} rotation={[-Math.PI / 2, 0.22, 0]}>
        <ringGeometry args={[4.8, 5.5, 96]} />
        <meshStandardMaterial color="#facc15" transparent opacity={0.12 + state.pulse.intensity * 0.1} side={THREE.DoubleSide} />
      </mesh>
      <RidgeStrip position={[-3.8, 0.16, 2.7]} rotationY={0.35} length={6.6} width={0.55} height={0.55} color="#78716c" />
      <RidgeStrip position={[1.1, 0.18, -2.4]} rotationY={0.45} length={7.1} width={0.5} height={0.52} color="#57534e" />
      <mesh position={[2.8, -0.22, -0.8]} rotation={[-Math.PI / 2, 0.16, 0]}>
        <planeGeometry args={[4.4, 2.1]} />
        <meshStandardMaterial color="#ca8a04" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-4.6, -0.22, -1.8]} rotation={[-Math.PI / 2, -0.14, 0]}>
        <planeGeometry args={[3.4, 1.6]} />
        <meshStandardMaterial color="#d97706" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const RussianEmpireTerrain: React.FC<CampaignTerrainRenderProps> = () => {
  const eurasia: [number, number][] = [
    [-10.8, 4.6],
    [-11.6, 1.9],
    [-10.8, -1.8],
    [-8.7, -3.9],
    [-4.8, -4.7],
    [0.6, -4.5],
    [5.6, -3.2],
    [8.9, -1.4],
    [10.6, 1],
    [9.3, 3.8],
    [4.3, 5],
    [-1.8, 5.2],
    [-6.6, 5],
  ];

  return (
    <group>
      <MapShapeMesh points={eurasia} color="#1f2937" emissive="#1d4ed8" opacity={0.95} />
      <mesh position={[-5.3, -0.24, 2.9]} rotation={[-Math.PI / 2, 0.05, 0]}>
        <planeGeometry args={[6.2, 3.1]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[4.4, -0.24, -1.6]} rotation={[-Math.PI / 2, -0.18, 0]}>
        <planeGeometry args={[5.5, 2.3]} />
        <meshStandardMaterial color="#f97316" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <RidgeStrip position={[-1.6, 0.2, -0.8]} rotationY={0.9} length={5.2} width={0.6} height={0.58} color="#475569" />
      <RidgeStrip position={[2.8, 0.22, -1.9]} rotationY={0.7} length={5.8} width={0.56} height={0.54} color="#64748b" />
      <RidgeStrip position={[6.2, 0.16, 0.8]} rotationY={0.35} length={4.8} width={0.4} height={0.36} color="#475569" />
    </group>
  );
};

export const LeninIndustrialTerrain: React.FC<CampaignTerrainRenderProps> = () => {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[20.5, 13.2]} />
        <meshStandardMaterial color="#2f2f38" emissive="#450a0a" emissiveIntensity={0.16} side={THREE.DoubleSide} />
      </mesh>
      {Array.from({ length: 5 }, (_, idx) => {
        const x = -4.5 + idx * 2.1;
        return (
          <group key={`factory-${idx}`} position={[x, 0.08, -1.6 + (idx % 2) * 1.8]}>
            <mesh>
              <boxGeometry args={[1.5, 0.22, 1.1]} />
              <meshStandardMaterial color="#52525b" emissive="#27272a" emissiveIntensity={0.1} />
            </mesh>
            <mesh position={[0.52, 0.7, -0.2]}>
              <cylinderGeometry args={[0.14, 0.18, 1.2, 16]} />
              <meshStandardMaterial color="#3f3f46" emissive="#1f2937" emissiveIntensity={0.12} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[-3.4, -0.22, 2.3]} rotation={[-Math.PI / 2, 0.22, 0]}>
        <planeGeometry args={[0.35, 4.6]} />
        <meshStandardMaterial color="#f87171" transparent opacity={0.34} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const HitlerCentralEuropeTerrain: React.FC<CampaignTerrainRenderProps> = () => {
  const centralEurope: [number, number][] = [
    [-4.8, 3.6],
    [-5.2, 1],
    [-4.2, -1.9],
    [-2.4, -3.3],
    [0.1, -3.4],
    [2.3, -2.4],
    [3.2, -0.3],
    [2.8, 2.2],
    [1.2, 3.5],
    [-1.8, 3.8],
  ];

  return (
    <group>
      <MapShapeMesh points={centralEurope} color="#1f2937" emissive="#7f1d1d" />
      {Array.from({ length: 14 }, (_, idx) => {
        const x = -4.6 + (idx % 7) * 1.3;
        const z = -2.8 + Math.floor(idx / 7) * 2.6;
        return (
          <mesh key={`block-${idx}`} position={[x, -0.14, z]}>
            <boxGeometry args={[1.1, 0.18, 0.9]} />
            <meshStandardMaterial color="#111827" emissive="#1f2937" emissiveIntensity={0.08} />
          </mesh>
        );
      })}
      <mesh position={[-1.1, -0.21, -0.2]} rotation={[-Math.PI / 2, 0.5, 0]}>
        <planeGeometry args={[0.24, 8.8]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const WW1EuropeTrenchTerrain: React.FC<CampaignTerrainRenderProps> = ({ state }) => {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[22.5, 13.8]} />
        <meshStandardMaterial color="#44403c" emissive="#78350f" emissiveIntensity={0.1} side={THREE.DoubleSide} />
      </mesh>
      {Array.from({ length: 5 }, (_, idx) => (
        <mesh key={`trench-${idx}`} position={[-5 + idx * 2.5, -0.18, 0.9 - idx * 0.18]} rotation={[-Math.PI / 2, 0.26, 0]}>
          <planeGeometry args={[0.24 + state.pulse.intensity * 0.08, 10.8]} />
          <meshStandardMaterial color="#1c1917" transparent opacity={0.72} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[-2.6, -0.21, 2.5]} rotation={[-Math.PI / 2, 0.24, 0]}>
        <planeGeometry args={[0.8, 7.6]} />
        <meshStandardMaterial color="#a16207" transparent opacity={0.26} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const WW2DualTheaterTerrain: React.FC<CampaignTerrainRenderProps> = () => {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.8, -0.3, 1.2]}>
        <planeGeometry args={[10.8, 6.6]} />
        <meshStandardMaterial color="#334155" emissive="#1e293b" emissiveIntensity={0.12} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5.1, -0.3, -0.2]}>
        <planeGeometry args={[11.4, 6.4]} />
        <meshStandardMaterial color="#1e3a8a" emissive="#0f172a" emissiveIntensity={0.12} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.4, -0.24, 0.5]} rotation={[-Math.PI / 2, 0.08, 0]}>
        <planeGeometry args={[2, 14.4]} />
        <meshStandardMaterial color="#64748b" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-4.8, 0.05, 1.5]}>
        <sphereGeometry args={[0.52, 24, 24]} />
        <meshStandardMaterial color="#94a3b8" emissive="#cbd5e1" emissiveIntensity={0.16} />
      </mesh>
      <mesh position={[5.4, 0.05, -0.4]}>
        <sphereGeometry args={[0.48, 24, 24]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

export const KoreaPeninsulaTerrain: React.FC<CampaignTerrainRenderProps> = ({ state }) => {
  const peninsula: [number, number][] = [
    [-1.8, 3.8],
    [-2.6, 2.4],
    [-2.3, 0.5],
    [-1.4, -1.4],
    [-0.8, -3.2],
    [0.1, -4],
    [0.9, -2.4],
    [1.3, -0.1],
    [0.8, 2],
    [0, 3.8],
  ];

  return (
    <group>
      <MapShapeMesh points={peninsula} color="#334155" emissive="#38bdf8" />
      <RidgeStrip position={[-0.8, 0.12, 1]} rotationY={0.4} length={4.2} width={0.35} height={0.35} color="#475569" />
      <RidgeStrip position={[-0.2, 0.14, -1.2]} rotationY={0.3} length={4.9} width={0.33} height={0.32} color="#64748b" />
      <mesh position={[-0.3, -0.2, -0.2]} rotation={[-Math.PI / 2, 0.08, 0]}>
        <planeGeometry args={[0.24 + state.pulse.intensity * 0.1, 7.1]} />
        <meshStandardMaterial color="#f59e0b" transparent opacity={0.66} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const ColdWarGlobeTerrain: React.FC<CampaignTerrainRenderProps> = ({ state }) => {
  return (
    <group>
      <mesh position={[0, -0.05, -0.2]}>
        <sphereGeometry args={[3.1, 56, 56]} />
        <meshStandardMaterial color="#0f172a" emissive="#1e3a8a" emissiveIntensity={0.18} roughness={0.85} />
      </mesh>
      <mesh position={[-0.8, -0.04, -0.15]}>
        <sphereGeometry args={[3.02, 48, 48]} />
        <meshStandardMaterial color="#1d4ed8" transparent opacity={0.18} emissive="#1d4ed8" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0.85, -0.04, -0.15]}>
        <sphereGeometry args={[3.02, 48, 48]} />
        <meshStandardMaterial color="#dc2626" transparent opacity={0.16} emissive="#dc2626" emissiveIntensity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.03, -0.2]}>
        <ringGeometry args={[3.45, 3.5, 96]} />
        <meshStandardMaterial color="#22d3ee" transparent opacity={0.32 + state.pulse.intensity * 0.14} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const USSRCollapseTerrain: React.FC<CampaignTerrainRenderProps> = ({ state }) => {
  const union: [number, number][] = [
    [-8.8, 4.3],
    [-9.5, 1.8],
    [-8.5, -1.3],
    [-6.6, -3.6],
    [-2.3, -4.2],
    [2.8, -3.6],
    [6.4, -2],
    [8.2, 0.6],
    [7.2, 3.4],
    [3.6, 4.6],
    [-1.5, 4.9],
    [-5.8, 4.7],
  ];

  return (
    <group>
      <MapShapeMesh points={union} color="#3f3f46" emissive="#ef4444" opacity={0.88} />
      {Array.from({ length: 6 }, (_, idx) => (
        <mesh key={`fracture-${idx}`} position={[-5.2 + idx * 2.1, -0.2, -0.9 + (idx % 2) * 1.8]} rotation={[-Math.PI / 2, 0.42, 0]}>
          <planeGeometry args={[0.16 + state.pulse.intensity * 0.07, 5.6]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.16 + idx * 0.02} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[-2.8, 0.02, 0.5]}>
        <cylinderGeometry args={[0.5, 0.7, 0.26, 24]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
};

export const CovidGlobalTerrain: React.FC<CampaignTerrainRenderProps> = () => {
  return (
    <group>
      <mesh position={[0, -0.12, -0.2]}>
        <sphereGeometry args={[2.9, 56, 56]} />
        <meshStandardMaterial color="#e2e8f0" emissive="#0ea5e9" emissiveIntensity={0.1} roughness={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.15, 0]} position={[0, -0.08, -0.2]}>
        <ringGeometry args={[3.2, 3.28, 96]} />
        <meshStandardMaterial color="#ef4444" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const AINetworkTerrain: React.FC<CampaignTerrainRenderProps> = () => {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[21, 13]} />
        <meshStandardMaterial color="#0b1120" emissive="#06b6d4" emissiveIntensity={0.2} side={THREE.DoubleSide} />
      </mesh>
      {Array.from({ length: 9 }, (_, idx) => (
        <mesh key={`chip-${idx}`} position={[-6.8 + idx * 1.7, -0.15, idx % 2 === 0 ? 2.3 : -1.8]}>
          <boxGeometry args={[1, 0.16, 1]} />
          <meshStandardMaterial color="#082f49" emissive="#0e7490" emissiveIntensity={0.2} />
        </mesh>
      ))}
      <mesh position={[0, -0.21, 0]} rotation={[-Math.PI / 2, 0.2, 0]}>
        <planeGeometry args={[0.16, 11.8]} />
        <meshStandardMaterial color="#22d3ee" transparent opacity={0.36} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.21, 0]} rotation={[-Math.PI / 2, -0.25, 0]}>
        <planeGeometry args={[0.16, 11.4]} />
        <meshStandardMaterial color="#a855f7" transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const FutureEarthSystemTerrain: React.FC<CampaignTerrainRenderProps> = ({ state }) => {
  const ringOpacity = 0.3 + state.pulse.intensity * 0.24;
  return (
    <group>
      <mesh position={[0, -0.32, 0]}>
        <sphereGeometry args={[0.56, 30, 30]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.42} />
      </mesh>
      <mesh position={[-1.8, -0.18, 0.2]}>
        <sphereGeometry args={[0.32, 26, 26]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.26} />
      </mesh>
      <mesh position={[2.7, -0.14, -0.4]}>
        <sphereGeometry args={[0.36, 26, 26]} />
        <meshStandardMaterial color="#b45309" emissive="#b45309" emissiveIntensity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.32, 0]}>
        <ringGeometry args={[1.9, 1.95, 96]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={ringOpacity} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.42, 0]} position={[0, -0.32, 0]}>
        <ringGeometry args={[3.1, 3.16, 96]} />
        <meshStandardMaterial color="#f59e0b" transparent opacity={ringOpacity * 0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, -0.3, 0]} position={[0, -0.32, 0]}>
        <ringGeometry args={[4.2, 4.26, 96]} />
        <meshStandardMaterial color="#a855f7" transparent opacity={ringOpacity * 0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
