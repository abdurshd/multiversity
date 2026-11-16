/* Revolutionary France, 1789–1800: Paris and the Bastille, the Place de la
   Révolution under the Terror, the night at Varennes, the windmill of Valmy
   and the plain of Marengo. Same stylized-procedural approach as the other
   worlds: deterministic layouts, shared materials, instancing for repeats. */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Banner, Citizens, Fire, Particles, Tents, Trees, mulberry32 } from './parts';
import { pavingTexture } from './textures';
import { RailFence, WindowGrid, colonialMats } from './colonial';

const STONE = '#ddd2bb';
const STONE_DARK = '#6f6a61';
const SLATE = '#4a5059';
const TRICOLOR = { blue: '#22408f', white: '#f2efe6', red: '#c4232f' };

// ─── Paris townhouses: pale stone, slate mansards, tall windows ────────────
export function ParisHouses({
    seed = 3, innerRadius = 50, outerRadius = 130, count = 80, clear,
}: { seed?: number; innerRadius?: number; outerRadius?: number; count?: number; clear?: (x: number, z: number) => boolean }) {
    const m = colonialMats();
    const houses = useMemo(() => {
        const rand = mulberry32(seed);
        const out: { x: number; z: number; w: number; h: number; d: number; rot: number }[] = [];
        let guard = 0;
        while (out.length < count && guard++ < count * 25) {
            const a = rand() * Math.PI * 2;
            const r = innerRadius + rand() * (outerRadius - innerRadius);
            const x = Math.round((Math.cos(a) * r) / 9) * 9;
            const z = Math.round((Math.sin(a) * r) / 10) * 10;
            if (clear?.(x, z)) continue;
            if (out.some((o) => Math.abs(o.x - x) < 8.5 && Math.abs(o.z - z) < 9.5)) continue;
            out.push({ x, z, w: 8.4, h: 12 + rand() * 6, d: 9, rot: Math.abs(x) > Math.abs(z) ? Math.PI / 2 : 0 });
        }
        return out;
    }, [seed, innerRadius, outerRadius, count, clear]);

    const place = (mesh: THREE.InstancedMesh | null, part: 'body' | 'roof' | 'band') => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        houses.forEach((h, i) => {
            d.rotation.set(0, h.rot, 0);
            if (part === 'body') { d.position.set(h.x, h.h / 2, h.z); d.scale.set(h.w, h.h, h.d); }
            if (part === 'roof') { d.position.set(h.x, h.h + 1.6, h.z); d.scale.set(h.w * 0.9, 3.2, h.d * 0.86); }
            if (part === 'band') { d.position.set(h.x, h.h + 0.15, h.z); d.scale.set(h.w + 0.4, 0.3, h.d + 0.4); }
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    };
    const placeWindows = (mesh: THREE.InstancedMesh | null, outset: number) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        let i = 0;
        houses.forEach((h) => {
            const floors = Math.floor((h.h - 2) / 3.4);
            for (let f = 0; f < floors; f++) {
                for (let c = -1; c <= 1; c++) {
                    const facing = h.rot === 0 ? (h.z > 0 ? -1 : 1) : (h.x > 0 ? -1 : 1);
                    const off = h.d / 2 + 0.05 + outset;
                    const y = 2.4 + f * 3.4;
                    if (h.rot === 0) d.position.set(h.x + c * 2.5, y, h.z + facing * off);
                    else d.position.set(h.x + facing * off, y, h.z + c * 2.5);
                    d.rotation.set(0, h.rot, 0);
                    d.updateMatrix();
                    mesh.setMatrixAt(i++, d.matrix);
                }
            }
        });
        mesh.count = i;
        mesh.instanceMatrix.needsUpdate = true;
    };
    const max = houses.length * 15;
    return (
        <group>
            <instancedMesh ref={(mm) => place(mm, 'body')} args={[undefined, undefined, houses.length]} castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={STONE} roughness={0.9} />
            </instancedMesh>
            <instancedMesh ref={(mm) => place(mm, 'band')} args={[undefined, undefined, houses.length]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#c9bea6" roughness={0.8} />
            </instancedMesh>
            <instancedMesh ref={(mm) => place(mm, 'roof')} args={[undefined, undefined, houses.length]} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={SLATE} roughness={0.7} />
            </instancedMesh>
            <instancedMesh ref={(mm) => placeWindows(mm, 0)} args={[undefined, m.trim, max]}>
                <boxGeometry args={[1.2, 2.2, 0.12]} />
            </instancedMesh>
            <instancedMesh ref={(mm) => placeWindows(mm, 0.04)} args={[undefined, m.glass, max]}>
                <boxGeometry args={[0.9, 1.9, 0.12]} />
            </instancedMesh>
        </group>
    );
}

// ─── The Bastille: eight round towers and a curtain wall ───────────────────
function Bastille({ position }: { position: [number, number, number] }) {
    const towers = useMemo(() => {
        const out: [number, number][] = [];
        for (const z of [-10, 10]) for (const x of [-21, -7, 7, 21]) out.push([x, z]);
        return out;
    }, []);
    const stone = useMemo(() => new THREE.MeshStandardMaterial({ color: STONE_DARK, roughness: 1 }), []);
    return (
        <group position={position}>
            {/* moat */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
                <planeGeometry args={[66, 40]} />
                <meshStandardMaterial color="#3e5662" roughness={0.2} metalness={0.3} />
            </mesh>
            <mesh position={[0, 11, 0]} material={stone} castShadow receiveShadow>
                <boxGeometry args={[42, 22, 20]} />
            </mesh>
            {towers.map(([x, z]) => (
                <group key={`${x}${z}`} position={[x, 0, z]}>
                    <mesh position={[0, 12.5, 0]} material={stone} castShadow>
                        <cylinderGeometry args={[4.6, 5, 25, 18]} />
                    </mesh>
                    {/* machicolated crown */}
                    <mesh position={[0, 25.4, 0]} material={stone}>
                        <cylinderGeometry args={[5.2, 4.6, 1.6, 18]} />
                    </mesh>
                    {Array.from({ length: 9 }, (_, k) => {
                        const a = (k / 9) * Math.PI * 2;
                        return (
                            <mesh key={k} position={[Math.sin(a) * 4.8, 26.8, Math.cos(a) * 4.8]} material={stone}>
                                <boxGeometry args={[1.4, 1.4, 1]} />
                            </mesh>
                        );
                    })}
                    {/* arrow slits */}
                    {[8, 14, 20].map((y) => (
                        <mesh key={y} position={[0, y, 5.02]}>
                            <boxGeometry args={[0.35, 1.8, 0.1]} />
                            <meshStandardMaterial color="#1b1c1e" />
                        </mesh>
                    ))}
                </group>
            ))}
            {/* crenellations along the wall walk */}
            {Array.from({ length: 12 }, (_, k) => (
                <mesh key={k} position={[-19 + k * 3.45, 22.8, 10]} material={stone}>
                    <boxGeometry args={[1.6, 1.6, 0.8]} />
                </mesh>
            ))}
            {/* gate and drawbridge */}
            <mesh position={[0, 4, 10.1]}>
                <boxGeometry args={[6, 8, 0.3]} />
                <meshStandardMaterial color="#2b2118" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.5, 16]} rotation={[-0.12, 0, 0]} castShadow>
                <boxGeometry args={[6, 0.5, 11]} />
                <meshStandardMaterial color="#5d4630" roughness={1} />
            </mesh>
            <Banner position={[0, 22, 0]} color="#f2efe6" height={7} />
        </group>
    );
}

