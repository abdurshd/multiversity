import { useLayoutEffect, useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useCurrentBeat, useExperience } from "../store";
import type { Vec3 } from "../types";
import { reviewAiStation } from "./state";

type Block = { p: Vec3; s: Vec3 };
const stone = "#c7c6b6",
  dark = "#172c39",
  teal = "#56c8bd",
  wood = "#986e4a";
function Box({
  p,
  s,
  color = stone,
  glow = false,
}: Block & { color?: string; glow?: boolean }) {
  return (
    <mesh position={p} castShadow receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        metalness={color === dark ? 0.35 : 0.05}
        emissive={glow ? color : "#000"}
        emissiveIntensity={glow ? 0.8 : 0}
      />
    </mesh>
  );
}
/** One draw call for repeated static geometry. No random layout, texture fetch, or per-frame allocations. */
function Blocks({
  blocks,
  color,
  glow = false,
}: {
  blocks: Block[];
  color: string;
  glow?: boolean;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    blocks.forEach(({ p, s }, i) => {
      dummy.position.set(...p);
      dummy.scale.set(...s);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
  }, [blocks]);
  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, blocks.length]}
      castShadow
      receiveShadow
    >
      <boxGeometry />
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        metalness={0.2}
        emissive={glow ? color : "#000"}
        emissiveIntensity={glow ? 0.7 : 0}
      />
    </instancedMesh>
  );
}
function Person({
  at,
  coat = "#437578",
  skin = "#ad7856",
}: {
  at: Vec3;
  coat?: string;
  skin?: string;
}) {
  return (
    <group position={at}>
      <Box p={[-0.17, 0.43, 0]} s={[0.23, 0.86, 0.28]} color={dark} />
      <Box p={[0.17, 0.43, 0]} s={[0.23, 0.86, 0.28]} color={dark} />
      <Box p={[0, 1.17, 0]} s={[0.65, 0.68, 0.34]} color={coat} />
      <mesh position={[0, 1.76, 0]}>
        <sphereGeometry args={[0.25, 12, 10]} />
        <meshStandardMaterial color={skin} roughness={0.95} />
      </mesh>
      <Box p={[-0.4, 1.13, 0]} s={[0.16, 0.65, 0.2]} color={coat} />
      <Box p={[0.4, 1.13, 0]} s={[0.16, 0.65, 0.2]} color={coat} />
    </group>
  );
}
function Plant({ at, tall = false }: { at: Vec3; tall?: boolean }) {
  return (
    <group position={at}>
      <Box p={[0, 0.28, 0]} s={[1.2, 0.56, 1.2]} color="#77776b" />
      <mesh position={[0, tall ? 1.75 : 0.9, 0]}>
        <cylinderGeometry args={[0.09, 0.12, tall ? 3 : 1, 8]} />
        <meshStandardMaterial color={wood} />
      </mesh>
      <mesh position={[0, tall ? 3.5 : 1.3, 0]} castShadow>
        <icosahedronGeometry args={[tall ? 1.5 : 0.75, 1]} />
        <meshStandardMaterial color="#496e50" roughness={1} />
      </mesh>
    </group>
  );
}
function Table({ at, monitor = false }: { at: Vec3; monitor?: boolean }) {
  return (
    <group position={at}>
      <Box p={[0, 1.04, 0]} s={[3, 0.16, 1.3]} color={wood} />
      {[-1.2, 1.2].map((x) => (
        <Box key={x} p={[x, 0.5, 0]} s={[0.1, 1, 0.9]} color={dark} />
      ))}
      {monitor && (
        <>
          <Box p={[0, 1.65, -0.3]} s={[1.6, 0.9, 0.1]} color={dark} />
          <Box p={[0, 1.65, -0.23]} s={[1.42, 0.72, 0.03]} color={teal} glow />
          <Box p={[0, 1.15, 0.3]} s={[1.1, 0.04, 0.35]} color={dark} />
        </>
      )}
      {!monitor && (
        <>
          <Box p={[-0.5, 1.15, 0]} s={[0.7, 0.06, 0.85]} color="#e6dfbd" />
          <Box p={[0.5, 1.15, 0]} s={[0.7, 0.06, 0.85]} color="#e6dfbd" />
        </>
      )}
      <Box p={[0, 0.57, 1.2]} s={[0.7, 0.12, 0.65]} color={dark} />
      <Box p={[0, 0.85, 1.5]} s={[0.7, 0.8, 0.1]} color={dark} />
    </group>
  );
}
function Campus() {
  const slats = useMemo<Block[]>(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        p: [-14.5 + i, 3.5, -10],
        s: [0.12, 7, 0.35],
      })),
    [],
  );
  const pavers = useMemo<Block[]>(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        p: [-17 + i * 2, 0.12, 0],
        s: [1.92, 0.12, 24],
      })),
    [],
  );
  return (
    <group>
      <Box p={[0, -0.6, 0]} s={[42, 1, 34]} color="#6e8376" />
      <Blocks blocks={pavers} color="#b9bcae" />
      <Box p={[0, 3.5, -10.5]} s={[32, 7, 0.5]} color="#34535d" />
      <Blocks blocks={slats} color={wood} />
      <Box p={[0, 7.1, -7.5]} s={[33, 0.4, 7]} color={stone} />
      {[-12, -4, 4, 12].map((x) => (
        <Box key={x} p={[x, 3.4, -4]} s={[0.25, 6.8, 0.25]} color={stone} />
      ))}
      {[-8, 8].map((x) => (
        <group key={x} position={[x, 0, -3]}>
          <Box p={[0, 0.1, 0]} s={[6, 0.2, 6]} color="#d4d0bb" />
          <Table at={[0, 0, 0]} monitor={x < 0} />
          <Person at={[-2, 0.2, 0]} coat={x < 0 ? "#547c9a" : "#b37d53"} />
        </group>
      ))}
      <Table at={[0, 0, 6]} />
      <Person at={[-2, 0, 6]} skin="#ddae89" />
      <Person at={[2, 0, 5.5]} coat="#6b6387" />
      <Box p={[0, 0.4, 1]} s={[9, 0.8, 1.8]} color="#798477" />
      <Box p={[0, 0.83, 1]} s={[8.5, 0.08, 1.3]} color="#356b79" />
      {[-16, 16].flatMap((x) =>
        [-7, 2, 10].map((z) => <Plant key={`${x}:${z}`} at={[x, 0, z]} tall />),
      )}
      {[-8, 8].map((x) => (
        <Box key={x} p={[x, 0.65, 9]} s={[4.5, 0.2, 0.9]} color={wood} />
      ))}
      <Box p={[0, 7.4, -7]} s={[18, 0.15, 4]} color="#233e54" />
    </group>
  );
}
function ControlRoom() {
  const panels = useMemo<Block[]>(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        p: [(i % 5) * 4 - 8, Math.floor(i / 5) * 1.4 + 1.8, -8.75],
        s: [3.7, 1.12, 0.08],
      })),
    [],
  );
  const graph = useMemo<Block[]>(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        p: [-9 + i * 0.6, 2.2 + (i % 6) * 0.18, -8.65],
        s: [0.34, 0.3 + (i % 6) * 0.36, 0.05],
      })),
    [],
  );
  return (
    <group>
      <Box p={[0, -0.2, 0]} s={[26, 0.4, 23]} color="#727e81" />
      <Box p={[0, 3.8, -9]} s={[26, 7.6, 0.4]} color={dark} />
      <Box p={[-13, 2, 0]} s={[0.3, 4, 18]} color="#b2b4a8" />
      <Blocks blocks={panels} color="#254d60" />
      <Blocks blocks={graph} color={teal} glow />
      <Box p={[0, 7.3, -9]} s={[24, 0.12, 0.3]} color="#edbc7c" glow />
      {[-6, 0, 6].flatMap((x) =>
        [-3, 3].map((z) => <Table key={`${x}:${z}`} at={[x, 0, z]} monitor />),
      )}
      <Person at={[-3, 0, 0]} coat="#ad7356" />
      <Person at={[4, 0, -3]} />
      <Person at={[8, 0, 4]} coat="#6a759b" />
      <Plant at={[-11, 0, 7]} tall />
      <Plant at={[11, 0, -6]} />
      <Box p={[0, 0.05, 8]} s={[22, 0.08, 0.14]} color={teal} glow />
    </group>
  );
}
function DataCenter({ alert }: { alert: boolean }) {
  const racks = useMemo<Block[]>(
    () =>
      [-8, -4, 4, 8].flatMap((x) =>
        [-5, -1, 3].map((z) => ({
          p: [x, 2.2, z] as Vec3,
          s: [2.2, 4.4, 2.2] as Vec3,
        })),
      ),
    [],
  );
  const blades = useMemo<Block[]>(
    () =>
      racks.flatMap(({ p }) =>
        Array.from({ length: 8 }, (_, i) => ({
          p: [p[0], 0.45 + i * 0.49, p[2] + 1.12],
          s: [1.95, 0.36, 0.08],
        })),
      ),
    [racks],
  );
  const leds = useMemo<Block[]>(
    () =>
      blades.map(({ p }) => ({
        p: [p[0] + 0.7, p[1], p[2] + 0.05],
        s: [0.11, 0.08, 0.04],
      })),
    [blades],
  );
  const seams = useMemo<Block[]>(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        p: [-14 + i * 2, 0.015, 0],
        s: [0.035, 0.03, 22],
      })),
    [],
  );
  return (
    <group>
      <Box p={[0, -0.2, 0]} s={[30, 0.4, 24]} color="#7f8b8e" />
      <Blocks blocks={seams} color="#43555e" />
      <Box p={[0, 3.5, -9]} s={[30, 7, 0.4]} color="#415563" />
      <Blocks blocks={racks} color={dark} />
      <Blocks blocks={blades} color="#3b4a50" />
      <Blocks blocks={leds} color={alert ? "#e9a463" : teal} glow />
      {[-10, 0, 10].map((x) => (
        <Box
          key={x}
          p={[x, 6.5, -2]}
          s={[0.15, 0.12, 18]}
          color="#ddece9"
          glow
        />
      ))}
      <Box
        p={[0, 0.03, 0]}
        s={[1.5, 0.05, 20]}
        color={alert ? "#9c7548" : "#398178"}
      />
      <Table at={[-6, 0, 8]} monitor />
      <Table at={[6, 0, 8]} monitor />
      <Table at={[0, 0, -6]} monitor />
      <Person at={[-8, 0, 8]} />
      <Person at={[8, 0, 8]} coat="#b77e53" />
      {[-12, 12].map((x) => (
        <group key={x}>
          <Box p={[x, 3.8, -8.6]} s={[1.6, 4.5, 0.2]} color="#748b92" />
          <Box p={[x, 4.8, -8.4]} s={[1, 0.16, 0.1]} color={teal} glow />
        </group>
      ))}
    </group>
  );
}
export function AiWorld({ environment }: { environment: string }) {
  const beat = useCurrentBeat();
  const visited = useExperience((s) => s.visitedHotspots);
  const phase = useExperience((s) => s.phase);
  const alert =
    environment === "ai-datacenter" && beat?.id !== "recovery-check";
  return (
    <>
      <color
        attach="background"
        args={[environment === "ai-campus" ? "#a8bbb6" : "#182b38"]}
      />
      <fog
        attach="fog"
        args={[environment === "ai-campus" ? "#a8bbb6" : "#182b38", 55, 130]}
      />
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#cce9ed", "#6a5d47", 1.2]} />
      <directionalLight
        position={[12, 22, 15]}
        intensity={2.3}
        color="#ffe5b6"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-normalBias={0.03}
      />
      {environment === "ai-campus" ? (
        <Campus />
      ) : environment === "ai-control" ? (
        <ControlRoom />
      ) : (
        <DataCenter alert={alert} />
      )}
      {phase === "explore" &&
        beat?.kind === "explore" &&
        beat.hotspots.map((h, i) => {
          const done = visited.includes(`${beat.id}:${h.id}`);
          const locked =
            beat.id === "recovery-check" &&
            beat.hotspots
              .slice(0, i)
              .some((prior) => !visited.includes(`${beat.id}:${prior.id}`));
          return (
            <Html
              key={`${beat.id}:${h.id}`}
              position={h.position}
              center
              zIndexRange={[10, 1]}
            >
              <button
                tabIndex={-1}
                className={`ai-marker ${done ? "is-done" : ""}`}
                disabled={locked}
                onClick={() => reviewAiStation(beat.id, h.id)}
                aria-label={h.label}
              >
                {done ? "✓" : i + 1}
              </button>
            </Html>
          );
        })}
    </>
  );
}
