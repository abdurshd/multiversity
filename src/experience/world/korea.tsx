/* The Korean War, 1945–1953: Seoul after liberation, the Pusan Perimeter on
   the Naktong, the sea wall at Incheon, the frozen Chosin Reservoir, and the
   armistice huts at Panmunjom. Same stylized-procedural approach as the
   other worlds. */
import { useMemo } from 'react';
import * as THREE from 'three';
import { Particles, Trees, mulberry32 } from './parts';
import { WindowGrid } from './colonial';
import { Flag } from './civilwar';
import { Craters } from './greatwar';
import { Jeep, LandingCraft, Sandbags, Sea, SmokeColumn, Soldiers, TankProp, Warplane, Warship } from './ww2';

const TILE = '#3f4448';
const DANCHEONG = '#2f6b5a';
const PILLAR = '#9a2f22';

// ─── Shared props ───────────────────────────────────────────────────────────

/** A Korean hip-and-gable roof with gently upturned corners. */
function GiwaRoof({ width, depth, height = 3, y = 0, color = TILE }: { width: number; depth: number; height?: number; y?: number; color?: string }) {
    const geom = useMemo(() => {
        // a hipped roof whose ridge is shorter than the eaves, then corners lifted
        const g = new THREE.CylinderGeometry(0.62, 1, 1, 4, 3, false, Math.PI / 4);
        g.scale(width * 0.74, height, depth * 0.74);
        const pos = g.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const z = pos.getZ(i);
            const yy = pos.getY(i);
            if (yy < 0) {
                // lift the four corners of the eaves, more the further out they are
                const corner = Math.min(Math.abs(x) / (width / 2), 1) * Math.min(Math.abs(z) / (depth / 2), 1);
                pos.setY(i, yy + corner * height * 0.45);
            }
        }
        g.computeVertexNormals();
        return g;
    }, [width, depth, height]);
    return (
        <mesh geometry={geom} position={[0, y + height / 2, 0]} castShadow receiveShadow>
            <meshStandardMaterial color={color} roughness={0.8} flatShading />
        </mesh>
    );
}

/** A small hanok house: stone base, white walls between dark timbers, tiled roof. */
function Hanok({ position, rotation = 0, w = 9, d = 6 }: { position: [number, number, number]; rotation?: number; w?: number; d?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh receiveShadow position={[0, 0.4, 0]}>
                <boxGeometry args={[w + 1, 0.8, d + 1]} />
                <meshStandardMaterial color="#9a9488" roughness={1} />
            </mesh>
            <mesh castShadow receiveShadow position={[0, 2.1, 0]}>
                <boxGeometry args={[w, 2.6, d]} />
                <meshStandardMaterial color="#eee8da" roughness={0.9} />
            </mesh>
            {[-w / 2, -w / 6, w / 6, w / 2].map((x) => (
                <mesh key={x} position={[x, 2.1, d / 2 + 0.05]}>
                    <boxGeometry args={[0.3, 2.6, 0.1]} />
                    <meshStandardMaterial color="#5a3e2a" roughness={0.9} />
                </mesh>
            ))}
            <GiwaRoof width={w + 3} depth={d + 3} height={2.4} y={3.3} />
        </group>
    );
}

/** Gwanghwamun: the stone gate of Gyeongbokgung with three arches and a two-tier pavilion. */
function PalaceGate({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh castShadow receiveShadow position={[0, 4, 0]}>
                <boxGeometry args={[34, 8, 12]} />
                <meshStandardMaterial color="#bdb6a6" roughness={0.95} />
            </mesh>
            {[-9, 0, 9].map((x) => (
                <mesh key={x} position={[x, 2.6, 6.05]}>
                    <planeGeometry args={[x === 0 ? 4.4 : 3.6, 5.2]} />
                    <meshStandardMaterial color="#1c1a18" />
                </mesh>
            ))}
            {/* pavilion: red pillars, green-painted beams, two tiled roofs */}
            <group position={[0, 8, 0]}>
                {[-11, -5.5, 0, 5.5, 11].map((x) => [-4, 4].map((z) => (
                    <mesh key={`${x}${z}`} castShadow position={[x, 2.2, z]}>
                        <cylinderGeometry args={[0.45, 0.5, 4.4, 10]} />
                        <meshStandardMaterial color={PILLAR} roughness={0.7} />
                    </mesh>
                )))}
                <mesh position={[0, 4.6, 0]}>
                    <boxGeometry args={[24, 1, 10]} />
                    <meshStandardMaterial color={DANCHEONG} roughness={0.7} />
                </mesh>
                <GiwaRoof width={30} depth={15} height={3.4} y={4.6} />
                <mesh castShadow position={[0, 9.4, 0]}>
                    <boxGeometry args={[18, 2.6, 7]} />
                    <meshStandardMaterial color={DANCHEONG} roughness={0.7} />
                </mesh>
                <GiwaRoof width={26} depth={12} height={4} y={10.4} />
            </group>
        </group>
    );
}