export function ParisBastille() {
    const paving = useMemo(() => pavingTexture([12, 12]), []);
    const clear = useMemo(() => (x: number, z: number) => (Math.abs(x) < 46 && z > -80) || (z > 30 && Math.abs(x) < 70), []);
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, -10]} receiveShadow>
                <planeGeometry args={[100, 130]} />
                <meshStandardMaterial map={paving} color="#cfc5b0" roughness={0.95} />
            </mesh>
            <Bastille position={[0, 0, -50]} />
            <ParisHouses clear={clear} innerRadius={40} outerRadius={150} count={110} />
            {/* barricade of carts and barrels, with the Invalides cannon the crowd seized */}
            {[-14, -6, 6, 14].map((x, i) => (
                <group key={x} position={[x, 0, -18]} rotation={[0, i * 0.4 - 0.6, 0]}>
                    <mesh position={[0, 0.9, 0]} castShadow>
                        <boxGeometry args={[3.4, 1.2, 1.8]} />
                        <meshStandardMaterial color="#6b5034" roughness={1} />
                    </mesh>
                    <mesh position={[1.2, 1.9, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <cylinderGeometry args={[0.6, 0.6, 1.2, 12]} />
                        <meshStandardMaterial color="#7a5a3a" roughness={1} />
                    </mesh>
                </group>
            ))}
            <Citizens count={70} radius={30} style="colonial" />
            <Fire position={[-24, 0, 6]} scale={1.1} />
            <Fire position={[22, 0, 0]} scale={1.1} />
            <Banner position={[-10, 0, 12]} color={TRICOLOR.blue} height={8} />
            <Banner position={[0, 0, 14]} color={TRICOLOR.white} height={8} />
            <Banner position={[10, 0, 12]} color={TRICOLOR.red} height={8} />
            <Particles count={220} color="#cfc4b0" size={0.32} />
        </group>
    );
}

