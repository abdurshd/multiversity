import React, { useMemo, useRef } from 'react';
import { Html, Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CampaignMicroSceneRenderProps } from '../GenericCampaign3DView';

const fit = (value: number) => Math.max(0, Math.min(1, value));

const drawArc = (from: [number, number, number], to: [number, number, number], lift: number) => {
  const midpoint: [number, number, number] = [
    (from[0] + to[0]) / 2,
    Math.max(from[1], to[1]) + lift,
    (from[2] + to[2]) / 2,
  ];
  return [from, midpoint, to] as [number, number, number][];
};

const Metrics: React.FC<{ scene: CampaignMicroSceneRenderProps['scene']; title?: string }> = ({ scene, title }) => (
  <Html position={[scene.focalPoint[0], scene.focalPoint[1] + 1.65, scene.focalPoint[2]]} center distanceFactor={8.4}>
    <div className="rounded-md border border-white/20 bg-slate-900/90 px-3 py-2 text-[11px] text-slate-100">
      {title && <div className="mb-1 text-[10px] uppercase tracking-wider text-blue-200">{title}</div>}
      <div className="font-mono text-[10px]">
        {scene.primaryMetricLabel}: {Math.round(scene.primaryMetric * 100)}%
      </div>
      <div className="font-mono text-[10px] text-slate-300">
        {scene.secondaryMetricLabel}: {Math.round(scene.secondaryMetric * 100)}%
      </div>
    </div>
  </Html>
);

export const YorktownArtilleryMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  const groupRef = useRef<THREE.Group>(null);
  const morale = fit(scene.secondaryMetric);
  const volleys = useMemo(
    () => [
      drawArc([scene.focalPoint[0] - 1.6, scene.focalPoint[1] + 0.28, scene.focalPoint[2] + 0.6], [scene.focalPoint[0] + 1.5, scene.focalPoint[1] + 0.2, scene.focalPoint[2] - 0.3], 1.1),
      drawArc([scene.focalPoint[0] - 1.2, scene.focalPoint[1] + 0.3, scene.focalPoint[2] - 0.4], [scene.focalPoint[0] + 1.1, scene.focalPoint[1] + 0.2, scene.focalPoint[2] + 0.5], 0.9),
    ],
    [scene.focalPoint],
  );

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.03;
  });

  if (scene.id === 'chesapeake-naval' || scene.kind === 'naval') {
    const wind = Math.round(scene.secondaryMetric * 100);
    return (
      <group ref={groupRef}>
        <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.06, scene.focalPoint[2]]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.7, 48]} />
          <meshStandardMaterial color="#0f766e" transparent opacity={0.28} side={THREE.DoubleSide} />
        </mesh>
        {[-0.8, 0.75].map((offset, idx) => (
          <group key={`fleet-${idx}`} position={[scene.focalPoint[0] + offset, scene.focalPoint[1] + 0.2, scene.focalPoint[2] + (idx === 0 ? 0.4 : -0.4)]}>
            <mesh>
              <boxGeometry args={[0.55, 0.12, 0.16]} />
              <meshStandardMaterial color={idx === 0 ? '#38bdf8' : '#ef4444'} emissive={idx === 0 ? '#38bdf8' : '#ef4444'} emissiveIntensity={0.18} />
            </mesh>
            <mesh position={[0, 0.16, 0]}>
              <boxGeometry args={[0.08, 0.22, 0.04]} />
              <meshStandardMaterial color="#e2e8f0" />
            </mesh>
          </group>
        ))}
        <Line
          points={drawArc(
            [scene.focalPoint[0] - 0.75, scene.focalPoint[1] + 0.3, scene.focalPoint[2] + 0.4],
            [scene.focalPoint[0] + 0.75, scene.focalPoint[1] + 0.3, scene.focalPoint[2] - 0.4],
            0.6,
          )}
          color="#f59e0b"
          lineWidth={1.5}
          transparent
          opacity={0.78}
        />
        <Html position={[scene.focalPoint[0], scene.focalPoint[1] + 1.55, scene.focalPoint[2]]} center distanceFactor={8}>
          <div className="rounded border border-cyan-300/40 bg-slate-900/90 px-2 py-1 text-[10px] text-cyan-100">Wind vector: {wind}% favorable</div>
        </Html>
      </group>
    );
  }

  if (scene.id === 'declaration-signing' || scene.kind === 'ceremony') {
    return (
      <group ref={groupRef}>
        <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.28, scene.focalPoint[2]]}>
          <boxGeometry args={[2.1, 0.2, 1.2]} />
          <meshStandardMaterial color="#7c2d12" emissive="#7c2d12" emissiveIntensity={0.12} />
        </mesh>
        {Array.from({ length: 7 }, (_, idx) => (
          <mesh key={`delegate-${idx}`} position={[scene.focalPoint[0] - 0.75 + idx * 0.25, scene.focalPoint[1] + 0.55, scene.focalPoint[2] + (idx % 2 === 0 ? 0.2 : -0.2)]}>
            <boxGeometry args={[0.08, 0.2, 0.08]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        ))}
        <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.37, scene.focalPoint[2] - 0.2]}>
          <boxGeometry args={[0.8, 0.04, 0.45]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.2} />
        </mesh>
        <Metrics scene={scene} title="Continental Congress" />
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.25, scene.focalPoint[2]]}>
        <boxGeometry args={[3.6, 0.2, 1.8]} />
        <meshStandardMaterial color="#7c2d12" emissive="#7c2d12" emissiveIntensity={0.2} />
      </mesh>

      <mesh position={[scene.focalPoint[0] - 1.35, scene.focalPoint[1] + 0.4, scene.focalPoint[2]]}>
        <boxGeometry args={[0.9, 0.45, 0.9]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      <mesh position={[scene.focalPoint[0] + 1.35, scene.focalPoint[1] + 0.4, scene.focalPoint[2]]}>
        <boxGeometry args={[0.9, 0.45, 0.9]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>

      {volleys.map((path, idx) => (
        <Line key={`yorktown-volley-${idx}`} points={path} color="#f59e0b" lineWidth={1.4} transparent opacity={0.82} />
      ))}

      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.15, scene.focalPoint[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.95, 28]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      <Html position={[scene.focalPoint[0], scene.focalPoint[1] + 1.7, scene.focalPoint[2]]} center distanceFactor={8.4}>
        <div className="rounded-md border border-white/20 bg-slate-900/90 px-3 py-2 text-[11px] text-slate-100">
          Morale: {Math.round(morale * 100)}% | Cohesion: {Math.round(scene.primaryMetric * 100)}%
        </div>
      </Html>
    </group>
  );
};

