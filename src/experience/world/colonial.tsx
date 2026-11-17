/* 18th-century North America: Philadelphia 1776, Valley Forge winter camp,
   and the Yorktown siege field. Same stylized-procedural approach as the
   Samarkand set: deterministic layouts, shared textured materials, and
   instancing wherever a shape repeats. */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Banner, Citizens, Fire, Particles, Tents, Trees, mulberry32 } from './parts';
import { brickTexture, pavingTexture } from './textures';

/** Triangular prism for gable roofs and pediments: base on y=0, ridge along X. */
function gableGeometry(width: number, height: number, length: number) {
    const shape = new THREE.Shape([new THREE.Vector2(-width / 2, 0), new THREE.Vector2(width / 2, 0), new THREE.Vector2(0, height)]);
    const g = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false });
    g.translate(0, 0, -length / 2);
    g.rotateY(Math.PI / 2);
    g.computeVertexNormals();
    return g;
}

const COLONIAL = {
    brick: '#9a4b33',
    brickDark: '#7f3c29',
    mortar: '#d8c8b2',
    trim: '#f3efe6',
    slate: '#3d3f45',
    shingle: '#5b4636',
    green: '#2f4a2c',
    flagRed: '#b22234',
    flagBlue: '#3c3b6e',
    redcoat: '#b3262b',
};

let _mats: { brick: THREE.MeshStandardMaterial; brickDark: THREE.MeshStandardMaterial; trim: THREE.MeshStandardMaterial; slate: THREE.MeshStandardMaterial; glass: THREE.MeshStandardMaterial } | null = null;
function colonialMats() {
    if (_mats) return _mats;
    _mats = {
        brick: new THREE.MeshStandardMaterial({ map: brickTexture(COLONIAL.brick, COLONIAL.mortar, [6, 3], 31), roughness: 0.9 }),
        brickDark: new THREE.MeshStandardMaterial({ map: brickTexture(COLONIAL.brickDark, '#c9b79f', [3, 2], 17), roughness: 0.92 }),
        trim: new THREE.MeshStandardMaterial({ color: COLONIAL.trim, roughness: 0.6 }),
        slate: new THREE.MeshStandardMaterial({ color: COLONIAL.slate, roughness: 0.75 }),
        glass: new THREE.MeshStandardMaterial({ color: '#1f2a36', roughness: 0.15, metalness: 0.5, emissive: '#0d1520', emissiveIntensity: 0.4 }),
    };
    return _mats;
}

/** A grid of white-framed sash windows on one facade (instanced). */
function WindowGrid({
    width, rows, cols, y0, rowGap, z, x0 = 0,
}: { width: number; rows: number; cols: number; y0: number; rowGap: number; z: number; x0?: number }) {
    const m = colonialMats();
    const frameRef = useRef<THREE.InstancedMesh>(null);
    const glassRef = useRef<THREE.InstancedMesh>(null);
    const n = rows * cols;
    useMemo(() => {
        // filled on mount via ref callback below
    }, []);
    const place = (mesh: THREE.InstancedMesh | null, depth: number, scale: [number, number, number]) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        let i = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = x0 - width / 2 + (width / cols) * (c + 0.5);
                d.position.set(x, y0 + r * rowGap, z + depth);
                d.scale.set(...scale);
                d.updateMatrix();
                mesh.setMatrixAt(i++, d.matrix);
            }
        }
        mesh.instanceMatrix.needsUpdate = true;
    };
    return (
        <group>
            <instancedMesh ref={(mm) => { frameRef.current = mm; place(mm, 0, [1, 1, 1]); }} args={[undefined, m.trim, n]}>
                <boxGeometry args={[1.5, 2.3, 0.2]} />
            </instancedMesh>
            <instancedMesh ref={(mm) => { glassRef.current = mm; place(mm, 0.06, [1, 1, 1]); }} args={[undefined, m.glass, n]}>
                <boxGeometry args={[1.15, 1.95, 0.2]} />
            </instancedMesh>
        </group>
    );
}