// ─── Place de la Révolution, 1793: the guillotine ──────────────────────────
function Guillotine({ position }: { position: [number, number, number] }) {
    const blade = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        // the blade hangs at the top and shivers in the wind
        if (blade.current) blade.current.position.y = 8.6 + Math.sin(clock.elapsedTime * 3) * 0.02;
    });
    const wood = '#5a2a22';
    return (
        <group position={position}>
            {/* scaffold platform with steps */}
            <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
                <boxGeometry args={[8, 2.4, 8]} />
                <meshStandardMaterial color="#6b4a33" roughness={1} />
            </mesh>
            {[0, 1, 2].map((k) => (
                <mesh key={k} position={[0, 0.4 + k * 0.8, 5 + (2 - k) * 0.8]} castShadow>
                    <boxGeometry args={[3, 0.8, 0.8]} />
                    <meshStandardMaterial color="#6b4a33" roughness={1} />
                </mesh>
            ))}
            {[-0.9, 0.9].map((x) => (
                <mesh key={x} position={[x, 7, 0]} castShadow>
                    <boxGeometry args={[0.4, 9.4, 0.4]} />
                    <meshStandardMaterial color={wood} roughness={0.8} />
                </mesh>
            ))}
            <mesh position={[0, 11.8, 0]} castShadow>
                <boxGeometry args={[2.6, 0.5, 0.6]} />
                <meshStandardMaterial color={wood} roughness={0.8} />
            </mesh>
            <mesh ref={blade} position={[0, 8.6, 0]} rotation={[0, 0, 0.35]}>
                <boxGeometry args={[1.5, 1.1, 0.08]} />
                <meshStandardMaterial color="#9aa3ac" metalness={0.9} roughness={0.25} />
            </mesh>
            {/* lunette and bench */}
            <mesh position={[0, 3.3, 0]}>
                <boxGeometry args={[1.8, 0.7, 0.3]} />
                <meshStandardMaterial color={wood} roughness={0.8} />
            </mesh>
            <mesh position={[0, 2.9, -1.8]}>
                <boxGeometry args={[0.8, 0.4, 3.4]} />
                <meshStandardMaterial color={wood} roughness={0.8} />
            </mesh>
        </group>
    );
}