export const AnkaraSiegeMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  const elephantRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elephant = elephantRef.current;
    if (!elephant) return;
    elephant.position.x = scene.focalPoint[0] - 1 + Math.sin(clock.elapsedTime * 1.2) * 0.5;
  });

  return (
    <group>
      <mesh position={[scene.focalPoint[0] + 1.2, scene.focalPoint[1] + 0.45, scene.focalPoint[2]]}>
        <boxGeometry args={[1.2, 0.9, 1.8]} />
        <meshStandardMaterial color="#78716c" />
      </mesh>
      <mesh ref={elephantRef} position={[scene.focalPoint[0] - 1, scene.focalPoint[1] + 0.3, scene.focalPoint[2]]}>
        <boxGeometry args={[0.8, 0.5, 0.45]} />
        <meshStandardMaterial color="#b45309" emissive="#92400e" emissiveIntensity={0.2} />
      </mesh>
      <Line
        points={drawArc(
          [scene.focalPoint[0] - 1.2, scene.focalPoint[1] + 0.5, scene.focalPoint[2] + 0.2],
          [scene.focalPoint[0] + 1, scene.focalPoint[1] + 0.5, scene.focalPoint[2] - 0.3],
          1.1,
        )}
        color="#fbbf24"
        lineWidth={1.4}
      />
      <Metrics scene={scene} title="Ankara Siege" />
    </group>
  );
};