// ─── Independence Hall (Pennsylvania State House) ──────────────────────────
export function IndependenceHall({ position = [0, 0, 0] as [number, number, number] }) {
    const m = colonialMats();
    return (
        <group position={position}>
            {/* main block */}
            <mesh position={[0, 6, 0]} material={m.brick} castShadow receiveShadow>
                <boxGeometry args={[38, 12, 14]} />
            </mesh>
            {/* white cornice + belt course */}
            <mesh position={[0, 12.2, 0]} material={m.trim}>
                <boxGeometry args={[38.6, 0.6, 14.6]} />
            </mesh>
            <mesh position={[0, 6.2, 0]} material={m.trim}>
                <boxGeometry args={[38.2, 0.35, 14.2]} />
            </mesh>
            {/* hipped slate roof */}
            <mesh position={[0, 14.6, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1, 1, 0.37]} material={m.slate} castShadow>
                <coneGeometry args={[27.5, 4.6, 4]} />
            </mesh>
            {/* chimneys */}
            {[-15, 15].map((x) => (
                <mesh key={x} position={[x, 15.5, 0]} material={m.brickDark} castShadow>
                    <boxGeometry args={[1.6, 4, 3]} />
                </mesh>
            ))}
            <WindowGrid width={34} rows={2} cols={9} y0={3.4} rowGap={5.6} z={7.05} />
            {/* front door with fanlight */}
            <mesh position={[0, 2, 7.1]} material={m.trim}>
                <boxGeometry args={[3, 4.2, 0.3]} />
            </mesh>
            <mesh position={[0, 1.9, 7.25]}>
                <boxGeometry args={[2.2, 3.6, 0.1]} />
                <meshStandardMaterial color="#3a2618" roughness={0.6} />
            </mesh>
            {/* tower on the back, rising above the roof */}
            <group position={[0, 0, -10]}>
                <mesh position={[0, 11, 0]} material={m.brick} castShadow>
                    <boxGeometry args={[8, 22, 8]} />
                </mesh>
                <mesh position={[0, 22.3, 0]} material={m.trim}>
                    <boxGeometry args={[8.6, 0.6, 8.6]} />
                </mesh>
                {/* white wooden stage + clock faces */}
                <mesh position={[0, 25, 0]} material={m.trim} castShadow>
                    <boxGeometry args={[6.4, 5, 6.4]} />
                </mesh>
                {[0, 1, 2, 3].map((k) => (
                    <mesh key={k} position={[Math.sin((k * Math.PI) / 2) * 3.25, 25.2, Math.cos((k * Math.PI) / 2) * 3.25]} rotation={[0, (k * Math.PI) / 2, 0]}>
                        <circleGeometry args={[1.5, 24]} />
                        <meshStandardMaterial color="#f8f4ea" roughness={0.4} />
                    </mesh>
                ))}
                {/* octagonal belfry, dome and spire */}
                <mesh position={[0, 29.6, 0]} material={m.trim} castShadow>
                    <cylinderGeometry args={[2.6, 2.9, 4.2, 8]} />
                </mesh>
                <mesh position={[0, 32.4, 0]}>
                    <sphereGeometry args={[2.5, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#6f8a7a" roughness={0.5} metalness={0.4} />
                </mesh>
                <mesh position={[0, 36.4, 0]} material={m.trim}>
                    <coneGeometry args={[0.7, 6, 8]} />
                </mesh>
                <mesh position={[0, 39.6, 0]}>
                    <sphereGeometry args={[0.35, 10, 8]} />
                    <meshStandardMaterial color="#d9a441" metalness={0.8} roughness={0.25} />
                </mesh>
            </group>
            {/* wing buildings joined by arcades */}
            {[-1, 1].map((side) => (
                <group key={side} position={[side * 30, 0, 2]}>
                    <mesh position={[0, 4.5, 0]} material={m.brick} castShadow>
                        <boxGeometry args={[10, 9, 10]} />
                    </mesh>
                    <mesh position={[0, 10.2, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1, 1, 1]} material={m.slate}>
                        <coneGeometry args={[7.4, 2.8, 4]} />
                    </mesh>
                    <WindowGrid width={8} rows={2} cols={3} y0={2.8} rowGap={4} z={5.05} />
                    <mesh position={[-side * 7.5, 2.6, 0]} material={m.trim}>
                        <boxGeometry args={[5, 5.2, 4]} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// ─── Georgian rowhouses lining the streets (instanced bodies + roofs) ──────
export function Rowhouses({ seed = 4, innerRadius = 46, outerRadius = 100, count = 70 }: { seed?: number; innerRadius?: number; outerRadius?: number; count?: number }) {
    const m = colonialMats();
    const houses = useMemo(() => {
        const rand = mulberry32(seed);
        const out: { x: number; z: number; w: number; h: number; d: number; rot: number }[] = [];
        let guard = 0;
        while (out.length < count && guard++ < count * 20) {
            // streets run on a grid, so snap houses to blocks facing the axes
            const a = rand() * Math.PI * 2;
            const r = innerRadius + rand() * (outerRadius - innerRadius);
            const x = Math.round((Math.cos(a) * r) / 7) * 7;
            const z = Math.round((Math.sin(a) * r) / 9) * 9;
            if (Math.abs(x) < 26 && z < 0 && z > -60) continue; // keep the State House yard open
            if (out.some((o) => Math.abs(o.x - x) < 6.5 && Math.abs(o.z - z) < 8.5)) continue;
            out.push({ x, z, w: 6 + rand() * 0.6, h: 7 + rand() * 4, d: 8, rot: Math.abs(x) > Math.abs(z) ? Math.PI / 2 : 0 });
        }
        return out;
    }, [seed, innerRadius, outerRadius, count]);

    const place = (mesh: THREE.InstancedMesh | null, roof: boolean) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        houses.forEach((h, i) => {
            d.position.set(h.x, roof ? h.h + 1.2 : h.h / 2, h.z);
            d.rotation.set(0, h.rot + (roof ? Math.PI / 4 : 0), 0);
            d.scale.set(roof ? h.w * 0.78 : h.w, roof ? 2.4 : h.h, roof ? h.d * 0.78 : h.d);
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    };
    const placeWindows = (mesh: THREE.InstancedMesh | null, outset = 0) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        let i = 0;
        houses.forEach((h) => {
            for (let r = 0; r < 2; r++) {
                for (let c = -1; c <= 1; c++) {
                    // windows on the street-facing side (toward the square)
                    const facing = h.rot === 0 ? (h.z > 0 ? -1 : 1) : (h.x > 0 ? -1 : 1);
                    const off = h.d / 2 + 0.05 + outset;
                    if (h.rot === 0) d.position.set(h.x + c * 1.8, 2.2 + r * 3, h.z + facing * off);
                    else d.position.set(h.x + facing * off, 2.2 + r * 3, h.z + c * 1.8);
                    d.rotation.set(0, h.rot, 0);
                    d.updateMatrix();
                    mesh.setMatrixAt(i++, d.matrix);
                }
            }
        });
        mesh.count = i;
        mesh.instanceMatrix.needsUpdate = true;
    };
    return (
        <group>
            <instancedMesh ref={(mm) => place(mm, false)} args={[undefined, m.brickDark, houses.length]} castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
            </instancedMesh>
            <instancedMesh ref={(mm) => place(mm, true)} args={[undefined, undefined, houses.length]} castShadow>
                <coneGeometry args={[0.72, 1, 4]} />
                <meshStandardMaterial color={COLONIAL.shingle} roughness={0.9} flatShading />
            </instancedMesh>
            <instancedMesh ref={(mm) => placeWindows(mm)} args={[undefined, m.trim, houses.length * 6]}>
                <boxGeometry args={[1.1, 1.7, 0.12]} />
            </instancedMesh>
            <instancedMesh ref={(mm) => placeWindows(mm, 0.04)} args={[undefined, m.glass, houses.length * 6]}>
                <boxGeometry args={[0.8, 1.4, 0.12]} />
            </instancedMesh>
        </group>
    );
}

/** White church steeple (Christ Church). */
function Steeple({ position }: { position: [number, number, number] }) {
    const m = colonialMats();
    return (
        <group position={position}>
            <mesh position={[0, 5, 0]} material={m.brick} castShadow>
                <boxGeometry args={[12, 10, 22]} />
            </mesh>
            <mesh position={[0, 11.6, 0]} rotation={[Math.PI / 2, 0, 0]} material={m.slate}>
                <cylinderGeometry args={[0.1, 7.6, 22, 3, 1, false, Math.PI / 2]} />
            </mesh>
            <mesh position={[0, 12, 13]} material={m.brick} castShadow>
                <boxGeometry args={[6, 24, 6]} />
            </mesh>
            <mesh position={[0, 26.5, 13]} material={m.trim}>
                <cylinderGeometry args={[2.2, 2.6, 5, 8]} />
            </mesh>
            <mesh position={[0, 35, 13]} material={m.trim} castShadow>
                <coneGeometry args={[2, 12, 8]} />
            </mesh>
        </group>
    );
}

export function Philadelphia() {
    const paving = useMemo(() => pavingTexture([10, 10]), []);
    return (
        <group>
            {/* State House yard: brick paths across a lawn */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 4]} receiveShadow>
                <planeGeometry args={[70, 60]} />
                <meshStandardMaterial color="#5f7d45" roughness={1} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 6]} receiveShadow>
                <planeGeometry args={[10, 56]} />
                <meshStandardMaterial map={paving} roughness={0.9} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 30]} receiveShadow>
                <planeGeometry args={[200, 10]} />
                <meshStandardMaterial map={paving} roughness={0.9} />
            </mesh>
            <IndependenceHall position={[0, 0, -22]} />
            <Steeple position={[56, 0, 44]} />
            <Rowhouses />
            <Trees count={22} innerRadius={34} outerRadius={44} seed={77} />
            <Trees count={30} innerRadius={70} outerRadius={150} seed={12} />
            <Citizens count={46} radius={30} style="colonial" />
            <Banner position={[-9, 0, -12]} color={COLONIAL.flagRed} height={8} />
            <Banner position={[9, 0, -12]} color={COLONIAL.flagBlue} height={8} />
            <LibertyBell position={[-14, 0, 14]} />
            <Particles count={160} color="#f4e7c4" size={0.25} />
        </group>
    );
}

/** The bell hung in a small yard frame, so the hotspot has something to point at. */
function LibertyBell({ position }: { position: [number, number, number] }) {
    const bell = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (bell.current) bell.current.rotation.z = Math.sin(clock.elapsedTime * 1.2) * 0.12;
    });
    return (
        <group position={position}>
            {[-1.8, 1.8].map((x) => (
                <mesh key={x} position={[x, 2.4, 0]} castShadow>
                    <boxGeometry args={[0.4, 4.8, 0.4]} />
                    <meshStandardMaterial color="#5b4129" roughness={1} />
                </mesh>
            ))}
            <mesh position={[0, 4.9, 0]}>
                <boxGeometry args={[4.4, 0.45, 0.5]} />
                <meshStandardMaterial color="#5b4129" roughness={1} />
            </mesh>
            <group ref={bell} position={[0, 4.6, 0]}>
                <mesh position={[0, -1, 0]} castShadow>
                    <cylinderGeometry args={[0.55, 1.15, 1.8, 20, 1, true]} />
                    <meshStandardMaterial color="#8a6a3a" roughness={0.35} metalness={0.85} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0, -0.1, 0]}>
                    <sphereGeometry args={[0.56, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#8a6a3a" roughness={0.35} metalness={0.85} />
                </mesh>
            </group>
        </group>
    );
}

