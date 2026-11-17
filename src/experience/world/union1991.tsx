/** Original procedural sets. Composite architecture, not a reconstruction of a named building.
 * Geometry is batched by material: hundreds of windows/props share a handful of draw calls.
 * No downloaded models, insignia, portraits or fonts. Units are approximately metres. */
import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Vec3 } from '../types';

type Piece = { p: Vec3; s: Vec3; r?: number };
type Batch = Record<string, Piece[]>;
function add(b: Batch, color: string, p: Vec3, s: Vec3, r = 0) {
    (b[color] ??= []).push({ p, s, r });
}
function Boxes({ color, pieces }: { color: string; pieces: Piece[] }) {
    const ref = useRef<THREE.InstancedMesh>(null);
    useLayoutEffect(() => {
        const dummy = new THREE.Object3D();
        pieces.forEach(({ p, s, r }, i) => {
            dummy.position.set(...p); dummy.scale.set(...s); dummy.rotation.set(0, r ?? 0, 0);
            dummy.updateMatrix(); ref.current!.setMatrixAt(i, dummy.matrix);
        });
        ref.current!.instanceMatrix.needsUpdate = true;
        ref.current!.computeBoundingSphere();
    }, [pieces]);
    return <instancedMesh ref={ref} args={[undefined, undefined, pieces.length]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} roughness={color === '#a3b9b8' ? 0.32 : 0.87} metalness={color === '#38494b' ? 0.35 : 0} />
    </instancedMesh>;
}
const concrete = '#b7b6a9', stone = '#69777b', wood = '#635045', dark = '#29343f', glass = '#a3b9b8', cream = '#e5ddc5', red = '#8d4f43';
function person(b: Batch, x: number, z: number, coat: string, facing = 0) {
    add(b, coat, [x, 1.1, z], [.48, .95, .32], facing);
    add(b, '#bf967a', [x, 1.79, z], [.28, .32, .29], facing);
    add(b, dark, [x, 1.96, z], [.32, .09, .32], facing);
    for (const side of [-1, 1]) {
        add(b, dark, [x + side * .14, .39, z], [.16, .68, .21]);
        add(b, dark, [x + side * .14, .09, z + .06], [.2, .15, .37]);
        add(b, coat, [x + side * .32, 1.12, z], [.15, .7, .22]);
    }
}
function table(b: Batch, x: number, z: number, w: number, d: number) {
    add(b, wood, [x, 1.05, z], [w, .14, d]);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(b, dark, [x + sx * (w / 2 - .16), .5, z + sz * (d / 2 - .16)], [.13, 1, .13]);
}
function chair(b: Batch, x: number, z: number, reverse = false) {
    add(b, red, [x, .53, z], [.58, .12, .58]);
    add(b, red, [x, .95, z + (reverse ? -.26 : .26)], [.58, .76, .09]);
    for (const dx of [-.22, .22]) for (const dz of [-.22, .22]) add(b, dark, [x + dx, .26, z + dz], [.06, .52, .06]);
}
function apartment(b: Batch, x: number, z: number, w: number, floors: number) {
    add(b, concrete, [x, floors * 1.5, z], [w, floors * 3, 8]);
    add(b, stone, [x, .6, z + 4.2], [w + .6, 1.2, .5]);
    add(b, stone, [x, floors * 3 + .18, z], [w + .6, .36, 8.6]);
    for (let f = 0; f < floors; f++) for (let i = 0; i < Math.floor(w / 2.4); i++) {
        const xx = x - w / 2 + 1.3 + i * 2.4;
        add(b, dark, [xx, 1.7 + f * 3, z + 4.02], [1.5, 1.9, .12]);
        add(b, (i + f) % 5 === 0 ? cream : glass, [xx, 1.7 + f * 3, z + 4.11], [1.27, 1.63, .05]);
        add(b, stone, [xx, 1.7 + f * 3, z + 4.17], [.07, 1.65, .07]);
        add(b, cream, [xx, .75 + f * 3, z + 4.2], [1.7, .12, .5]);
    }
}
function buildSquare(): Batch {
    const b: Batch = {};
    add(b, stone, [0, -.18, 0], [120, .4, 120]);
    add(b, '#444f57', [0, .02, 23], [110, .04, 9]);
    for (let x = -50; x <= 50; x += 6) add(b, cream, [x, .05, 23], [3, .03, .15]);
    // Paving, reflecting the scale of the public square rather than an empty field.
    for (let x = -24; x < 27; x += 3) for (let z = -24; z < 19; z += 3)
        add(b, (x + z) % 2 ? '#8e9999' : '#99a3a1', [x, .025, z], [2.94, .05, 2.94]);
    apartment(b, -36, -31, 25, 5); apartment(b, 35, -31, 27, 6);
    // Government entrance: wide stairs, doors, bronze frames and rhythmic pilasters.
    add(b, concrete, [0, 6.2, -28], [29, 12.4, 9]);
    for (let i = 0; i < 4; i++) add(b, cream, [0, i * .16, -18 - i * .65], [24 - i, .32, 4 - i * .4]);
    add(b, dark, [0, 2.4, -23.35], [8, 3.6, .3]);
    for (let x = -12; x <= 12; x += 4) {
        add(b, cream, [x, 6.5, -22.8], [.65, 11, .85]);
        add(b, glass, [x + 1.8, 7.5, -23.4], [2.5, 5.6, .12]);
    }
    add(b, cream, [0, 12.9, -27], [31, .75, 11]);
    // A glass-fronted food kiosk and a delivery van, modest and human-scale.
    add(b, '#537978', [17, 1.7, 5], [5.7, 3.4, 4]);
    add(b, cream, [17, 3.5, 5], [6.3, .25, 4.6]);
    add(b, dark, [17, 2, 7.05], [4.3, 1.7, .15]);
    add(b, glass, [17, 2.2, 7.16], [3.8, 1.1, .06]);
    for (let i = 0; i < 5; i++) { add(b, wood, [13 + i * .75, .4, 9.2], [.65, .8, .65]); person(b, 12 - i * .6, 8 + i * 1.05, i % 2 ? '#685e58' : '#3b5366'); }
    add(b, cream, [-18, 1.8, 23], [8, 2.8, 3]);
    add(b, '#49777d', [-18, 1.1, 23], [8.1, .55, 3.1]);
    for (let x = -21; x < -14; x += 1.35) add(b, glass, [x, 2.2, 24.55], [1.1, 1.2, .06]);
    for (const x of [-20.4, -15.6]) for (const z of [21.5, 24.5]) add(b, dark, [x, .6, z], [1.1, 1.1, .24]);
    // Public noticeboard, radio desk, benches, small gathering and barrier-free routes.
    table(b, 15, -13, 3, 1.5); add(b, dark, [15, 1.5, -13], [1.2, .8, .5]);
    add(b, glass, [14.7, 1.52, -12.73], [.32, .3, .03]);
    add(b, cream, [15.2, 2.2, -13], [.035, 1.5, .035]);
    add(b, wood, [-17, 2.4, -12], [5, 2.5, .25]);
    for (const x of [-19, -15]) add(b, dark, [x, 1.4, -12], [.15, 2.8, .15]);
    for (let i = 0; i < 4; i++) add(b, cream, [-18.65 + i * 1.1, 2.4, -11.85], [.85, 1.75, .03]);
    for (const x of [-26, 26]) for (const z of [-16, 0, 15]) {
        add(b, '#38494b', [x, 3.5, z], [.16, 7, .16]);
        add(b, cream, [x, 7, z], [.9, .3, .6]);
        table(b, x > 0 ? x - 3 : x + 3, z, 3, .6);
        add(b, stone, [x, .6, z + 3], [1.7, 1.2, 1.7]);
        add(b, '#596951', [x, 1.4, z + 3], [1.5, .5, 1.5]);
    }
    for (let i = 0; i < 11; i++) person(b, -8 + (i % 5) * 1.4, -8 - Math.floor(i / 5) * 1.7, i % 2 ? '#685e58' : '#3b5366');
    return b;
}
function buildHall(): Batch {
    const b: Batch = {};
    add(b, wood, [0, -.22, -4], [42, .4, 37]);
    for (let x = -20; x <= 20; x += 2) for (let z = -20; z <= 12; z += 2)
        add(b, (x + z) % 4 ? '#6d6259' : '#837466', [x, .015, z], [1.96, .03, 1.96]);
    add(b, concrete, [0, 5, -22], [43, 10, .6]);
    add(b, wood, [0, 1.2, -21.6], [43, 2.4, .22]);
    for (const x of [-19, -12, -5, 2, 9, 16]) {
        add(b, dark, [x, 6.6, -21.6], [4.6, 5, .2]);
        add(b, glass, [x, 6.6, -21.4], [4.3, 4.7, .08]);
        add(b, cream, [x, 6.6, -21.3], [.1, 4.8, .08]);
        add(b, cream, [x, 6.6, -21.3], [4.4, .1, .08]);
        add(b, wood, [x + 2.7, 5, -21.3], [.6, 10, .6]);
        add(b, cream, [x, 2.2, -21.1], [3.5, 1.3, .4]); // radiator
    }
    // Eleven equal places; no leader gets a throne.
    table(b, 0, -4, 18, 5);
    for (let i = 0; i < 6; i++) for (const side of [-1, 1]) {
        if (i === 5 && side === 1) continue;
        const x = -7.5 + i * 3;
        const seatZ = -4 + side * 3.6;
        chair(b, x, seatZ, side === -1);
        // Seated delegates at equal eye level, facing the common table.
        add(b, i % 2 ? '#685e58' : '#3b5366', [x, 1.03, seatZ], [.47, .72, .32]);
        add(b, '#bf967a', [x, 1.58, seatZ], [.28, .32, .29]);
        add(b, dark, [x, 1.76, seatZ], [.29, .07, .3]);
        for (const leg of [-.14, .14]) {
            add(b, dark, [x + leg, .6, seatZ - side * .2], [.17, .2, .55]);
            add(b, dark, [x + leg, .31, seatZ - side * .4], [.17, .5, .2]);
        }
        add(b, cream, [x, 1.14, -4 + side * 1.8], [1.2, .03, .85], i * .04);
        add(b, '#49777d', [x + .3, 1.18, -4 + side * 1.5], [.7, .04, .55]);
        add(b, dark, [x - .6, 1.27, -4 + side * 1.8], [.07, .26, .07]);
        add(b, cream, [x + .9, 1.25, -4 + side * 1.8], [.17, .24, .17]);
    }
    // Telex, filing cabinets, map board and clerks: an administrative transition, not a battlefield.
    for (const x of [-16, 16]) {
        table(b, x, -13, 4, 2);
        add(b, concrete, [x, 1.35, -13], [1.2, .55, .9]);
        add(b, cream, [x, 1.7, -13.3], [.8, .25, .03]);
        for (let i = 0; i < 5; i++) add(b, dark, [x - .45 + i * .22, 1.63, -12.8], [.13, .05, .25]);
        person(b, x, -15, '#3b5366');
        add(b, stone, [x, 1.5, 5], [2.5, 3, 1]);
        for (let i = 0; i < 4; i++) add(b, dark, [x, .5 + i * .7, 5.55], [.65, .07, .1]);
    }
    add(b, '#49777d', [0, 3, -15], [7, 4, .3]);
    for (const x of [-3, 3]) add(b, dark, [x, 1.3, -15], [.15, 2.6, .15]);
    for (let i = 0; i < 11; i++) add(b, cream, [-2.7 + (i % 4) * 1.8, 4.1 - Math.floor(i / 4) * 1.1, -14.82], [1.3, .6, .03]);
    return b;
}
export function Union1991({ hall = false }: { hall?: boolean }) {
    const batches = useMemo(() => hall ? buildHall() : buildSquare(), [hall]);
    return <group>{Object.entries(batches).map(([color, pieces]) => <Boxes key={color} color={color} pieces={pieces} />)}</group>;
}