export const BastilleStormMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  const crowdRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const crowd = crowdRef.current;
    if (!crowd) return;
    crowd.position.x = scene.focalPoint[0] - 1.2 + Math.sin(clock.elapsedTime * 1.8) * 0.2;
  });

  if (scene.id === 'terror-square' || scene.kind === 'political') {
    return (
      <group>
        <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.3, scene.focalPoint[2]]}>
          <boxGeometry args={[2.4, 0.14, 1.8]} />
          <meshStandardMaterial color="#7f1d1d" emissive="#dc2626" emissiveIntensity={0.16} />
        </mesh>
        <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.72, scene.focalPoint[2] + 0.1]}>
          <boxGeometry args={[0.25, 0.72, 0.25]} />
          <meshStandardMaterial color="#d1d5db" />
        </mesh>
        <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 1.04, scene.focalPoint[2] + 0.18]}>
          <boxGeometry args={[0.75, 0.06, 0.1]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
        {Array.from({ length: 14 }, (_, idx) => (
          <mesh key={`spectator-${idx}`} position={[scene.focalPoint[0] - 1.1 + (idx % 7) * 0.35, scene.focalPoint[1] + 0.46, scene.focalPoint[2] - 0.55 + Math.floor(idx / 7) * 0.95]}>
            <boxGeometry args={[0.08, 0.18, 0.08]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        ))}
        <Metrics scene={scene} title="Terror Square" />
      </group>
    );
  }

  return (
    <group>
      <mesh position={[scene.focalPoint[0] + 1, scene.focalPoint[1] + 0.52, scene.focalPoint[2]]}>
        <boxGeometry args={[1.6, 1.05, 1.4]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      <group ref={crowdRef}>
        {Array.from({ length: 8 }, (_, idx) => (
          <mesh key={`crowd-${idx}`} position={[scene.focalPoint[0] - 1.4 + idx * 0.14, scene.focalPoint[1] + 0.2, scene.focalPoint[2] + (idx % 2) * 0.2]}>
            <boxGeometry args={[0.08, 0.2, 0.08]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        ))}
      </group>
      <mesh position={[scene.focalPoint[0] + 0.62, scene.focalPoint[1] + 0.35, scene.focalPoint[2] + 0.52]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshBasicMaterial color="#9ca3af" transparent opacity={0.4} />
      </mesh>
      <Metrics scene={scene} title="Bastille" />
    </group>
  );
};

export const GeokTepeMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  const blastRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const blast = blastRef.current;
    if (!blast) return;
    blast.scale.setScalar(0.8 + Math.abs(Math.sin(clock.elapsedTime * 2.1)) * 0.5);
  });

  return (
    <group>
      <mesh position={[scene.focalPoint[0] + 1.25, scene.focalPoint[1] + 0.38, scene.focalPoint[2]]}>
        <boxGeometry args={[1.6, 0.8, 1.2]} />
        <meshStandardMaterial color="#92400e" emissive="#78350f" emissiveIntensity={0.14} />
      </mesh>
      <mesh position={[scene.focalPoint[0] - 1.2, scene.focalPoint[1] + 0.2, scene.focalPoint[2] - 0.4]}>
        <boxGeometry args={[1.3, 0.16, 0.2]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh ref={blastRef} position={[scene.focalPoint[0] + 0.4, scene.focalPoint[1] + 0.64, scene.focalPoint[2] - 0.1]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
      </mesh>
      <Line
        points={drawArc(
          [scene.focalPoint[0] - 1.2, scene.focalPoint[1] + 0.26, scene.focalPoint[2] - 0.4],
          [scene.focalPoint[0] + 1.2, scene.focalPoint[1] + 0.38, scene.focalPoint[2]],
          0.9,
        )}
        color="#f97316"
        lineWidth={1.5}
        transparent
        opacity={0.8}
      />
      <Metrics scene={scene} title="Geok-Tepe" />
    </group>
  );
};

export const GettysburgChargeMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  return (
    <group>
      {Array.from({ length: 6 }, (_, row) => (
        <mesh key={`line-${row}`} position={[scene.focalPoint[0] - 1 + row * 0.4, scene.focalPoint[1] + 0.2, scene.focalPoint[2]]}>
          <boxGeometry args={[0.28, 0.22, 0.85]} />
          <meshStandardMaterial color={row < 3 ? '#9ca3af' : '#2563eb'} />
        </mesh>
      ))}
      <Line
        points={drawArc(
          [scene.focalPoint[0] - 1.4, scene.focalPoint[1] + 0.4, scene.focalPoint[2] - 0.3],
          [scene.focalPoint[0] + 1.4, scene.focalPoint[1] + 0.3, scene.focalPoint[2] + 0.1],
          0.9,
        )}
        color="#f97316"
        lineWidth={1.3}
      />
      <Metrics scene={scene} title="Gettysburg" />
    </group>
  );
};