/** The domed Japanese Government-General Building behind the gate (1926–1995). */
function GovernmentGeneral({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh castShadow receiveShadow position={[0, 10, 0]}>
                <boxGeometry args={[110, 20, 26]} />
                <meshStandardMaterial color="#d9d3c4" roughness={0.9} />
            </mesh>
            <WindowGrid width={104} rows={4} cols={34} y0={2.5} rowGap={4.4} z={13.05} />
            <mesh castShadow position={[0, 25, 0]}>
                <cylinderGeometry args={[9, 10, 10, 20]} />
                <meshStandardMaterial color="#d9d3c4" roughness={0.9} />
            </mesh>
            <mesh castShadow position={[0, 30, 0]}>
                <sphereGeometry args={[9, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#6d7c78" roughness={0.6} metalness={0.3} />
            </mesh>
        </group>
    );
}

/** Rice paddies: flat flooded terraces separated by low earth bunds (instanced). */
function Paddies({ x0, x1, z0, z1, seed = 3 }: { x0: number; x1: number; z0: number; z1: number; seed?: number }) {
    const cells = useMemo(() => {
        const rand = mulberry32(seed);
        const out: { x: number; z: number; c: number }[] = [];
        for (let x = x0; x < x1; x += 16) for (let z = z0; z < z1; z += 12) out.push({ x: x + 8, z: z + 6, c: rand() });
        return out;
    }, [x0, x1, z0, z1, seed]);
    const colors = useMemo(() => ['#7d9a52', '#8aa45a', '#6f8c4c', '#9aa868'].map((c) => new THREE.Color(c)), []);
    const fill = (mesh: THREE.InstancedMesh | null) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        cells.forEach((c, i) => {
            d.position.set(c.x, 0.06, c.z);
            d.rotation.set(-Math.PI / 2, 0, 0);
            d.scale.set(15, 11, 1);
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
            mesh.setColorAt(i, colors[Math.floor(c.c * colors.length)]);
        });
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };
    return (
        <instancedMesh ref={fill} args={[undefined, undefined, cells.length]} receiveShadow>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial roughness={0.5} metalness={0.1} />
        </instancedMesh>
    );
}

/** Steep wooded ridges around the edge of the playfield. */
function Ridges({ count, inner, outer, seed = 5, color = '#5d7044', snow = false }: { count: number; inner: number; outer: number; seed?: number; color?: string; snow?: boolean }) {
    const ridges = useMemo(() => {
        const rand = mulberry32(seed);
        return Array.from({ length: count }, () => {
            const a = rand() * Math.PI * 2;
            const r = inner + rand() * (outer - inner);
            return { x: Math.cos(a) * r, z: Math.sin(a) * r, s: 18 + rand() * 26, h: 0.6 + rand() * 0.7, rot: rand() * 3 };
        });
    }, [count, inner, outer, seed]);
    return (
        <group>
            {ridges.map((r, i) => (
                <mesh key={i} position={[r.x, 0, r.z]} rotation={[0, r.rot, 0]} scale={[r.s * 1.5, r.s * r.h, r.s]} castShadow receiveShadow>
                    <coneGeometry args={[1, 1, 7, 2]} />
                    <meshStandardMaterial color={snow ? (i % 2 ? '#e8ecef' : '#d6dde3') : color} roughness={1} flatShading />
                </mesh>
            ))}
        </group>
    );
}

// ─── Seoul, 1945 ────────────────────────────────────────────────────────────
export function Seoul1945() {
    const hanok = useMemo(() => {
        const rand = mulberry32(17);
        const out: [number, number, number][] = [];
        let guard = 0;
        while (out.length < 34 && guard++ < 600) {
            const x = (rand() - 0.5) * 240;
            const z = 10 + rand() * 110;
            if (Math.abs(x) < 26 && z < 70) continue;
            if (out.some(([ox, oz]) => Math.hypot(ox - x, oz - z) < 14)) continue;
            out.push([x, z, Math.round(rand() * 2) * (Math.PI / 2)]);
        }
        return out;
    }, []);
    return (
        <group>
            {/* Sejongno: the wide avenue running up to the palace gate */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 30]} receiveShadow>
                <planeGeometry args={[30, 110]} />
                <meshStandardMaterial color="#8d877a" roughness={1} />
            </mesh>
            <PalaceGate position={[0, 0, -26]} />
            <GovernmentGeneral position={[0, 0, -80]} />
            {hanok.map(([x, z, r], i) => <Hanok key={i} position={[x, 0, z]} rotation={r} />)}
            {[-60, 60].map((x) => <Hanok key={x} position={[x, 0, -20]} rotation={x < 0 ? Math.PI / 2 : -Math.PI / 2} w={12} d={7} />)}
            {/* Bugaksan behind the palace */}
            <mesh position={[20, 0, -230]} scale={[110, 70, 60]} castShadow>
                <coneGeometry args={[1, 1, 8, 2]} />
                <meshStandardMaterial color="#5f7346" roughness={1} flatShading />
            </mesh>
            <Ridges count={16} inner={200} outer={300} seed={18} />
            <Jeep position={[-10, 0, 16]} rotation={-0.4} />
            <Soldiers spots={[[14, 2, -0.3], [-14, 4, 0.4]]} cloth="#6b6a48" helmet="m1" />
            <Flag position={[-8, 8, -24]} kind="korea" height={6} />
            <Flag position={[8, 8, -24]} kind="korea" height={6} />
            <Flag position={[-22, 0, 14]} kind="us-1917" height={9} />
            <Flag position={[24, 0, 12]} kind="korea" height={9} />
            <Trees count={40} innerRadius={60} outerRadius={150} seed={19} />
            <Particles count={140} color="#efe6cf" size={0.5} speed={0.3} />
        </group>
    );
}

