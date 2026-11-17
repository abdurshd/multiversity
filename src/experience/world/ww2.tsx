/* The Second World War, 1938–1944: Westminster under barrage balloons, the
   Czechoslovak border forts in the autumn of 1938, a US carrier deck off
   Midway, the desert at El Alamein, Southwick House on the stormy night
   before D-Day, and Omaha Beach. Same stylized-procedural approach as the
   other worlds. No Nazi flags or emblems anywhere: German forces are shown
   only by field grey and the plain cross on their vehicles. */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Particles, Trees, mulberry32 } from './parts';
import { WindowGrid, gableGeometry } from './colonial';
import { Flag } from './civilwar';
import { BarbedWire, CityBlocks, Craters, Facade } from './greatwar';
import { buildTank, buildTrenchSoldier, figureMaterial } from './figures';
import type { Helmet } from '../types';

const STONE = '#cbbf9c';
const CONCRETE = '#a7a49a';
const SAND = '#d9c08a';

// ─── Shared props ───────────────────────────────────────────────────────────

/** A static tank prop built from the same merged geometry the battles use. */
function TankProp({ position, rotation = 0, helmet = 'm1', color = '#556b2f', wrecked = false }: { position: [number, number, number]; rotation?: number; helmet?: Helmet; color?: string; wrecked?: boolean }) {
    const geom = useMemo(() => buildTank({ cloth: color, accent: color }, helmet), [helmet, color]);
    const mat = useMemo(() => {
        const m = figureMaterial();
        if (wrecked) m.color = new THREE.Color('#5a5650');
        return m;
    }, [wrecked]);
    return (
        <group position={position} rotation={[wrecked ? 0.06 : 0, rotation, wrecked ? -0.1 : 0]} scale={1.15}>
            <mesh geometry={geom} material={mat} castShadow receiveShadow />
        </group>
    );
}

/** A few soldiers standing about (same figure as the battle infantry). */
function Soldiers({ spots, cloth, accent = '#8a2a2a', helmet = 'm1' }: { spots: [number, number, number][]; cloth: string; accent?: string; helmet?: Helmet }) {
    const geom = useMemo(() => buildTrenchSoldier({ cloth, accent }, helmet), [cloth, accent, helmet]);
    const mat = useMemo(() => figureMaterial(), []);
    const fill = (mesh: THREE.InstancedMesh | null) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        spots.forEach(([x, z, rot], i) => {
            d.position.set(x, 0, z);
            d.rotation.set(0, rot, 0);
            d.scale.setScalar(2.2);
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    };
    return <instancedMesh ref={fill} args={[geom, mat, spots.length]} castShadow />;
}

/** A barrage balloon tethered on its cable, bobbing gently. */
function BarrageBalloon({ position, phase = 0 }: { position: [number, number, number]; phase?: number }) {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.4 + phase) * 1.2;
            ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.15 + phase) * 0.3;
        }
    });
    return (
        <group>
            <group ref={ref} position={position}>
                <mesh castShadow scale={[1, 0.42, 0.42]}>
                    <sphereGeometry args={[6, 18, 12]} />
                    <meshStandardMaterial color="#b8bcbf" roughness={0.55} metalness={0.15} />
                </mesh>
                {/* three tail fins */}
                {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((a) => (
                    <mesh key={a} position={[-5.4, Math.cos(a) * 1.6, Math.sin(a) * 1.6]} rotation={[a, 0, 0]}>
                        <boxGeometry args={[3, 2.4, 0.15]} />
                        <meshStandardMaterial color="#a9adb0" roughness={0.6} />
                    </mesh>
                ))}
            </group>
            <mesh position={[position[0], position[1] / 2, position[2]]}>
                <cylinderGeometry args={[0.04, 0.04, position[1], 4]} />
                <meshStandardMaterial color="#3a3a3a" />
            </mesh>
        </group>
    );
}

/** A monoplane fighter or bomber circling overhead, propeller spinning. */
function Warplane({ radius, height, speed, phase, color, wing = 11, center = [0, 0] }: { radius: number; height: number; speed: number; phase: number; color: string; wing?: number; center?: [number, number] }) {
    const plane = useRef<THREE.Group>(null);
    const prop = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        const a = clock.elapsedTime * speed + phase;
        if (plane.current) {
            plane.current.position.set(center[0] + Math.cos(a) * radius, height + Math.sin(a * 2) * 2, center[1] + Math.sin(a) * radius);
            plane.current.rotation.set(0, -a + (speed > 0 ? Math.PI : 0), speed > 0 ? -0.4 : 0.4);
        }
        if (prop.current) prop.current.rotation.z += 1.1;
    });
    return (
        <group ref={plane}>
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.22, 7, 10]} />
                <meshStandardMaterial color={color} roughness={0.55} metalness={0.25} />
            </mesh>
            {/* elliptical wing, tailplane and fin */}
            <mesh castShadow position={[0, -0.2, 0.8]} scale={[1, 0.08, 0.28]}>
                <sphereGeometry args={[wing / 2, 16, 6]} />
                <meshStandardMaterial color={color} roughness={0.55} metalness={0.25} />
            </mesh>
            <mesh position={[0, 0.1, -3.1]} scale={[1, 0.08, 0.3]}>
                <sphereGeometry args={[1.8, 12, 5]} />
                <meshStandardMaterial color={color} roughness={0.55} />
            </mesh>
            <mesh position={[0, 0.8, -3.1]}>
                <boxGeometry args={[0.1, 1.3, 1]} />
                <meshStandardMaterial color={color} roughness={0.55} />
            </mesh>
            <mesh position={[0, 0.55, 0.9]} scale={[0.6, 0.5, 1.2]}>
                <sphereGeometry args={[0.6, 10, 8]} />
                <meshStandardMaterial color="#9fb6c4" roughness={0.1} metalness={0.4} />
            </mesh>
            <mesh ref={prop} position={[0, 0, 3.6]}>
                <boxGeometry args={[3, 0.2, 0.06]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
        </group>
    );
}