// ─── Valley Forge: log huts in the snow ────────────────────────────────────
export function ValleyForge() {
    const huts = useMemo(() => {
        const out: { x: number; z: number; rot: number }[] = [];
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 9; col++) {
                out.push({ x: (col - 4) * 9 + (row % 2) * 2, z: -40 + row * 12, rot: (row % 2 ? 0.04 : -0.03) });
            }
        }
        return out;
    }, []);
    const roofGeom = useMemo(() => gableGeometry(5.4, 2.2, 6.8), []);
    const place = (mesh: THREE.InstancedMesh | null, kind: 'body' | 'roof' | 'chimney' | 'snow') => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        huts.forEach((h, i) => {
            d.rotation.set(0, h.rot + (kind === 'roof' || kind === 'snow' ? 0 : 0), 0);
            if (kind === 'body') { d.position.set(h.x, 1.5, h.z); d.scale.set(1, 1, 1); }
            if (kind === 'roof') { d.position.set(h.x, 3, h.z); d.scale.set(1, 1, 1); }
            if (kind === 'snow') { d.position.set(h.x, 3.08, h.z); d.scale.set(0.98, 1.04, 0.96); }
            if (kind === 'chimney') { d.position.set(h.x + 2.2, 3.4, h.z - 1.4); d.scale.set(1, 1, 1); }
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    };
    return (
        <group>
            <instancedMesh ref={(m) => place(m, 'body')} args={[undefined, undefined, huts.length]} castShadow receiveShadow>
                <boxGeometry args={[6, 3, 4.5]} />
                <meshStandardMaterial map={useMemo(() => brickTexture('#6a4b32', '#4a3322', [1, 6], 5), [])} roughness={1} />
            </instancedMesh>
            <instancedMesh ref={(m) => place(m, 'roof')} args={[roofGeom, undefined, huts.length]} castShadow>
                <meshStandardMaterial color="#5a4330" roughness={1} flatShading />
            </instancedMesh>
            <instancedMesh ref={(m) => place(m, 'snow')} args={[roofGeom, undefined, huts.length]}>
                <meshStandardMaterial color="#f1f5f8" roughness={1} flatShading />
            </instancedMesh>
            <instancedMesh ref={(m) => place(m, 'chimney')} args={[undefined, undefined, huts.length]} castShadow>
                <boxGeometry args={[0.9, 2.6, 0.9]} />
                <meshStandardMaterial color="#7a6a5a" roughness={1} />
            </instancedMesh>
            <Fire position={[0, 0, 26]} scale={1.4} />
            <Fire position={[-24, 0, 22]} scale={1} />
            <Fire position={[22, 0, 20]} scale={1} />
            <Banner position={[0, 0, 18]} color={COLONIAL.flagBlue} height={9} />
            <Tents position={[-40, 0, 30]} count={8} color="#e8e2d2" />
            <Trees count={40} innerRadius={60} outerRadius={150} snowy seed={8} />
            <Particles count={650} snow color="#ffffff" size={0.34} />
        </group>
    );
}