// ─── The Pusan Perimeter, August–September 1950 ─────────────────────────────
export function Busan1950() {
    const river = useMemo(() => {
        const g = new THREE.PlaneGeometry(700, 16, 80, 1);
        g.rotateX(-Math.PI / 2);
        const pos = g.attributes.position;
        for (let i = 0; i < pos.count; i++) pos.setZ(i, pos.getZ(i) + Math.sin(pos.getX(i) * 0.02) * 6);
        return g;
    }, []);
    return (
        <group>
            {/* the Naktong river between the lines; the UN holds the near (+z) bank */}
            <mesh geometry={river} position={[0, 0.1, -8]} receiveShadow>
                <meshStandardMaterial color="#5a7480" roughness={0.25} metalness={0.3} />
            </mesh>
            <Paddies x0={-140} x1={140} z0={-110} z1={-24} seed={4} />
            <Paddies x0={-140} x1={-50} z0={10} z1={40} seed={5} />
            <Paddies x0={50} x1={140} z0={10} z1={40} seed={6} />
            <Sandbags from={[-60, 62]} to={[-20, 62]} />
            <Sandbags from={[20, 64]} to={[60, 64]} />
            <TankProp position={[-74, 0, 84]} rotation={Math.PI} helmet="m1" color="#5d6440" />
            <TankProp position={[70, 0, 88]} rotation={Math.PI + 0.2} helmet="m1" color="#5d6440" />
            <TankProp position={[30, 0, -70]} rotation={0.3} helmet="kepi" color="#5d6a4a" wrecked />
            <Craters count={40} area={200} seed={44} clear={(_x, z) => Math.abs(z + 8) < 14} />
            <Flag position={[-8, 0, 74]} kind="un" height={9} />
            <Flag position={[8, 0, 74]} kind="korea" height={9} />
            <Ridges count={30} inner={150} outer={280} seed={45} />
            <Trees count={50} innerRadius={110} outerRadius={180} seed={46} />
            <Warplane radius={110} height={60} speed={0.24} phase={0} color="#3d4f66" />
            <Warplane radius={110} height={62} speed={0.24} phase={0.3} color="#3d4f66" />
            <SmokeColumn position={[-50, 0, -120]} height={40} />
            <Particles count={180} color="#e2d8bc" size={0.5} speed={0.3} />
        </group>
    );
}