/** Open water: a large glossy plane with slow swells. */
function Sea({ y = 0.9, size = 2200, color = '#2e5568', z = 0 }: { y?: number; size?: number; color?: string; z?: number }) {
    const geom = useMemo(() => {
        const g = new THREE.PlaneGeometry(size, size, 80, 80);
        g.rotateX(-Math.PI / 2);
        return g;
    }, [size]);
    const base = useMemo(() => Float32Array.from(geom.attributes.position.array as Float32Array), [geom]);
    useFrame(({ clock }) => {
        const pos = geom.attributes.position as THREE.BufferAttribute;
        const t = clock.elapsedTime;
        for (let i = 0; i < pos.count; i++) {
            const x = base[i * 3];
            const zz = base[i * 3 + 2];
            pos.setY(i, Math.sin(x * 0.05 + t * 0.9) * 0.25 + Math.cos(zz * 0.07 + t * 0.7) * 0.2);
        }
        pos.needsUpdate = true;
        geom.computeVertexNormals();
    });
    return (
        <mesh geometry={geom} position={[0, y, z]} receiveShadow>
            <meshStandardMaterial color={color} roughness={0.15} metalness={0.35} />
        </mesh>
    );
}

/** A grey warship silhouette: hull, superstructure, funnel and gun turrets. */
function Warship({ position, rotation = 0, length = 60, color = '#7d858c' }: { position: [number, number, number]; rotation?: number; length?: number; color?: string }) {
    const hull = useMemo(() => {
        const L = length / 2;
        const sh = new THREE.Shape([
            new THREE.Vector2(-L, 0), new THREE.Vector2(L * 0.8, 0), new THREE.Vector2(L, 0.4),
            new THREE.Vector2(L * 0.85, -0.1), new THREE.Vector2(-L, -0.1),
        ]);
        const g = new THREE.ExtrudeGeometry(sh, { depth: 1, bevelEnabled: false });
        g.translate(0, 0, -0.5);
        return g;
    }, [length]);
    const w = length * 0.11;
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh castShadow position={[0, 1.6, 0]} scale={[1, 4, w]} geometry={hull}>
                <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            <mesh castShadow position={[0, 4.6, 0]}>
                <boxGeometry args={[length * 0.55, 1, w * 0.85]} />
                <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            <mesh castShadow position={[-length * 0.04, 7, 0]}>
                <boxGeometry args={[length * 0.16, 4, w * 0.6]} />
                <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            <mesh castShadow position={[-length * 0.04, 12, 0]}>
                <cylinderGeometry args={[0.15, 0.2, 7, 5]} />
                <meshStandardMaterial color="#4a4f54" />
            </mesh>
            <mesh castShadow position={[-length * 0.16, 7.5, 0]}>
                <cylinderGeometry args={[w * 0.18, w * 0.22, 4, 10]} />
                <meshStandardMaterial color="#5d646a" roughness={0.6} />
            </mesh>
            {[length * 0.28, length * 0.18, -length * 0.3].map((x, i) => (
                <group key={i} position={[x, 5.6, 0]} rotation={[0, x < 0 ? Math.PI : 0, 0]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[w * 0.28, w * 0.32, 1.2, 10]} />
                        <meshStandardMaterial color={color} roughness={0.6} />
                    </mesh>
                    <mesh position={[w * 0.5, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.15, 0.18, w * 0.8, 6]} />
                        <meshStandardMaterial color="#4a4f54" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

/** A concrete pillbox or casemate with a dark firing slit facing +z (rotate as needed). */
function Bunker({ position, rotation = 0, size = 1 }: { position: [number, number, number]; rotation?: number; size?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]} scale={size}>
            <mesh castShadow receiveShadow position={[0, 1.6, 0]}>
                <boxGeometry args={[6, 3.2, 5]} />
                <meshStandardMaterial color={CONCRETE} roughness={0.95} />
            </mesh>
            <mesh castShadow position={[0, 3.45, 0]}>
                <boxGeometry args={[6.8, 0.5, 5.8]} />
                <meshStandardMaterial color="#9a978d" roughness={0.95} />
            </mesh>
            <mesh position={[0, 2.1, 2.52]}>
                <boxGeometry args={[3.4, 0.5, 0.1]} />
                <meshStandardMaterial color="#141414" />
            </mesh>
            {/* earth heaped against the sides */}
            <mesh position={[0, 0.6, -2]} scale={[1.4, 0.4, 1]}>
                <sphereGeometry args={[3.6, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#6e6a4e" roughness={1} />
            </mesh>
        </group>
    );
}

/** Czech hedgehogs: three steel beams welded into an anti-tank obstacle (instanced). */
function Hedgehogs({ spots }: { spots: [number, number][] }) {
    const fill = (mesh: THREE.InstancedMesh | null, axis: number) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        spots.forEach(([x, z], i) => {
            d.position.set(x, 0.9, z);
            d.rotation.set(axis === 0 ? 0.62 : axis === 1 ? -0.62 : 0, (i * 0.7) % Math.PI + axis * 1.05, axis === 2 ? Math.PI / 2 - 0.3 : 0.62);
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    };
    return (
        <group>
            {[0, 1, 2].map((axis) => (
                <instancedMesh key={axis} ref={(m) => fill(m, axis)} args={[undefined, undefined, spots.length]} castShadow>
                    <boxGeometry args={[0.22, 2.6, 0.22]} />
                    <meshStandardMaterial color="#4a3f36" roughness={0.7} metalness={0.4} />
                </instancedMesh>
            ))}
        </group>
    );
}

/** A low wall of sandbags (instanced capsules). */
function Sandbags({ from, to, rows = 3 }: { from: [number, number]; to: [number, number]; rows?: number }) {
    const bags = useMemo(() => {
        const out: [number, number, number, number][] = [];
        const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
        const ang = Math.atan2(to[1] - from[1], to[0] - from[0]);
        for (let d = 0; d < len; d += 1.3) {
            for (let r = 0; r < rows; r++) {
                const dd = d + (r % 2) * 0.65;
                out.push([from[0] + Math.cos(ang) * dd, 0.3 + r * 0.5, from[1] + Math.sin(ang) * dd, -ang]);
            }
        }
        return out;
    }, [from, to, rows]);
    const fill = (mesh: THREE.InstancedMesh | null) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        bags.forEach(([x, y, z, a], i) => {
            d.position.set(x, y, z);
            d.rotation.set(0, a, Math.PI / 2);
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    };
    return (
        <instancedMesh ref={fill} args={[undefined, undefined, bags.length]} castShadow receiveShadow>
            <capsuleGeometry args={[0.26, 0.8, 3, 8]} />
            <meshStandardMaterial color="#a8956c" roughness={1} />
        </instancedMesh>
    );
}

// ─── London, 1938–1940: Westminster ──────────────────────────────────────────

/** Elizabeth Tower ("Big Ben"): square shaft, clock stage with four faces, belfry and spire. */
function ClockTower({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh castShadow position={[0, 22, 0]}>
                <boxGeometry args={[8, 44, 8]} />
                <meshStandardMaterial color={STONE} roughness={0.85} />
            </mesh>
            {/* vertical Gothic panelling */}
            {[-1, 1].map((sx) => [-1, 1].map((sz) => (
                <mesh key={`${sx}${sz}`} castShadow position={[sx * 3.9, 24, sz * 3.9]}>
                    <boxGeometry args={[0.7, 48, 0.7]} />
                    <meshStandardMaterial color="#bfb28e" roughness={0.85} />
                </mesh>
            )))}
            <mesh castShadow position={[0, 49, 0]}>
                <boxGeometry args={[9.4, 10, 9.4]} />
                <meshStandardMaterial color="#c8bb94" roughness={0.8} />
            </mesh>
            {/* four clock dials */}
            {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((a) => (
                <group key={a} rotation={[0, a, 0]}>
                    <mesh position={[0, 49, 4.75]}>
                        <circleGeometry args={[3.4, 32]} />
                        <meshStandardMaterial color="#f4ecd2" emissive="#f6e7b0" emissiveIntensity={0.25} roughness={0.4} />
                    </mesh>
                    <mesh position={[0, 49, 4.73]}>
                        <ringGeometry args={[3.4, 3.9, 32]} />
                        <meshStandardMaterial color="#c9a24a" metalness={0.7} roughness={0.35} />
                    </mesh>
                    {/* hands at about 11 o'clock */}
                    <mesh position={[-0.55, 50.1, 4.8]} rotation={[0, 0, 0.5]}>
                        <boxGeometry args={[0.18, 2.4, 0.05]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                    <mesh position={[0, 49.9, 4.8]}>
                        <boxGeometry args={[0.24, 1.8, 0.05]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                </group>
            ))}
            <mesh castShadow position={[0, 57, 0]}>
                <boxGeometry args={[7.6, 6, 7.6]} />
                <meshStandardMaterial color="#bdb08a" roughness={0.85} />
            </mesh>
            <mesh castShadow position={[0, 66, 0]} rotation={[0, Math.PI / 4, 0]}>
                <coneGeometry args={[5.6, 12, 4]} />
                <meshStandardMaterial color="#59625e" roughness={0.6} metalness={0.3} />
            </mesh>
            <mesh castShadow position={[0, 74, 0]}>
                <coneGeometry args={[0.6, 5, 6]} />
                <meshStandardMaterial color="#c9a24a" metalness={0.7} roughness={0.35} />
            </mesh>
        </group>
    );
}

/** The Palace of Westminster: long Gothic river front with pinnacles and Victoria Tower. */
function Parliament({ position }: { position: [number, number, number] }) {
    const pinnacles = useMemo(() => Array.from({ length: 23 }, (_, i) => -66 + i * 6), []);
    return (
        <group position={position}>
            <mesh castShadow receiveShadow position={[0, 9, 0]}>
                <boxGeometry args={[140, 18, 22]} />
                <meshStandardMaterial color={STONE} roughness={0.85} />
            </mesh>
            <mesh castShadow position={[0, 19.5, 0]}>
                <boxGeometry args={[136, 3, 18]} />
                <meshStandardMaterial color="#5d6a66" roughness={0.6} metalness={0.2} />
            </mesh>
            {pinnacles.map((x) => (
                <group key={x}>
                    <mesh castShadow position={[x, 20, 11.2]}>
                        <boxGeometry args={[0.9, 4, 0.9]} />
                        <meshStandardMaterial color="#c2b58f" roughness={0.85} />
                    </mesh>
                    <mesh castShadow position={[x, 23, 11.2]}>
                        <coneGeometry args={[0.6, 2.4, 4]} />
                        <meshStandardMaterial color="#c2b58f" roughness={0.85} />
                    </mesh>
                </group>
            ))}
            <WindowGrid width={130} rows={3} cols={40} y0={3} rowGap={4.6} z={11.05} />
            {/* the central lantern over the Lobby */}
            <mesh castShadow position={[0, 27, 0]}>
                <cylinderGeometry args={[3.4, 3.8, 12, 8]} />
                <meshStandardMaterial color="#c2b58f" roughness={0.85} />
            </mesh>
            <mesh castShadow position={[0, 37, 0]}>
                <coneGeometry args={[3.6, 9, 8]} />
                <meshStandardMaterial color="#59625e" roughness={0.6} />
            </mesh>
            {/* Victoria Tower at the south end */}
            <group position={[-62, 0, -2]}>
                <mesh castShadow position={[0, 30, 0]}>
                    <boxGeometry args={[16, 60, 16]} />
                    <meshStandardMaterial color="#c4b790" roughness={0.85} />
                </mesh>
                {[-1, 1].map((sx) => [-1, 1].map((sz) => (
                    <mesh key={`${sx}${sz}`} castShadow position={[sx * 7.6, 64, sz * 7.6]}>
                        <cylinderGeometry args={[0.9, 1.1, 8, 8]} />
                        <meshStandardMaterial color="#c4b790" roughness={0.85} />
                    </mesh>
                )))}
                <WindowGrid width={12} rows={6} cols={3} y0={14} rowGap={6.5} z={8.05} />
            </group>
        </group>
    );
}

/** A red London double-decker bus. */
function DoubleDecker({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh castShadow position={[0, 2.4, 0]}>
                <boxGeometry args={[2.5, 4, 8]} />
                <meshStandardMaterial color="#b3202a" roughness={0.5} />
            </mesh>
            <mesh position={[0, 2.5, 0]}>
                <boxGeometry args={[2.52, 0.3, 8.02]} />
                <meshStandardMaterial color="#efe6cf" roughness={0.6} />
            </mesh>
            {[1.6, 3.4].map((y) => [-1, 1].map((s) => (
                <mesh key={`${y}${s}`} position={[s * 1.26, y, 0]}>
                    <boxGeometry args={[0.04, 0.9, 7]} />
                    <meshStandardMaterial color="#2a3238" roughness={0.2} metalness={0.4} />
                </mesh>
            )))}
            {[[-1.1, 2.7], [1.1, 2.7], [-1.1, -2.7], [1.1, -2.7]].map(([x, z]) => (
                <mesh key={`${x}${z}`} position={[x, 0.5, z]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.5, 0.5, 0.3, 14]} />
                    <meshStandardMaterial color="#151515" />
                </mesh>
            ))}
        </group>
    );
}

export function London1940() {
    const soldiers = useMemo<[number, number, number][]>(() => [[-30, -8, 0.2], [-27, -9, -0.3], [36, -9, 0], [18, 6, Math.PI]], []);
    return (
        <group>
            {/* the Thames behind the palace, Westminster Bridge at the north end */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, -80]} receiveShadow>
                <planeGeometry args={[700, 70]} />
                <meshStandardMaterial color="#4a5a5e" roughness={0.2} metalness={0.4} />
            </mesh>
            <mesh position={[78, 3, -80]} castShadow receiveShadow>
                <boxGeometry args={[16, 1.2, 70]} />
                <meshStandardMaterial color="#6e7a68" roughness={0.8} />
            </mesh>
            {/* Parliament Square: road and green */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
                <planeGeometry args={[260, 20]} />
                <meshStandardMaterial color="#5c5a56" roughness={0.95} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0.05, 26]} receiveShadow>
                <planeGeometry args={[70, 30]} />
                <meshStandardMaterial color="#6f8a4c" roughness={1} />
            </mesh>
            <Parliament position={[-8, 0, -36]} />
            <ClockTower position={[66, 0, -32]} />
            {/* government offices along Whitehall and the square */}
            <Facade position={[-70, 0, 34]} rotation={Math.PI} width={40} height={18} color="#d8d0bc" roof="#5d6a66" rows={4} cols={10} />
            <Facade position={[80, 0, 30]} rotation={-Math.PI / 2} width={36} height={20} color="#cfc6b0" roof="#5d6a66" rows={4} cols={9} />
            <CityBlocks seed={41} count={60} inner={120} outer={240} palette={['#b9ad94', '#a89c84', '#c9bea6', '#8f857a']} clear={(_x, z) => z < -40} />
            <DoubleDecker position={[-14, 0, 2]} rotation={Math.PI / 2} />
            {/* sandbagged ARP post with its anti-aircraft gun */}
            <Sandbags from={[-36, -14]} to={[-22, -14]} />
            <Sandbags from={[-36, -14]} to={[-36, -4]} />
            <Sandbags from={[30, -16]} to={[44, -16]} />
            <group position={[37, 0, -11]} rotation={[0, 0.4, 0]}>
                <mesh position={[0, 1, 0]}>
                    <cylinderGeometry args={[1.2, 1.5, 2, 8]} />
                    <meshStandardMaterial color="#4a5040" roughness={0.8} />
                </mesh>
                <mesh position={[0, 3, -1.4]} rotation={[0.9, 0, 0]}>
                    <cylinderGeometry args={[0.16, 0.2, 5, 8]} />
                    <meshStandardMaterial color="#3a3d36" />
                </mesh>
            </group>
            <Soldiers spots={soldiers} cloth="#7a6a44" helmet="brodie" />
            <Flag position={[-60, 18, -36]} kind="uk" height={10} />
            <BarrageBalloon position={[-90, 70, -120]} />
            <BarrageBalloon position={[20, 82, -150]} phase={1.5} />
            <BarrageBalloon position={[120, 64, -60]} phase={3} />
            <BarrageBalloon position={[-140, 76, 40]} phase={4.2} />
            <Warplane radius={110} height={70} speed={0.2} phase={0} color="#6b6a48" />
            <Warplane radius={95} height={64} speed={0.2} phase={0.35} color="#6b6a48" />
            <Trees count={30} innerRadius={30} outerRadius={70} seed={44} />
            <Particles count={140} color="#d6d4cc" size={0.5} speed={0.25} />
        </group>
    );
}

// ─── The Czechoslovak border forts, September 1938 ──────────────────────────
export function Sudeten1938() {
    const hogs = useMemo<[number, number][]>(() => {
        const out: [number, number][] = [];
        for (let x = -110; x <= 110; x += 7) out.push([x, 28 + (Math.abs(x) % 3)], [x + 3.5, 33]);
        return out;
    }, []);
    return (
        <group>
            {/* the Czechoslovak line (+z, where the player deploys): forts, wire and hedgehogs */}
            {[-80, -40, 0, 40, 80].map((x, i) => (
                <Bunker key={x} position={[x, 0, 70 + (i % 2) * 6]} rotation={Math.PI} size={1.3} />
            ))}
            <Hedgehogs spots={hogs} />
            <BarbedWire z={22} length={240} />
            <TankProp position={[-60, 0, 88]} rotation={Math.PI} helmet="adrian" color="#5d6440" />
            <TankProp position={[55, 0, 92]} rotation={Math.PI + 0.2} helmet="adrian" color="#5d6440" />
            <Flag position={[0, 0, 80]} kind="czechoslovakia" height={10} />
            <Flag position={[-36, 0, 84]} kind="czechoslovakia" height={8} />
            {/* the wooded border hills in autumn */}
            <Trees count={90} innerRadius={110} outerRadius={220} seed={61} />
            <Trees count={24} innerRadius={70} outerRadius={105} seed={62} />
            {/* a Sudeten village in the valley, on the German side */}
            <group position={[-40, 0, -120]}>
                {[[0, 0], [16, 4], [-14, 8], [6, -14], [-18, -12]].map(([x, z], i) => (
                    <group key={i} position={[x, 0, z]}>
                        <mesh castShadow receiveShadow position={[0, 3, 0]}>
                            <boxGeometry args={[7, 6, 9]} />
                            <meshStandardMaterial color="#e6dcc4" roughness={0.9} />
                        </mesh>
                        <mesh castShadow geometry={gableGeometry(8, 4, 10)} position={[0, 6, 0]}>
                            <meshStandardMaterial color="#8c3a2a" roughness={0.9} />
                        </mesh>
                    </group>
                ))}
                <mesh castShadow position={[4, 10, 18]}>
                    <boxGeometry args={[4, 20, 4]} />
                    <meshStandardMaterial color="#e2d8c0" roughness={0.9} />
                </mesh>
                <mesh castShadow position={[4, 22, 18]}>
                    <sphereGeometry args={[2.4, 10, 8]} />
                    <meshStandardMaterial color="#3d5a4a" roughness={0.6} />
                </mesh>
            </group>
            <Particles count={160} color="#d8c9a6" size={0.5} speed={0.3} />
        </group>
    );
}

// ─── Midway, 4 June 1942: the flight deck of a US carrier ───────────────────
/** SBD Dauntless dive bomber parked with wings out (static). */
function ParkedPlane({ position, rotation = 0, color = '#5d6f7d' }: { position: [number, number, number]; rotation?: number; color?: string }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh castShadow position={[0, 1.4, 0]} rotation={[Math.PI / 2 - 0.12, 0, 0]}>
                <cylinderGeometry args={[0.55, 0.25, 7.5, 10]} />
                <meshStandardMaterial color={color} roughness={0.55} />
            </mesh>
            <mesh castShadow position={[0, 1.1, 0.8]} scale={[1, 0.08, 0.3]}>
                <sphereGeometry args={[6.2, 14, 6]} />
                <meshStandardMaterial color={color} roughness={0.55} />
            </mesh>
            <mesh castShadow position={[0, 2.2, -3.2]}>
                <boxGeometry args={[0.1, 1.3, 1]} />
                <meshStandardMaterial color={color} roughness={0.55} />
            </mesh>
            <mesh position={[0, 1.7, -3.3]} scale={[1, 0.08, 0.3]}>
                <sphereGeometry args={[1.8, 10, 5]} />
                <meshStandardMaterial color={color} roughness={0.55} />
            </mesh>
            <mesh position={[0, 2.05, 0.4]} scale={[0.55, 0.45, 1.8]}>
                <sphereGeometry args={[0.6, 10, 8]} />
                <meshStandardMaterial color="#9fb6c4" roughness={0.1} metalness={0.4} />
            </mesh>
            {/* white star roundel on the wings */}
            {[-1, 1].map((s) => (
                <mesh key={s} position={[s * 4, 1.62, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.7, 14]} />
                    <meshStandardMaterial color="#1f3264" />
                </mesh>
            ))}
            {[-1, 1].map((s) => (
                <mesh key={s} position={[s * 1.2, 0.45, 1.2]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.2, 10]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
            ))}
            <mesh position={[0, 1.6, 4]}>
                <boxGeometry args={[3, 0.2, 0.06]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
        </group>
    );
}

/** Columns of black smoke rising from a burning ship on the horizon. */
function SmokeColumn({ position, height = 50 }: { position: [number, number, number]; height?: number }) {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (ref.current) ref.current.children.forEach((c, i) => {
            const k = ((clock.elapsedTime * 0.12 + i / 8) % 1);
            c.position.y = k * height;
            c.position.x = Math.sin(k * 3 + i) * 3 + k * 14;
            c.scale.setScalar(3 + k * 9);
        });
    });
    return (
        <group ref={ref} position={position}>
            {Array.from({ length: 8 }, (_, i) => (
                <mesh key={i}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial color="#2a2624" transparent opacity={0.6} roughness={1} depthWrite={false} flatShading />
                </mesh>
            ))}
        </group>
    );
}

export function Midway1942() {
    const deckY = 8;
    return (
        <group>
            <Sea color="#25546d" />
            {/* the carrier: hull, wooden flight deck, island on the starboard side */}
            <group>
                <mesh castShadow receiveShadow position={[0, deckY / 2 - 1, 0]}>
                    <boxGeometry args={[22, deckY, 180]} />
                    <meshStandardMaterial color="#6f7a82" roughness={0.6} />
                </mesh>
                <mesh castShadow position={[0, deckY / 2 - 1, 95]} rotation={[0, Math.PI / 4, 0]}>
                    <boxGeometry args={[15.5, deckY, 15.5]} />
                    <meshStandardMaterial color="#6f7a82" roughness={0.6} />
                </mesh>
                <mesh receiveShadow position={[0, deckY, 0]}>
                    <boxGeometry args={[30, 0.6, 200]} />
                    <meshStandardMaterial color="#8a7356" roughness={0.9} />
                </mesh>
                {/* deck markings */}
                <mesh position={[0, deckY + 0.32, 0]}>
                    <boxGeometry args={[0.6, 0.02, 196]} />
                    <meshStandardMaterial color="#e8e4d6" />
                </mesh>
                {[-60, 0, 60].map((z) => (
                    <mesh key={z} position={[0, deckY + 0.32, z]}>
                        <boxGeometry args={[14, 0.02, 9]} />
                        <meshStandardMaterial color="#5d5244" />
                    </mesh>
                ))}
                {/* island, funnel, mast and radar */}
                <group position={[13, deckY, 14]}>
                    <mesh castShadow position={[0, 6, 0]}>
                        <boxGeometry args={[4.5, 12, 22]} />
                        <meshStandardMaterial color="#6f7a82" roughness={0.6} />
                    </mesh>
                    <mesh castShadow position={[0, 14, -4]}>
                        <boxGeometry args={[4.2, 6, 9]} />
                        <meshStandardMaterial color="#5d646a" roughness={0.6} />
                    </mesh>
                    <mesh castShadow position={[0, 15, 5]}>
                        <boxGeometry args={[5, 3, 8]} />
                        <meshStandardMaterial color="#7d858c" roughness={0.6} />
                    </mesh>
                    <mesh castShadow position={[0, 22, 5]}>
                        <cylinderGeometry args={[0.2, 0.3, 14, 6]} />
                        <meshStandardMaterial color="#4a4f54" />
                    </mesh>
                    <mesh position={[0, 26, 5]}>
                        <boxGeometry args={[4, 2, 0.2]} />
                        <meshStandardMaterial color="#3a3f44" />
                    </mesh>
                    <mesh position={[0, 4, 11.2]}>
                        <boxGeometry args={[3.4, 1, 0.1]} />
                        <meshStandardMaterial color="#141414" />
                    </mesh>
                </group>
                {/* the strike group spotted aft, ready to launch */}
                {[[-8, -40], [0, -42], [8, -40], [-8, -54], [0, -56], [8, -54], [-8, -68], [0, -70], [8, -68]].map(([x, z], i) => (
                    <ParkedPlane key={i} position={[x, deckY + 0.3, z]} />
                ))}
                <ParkedPlane position={[-6, deckY + 0.3, 30]} rotation={0.3} color="#6a7a72" />
                <Flag position={[15, deckY + 26, 10]} kind="us-1917" height={4} size={0.8} />
            </group>
            {/* escorts and the burning Japanese carriers on the horizon */}
            <Warship position={[-70, 0, 40]} rotation={0.05} length={60} />
            <Warship position={[80, 0, -30]} rotation={-0.04} length={70} />
            <Warship position={[-60, 0, -150]} rotation={0.1} length={50} />
            <SmokeColumn position={[160, 0, 330]} height={70} />
            <SmokeColumn position={[230, 0, 380]} height={60} />
            <SmokeColumn position={[100, 0, 420]} height={80} />
            <Warplane radius={120} height={60} speed={0.22} phase={0} color="#5d6f7d" center={[0, 60]} />
            <Warplane radius={120} height={64} speed={0.22} phase={0.25} color="#5d6f7d" center={[0, 60]} />
            <Warplane radius={120} height={58} speed={0.22} phase={0.5} color="#5d6f7d" center={[0, 60]} />
            <Warplane radius={80} height={90} speed={-0.3} phase={2} color="#6a7a72" center={[0, 0]} />
        </group>
    );
}

// ─── El Alamein, October 1942 ───────────────────────────────────────────────
function Dunes({ count, inner, outer, seed = 9 }: { count: number; inner: number; outer: number; seed?: number }) {
    const dunes = useMemo(() => {
        const rand = mulberry32(seed);
        return Array.from({ length: count }, () => {
            const a = rand() * Math.PI * 2;
            const r = inner + rand() * (outer - inner);
            return { x: Math.cos(a) * r, z: Math.sin(a) * r, s: 6 + rand() * 14, h: 0.18 + rand() * 0.2, rot: rand() * 3 };
        });
    }, [count, inner, outer, seed]);
    return (
        <group>
            {dunes.map((d, i) => (
                <mesh key={i} position={[d.x, 0, d.z]} rotation={[0, d.rot, 0]} scale={[d.s * 1.6, d.s * d.h, d.s]} receiveShadow castShadow>
                    <sphereGeometry args={[1, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color={i % 2 ? '#d6b97e' : '#cfae70'} roughness={1} />
                </mesh>
            ))}
        </group>
    );
}

export function ElAlamein() {
    const mines = useMemo(() => {
        const out: [number, number][] = [];
        for (let x = -120; x <= 120; x += 10) out.push([x, -24], [x + 5, -30]);
        return out;
    }, []);
    return (
        <group>
            <Dunes count={50} inner={90} outer={260} />
            <Craters count={60} area={200} seed={21} clear={(_x, z) => Math.abs(z) > 90} />
            {/* minefield marker posts with their little triangular flags in front of the Axis line */}
            {mines.map(([x, z], i) => (
                <group key={i} position={[x, 0, z]}>
                    <mesh position={[0, 0.6, 0]}>
                        <cylinderGeometry args={[0.05, 0.05, 1.2, 4]} />
                        <meshStandardMaterial color="#5a4a36" />
                    </mesh>
                    <mesh position={[0.2, 1.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
                        <coneGeometry args={[0.18, 0.4, 3]} />
                        <meshStandardMaterial color="#d6c6a0" />
                    </mesh>
                </group>
            ))}
            <BarbedWire z={-36} length={240} />
            {/* the British line (+z) with its Shermans and Grants, and the guns */}
            <Sandbags from={[-50, 64]} to={[-20, 64]} />
            <Sandbags from={[20, 66]} to={[50, 66]} />
            <TankProp position={[-70, 0, 80]} rotation={Math.PI} helmet="brodie" color={SAND} />
            <TankProp position={[70, 0, 84]} rotation={Math.PI - 0.15} helmet="brodie" color={SAND} />
            <Flag position={[-10, 0, 74]} kind="uk" height={9} />
            {/* knocked-out vehicles from the summer fighting */}
            <TankProp position={[-30, 0, -8]} rotation={0.8} helmet="stahlhelm" wrecked />
            <TankProp position={[48, 0, 14]} rotation={-2.2} helmet="brodie" color={SAND} wrecked />
            {/* the coast railway and its little halt, with the sea beyond */}
            <group position={[0, 0, -150]}>
                <mesh position={[0, 0.2, 0]}>
                    <boxGeometry args={[600, 0.4, 3]} />
                    <meshStandardMaterial color="#6a5a48" roughness={1} />
                </mesh>
                {[-0.7, 0.7].map((d) => (
                    <mesh key={d} position={[0, 0.5, d]}>
                        <boxGeometry args={[600, 0.15, 0.12]} />
                        <meshStandardMaterial color="#6a6d70" metalness={0.7} roughness={0.4} />
                    </mesh>
                ))}
                <mesh castShadow position={[30, 3, -8]}>
                    <boxGeometry args={[14, 6, 7]} />
                    <meshStandardMaterial color="#efe8d6" roughness={0.9} />
                </mesh>
                <mesh position={[30, 6.2, -8]}>
                    <boxGeometry args={[15, 0.5, 8]} />
                    <meshStandardMaterial color="#b9a888" roughness={0.9} />
                </mesh>
                {Array.from({ length: 14 }, (_, i) => (
                    <mesh key={i} position={[-260 + i * 40, 4, 6]}>
                        <cylinderGeometry args={[0.12, 0.15, 8, 5]} />
                        <meshStandardMaterial color="#5a4a36" />
                    </mesh>
                ))}
            </group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, -420]}>
                <planeGeometry args={[1400, 300]} />
                <meshStandardMaterial color="#3f7a8c" roughness={0.2} metalness={0.3} />
            </mesh>
            <Warplane radius={100} height={55} speed={0.25} phase={1} color="#c2a66e" />
            <Warplane radius={100} height={58} speed={0.25} phase={1.3} color="#c2a66e" />
            <Particles count={220} color="#e2cc96" size={0.6} speed={0.6} />
        </group>
    );
}

// ─── Southwick House, 4–5 June 1944: Eisenhower's headquarters ──────────────
function SouthwickHouse({ position }: { position: [number, number, number] }) {
    const roof = useMemo(() => gableGeometry(44, 4, 18), []);
    return (
        <group position={position}>
            <mesh castShadow receiveShadow position={[0, 7, 0]}>
                <boxGeometry args={[42, 14, 16]} />
                <meshStandardMaterial color="#efece2" roughness={0.85} />
            </mesh>
            <mesh castShadow geometry={roof} position={[0, 14, 0]}>
                <meshStandardMaterial color="#4f5459" roughness={0.8} />
            </mesh>
            {/* curved central bow with its colonnade */}
            <mesh castShadow position={[0, 7, 8]}>
                <cylinderGeometry args={[7, 7, 14, 24, 1, false, -Math.PI / 2, Math.PI]} />
                <meshStandardMaterial color="#efece2" roughness={0.85} />
            </mesh>
            {Array.from({ length: 7 }, (_, i) => {
                const a = -Math.PI / 2 + (i / 6) * Math.PI;
                return (
                    <mesh key={i} castShadow position={[Math.sin(a) * 9, 3.2, 8 + Math.cos(a) * 9]}>
                        <cylinderGeometry args={[0.4, 0.45, 6.4, 10]} />
                        <meshStandardMaterial color="#f6f3ea" roughness={0.7} />
                    </mesh>
                );
            })}
            <mesh castShadow position={[0, 6.6, 8]}>
                <cylinderGeometry args={[9.6, 9.6, 0.6, 24, 1, false, -Math.PI / 2, Math.PI]} />
                <meshStandardMaterial color="#e6e2d6" roughness={0.8} />
            </mesh>
            <WindowGrid width={38} rows={3} cols={11} y0={2.4} rowGap={3.8} z={8.05} />
            {/* the lit windows of the map room where the forecast was argued over */}
            {[-14, -10, 10, 14].map((x) => (
                <mesh key={x} position={[x, 3.4, 8.1]}>
                    <boxGeometry args={[1.6, 2.4, 0.05]} />
                    <meshStandardMaterial color="#ffd89a" emissive="#ffb84a" emissiveIntensity={0.9} />
                </mesh>
            ))}
        </group>
    );
}

/** A US jeep. */
function Jeep({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh castShadow position={[0, 1, 0]}>
                <boxGeometry args={[1.6, 0.7, 3.4]} />
                <meshStandardMaterial color="#4e5634" roughness={0.8} />
            </mesh>
            <mesh castShadow position={[0, 1.1, 1.4]}>
                <boxGeometry args={[1.5, 0.5, 1]} />
                <meshStandardMaterial color="#4e5634" roughness={0.8} />
            </mesh>
            <mesh position={[0, 1.7, 0.75]} rotation={[-0.2, 0, 0]}>
                <boxGeometry args={[1.5, 0.6, 0.05]} />
                <meshStandardMaterial color="#9fb6c4" transparent opacity={0.5} />
            </mesh>
            <mesh position={[0, 1.36, 1.15]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.3, 5]} />
                <meshStandardMaterial color="#e8e4d6" />
            </mesh>
            {[[-0.8, 1.1], [0.8, 1.1], [-0.8, -1.1], [0.8, -1.1]].map(([x, z]) => (
                <mesh key={`${x}${z}`} position={[x, 0.42, z]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.42, 0.42, 0.3, 12]} />
                    <meshStandardMaterial color="#151515" />
                </mesh>
            ))}
        </group>
    );
}

export function Southwick1944() {
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
                <planeGeometry args={[60, 40]} />
                <meshStandardMaterial color="#8e8a7c" roughness={0.9} />
            </mesh>
            <SouthwickHouse position={[0, 0, -34]} />
            <Jeep position={[-14, 0, -6]} rotation={0.4} />
            <Jeep position={[16, 0, -8]} rotation={-0.6} />
            <Soldiers spots={[[-22, -16, 0.2], [22, -18, -0.1], [-6, 10, Math.PI]]} cloth="#6b6a48" helmet="m1" />
            <Flag position={[-26, 0, -18]} kind="us-1917" height={10} />
            <Flag position={[26, 0, -18]} kind="uk" height={10} />
            {/* Portsmouth harbour and the invasion fleet waiting in the Solent */}
            <Sea z={560} size={680} color="#3b4c55" />
            {Array.from({ length: 9 }, (_, i) => (
                <Warship key={i} position={[-200 + i * 50, 0, 260 + (i % 3) * 40]} rotation={Math.PI / 2 + (i % 2) * 0.1} length={40 + (i % 3) * 14} color="#6a7178" />
            ))}
            <BarrageBalloon position={[-60, 50, 200]} />
            <BarrageBalloon position={[70, 56, 230]} phase={2} />
            <Trees count={80} innerRadius={50} outerRadius={150} seed={71} />
            {/* the gale that nearly stopped Overlord */}
            <Particles count={900} area={180} height={50} color="#c7ccd2" size={0.25} speed={2.2} snow />
        </group>
    );
}

// ─── Omaha Beach, 6 June 1944 ───────────────────────────────────────────────
/** An LCVP "Higgins boat" with its ramp down, facing the beach (-z). */
function LandingCraft({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh castShadow position={[0, 0.9, 0]}>
                <boxGeometry args={[3.4, 1.8, 10]} />
                <meshStandardMaterial color="#5d6866" roughness={0.7} />
            </mesh>
            <mesh position={[0, 1.6, 0.4]}>
                <boxGeometry args={[2.8, 0.3, 8.6]} />
                <meshStandardMaterial color="#2c3230" roughness={0.9} />
            </mesh>
            <mesh castShadow position={[0, 0.5, -5.9]} rotation={[-1.1, 0, 0]}>
                <boxGeometry args={[3.2, 2.6, 0.2]} />
                <meshStandardMaterial color="#6a7573" roughness={0.7} />
            </mesh>
            <mesh castShadow position={[0, 2.2, 4.4]}>
                <boxGeometry args={[1.4, 1, 1.2]} />
                <meshStandardMaterial color="#5d6866" roughness={0.7} />
            </mesh>
        </group>
    );
}

export function Normandy1944() {
    const obstacles = useMemo(() => {
        const rand = mulberry32(31);
        return Array.from({ length: 70 }, () => [(rand() - 0.5) * 260, 8 + rand() * 32] as [number, number]);
    }, []);
    // the bluffs: a profile drawn in (distance inland, height) and run along the whole beach
    const bluff = useMemo(() => {
        const sh = new THREE.Shape([
            new THREE.Vector2(58, 0), new THREE.Vector2(74, 3.5), new THREE.Vector2(86, 12), new THREE.Vector2(96, 21),
            new THREE.Vector2(106, 24), new THREE.Vector2(260, 26), new THREE.Vector2(260, 0),
        ]);
        const g = new THREE.ExtrudeGeometry(sh, { depth: 760, bevelEnabled: false });
        g.translate(0, 0, -380);
        g.rotateY(Math.PI / 2);
        return g;
    }, []);
    const stakes = useMemo(() => {
        const rand = mulberry32(32);
        return Array.from({ length: 40 }, () => [(rand() - 0.5) * 260, 40 + rand() * 30, rand()] as [number, number, number]);
    }, []);
    return (
        <group>
            {/* the beach: wet sand at the tide line, dry sand and the shingle bank */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 20]} receiveShadow>
                <planeGeometry args={[700, 140]} />
                <meshStandardMaterial color="#cdb98c" roughness={1} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 75]} receiveShadow>
                <planeGeometry args={[700, 30]} />
                <meshStandardMaterial color="#8f8266" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.4, -36]} scale={[1, 0.25, 1]} receiveShadow castShadow>
                <boxGeometry args={[700, 3, 6]} />
                <meshStandardMaterial color="#8a8578" roughness={1} />
            </mesh>
            {/* the Channel at +z, where the landing craft come in */}
            <Sea z={1185} size={2200} color="#4a5d63" />
            {[[-60, 98], [-20, 104], [24, 96], [70, 108], [-100, 112], [110, 100]].map(([x, z], i) => (
                <LandingCraft key={i} position={[x, 0.4, z]} rotation={(i % 2 ? 1 : -1) * 0.08} />
            ))}
            <Warship position={[-120, 0, 300]} rotation={Math.PI / 2} length={90} />
            <Warship position={[90, 0, 330]} rotation={Math.PI / 2 + 0.1} length={80} />
            <Warship position={[0, 0, 420]} rotation={Math.PI / 2} length={110} color="#6e767c" />
            {/* beach obstacles: hedgehogs and angled stakes */}
            <Hedgehogs spots={obstacles} />
            {stakes.map(([x, z, r], i) => (
                <mesh key={i} position={[x, 1.6, z]} rotation={[-0.6, r, 0]} castShadow>
                    <cylinderGeometry args={[0.15, 0.2, 4, 5]} />
                    <meshStandardMaterial color="#4c3e2e" roughness={1} />
                </mesh>
            ))}
            {/* the bluffs behind the beach, with bunkers and a draw leading inland */}
            <mesh geometry={bluff} receiveShadow castShadow>
                <meshStandardMaterial color="#6f7d4c" roughness={1} flatShading />
            </mesh>
            {[-90, -30, 30, 90].map((x, i) => (
                <Bunker key={x} position={[x, 24, -110 - (i % 2) * 4]} size={1.4} />
            ))}
            <Bunker position={[-140, 5.5, -79]} rotation={0.4} />
            <Bunker position={[140, 5.5, -79]} rotation={-0.4} />
            <Trees count={40} innerRadius={160} outerRadius={260} seed={91} />
            <Craters count={40} area={240} seed={33} clear={(_x, z) => z < -30 || z > 60} />
            <Flag position={[-20, 0, 66]} kind="us-1917" height={8} />
            <Warplane radius={140} height={70} speed={0.22} phase={0} color="#4e5634" />
            <Warplane radius={140} height={74} speed={0.22} phase={0.2} color="#4e5634" />
            <Warplane radius={110} height={90} speed={-0.18} phase={2} color="#6b6a48" wing={14} />
            <SmokeColumn position={[-60, 24, -120]} height={40} />
            <SmokeColumn position={[50, 24, -118]} height={36} />
            <Particles count={260} color="#c9c6bc" size={0.7} speed={0.35} />
        </group>
    );
}
