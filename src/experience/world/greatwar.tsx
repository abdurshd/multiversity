/* The Great War, 1914–1918: Sarajevo on the morning of 28 June, Berlin in
   the July Crisis, the Marne with its Paris taxis, the shell-torn Western
   Front with tanks and biplanes, and the railway carriage at Compiègne.
   Same stylized-procedural approach as the other worlds. */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Citizens, Minaret, Particles, Trees, mulberry32 } from './parts';
import { WindowGrid, gableGeometry } from './colonial';
import { Flag, type FlagKind } from './civilwar';

// ─── Shared props ───────────────────────────────────────────────────────────

function Wheel({ position, radius = 0.45 }: { position: [number, number, number]; radius?: number }) {
    return (
        <mesh position={position} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[radius, radius, 0.18, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
    );
}

/** The Gräf & Stift double phaeton: open touring car, folded hood, running boards. */
export function TouringCar({ position, rotation = 0, color = '#1e3a2a', scale = 1 }: { position: [number, number, number]; rotation?: number; color?: string; scale?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]} scale={scale}>
            <mesh castShadow position={[0, 1.0, 0]}>
                <boxGeometry args={[1.9, 0.7, 4.6]} />
                <meshStandardMaterial color={color} roughness={0.35} metalness={0.3} />
            </mesh>
            {/* bonnet and radiator */}
            <mesh castShadow position={[0, 1.15, 2.6]}>
                <boxGeometry args={[1.3, 0.6, 1.4]} />
                <meshStandardMaterial color={color} roughness={0.35} metalness={0.3} />
            </mesh>
            <mesh position={[0, 1.15, 3.32]}>
                <boxGeometry args={[1.2, 0.7, 0.08]} />
                <meshStandardMaterial color="#b9a46a" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* seats */}
            {[0.4, -1.2].map((z) => (
                <mesh key={z} position={[0, 1.45, z]}>
                    <boxGeometry args={[1.7, 0.6, 0.5]} />
                    <meshStandardMaterial color="#5a2a1e" roughness={0.8} />
                </mesh>
            ))}
            {/* folded hood at the back */}
            <mesh position={[0, 1.5, -2.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 1.9, 12]} />
                <meshStandardMaterial color="#2a2622" roughness={0.9} />
            </mesh>
            {/* windscreen */}
            <mesh position={[0, 1.75, 1.6]} rotation={[-0.2, 0, 0]}>
                <boxGeometry args={[1.6, 0.6, 0.04]} />
                <meshStandardMaterial color="#c9d6dc" transparent opacity={0.45} roughness={0.1} />
            </mesh>
            {[-1, 1].map((s) => (
                <mesh key={s} position={[s * 1.05, 0.62, 0]}>
                    <boxGeometry args={[0.3, 0.06, 4]} />
                    <meshStandardMaterial color="#222" roughness={0.6} />
                </mesh>
            ))}
            {[[-0.95, 2.2], [0.95, 2.2], [-0.95, -1.6], [0.95, -1.6]].map(([x, z]) => (
                <Wheel key={`${x}${z}`} position={[x, 0.45, z]} />
            ))}
            {/* little pennants on the mudguards */}
            <Flag position={[0.8, 1.3, 3.0]} kind="habsburg" height={1} size={0.18} />
        </group>
    );
}

/** A Renault AG1 "Taxi de la Marne". */
function Taxi({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh castShadow position={[0, 1.0, -0.3]}>
                <boxGeometry args={[1.6, 1.4, 2.6]} />
                <meshStandardMaterial color="#7a1e1e" roughness={0.5} />
            </mesh>
            <mesh castShadow position={[0, 1.85, -0.3]}>
                <boxGeometry args={[1.7, 0.12, 2.8]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
            </mesh>
            <mesh castShadow position={[0, 0.85, 1.5]} rotation={[0.25, 0, 0]}>
                <boxGeometry args={[1.2, 0.7, 1.2]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
            </mesh>
            {[[-0.8, 1.4], [0.8, 1.4], [-0.8, -1.1], [0.8, -1.1]].map(([x, z]) => (
                <Wheel key={`${x}${z}`} position={[x, 0.45, z]} />
            ))}
        </group>
    );
}

/** A circling biplane with a spinning propeller. */
function Biplane({ radius, height, speed, phase, color }: { radius: number; height: number; speed: number; phase: number; color: string }) {
    const plane = useRef<THREE.Group>(null);
    const prop = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        const a = clock.elapsedTime * speed + phase;
        if (plane.current) {
            plane.current.position.set(Math.cos(a) * radius, height + Math.sin(a * 2) * 3, Math.sin(a) * radius);
            plane.current.rotation.set(0, -a + (speed > 0 ? Math.PI : 0), speed > 0 ? -0.35 : 0.35);
        }
        if (prop.current) prop.current.rotation.z += 0.9;
    });
    return (
        <group ref={plane}>
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.45, 0.25, 6, 8]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            {[0.1, 1.5].map((y) => (
                <mesh key={y} castShadow position={[0, y - 0.4, 0.6]}>
                    <boxGeometry args={[9, 0.12, 1.5]} />
                    <meshStandardMaterial color={color} roughness={0.7} />
                </mesh>
            ))}
            <mesh position={[0, 0.4, -2.9]}>
                <boxGeometry args={[3, 0.1, 0.9]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.9, -2.9]}>
                <boxGeometry args={[0.1, 1, 0.9]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            <mesh ref={prop} position={[0, 0, 3.1]}>
                <boxGeometry args={[2.6, 0.2, 0.08]} />
                <meshStandardMaterial color="#3a2a1a" roughness={0.6} />
            </mesh>
        </group>
    );
}

