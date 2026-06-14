/* Reusable stylized-procedural building blocks for the 3D experience worlds. */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { brickTexture, domeTexture, feltTexture, mosaicTexture, softSprite } from './textures';
import { buildCitizenHead, buildCitizenRobe, figureMaterial } from './figures';

// ─── Palette ───────────────────────────────────────────────────────────────
export const PALETTE = {
    sand: '#d8b98a',
    sandDark: '#bfa071',
    brick: '#c9a876',
    brickDark: '#a8895c',
    lapis: '#1d4f91',
    turquoise: '#2ab3a6',
    gold: '#e0a93f',
    ivory: '#f1e4c8',
    wood: '#7a5a3a',
    crimson: '#a32638',
};

// ─── Deterministic PRNG ────────────────────────────────────────────────────
export function mulberry32(seed: number) {
    let a = seed >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ─── Shared textured materials (memo-cached at module level) ───────────────
let _mats: {
    brick: THREE.MeshStandardMaterial;
    brickDark: THREE.MeshStandardMaterial;
    stone: THREE.MeshStandardMaterial;
    mosaic: THREE.MeshStandardMaterial;
    mosaicGlow: THREE.MeshStandardMaterial;
} | null = null;

export function sharedMats() {
    if (_mats) return _mats;
    _mats = {
        brick: new THREE.MeshStandardMaterial({
            map: brickTexture(PALETTE.brick, '#9a7e54', [3, 2]), roughness: 0.92,
        }),
        brickDark: new THREE.MeshStandardMaterial({
            map: brickTexture(PALETTE.brickDark, '#8a6e48', [4, 2]), roughness: 0.95,
        }),
        stone: new THREE.MeshStandardMaterial({
            map: brickTexture('#a09484', '#7e7466', [5, 2], 13), roughness: 0.95,
        }),
        mosaic: new THREE.MeshStandardMaterial({
            map: mosaicTexture([2, 1]), roughness: 0.4,
            emissive: new THREE.Color('#1d4f91'), emissiveIntensity: 0.18,
        }),
        mosaicGlow: new THREE.MeshStandardMaterial({
            map: mosaicTexture([3, 1], 8), roughness: 0.35,
            emissive: new THREE.Color('#2ab3a6'), emissiveIntensity: 0.3,
        }),
    };
    return _mats;
}

// ─── Tile band: mosaic strip around buildings ──────────────────────────────
export function TileBand({
    width,
    height = 0.8,
    depth = 0.15,
    position = [0, 0, 0] as [number, number, number],
    glow = false,
}: {
    width: number;
    height?: number;
    depth?: number;
    position?: [number, number, number];
    glow?: boolean;
}) {
    const mats = sharedMats();
    return (
        <mesh position={position} material={glow ? mats.mosaicGlow : mats.mosaic}>
            <boxGeometry args={[width, height, depth]} />
        </mesh>
    );
}

// ─── Dome (drum with windows + glazed cap) ────────────────────────────────
export function Dome({
    radius = 4,
    drumHeight = 2.5,
    position = [0, 0, 0] as [number, number, number],
    color = PALETTE.turquoise,
    onion = false,
}: {
    radius?: number;
    drumHeight?: number;
    position?: [number, number, number];
    color?: string;
    onion?: boolean;
}) {
    const mats = sharedMats();
    const glaze = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                map: domeTexture(color, [8, 4]),
                roughness: 0.32,
                metalness: 0.12,
                emissive: new THREE.Color(color),
                emissiveIntensity: 0.12,
            }),
        [color]
    );
    const onionGeom = useMemo(() => {
        if (!onion) return null;
        const pts: THREE.Vector2[] = [];
        for (let i = 0; i <= 24; i++) {
            const t = i / 24;
            const ang = t * Math.PI * 0.55;
            const bulge = 1 + 0.18 * Math.sin(t * Math.PI);
            pts.push(new THREE.Vector2(Math.cos(ang) * radius * bulge, Math.sin(ang) * radius * 1.25));
        }
        pts.push(new THREE.Vector2(0.001, radius * 1.32));
        return new THREE.LatheGeometry(pts, 32);
    }, [onion, radius]);

    const windows = useMemo(() => {
        const out: [number, number, number, number][] = [];
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2;
            out.push([Math.cos(a) * radius * 0.92, drumHeight / 2, Math.sin(a) * radius * 0.92, -a + Math.PI / 2]);
        }
        return out;
    }, [radius, drumHeight]);

    return (
        <group position={position}>
            {/* drum */}
            <mesh position={[0, drumHeight / 2, 0]} material={mats.brick}>
                <cylinderGeometry args={[radius * 0.92, radius * 0.92, drumHeight, 24]} />
            </mesh>
            {/* arched drum windows */}
            {windows.map(([x, y, z, ry], i) => (
                <group key={i} position={[x, y, z]} rotation={[0, ry, 0]}>
                    <mesh>
                        <boxGeometry args={[radius * 0.22, drumHeight * 0.55, 0.12]} />
                        <meshStandardMaterial color="#1c140c" roughness={1} />
                    </mesh>
                    <mesh position={[0, drumHeight * 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[radius * 0.11, radius * 0.11, 0.12, 10, 1, false, 0, Math.PI]} />
                        <meshStandardMaterial color="#1c140c" roughness={1} />
                    </mesh>
                </group>
            ))}
            {/* mosaic collar */}
            <mesh position={[0, drumHeight - 0.3, 0]} material={sharedMats().mosaic}>
                <cylinderGeometry args={[radius * 0.95, radius * 0.95, 0.7, 24]} />
            </mesh>
            {/* cap */}
            {onion && onionGeom ? (
                <mesh geometry={onionGeom} position={[0, drumHeight, 0]} material={glaze} />
            ) : (
                <mesh position={[0, drumHeight, 0]} material={glaze}>
                    <sphereGeometry args={[radius, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
                </mesh>
            )}
            {/* gold finial: stacked spheres + crescent hint */}
            <group position={[0, drumHeight + radius * (onion ? 1.35 : 1.0), 0]}>
                <mesh position={[0, 0.45, 0]}>
                    <cylinderGeometry args={[0.06, 0.1, 0.9, 6]} />
                    <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.45} metalness={0.85} roughness={0.25} />
                </mesh>
                <mesh position={[0, 0.95, 0]}>
                    <sphereGeometry args={[0.16, 8, 6]} />
                    <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.5} metalness={0.85} roughness={0.25} />
                </mesh>
                <mesh position={[0, 1.25, 0]}>
                    <torusGeometry args={[0.18, 0.035, 6, 14, Math.PI * 1.4]} />
                    <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.5} metalness={0.85} roughness={0.25} />
                </mesh>
            </group>
        </group>
    );
}