// ─── Yorktown, October 1781: redoubts, rail fences, the York River ─────────
function TallShip({ position, rotation = 0, flag }: { position: [number, number, number]; rotation?: number; flag: string }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh position={[0, 1.2, 0]} castShadow>
                <boxGeometry args={[5, 2.6, 18]} />
                <meshStandardMaterial color="#3e2a1a" roughness={0.8} />
            </mesh>
            <mesh position={[0, 2.6, -7]}>
                <boxGeometry args={[5.2, 1.4, 4]} />
                <meshStandardMaterial color="#2c1e12" roughness={0.8} />
            </mesh>
            {[-5, 0, 5].map((z, i) => (
                <group key={z} position={[0, 0, z]}>
                    <mesh position={[0, 9, 0]}>
                        <cylinderGeometry args={[0.18, 0.24, 15, 6]} />
                        <meshStandardMaterial color="#4a3423" roughness={1} />
                    </mesh>
                    {[6, 10.5].map((y) => (
                        <mesh key={y} position={[0, y, 0.1]}>
                            <planeGeometry args={[i === 1 ? 7 : 5.6, 3.6]} />
                            <meshStandardMaterial color="#efe6d2" roughness={1} side={THREE.DoubleSide} />
                        </mesh>
                    ))}
                </group>
            ))}
            <mesh position={[0, 16.6, -5]}>
                <planeGeometry args={[2, 1.2]} />
                <meshStandardMaterial color={flag} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

function RailFence({ from, to }: { from: [number, number]; to: [number, number] }) {
    // zigzag "worm" fence: alternating angled rails
    const rails = useMemo(() => {
        const out: { x: number; z: number; rot: number }[] = [];
        const dx = to[0] - from[0];
        const dz = to[1] - from[1];
        const len = Math.hypot(dx, dz);
        const n = Math.floor(len / 3.2);
        const base = Math.atan2(dx, dz);
        for (let i = 0; i < n; i++) {
            const t = (i + 0.5) / n;
            const side = i % 2 ? 0.35 : -0.35;
            out.push({ x: from[0] + dx * t + Math.cos(base) * side, z: from[1] + dz * t - Math.sin(base) * side, rot: base + (i % 2 ? 0.35 : -0.35) });
        }
        return out;
    }, [from, to]);
    return (
        <instancedMesh
            ref={(m) => {
                if (!m) return;
                const d = new THREE.Object3D();
                let i = 0;
                rails.forEach((r) => {
                    for (const y of [0.45, 0.9, 1.35]) {
                        d.position.set(r.x, y, r.z);
                        d.rotation.set(0, r.rot, 0);
                        d.updateMatrix();
                        m.setMatrixAt(i++, d.matrix);
                    }
                });
                m.instanceMatrix.needsUpdate = true;
            }}
            args={[undefined, undefined, rails.length * 3]}
            castShadow
        >
            <boxGeometry args={[0.16, 0.14, 3.6]} />
            <meshStandardMaterial color="#7a6248" roughness={1} />
        </instancedMesh>
    );
}

function Redoubt({ position, flag }: { position: [number, number, number]; flag: string }) {
    return (
        <group position={position}>
            {/* earth ramparts in a ring with sharpened stakes (fraises) */}
            <mesh position={[0, 0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.9]} castShadow receiveShadow>
                <torusGeometry args={[9, 2.2, 6, 16]} />
                <meshStandardMaterial color="#7a6243" roughness={1} flatShading />
            </mesh>
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[9, 16]} />
                <meshStandardMaterial color="#6a5638" roughness={1} />
            </mesh>
            <instancedMesh
                ref={(m) => {
                    if (!m) return;
                    const d = new THREE.Object3D();
                    for (let i = 0; i < 28; i++) {
                        const a = (i / 28) * Math.PI * 2;
                        d.position.set(Math.cos(a) * 11.4, 2.2, Math.sin(a) * 11.4);
                        d.rotation.set(0, -a, Math.PI / 2 - 0.5);
                        d.rotateZ(0);
                        d.updateMatrix();
                        m.setMatrixAt(i, d.matrix);
                    }
                    m.instanceMatrix.needsUpdate = true;
                }}
                args={[undefined, undefined, 28]}
            >
                <coneGeometry args={[0.12, 2.6, 4]} />
                <meshStandardMaterial color="#8a6e4c" roughness={1} />
            </instancedMesh>
            <Banner position={[0, 0, 0]} color={flag} height={9} />
        </group>
    );
}

