/* The American Civil War, 1860–1865: Springfield on election night, Washington
   under its unfinished dome, Fort Sumter in Charleston harbour, the cornfield
   and bridge at Antietam, Cemetery Ridge at Gettysburg and the inside of
   Ford's Theatre. Same stylized-procedural approach as the other worlds:
   deterministic layouts, shared materials, instancing for repeats. */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Citizens, Fire, Particles, Tents, Trees, mulberry32 } from './parts';
import { RailFence, TallShip, WindowGrid, colonialMats, gableGeometry } from './colonial';

const MARBLE = '#ece8df';
const SANDSTONE = '#d9cfb8';
const CLAPBOARD = '#c9b48c';
const SHUTTER = '#2f4a2c';
const UNION_BLUE = '#2b3f73';
const CSA_GREY = '#8c8f92';

// ─── Flags: canvas textures, gently waving cloth ────────────────────────────
export type FlagKind = 'us' | 'us-1917' | 'csa-battle' | 'csa-national' | 'german-empire' | 'habsburg' | 'france' | 'uk';
const flagTextures: Partial<Record<FlagKind, THREE.CanvasTexture>> = {};

export function flagTexture(kind: FlagKind) {
    const cached = flagTextures[kind];
    if (cached) return cached;
    const c = document.createElement('canvas');
    c.width = 380;
    c.height = 200;
    const g = c.getContext('2d')!;
    const star = (x: number, y: number, r: number) => {
        g.beginPath();
        for (let i = 0; i < 10; i++) {
            const a = -Math.PI / 2 + (i * Math.PI) / 5;
            const rr = i % 2 ? r * 0.42 : r;
            g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
        }
        g.closePath();
        g.fill();
    };
    const bands = (colors: string[], vertical = false) => {
        colors.forEach((col, i) => {
            g.fillStyle = col;
            if (vertical) g.fillRect((i * 380) / colors.length, 0, 380 / colors.length + 1, 200);
            else g.fillRect(0, (i * 200) / colors.length, 380, 200 / colors.length + 1);
        });
    };
    if (kind === 'german-empire') {
        bands(['#111111', '#f4f1ea', '#c8202c']);
    } else if (kind === 'habsburg') {
        bands(['#111111', '#f2c12e']);
    } else if (kind === 'france') {
        bands(['#22408f', '#f4f1ea', '#c4232f'], true);
    } else if (kind === 'uk') {
        g.fillStyle = '#1f2f6e';
        g.fillRect(0, 0, 380, 200);
        g.lineCap = 'butt';
        g.strokeStyle = '#f4f1ea';
        g.lineWidth = 40;
        g.beginPath(); g.moveTo(0, 0); g.lineTo(380, 200); g.moveTo(380, 0); g.lineTo(0, 200); g.stroke();
        g.strokeStyle = '#c8202c';
        g.lineWidth = 13;
        g.stroke();
        g.strokeStyle = '#f4f1ea';
        g.lineWidth = 64;
        g.beginPath(); g.moveTo(190, 0); g.lineTo(190, 200); g.moveTo(0, 100); g.lineTo(380, 100); g.stroke();
        g.strokeStyle = '#c8202c';
        g.lineWidth = 38;
        g.stroke();
    } else if (kind === 'us' || kind === 'us-1917') {
        for (let i = 0; i < 13; i++) {
            g.fillStyle = i % 2 ? '#f4f1ea' : '#b22234';
            g.fillRect(0, (i * 200) / 13, 380, 200 / 13 + 1);
        }
        g.fillStyle = '#3c3b6e';
        g.fillRect(0, 0, 152, 108);
        g.fillStyle = '#f4f1ea';
        if (kind === 'us') {
            // 34 stars in 1861
            for (let r = 0; r < 5; r++) for (let k = 0; k < 7; k++) if (r * 7 + k < 34) star(12 + k * 21, 13 + r * 20, 6);
        } else {
            // 48 stars from 1912
            for (let r = 0; r < 6; r++) for (let k = 0; k < 8; k++) star(10 + k * 18.5, 9 + r * 18, 5);
        }
    } else if (kind === 'csa-battle') {
        g.fillStyle = '#b8202c';
        g.fillRect(0, 0, 380, 200);
        g.strokeStyle = '#f4f1ea';
        g.lineWidth = 46;
        g.beginPath();
        g.moveTo(0, 0); g.lineTo(380, 200); g.moveTo(380, 0); g.lineTo(0, 200);
        g.stroke();
        g.strokeStyle = '#26356b';
        g.lineWidth = 34;
        g.stroke();
        g.fillStyle = '#f4f1ea';
        for (let i = 1; i <= 6; i++) {
            star(190 + (i * 190) / 7.4, 100 + (i * 100) / 7.4, 7);
            star(190 - (i * 190) / 7.4, 100 - (i * 100) / 7.4, 7);
            if (i <= 3) {
                star(190 + (i * 190) / 7.4 * 2.2, 100 - (i * 100) / 7.4 * 2.2, 7);
                star(190 - (i * 190) / 7.4 * 2.2, 100 + (i * 100) / 7.4 * 2.2, 7);
            }
        }
        star(190, 100, 7);
    } else {
        // the first national flag, the "Stars and Bars", 7 stars in April 1861
        g.fillStyle = '#b8202c';
        g.fillRect(0, 0, 380, 200);
        g.fillStyle = '#f4f1ea';
        g.fillRect(0, 67, 380, 66);
        g.fillStyle = '#26356b';
        g.fillRect(0, 0, 150, 133);
        g.fillStyle = '#f4f1ea';
        for (let i = 0; i < 7; i++) {
            const a = -Math.PI / 2 + (i * Math.PI * 2) / 7;
            star(75 + Math.cos(a) * 40, 66 + Math.sin(a) * 40, 10);
        }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    flagTextures[kind] = tex;
    return tex;
}

export function Flag({ position, kind, height = 10, size = 1 }: { position: [number, number, number]; kind: FlagKind; height?: number; size?: number }) {
    const cloth = useRef<THREE.Mesh>(null);
    const geom = useMemo(() => {
        const g = new THREE.PlaneGeometry(3.8 * size, 2 * size, 16, 4);
        g.translate(1.9 * size, 0, 0);
        return g;
    }, [size]);
    const base = useMemo(() => Float32Array.from(geom.attributes.position.array as Float32Array), [geom]);
    useFrame(({ clock }) => {
        if (!cloth.current) return;
        const pos = geom.attributes.position as THREE.BufferAttribute;
        const t = clock.elapsedTime;
        for (let i = 0; i < pos.count; i++) {
            const x = base[i * 3];
            pos.setZ(i, Math.sin(x * 1.3 - t * 3 + position[0]) * 0.18 * (x / (3.8 * size)));
        }
        pos.needsUpdate = true;
        geom.computeVertexNormals();
    });
    return (
        <group position={position}>
            <mesh castShadow position={[0, height / 2, 0]}>
                <cylinderGeometry args={[0.08, 0.1, height, 8]} />
                <meshStandardMaterial color="#4a3b2b" roughness={0.9} />
            </mesh>
            <mesh ref={cloth} geometry={geom} position={[0.06, height - 1.1 * size, 0]} castShadow>
                <meshStandardMaterial map={flagTexture(kind)} roughness={0.85} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

// ─── Small shared props ─────────────────────────────────────────────────────

/** A 12-pounder Napoleon field gun. */
export function FieldGun({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {[-0.7, 0.7].map((x) => (
                <mesh key={x} castShadow position={[x, 0.75, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.7, 0.07, 6, 16]} />
                    <meshStandardMaterial color="#3a2c1e" roughness={0.9} />
                </mesh>
            ))}
            <mesh position={[0, 0.75, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.07, 0.07, 1.5, 6]} />
                <meshStandardMaterial color="#3a2c1e" roughness={0.9} />
            </mesh>
            <mesh castShadow position={[0, 0.5, -1.3]} rotation={[0.3, 0, 0]}>
                <boxGeometry args={[0.3, 0.2, 2.6]} />
                <meshStandardMaterial color="#56663c" roughness={0.85} />
            </mesh>
            <mesh castShadow position={[0, 1.0, 0.5]} rotation={[Math.PI / 2 - 0.05, 0, 0]}>
                <cylinderGeometry args={[0.16, 0.24, 2.0, 12]} />
                <meshStandardMaterial color="#8a6a3a" metalness={0.75} roughness={0.35} />
            </mesh>
        </group>
    );
}

/** Low rounded hill. */
function Hill({ position, radius, height, color = '#6f8a4c' }: { position: [number, number, number]; radius: number; height: number; color?: string }) {
    return (
        <mesh position={position} scale={[radius, height, radius]} receiveShadow castShadow>
            <sphereGeometry args={[1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={color} roughness={1} flatShading />
        </mesh>
    );
}

/** Instanced clapboard frame houses with gable roofs. */
function FrameHouses({ seed, count, inner, outer, clear }: { seed: number; count: number; inner: number; outer: number; clear?: (x: number, z: number) => boolean }) {
    const bodyRef = useRef<THREE.InstancedMesh>(null);
    const roofRef = useRef<THREE.InstancedMesh>(null);
    const houses = useMemo(() => {
        const rand = mulberry32(seed);
        const out: { x: number; z: number; w: number; h: number; rot: number; tint: number }[] = [];
        let guard = 0;
        while (out.length < count && guard++ < count * 30) {
            const a = rand() * Math.PI * 2;
            const r = inner + rand() * (outer - inner);
            const x = Math.cos(a) * r;
            const z = Math.sin(a) * r;
            if (clear?.(x, z)) continue;
            if (out.some((h) => Math.hypot(h.x - x, h.z - z) < 11)) continue;
            out.push({ x, z, w: 6 + rand() * 3, h: 4 + rand() * 3, rot: Math.round(rand() * 4) * (Math.PI / 2) + (rand() - 0.5) * 0.1, tint: rand() });
        }
        return out;
    }, [seed, count, inner, outer, clear]);
    const roofGeom = useMemo(() => gableGeometry(1, 0.5, 1), []);
    const palette = useMemo(() => ['#e8e2d2', CLAPBOARD, '#b8a07a', '#d7cdb6', '#a65a3f'].map((c) => new THREE.Color(c)), []);
    const fill = () => {
        const d = new THREE.Object3D();
        houses.forEach((h, i) => {
            d.position.set(h.x, h.h / 2, h.z);
            d.rotation.set(0, h.rot, 0);
            d.scale.set(h.w, h.h, h.w * 1.3);
            d.updateMatrix();
            bodyRef.current?.setMatrixAt(i, d.matrix);
            bodyRef.current?.setColorAt(i, palette[Math.floor(h.tint * palette.length)]);
            d.position.set(h.x, h.h, h.z);
            d.scale.set(h.w * 1.08, h.w * 0.9, h.w * 1.36);
            d.updateMatrix();
            roofRef.current?.setMatrixAt(i, d.matrix);
        });
        if (bodyRef.current) { bodyRef.current.instanceMatrix.needsUpdate = true; if (bodyRef.current.instanceColor) bodyRef.current.instanceColor.needsUpdate = true; }
        if (roofRef.current) roofRef.current.instanceMatrix.needsUpdate = true;
    };
    return (
        <group>
            <instancedMesh ref={(m) => { bodyRef.current = m; fill(); }} args={[undefined, undefined, houses.length]} castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial roughness={0.9} />
            </instancedMesh>
            <instancedMesh ref={(m) => { roofRef.current = m; fill(); }} args={[roofGeom, undefined, houses.length]} castShadow>
                <meshStandardMaterial color="#4b3d33" roughness={0.95} />
            </instancedMesh>
        </group>
    );
}

/** Telegraph line: poles and sagging wires between two points. */
function TelegraphLine({ from, to, poles = 8 }: { from: [number, number]; to: [number, number]; poles?: number }) {
    const pts = useMemo(() => Array.from({ length: poles }, (_, i) => {
        const t = i / (poles - 1);
        return [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t] as [number, number];
    }), [from, to, poles]);
    const wire = useMemo(() => {
        const v: THREE.Vector3[] = [];
        for (let i = 0; i < pts.length - 1; i++) {
            for (let k = 0; k <= 8; k++) {
                const t = k / 8;
                v.push(new THREE.Vector3(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, 7.4 - Math.sin(t * Math.PI) * 0.6, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t));
            }
        }
        return new THREE.Line(new THREE.BufferGeometry().setFromPoints(v), new THREE.LineBasicMaterial({ color: '#222222' }));
    }, [pts]);
    return (
        <group>
            {pts.map(([x, z], i) => (
                <group key={i} position={[x, 0, z]}>
                    <mesh castShadow position={[0, 4, 0]}>
                        <cylinderGeometry args={[0.12, 0.16, 8, 6]} />
                        <meshStandardMaterial color="#5a4632" roughness={1} />
                    </mesh>
                    <mesh position={[0, 7.5, 0]}>
                        <boxGeometry args={[1.6, 0.12, 0.12]} />
                        <meshStandardMaterial color="#5a4632" roughness={1} />
                    </mesh>
                </group>
            ))}
            <primitive object={wire} />
        </group>
    );
}

/** An American 4-4-0 steam locomotive with balloon stack and tender. */
function Locomotive({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh castShadow position={[0, 2.2, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[1.0, 1.0, 6, 16]} />
                <meshStandardMaterial color="#1f3a2a" metalness={0.4} roughness={0.5} />
            </mesh>
            {[-1.6, 0, 1.6].map((x) => (
                <mesh key={x} position={[x, 2.2, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[1.02, 0.06, 6, 20]} />
                    <meshStandardMaterial color="#b08a3a" metalness={0.8} roughness={0.3} />
                </mesh>
            ))}
            {/* balloon stack */}
            <mesh castShadow position={[2.2, 3.6, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 1.4, 10]} />
                <meshStandardMaterial color="#222" roughness={0.6} />
            </mesh>
            <mesh castShadow position={[2.2, 4.6, 0]}>
                <cylinderGeometry args={[0.85, 0.35, 1.0, 14]} />
                <meshStandardMaterial color="#222" roughness={0.6} />
            </mesh>
            {/* cab */}
            <mesh castShadow position={[-3.6, 2.8, 0]}>
                <boxGeometry args={[2.2, 2.8, 2.4]} />
                <meshStandardMaterial color="#7a2a22" roughness={0.7} />
            </mesh>
            <mesh castShadow position={[-3.6, 4.35, 0]}>
                <boxGeometry args={[2.6, 0.3, 2.8]} />
                <meshStandardMaterial color="#2b2b2b" roughness={0.7} />
            </mesh>
            {/* cowcatcher */}
            <mesh castShadow position={[3.7, 0.8, 0]} rotation={[0, 0, -0.7]}>
                <boxGeometry args={[1.4, 0.2, 2.2]} />
                <meshStandardMaterial color="#7a2a22" roughness={0.7} />
            </mesh>
            {/* wheels */}
            {[[2.4, 0.6, 0.5], [1.2, 0.6, 0.5], [-0.6, 1.0, 0.95], [-2.4, 1.0, 0.95]].map(([x, y, r], i) =>
                [-1.1, 1.1].map((z) => (
                    <mesh key={`${i}${z}`} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[r, r, 0.15, 16]} />
                        <meshStandardMaterial color="#7a2a22" roughness={0.6} />
                    </mesh>
                )),
            )}
            {/* tender with wood */}
            <mesh castShadow position={[-6.6, 1.8, 0]}>
                <boxGeometry args={[3.4, 1.8, 2.4]} />
                <meshStandardMaterial color="#1f3a2a" roughness={0.6} />
            </mesh>
            <mesh position={[-6.6, 2.9, 0]}>
                <boxGeometry args={[3.0, 0.5, 2.0]} />
                <meshStandardMaterial color="#6b4d2e" roughness={1} />
            </mesh>
            <Particles count={30} area={4} height={10} color="#d8d4cc" size={0.6} speed={0.5} />
        </group>
    );
}

function Rails({ z, length = 360 }: { z: number; length?: number }) {
    return (
        <group position={[0, 0, z]}>
            <mesh receiveShadow position={[0, 0.06, 0]}>
                <boxGeometry args={[length, 0.12, 4]} />
                <meshStandardMaterial color="#6b5a46" roughness={1} />
            </mesh>
            {[-0.75, 0.75].map((dz) => (
                <mesh key={dz} position={[0, 0.2, dz]}>
                    <boxGeometry args={[length, 0.14, 0.12]} />
                    <meshStandardMaterial color="#5c5f63" metalness={0.7} roughness={0.4} />
                </mesh>
            ))}
        </group>
    );
}

/** A Greek Revival portico: columns, entablature and pediment. */
function Portico({ width, height, columns, position, color = MARBLE }: { width: number; height: number; columns: number; position: [number, number, number]; color?: string }) {
    const pediment = useMemo(() => gableGeometry(width + 1, height * 0.28, 2.4), [width, height]);
    return (
        <group position={position}>
            {Array.from({ length: columns }, (_, i) => (
                <mesh key={i} castShadow position={[-width / 2 + (width / (columns - 1)) * i, height / 2, 0]}>
                    <cylinderGeometry args={[0.55, 0.62, height, 14]} />
                    <meshStandardMaterial color={color} roughness={0.6} />
                </mesh>
            ))}
            <mesh castShadow position={[0, height + 0.6, 0]}>
                <boxGeometry args={[width + 1.6, 1.2, 2.6]} />
                <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            <mesh castShadow geometry={pediment} position={[0, height + 1.2, 0]} rotation={[0, Math.PI / 2, 0]}>
                <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
        </group>
    );
}

// ─── Springfield, Illinois: election night, 6 November 1860 ────────────────
function LincolnHome({ position }: { position: [number, number, number] }) {
    const m = colonialMats();
    const roof = useMemo(() => gableGeometry(13, 3.2, 10), []);
    return (
        <group position={position}>
            <mesh castShadow receiveShadow position={[0, 4.4, 0]}>
                <boxGeometry args={[12, 8.8, 9]} />
                <meshStandardMaterial color={CLAPBOARD} roughness={0.85} />
            </mesh>
            <mesh castShadow geometry={roof} position={[0, 8.8, 0]}>
                <meshStandardMaterial color="#4a3b30" roughness={0.95} />
            </mesh>
            <WindowGrid width={10} rows={2} cols={5} y0={2.6} rowGap={3.6} z={4.5} />
            {/* green shutters beside each window */}
            {[0, 1].map((r) => [0, 1, 2, 3, 4].map((c) => [-1, 1].map((s) => (
                <mesh key={`${r}${c}${s}`} position={[-4 + c * 2 + s * 1.0, 2.6 + r * 3.6, 4.62]}>
                    <boxGeometry args={[0.45, 2.3, 0.08]} />
                    <meshStandardMaterial color={SHUTTER} roughness={0.8} />
                </mesh>
            ))))}
            <mesh position={[0, 1.4, 4.6]}>
                <boxGeometry args={[1.6, 2.8, 0.2]} />
                <meshStandardMaterial color="#3b2a1c" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.25, 6]} receiveShadow>
                <boxGeometry args={[14, 0.5, 2.6]} />
                <primitive object={m.trim} attach="material" />
            </mesh>
            {[-1, 1].map((s) => (
                <mesh key={s} castShadow position={[s * 2.5, 10.4, -1]}>
                    <boxGeometry args={[0.9, 2.6, 0.9]} />
                    <primitive object={m.brick} attach="material" />
                </mesh>
            ))}
            {/* white picket fence */}
            {Array.from({ length: 30 }, (_, i) => (
                <mesh key={i} position={[-8 + i * 0.55, 0.6, 9]}>
                    <boxGeometry args={[0.12, 1.2, 0.08]} />
                    <meshStandardMaterial color="#f2efe6" roughness={0.8} />
                </mesh>
            ))}
        </group>
    );
}

function OldStateCapitol({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh castShadow receiveShadow position={[0, 6, 0]}>
                <boxGeometry args={[36, 12, 24]} />
                <meshStandardMaterial color={SANDSTONE} roughness={0.85} />
            </mesh>
            <WindowGrid width={30} rows={2} cols={8} y0={3} rowGap={5} z={12} />
            <Portico width={12} height={9} columns={4} position={[0, 0, 13.6]} color={SANDSTONE} />
            <mesh castShadow position={[0, 14, 0]}>
                <cylinderGeometry args={[5, 5, 4, 20]} />
                <meshStandardMaterial color={SANDSTONE} roughness={0.85} />
            </mesh>
            <mesh castShadow position={[0, 16, 0]}>
                <sphereGeometry args={[5, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#9aa3a8" metalness={0.4} roughness={0.5} />
            </mesh>
            <Flag position={[0, 21, 0]} kind="us" height={5} size={0.8} />
        </group>
    );
}

export function Springfield() {
    const clear = useMemo(() => (x: number, z: number) => (Math.abs(x) < 36 && z > -86 && z < 40) || Math.abs(z - 62) < 12, []);
    return (
        <group>
            {/* the dirt streets */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -20]} receiveShadow>
                <planeGeometry args={[20, 160]} />
                <meshStandardMaterial color="#8b7556" roughness={1} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 18]} receiveShadow>
                <planeGeometry args={[220, 14]} />
                <meshStandardMaterial color="#8b7556" roughness={1} />
            </mesh>
            {/* plank sidewalks */}
            {[-1, 1].map((s) => (
                <mesh key={s} position={[s * 11.5, 0.12, -20]} receiveShadow>
                    <boxGeometry args={[3, 0.2, 150]} />
                    <meshStandardMaterial color="#8a6a48" roughness={1} />
                </mesh>
            ))}
            <OldStateCapitol position={[0, 0, -78]} />
            <LincolnHome position={[-26, 0, -8]} />
            <FrameHouses seed={60} count={46} inner={34} outer={130} clear={clear} />
            <TelegraphLine from={[14, 40]} to={[14, -70]} poles={9} />
            <Rails z={62} />
            <Locomotive position={[30, 0.3, 62]} rotation={Math.PI} />
            {/* the Great Western depot */}
            <group position={[-30, 0, 72]}>
                <mesh castShadow receiveShadow position={[0, 3, 0]}>
                    <boxGeometry args={[18, 6, 8]} />
                    <primitive object={colonialMats().brick} attach="material" />
                </mesh>
                <mesh castShadow position={[0, 6.3, -3]}>
                    <boxGeometry args={[20, 0.4, 12]} />
                    <meshStandardMaterial color="#4a3b30" roughness={0.95} />
                </mesh>
            </group>
            <Flag position={[8, 0, 8]} kind="us" height={11} />
            <Fire position={[-6, 0, 30]} scale={1.1} />
            <Fire position={[10, 0, -36]} scale={0.9} />
            <Citizens count={70} radius={28} seed={61} style="colonial" />
            <Trees count={50} innerRadius={90} outerRadius={190} seed={62} />
        </group>
    );
}

// ─── Washington, 1861: the unfinished Capitol dome ─────────────────────────
function Capitol({ position, finished = false }: { position: [number, number, number]; finished?: boolean }) {
    const ribs = useMemo(() => Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2), []);
    return (
        <group position={position}>
            {/* central block and the new Senate and House wings */}
            <mesh castShadow receiveShadow position={[0, 9, 0]}>
                <boxGeometry args={[60, 18, 30]} />
                <meshStandardMaterial color={MARBLE} roughness={0.7} />
            </mesh>
            {[-1, 1].map((s) => (
                <group key={s} position={[s * 58, 0, 2]}>
                    <mesh castShadow receiveShadow position={[0, 8, 0]}>
                        <boxGeometry args={[46, 16, 40]} />
                        <meshStandardMaterial color={MARBLE} roughness={0.7} />
                    </mesh>
                    <WindowGrid width={40} rows={2} cols={10} y0={4} rowGap={6} z={20.02} />
                    <Portico width={18} height={12} columns={6} position={[0, 2, 22]} />
                    {/* scaffolding: the wings were still being finished */}
                    {s > 0 && !finished && Array.from({ length: 5 }, (_, i) => (
                        <mesh key={i} position={[16 + i * 0.2, 9, 20.5 - i * 0.1]}>
                            <boxGeometry args={[0.2, 18, 0.2]} />
                            <meshStandardMaterial color="#6b5034" roughness={1} />
                        </mesh>
                    ))}
                </group>
            ))}
            <WindowGrid width={54} rows={2} cols={14} y0={4} rowGap={7} z={15.02} />
            <Portico width={22} height={14} columns={8} position={[0, 2, 18]} />
            {[0, 1, 2, 3].map((i) => (
                <mesh key={i} receiveShadow position={[0, 0.5 + i * 0.5, 22 + 6 - i * 1.5]}>
                    <boxGeometry args={[28, 1, 4]} />
                    <meshStandardMaterial color={MARBLE} roughness={0.7} />
                </mesh>
            ))}
            {/* the drum and peristyle are up; the iron dome is half built */}
            <mesh castShadow position={[0, 22, 0]}>
                <cylinderGeometry args={[15, 15, 8, 32]} />
                <meshStandardMaterial color={MARBLE} roughness={0.7} />
            </mesh>
            {ribs.map((a) => (
                <mesh key={a} castShadow position={[Math.cos(a) * 16, 30, Math.sin(a) * 16]}>
                    <cylinderGeometry args={[0.6, 0.6, 8, 8]} />
                    <meshStandardMaterial color={MARBLE} roughness={0.6} />
                </mesh>
            ))}
            <mesh position={[0, 34.5, 0]}>
                <cylinderGeometry args={[17, 17, 1.2, 32]} />
                <meshStandardMaterial color={MARBLE} roughness={0.7} />
            </mesh>
            {finished ? (
                <group position={[0, 35, 0]}>
                    {/* the finished cast-iron dome, lantern and Statue of Freedom */}
                    <mesh castShadow position={[0, 0, 0]}>
                        <cylinderGeometry args={[14, 15.5, 6, 32]} />
                        <meshStandardMaterial color={MARBLE} roughness={0.6} />
                    </mesh>
                    <mesh castShadow position={[0, 3, 0]} scale={[1, 1.15, 1]}>
                        <sphereGeometry args={[14, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#f1eee7" roughness={0.55} />
                    </mesh>
                    <mesh castShadow position={[0, 20, 0]}>
                        <cylinderGeometry args={[2.4, 2.6, 5, 16]} />
                        <meshStandardMaterial color="#f1eee7" roughness={0.55} />
                    </mesh>
                    <mesh position={[0, 23.2, 0]}>
                        <sphereGeometry args={[2.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#f1eee7" roughness={0.55} />
                    </mesh>
                    <mesh castShadow position={[0, 27, 0]}>
                        <cylinderGeometry args={[0.5, 0.9, 4.4, 10]} />
                        <meshStandardMaterial color="#3d4a44" metalness={0.6} roughness={0.4} />
                    </mesh>
                </group>
            ) : (
                <>
            {ribs.map((a, i) => (
                    <group key={`r${a}`} rotation={[0, a, 0]} position={[0, 35, 0]}>
                        <mesh castShadow position={[11, i % 2 ? 3.5 : 5.5, 0]} rotation={[0, 0, i % 2 ? 0.5 : 0.75]}>
                            <boxGeometry args={[0.5, i % 2 ? 7 : 11, 0.5]} />
                            <meshStandardMaterial color="#3e4246" metalness={0.6} roughness={0.5} />
                        </mesh>
                    </group>
                ))}
                {/* the construction crane on top */}
                <mesh castShadow position={[0, 46, 0]}>
                    <boxGeometry args={[0.8, 22, 0.8]} />
                    <meshStandardMaterial color="#5a4632" roughness={1} />
                </mesh>
                <mesh castShadow position={[6, 56, 0]} rotation={[0, 0, -0.15]}>
                    <boxGeometry args={[18, 0.6, 0.6]} />
                    <meshStandardMaterial color="#5a4632" roughness={1} />
                </mesh>
                </>
            )}
            <Flag position={[-58, 16, 2]} kind={finished ? 'us-1917' : 'us'} height={6} size={0.9} />
            <Flag position={[58, 16, 2]} kind={finished ? 'us-1917' : 'us'} height={6} size={0.9} />
        </group>
    );
}

function WhiteHouse({ position, rotation = 0, flag = 'us' }: { position: [number, number, number]; rotation?: number; flag?: FlagKind }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            <mesh castShadow receiveShadow position={[0, 6.5, 0]}>
                <boxGeometry args={[46, 13, 22]} />
                <meshStandardMaterial color="#f5f3ee" roughness={0.65} />
            </mesh>
            <WindowGrid width={42} rows={2} cols={11} y0={3.4} rowGap={5} z={11.02} />
            <Portico width={14} height={11} columns={4} position={[0, 0, 13.4]} color="#f5f3ee" />
            <mesh position={[0, 13.4, 0]}>
                <boxGeometry args={[47, 0.8, 23]} />
                <meshStandardMaterial color="#e6e2d8" roughness={0.6} />
            </mesh>
            <Flag position={[0, 13.8, 0]} kind={flag} height={6} size={0.9} />
        </group>
    );
}

export function Washington1861({ year = 1861 }: { year?: 1861 | 1917 }) {
    const modern = year === 1917;
    const usFlag: FlagKind = modern ? 'us-1917' : 'us';
    return (
        <group>
            {/* Pennsylvania Avenue, mud and cobbles */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 20]} receiveShadow>
                <planeGeometry args={[24, 200]} />
                <meshStandardMaterial color="#8a7a62" roughness={1} />
            </mesh>
            <Capitol position={[0, 0, -100]} finished={modern} />
            <WhiteHouse position={[-70, 0, 70]} rotation={0.9} flag={usFlag} />
            {/* the Washington Monument stands a third finished, as it would until 1877 */}
            <group position={[95, 0, 40]}>
                <mesh castShadow position={[0, modern ? 30 : 14, 0]} scale={modern ? [0.86, 1, 0.86] : [1, 1, 1]}>
                    <boxGeometry args={[7, modern ? 60 : 28, 7]} />
                    <meshStandardMaterial color="#e6e0d2" roughness={0.8} />
                </mesh>
                {modern ? (
                    <mesh castShadow position={[0, 62.5, 0]} rotation={[0, Math.PI / 4, 0]}>
                        <coneGeometry args={[4.2, 5, 4]} />
                        <meshStandardMaterial color="#e6e0d2" roughness={0.8} />
                    </mesh>
                ) : (
                    <mesh position={[0, 28.4, 0]}>
                        <boxGeometry args={[6.2, 0.8, 6.2]} />
                        <meshStandardMaterial color="#cfc6b2" roughness={0.9} />
                    </mesh>
                )}
            </group>
            {/* Union volunteers camped on the Mall */}
            {!modern && <Tents position={[60, 0, -20]} count={18} color="#efeadc" seed={7} />}
            {!modern && <Tents position={[-60, 0, -24]} count={14} color="#efeadc" seed={8} />}
            {[[-16, 10], [16, 10], [-16, 40], [16, 40]].map(([x, z]) => (
                <Flag key={`${x}${z}`} position={[x, 0, z]} kind={usFlag} height={9} />
            ))}
            <FrameHouses seed={81} count={34} inner={110} outer={190} />
            <Citizens count={60} radius={30} seed={82} style="colonial" />
            <Trees count={60} innerRadius={70} outerRadius={180} seed={83} />
        </group>
    );
}

// ─── Charleston harbour, 12 April 1861, 4:30 in the morning ────────────────
function FortSumter() {
    const m = colonialMats();
    const R = 22;
    const sides = useMemo(() => Array.from({ length: 5 }, (_, i) => {
        const a0 = (i / 5) * Math.PI * 2 + Math.PI / 10;
        const a1 = ((i + 1) / 5) * Math.PI * 2 + Math.PI / 10;
        const p0 = new THREE.Vector2(Math.cos(a0) * R, Math.sin(a0) * R);
        const p1 = new THREE.Vector2(Math.cos(a1) * R, Math.sin(a1) * R);
        const mid = p0.clone().add(p1).multiplyScalar(0.5);
        return { mid, len: p0.distanceTo(p1), rot: -Math.atan2(p1.y - p0.y, p1.x - p0.x) };
    }), []);
    return (
        <group>
            {/* sand and rubble island */}
            <mesh position={[0, 0.3, 0]} receiveShadow>
                <cylinderGeometry args={[34, 36, 0.8, 5]} />
                <meshStandardMaterial color="#c8b48a" roughness={1} />
            </mesh>
            {sides.map((s, i) => (
                <group key={i} position={[s.mid.x, 0, s.mid.y]} rotation={[0, s.rot, 0]}>
                    <mesh castShadow receiveShadow position={[0, 6, 0]}>
                        <boxGeometry args={[s.len + 1.5, 12, 3.2]} />
                        <primitive object={m.brick} attach="material" />
                    </mesh>
                    {/* two tiers of casemate gun embrasures */}
                    {[3.5, 7.5].map((y) =>
                        Array.from({ length: 6 }, (_, k) => (
                            <mesh key={`${y}${k}`} position={[-s.len / 2 + (s.len / 6) * (k + 0.5), y, 1.62]}>
                                <boxGeometry args={[0.9, 1.2, 0.1]} />
                                <meshStandardMaterial color="#1a1412" roughness={1} />
                            </mesh>
                        )),
                    )}
                </group>
            ))}
            {/* barracks inside the parade ground */}
            <mesh castShadow position={[0, 4, -6]}>
                <boxGeometry args={[18, 8, 5]} />
                <primitive object={m.brickDark} attach="material" />
            </mesh>
            <Flag position={[0, 0, 4]} kind="us" height={20} size={1.4} />
            <Fire position={[-8, 8, -6]} scale={1.4} />
            <Fire position={[6, 8, -4]} scale={1.1} />
        </group>
    );
}

/** Mortar shells arcing from the shore batteries onto the fort. */
function Bombardment({ batteries }: { batteries: [number, number, number][] }) {
    const shells = useRef<THREE.Group>(null);
    const flashes = useRef<THREE.Group>(null);
    const plan = useMemo(() => {
        const rand = mulberry32(19);
        return Array.from({ length: 10 }, (_, i) => ({ from: batteries[i % batteries.length], phase: rand() * 6, period: 4.5 + rand() * 2.5, tx: (rand() - 0.5) * 30, tz: (rand() - 0.5) * 30 }));
    }, [batteries]);
    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        plan.forEach((p, i) => {
            const k = ((t + p.phase) % p.period) / p.period;
            const shell = shells.current?.children[i];
            const flash = flashes.current?.children[i] as THREE.Mesh | undefined;
            if (shell) {
                shell.position.set(p.from[0] + (p.tx - p.from[0]) * k, 4 + Math.sin(k * Math.PI) * 70, p.from[2] + (p.tz - p.from[2]) * k);
                shell.visible = k < 0.97;
            }
            if (flash) {
                const burst = k > 0.95 ? (k - 0.95) / 0.05 : 0;
                flash.position.set(p.tx, 6, p.tz);
                flash.scale.setScalar(burst > 0 ? 2 + burst * 6 : 0.001);
                (flash.material as THREE.MeshBasicMaterial).opacity = burst > 0 ? 1 - burst : 0;
            }
        });
    });
    return (
        <group>
            <group ref={shells}>
                {plan.map((_, i) => (
                    <mesh key={i}>
                        <sphereGeometry args={[0.7, 8, 6]} />
                        <meshBasicMaterial color="#ffb347" />
                    </mesh>
                ))}
            </group>
            <group ref={flashes}>
                {plan.map((_, i) => (
                    <mesh key={i}>
                        <sphereGeometry args={[1, 12, 8]} />
                        <meshBasicMaterial color="#ffd27a" transparent opacity={0} depthWrite={false} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

export function CharlestonHarbor() {
    const batteries = useMemo<[number, number, number][]>(() => [[-150, 0, -60], [-140, 0, -90], [130, 0, -110], [150, 0, -70]], []);
    return (
        <group>
            {/* the harbour */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} receiveShadow>
                <planeGeometry args={[900, 900]} />
                <meshStandardMaterial color="#3d5a6a" roughness={0.12} metalness={0.45} />
            </mesh>
            <FortSumter />
            {/* the shore batteries at Fort Johnson and Cummings Point */}
            {[[-160, -80, 90], [150, -95, 80]].map(([x, z, w]) => (
                <mesh key={x} position={[x, 0.6, z]} receiveShadow>
                    <boxGeometry args={[w, 1.2, 60]} />
                    <meshStandardMaterial color="#b8a47a" roughness={1} />
                </mesh>
            ))}
            {batteries.map((b, i) => (
                <group key={i}>
                    <FieldGun position={[b[0], 1.2, b[2]]} rotation={Math.atan2(-b[0], -b[2])} />
                    <Fire position={[b[0] + 3, 1.2, b[2]]} scale={0.8} />
                </group>
            ))}
            <Flag position={[-150, 1.2, -75]} kind="csa-national" height={10} />
            <Flag position={[140, 1.2, -90]} kind="csa-national" height={10} />
            <Bombardment batteries={batteries} />
            {/* the relief fleet waiting at the harbour bar */}
            <TallShip position={[40, 0, 150]} rotation={-0.4} flag="#3c3b6e" />
            <TallShip position={[-30, 0, 170]} rotation={0.3} flag="#3c3b6e" />
            {/* the city on the far shore */}
            <group position={[0, 0, -250]}>
                <FrameHouses seed={91} count={40} inner={0} outer={120} />
            </group>
            <Particles count={160} area={120} height={40} color="#c9c2b8" size={0.8} speed={0.3} />
        </group>
    );
}

// ─── Antietam, 17 September 1862: the cornfield, the church and the bridge ──
function Cornfield({ x0, x1, z0, z1, seed = 3 }: { x0: number; x1: number; z0: number; z1: number; seed?: number }) {
    const ref = useRef<THREE.InstancedMesh>(null);
    const stalks = useMemo(() => {
        const rand = mulberry32(seed);
        const out: [number, number, number][] = [];
        for (let x = x0; x < x1; x += 2.2) for (let z = z0; z < z1; z += 2.6) out.push([x + (rand() - 0.5) * 0.8, z + (rand() - 0.5) * 0.8, 2.4 + rand() * 1.2]);
        return out;
    }, [x0, x1, z0, z1, seed]);
    const fill = (mesh: THREE.InstancedMesh | null) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        stalks.forEach(([x, z, h], i) => {
            d.position.set(x, h / 2, z);
            d.scale.set(1, h, 1);
            d.rotation.set((x % 1) * 0.15, x * z, 0);
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    };
    return (
        <instancedMesh ref={(m) => { ref.current = m; fill(m); }} args={[undefined, undefined, stalks.length]} castShadow>
            <coneGeometry args={[0.5, 1, 5]} />
            <meshStandardMaterial color="#a8a24e" roughness={1} flatShading />
        </instancedMesh>
    );
}

function StoneBridge({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
    return (
        <group position={position} rotation={[0, rotation, 0]}>
            {[-6, 0, 6].map((x) => (
                <mesh key={x} castShadow position={[x, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.6, 0.9, 8, 16, Math.PI]} />
                    <meshStandardMaterial color="#9a958a" roughness={1} />
                </mesh>
            ))}
            <mesh castShadow receiveShadow position={[0, 4.2, 0]}>
                <boxGeometry args={[22, 1, 5]} />
                <meshStandardMaterial color="#a39d90" roughness={1} />
            </mesh>
            {[-1, 1].map((s) => (
                <mesh key={s} position={[0, 5.0, s * 2.3]}>
                    <boxGeometry args={[22, 0.8, 0.5]} />
                    <meshStandardMaterial color="#8f8a7e" roughness={1} />
                </mesh>
            ))}
        </group>
    );
}

export function AntietamField() {
    const roof = useMemo(() => gableGeometry(11, 3, 15), []);
    return (
        <group>
            <Hill position={[-40, 0, -240]} radius={90} height={14} color="#6f8a4c" />
            <Hill position={[110, 0, 120]} radius={70} height={10} color="#6f8a4c" />
            <Cornfield x0={-150} x1={-74} z0={-70} z1={10} />
            {/* the Dunker Church, whitewashed brick */}
            <group position={[-62, 0, -96]}>
                <mesh castShadow receiveShadow position={[0, 3.5, 0]}>
                    <boxGeometry args={[10, 7, 14]} />
                    <meshStandardMaterial color="#f1eee6" roughness={0.9} />
                </mesh>
                <mesh castShadow geometry={roof} position={[0, 7, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <meshStandardMaterial color="#4a3b30" roughness={0.95} />
                </mesh>
            </group>
            {/* the Sunken Road, worn below the fields */}
            <mesh rotation={[-Math.PI / 2, 0, 0.12]} position={[-10, 0.05, -64]} receiveShadow>
                <planeGeometry args={[150, 6]} />
                <meshStandardMaterial color="#7d6a4e" roughness={1} />
            </mesh>
            <RailFence from={[-85, -60]} to={[65, -76]} />
            <RailFence from={[-85, -70]} to={[65, -86]} />
            {/* Antietam Creek and Burnside's Bridge */}
            <mesh rotation={[-Math.PI / 2, 0, 0.08]} position={[96, 0.08, 0]}>
                <planeGeometry args={[14, 500]} />
                <meshStandardMaterial color="#4f7480" roughness={0.15} metalness={0.4} />
            </mesh>
            <StoneBridge position={[96, 0, 18]} rotation={0.08} />
            <RailFence from={[-120, 40]} to={[-70, 90]} />
            <RailFence from={[60, 70]} to={[70, 120]} />
            <Flag position={[-30, 0, 76]} kind="us" height={10} />
            <Flag position={[30, 0, 76]} kind="us" height={10} />
            <Flag position={[0, 0, -86]} kind="csa-battle" height={10} />
            <Trees count={50} innerRadius={110} outerRadius={200} seed={33} />
            <Particles count={160} color="#e6e2da" size={0.6} speed={0.3} />
        </group>
    );
}

// ─── Gettysburg, 3 July 1863: Cemetery Ridge ───────────────────────────────
function StoneWall({ from, to }: { from: [number, number]; to: [number, number] }) {
    const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
    const rot = -Math.atan2(to[1] - from[1], to[0] - from[0]);
    return (
        <mesh castShadow receiveShadow position={[(from[0] + to[0]) / 2, 0.6, (from[1] + to[1]) / 2]} rotation={[0, rot, 0]}>
            <boxGeometry args={[len, 1.2, 1.2]} />
            <meshStandardMaterial color="#8f8b82" roughness={1} flatShading />
        </mesh>
    );
}

export function GettysburgField() {
    const m = colonialMats();
    return (
        <group>
            {/* Cemetery Ridge, the Union line, and the Round Tops to the south */}
            <Hill position={[0, 0, 160]} radius={90} height={9} color="#6c8549" />
            <Hill position={[120, 0, 50]} radius={30} height={22} color="#5f7a42" />
            <Hill position={[160, 0, 70]} radius={40} height={34} color="#567038" />
            <Hill position={[-130, 0, 70]} radius={36} height={14} color="#6c8549" />
            {/* the stone wall and the Angle */}
            <StoneWall from={[-70, 52]} to={[-6, 52]} />
            <StoneWall from={[-6, 52]} to={[-6, 44]} />
            <StoneWall from={[-6, 44]} to={[70, 44]} />
            {/* the copse of trees, the "High Water Mark" */}
            {[[6, 58], [12, 62], [2, 64], [16, 56], [9, 68]].map(([x, z], i) => (
                <group key={i} position={[x, 0, z]}>
                    <mesh position={[0, 2, 0]}>
                        <cylinderGeometry args={[0.35, 0.45, 4, 6]} />
                        <meshStandardMaterial color="#4c3a2a" roughness={1} />
                    </mesh>
                    <mesh castShadow position={[0, 6, 0]}>
                        <icosahedronGeometry args={[3.6, 0]} />
                        <meshStandardMaterial color="#3e5a2c" roughness={1} flatShading />
                    </mesh>
                </group>
            ))}
            {/* Union batteries along the crest */}
            {[-60, -40, -20, 30, 50, 70].map((x) => (
                <FieldGun key={x} position={[x, 0, 60]} rotation={Math.PI} />
            ))}
            {/* the Emmitsburg Road and its fences crossing the field */}
            <mesh rotation={[-Math.PI / 2, 0, -0.35]} position={[30, 0.05, 0]} receiveShadow>
                <planeGeometry args={[8, 320]} />
                <meshStandardMaterial color="#8d7a5c" roughness={1} />
            </mesh>
            <RailFence from={[-20, -60]} to={[80, 60]} />
            <RailFence from={[-12, -66]} to={[88, 54]} />
            {/* Seminary Ridge, where the Confederate line waits in the trees */}
            <Trees count={40} innerRadius={130} outerRadius={180} seed={44} />
            {Array.from({ length: 16 }, (_, i) => (
                <group key={i} position={[-150 + i * 20, 0, -120 - (i % 3) * 6]}>
                    <mesh castShadow position={[0, 6, 0]}>
                        <icosahedronGeometry args={[5, 0]} />
                        <meshStandardMaterial color="#3b5529" roughness={1} flatShading />
                    </mesh>
                </group>
            ))}
            {/* the Lutheran Seminary cupola and the town beyond */}
            <group position={[-110, 0, -140]}>
                <mesh castShadow position={[0, 6, 0]}>
                    <boxGeometry args={[22, 12, 12]} />
                    <primitive object={m.brick} attach="material" />
                </mesh>
                <mesh castShadow position={[0, 14, 0]}>
                    <cylinderGeometry args={[2, 2, 4, 8]} />
                    <meshStandardMaterial color="#f2efe6" roughness={0.7} />
                </mesh>
                <mesh castShadow position={[0, 17, 0]}>
                    <sphereGeometry args={[2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#f2efe6" roughness={0.7} />
                </mesh>
            </group>
            <group position={[-200, 0, -40]}>
                <FrameHouses seed={45} count={22} inner={0} outer={50} />
            </group>
            {/* the Evergreen Cemetery gatehouse on Cemetery Hill */}
            <group position={[-130, 14, 70]}>
                {[-1, 1].map((s) => (
                    <mesh key={s} castShadow position={[s * 4, 3, 0]}>
                        <boxGeometry args={[3, 6, 3]} />
                        <primitive object={m.brick} attach="material" />
                    </mesh>
                ))}
                <mesh castShadow position={[0, 6.5, 0]}>
                    <boxGeometry args={[11, 1.4, 3]} />
                    <primitive object={m.brick} attach="material" />
                </mesh>
            </group>
            <Flag position={[-10, 0, 62]} kind="us" height={10} />
            <Flag position={[40, 0, 58]} kind="us" height={10} />
            <Flag position={[-30, 0, -100]} kind="csa-battle" height={10} />
            <Flag position={[30, 0, -104]} kind="csa-battle" height={10} />
            {/* smoke of the great cannonade */}
            <Particles count={240} color="#dcd8d0" size={0.75} speed={0.25} />
        </group>
    );
}

// ─── Ford's Theatre, 14 April 1865: "Our American Cousin" ───────────────────
export function FordsTheatre() {
    const W = 26;
    const D = 36;
    const H = 18;
    const seats = useMemo(() => {
        const out: [number, number][] = [];
        for (let r = 0; r < 9; r++) for (let c = 0; c < 16; c++) out.push([-15 + c * 2 + (r % 2) * 0.6, 4 + r * 2.6]);
        return out;
    }, []);
    const seatRef = (mesh: THREE.InstancedMesh | null) => {
        if (!mesh) return;
        const d = new THREE.Object3D();
        seats.forEach(([x, z], i) => {
            d.position.set(x, 0.7, z);
            d.updateMatrix();
            mesh.setMatrixAt(i, d.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    };
    return (
        <group>
            {/* floor, walls and ceiling */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]} receiveShadow>
                <planeGeometry args={[W * 2, D * 2]} />
                <meshStandardMaterial color="#5a3a24" roughness={0.7} />
            </mesh>
            {[-1, 1].map((s) => (
                <mesh key={s} position={[s * W, H / 2, 0]} rotation={[0, -s * Math.PI / 2, 0]} receiveShadow>
                    <planeGeometry args={[D * 2, H]} />
                    <meshStandardMaterial color="#6e1f22" roughness={0.9} />
                </mesh>
            ))}
            <mesh position={[0, H / 2, D]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[W * 2, H]} />
                <meshStandardMaterial color="#6e1f22" roughness={0.9} />
            </mesh>
            <mesh position={[0, H, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[W * 2, D * 2]} />
                <meshStandardMaterial color="#3a2a22" roughness={0.9} side={THREE.DoubleSide} />
            </mesh>
            {/* the stage with painted scenery and footlights */}
            <mesh castShadow receiveShadow position={[0, 1.4, -D + 9]}>
                <boxGeometry args={[W * 2, 2.8, 18]} />
                <meshStandardMaterial color="#4a2e1c" roughness={0.8} />
            </mesh>
            <mesh position={[0, 9, -D + 0.5]}>
                <planeGeometry args={[W * 2, 14]} />
                <meshStandardMaterial color="#7f9a7a" roughness={1} />
            </mesh>
            {/* proscenium arch and the red curtain drawn back */}
            {[-1, 1].map((s) => (
                <group key={s}>
                    <mesh position={[s * 17, H / 2, -D + 18]}>
                        <boxGeometry args={[4, H, 1.4]} />
                        <meshStandardMaterial color="#d8c08a" roughness={0.5} metalness={0.3} />
                    </mesh>
                    <mesh position={[s * 13.5, 10, -D + 17]}>
                        <boxGeometry args={[3.5, 13, 0.6]} />
                        <meshStandardMaterial color="#8c1a20" roughness={0.9} />
                    </mesh>
                </group>
            ))}
            <mesh position={[0, H - 1.5, -D + 18]}>
                <boxGeometry args={[W * 2, 3, 1.4]} />
                <meshStandardMaterial color="#d8c08a" roughness={0.5} metalness={0.3} />
            </mesh>
            {Array.from({ length: 18 }, (_, i) => (
                <mesh key={i} position={[-17 + i * 2, 2.95, -D + 18.4]}>
                    <sphereGeometry args={[0.22, 8, 6]} />
                    <meshStandardMaterial color="#ffe2a0" emissive="#ffc766" emissiveIntensity={2.5} />
                </mesh>
            ))}
            {/* the presidential box, stage right, draped in flags with Washington's portrait */}
            <group position={[W - 4, 7.2, -D + 22]}>
                <mesh castShadow position={[0, 0, 0]}>
                    <boxGeometry args={[7, 0.6, 8]} />
                    <meshStandardMaterial color="#d8c08a" roughness={0.5} metalness={0.3} />
                </mesh>
                <mesh position={[-3.4, 1.2, 0]}>
                    <boxGeometry args={[0.3, 2.4, 8]} />
                    <meshStandardMaterial color="#d8c08a" roughness={0.5} metalness={0.3} />
                </mesh>
                {[-2, 2].map((z) => (
                    <mesh key={z} position={[-3.6, 0.6, z]} rotation={[0, -Math.PI / 2, 0]}>
                        <planeGeometry args={[3.6, 1.9]} />
                        <meshStandardMaterial map={flagTexture('us')} roughness={0.85} side={THREE.DoubleSide} />
                    </mesh>
                ))}
                <mesh position={[-3.62, -0.8, 0]}>
                    <boxGeometry args={[0.1, 1.6, 1.2]} />
                    <meshStandardMaterial color="#5a4632" roughness={0.6} />
                </mesh>
                <mesh position={[0, 3.6, 0]}>
                    <boxGeometry args={[7, 0.3, 8]} />
                    <meshStandardMaterial color="#8c1a20" roughness={0.9} />
                </mesh>
            </group>
            {/* dress circle balcony around the back */}
            <mesh castShadow position={[0, 6.5, D - 8]}>
                <boxGeometry args={[W * 2, 0.8, 16]} />
                <meshStandardMaterial color="#4a2e1c" roughness={0.8} />
            </mesh>
            <mesh position={[0, 7.6, D - 16]}>
                <boxGeometry args={[W * 2, 1.4, 0.3]} />
                <meshStandardMaterial color="#d8c08a" roughness={0.5} metalness={0.3} />
            </mesh>
            {/* orchestra seats */}
            <instancedMesh ref={seatRef} args={[undefined, undefined, seats.length]} castShadow>
                <boxGeometry args={[1.4, 1.4, 1.2]} />
                <meshStandardMaterial color="#7a2328" roughness={0.9} />
            </instancedMesh>
            {/* gaslight chandelier and wall sconces */}
            <group position={[0, H - 4, 6]}>
                <mesh>
                    <torusGeometry args={[3, 0.15, 6, 24]} />
                    <meshStandardMaterial color="#c9a85a" metalness={0.8} roughness={0.3} />
                </mesh>
                {Array.from({ length: 10 }, (_, i) => (
                    <mesh key={i} position={[Math.cos((i / 10) * Math.PI * 2) * 3, 0.4, Math.sin((i / 10) * Math.PI * 2) * 3]}>
                        <sphereGeometry args={[0.28, 8, 6]} />
                        <meshStandardMaterial color="#fff0c0" emissive="#ffcf7a" emissiveIntensity={3} />
                    </mesh>
                ))}
                <pointLight color="#ffcf8a" intensity={260} distance={60} decay={1.6} />
            </group>
            <pointLight position={[0, 6, -D + 20]} color="#ffd9a0" intensity={220} distance={50} decay={1.6} />
            <pointLight position={[W - 6, 10, -D + 22]} color="#ffcf8a" intensity={200} distance={30} decay={1.6} />
            <pointLight position={[0, 9, D - 20]} color="#ffcf8a" intensity={140} distance={40} decay={1.6} />
            <Citizens count={40} radius={14} seed={95} style="colonial" />
        </group>
    );
}

export { CSA_GREY, UNION_BLUE };