/** British Mark IV tank: the rhomboid "landship". */
function Tank({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
    const hull = useMemo(() => {
        const sh = new THREE.Shape([
            new THREE.Vector2(-4.2, 0.4), new THREE.Vector2(-3.2, 0), new THREE.Vector2(2.6, 0),
            new THREE.Vector2(4.4, 1.2), new THREE.Vector2(3.8, 2.6), new THREE.Vector2(-3.6, 2.6),
        ]);
        const g = new THREE.ExtrudeGeometry(sh, { depth: 0.9, bevelEnabled: false });
        g.translate(0, 0, -0.45);
        return g;
    }, []);
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {[-1.5, 1.5].map((z) => (
                <mesh key={z} geometry={hull} position={[0, 0, z]} castShadow>
                    <meshStandardMaterial color="#5c5a3e" roughness={0.9} />
                </mesh>
            ))}
            <mesh castShadow position={[0, 1.4, 0]}>
                <boxGeometry args={[6.4, 2.0, 2.4]} />
                <meshStandardMaterial color="#5c5a3e" roughness={0.9} />
            </mesh>
            {/* gun sponsons */}
            {[-1, 1].map((s) => (
                <group key={s} position={[0.2, 1.3, s * 2.2]}>
                    <mesh castShadow>
                        <boxGeometry args={[1.6, 1.0, 0.6]} />
                        <meshStandardMaterial color="#54523a" roughness={0.9} />
                    </mesh>
                    <mesh position={[0.9, 0, s * 0.1]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.1, 0.1, 1.2, 8]} />
                        <meshStandardMaterial color="#222" roughness={0.5} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

/** Instanced shell craters: dark mud bowls with raised rims. */
export function Craters({ count, area, clear, seed = 7 }: { count: number; area: number; clear?: (x: number, z: number) => boolean; seed?: number }) {
    const pts = useMemo(() => {
        const rand = mulberry32(seed);
        const out: [number, number, number][] = [];
        let guard = 0;
        while (out.length < count && guard++ < count * 10) {
            const x = (rand() - 0.5) * area;
            const z = (rand() - 0.5) * area;
            if (clear?.(x, z)) continue;
            out.push([x, z, 1.5 + rand() * 3.5]);
        }
        return out;
    }, [count, area, clear, seed]);
    const fill = (mesh: THREE.InstancedMesh | null, rim: boolean) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        pts.forEach(([x, z, r], i) => {
            d.position.set(x, rim ? 0.15 : 0.06, z);
            d.rotation.set(-Math.PI / 2, 0, 0);
            d.scale.setScalar(r);
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    };
    return (
        <group>
            <instancedMesh ref={(m) => fill(m, false)} args={[undefined, undefined, pts.length]} receiveShadow>
                <circleGeometry args={[1, 14]} />
                <meshStandardMaterial color="#3b3024" roughness={1} />
            </instancedMesh>
            <instancedMesh ref={(m) => fill(m, true)} args={[undefined, undefined, pts.length]} castShadow receiveShadow>
                <torusGeometry args={[1, 0.22, 5, 14]} />
                <meshStandardMaterial color="#6a5a44" roughness={1} />
            </instancedMesh>
        </group>
    );
}

/** A trench line: sandbagged parapet with a dark trench floor behind it. */
function TrenchLine({ z, length = 220, facing = 1 }: { z: number; length?: number; facing?: 1 | -1 }) {
    const bags = useMemo(() => {
        const out: [number, number, number][] = [];
        for (let x = -length / 2; x < length / 2; x += 1.6) {
            const zig = Math.sin(x * 0.12) * 3;
            for (let row = 0; row < 3; row++) out.push([x + (row % 2) * 0.8, 0.35 + row * 0.55, z + zig]);
        }
        return out;
    }, [z, length]);
    const fill = (mesh: THREE.InstancedMesh | null) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        bags.forEach(([x, y, zz], i) => {
            d.position.set(x, y, zz);
            d.rotation.set(0, (i % 3) * 0.08, 0);
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    };
    return (
        <group>
            <instancedMesh ref={fill} args={[undefined, undefined, bags.length]} castShadow receiveShadow>
                <capsuleGeometry args={[0.3, 1.0, 3, 8]} />
                <meshStandardMaterial color="#9a8a62" roughness={1} />
            </instancedMesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, z + facing * 2.6]} receiveShadow>
                <planeGeometry args={[length, 3.2]} />
                <meshStandardMaterial color="#2b231a" roughness={1} />
            </mesh>
        </group>
    );
}

/** Barbed-wire entanglement: stakes with criss-crossing wire. */
export function BarbedWire({ z, length = 200 }: { z: number; length?: number }) {
    const line = useMemo(() => {
        const v: THREE.Vector3[] = [];
        for (let x = -length / 2; x < length / 2; x += 3) {
            v.push(new THREE.Vector3(x, 1.2, z), new THREE.Vector3(x + 3, 0.3, z + 1));
            v.push(new THREE.Vector3(x, 0.3, z + 1), new THREE.Vector3(x + 3, 1.2, z));
        }
        return new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(v), new THREE.LineBasicMaterial({ color: '#4a4440' }));
    }, [z, length]);
    const stakes = useMemo(() => Array.from({ length: Math.floor(length / 6) }, (_, i) => -length / 2 + i * 6), [length]);
    return (
        <group>
            <primitive object={line} />
            {stakes.map((x) => (
                <mesh key={x} position={[x, 0.7, z + 0.5]} rotation={[0, 0, (x % 2) * 0.1]}>
                    <cylinderGeometry args={[0.07, 0.09, 1.4, 5]} />
                    <meshStandardMaterial color="#3e3226" roughness={1} />
                </mesh>
            ))}
        </group>
    );
}

/** Shell-stripped trees. */
function DeadTrees({ count, inner, outer, seed = 4 }: { count: number; inner: number; outer: number; seed?: number }) {
    const trees = useMemo(() => {
        const rand = mulberry32(seed);
        return Array.from({ length: count }, () => {
            const a = rand() * Math.PI * 2;
            const r = inner + rand() * (outer - inner);
            return { x: Math.cos(a) * r, z: Math.sin(a) * r, h: 4 + rand() * 7, lean: (rand() - 0.5) * 0.4, rot: rand() * 6 };
        });
    }, [count, inner, outer, seed]);
    return (
        <group>
            {trees.map((t, i) => (
                <group key={i} position={[t.x, 0, t.z]} rotation={[t.lean, t.rot, t.lean * 0.5]}>
                    <mesh castShadow position={[0, t.h / 2, 0]}>
                        <cylinderGeometry args={[0.15, 0.35, t.h, 5]} />
                        <meshStandardMaterial color="#3a2e24" roughness={1} />
                    </mesh>
                    <mesh castShadow position={[0.5, t.h * 0.75, 0]} rotation={[0, 0, -0.9]}>
                        <cylinderGeometry args={[0.06, 0.12, t.h * 0.35, 4]} />
                        <meshStandardMaterial color="#3a2e24" roughness={1} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

/** Habsburg-era city blocks: pastel stucco, red tile roofs, rows of windows. */
export function CityBlocks({ seed, count, inner, outer, clear, palette }: { seed: number; count: number; inner: number; outer: number; clear?: (x: number, z: number) => boolean; palette: string[] }) {
    const bodyRef = useRef<THREE.InstancedMesh>(null);
    const roofRef = useRef<THREE.InstancedMesh>(null);
    const blocks = useMemo(() => {
        const rand = mulberry32(seed);
        const out: { x: number; z: number; w: number; h: number; d: number; rot: number; c: number }[] = [];
        let guard = 0;
        while (out.length < count && guard++ < count * 30) {
            const a = rand() * Math.PI * 2;
            const r = inner + rand() * (outer - inner);
            const x = Math.cos(a) * r;
            const z = Math.sin(a) * r;
            if (clear?.(x, z)) continue;
            if (out.some((b) => Math.hypot(b.x - x, b.z - z) < 13)) continue;
            out.push({ x, z, w: 10 + rand() * 6, h: 7 + rand() * 7, d: 9 + rand() * 4, rot: Math.round(rand() * 4) * (Math.PI / 2), c: rand() });
        }
        return out;
    }, [seed, count, inner, outer, clear]);
    const colors = useMemo(() => palette.map((c) => new THREE.Color(c)), [palette]);
    const roofGeom = useMemo(() => gableGeometry(1, 0.38, 1), []);
    const fill = () => {
        const d = new THREE.Object3D();
        blocks.forEach((b, i) => {
            d.position.set(b.x, b.h / 2, b.z);
            d.rotation.set(0, b.rot, 0);
            d.scale.set(b.w, b.h, b.d);
            d.updateMatrix();
            bodyRef.current?.setMatrixAt(i, d.matrix);
            bodyRef.current?.setColorAt(i, colors[Math.floor(b.c * colors.length)]);
            d.position.set(b.x, b.h, b.z);
            d.scale.set(b.w * 1.04, b.d * 1.0, b.d * 1.04);
            d.updateMatrix();
            roofRef.current?.setMatrixAt(i, d.matrix);
        });
        if (bodyRef.current) { bodyRef.current.instanceMatrix.needsUpdate = true; if (bodyRef.current.instanceColor) bodyRef.current.instanceColor.needsUpdate = true; }
        if (roofRef.current) roofRef.current.instanceMatrix.needsUpdate = true;
    };
    return (
        <group>
            <instancedMesh ref={(m) => { bodyRef.current = m; fill(); }} args={[undefined, undefined, blocks.length]} castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial roughness={0.85} />
            </instancedMesh>
            <instancedMesh ref={(m) => { roofRef.current = m; fill(); }} args={[roofGeom, undefined, blocks.length]} castShadow>
                <meshStandardMaterial color="#9a4a32" roughness={0.9} />
            </instancedMesh>
        </group>
    );
}

/** A facade with windows, used for buildings the camera sees up close. */
export function Facade({ position, rotation = 0, width, height, depth = 10, color, roof = '#9a4a32', rows, cols }: { position: [number, number, number]; rotation?: number; width: number; height: number; depth?: number; color: string; roof?: string; rows: number; cols: number }) {
    const roofGeom = useMemo(() => gableGeometry(width + 0.6, 3, depth + 0.6), [width, depth]);
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial color={color} roughness={0.85} />
            </mesh>
            <mesh castShadow geometry={roofGeom} position={[0, height, 0]}>
                <meshStandardMaterial color={roof} roughness={0.9} />
            </mesh>
            <mesh position={[0, 4, depth / 2 + 0.05]}>
                <boxGeometry args={[width + 0.2, 0.4, 0.3]} />
                <meshStandardMaterial color="#efe9da" roughness={0.7} />
            </mesh>
            <WindowGrid width={width - 2} rows={rows} cols={cols} y0={2.2} rowGap={3.4} z={depth / 2 + 0.02} />
        </group>
    );
}

// ─── Sarajevo, 28 June 1914 ─────────────────────────────────────────────────
function LatinBridge({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {[-7, 0, 7].map((x, i) => (
                <mesh key={x} castShadow position={[0, 1.2, x]} rotation={[0, Math.PI / 2, 0]}>
                    <torusGeometry args={[i === 1 ? 3.2 : 2.4, 0.9, 8, 18, Math.PI]} />
                    <meshStandardMaterial color="#c9bfa9" roughness={1} />
                </mesh>
            ))}
            <mesh castShadow receiveShadow position={[0, 4.4, 0]}>
                <boxGeometry args={[5, 0.8, 26]} />
                <meshStandardMaterial color="#cfc6b0" roughness={1} />
            </mesh>
            {[-1, 1].map((s) => (
                <mesh key={s} position={[s * 2.3, 5.1, 0]}>
                    <boxGeometry args={[0.4, 0.8, 26]} />
                    <meshStandardMaterial color="#bfb59e" roughness={1} />
                </mesh>
            ))}
        </group>
    );
}

export function Sarajevo1914() {
    // keep the quay, the street and the south bank (where the cameras fly) free of blocks
    const clear = useMemo(() => (x: number, z: number) => (z > -105 && z < 10 && Math.abs(x) < 130) || (Math.abs(x) < 34 && z > -30 && z < 40), []);
    const palette = useMemo(() => ['#e8d3a2', '#d9c48f', '#efe4cc', '#d8a98a', '#c9cfb6'], []);
    return (
        <group>
            {/* the Miljacka river and the Appel Quay */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, -40]}>
                <planeGeometry args={[400, 16]} />
                <meshStandardMaterial color="#5f8790" roughness={0.2} metalness={0.3} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, -24]} receiveShadow>
                <planeGeometry args={[400, 14]} />
                <meshStandardMaterial color="#a39a88" roughness={1} />
            </mesh>
            {/* Franz Joseph Street running away from the quay */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-14, 0.075, 10]} receiveShadow>
                <planeGeometry args={[10, 60]} />
                <meshStandardMaterial color="#a39a88" roughness={1} />
            </mesh>
            <LatinBridge position={[-14, 0, -40]} />
            {/* Moritz Schiller's delicatessen on the corner, and the quay facades */}
            <Facade position={[-30, 0, -8]} rotation={Math.PI} width={18} height={10} color="#e3cf9c" rows={2} cols={6} />
            <Facade position={[2, 0, -8]} rotation={Math.PI} width={20} height={12} color="#efe4cc" rows={3} cols={7} />
            <Facade position={[26, 0, -8]} rotation={Math.PI} width={18} height={11} color="#d8a98a" rows={3} cols={6} />
            <Facade position={[-56, 0, -8]} rotation={Math.PI} width={20} height={12} color="#c9cfb6" rows={3} cols={7} />
            {/* the Ottoman old town: minarets above the roofs */}
            <Minaret position={[-60, 0, 60]} height={22} />
            <Minaret position={[40, 0, 80]} height={20} />
            <Minaret position={[90, 0, -90]} height={18} />
            <CityBlocks seed={14} count={40} inner={40} outer={150} clear={clear} palette={palette} />
            {/* the hills ringing the city */}
            {[[-200, -220, 70], [-40, -260, 90], [150, -230, 80], [260, 40, 70], [-260, 60, 75]].map(([x, z, h]) => (
                <mesh key={x} position={[x, 0, z]} scale={[h * 1.6, h * 0.5, h * 1.6]}>
                    <sphereGeometry args={[1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#6f8a52" roughness={1} flatShading />
                </mesh>
            ))}
            <TouringCar position={[-12, 0, -18]} rotation={Math.PI * 0.62} scale={1.8} />
            {[-48, -24, 12, 36].map((x) => (
                <Flag key={x} position={[x, 12, -2.5]} kind="habsburg" height={4} size={0.8} />
            ))}
            <Citizens count={70} radius={30} seed={15} style="colonial" />
            <Trees count={30} innerRadius={70} outerRadius={160} seed={16} />
        </group>
    );
}

// ─── Berlin, July 1914: the palace and Unter den Linden ────────────────────
function BerlinPalace({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh castShadow receiveShadow position={[0, 11, 0]}>
                <boxGeometry args={[90, 22, 40]} />
                <meshStandardMaterial color="#d8cdb6" roughness={0.85} />
            </mesh>
            <WindowGrid width={84} rows={4} cols={24} y0={3} rowGap={5} z={20.02} />
            {/* triumphal-arch portal and the great dome */}
            <mesh castShadow position={[0, 14, 21]}>
                <boxGeometry args={[18, 28, 4]} />
                <meshStandardMaterial color="#e4dac4" roughness={0.8} />
            </mesh>
            <mesh position={[0, 6, 23.1]}>
                <boxGeometry args={[6, 10, 0.4]} />
                <meshStandardMaterial color="#2a2420" roughness={0.9} />
            </mesh>
            <mesh castShadow position={[0, 30, 12]}>
                <cylinderGeometry args={[6, 6.6, 8, 16]} />
                <meshStandardMaterial color="#e4dac4" roughness={0.8} />
            </mesh>
            <mesh castShadow position={[0, 34, 12]}>
                <sphereGeometry args={[6.2, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#4d6e64" metalness={0.4} roughness={0.5} />
            </mesh>
            <Flag position={[0, 40, 12]} kind="german-empire" height={6} />
        </group>
    );
}

function BrandenburgGate({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {Array.from({ length: 6 }, (_, i) => (
                <mesh key={i} castShadow position={[-15 + i * 6, 7, 0]}>
                    <cylinderGeometry args={[0.9, 1.0, 14, 14]} />
                    <meshStandardMaterial color="#e2d8c0" roughness={0.75} />
                </mesh>
            ))}
            <mesh castShadow position={[0, 15.5, 0]}>
                <boxGeometry args={[36, 3, 6]} />
                <meshStandardMaterial color="#e2d8c0" roughness={0.75} />
            </mesh>
            <mesh castShadow position={[0, 18, 0]}>
                <boxGeometry args={[12, 2, 4]} />
                <meshStandardMaterial color="#e2d8c0" roughness={0.75} />
            </mesh>
            {/* the Quadriga */}
            <mesh castShadow position={[0, 20.5, 0]}>
                <boxGeometry args={[4, 3, 2]} />
                <meshStandardMaterial color="#4d6e64" metalness={0.4} roughness={0.5} />
            </mesh>
        </group>
    );
}

export function Berlin1914() {
    const lindens = useMemo(() => {
        const out: [number, number][] = [];
        for (let z = -40; z <= 110; z += 12) out.push([-16, z], [16, z]);
        return out;
    }, []);
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 40]} receiveShadow>
                <planeGeometry args={[44, 220]} />
                <meshStandardMaterial color="#9a9384" roughness={1} />
            </mesh>
            <BerlinPalace position={[0, 0, -90]} />
            <BrandenburgGate position={[0, 0, 140]} />
            {lindens.map(([x, z]) => (
                <group key={`${x}${z}`} position={[x, 0, z]}>
                    <mesh position={[0, 2.5, 0]}>
                        <cylinderGeometry args={[0.3, 0.4, 5, 6]} />
                        <meshStandardMaterial color="#4c3a2a" roughness={1} />
                    </mesh>
                    <mesh castShadow position={[0, 7, 0]}>
                        <icosahedronGeometry args={[3.4, 0]} />
                        <meshStandardMaterial color="#4f7038" roughness={1} flatShading />
                    </mesh>
                </group>
            ))}
            <Facade position={[-48, 0, 20]} rotation={Math.PI / 2} width={40} height={18} depth={14} color="#d6ccb4" roof="#4a5059" rows={4} cols={12} />
            <Facade position={[48, 0, 20]} rotation={-Math.PI / 2} width={40} height={18} depth={14} color="#ddd3bc" roof="#4a5059" rows={4} cols={12} />
            <Facade position={[-48, 0, 80]} rotation={Math.PI / 2} width={40} height={16} depth={14} color="#e2d8c2" roof="#4a5059" rows={3} cols={12} />
            <Facade position={[48, 0, 80]} rotation={-Math.PI / 2} width={40} height={16} depth={14} color="#d2c7ae" roof="#4a5059" rows={3} cols={12} />
            {[-22, 22].map((x) => [0, 50].map((z) => <Flag key={`${x}${z}`} position={[x, 0, z]} kind="german-empire" height={10} />))}
            <Citizens count={90} radius={26} seed={21} style="colonial" />
            <Particles count={60} color="#f4f1ea" size={0.3} speed={0.4} />
        </group>
    );
}

// ─── The Marne, September 1914 ──────────────────────────────────────────────
function EiffelTower({ position }: { position: [number, number, number] }) {
    // distant landmark: drawn without fog in a hazy colour so it reads as far away
    const solid = <meshStandardMaterial color="#9c8f7c" roughness={0.9} fog={false} />;
    const lattice = <meshBasicMaterial color="#8a7c68" wireframe fog={false} />;
    return (
        <group position={position}>
            {/* four splayed legs leaning in toward the first platform */}
            {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z]) => (
                <mesh key={`${x}${z}`} position={[x * 11.5, 15, z * 11.5]} rotation={[-z * 0.3, 0, x * 0.3]}>
                    <boxGeometry args={[3, 32, 3]} />
                    {solid}
                </mesh>
            ))}
            {/* the great arches between the legs */}
            {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((r) => (
                <mesh key={r} rotation={[0, r, 0]} position={[Math.sin(r) * 12, 9, Math.cos(r) * 12]}>
                    <torusGeometry args={[9, 0.7, 6, 16, Math.PI]} />
                    {solid}
                </mesh>
            ))}
            <mesh position={[0, 30, 0]}>
                <boxGeometry args={[20, 2, 20]} />
                {solid}
            </mesh>
            <mesh position={[0, 46, 0]} rotation={[0, Math.PI / 4, 0]}>
                <cylinderGeometry args={[6.5, 11, 30, 4, 4, true]} />
                {lattice}
            </mesh>
            <mesh position={[0, 46, 0]} rotation={[0, Math.PI / 4, 0]}>
                <cylinderGeometry args={[6.2, 10.6, 30, 4, 1, true]} />
                <meshStandardMaterial color="#9c8f7c" roughness={0.9} fog={false} transparent opacity={0.55} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 61, 0]}>
                <boxGeometry args={[11, 1.5, 11]} />
                {solid}
            </mesh>
            <mesh position={[0, 93, 0]} rotation={[0, Math.PI / 4, 0]}>
                <cylinderGeometry args={[1.2, 6.5, 64, 4, 6, true]} />
                {lattice}
            </mesh>
            <mesh position={[0, 93, 0]} rotation={[0, Math.PI / 4, 0]}>
                <cylinderGeometry args={[1, 6.1, 64, 4]} />
                <meshStandardMaterial color="#9c8f7c" roughness={0.9} fog={false} transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, 126, 0]}>
                <boxGeometry args={[2.6, 3, 2.6]} />
                {solid}
            </mesh>
            <mesh position={[0, 132, 0]}>
                <cylinderGeometry args={[0.2, 0.3, 9, 5]} />
                {solid}
            </mesh>
        </group>
    );
}