export function YorktownField() {
    return (
        <group>
            <Redoubt position={[-40, 0, -66]} flag={COLONIAL.redcoat} />
            <Redoubt position={[38, 0, -70]} flag={COLONIAL.redcoat} />
            {/* British works along the river: a long earthen line */}
            <mesh position={[0, 1.2, -84]} castShadow>
                <boxGeometry args={[170, 2.4, 5]} />
                <meshStandardMaterial color="#7a6243" roughness={1} flatShading />
            </mesh>
            {/* the York River with the trapped fleet */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, -130]}>
                <planeGeometry args={[700, 70]} />
                <meshStandardMaterial color="#3d6f86" roughness={0.12} metalness={0.4} />
            </mesh>
            <TallShip position={[-60, 0, -128]} rotation={0.3} flag={COLONIAL.redcoat} />
            <TallShip position={[-10, 0, -134]} rotation={-0.2} flag={COLONIAL.redcoat} />
            <TallShip position={[48, 0, -126]} rotation={0.15} flag={COLONIAL.redcoat} />
            <RailFence from={[-95, 30]} to={[-55, 90]} />
            <RailFence from={[60, 20]} to={[100, 85]} />
            <RailFence from={[-120, -20]} to={[-70, -10]} />
            <Tents position={[-20, 0, 74]} count={12} color="#ece5d4" />
            <Banner position={[-30, 0, 68]} color={COLONIAL.flagBlue} height={9} />
            <Banner position={[30, 0, 68]} color="#f3efe6" height={9} />
            <Fire position={[-12, 0, 80]} scale={1.1} />
            <Trees count={34} innerRadius={100} outerRadius={180} seed={41} />
            <Particles count={160} color="#efe2bf" size={0.26} />
        </group>
    );
}

// ─── Versailles, 1778: the court where Franklin bargains for a navy ────────
const STONE = '#e9dfc6';

function PalaceBlock({ width, depth, height, position, rotation = 0 }: { width: number; depth: number; height: number; position: [number, number, number]; rotation?: number }) {
    const m = colonialMats();
    const cols = Math.max(3, Math.round(width / 4.2));
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial color={STONE} roughness={0.85} />
            </mesh>
            {/* rusticated ground floor */}
            <mesh position={[0, 2.2, 0]}>
                <boxGeometry args={[width + 0.3, 4.4, depth + 0.3]} />
                <meshStandardMaterial color="#ddd0b1" roughness={0.9} />
            </mesh>
            {/* gilded cornice and slate mansard */}
            <mesh position={[0, height + 0.25, 0]}>
                <boxGeometry args={[width + 0.8, 0.5, depth + 0.8]} />
                <meshStandardMaterial color="#d6c49a" roughness={0.6} />
            </mesh>
            <mesh position={[0, height + 2.1, 0]} material={m.slate} castShadow>
                <boxGeometry args={[width - 1.6, 3.4, depth - 1.6]} />
            </mesh>
            <mesh position={[0, height + 3.9, 0]}>
                <boxGeometry args={[width - 1.4, 0.25, depth - 1.4]} />
                <meshStandardMaterial color="#d9a441" metalness={0.8} roughness={0.3} />
            </mesh>
            <WindowGrid width={width - 3} rows={3} cols={cols} y0={2.6} rowGap={4.6} z={depth / 2 + 0.05} />
        </group>
    );
}