export function ParisTerror() {
    const paving = useMemo(() => pavingTexture([14, 14]), []);
    const clear = useMemo(() => (x: number, z: number) => Math.abs(x) < 60 && z > -70 && z < 60, []);
    const m = colonialMats();
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} receiveShadow>
                <planeGeometry args={[130, 130]} />
                <meshStandardMaterial map={paving} color="#c7beab" roughness={0.95} />
            </mesh>
            <Guillotine position={[0, 0, -10]} />
            {/* plaster Liberty where the King's statue stood */}
            <group position={[-26, 0, 6]}>
                <mesh position={[0, 3, 0]} castShadow>
                    <boxGeometry args={[4, 6, 4]} />
                    <meshStandardMaterial color="#e6dfcf" roughness={0.9} />
                </mesh>
                <mesh position={[0, 8.2, 0]} castShadow>
                    <capsuleGeometry args={[0.9, 3, 6, 10]} />
                    <meshStandardMaterial color="#efe9db" roughness={0.9} />
                </mesh>
                <mesh position={[0.9, 10.4, 0]} rotation={[0, 0, -0.4]}>
                    <cylinderGeometry args={[0.1, 0.1, 3.2, 6]} />
                    <meshStandardMaterial color="#efe9db" roughness={0.9} />
                </mesh>
                <mesh position={[1.5, 11.9, 0]}>
                    <coneGeometry args={[0.45, 0.8, 10]} />
                    <meshStandardMaterial color={TRICOLOR.red} roughness={0.8} />
                </mesh>
            </group>
            {/* the twin colonnaded palaces on the north side */}
            {[-28, 28].map((x) => (
                <group key={x} position={[x, 0, -62]}>
                    <mesh position={[0, 9, 0]} castShadow receiveShadow>
                        <boxGeometry args={[44, 18, 12]} />
                        <meshStandardMaterial color={STONE} roughness={0.85} />
                    </mesh>
                    <mesh position={[0, 19, 0]}>
                        <boxGeometry args={[44.6, 1.4, 12.6]} />
                        <meshStandardMaterial color="#cdbf9f" roughness={0.8} />
                    </mesh>
                    {Array.from({ length: 12 }, (_, k) => (
                        <mesh key={k} position={[-19.5 + k * 3.55, 11.5, 6.8]} castShadow>
                            <cylinderGeometry args={[0.55, 0.6, 10, 12]} />
                            <meshStandardMaterial color="#efe7d4" roughness={0.6} />
                        </mesh>
                    ))}
                    <mesh position={[0, 3, 6.4]} material={m.trim}>
                        <boxGeometry args={[44, 6, 1]} />
                    </mesh>
                    <WindowGrid width={40} rows={1} cols={12} y0={11.5} rowGap={0} z={6.05} />
                </group>
            ))}
            {/* Tuileries garden trees on the east side */}
            {Array.from({ length: 8 }, (_, i) => [48, 58].map((x) => (
                <group key={`${i}${x}`} position={[x, 0, -40 + i * 11]}>
                    <mesh position={[0, 2, 0]} castShadow>
                        <cylinderGeometry args={[0.3, 0.4, 4, 8]} />
                        <meshStandardMaterial color="#4c3a2a" roughness={1} />
                    </mesh>
                    <mesh position={[0, 6, 0]} castShadow>
                        <icosahedronGeometry args={[3, 1]} />
                        <meshStandardMaterial color="#45603a" roughness={1} flatShading />
                    </mesh>
                </group>
            )))}
            <ParisHouses seed={11} clear={clear} innerRadius={70} outerRadius={160} count={100} />
            <Citizens count={80} radius={26} style="colonial" />
            <Banner position={[-6, 0, -4]} color={TRICOLOR.blue} height={9} />
            <Banner position={[6, 0, -4]} color={TRICOLOR.red} height={9} />
            <Banner position={[-30, 0, -20]} color={TRICOLOR.white} height={9} />
            <Particles count={140} color="#d4ccbd" size={0.26} />
        </group>
    );
}