export function Marne1914() {
    const roof = useMemo(() => gableGeometry(8, 3, 10), []);
    const poplars = useMemo(() => {
        const out: [number, number][] = [];
        for (let i = 0; i < 22; i++) out.push([-140 + i * 13, -96], [-140 + i * 13, -108]);
        return out;
    }, []);
    const sheaves = useMemo(() => {
        const rand = mulberry32(5);
        return Array.from({ length: 60 }, () => [(rand() - 0.5) * 120 - 120, (rand() - 0.5) * 140] as [number, number]);
    }, []);
    return (
        <group>
            {/* the road from Paris behind the French line, lined with poplars, and the taxis on it */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, -102]} receiveShadow>
                <planeGeometry args={[320, 8]} />
                <meshStandardMaterial color="#b1a284" roughness={1} />
            </mesh>
            {poplars.map(([x, z], i) => (
                <group key={i} position={[x, 0, z]}>
                    <mesh position={[0, 1.5, 0]}>
                        <cylinderGeometry args={[0.25, 0.3, 3, 6]} />
                        <meshStandardMaterial color="#4c3a2a" roughness={1} />
                    </mesh>
                    <mesh castShadow position={[0, 8, 0]}>
                        <coneGeometry args={[1.6, 12, 8]} />
                        <meshStandardMaterial color="#557538" roughness={1} />
                    </mesh>
                </group>
            ))}
            {Array.from({ length: 12 }, (_, i) => (
                <Taxi key={i} position={[-60 + i * 8, 0, -102]} rotation={Math.PI / 2} />
            ))}
            {/* stooks of harvested wheat in the fields */}
            {sheaves.map(([x, z], i) => (
                <mesh key={i} castShadow position={[x, 0.8, z]}>
                    <coneGeometry args={[0.8, 1.8, 6]} />
                    <meshStandardMaterial color="#d6b866" roughness={1} />
                </mesh>
            ))}
            {/* a village with its church */}
            <group position={[130, 0, -40]}>
                {[[0, 0], [14, 6], [-12, 10], [8, -16], [-6, -18]].map(([x, z], i) => (
                    <group key={i} position={[x, 0, z]}>
                        <mesh castShadow receiveShadow position={[0, 3, 0]}>
                            <boxGeometry args={[7, 6, 9]} />
                            <meshStandardMaterial color="#e2d6bc" roughness={0.9} />
                        </mesh>
                        <mesh castShadow geometry={roof} position={[0, 6, 0]} rotation={[0, Math.PI / 2, 0]}>
                            <meshStandardMaterial color="#8a4a32" roughness={0.9} />
                        </mesh>
                    </group>
                ))}
                <mesh castShadow position={[2, 9, 20]}>
                    <boxGeometry args={[4, 18, 4]} />
                    <meshStandardMaterial color="#d6cab0" roughness={0.9} />
                </mesh>
                <mesh castShadow position={[2, 20, 20]} rotation={[0, Math.PI / 4, 0]}>
                    <coneGeometry args={[3.2, 6, 4]} />
                    <meshStandardMaterial color="#4a5059" roughness={0.8} />
                </mesh>
            </group>
            {/* Paris on the horizon behind the French; the German First Army comes from the north (+z) */}
            <EiffelTower position={[-110, 0, -360]} />
            <Flag position={[-30, 0, 70]} kind="german-empire" height={10} />
            <Flag position={[30, 0, 70]} kind="german-empire" height={10} />
            <Flag position={[-14, 0, -78]} kind="france" height={10} />
            <Flag position={[14, 0, -78]} kind="uk" height={9} />
            <Trees count={45} innerRadius={130} outerRadius={210} seed={51} />
            <Particles count={140} color="#e8e2d2" size={0.5} speed={0.3} />
        </group>
    );
}