export const WinterPalaceMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  const column = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const group = column.current;
    if (!group) return;
    group.position.x = scene.focalPoint[0] - 1 + Math.sin(clock.elapsedTime * 1.1) * 0.25;
  });

  return (
    <group>
      <mesh position={[scene.focalPoint[0] + 1.1, scene.focalPoint[1] + 0.44, scene.focalPoint[2]]}>
        <boxGeometry args={[1.9, 0.9, 1.3]} />
        <meshStandardMaterial color="#475569" emissive="#334155" emissiveIntensity={0.12} />
      </mesh>
      <group ref={column}>
        {Array.from({ length: 8 }, (_, idx) => (
          <mesh key={`guard-${idx}`} position={[scene.focalPoint[0] - 1.2 + idx * 0.16, scene.focalPoint[1] + 0.2, scene.focalPoint[2] + (idx % 2 === 0 ? 0.22 : -0.22)]}>
            <boxGeometry args={[0.08, 0.22, 0.08]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
        ))}
      </group>
      <Line
        points={drawArc(
          [scene.focalPoint[0] - 1.4, scene.focalPoint[1] + 0.4, scene.focalPoint[2] - 0.4],
          [scene.focalPoint[0] + 0.8, scene.focalPoint[1] + 0.4, scene.focalPoint[2] + 0.1],
          0.7,
        )}
        color="#f87171"
        lineWidth={1.5}
      />
      <Metrics scene={scene} title="Winter Palace" />
    </group>
  );
};

export const BeerHallPutschMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  const crowd = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const group = crowd.current;
    if (!group) return;
    group.position.z = scene.focalPoint[2] - 0.8 + Math.sin(clock.elapsedTime * 1.8) * 0.25;
  });

  return (
    <group>
      <mesh position={[scene.focalPoint[0] + 1.1, scene.focalPoint[1] + 0.3, scene.focalPoint[2]]}>
        <boxGeometry args={[1.5, 0.18, 0.26]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <group ref={crowd}>
        {Array.from({ length: 10 }, (_, idx) => (
          <mesh key={`march-${idx}`} position={[scene.focalPoint[0] - 1.4 + idx * 0.22, scene.focalPoint[1] + 0.2, scene.focalPoint[2] - 0.8 + (idx % 2) * 0.16]}>
            <boxGeometry args={[0.08, 0.2, 0.08]} />
            <meshStandardMaterial color={idx % 3 === 0 ? '#7f1d1d' : '#f8fafc'} />
          </mesh>
        ))}
      </group>
      <Line
        points={drawArc(
          [scene.focalPoint[0] - 1.2, scene.focalPoint[1] + 0.3, scene.focalPoint[2] - 0.8],
          [scene.focalPoint[0] + 1.1, scene.focalPoint[1] + 0.3, scene.focalPoint[2]],
          0.5,
        )}
        color="#ef4444"
        lineWidth={1.4}
        transparent
        opacity={0.78}
      />
      <Metrics scene={scene} title="Beer Hall Putsch" />
    </group>
  );
};

export const SarajevoAssassinationMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  const convoy = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const car = convoy.current;
    if (!car) return;
    car.position.x = scene.focalPoint[0] - 1.1 + (Math.sin(clock.elapsedTime * 1.2) + 1) * 1.1;
  });

  return (
    <group>
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.16, scene.focalPoint[2]]}>
        <boxGeometry args={[2.8, 0.08, 0.4]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh ref={convoy} position={[scene.focalPoint[0] - 1.1, scene.focalPoint[1] + 0.25, scene.focalPoint[2]]}>
        <boxGeometry args={[0.4, 0.12, 0.2]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      {Array.from({ length: 5 }, (_, idx) => (
        <mesh key={`ambush-${idx}`} position={[scene.focalPoint[0] - 0.9 + idx * 0.5, scene.focalPoint[1] + 0.22, scene.focalPoint[2] + (idx % 2 ? 0.3 : -0.3)]}>
          <boxGeometry args={[0.08, 0.18, 0.08]} />
          <meshStandardMaterial color="#7f1d1d" />
        </mesh>
      ))}
      <Metrics scene={scene} title="Sarajevo" />
    </group>
  );
};

