import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { EnvironmentId, Vec3 } from '../types';
export type CivicEnvironment = Extract<EnvironmentId, `civic-${string}`>;
const PALETTE = {
    plaster: '#c9bda5', stone: '#7f8179', oak: '#6e4e32', walnut: '#382d27',
    ink: '#263238', steel: '#5d6766', brass: '#b29c6a', paper: '#eadfc1',
    cloth: '#60736a', glass: '#77969c', night: '#344651', light: '#fff0c5',
    brick: '#88705d', skin: '#bc957d', hair: '#443b32', blue: '#506273',
};
type Finish = keyof typeof PALETTE;
/** Original architectural cutaways, not replicas of actual institutions. No textures or imported art. */
export function buildCivicArchitecture(environment: CivicEnvironment) {
    const buckets = new Map<Finish, THREE.BufferGeometry[]>();
    function primitive(kind: 'box' | 'cylinder' | 'sphere' | 'torus', finish: Finish, position: Vec3, scale: Vec3, rotation: Vec3 = [0, 0, 0]) {
        const geometry = kind === 'box' ? new THREE.BoxGeometry(1, 1, 1) : kind === 'cylinder' ? new THREE.CylinderGeometry(0.5, 0.5, 1, 12) : kind === 'sphere' ? new THREE.SphereGeometry(0.5, 12, 8) : new THREE.TorusGeometry(0.43, 0.07, 6, 20);
        geometry.scale(...scale); geometry.rotateX(rotation[0]); geometry.rotateY(rotation[1]); geometry.rotateZ(rotation[2]); geometry.translate(...position);
        const list = buckets.get(finish) ?? []; list.push(geometry); buckets.set(finish, list);
    }
    const box = (f: Finish, p: Vec3, s: Vec3, r: Vec3 = [0, 0, 0]) => primitive('box', f, p, s, r);
    const cylinder = (f: Finish, p: Vec3, s: Vec3, r: Vec3 = [0, 0, 0]) => primitive('cylinder', f, p, s, r);
    const desk = (x: number, z: number, wide = 4) => {
        box('oak', [x, 1.45, z], [wide, 0.22, 2]);
        for (const dx of [-wide / 2 + 0.25, wide / 2 - 0.25]) for (const dz of [-0.7, 0.7]) box('walnut', [x + dx, 0.73, z + dz], [0.18, 1.46, 0.18]);
        box('oak', [x, 1.1, z - 0.6], [wide - 0.4, 0.5, 0.5]);
        for (const dx of [-wide / 4, wide / 4]) cylinder('brass', [x + dx, 1.1, z - 0.89], [0.12, 0.12, 0.12]);
    };
    const chair = (x: number, z: number, facing = 0) => {
        box('cloth', [x, 0.87, z], [0.95, 0.18, 0.95]); box('oak', [x, 1.5, z + (facing ? 0.4 : -0.4)], [0.95, 1, 0.12]);
        for (const dx of [-0.34, 0.34]) for (const dz of [-0.34, 0.34]) box('walnut', [x + dx, 0.42, z + dz], [0.1, 0.85, 0.1]);
    };
    const lamp = (x: number, z: number) => {
        cylinder('brass', [x, 1.62, z], [0.6, 0.1, 0.6]); cylinder('brass', [x, 2.05, z], [0.06, 0.85, 0.06]);
        primitive('sphere', 'cloth', [x, 2.47, z], [1.1, 0.45, 0.65]);
        box('light', [x, 2.35, z], [0.9, 0.04, 0.45]);
    };
    const papers = (x: number, y: number, z: number, count = 4) => {
        for (let i = 0; i < count; i++) box('paper', [x + (i % 2) * 0.03, y + i * 0.025, z], [1.05, 0.02, 0.75], [0, (i % 3) * 0.025, 0]);
        for (let row = 0; row < 4; row++) box('ink', [x - 0.05, y + count * 0.025, z - 0.2 + row * 0.12], [0.7 - row % 2 * 0.1, 0.008, 0.016]);
    };
    const typewriter = (x: number, z: number) => {
        box('ink', [x, 1.8, z], [1.45, 0.4, 1.1]);
        cylinder('steel', [x, 2.1, z - 0.35], [0.22, 1.45, 0.22], [0, 0, Math.PI / 2]);
        box('paper', [x, 2.38, z - 0.4], [0.95, 0.6, 0.02]);
        for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) cylinder('paper', [x - 0.55 + c * 0.155, 2.015, z + r * 0.15], [0.08, 0.025, 0.08]);
        box('brass', [x, 2.02, z + 0.45], [0.8, 0.03, 0.08]);
    };
    const telephone = (x: number, z: number) => {
        box('ink', [x, 1.75, z], [1, 0.3, 0.8]); cylinder('brass', [x, 1.92, z + 0.1], [0.5, 0.04, 0.5]);
        primitive('torus', 'ink', [x, 1.95, z + 0.1], [0.4, 0.4, 0.4], [Math.PI / 2, 0, 0]);
        cylinder('ink', [x, 2.1, z - 0.2], [0.16, 1.2, 0.16], [0, 0, Math.PI / 2]);
        for (const dx of [-0.48, 0.48]) primitive('sphere', 'ink', [x + dx, 2.04, z - 0.2], [0.35, 0.28, 0.35]);
    };
    const civilian = (x: number, z: number, coat: Finish) => {
        box(coat, [x, 1.34, z], [0.66, 0.95, 0.45]); primitive('sphere', 'skin', [x, 2.13, z], [0.5, 0.57, 0.5]);
        primitive('sphere', 'hair', [x, 2.33, z - 0.03], [0.52, 0.23, 0.48]);
        for (const dx of [-0.19, 0.19]) { box('walnut', [x + dx, 0.58, z], [0.23, 0.76, 0.3]); box('ink', [x + dx, 0.16, z + 0.09], [0.29, 0.16, 0.48]); box(coat, [x + dx * 2.3, 1.3, z], [0.17, 0.75, 0.2]); }
    };
    box('stone', [0, -0.35, 0], [52, 0.6, 42]);
    box('oak', [0, 0, 0], [28, 0.18, 22]);
    for (let x = -14; x <= 14; x++) box('walnut', [x, 0.1, 0], [0.015, 0.01, 22]);
    for (let z = -10; z <= 10; z += 4) for (let x = -13; x < 14; x += 2) box('walnut', [x, 0.1, z + x % 2], [1, 0.01, 0.015]);
    box('plaster', [0, 3.3, -11], [28, 6.6, 0.35]); box('plaster', [-14, 3.3, -2], [0.35, 6.6, 18]);
    box('walnut', [0, 0.65, -10.75], [28, 1.1, 0.1]); box('oak', [0, 1.25, -10.65], [28, 0.1, 0.2]);
    for (const y of [5.8, 6.15]) box('plaster', [0, y, -10.6], [28, 0.17, 0.5]);
    for (const x of [-10, -3, 4, 11]) {
        box('walnut', [x, 3.7, -10.7], [4.2, 4.5, 0.2]); box('glass', [x, 3.7, -10.55], [3.8, 4.1, 0.08]);
        box('paper', [x, 3.7, -10.45], [0.1, 4.1, 0.1]); box('paper', [x, 3.7, -10.45], [3.8, 0.1, 0.1]);
        box('stone', [x, 1.5, -10.3], [4.7, 0.2, 0.7]);
        for (let i = 0; i < 10; i++) cylinder('steel', [x - 1.25 + i * 0.28, 0.8, -10.1], [0.18, 1.1, 0.24]);
    }
    // Courtyard buildings with repeated sash windows and cornices, not a real address.
    for (let n = 0; n < 5; n++) {
        const x = -24 + n * 11;
        box(n % 2 ? 'stone' : 'brick', [x, 6.5, -23], [10, 13, 5]);
        for (const y of [1.5, 5, 8.5, 12]) {
            box('plaster', [x, y + 1.2, -20.35], [10.4, 0.18, 0.25]);
            for (const dx of [-3, 0, 3]) { box('night', [x + dx, y, -20.4], [1.4, 2, 0.1]); box('plaster', [x + dx, y, -20.3], [0.07, 2, 0.04]); }
        }
    }
    // A plain clock with tick marks only, never a political emblem.
    cylinder('brass', [0.5, 4.8, -10.4], [1.3, 0.1, 1.3], [Math.PI / 2, 0, 0]);
    cylinder('paper', [0.5, 4.8, -10.32], [1.17, 0.04, 1.17], [Math.PI / 2, 0, 0]);
    for (let n = 0; n < 12; n++) { const a = n * Math.PI / 6; box('ink', [0.5 + Math.sin(a) * 0.48, 4.8 + Math.cos(a) * 0.48, -10.28], [0.035, 0.09, 0.02], [0, 0, -a]); }
    box('ink', [0.5, 4.95, -10.24], [0.04, 0.3, 0.03]); box('ink', [0.62, 4.8, -10.23], [0.27, 0.04, 0.03]);
    if (environment === 'civic-newsroom') {
        // Mechanical platen press: broad cast-iron frames, horizontal rollers and flywheel.
        for (const x of [-10.3, -6.7]) {
            box('ink', [x, 1.4, -3], [0.35, 2.6, 4.4]);
            box('steel', [x, 0.25, -3], [0.9, 0.3, 5]);
        }
        for (const z of [-4.5, -2.8, -1.1]) cylinder('steel', [-8.5, 2.15, z], [0.8, 4, 0.8], [0, 0, Math.PI / 2]);
        box('oak', [-8.5, 1.6, 0], [3.8, 0.18, 2.2]); papers(-8.5, 1.72, 0, 12);
        primitive('torus', 'ink', [-10.8, 1.7, -3], [2.8, 2.8, 2.8], [0, Math.PI / 2, 0]);
        for (let i = 0; i < 6; i++) box('brass', [-10.8, 1.7, -3], [0.08, 2.25, 0.08], [i * Math.PI / 3, 0, 0]);
        cylinder('steel', [-10.8, 1.7, -3], [0.35, 0.65, 0.35], [0, 0, Math.PI / 2]);
        desk(-5, 3, 6); papers(-5, 1.6, 3); lamp(-7, 3);
        for (const [x, z] of [[7, -3], [6, 4], [0, -6]]) { desk(x, z); typewriter(x - 0.4, z); lamp(x + 1.4, z); chair(x, z + 2, 1); }
        for (let row = 0; row < 4; row++) { box('oak', [10, 0.5 + row * 0.7, -8], [5.4, 0.45, 2.3]); for (let c = 0; c < 7; c++) box('brass', [7.7 + c * 0.7, 0.5 + row * 0.7, -6.82], [0.24, 0.07, 0.03]); }
        for (let row = 0; row < 3; row++) papers(-11, 0.18 + row * 0.4, 7, 12);
        telephone(6, 4); civilian(8, 6, 'blue'); civilian(-4, 5, 'cloth');
    } else if (environment === 'civic-archive') {
        for (const x of [-10, -5, 5, 10]) {
            for (const dx of [-1.8, 1.8]) box('walnut', [x + dx, 2.6, -7.5], [0.17, 5.2, 2.2]);
            for (const y of [0.3, 1.6, 2.9, 4.2, 5.2]) box('oak', [x, y, -7.5], [3.8, 0.14, 2.2]);
            for (let row = 0; row < 4; row++) for (let n = 0; n < 9; n++) { box(n % 3 ? 'cloth' : 'blue', [x - 1.5 + n * 0.37, 0.9 + row * 1.3, -7.5], [0.29, 1, 1.4]); box('paper', [x - 1.5 + n * 0.37, 0.85 + row * 1.3, -6.78], [0.17, 0.18, 0.02]); }
        }
        desk(-4, 1, 7); papers(-4, 1.62, 1, 8); lamp(-6.5, 1); chair(-4, 3, 1);
        desk(7, 3); telephone(7, 3); papers(8.3, 1.6, 3); chair(7, 5, 1);
        box('walnut', [-11, 1.5, 1], [3, 3, 5]);
        for (let i = 0; i < 6; i++) { box('oak', [-10.9, 0.4 + i * 0.43, 3.55], [2.8, 0.36, 0.12]); box('brass', [-10.9, 0.4 + i * 0.43, 3.63], [0.7, 0.06, 0.04]); }
        // Rolling archive cart and plain tied document bundles.
        box('oak', [1, 1, 6], [3, 0.15, 2]); box('oak', [1, 0.3, 6], [3, 0.15, 2]);
        for (const x of [-0.3, 2.3]) box('steel', [x, 0.8, 6], [0.1, 1.5, 1.8]);
        papers(0.3, 1.1, 6, 8); papers(1.6, 1.1, 6, 8); civilian(1, 3, 'cloth');
    } else {
        // Modest civic meeting room, not a parliamentary chamber replica.
        desk(0, 0, 12); box('cloth', [0, 1.58, 0], [11.6, 0.04, 1.6]);
        for (const x of [-5, -2.5, 0, 2.5, 5]) { chair(x, -2); chair(x, 2, 1); papers(x, 1.64, 0); }
        for (const x of [-4, 4]) lamp(x, -0.5);
        desk(-7, 5); papers(-7, 1.6, 5); desk(7, 5); papers(7, 1.6, 5);
        box('walnut', [-9, 1.2, -6], [5, 2.3, 2]);
        for (const x of [-10.5, -9, -7.5]) { box('oak', [x, 1.2, -4.96], [1.3, 2, 0.08]); cylinder('brass', [x + 0.3, 1.3, -4.85], [0.12, 0.12, 0.12]); }
        box('walnut', [8.5, 2.7, -8.5], [5, 3, 0.2]); box('paper', [8.5, 2.7, -8.35], [4.6, 2.6, 0.05]);
        for (let row = 0; row < 5; row++) box('ink', [8.3, 3.5 - row * 0.4, -8.3], [3.6 - row % 3 * 0.4, 0.055, 0.02]);
        for (const x of [-10, -7, 7, 10]) chair(x, 9);
        civilian(-3, -3, 'blue'); civilian(3, -3, 'cloth'); civilian(10, 3, 'oak');
    }
    return [...buckets].map(([finish, source]) => {
        const geometry = mergeGeometries(source)!; source.forEach(g => g.dispose());
        const material = new THREE.MeshStandardMaterial({ color: PALETTE[finish], roughness: finish === 'steel' || finish === 'brass' ? 0.4 : 0.86, metalness: finish === 'steel' || finish === 'brass' ? 0.6 : 0, ...(finish === 'light' ? { emissive: PALETTE.light, emissiveIntensity: 0.5 } : {}) });
        return { finish, geometry, material };
    });
}
