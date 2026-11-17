import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { EnvironmentId, Vec3 } from '../types';

export type CovidEnvironment = Extract<EnvironmentId, `covid-${string}`>;

const COLORS = {
    concrete: '#6f7d84', floor: '#b0c1c0', wall: '#d4d8cd', teal: '#267b83',
    navy: '#253c51', metal: '#586974', white: '#e8e7d8', amber: '#dcb166',
    glass: '#385d70', light: '#d7fff2', dark: '#172633', paper: '#f6edd3',
    carton: '#af8155', skin: '#b88f78', green: '#679485', red: '#a15e52',
};
type Finish = keyof typeof COLORS;

/** Every static prop is merged by material: detail does not mean one draw call per box. */
export function buildArchitecture(environment: CovidEnvironment) {
    const batches = new Map<Finish, THREE.BufferGeometry[]>();
    function shape(kind: 'box' | 'cylinder' | 'sphere', finish: Finish, position: Vec3, scale: Vec3, rotation = 0) {
        const geometry = kind === 'box' ? new THREE.BoxGeometry(1, 1, 1)
            : kind === 'cylinder' ? new THREE.CylinderGeometry(0.5, 0.5, 1, 10)
                : new THREE.SphereGeometry(0.5, 10, 8);
        geometry.scale(...scale); geometry.rotateY(rotation); geometry.translate(...position);
        const batch = batches.get(finish) ?? []; batch.push(geometry); batches.set(finish, batch);
    }
    const box = (m: Finish, p: Vec3, s: Vec3, r = 0) => shape('box', m, p, s, r);
    const cylinder = (m: Finish, p: Vec3, s: Vec3) => shape('cylinder', m, p, s);
    const person = (x: number, z: number, coat: Finish) => {
        cylinder(coat, [x, 1.4, z], [0.65, 1, 0.5]);
        shape('sphere', 'skin', [x, 2.18, z], [0.48, 0.55, 0.48]);
        box('white', [x, 2.1, z + 0.23], [0.38, 0.18, 0.04]);
        for (const dx of [-0.19, 0.19]) {
            box('navy', [x + dx, 0.61, z], [0.23, 0.7, 0.3]);
            box('dark', [x + dx, 0.2, z + 0.1], [0.28, 0.18, 0.5]);
            box(coat, [x + dx * 2.2, 1.4, z], [0.18, 0.75, 0.2]);
        }
    };
    const chair = (x: number, z: number) => {
        box('teal', [x, 0.9, z], [1, 0.18, 1]); box('teal', [x, 1.5, z - 0.43], [1, 1, 0.16]);
        for (const dx of [-0.36, 0.36]) for (const dz of [-0.36, 0.36]) cylinder('metal', [x + dx, 0.45, z + dz], [0.08, 0.9, 0.08]);
    };
    const monitor = (x: number, z: number) => {
        box('dark', [x, 2.2, z], [1.3, 0.85, 0.12]); box('glass', [x, 2.2, z + 0.07], [1.12, 0.66, 0.03]);
        box('light', [x - 0.2, 2.25, z + 0.09], [0.6, 0.05, 0.03]); cylinder('metal', [x, 1.7, z], [0.1, 0.5, 0.1]);
    };
    box('dark', [0, -0.3, 0], [65, 0.5, 55]);
    box('floor', [0, 0, 0], [30, 0.18, 24]);
    // Tile joints, raised curb and tactile entrance paving.
    for (let x = -14; x <= 14; x += 2) box('concrete', [x, 0.1, 0], [0.025, 0.015, 24]);
    for (let z = -11; z <= 11; z += 2) box('concrete', [0, 0.1, z], [30, 0.015, 0.025]);
    box('wall', [0, 3, -12], [30, 6, 0.35]); box('wall', [-15, 3, -3], [0.35, 6, 18]);
    box('teal', [0, 1.15, -11.8], [30, 0.14, 0.08]);
    for (let x = -12; x <= 12; x += 6) {
        box('navy', [x, 3.7, -11.75], [4.6, 2.7, 0.18]);
        box('glass', [x, 3.7, -11.62], [4.3, 2.4, 0.08]);
        box('metal', [x, 3.7, -11.52], [0.07, 2.4, 0.08]);
        box('light', [x, 5.7, -9], [3.7, 0.08, 0.35]);
    }
    // A fictional rainy district silhouette; no real city or hospital is represented.
    for (let i = 0; i < 9; i++) {
        const x = -28 + i * 7, height = 7 + (i * 7 % 5);
        box('navy', [x, height / 2, -27 - (i % 2) * 6], [5.4, height, 5]);
        for (let level = 2; level < height; level += 2) for (const dx of [-1.5, 0, 1.5]) box(i % 3 ? 'glass' : 'amber', [x + dx, level, -24.45 - (i % 2) * 6], [0.7, 0.8, 0.06]);
    }
    if (environment === 'covid-hospital') {
        // Open-front cutaway: ward, protected clinic planning desk and community radio.
        box('white', [-6, 0.19, -3], [14, 0.12, 15]);
        box('teal', [2, 1.7, -5], [0.2, 3.2, 13]);
        for (const x of [-10, -5]) for (const z of [-7, -1]) {
            box('metal', [x, 0.85, z], [2.3, 0.18, 3.7]); box('white', [x, 1.08, z], [2.1, 0.32, 3.4]);
            box('teal', [x, 1.28, z + 0.4], [2.12, 0.08, 2.5]); box('paper', [x, 1.36, z - 1.05], [1.7, 0.25, 0.7]);
            for (const dx of [-1.06, 1.06]) {
                box('metal', [x + dx, 1.5, z], [0.06, 0.12, 2.4]);
                for (const dz of [-1, 1]) cylinder('metal', [x + dx, 1.2, z + dz], [0.06, 0.7, 0.06]);
            }
            box('wall', [x, 1.5, z - 1.85], [2.3, 1, 0.15]);
            box('metal', [x - 1.7, 0.8, z - 1], [0.7, 1.4, 0.7]); monitor(x - 1.7, z - 1);
            for (const dx of [-0.8, 0.8]) for (const dz of [-1.4, 1.4]) cylinder('dark', [x + dx, 0.4, z + dz], [0.22, 0.4, 0.22]);
        }
        box('white', [8, 1.1, -4], [8, 2, 2]); box('teal', [8, 2.15, -4], [8.3, 0.18, 2.3]);
        monitor(6, -4); monitor(10, -4); chair(6, -6); chair(10, -6);
        for (let i = 0; i < 8; i++) box(i % 2 ? 'paper' : 'amber', [4.8 + i * 0.7, 2.3, -3.7], [0.45, 0.12, 0.7]);
        for (const x of [5, 9, 13]) { box('white', [x, 1.5, -10], [2.5, 2.8, 1]); box('metal', [x, 1.5, -9.45], [0.07, 0.8, 0.05]); }
        box('amber', [0, 1.15, 8], [5, 0.22, 2]);
        for (const x of [-2, 2]) box('metal', [x, 0.6, 8], [0.12, 1.2, 1.6]);
        box('dark', [-1, 1.65, 8], [1.2, 0.75, 0.6]); box('metal', [-1.3, 2.2, 8], [0.04, 0.8, 0.04]);
        box('paper', [1, 1.3, 8.1], [1.1, 0.04, 0.8]); chair(0, 6);
        for (const x of [5, 7, 9]) chair(x, 7);
        for (let i = 0; i < 8; i++) box('amber', [i * 0.3 - 1, 0.13, 11], [0.15, 0.04, 1]);
        person(8, -1, 'teal'); person(-2, 5, 'green'); person(11, 6, 'navy');
    } else if (environment === 'covid-depot') {
        for (const x of [-11, -4, 3, 10]) {
            for (const dx of [-2.3, 2.3]) box('metal', [x + dx, 2.8, -8], [0.16, 5.5, 2.8]);
            for (const y of [0.5, 2.4, 4.4]) {
                box('metal', [x, y, -8], [4.8, 0.13, 2.8]);
                for (let i = 0; i < 3; i++) { box('white', [x - 1.5 + i * 1.5, y + 0.5, -8], [1.15, 0.9, 1.5]); box('teal', [x - 1.5 + i * 1.5, y + 0.5, -7.22], [0.65, 0.26, 0.02]); }
            }
        }
        for (const [i, x] of [-8, 0, 8].entries()) {
            box(['teal', 'amber', 'green'][i] as Finish, [x, 0.13, 2], [6, 0.03, 7]);
            box('metal', [x, 0.4, 2], [3.6, 0.15, 4]);
            for (const dx of [-1.5, 1.5]) for (const dz of [-1.6, 1.6]) cylinder('dark', [x + dx, 0.25, 2 + dz], [0.3, 0.4, 0.3]);
            box('metal', [x, 1, 0], [3.5, 1.2, 0.1]);
        }
        // Delivery van with shutter, cab, mirrors and loading ramp.
        box('white', [13, 1.8, 9], [4, 3.2, 6]); box('teal', [13, 1.6, 12.4], [4, 2.4, 2]);
        box('glass', [13, 2.8, 12.6], [3.6, 1, 1.7]);
        for (let i = 0; i < 9; i++) box('metal', [13, 0.7 + i * 0.3, 5.94], [3.6, 0.05, 0.04]);
        for (const x of [10.9, 15.1]) for (const z of [7, 12]) cylinder('dark', [x, 0.65, z], [0.7, 1.1, 1.1]);
        box('metal', [13, 0.3, 4.2], [3.5, 0.15, 3]); person(-3, 7, 'amber'); person(7, -2, 'teal');
    } else {
        box('navy', [0, 2.6, -8], [15, 4.7, 0.5]);
        for (const [i, x] of [-5, 0, 5].entries()) {
            box('glass', [x, 3, -7.7], [4.3, 3.5, 0.08]);
            for (let row = 0; row < 5; row++) box(row === i ? 'amber' : 'light', [x - 0.3, 4.1 - row * 0.5, -7.64], [2.8 - (row % 3) * 0.5, 0.08, 0.02]);
        }
        box('amber', [0, 1.35, 0], [14, 0.3, 4]);
        for (const x of [-5, 5]) box('navy', [x, 0.7, 0], [0.5, 1.3, 3]);
        for (const x of [-5, -2.5, 0, 2.5, 5]) {
            chair(x, -3); box('paper', [x, 1.54, 0.5], [1.3, 0.03, 0.9]);
            cylinder('dark', [x, 1.55, -0.6], [0.4, 0.08, 0.4]); cylinder('metal', [x, 1.9, -0.6], [0.05, 0.65, 0.05]);
            shape('sphere', 'dark', [x, 2.26, -0.6], [0.22, 0.18, 0.3]);
            cylinder('white', [x + 0.8, 1.7, 0], [0.25, 0.35, 0.25]);
        }
        for (const x of [-7, -3, 1, 5, 9]) for (const z of [6, 9]) chair(x, z);
        box('teal', [-11, 1.35, -3], [2.5, 2.6, 2]); box('amber', [-11, 2.7, -3], [3, 0.18, 2.3]);
        person(-11, -5, 'navy'); person(4, -3, 'green'); person(-4, -3, 'teal');
    }
    return [...batches].map(([finish, geometries]) => {
        const geometry = mergeGeometries(geometries)!;
        geometries.forEach(g => g.dispose());
        const material = new THREE.MeshStandardMaterial({ color: COLORS[finish], roughness: finish === 'metal' || finish === 'glass' ? 0.35 : 0.82, metalness: finish === 'metal' ? 0.45 : 0, ...(finish === 'light' ? { emissive: COLORS.light, emissiveIntensity: 0.5 } : {}) });
        return { finish, geometry, material };
    });
}