export const DDayLandingMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  const landing = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const group = landing.current;
    if (!group) return;
    group.position.z = scene.focalPoint[2] + 1.4 - ((clock.elapsedTime * 0.5) % 1.4);
  });

  return (
    <group>
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.05, scene.focalPoint[2] + 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 2.8]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.3, scene.focalPoint[2] - 1.05]}>
        <boxGeometry args={[3.1, 0.6, 0.28]} />
        <meshStandardMaterial color="#52525b" />
      </mesh>
      <group ref={landing}>
        <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.2, scene.focalPoint[2] + 1.2]}>
          <boxGeometry args={[0.5, 0.16, 0.22]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>
      {Array.from({ length: 3 }, (_, idx) => (
        <Line
          key={`bunker-fire-${idx}`}
          points={drawArc(
            [scene.focalPoint[0] - 1 + idx, scene.focalPoint[1] + 0.5, scene.focalPoint[2] - 1],
            [scene.focalPoint[0] - 0.4 + idx * 0.3, scene.focalPoint[1] + 0.22, scene.focalPoint[2] + 0.85],
            0.25,
          )}
          color="#f97316"
          lineWidth={1.2}
          transparent
          opacity={0.75}
        />
      ))}
      <Metrics scene={scene} title="Normandy" />
    </group>
  );
};

export const IncheonLandingMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  return (
    <group>
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.06, scene.focalPoint[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.4, 40]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.32} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[scene.focalPoint[0] - 0.8, scene.focalPoint[1] + 0.2, scene.focalPoint[2] + 0.3]}>
        <boxGeometry args={[0.45, 0.14, 0.2]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
      <mesh position={[scene.focalPoint[0] + 0.9, scene.focalPoint[1] + 0.28, scene.focalPoint[2] - 0.2]}>
        <boxGeometry args={[0.8, 0.22, 0.18]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      <Line
        points={drawArc(
          [scene.focalPoint[0] - 0.8, scene.focalPoint[1] + 0.3, scene.focalPoint[2] + 0.3],
          [scene.focalPoint[0] + 0.9, scene.focalPoint[1] + 0.34, scene.focalPoint[2] - 0.2],
          0.8,
        )}
        color="#f59e0b"
        lineWidth={1.3}
      />
      <Metrics scene={scene} title="Incheon" />
    </group>
  );
};

export const CubanMissileMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  return (
    <group>
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.15, scene.focalPoint[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.25, 32]} />
        <meshStandardMaterial color="#0f766e" transparent opacity={0.32} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[scene.focalPoint[0] - 0.75, scene.focalPoint[1] + 0.2, scene.focalPoint[2] + 0.2]}>
        <boxGeometry args={[0.36, 0.12, 0.12]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      <mesh position={[scene.focalPoint[0] + 0.6, scene.focalPoint[1] + 0.2, scene.focalPoint[2] - 0.2]}>
        <boxGeometry args={[0.36, 0.12, 0.12]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <Html position={[scene.focalPoint[0], scene.focalPoint[1] + 1.25, scene.focalPoint[2]]} center distanceFactor={8.3}>
        <div className="rounded bg-slate-900/90 px-2 py-1 text-[10px] text-orange-200 ring-1 ring-orange-400/40">
          DEFCON {Math.max(1, 5 - Math.round(scene.primaryMetric * 4))}
        </div>
      </Html>
    </group>
  );
};