export function Versailles() {
    const paving = useMemo(() => pavingTexture([12, 12]), []);
    // boxwood parterre: rows of low hedges either side of the central alley
    const hedges = useMemo(() => {
        const out: { x: number; z: number; w: number; d: number }[] = [];
        for (const side of [-1, 1]) {
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 2; c++) {
                    const cx = side * (12 + c * 14);
                    const cz = 14 + r * 12;
                    out.push({ x: cx, z: cz - 4, w: 11, d: 0.8 }, { x: cx, z: cz + 4, w: 11, d: 0.8 });
                    out.push({ x: cx - 5.2, z: cz, w: 0.8, d: 8.8 }, { x: cx + 5.2, z: cz, w: 0.8, d: 8.8 });
                    out.push({ x: cx, z: cz, w: 6, d: 0.6 }, { x: cx, z: cz, w: 0.6, d: 6 });
                }
            }
        }
        return out;
    }, []);
    const topiary = useMemo(() => {
        const out: [number, number][] = [];
        for (let i = 0; i < 9; i++) out.push([-6, 10 + i * 6], [6, 10 + i * 6]);
        return out;
    }, []);
    return (
        <group>
            {/* gravel forecourt + garden lawn */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, -14]} receiveShadow>
                <planeGeometry args={[90, 40]} />
                <meshStandardMaterial map={paving} color="#efe6d2" roughness={0.95} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 34]} receiveShadow>
                <planeGeometry args={[80, 56]} />
                <meshStandardMaterial color="#6f8f4a" roughness={1} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 34]} receiveShadow>
                <planeGeometry args={[8, 56]} />
                <meshStandardMaterial color="#e6dcc4" roughness={1} />
            </mesh>
            {/* the palace: corps de logis with two forward wings round the court */}
            <PalaceBlock width={64} depth={14} height={14} position={[0, 0, -42]} />
            <PalaceBlock width={30} depth={12} height={13} position={[-38, 0, -22]} rotation={Math.PI / 2} />
            <PalaceBlock width={30} depth={12} height={13} position={[38, 0, -22]} rotation={-Math.PI / 2} />
            {/* central pavilion with a gilded clock pediment */}
            <group position={[0, 0, -34.6]}>
                <mesh position={[0, 8.5, 0]} castShadow>
                    <boxGeometry args={[14, 17, 1.6]} />
                    <meshStandardMaterial color="#f1e8d2" roughness={0.8} />
                </mesh>
                {[-5, -1.7, 1.7, 5].map((x) => (
                    <mesh key={x} position={[x, 8, 1]} castShadow>
                        <cylinderGeometry args={[0.45, 0.5, 11, 12]} />
                        <meshStandardMaterial color="#f6efdc" roughness={0.6} />
                    </mesh>
                ))}
                <mesh position={[0, 15.2, 1.1]}>
                    <cylinderGeometry args={[1.4, 1.4, 0.3, 24]} />
                    <meshStandardMaterial color="#d9a441" metalness={0.85} roughness={0.25} />
                </mesh>
                {/* balcony of the king's bedchamber */}
                <mesh position={[0, 9.4, 1.6]}>
                    <boxGeometry args={[9, 0.4, 2]} />
                    <meshStandardMaterial color="#d9a441" metalness={0.8} roughness={0.3} />
                </mesh>
            </group>
            {/* gilded gate and railing closing the court */}
            <group position={[0, 0, -2]}>
                {Array.from({ length: 41 }, (_, i) => {
                    const x = -40 + i * 2;
                    if (Math.abs(x) < 5) return null;
                    return (
                        <mesh key={i} position={[x, 2.2, 0]}>
                            <boxGeometry args={[0.16, 4.4, 0.16]} />
                            <meshStandardMaterial color="#1e2126" metalness={0.6} roughness={0.4} />
                        </mesh>
                    );
                })}
                <mesh position={[0, 4.3, 0]}>
                    <boxGeometry args={[80, 0.25, 0.25]} />
                    <meshStandardMaterial color="#d9a441" metalness={0.85} roughness={0.25} />
                </mesh>
                {[-5, 5].map((x) => (
                    <mesh key={x} position={[x, 3.6, 0]} castShadow>
                        <boxGeometry args={[1.4, 7.2, 1.4]} />
                        <meshStandardMaterial color={STONE} roughness={0.8} />
                    </mesh>
                ))}
                <mesh position={[0, 6.8, 0]}>
                    <torusGeometry args={[3.2, 0.18, 8, 24, Math.PI]} />
                    <meshStandardMaterial color="#d9a441" metalness={0.85} roughness={0.25} />
                </mesh>
            </group>
            {/* boxwood parterre */}
            <instancedMesh
                ref={(mesh) => {
                    if (!mesh) return;
                    const d = new THREE.Object3D();
                    hedges.forEach((h, i) => {
                        d.position.set(h.x, 0.45, h.z);
                        d.scale.set(h.w, 0.9, h.d);
                        d.updateMatrix();
                        mesh.setMatrixAt(i, d.matrix);
                    });
                    mesh.instanceMatrix.needsUpdate = true;
                }}
                args={[undefined, undefined, hedges.length]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#2f5a2a" roughness={1} />
            </instancedMesh>
            {/* clipped yew cones along the alley */}
            {topiary.map(([x, z], i) => (
                <mesh key={i} position={[x, 2.2, z]} castShadow>
                    <coneGeometry args={[1.1, 4.4, 10]} />
                    <meshStandardMaterial color="#244a22" roughness={1} />
                </mesh>
            ))}
            {/* Latona fountain: tiered basin with a gilded figure group */}
            <group position={[0, 0, 40]}>
                <mesh position={[0, 0.4, 0]} receiveShadow>
                    <cylinderGeometry args={[8, 8.3, 0.8, 32]} />
                    <meshStandardMaterial color="#e3d8bf" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[7.5, 32]} />
                    <meshStandardMaterial color="#4f8aa0" roughness={0.1} metalness={0.4} />
                </mesh>
                <mesh position={[0, 1.6, 0]}>
                    <cylinderGeometry args={[3, 3.4, 1.6, 24]} />
                    <meshStandardMaterial color="#e3d8bf" roughness={0.8} />
                </mesh>
                <mesh position={[0, 3.4, 0]}>
                    <cylinderGeometry args={[0.7, 1, 2.2, 12]} />
                    <meshStandardMaterial color="#d9a441" metalness={0.85} roughness={0.25} />
                </mesh>
                <mesh position={[0, 4.9, 0]}>
                    <sphereGeometry args={[0.7, 14, 10]} />
                    <meshStandardMaterial color="#d9a441" metalness={0.85} roughness={0.25} />
                </mesh>
            </group>
            <Trees count={90} innerRadius={58} outerRadius={160} seed={23} />
            <Citizens count={30} radius={22} style="colonial" />
            <Banner position={[-8, 0, 2]} color="#1f3f99" height={9} />
            <Banner position={[8, 0, 2]} color="#f2efe6" height={9} />
            <Particles count={150} color="#f6e7c0" size={0.24} />
        </group>
    );
}