// ─── The Western Front, 1916–1918 ───────────────────────────────────────────
export function WesternFront() {
    const clear = useMemo(() => (_x: number, z: number) => Math.abs(z - 46) < 5 || Math.abs(z + 46) < 5, []);
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
                <planeGeometry args={[420, 260]} />
                <meshStandardMaterial color="#5e5240" roughness={1} />
            </mesh>
            <TrenchLine z={52} facing={1} />
            <TrenchLine z={-52} facing={-1} />
            <BarbedWire z={36} />
            <BarbedWire z={-36} />
            <Craters count={130} area={240} clear={clear} />
            <DeadTrees count={40} inner={30} outer={180} />
            {/* the British tanks that would decide 1918, behind the Allied line */}
            <Tank position={[-40, 0, -70]} rotation={Math.PI / 2} />
            <Tank position={[30, 0, -74]} rotation={Math.PI / 2 + 0.2} />
            {/* an observation balloon on its cable */}
            <group position={[60, 0, -10]}>
                <mesh position={[0, 46, 0]} scale={[1, 0.55, 0.55]} castShadow>
                    <sphereGeometry args={[7, 16, 12]} />
                    <meshStandardMaterial color="#b9b39a" roughness={0.8} />
                </mesh>
                <mesh position={[0, 22, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 44, 4]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>
            <Biplane radius={90} height={48} speed={0.18} phase={0} color="#8a7a52" />
            <Biplane radius={70} height={40} speed={-0.22} phase={2} color="#a83a32" />
            {/* the German line (+z, where the player's army deploys) and the Allied line */}
            <Flag position={[0, 0, 60]} kind="german-empire" height={8} />
            <Flag position={[-20, 0, -60]} kind="uk" height={8} />
            <Flag position={[20, 0, -60]} kind="france" height={8} />
            {/* drifting smoke and gas */}
            <Particles count={260} color="#b8b4a4" size={0.8} speed={0.25} />
        </group>
    );
}