// ─── Varennes, night of 21 June 1791 ───────────────────────────────────────
function Berline({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh position={[0, 2.6, 0]} castShadow>
                <boxGeometry args={[2.6, 2.4, 5]} />
                <meshStandardMaterial color="#1f3b2c" roughness={0.6} />
            </mesh>
            <mesh position={[0, 3.95, 0]}>
                <boxGeometry args={[2.8, 0.3, 5.2]} />
                <meshStandardMaterial color="#d9a441" metalness={0.6} roughness={0.35} />
            </mesh>
            {[[-1.4, -1.8], [1.4, -1.8], [-1.4, 1.8], [1.4, 1.8]].map(([x, z]) => (
                <mesh key={`${x}${z}`} position={[x, 1.1, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[1.1, 1.1, 0.2, 16]} />
                    <meshStandardMaterial color="#c79a3a" roughness={0.6} />
                </mesh>
            ))}
            {/* windows, lit from inside */}
            {[-1, 1].map((s) => (
                <mesh key={s} position={[s * 1.31, 2.9, 0]} rotation={[0, s * Math.PI / 2, 0]}>
                    <planeGeometry args={[2.4, 1.1]} />
                    <meshStandardMaterial color="#ffd08a" emissive="#ffb24a" emissiveIntensity={0.8} />
                </mesh>
            ))}
            {/* team of horses */}
            {[-0.9, 0.9].map((x) =>
                [5, 8].map((z) => (
                    <group key={`${x}${z}`} position={[x, 0, z]}>
                        <mesh position={[0, 1.6, 0]} castShadow>
                            <capsuleGeometry args={[0.5, 1.6, 4, 8]} />
                            <meshStandardMaterial color="#4a3324" roughness={0.9} />
                        </mesh>
                        <mesh position={[0, 2.3, 1.2]} rotation={[0.6, 0, 0]}>
                            <capsuleGeometry args={[0.28, 0.8, 4, 8]} />
                            <meshStandardMaterial color="#4a3324" roughness={0.9} />
                        </mesh>
                        {[-0.3, 0.3].map((lz) => [-0.3, 0.3].map((lx) => (
                            <mesh key={`${lx}${lz}`} position={[lx, 0.55, lz * 2]}>
                                <cylinderGeometry args={[0.1, 0.08, 1.1, 6]} />
                                <meshStandardMaterial color="#3a281c" />
                            </mesh>
                        )))}
                    </group>
                )),
            )}
        </group>
    );
}

export function Varennes() {
    const clear = useMemo(() => (x: number, z: number) => Math.abs(x) < 12 || (Math.abs(x) < 40 && Math.abs(z) < 30), []);
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
                <planeGeometry args={[16, 300]} />
                <meshStandardMaterial color="#7a6d58" roughness={1} />
            </mesh>
            <ParisHouses seed={21} clear={clear} innerRadius={20} outerRadius={70} count={34} />
            <Berline position={[0, 0, -2]} rotation={Math.PI} />
            {/* the archway under the church tower where the carriage was stopped */}
            <group position={[0, 0, -18]}>
                {[-5.5, 5.5].map((x) => (
                    <mesh key={x} position={[x, 6, 0]} castShadow>
                        <boxGeometry args={[3, 12, 4]} />
                        <meshStandardMaterial color="#8f877a" roughness={1} />
                    </mesh>
                ))}
                <mesh position={[0, 13, 0]} castShadow>
                    <boxGeometry args={[14, 4, 4]} />
                    <meshStandardMaterial color="#8f877a" roughness={1} />
                </mesh>
                <mesh position={[0, 18, 0]} castShadow>
                    <boxGeometry args={[6, 6, 4]} />
                    <meshStandardMaterial color="#8f877a" roughness={1} />
                </mesh>
                <mesh position={[0, 22.5, 0]}>
                    <coneGeometry args={[4.4, 4, 4]} />
                    <meshStandardMaterial color={SLATE} roughness={0.7} />
                </mesh>
            </group>
            {/* overturned cart blocking the bridge */}
            <mesh position={[-2, 1, -12]} rotation={[0, 0.5, 1.2]} castShadow>
                <boxGeometry args={[3, 1.2, 4]} />
                <meshStandardMaterial color="#5d4630" roughness={1} />
            </mesh>
            <Fire position={[-7, 0, 6]} scale={1.2} />
            <Fire position={[7, 0, 10]} scale={1.1} />
            <Fire position={[-6, 0, -10]} scale={0.9} />
            <Citizens count={50} radius={20} style="colonial" />
            <Banner position={[6, 0, -8]} color={TRICOLOR.red} height={8} />
            <Trees count={40} innerRadius={70} outerRadius={150} seed={5} />
            <Particles count={120} color="#ffcf8a" size={0.22} />
        </group>
    );
}