// ─── Minaret ───────────────────────────────────────────────────────────────
export function Minaret({
    height = 16,
    position = [0, 0, 0] as [number, number, number],
}: {
    height?: number;
    position?: [number, number, number];
}) {
    const mats = sharedMats();
    return (
        <group position={position}>
            {/* base plinth */}
            <mesh position={[0, 0.6, 0]} material={mats.brickDark}>
                <cylinderGeometry args={[1.9, 2.1, 1.2, 10]} />
            </mesh>
            <mesh position={[0, height / 2, 0]} material={mats.brick}>
                <cylinderGeometry args={[1.05, 1.5, height, 14]} />
            </mesh>
            {/* mosaic rings */}
            {[0.3, 0.55, 0.78].map((t) => (
                <mesh key={t} position={[0, height * t, 0]} material={mats.mosaicGlow}>
                    <cylinderGeometry args={[1.5 - 0.45 * t + 0.1, 1.5 - 0.45 * t + 0.1, 0.6, 14]} />
                </mesh>
            ))}
            {/* muqarnas-corbel balcony */}
            <mesh position={[0, height - 0.4, 0]} material={mats.brickDark}>
                <cylinderGeometry args={[1.35, 1.0, 0.8, 14]} />
            </mesh>
            <mesh position={[0, height + 0.15, 0]} material={mats.brick}>
                <cylinderGeometry args={[1.55, 1.55, 0.35, 14]} />
            </mesh>
            {/* balustrade posts */}
            {Array.from({ length: 10 }, (_, i) => {
                const a = (i / 10) * Math.PI * 2;
                return (
                    <mesh key={i} position={[Math.cos(a) * 1.4, height + 0.65, Math.sin(a) * 1.4]}>
                        <boxGeometry args={[0.12, 0.6, 0.12]} />
                        <meshStandardMaterial color={PALETTE.ivory} roughness={0.8} />
                    </mesh>
                );
            })}
            {/* lantern pavilion */}
            <mesh position={[0, height + 1.3, 0]} material={mats.brick}>
                <cylinderGeometry args={[0.9, 1.0, 1.3, 10]} />
            </mesh>
            <Dome radius={1.05} drumHeight={0.4} position={[0, height + 1.95, 0]} />
        </group>
    );
}

// ─── Iwan portal (pishtaq with recessed arch + muqarnas steps) ─────────────
export function IwanPortal({
    width = 12,
    height = 14,
    depth = 4,
    position = [0, 0, 0] as [number, number, number],
    rotation = [0, 0, 0] as [number, number, number],
}: {
    width?: number;
    height?: number;
    depth?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
}) {
    const mats = sharedMats();
    const frameGeom = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(-width / 2, 0);
        shape.lineTo(width / 2, 0);
        shape.lineTo(width / 2, height);
        shape.lineTo(-width / 2, height);
        shape.closePath();
        const archW = width * 0.62;
        const archH = height * 0.72;
        const hole = new THREE.Path();
        hole.moveTo(-archW / 2, 0);
        hole.lineTo(-archW / 2, archH - archW / 2);
        hole.absarc(0, archH - archW / 2, archW / 2, Math.PI, 0, true);
        hole.lineTo(archW / 2, 0);
        hole.closePath();
        shape.holes.push(hole);
        return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
    }, [width, height, depth]);

    const archW = width * 0.62;
    const archH = height * 0.72;

    return (
        <group position={position} rotation={rotation}>
            <mesh geometry={frameGeom} position={[0, 0, -depth / 2]} material={mats.brick} castShadow />
            {/* mosaic frame border around the portal face */}
            <TileBand width={width} height={0.9} position={[0, height - 0.5, depth / 2 + 0.04]} glow />
            <TileBand width={0.8} height={height - 1} depth={0.1} position={[-width / 2 + 0.5, height / 2, depth / 2 + 0.04]} />
            <TileBand width={0.8} height={height - 1} depth={0.1} position={[width / 2 - 0.5, height / 2, depth / 2 + 0.04]} />
            {/* muqarnas: stepped corbels stacked inside the arch crown */}
            {[0, 1, 2].map((i) => (
                <mesh key={i} position={[0, archH - archW / 2 + i * 0.5, -depth * 0.18 - i * 0.35]} material={mats.brickDark}>
                    <boxGeometry args={[archW * (0.85 - i * 0.18), 0.5, 0.6]} />
                </mesh>
            ))}
            {/* recessed interior wall */}
            <mesh position={[0, height * 0.3, -depth * 0.3]}>
                <boxGeometry args={[archW * 0.96, height * 0.62, 0.3]} />
                <meshStandardMaterial color="#241a10" roughness={1} />
            </mesh>
            {/* carved wooden double door */}
            <group position={[0, 0, -depth * 0.12]}>
                {[-1, 1].map((s) => (
                    <mesh key={s} position={[s * archW * 0.15, height * 0.16, 0]}>
                        <boxGeometry args={[archW * 0.28, height * 0.32, 0.18]} />
                        <meshStandardMaterial color="#5e4426" roughness={0.85} />
                    </mesh>
                ))}
                <mesh position={[0, height * 0.16, 0.05]}>
                    <boxGeometry args={[0.12, height * 0.32, 0.12]} />
                    <meshStandardMaterial color={PALETTE.gold} metalness={0.6} roughness={0.4} />
                </mesh>
            </group>
        </group>
    );
}