// ─── Compiègne, 11 November 1918: Marshal Foch's railway carriage ──────────
function RailwayCarriage({ position, color = '#5a3a26' }: { position: [number, number, number]; color?: string }) {
    return (
        <group position={position}>
            <mesh castShadow position={[0, 2.8, 0]}>
                <boxGeometry args={[3.2, 3.2, 20]} />
                <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>
            {/* curved roof: a half cylinder lying along the carriage, flattened */}
            <mesh castShadow position={[0, 4.4, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.4]}>
                <cylinderGeometry args={[1.75, 1.75, 20, 16, 1, false, -Math.PI / 2, Math.PI]} />
                <meshStandardMaterial color="#2c2c2c" roughness={0.7} />
            </mesh>
            {[-1, 1].map((s) =>
                Array.from({ length: 8 }, (_, i) => (
                    <mesh key={`${s}${i}`} position={[s * 1.62, 3.1, -8.4 + i * 2.4]}>
                        <boxGeometry args={[0.05, 1.2, 1.4]} />
                        <meshStandardMaterial color="#e9d9a0" emissive="#c9a24a" emissiveIntensity={0.35} roughness={0.3} />
                    </mesh>
                )),
            )}
            {[-7, 7].map((z) => [-1.2, 1.2].map((x) => <Wheel key={`${x}${z}`} position={[x, 0.6, z]} radius={0.55} />))}
            <mesh position={[0, 4, 0]}>
                <boxGeometry args={[3.3, 0.2, 20.2]} />
                <meshStandardMaterial color="#c9a24a" metalness={0.6} roughness={0.4} />
            </mesh>
        </group>
    );
}