// ─── London, 1776: the King's house at the end of the Mall ─────────────────
/** Buckingham House as George III knew it: a red-brick Georgian mansion. */
function BuckinghamHouse({ position }: { position: [number, number, number] }) {
    const m = colonialMats();
    const pediment = useMemo(() => gableGeometry(11.4, 2.6, 1.4), []);
    return (
        <group position={position}>
            <mesh position={[0, 8, 0]} material={m.brick} castShadow receiveShadow>
                <boxGeometry args={[40, 16, 14]} />
            </mesh>
            <mesh position={[0, 16.3, 0]} material={m.trim}>
                <boxGeometry args={[40.8, 0.7, 14.8]} />
            </mesh>
            {/* balustrade + statues on the parapet */}
            <mesh position={[0, 17.3, 6.6]} material={m.trim}>
                <boxGeometry args={[40, 1.3, 0.5]} />
            </mesh>
            {[-14, -5, 5, 14].map((x) => (
                <mesh key={x} position={[x, 18.8, 6.6]} material={m.trim} castShadow>
                    <capsuleGeometry args={[0.4, 1.4, 4, 8]} />
                </mesh>
            ))}
            <WindowGrid width={36} rows={3} cols={9} y0={3.2} rowGap={4.8} z={7.05} />
            {/* pedimented portico */}
            <group position={[0, 0, 7.6]}>
                {[-4.5, -1.5, 1.5, 4.5].map((x) => (
                    <mesh key={x} position={[x, 5, 0]} material={m.trim} castShadow>
                        <cylinderGeometry args={[0.5, 0.55, 10, 12]} />
                    </mesh>
                ))}
                <mesh position={[0, 10.3, 0]} material={m.trim}>
                    <boxGeometry args={[11.4, 0.7, 1.6]} />
                </mesh>
                <mesh position={[0, 10.65, 0]} rotation={[0, Math.PI / 2, 0]} geometry={pediment} material={m.trim} castShadow />
            </group>
            {/* service wings with quadrant colonnades */}
            {[-1, 1].map((s) => (
                <group key={s} position={[s * 30, 0, 10]}>
                    <mesh position={[0, 5, 0]} material={m.brick} castShadow>
                        <boxGeometry args={[10, 10, 18]} />
                    </mesh>
                    <mesh position={[0, 10.4, 0]} material={m.slate}>
                        <boxGeometry args={[9.4, 1.2, 17.4]} />
                    </mesh>
                    <group rotation={[0, s * Math.PI / 2, 0]}>
                        <WindowGrid width={14} rows={2} cols={4} y0={2.8} rowGap={4} z={5.05} />
                    </group>
                </group>
            ))}
        </group>
    );
}