// ─── Valmy, 20 September 1792: the windmill ridge ──────────────────────────
function Windmill({ position }: { position: [number, number, number] }) {
    const sails = useRef<THREE.Group>(null);
    useFrame((_, dt) => {
        if (sails.current) sails.current.rotation.z += dt * 0.5;
    });
    return (
        <group position={position}>
            <mesh position={[0, 2, 0]} receiveShadow>
                <cylinderGeometry args={[12, 18, 4, 24]} />
                <meshStandardMaterial color="#7d8a4f" roughness={1} />
            </mesh>
            <mesh position={[0, 8, 0]} castShadow>
                <cylinderGeometry args={[2.6, 3.4, 8, 12]} />
                <meshStandardMaterial color="#e2d8c2" roughness={0.95} />
            </mesh>
            <mesh position={[0, 13.4, 0]} castShadow>
                <boxGeometry args={[5, 3.6, 5.6]} />
                <meshStandardMaterial color="#6b5034" roughness={1} />
            </mesh>
            <mesh position={[0, 16, 0]} rotation={[0, 0, 0]}>
                <coneGeometry args={[4, 2.4, 4]} />
                <meshStandardMaterial color="#5a4330" roughness={1} />
            </mesh>
            <group ref={sails} position={[0, 13.4, 3.1]}>
                {[0, 1, 2, 3].map((k) => (
                    <group key={k} rotation={[0, 0, (k * Math.PI) / 2]}>
                        <mesh position={[0, 4.4, 0]} castShadow>
                            <boxGeometry args={[1.6, 8, 0.1]} />
                            <meshStandardMaterial color="#eae2cf" roughness={0.9} side={THREE.DoubleSide} />
                        </mesh>
                        <mesh position={[-0.9, 4.4, 0.05]}>
                            <boxGeometry args={[0.14, 8.6, 0.14]} />
                            <meshStandardMaterial color="#4e3a26" roughness={1} />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    );
}

export function ValmyField() {
    return (
        <group>
            <Windmill position={[-54, 0, -6]} />
            <Banner position={[48, 4, 92]} color={TRICOLOR.blue} height={9} />
            <Banner position={[64, 4, 92]} color={TRICOLOR.red} height={9} />
            {/* Prussian camp beyond the far ridge */}
            <Tents position={[0, 0, -118]} count={16} color="#e4e0d4" />
            <Banner position={[-20, 0, -104]} color="#1f2a44" height={9} />
            <RailFence from={[-110, 20]} to={[-70, 80]} />
            <RailFence from={[80, -30]} to={[120, 20]} />
            <RailFence from={[-120, -50]} to={[-80, -80]} />
            <Trees count={40} innerRadius={100} outerRadius={180} seed={71} />
            {/* the morning fog that hid the armies until noon */}
            <Particles count={260} color="#e8ecef" size={0.6} speed={0.25} />
        </group>
    );
}

// ─── Marengo, 14 June 1800: the Po plain under the Alps ────────────────────
export function MarengoField() {
    const poplars = useMemo(() => {
        const out: [number, number][] = [];
        for (let i = 0; i < 18; i++) out.push([-120 + i * 14, 100], [-130 + i * 15, -110]);
        for (let i = 0; i < 10; i++) out.push([110, -60 + i * 14]);
        return out;
    }, []);
    return (
        <group>
            {/* the Alps on the horizon */}
            {[[-260, -480, 120], [-120, -520, 150], [40, -500, 135], [190, -470, 125], [330, -520, 140]].map(([x, z, h]) => (
                <group key={x} position={[x, 0, z]}>
                    <mesh position={[0, h / 2, 0]}>
                        <coneGeometry args={[h * 0.9, h, 7]} />
                        <meshStandardMaterial color="#8794a3" roughness={1} flatShading fog={false} />
                    </mesh>
                    <mesh position={[0, h * 0.82, 0]}>
                        <coneGeometry args={[h * 0.33, h * 0.37, 7]} />
                        <meshStandardMaterial color="#f2f5f8" roughness={1} flatShading fog={false} />
                    </mesh>
                </group>
            ))}
            {/* rows of poplars along the drainage ditches */}
            {poplars.map(([x, z], i) => (
                <group key={i} position={[x, 0, z]}>
                    <mesh position={[0, 1.5, 0]}>
                        <cylinderGeometry args={[0.25, 0.3, 3, 6]} />
                        <meshStandardMaterial color="#4c3a2a" roughness={1} />
                    </mesh>
                    <mesh position={[0, 8, 0]} castShadow>
                        <coneGeometry args={[1.6, 12, 8]} />
                        <meshStandardMaterial color="#4f6e36" roughness={1} />
                    </mesh>
                </group>
            ))}
            {/* the Bormida river behind the Austrian start line */}
            <mesh rotation={[-Math.PI / 2, 0, 0.15]} position={[0, 0.07, -140]}>
                <planeGeometry args={[700, 26]} />
                <meshStandardMaterial color="#557d88" roughness={0.15} metalness={0.35} />
            </mesh>
            {/* the farmhouse of Marengo */}
            <group position={[-70, 0, 70]}>
                <mesh position={[0, 4, 0]} castShadow receiveShadow>
                    <boxGeometry args={[20, 8, 10]} />
                    <meshStandardMaterial color="#d9c49c" roughness={1} />
                </mesh>
                <mesh position={[0, 9.2, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1, 1, 0.5]} castShadow>
                    <coneGeometry args={[15, 3, 4]} />
                    <meshStandardMaterial color="#a8573a" roughness={0.9} />
                </mesh>
            </group>
            <Tents position={[20, 0, 86]} count={10} color="#ece5d4" />
            <Banner position={[-30, 0, 74]} color={TRICOLOR.blue} height={9} />
            <Banner position={[30, 0, 74]} color={TRICOLOR.red} height={9} />
            <Particles count={150} color="#efe2bf" size={0.26} />
        </group>
    );
}