export function Compiegne() {
    return (
        <group>
            {[-6, 6].map((x) => (
                <group key={x}>
                    <mesh position={[x, 0.08, 0]} receiveShadow>
                        <boxGeometry args={[3.4, 0.16, 300]} />
                        <meshStandardMaterial color="#5a4a3a" roughness={1} />
                    </mesh>
                    {[-0.75, 0.75].map((dx) => (
                        <mesh key={dx} position={[x + dx, 0.22, 0]}>
                            <boxGeometry args={[0.12, 0.12, 300]} />
                            <meshStandardMaterial color="#6a6d70" metalness={0.7} roughness={0.4} />
                        </mesh>
                    ))}
                </group>
            ))}
            <RailwayCarriage position={[-6, 0, -10]} />
            <RailwayCarriage position={[6, 0, -14]} color="#3a3e46" />
            <Flag position={[-12, 0, 4]} kind="france" height={9} />
            <Flag position={[-16, 0, 4]} kind="uk" height={9} />
            <Flag position={[12, 0, 0]} kind={'german-empire' as FlagKind} height={7} size={0.8} />
            {/* the forest of Compiègne crowding the clearing */}
            <Trees count={120} innerRadius={30} outerRadius={150} seed={81} />
            <Citizens count={14} radius={10} seed={82} style="colonial" />
            <Particles count={200} color="#dfe2e0" size={0.6} speed={0.2} />
        </group>
    );
}