// ─── Madrasah (portal + arcaded wings + corner minarets + dome) ────────────
export function Madrasah({
    position = [0, 0, 0] as [number, number, number],
    rotation = [0, 0, 0] as [number, number, number],
    width = 26,
    domeColor = PALETTE.turquoise,
}: {
    position?: [number, number, number];
    rotation?: [number, number, number];
    width?: number;
    domeColor?: string;
}) {
    const mats = sharedMats();
    const wing = (width - 12) / 2;
    return (
        <group position={position} rotation={rotation}>
            <IwanPortal width={12} height={15} depth={5} />
            {[-1, 1].map((s) => (
                <group key={s}>
                    <mesh position={[s * (6 + wing / 2), 4.5, -1]} material={mats.brick} castShadow>
                        <boxGeometry args={[wing, 9, 8]} />
                    </mesh>
                    <TileBand width={wing} height={0.7} position={[s * (6 + wing / 2), 8.2, 3.06]} glow />
                    {/* two-storey arcade of arched niches */}
                    {[0.22, 0.5, 0.78].map((t) =>
                        [2.2, 5.6].map((y) => (
                            <group key={`${t}-${y}`} position={[s * (6 + wing * t), y, 3.06]}>
                                <mesh>
                                    <boxGeometry args={[1.5, 2.6, 0.18]} />
                                    <meshStandardMaterial color="#2b2014" roughness={1} />
                                </mesh>
                                <mesh position={[0, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                                    <cylinderGeometry args={[0.75, 0.75, 0.18, 10, 1, false, 0, Math.PI]} />
                                    <meshStandardMaterial color="#2b2014" roughness={1} />
                                </mesh>
                            </group>
                        ))
                    )}
                </group>
            ))}
            {/* rear courtyard block + roofline crenellation */}
            <mesh position={[0, 3.6, -7]} material={mats.brickDark} castShadow>
                <boxGeometry args={[width, 7.2, 9]} />
            </mesh>
            {Array.from({ length: 9 }, (_, i) => (
                <mesh key={i} position={[(i - 4) * (width / 9), 7.6, -2.6]} material={mats.brickDark}>
                    <boxGeometry args={[width / 18, 0.8, 0.5]} />
                </mesh>
            ))}
            <Minaret height={17} position={[-width / 2 + 1, 0, 2.5]} />
            <Minaret height={17} position={[width / 2 - 1, 0, 2.5]} />
            <Dome radius={3.6} drumHeight={2.4} position={[width * 0.22, 7.2, -7]} color={domeColor} />
        </group>
    );
}

// ─── Great mosque (Bibi-Khanym scale) ─────────────────────────────────────
export function GreatMosque({
    position = [0, 0, 0] as [number, number, number],
    rotation = [0, 0, 0] as [number, number, number],
}: {
    position?: [number, number, number];
    rotation?: [number, number, number];
}) {
    const mats = sharedMats();
    return (
        <group position={position} rotation={rotation}>
            <IwanPortal width={16} height={20} depth={6} />
            <mesh position={[0, 5, -10]} material={mats.brick} castShadow>
                <boxGeometry args={[30, 10, 16]} />
            </mesh>
            <TileBand width={30} height={1} position={[0, 9.4, -1.94]} glow />
            {/* flanking side domes */}
            <Dome radius={2.6} drumHeight={1.8} position={[-10, 10, -10]} color={PALETTE.turquoise} />
            <Dome radius={2.6} drumHeight={1.8} position={[10, 10, -10]} color={PALETTE.turquoise} />
            <Dome radius={5.6} drumHeight={4} position={[0, 10, -10]} color={PALETTE.lapis} onion />
            <Minaret height={22} position={[-9.5, 0, 3]} />
            <Minaret height={22} position={[9.5, 0, 3]} />
        </group>
    );
}

// ─── Mausoleum with onion dome (Gur-e-Amir) ────────────────────────────────
export function Mausoleum({
    position = [0, 0, 0] as [number, number, number],
    rotation = [0, 0, 0] as [number, number, number],
}: {
    position?: [number, number, number];
    rotation?: [number, number, number];
}) {
    const mats = sharedMats();
    return (
        <group position={position} rotation={rotation}>
            <mesh position={[0, 4, 0]} material={mats.brick} castShadow>
                <cylinderGeometry args={[7, 7.4, 8, 8]} />
            </mesh>
            <mesh position={[0, 7.8, 0]} material={mats.mosaicGlow}>
                <cylinderGeometry args={[7.15, 7.1, 1.4, 8]} />
            </mesh>
            <Dome radius={4.6} drumHeight={3.5} position={[0, 8.4, 0]} color={PALETTE.lapis} onion />
            <IwanPortal width={8} height={10} depth={3} position={[0, 0, 8]} />
        </group>
    );
}

// ─── City walls: polygon ring with crenellated towers ─────────────────────
export function CityWalls({ radius = 95, gateAngle = Math.PI / 2 }: { radius?: number; gateAngle?: number }) {
    const mats = sharedMats();
    const segments = 26;
    const items = useMemo(() => {
        const out: { pos: [number, number, number]; rotY: number; len: number; isGate: boolean }[] = [];
        for (let i = 0; i < segments; i++) {
            const a0 = (i / segments) * Math.PI * 2;
            const a1 = ((i + 1) / segments) * Math.PI * 2;
            const mid = (a0 + a1) / 2;
            const isGate = Math.abs(((mid - gateAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI) > Math.PI - 0.13;
            const len = 2 * radius * Math.sin(Math.PI / segments) + 0.5;
            out.push({
                pos: [Math.cos(mid) * radius, 0, Math.sin(mid) * radius],
                rotY: -mid + Math.PI / 2,
                len,
                isGate,
            });
        }
        return out;
    }, [radius, gateAngle]);

    return (
        <group>
            {items.map((seg, i) =>
                seg.isGate ? (
                    <group key={i} position={seg.pos} rotation={[0, seg.rotY, 0]}>
                        {[-1, 1].map((s) => (
                            <group key={s} position={[s * seg.len * 0.32, 0, 0]}>
                                <mesh position={[0, 6, 0]} material={mats.stone} castShadow>
                                    <cylinderGeometry args={[3, 3.6, 12, 10]} />
                                </mesh>
                                <mesh position={[0, 12.4, 0]} material={mats.stone}>
                                    <cylinderGeometry args={[3.5, 3.5, 0.8, 10]} />
                                </mesh>
                                {Array.from({ length: 8 }, (_, k) => {
                                    const a = (k / 8) * Math.PI * 2;
                                    return (
                                        <mesh key={k} position={[Math.cos(a) * 3.2, 13.2, Math.sin(a) * 3.2]} material={mats.stone}>
                                            <boxGeometry args={[0.8, 0.8, 0.8]} />
                                        </mesh>
                                    );
                                })}
                            </group>
                        ))}
                        {/* gate arch */}
                        <mesh position={[0, 8.5, 0]} material={mats.stone}>
                            <boxGeometry args={[seg.len * 0.5, 3, 3]} />
                        </mesh>
                        <mesh position={[0, 7.1, 0]} rotation={[0, 0, 0]}>
                            <cylinderGeometry args={[seg.len * 0.16, seg.len * 0.16, 3.2, 12, 1, false, 0, Math.PI]} />
                            <meshStandardMaterial color="#241a10" roughness={1} />
                        </mesh>
                    </group>
                ) : (
                    <group key={i} position={seg.pos} rotation={[0, seg.rotY, 0]}>
                        <mesh position={[0, 3.5, 0]} material={mats.stone} castShadow>
                            <boxGeometry args={[seg.len, 7, 2.6]} />
                        </mesh>
                        {[-0.38, -0.13, 0.13, 0.38].map((t) => (
                            <mesh key={t} position={[t * seg.len, 7.5, 0]} material={mats.stone}>
                                <boxGeometry args={[seg.len * 0.12, 1, 2.6]} />
                            </mesh>
                        ))}
                        {i % 4 === 0 && (
                            <>
                                <mesh position={[0, 5.5, 0]} material={mats.stone} castShadow>
                                    <cylinderGeometry args={[2.2, 2.7, 11, 9]} />
                                </mesh>
                                <mesh position={[0, 11.2, 0]} material={mats.stone}>
                                    <cylinderGeometry args={[2.6, 2.6, 0.6, 9]} />
                                </mesh>
                            </>
                        )}
                    </group>
                )
            )}
        </group>
    );
}

// ─── Instanced houses with flat roofs + window cubes ──────────────────────
export function Houses({
    count = 140,
    innerRadius = 42,
    outerRadius = 88,
    seed = 7,
}: {
    count?: number;
    innerRadius?: number;
    outerRadius?: number;
    seed?: number;
}) {
    const data = useMemo(() => {
        const rand = mulberry32(seed);
        const dummy = new THREE.Object3D();
        const base = [new THREE.Color('#cdb087'), new THREE.Color('#bfa071'), new THREE.Color('#d9c49a')];
        const bodies: { m: THREE.Matrix4; c: THREE.Color }[] = [];
        const trims: THREE.Matrix4[] = [];
        const domes: THREE.Matrix4[] = [];
        for (let i = 0; i < count; i++) {
            const a = rand() * Math.PI * 2;
            const r = innerRadius + Math.sqrt(rand()) * (outerRadius - innerRadius);
            const w = 3 + rand() * 4;
            const h = 2.5 + rand() * 3.5;
            const d = 3 + rand() * 4;
            const rot = rand() * Math.PI;
            dummy.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r);
            dummy.rotation.set(0, rot, 0);
            dummy.scale.set(w, h, d);
            dummy.updateMatrix();
            bodies.push({ m: dummy.matrix.clone(), c: base[Math.floor(rand() * base.length)] });
            // roof parapet trim
            dummy.scale.set(w * 1.06, 0.25, d * 1.06);
            dummy.position.y = h + 0.1;
            dummy.updateMatrix();
            trims.push(dummy.matrix.clone());
            // some houses get a small dome
            if (rand() > 0.72) {
                dummy.scale.setScalar(Math.min(w, d) * 0.32);
                dummy.position.y = h + 0.2;
                dummy.updateMatrix();
                domes.push(dummy.matrix.clone());
            }
        }
        return { bodies, trims, domes };
    }, [count, innerRadius, outerRadius, seed]);

    return (
        <group>
            <instancedMesh
                ref={(m) => {
                    if (!m) return;
                    data.bodies.forEach((t, i) => {
                        m.setMatrixAt(i, t.m);
                        m.setColorAt(i, t.c);
                    });
                    m.instanceMatrix.needsUpdate = true;
                    if (m.instanceColor) m.instanceColor.needsUpdate = true;
                }}
                args={[undefined, undefined, data.bodies.length]}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial roughness={0.95} />
            </instancedMesh>
            <instancedMesh
                ref={(m) => {
                    if (!m) return;
                    data.trims.forEach((t, i) => m.setMatrixAt(i, t));
                    m.instanceMatrix.needsUpdate = true;
                }}
                args={[undefined, undefined, data.trims.length]}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#a8895c" roughness={1} />
            </instancedMesh>
            <instancedMesh
                ref={(m) => {
                    if (!m) return;
                    data.domes.forEach((t, i) => m.setMatrixAt(i, t));
                    m.instanceMatrix.needsUpdate = true;
                }}
                args={[undefined, undefined, Math.max(1, data.domes.length)]}
                count={data.domes.length}
            >
                <sphereGeometry args={[1, 10, 7, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#cbb795" roughness={0.9} />
            </instancedMesh>
        </group>
    );
}

// ─── Bazaar: stalls with awnings, goods and carpets ───────────────────────
export function Bazaar({ position = [0, 0, 0] as [number, number, number] }) {
    const stalls = useMemo(() => {
        const rand = mulberry32(11);
        const colors = [PALETTE.crimson, PALETTE.gold, PALETTE.turquoise, '#7d5ba6'];
        return Array.from({ length: 10 }, (_, i) => ({
            x: (i % 5) * 6 - 12,
            z: Math.floor(i / 5) * 7 - 3.5,
            color: colors[Math.floor(rand() * colors.length)],
            rot: (rand() - 0.5) * 0.4,
            goods: Array.from({ length: 4 }, () => ({
                gx: (rand() - 0.5) * 2.6,
                gz: (rand() - 0.5) * 1.4,
                s: 0.18 + rand() * 0.22,
                c: colors[Math.floor(rand() * colors.length)],
                round: rand() > 0.5,
            })),
        }));
    }, []);
    return (
        <group position={position}>
            {stalls.map((s, i) => (
                <group key={i} position={[s.x, 0, s.z]} rotation={[0, s.rot, 0]}>
                    {/* counter */}
                    <mesh position={[0, 0.6, 0]} castShadow>
                        <boxGeometry args={[3.4, 1.2, 2.2]} />
                        <meshStandardMaterial color={PALETTE.wood} roughness={1} />
                    </mesh>
                    {/* goods on the counter */}
                    {s.goods.map((g, k) => (
                        <mesh key={k} position={[g.gx, 1.2 + g.s / 2, g.gz]}>
                            {g.round ? <sphereGeometry args={[g.s, 7, 6]} /> : <boxGeometry args={[g.s * 1.6, g.s, g.s * 1.2]} />}
                            <meshStandardMaterial color={g.c} roughness={0.85} />
                        </mesh>
                    ))}
                    {/* posts + scalloped awning */}
                    {[-1.5, 1.5].map((x) =>
                        [-1, 1].map((z) => (
                            <mesh key={`${x}${z}`} position={[x, 1.6, z * 0.9]}>
                                <cylinderGeometry args={[0.07, 0.07, 2.2, 6]} />
                                <meshStandardMaterial color={PALETTE.wood} />
                            </mesh>
                        ))
                    )}
                    <mesh position={[0, 2.72, 0]} rotation={[0, 0, 0.05]}>
                        <boxGeometry args={[4.2, 0.1, 3]} />
                        <meshStandardMaterial color={s.color} roughness={0.85} side={THREE.DoubleSide} />
                    </mesh>
                    {[-1.6, -0.8, 0, 0.8, 1.6].map((x) => (
                        <mesh key={x} position={[x, 2.62, 1.5]}>
                            <sphereGeometry args={[0.22, 6, 5, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
                            <meshStandardMaterial color={s.color} roughness={0.85} side={THREE.DoubleSide} />
                        </mesh>
                    ))}
                    {/* carpet in front */}
                    <mesh position={[0, 0.03, 2]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[2.6, 1.6]} />
                        <meshStandardMaterial map={mosaicTexture([1, 1], 40 + i)} roughness={0.95} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// ─── Trees: deciduous canopies / snowy conifers ────────────────────────────
export function Trees({
    count = 40,
    innerRadius = 30,
    outerRadius = 85,
    seed = 21,
    snowy = false,
}: {
    count?: number;
    innerRadius?: number;
    outerRadius?: number;
    seed?: number;
    snowy?: boolean;
}) {
    const data = useMemo(() => {
        const rand = mulberry32(seed);
        return Array.from({ length: count }, () => {
            const a = rand() * Math.PI * 2;
            const r = innerRadius + rand() * (outerRadius - innerRadius);
            return {
                pos: [Math.cos(a) * r, 0, Math.sin(a) * r] as [number, number, number],
                h: 3 + rand() * 3.5,
                s: 1.2 + rand() * 1.5,
                lean: (rand() - 0.5) * 0.12,
                hue: rand(),
                blobs: Array.from({ length: 3 + Math.floor(rand() * 3) }, () => ({
                    dx: (rand() - 0.5) * 1.6,
                    dy: rand() * 1.2,
                    dz: (rand() - 0.5) * 1.6,
                    r: 0.7 + rand() * 0.8,
                })),
            };
        });
    }, [count, innerRadius, outerRadius, seed]);

    return (
        <group>
            {data.map((t, i) =>
                snowy ? (
                    // conifer with snow-dusted tiers
                    <group key={i} position={t.pos} rotation={[0, 0, t.lean]}>
                        <mesh position={[0, t.h * 0.25, 0]} castShadow>
                            <cylinderGeometry args={[0.16, 0.28, t.h * 0.5, 6]} />
                            <meshStandardMaterial color="#4e3826" roughness={1} />
                        </mesh>
                        {[0, 1, 2].map((tier) => {
                            const ty = t.h * 0.35 + tier * t.s * 0.85;
                            const tr = t.s * (1.25 - tier * 0.32);
                            return (
                                <group key={tier}>
                                    <mesh position={[0, ty, 0]} castShadow>
                                        <coneGeometry args={[tr, t.s * 1.35, 8]} />
                                        <meshStandardMaterial color="#2e4a38" roughness={1} flatShading />
                                    </mesh>
                                    <mesh position={[0, ty + t.s * 0.34, 0]}>
                                        <coneGeometry args={[tr * 0.72, t.s * 0.66, 8]} />
                                        <meshStandardMaterial color="#e8eef2" roughness={0.9} flatShading />
                                    </mesh>
                                </group>
                            );
                        })}
                        {/* snow mound at base */}
                        <mesh position={[0, 0.05, 0]}>
                            <sphereGeometry args={[t.s * 0.9, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#eef3f6" roughness={0.95} />
                        </mesh>
                    </group>
                ) : (
                    // deciduous: trunk + clustered canopy blobs
                    <group key={i} position={t.pos} rotation={[0, 0, t.lean]}>
                        <mesh position={[0, t.h / 2, 0]} castShadow>
                            <cylinderGeometry args={[0.18, 0.32, t.h, 6]} />
                            <meshStandardMaterial color="#6b4e30" roughness={1} />
                        </mesh>
                        <mesh position={[t.s * 0.3, t.h * 0.72, 0]} rotation={[0, 0, -0.7]}>
                            <cylinderGeometry args={[0.08, 0.14, t.s, 5]} />
                            <meshStandardMaterial color="#6b4e30" roughness={1} />
                        </mesh>
                        {t.blobs.map((b, k) => (
                            <mesh key={k} position={[b.dx, t.h + b.dy, b.dz]} castShadow>
                                <icosahedronGeometry args={[b.r * t.s * 0.8, 1]} />
                                <meshStandardMaterial
                                    color={new THREE.Color().setHSL(0.26 + t.hue * 0.06, 0.42, 0.32 + t.hue * 0.1)}
                                    roughness={1}
                                    flatShading
                                />
                            </mesh>
                        ))}
                    </group>
                )
            )}
        </group>
    );
}

// ─── Banner: pole + cloth waving in the wind ──────────────────────────────
export function Banner({
    position = [0, 0, 0] as [number, number, number],
    color = PALETTE.crimson,
    height = 7,
}: {
    position?: [number, number, number];
    color?: string;
    height?: number;
}) {
    const clothRef = useRef<THREE.Mesh>(null!);
    const geom = useMemo(() => new THREE.PlaneGeometry(2.6, 1.6, 10, 5), []);
    const phase = useMemo(() => Math.random() * Math.PI * 2, []);
    useFrame(({ clock }) => {
        const t = clock.elapsedTime * 2 + phase;
        const pos = clothRef.current.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            pos.setZ(i, (Math.sin(x * 2.2 + t) * 0.2 + Math.sin(y * 3 + t * 1.4) * 0.06) * ((x + 1.3) / 2.6));
        }
        pos.needsUpdate = true;
    });
    return (
        <group position={position}>
            <mesh position={[0, height / 2, 0]} castShadow>
                <cylinderGeometry args={[0.07, 0.1, height, 6]} />
                <meshStandardMaterial color={PALETTE.wood} />
            </mesh>
            {/* finial */}
            <mesh position={[0, height + 0.2, 0]}>
                <sphereGeometry args={[0.13, 6, 5]} />
                <meshStandardMaterial color={PALETTE.gold} metalness={0.7} roughness={0.3} emissive={PALETTE.gold} emissiveIntensity={0.3} />
            </mesh>
            <mesh ref={clothRef} geometry={geom} position={[1.35, height - 1, 0]} castShadow>
                <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.8} />
            </mesh>
            {/* horsetail tassel */}
            <mesh position={[0, height - 0.15, 0]}>
                <coneGeometry args={[0.16, 0.7, 6]} />
                <meshStandardMaterial color="#3a2a1c" roughness={1} />
            </mesh>
        </group>
    );
}

// ─── Citizens: detailed strolling townsfolk (merged figures, instanced) ────
export function Citizens({ count = 36, radius = 30, seed = 5 }: { count?: number; radius?: number; seed?: number }) {
    const robeRef = useRef<THREE.InstancedMesh>(null!);
    const headRef = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const robeGeom = useMemo(() => buildCitizenRobe(), []);
    const headGeom = useMemo(() => buildCitizenHead(), []);
    const mat = useMemo(() => figureMaterial(), []);
    const headMat = useMemo(() => figureMaterial(), []);

    const agents = useMemo(() => {
        const rand = mulberry32(seed);
        const robes = [
            new THREE.Color('#8c5a2b'), new THREE.Color('#4a6b8a'), new THREE.Color('#7d5ba6'),
            new THREE.Color('#a33b3b'), new THREE.Color('#5d7a4a'), new THREE.Color('#caa84e'),
        ];
        return Array.from({ length: count }, () => ({
            angle: rand() * Math.PI * 2,
            r: radius * (0.35 + rand() * 0.9),
            speed: (rand() > 0.5 ? 1 : -1) * (0.04 + rand() * 0.08),
            bob: rand() * Math.PI * 2,
            scale: 0.88 + rand() * 0.24,
            color: robes[Math.floor(rand() * robes.length)],
        }));
    }, [count, radius, seed]);

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        agents.forEach((a, i) => {
            const ang = a.angle + t * a.speed;
            const x = Math.cos(ang) * a.r;
            const z = Math.sin(ang) * a.r;
            const bob = Math.abs(Math.sin(t * 5 + a.bob)) * 0.07;
            const sway = Math.sin(t * 5 + a.bob) * 0.04;
            dummy.position.set(x, bob, z);
            dummy.rotation.set(0, -ang + (a.speed > 0 ? Math.PI : 0), sway);
            dummy.scale.setScalar(a.scale);
            dummy.updateMatrix();
            robeRef.current.setMatrixAt(i, dummy.matrix);
            dummy.position.y = bob + 1.42 * a.scale;
            dummy.updateMatrix();
            headRef.current.setMatrixAt(i, dummy.matrix);
        });
        robeRef.current.instanceMatrix.needsUpdate = true;
        headRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group>
            <instancedMesh
                ref={(m) => {
                    if (!m) return;
                    robeRef.current = m;
                    agents.forEach((a, i) => m.setColorAt(i, a.color));
                    if (m.instanceColor) m.instanceColor.needsUpdate = true;
                }}
                args={[robeGeom, mat, count]}
                castShadow
            />
            <instancedMesh ref={headRef} args={[headGeom, headMat, count]} />
        </group>
    );
}

// ─── Drifting dust / falling snow (soft round sprites) ─────────────────────
export function Particles({
    count = 300,
    area = 160,
    height = 30,
    color = '#e8c987',
    size = 0.35,
    speed = 0.6,
    snow = false,
}: {
    count?: number;
    area?: number;
    height?: number;
    color?: string;
    size?: number;
    speed?: number;
    snow?: boolean;
}) {
    const ref = useRef<THREE.Points>(null!);
    const sprite = useMemo(() => softSprite(), []);
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * area;
            arr[i * 3 + 1] = Math.random() * height;
            arr[i * 3 + 2] = (Math.random() - 0.5) * area;
        }
        return arr;
    }, [count, area, height]);

    useFrame(({ clock }, delta) => {
        const pos = ref.current.geometry.attributes.position;
        const t = clock.elapsedTime;
        for (let i = 0; i < count; i++) {
            let y = pos.getY(i);
            let x = pos.getX(i);
            if (snow) {
                y -= delta * speed * 3.2;
                x += (Math.sin(t * 0.8 + i) + Math.cos(t * 0.5 + i * 2)) * delta * 0.5;
                if (y < 0) y = height;
            } else {
                x += delta * speed * (1 + Math.sin(i));
                y += Math.sin(t * 0.5 + i) * delta * 0.3;
                if (x > area / 2) x = -area / 2;
            }
            pos.setX(i, x);
            pos.setY(i, y);
        }
        pos.needsUpdate = true;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                color={color}
                size={size}
                map={sprite}
                alphaMap={sprite}
                transparent
                opacity={snow ? 0.95 : 0.5}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

// ─── Fire: logs, layered flames, embers, smoke, flickering light ───────────
export function Fire({
    position = [0, 0, 0] as [number, number, number],
    scale = 1,
}: {
    position?: [number, number, number];
    scale?: number;
}) {
    const lightRef = useRef<THREE.PointLight>(null!);
    const flameRefs = useRef<(THREE.Mesh | null)[]>([]);
    const emberRef = useRef<THREE.Points>(null!);
    const smokeRefs = useRef<(THREE.Sprite | null)[]>([]);
    const phase = useMemo(() => Math.random() * 10, []);
    const sprite = useMemo(() => softSprite(), []);

    const emberPositions = useMemo(() => {
        const arr = new Float32Array(14 * 3);
        for (let i = 0; i < 14; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 0.5;
            arr[i * 3 + 1] = Math.random() * 2;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
        return arr;
    }, []);

    useFrame(({ clock }, delta) => {
        const t = clock.elapsedTime * 9 + phase;
        const f = 1 + Math.sin(t) * 0.22 + Math.sin(t * 2.7) * 0.14;
        if (lightRef.current) lightRef.current.intensity = 16 * scale * f;
        flameRefs.current.forEach((m, i) => {
            if (!m) return;
            const ff = 1 + Math.sin(t * (1 + i * 0.3) + i * 2) * 0.18;
            m.scale.set(ff * (1 - i * 0.06), ff * (1 + i * 0.12), ff * (1 - i * 0.06));
            m.rotation.y = t * 0.4 * (i % 2 === 0 ? 1 : -1);
        });
        // embers spiral upward
        const pos = emberRef.current.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            let y = pos.getY(i) + delta * (1.2 + (i % 4) * 0.3);
            if (y > 2.4) y = 0.2;
            pos.setY(i, y);
            pos.setX(i, Math.sin(t * 0.5 + i * 2.1) * 0.25);
            pos.setZ(i, Math.cos(t * 0.5 + i * 1.7) * 0.25);
        }
        pos.needsUpdate = true;
        // smoke puffs rise, expand, fade
        smokeRefs.current.forEach((s, i) => {
            if (!s) return;
            const cycle = ((clock.elapsedTime * 0.45 + i / 4) % 1);
            s.position.y = (1.2 + cycle * 3.4) * scale;
            s.position.x = Math.sin(clock.elapsedTime * 0.7 + i * 2) * 0.35 * scale;
            const sc = (0.7 + cycle * 1.8) * scale;
            s.scale.set(sc, sc, 1);
            (s.material as THREE.SpriteMaterial).opacity = 0.32 * (1 - cycle);
        });
    });

    return (
        <group position={position}>
            {/* stone ring + crossed logs */}
            {Array.from({ length: 7 }, (_, i) => {
                const a = (i / 7) * Math.PI * 2;
                return (
                    <mesh key={i} position={[Math.cos(a) * 0.66 * scale, 0.1 * scale, Math.sin(a) * 0.66 * scale]}>
                        <dodecahedronGeometry args={[0.14 * scale, 0]} />
                        <meshStandardMaterial color="#6e675c" roughness={1} flatShading />
                    </mesh>
                );
            })}
            {[0.4, 1.6, 2.8].map((a, i) => (
                <mesh key={i} position={[0, 0.14 * scale, 0]} rotation={[0.12, a, Math.PI / 2.3]}>
                    <cylinderGeometry args={[0.07 * scale, 0.09 * scale, 1.1 * scale, 6]} />
                    <meshStandardMaterial color="#3a2a1a" roughness={1} />
                </mesh>
            ))}
            {/* layered flames: bright core → orange → deep red shell */}
            {[
                { c: '#ffe289', e: '#ffb347', r: 0.16, h: 0.66, y: 0.45 },
                { c: '#ff9a3d', e: '#ff6a00', r: 0.26, h: 1.0, y: 0.62 },
                { c: '#e1531f', e: '#c2330a', r: 0.36, h: 1.35, y: 0.78 },
            ].map((fl, i) => (
                <mesh
                    key={i}
                    ref={(m) => { flameRefs.current[i] = m; }}
                    position={[0, fl.y * scale, 0]}
                >
                    <coneGeometry args={[fl.r * scale, fl.h * scale, 7]} />
                    <meshStandardMaterial
                        color={fl.c}
                        emissive={fl.e}
                        emissiveIntensity={2.4 - i * 0.5}
                        transparent
                        opacity={0.92 - i * 0.18}
                        depthWrite={false}
                    />
                </mesh>
            ))}
            {/* embers */}
            <points ref={emberRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[emberPositions, 3]} />
                </bufferGeometry>
                <pointsMaterial color="#ffb347" size={0.09 * scale} map={sprite} alphaMap={sprite} transparent depthWrite={false} />
            </points>
            {/* smoke */}
            {[0, 1, 2, 3].map((i) => (
                <sprite key={i} ref={(s) => { smokeRefs.current[i] = s; }} position={[0, 1.4 * scale, 0]}>
                    <spriteMaterial map={sprite} color="#5a5650" transparent opacity={0.25} depthWrite={false} />
                </sprite>
            ))}
            <pointLight ref={lightRef} position={[0, 1.3 * scale, 0]} color="#ff9a3d" intensity={16 * scale} distance={26 * scale} decay={2} />
        </group>
    );
}

// ─── Yurt camp (replaces plain cone tents) ─────────────────────────────────
export function Tents({
    position = [0, 0, 0] as [number, number, number],
    count = 14,
    color = PALETTE.ivory,
    seed = 9,
}: {
    position?: [number, number, number];
    count?: number;
    color?: string;
    seed?: number;
}) {
    const felt = useMemo(() => feltTexture(color, [3, 1]), [color]);
    const data = useMemo(() => {
        const rand = mulberry32(seed);
        return Array.from({ length: count }, (_, i) => ({
            x: (i % 5) * 8 - 16 + (rand() - 0.5) * 2.5,
            z: Math.floor(i / 5) * 8 + (rand() - 0.5) * 2.5,
            s: 1.5 + rand() * 0.7,
            rot: rand() * Math.PI * 2,
            khan: i === 2,
        }));
    }, [count, seed]);

    return (
        <group position={position}>
            {data.map((t, i) => {
                const s = t.khan ? t.s * 1.7 : t.s;
                return (
                    <group key={i} position={[t.x, 0, t.z]} rotation={[0, t.rot, 0]}>
                        {/* lattice wall */}
                        <mesh position={[0, s * 0.42, 0]} castShadow>
                            <cylinderGeometry args={[s, s, s * 0.84, 12]} />
                            <meshStandardMaterial map={felt} roughness={0.95} />
                        </mesh>
                        {/* roof */}
                        <mesh position={[0, s * 0.84 + s * 0.34, 0]} castShadow>
                            <coneGeometry args={[s * 1.08, s * 0.72, 12]} />
                            <meshStandardMaterial map={felt} roughness={0.95} />
                        </mesh>
                        {/* crown ring + smoke hole */}
                        <mesh position={[0, s * 1.62, 0]}>
                            <cylinderGeometry args={[s * 0.16, s * 0.2, s * 0.14, 8]} />
                            <meshStandardMaterial color={PALETTE.wood} roughness={0.9} />
                        </mesh>
                        {/* decorative band */}
                        <mesh position={[0, s * 0.8, 0]}>
                            <cylinderGeometry args={[s * 1.01, s * 1.01, s * 0.1, 12]} />
                            <meshStandardMaterial color={t.khan ? PALETTE.gold : PALETTE.crimson} roughness={0.8} />
                        </mesh>
                        {/* door: frame + dark opening + felt flap */}
                        <group position={[0, 0, s * 0.98]}>
                            <mesh position={[0, s * 0.36, 0]}>
                                <boxGeometry args={[s * 0.42, s * 0.72, 0.1]} />
                                <meshStandardMaterial color="#241a10" roughness={1} />
                            </mesh>
                            <mesh position={[0, s * 0.74, 0]}>
                                <boxGeometry args={[s * 0.52, s * 0.1, 0.14]} />
                                <meshStandardMaterial color={t.khan ? PALETTE.gold : PALETTE.wood} roughness={0.85} />
                            </mesh>
                            {[-1, 1].map((sd) => (
                                <mesh key={sd} position={[sd * s * 0.24, s * 0.36, 0]}>
                                    <boxGeometry args={[s * 0.07, s * 0.72, 0.14]} />
                                    <meshStandardMaterial color={PALETTE.wood} roughness={0.85} />
                                </mesh>
                            ))}
                        </group>
                        {/* guy ropes on the khan tent */}
                        {t.khan &&
                            [0.6, 2.2, 4.0, 5.5].map((a, k) => (
                                <mesh
                                    key={k}
                                    position={[Math.cos(a) * s * 1.5, s * 0.5, Math.sin(a) * s * 1.5]}
                                    rotation={[Math.sin(a) * 0.6, 0, Math.cos(a) * -0.6]}
                                >
                                    <cylinderGeometry args={[0.015, 0.015, s * 1.4, 4]} />
                                    <meshStandardMaterial color="#d9c8a4" roughness={1} />
                                </mesh>
                            ))}
                        {t.khan && <Banner position={[s * 1.3, 0, -s * 0.6]} color={PALETTE.crimson} height={s * 3} />}
                    </group>
                );
            })}
        </group>
    );
}