// ─── Incheon, 15 September 1950 ─────────────────────────────────────────────
export function Incheon1950() {
    return (
        <group>
            <Sea color="#4a6470" />
            {/* the harbour city and its sea wall, with the mudflats exposed at low tide */}
            <mesh position={[0, 0.5, -60]} receiveShadow>
                <boxGeometry args={[600, 1, 30]} />
                <meshStandardMaterial color="#6e6658" roughness={1} />
            </mesh>
            <mesh position={[0, 3, -76]} castShadow receiveShadow>
                <boxGeometry args={[600, 6, 4]} />
                <meshStandardMaterial color="#8d887c" roughness={1} />
            </mesh>
            <mesh position={[0, 3, -150]} receiveShadow>
                <boxGeometry args={[700, 6, 140]} />
                <meshStandardMaterial color="#7d8a5c" roughness={1} />
            </mesh>
            <group position={[0, 6, -100]}>
                {Array.from({ length: 44 }, (_, i) => {
                    const row = i % 2;
                    const w = 8 + ((i * 7) % 5) * 2;
                    const h = 6 + ((i * 11) % 6) * 2.5;
                    const shades = ['#b9b1a0', '#a59d8c', '#c4bba8', '#9a9384', '#b0a48e'];
                    return (
                        <mesh key={i} castShadow receiveShadow position={[-215 + Math.floor(i / 2) * 20 + row * 9, h / 2, row * 16 + ((i * 5) % 3) * 2]}>
                            <boxGeometry args={[w, h, 9 + row * 2]} />
                            <meshStandardMaterial color={shades[i % 5]} roughness={0.9} />
                        </mesh>
                    );
                })}
                {/* a church spire and a harbour crane over the rooftops */}
                <mesh castShadow position={[30, 14, 24]}>
                    <coneGeometry args={[3, 12, 4]} />
                    <meshStandardMaterial color="#8a5a4a" roughness={0.9} />
                </mesh>
                <mesh castShadow position={[-60, 10, 8]}>
                    <boxGeometry args={[1.2, 20, 1.2]} />
                    <meshStandardMaterial color="#6a5a48" />
                </mesh>
                <mesh castShadow position={[-54, 19.5, 8]}>
                    <boxGeometry args={[14, 1, 1]} />
                    <meshStandardMaterial color="#6a5a48" />
                </mesh>
            </group>
            {/* Wolmido island, taken first at dawn */}
            <mesh position={[-90, 0, -20]} scale={[40, 22, 30]} castShadow>
                <coneGeometry args={[1, 1, 8, 2]} />
                <meshStandardMaterial color="#5f7346" roughness={1} flatShading />
            </mesh>
            {/* the invasion fleet: cruisers, destroyers and landing craft running in */}
            <Warship position={[-80, 0, 140]} rotation={Math.PI / 2} length={80} />
            <Warship position={[60, 0, 170]} rotation={Math.PI / 2 + 0.1} length={70} />
            <Warship position={[150, 0, 120]} rotation={Math.PI / 2 - 0.1} length={55} />
            {[[-30, 30], [0, 22], [30, 34], [60, 26], [-60, 40]].map(([x, z], i) => (
                <LandingCraft key={i} position={[x, 0.4, z]} rotation={(i % 2 ? 1 : -1) * 0.06} />
            ))}
            <Flag position={[0, 1, 60]} kind="un" height={8} />
            <SmokeColumn position={[-40, 6, -110]} height={50} />
            <SmokeColumn position={[50, 6, -120]} height={40} />
            <Warplane radius={120} height={60} speed={0.22} phase={0} color="#3d4f66" center={[0, -60]} />
            <Warplane radius={120} height={64} speed={0.22} phase={0.25} color="#3d4f66" center={[0, -60]} />
            <Ridges count={14} inner={260} outer={340} seed={51} />
        </group>
    );
}