export const AugustCoupMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  return (
    <group>
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.2, scene.focalPoint[2]]}>
        <boxGeometry args={[3, 0.12, 1.8]} />
        <meshStandardMaterial color="#475569" emissive="#1f2937" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[scene.focalPoint[0] + 0.85, scene.focalPoint[1] + 0.45, scene.focalPoint[2] - 0.15]}>
        <boxGeometry args={[0.9, 0.36, 0.45]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      <mesh position={[scene.focalPoint[0] + 0.85, scene.focalPoint[1] + 0.72, scene.focalPoint[2] - 0.12]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.25} />
      </mesh>
      {Array.from({ length: 9 }, (_, idx) => (
        <mesh key={`crowd-${idx}`} position={[scene.focalPoint[0] - 1 + (idx % 3) * 0.35, scene.focalPoint[1] + 0.32, scene.focalPoint[2] - 0.4 + Math.floor(idx / 3) * 0.32]}>
          <boxGeometry args={[0.08, 0.18, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      ))}
      <Metrics scene={scene} title="August Coup" />
    </group>
  );
};

export const ICUCrisisMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  const fill = fit(scene.primaryMetric);
  return (
    <group>
      {Array.from({ length: 6 }, (_, idx) => (
        <mesh key={`bed-${idx}`} position={[scene.focalPoint[0] - 1.2 + idx * 0.48, scene.focalPoint[1] + 0.16, scene.focalPoint[2]]}>
          <boxGeometry args={[0.34, 0.08, 0.65]} />
          <meshStandardMaterial color={idx < fill * 6 ? '#ef4444' : '#f8fafc'} />
        </mesh>
      ))}
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.62, scene.focalPoint[2] + 0.75]}>
        <boxGeometry args={[2.7, 0.5, 0.12]} />
        <meshStandardMaterial color="#1e293b" emissive="#334155" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[scene.focalPoint[0] - 1.3 + fill * 2.6, scene.focalPoint[1] + 0.63, scene.focalPoint[2] + 0.82]}>
        <boxGeometry args={[0.22, 0.44, 0.06]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <Metrics scene={scene} title="ICU Load" />
    </group>
  );
};

export const AGIAlignmentMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  const nodes = useMemo(
    () =>
      Array.from({ length: 7 }, (_, idx) => ({
        x: scene.focalPoint[0] - 1.2 + idx * 0.42,
        y: scene.focalPoint[1] + 0.22 + (idx % 2) * 0.22,
        z: scene.focalPoint[2] + Math.sin(idx) * 0.35,
      })),
    [scene.focalPoint],
  );

  return (
    <group>
      {nodes.map((node, idx) => (
        <mesh key={`agi-node-${idx}`} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {nodes.slice(0, -1).map((node, idx) => (
        <Line
          key={`agi-edge-${idx}`}
          points={[
            [node.x, node.y, node.z],
            [nodes[idx + 1].x, nodes[idx + 1].y, nodes[idx + 1].z],
          ]}
          color="#22d3ee"
          lineWidth={1}
          transparent
          opacity={0.75}
        />
      ))}
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.35, scene.focalPoint[2]]}>
        <sphereGeometry args={[1.05, 24, 24]} />
        <meshStandardMaterial color="#22d3ee" transparent opacity={0.1} wireframe />
      </mesh>
      <Metrics scene={scene} title="Alignment Test" />
    </group>
  );
};

export const DysonConstructionMicroScene: React.FC<CampaignMicroSceneRenderProps> = ({ scene }) => {
  return (
    <group>
      <mesh position={[scene.focalPoint[0], scene.focalPoint[1] + 0.25, scene.focalPoint[2]]}>
        <sphereGeometry args={[0.36, 22, 22]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.34} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[scene.focalPoint[0], scene.focalPoint[1] + 0.25, scene.focalPoint[2]]}>
        <ringGeometry args={[0.95, 1.05, 56]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.52, 0]} position={[scene.focalPoint[0], scene.focalPoint[1] + 0.25, scene.focalPoint[2]]}>
        <ringGeometry args={[1.32, 1.4, 56]} />
        <meshStandardMaterial color="#f97316" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
      {Array.from({ length: 6 }, (_, idx) => (
        <mesh key={`collector-${idx}`} position={[scene.focalPoint[0] + Math.cos((idx / 6) * Math.PI * 2) * 1.25, scene.focalPoint[1] + 0.25, scene.focalPoint[2] + Math.sin((idx / 6) * Math.PI * 2) * 1.25]}>
          <boxGeometry args={[0.2, 0.06, 0.1]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.22} />
        </mesh>
      ))}
      <Metrics scene={scene} title="Dyson Deployment" />
    </group>
  );
};