export function London() {
    const paving = useMemo(() => pavingTexture([10, 10]), []);
    return (
        <group>
            {/* forecourt and the tree-lined Mall leading to it */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 4]} receiveShadow>
                <planeGeometry args={[64, 40]} />
                <meshStandardMaterial map={paving} color="#d9d1c2" roughness={0.95} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 70]} receiveShadow>
                <planeGeometry args={[16, 100]} />
                <meshStandardMaterial color="#c9b996" roughness={1} />
            </mesh>
            <BuckinghamHouse position={[0, 0, -26]} />
            {/* avenue of plane trees along the Mall */}
            {Array.from({ length: 10 }, (_, i) => [-12, 12].map((x) => (
                <group key={`${i}${x}`} position={[x, 0, 28 + i * 9]}>
                    <mesh position={[0, 2.2, 0]} castShadow>
                        <cylinderGeometry args={[0.3, 0.4, 4.4, 8]} />
                        <meshStandardMaterial color="#4c3a2a" roughness={1} />
                    </mesh>
                    <mesh position={[0, 6, 0]} castShadow>
                        <icosahedronGeometry args={[2.8, 1]} />
                        <meshStandardMaterial color="#3d5a33" roughness={1} flatShading />
                    </mesh>
                </group>
            )))}
            {/* St Paul's dome on the skyline */}
            <group position={[-150, 0, -170]}>
                <mesh position={[0, 14, 0]} castShadow>
                    <boxGeometry args={[30, 28, 50]} />
                    <meshStandardMaterial color="#d8d3c6" roughness={0.9} />
                </mesh>
                <mesh position={[0, 34, 0]}>
                    <cylinderGeometry args={[10, 10, 12, 24]} />
                    <meshStandardMaterial color="#d8d3c6" roughness={0.9} />
                </mesh>
                <mesh position={[0, 40, 0]}>
                    <sphereGeometry args={[10, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#8a9a98" roughness={0.6} metalness={0.3} />
                </mesh>
                <mesh position={[0, 53, 0]}>
                    <cylinderGeometry args={[1.4, 1.8, 6, 10]} />
                    <meshStandardMaterial color="#d8d3c6" roughness={0.9} />
                </mesh>
            </group>
            {/* the Thames */}
            <mesh rotation={[-Math.PI / 2, 0, 0.25]} position={[0, 0.07, -150]}>
                <planeGeometry args={[700, 46]} />
                <meshStandardMaterial color="#4e6670" roughness={0.18} metalness={0.35} />
            </mesh>
            <Rowhouses seed={33} innerRadius={56} outerRadius={150} count={80} />
            <Trees count={24} innerRadius={40} outerRadius={70} seed={51} />
            <Citizens count={34} radius={26} style="colonial" />
            <Banner position={[-10, 0, -10]} color={COLONIAL.redcoat} height={9} />
            <Banner position={[10, 0, -10]} color="#1f3a7a" height={9} />
        </group>
    );
}

// ─── Outside Philadelphia, winter 1777–78: a field battle in the snow ──────
function StoneHouse({ position }: { position: [number, number, number] }) {
    const m = colonialMats();
    return (
        <group position={position}>
            <mesh position={[0, 6, 0]} castShadow receiveShadow>
                <boxGeometry args={[18, 12, 12]} />
                <meshStandardMaterial color="#9a9284" roughness={1} />
            </mesh>
            <mesh position={[0, 14, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1, 1, 0.66]} material={m.slate} castShadow>
                <coneGeometry args={[13.5, 4, 4]} />
            </mesh>
            <mesh position={[0, 14.4, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1.01, 0.9, 0.67]}>
                <coneGeometry args={[13.5, 4, 4]} />
                <meshStandardMaterial color="#eef3f6" roughness={1} />
            </mesh>
            <WindowGrid width={15} rows={2} cols={5} y0={3.4} rowGap={5} z={6.05} />
            {[-6, 6].map((x) => (
                <mesh key={x} position={[x, 14.5, 0]} material={m.brickDark}>
                    <boxGeometry args={[1.2, 3, 1.2]} />
                </mesh>
            ))}
        </group>
    );
}

export function PhiladelphiaWinter() {
    return (
        <group>
            <StoneHouse position={[0, 0, -96]} />
            <Rowhouses seed={8} innerRadius={120} outerRadius={180} count={60} />
            <RailFence from={[-100, 20]} to={[-70, 90]} />
            <RailFence from={[70, 10]} to={[105, 80]} />
            <RailFence from={[-110, -60]} to={[-70, -90]} />
            <RailFence from={[75, -55]} to={[115, -85]} />
            <Tents position={[-22, 0, 80]} count={10} color="#e8e2d2" />
            <Fire position={[-10, 0, 86]} scale={1.1} />
            <Banner position={[-30, 0, 70]} color={COLONIAL.flagBlue} height={9} />
            <Trees count={44} innerRadius={90} outerRadius={170} snowy seed={61} />
            <Particles count={500} snow color="#ffffff" size={0.32} />
        </group>
    );
}
