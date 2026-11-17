/** Original procedural set, not a survey reconstruction. Every repeated solid is
 * instanced: façades, windows, benches and people share three geometry batches. */
import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Vec3 } from '../types';

type Solid = { p: Vec3; s: Vec3; c: string; r?: number };
type SetPieces = { boxes: Solid[]; cylinders: Solid[]; heads: Solid[]; lamps: Solid[] };
function buildSet(interior: boolean): SetPieces {
    const set: SetPieces = { boxes: [], cylinders: [], heads: [], lamps: [] };
    const box = (p: Vec3, s: Vec3, c: string, r = 0) => set.boxes.push({ p, s, c, r });
    const column = (p: Vec3, s: Vec3, c: string) => set.cylinders.push({ p, s, c });
    const lamp = (x: number, z: number, y = 6) => {
        column([x, y / 2, z], [.13, y, .13], '#273536');
        set.lamps.push({ p: [x, y, z], s: [.55, .9, .55], c: '#ffc883' });
        box([x, y + .6, z], [1, .2, 1], '#273536');
    };
    const person = (x: number, z: number, color: string, facing = 0) => {
        box([x, 1.25, z], [.65, 1.45, .45], color, facing);
        box([x - .18, .38, z], [.22, .76, .28], '#282c2d');
        box([x + .18, .38, z], [.22, .76, .28], '#282c2d');
        set.heads.push({ p: [x, 2.22, z], s: [.52, .62, .5], c: '#c8a083' });
        column([x, 2.55, z], [.34, .15, .32], color);
    };
    if (!interior) {
        box([8, -.05, -12], [60, .2, 110], '#60696a');
        box([-39, -.05, -12], [6, .2, 110], '#60696a');
        for (let row = 0; row < 33; row++) for (let col = 0; col < 10; col++) {
            box([-8 + col * 2 + (row % 2) * .7, .07, -30 + row * 2], [1.9, .04, 1.9], ['#6b7473', '#717975', '#64706e'][(row + col) % 3]);
        }
        // Recessed canal, granite quays, iron railings, bridge deck.
        box([-29, .07, -12], [12, .08, 106], '#233e4c');
        for (const x of [-36, -22]) {
            box([x, .6, -12], [1.4, 1.2, 108], '#8e9491');
            box([x, 2.1, -12], [.13, .15, 108], '#313b3e');
            for (let z = -62; z < 42; z += 3) column([x, 1.5, z], [.07, 1.5, .07], '#313b3e');
        }
        box([-29, .6, 14], [17, .65, 9], '#8e9491');
        for (const z of [10, 18]) box([-29, 2, z], [17, .18, .18], '#313b3e');
        // Smolny-inspired classical facade at the end of the perspective.
        box([0, 9, -44], [42, 18, 11], '#c7bd98');
        box([0, 18.3, -44], [44, .8, 12], '#e2d8b9');
        box([0, .8, -36], [30, 1.6, 5], '#a8aaa0');
        box([0, 1.8, -38], [26, .6, 3], '#bbb9aa');
        for (let x = -18; x <= 18; x += 3) {
            for (const y of [5, 11, 15]) box([x, y, -38.35], [1.4, 2.5, .15], '#35474a');
            if (Math.abs(x) <= 9) {
                column([x, 9, -36.8], [.5, 14, .5], '#e9dfc6');
                box([x, 16, -36.8], [1.4, .5, 1.4], '#eee1bf');
            }
        }
        box([0, 4, -38], [3, 5, .3], '#3a3430');
        // Independent brick factory / print shop, clerestories and smokestacks.
        for (const z of [-20, 8]) {
            box([29, 7, z], [13, 14, 22], '#7a4c3f');
            box([29, 14.3, z], [14, .7, 23], '#393f40');
            for (let dz = -8; dz <= 8; dz += 4) for (const y of [3, 8, 11.5]) {
                box([22.4, y, z + dz], [.15, 2.2, 1.8], '#d2b683');
                box([22.2, y, z + dz], [.2, .12, 2], '#3d4443');
            }
        }
        for (const z of [-22, -14]) column([34, 15, z], [1.2, 30, 1.2], '#664c43');
        // Apartment block and the bakery counter.
        box([-16, 7, -9], [9, 14, 27], '#a8aaa0');
        for (let z = -19; z <= 1; z += 4) for (const y of [4, 8, 12]) box([-11.4, y, z], [.2, 2, 1.3], '#41525a');
        box([-14, 1, 3], [5, 2, 2], '#67503c');
        for (let i = 0; i < 7; i++) {
            set.heads.push({ p: [-16 + i * .6, 2.1, 3], s: [.5, .25, .4], c: '#ba8b50' });
            person(-10 + (i % 2) * 1.1, 5 + i * 1.7, i % 2 ? '#6c6557' : '#3b4d55');
        }
        for (const x of [-7, 13]) for (let z = -28; z <= 26; z += 18) lamp(x, z);
        // Tram rails inlaid in wet cobbles; transverse sleepers remain batched.
        for (const x of [4, 6]) box([x, .1, 0], [.1, .1, 74], '#b0b4ac');
        for (let z = -30; z < 34; z += 2) box([5, .02, z], [3, .08, .18], '#514e47');
        for (let i = 0; i < 8; i++) person(12 + (i % 3) * 1.3, -23 + Math.floor(i / 3) * 2, '#535f59');
        // No Soviet state symbols: only plain red cloth used by revolutionaries.
        for (const x of [-9, 9]) box([x, 13, -35.9], [1.7, 4, .08], '#852f2c');
    } else {
        box([0, .02, -7], [48, .2, 58], '#5e5146');
        // Cutaway room: no roof or front wall to block the playable camera.
        box([0, 7, -30], [48, 14, 1], '#b5b09a');
        for (const x of [-24, 24]) box([x, 7, -12], [1, 14, 36], '#aaa993');
        for (let x = -20; x <= 20; x += 5) {
            box([x, 8, -29.3], [2.3, 7.5, .12], '#344b57');
            box([x, 8, -29.1], [.15, 7.5, .15], '#ded4b9');
            box([x, 8, -29.1], [2.4, .15, .15], '#ded4b9');
            column([x, 7, -27.8], [.35, 14, .35], '#e1d8ba');
        }
        box([0, 1, -21], [29, 2, 10], '#6b5342');
        box([0, .45, -14.5], [30, .9, 3], '#8e7760');
        box([0, 2.6, -9], [14, .4, 5], '#785c3f');
        for (const x of [-6, 6]) for (const z of [-11, -7]) box([x, 1.3, z], [.3, 2.6, .3], '#57412d');
        // Papers, ledger sheets and ballot box on the negotiation table.
        for (let i = 0; i < 8; i++) box([-5 + i * 1.3, 2.84, -9 + (i % 2) * .8], [.9, .02, 1.1], '#e3d4ae', i * .17);
        box([3, 3.2, -9.5], [1.4, .7, 1], '#3f4a49');
        box([3, 3.57, -9.5], [.7, .02, .08], '#171f23');
        for (const x of [-8, 8]) lamp(x, -10, 3.2);
        for (let row = 0; row < 4; row++) for (const x of [-13, 13]) {
            const z = 1 + row * 4;
            box([x, .9, z], [10, .4, 1.5], '#69533f');
            box([x, 1.6, z + .65], [10, 1.7, .25], '#69533f');
            for (let i = 0; i < 4; i++) person(x - 3.6 + i * 2.4, z - .7, ['#4e6068', '#6c534c', '#77725d'][i % 3]);
        }
        for (const x of [-4, 0, 4]) person(x, -12.5, '#3b4248');
        box([0, 5, -23], [2, 3, 1.5], '#65503f');
        box([0, 6.55, -23], [2.4, .2, 2], '#93795b');
        box([0, 10, -29], [4, 7, .05], '#7d302e');
    }
    return set;
}
function Batch({ items, shape = 'box', emissive = false }: { items: Solid[]; shape?: 'box' | 'cylinder' | 'head'; emissive?: boolean }) {
    const ref = useRef<THREE.InstancedMesh>(null);
    useLayoutEffect(() => {
        if (!ref.current) return;
        const dummy = new THREE.Object3D();
        const color = new THREE.Color();
        items.forEach((item, i) => {
            dummy.position.set(...item.p); dummy.scale.set(...item.s); dummy.rotation.set(0, item.r ?? 0, 0); dummy.updateMatrix();
            ref.current!.setMatrixAt(i, dummy.matrix); ref.current!.setColorAt(i, color.set(item.c));
        });
        ref.current.instanceMatrix.needsUpdate = true;
        if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
        ref.current.computeBoundingSphere();
    }, [items]);
    return <instancedMesh ref={ref} args={[undefined, undefined, items.length]} castShadow={!emissive} receiveShadow>
        {shape === 'box' ? <boxGeometry /> : shape === 'cylinder' ? <cylinderGeometry args={[1, 1, 1, 8]} /> : <sphereGeometry args={[.5, 8, 6]} />}
        {emissive ? <meshBasicMaterial toneMapped={false} /> : <meshStandardMaterial roughness={.82} metalness={.08} />}
    </instancedMesh>;
}
export function Petrograd1917({ interior = false }: { interior?: boolean }) {
    const set = useMemo(() => buildSet(interior), [interior]);
    return <group>
        <Batch items={set.boxes} /><Batch items={set.cylinders} shape="cylinder" /><Batch items={set.heads} shape="head" /><Batch items={set.lamps} emissive />
        <pointLight position={interior ? [0, 8, -9] : [0, 7, -30]} color="#ffc182" intensity={interior ? 45 : 25} distance={40} decay={2} />
    </group>;
}