// ─── The Chosin Reservoir, November–December 1950 ───────────────────────────
export function Chosin1950() {
    return (
        <group>
            {/* the frozen reservoir beyond the enemy side */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[40, 0.08, -170]} receiveShadow>
                <circleGeometry args={[110, 40]} />
                <meshStandardMaterial color="#cfdde6" roughness={0.15} metalness={0.2} />
            </mesh>
            {/* the single road south, and the Marines' perimeter at Hagaru-ri */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 40]} receiveShadow>
                <planeGeometry args={[8, 220]} />
                <meshStandardMaterial color="#b9bcbc" roughness={1} />
            </mesh>
            <Sandbags from={[-50, 60]} to={[-14, 60]} />
            <Sandbags from={[14, 62]} to={[50, 62]} />
            {[[-30, 84], [-18, 90], [22, 86], [34, 92]].map(([x, z], i) => (
                <group key={i} position={[x, 0, z]}>
                    <mesh castShadow position={[0, 1.5, 0]} scale={[1, 1, 1.4]}>
                        <coneGeometry args={[3, 3, 4]} />
                        <meshStandardMaterial color="#6a6e52" roughness={1} />
                    </mesh>
                </group>
            ))}
            <TankProp position={[-60, 0, 86]} rotation={Math.PI} helmet="m1" color="#5d6440" />
            <Jeep position={[8, 0, 76]} rotation={0.2} />
            <Flag position={[0, 0, 80]} kind="us-1917" height={9} />
            <Flag position={[-12, 0, 82]} kind="un" height={8} />
            <Ridges count={40} inner={120} outer={300} seed={61} snow />
            <Trees count={60} innerRadius={90} outerRadius={200} seed={62} snowy />
            <Warplane radius={100} height={50} speed={0.26} phase={0} color="#2f4a6e" />
            <Particles count={900} area={200} height={60} color="#ffffff" size={0.35} speed={0.8} snow />
        </group>
    );
}

// ─── Panmunjom, 27 July 1953 ────────────────────────────────────────────────
export function Panmunjom1953() {
    return (
        <group>
            {/* the hall built for the signing, flanked by the delegations' huts */}
            <group position={[0, 0, -24]}>
                <mesh castShadow receiveShadow position={[0, 3.5, 0]}>
                    <boxGeometry args={[30, 7, 16]} />
                    <meshStandardMaterial color="#d6cdb4" roughness={0.9} />
                </mesh>
                <GiwaRoof width={34} depth={20} height={4} y={7} color="#5a5e58" />
                <WindowGrid width={26} rows={1} cols={8} y0={2.6} rowGap={3} z={8.05} />
            </group>
            {[-34, 34].map((x) => (
                <group key={x} position={[x, 0, -18]}>
                    <mesh castShadow receiveShadow position={[0, 2.2, 0]}>
                        <boxGeometry args={[10, 4.4, 7]} />
                        <meshStandardMaterial color="#5e8fc6" roughness={0.6} />
                    </mesh>
                    <mesh position={[0, 4.6, 0]}>
                        <boxGeometry args={[10.6, 0.4, 7.6]} />
                        <meshStandardMaterial color="#4a76a8" roughness={0.6} />
                    </mesh>
                </group>
            ))}
            {/* the line itself: a low concrete kerb across the open ground */}
            <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[400, 0.3, 0.6]} />
                <meshStandardMaterial color="#cfcfc8" roughness={1} />
            </mesh>
            <Flag position={[-20, 0, -8]} kind="un" height={9} />
            <Paddies x0={-150} x1={-40} z0={20} z1={90} seed={71} />
            <Paddies x0={40} x1={150} z0={20} z1={90} seed={72} />
            <Ridges count={24} inner={160} outer={280} seed={73} />
            <Trees count={40} innerRadius={70} outerRadius={150} seed={74} />
            <Particles count={120} color="#efe6cf" size={0.5} speed={0.3} />
        </group>
    );
}
