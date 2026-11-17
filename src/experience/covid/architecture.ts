import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { EnvironmentId, Vec3 } from '../types';

export type CovidEnvironment = Extract<EnvironmentId, `covid-${string}`>;

const COLORS = {
    concrete: '#334653', floor: '#475962', wall: '#43606a', teal: '#267b83',
    navy: '#152936', metal: '#728894', white: '#c8dad7', amber: '#b7874f',
    glass: '#385d70', light: '#d7fff2', dark: '#172633', paper: '#f6edd3',
    carton: '#af8155', skin: '#b88f78', green: '#679485', red: '#a15e52',
    wood: '#624e3c', trim: '#95b4ba', warm: '#ffd49a', screen: '#72d9c3', fabric: '#263c4b', window: '#638a98', ceiling: '#293d46',
};
type Finish = keyof typeof COLORS;

/** Every static prop is merged by material: detail does not mean one draw call per box. */
export function buildArchitecture(environment: CovidEnvironment) {
    const batches = new Map<Finish, THREE.BufferGeometry[]>();
    function shape(kind: 'box' | 'cylinder' | 'sphere' | 'round', finish: Finish, position: Vec3, scale: Vec3, rotation = 0) {
        const geometry = kind === 'round' ? new RoundedBoxGeometry(1, 1, 1, 2, 0.08) : kind === 'box' ? new THREE.BoxGeometry(1, 1, 1)
            : kind === 'cylinder' ? new THREE.CylinderGeometry(0.5, 0.5, 1, 10)
                : new THREE.SphereGeometry(0.5, 10, 8);
        geometry.scale(...scale); geometry.rotateY(rotation); geometry.translate(...position);
        const batch = batches.get(finish) ?? []; batch.push(geometry); batches.set(finish, batch);
    }
    const box = (m: Finish, p: Vec3, s: Vec3, r = 0) => shape('box', m, p, s, r);
    const round = (m: Finish, p: Vec3, s: Vec3) => shape('round', m, p, s);
    const cylinder = (m: Finish, p: Vec3, s: Vec3) => shape('cylinder', m, p, s);
    const person = (x: number, z: number, coat: Finish) => {
        round(coat, [x, 1.45, z], [0.56, 0.82, 0.35]);
        for (const dx of [-0.29, 0.29]) {
            shape('sphere', coat, [x + dx, 1.75, z], [0.24, 0.25, 0.3]);
            shape('sphere', 'skin', [x + dx * 1.5, 1.05, z + 0.07], [0.16, 0.2, 0.15]);
        }
        cylinder('navy', [x, 1.01, z], [0.51, 0.23, 0.33]);
        box('trim', [x + 0.18, 1.63, z + 0.22], [0.13, 0.18, 0.03]);
        box('navy', [x, 1.85, z + 0.19], [0.04, 0.4, 0.03]);
        shape('sphere', 'skin', [x, 2.18, z], [0.4, 0.52, 0.38]);
        shape('sphere', 'dark', [x, 2.35, z - 0.02], [0.43, 0.2, 0.39]);
        box('white', [x, 2.1, z + 0.23], [0.32, 0.16, 0.04]);
        for (const dx of [-0.19, 0.19]) {
            box('navy', [x + dx, 0.61, z], [0.23, 0.7, 0.3]);
            box('dark', [x + dx, 0.2, z + 0.1], [0.28, 0.18, 0.5]);
            round(coat, [x + dx * 1.9, 1.4, z], [0.19, 0.65, 0.2]);
            shape('sphere', 'skin', [x + dx * 1.15, 2.17, z], [0.07, 0.13, 0.08]);
        }
    };
    const chair = (x: number, z: number) => {
        round('fabric', [x, 0.9, z], [1, 0.22, 1]); round('fabric', [x, 1.45, z - 0.43], [1, 1, 0.2]);
        for (const dx of [-0.58, 0.58]) { box('metal', [x + dx, 1.05, z], [0.05, 0.5, 0.05]); round('dark', [x + dx, 1.3, z], [0.12, 0.08, 0.65]); }
        for (const dx of [-0.36, 0.36]) for (const dz of [-0.36, 0.36]) cylinder('metal', [x + dx, 0.45, z + dz], [0.08, 0.9, 0.08]);
    };
    const monitor = (x: number, z: number, lift = 0) => {
        box('dark', [x, 2.2 + lift, z], [1.3, 0.85, 0.12]); box('glass', [x, 2.2 + lift, z + 0.07], [1.12, 0.66, 0.03]);
        box('light', [x - 0.2, 2.25 + lift, z + 0.09], [0.6, 0.05, 0.03]); cylinder('metal', [x, 1.7 + lift, z], [0.1, 0.5, 0.1]);
    };
    // Continuous interior, rather than a bright toy-sized floor floating in a void.
    box('dark', [0, -0.45, 0], [80, 0.5, 75]);
    box(environment === 'covid-briefing' ? 'wood' : 'floor', [0, 0, 0], [30, 0.2, 30]);
    for (let x = -14; x <= 14; x += 3) box('concrete', [x, 0.106, 0], [0.013, 0.008, 30]);
    for (let z = -12; z <= 14; z += 3) box('concrete', [0, 0.106, z], [30, 0.008, 0.013]);
    // One-sided ceiling is visible from inside, but does not blank an overhead orbit.
    const ceiling = new THREE.PlaneGeometry(30, 30); ceiling.rotateX(Math.PI / 2); ceiling.translate(0, 7.8, 0);
    batches.set('ceiling', [ceiling]);
    // Window wall, deep sills, slim mullions and a visible structural rhythm.
    box('wall', [0, 1.15, -12], [30, 2.3, 0.45]);
    box('navy', [0, 7.2, -12], [30, 1.6, 0.5]);
    box('navy', [-15, 4, -3], [0.4, 8, 18]);
    box('wood', [-14.7, 1.35, -3], [0.12, 2.5, 18]);
    for (const x of [-15, -9, -3, 3, 9, 15]) {
        box('navy', [x, 4, -11.9], [0.5, 8, 0.75]);
        box('trim', [x + 0.25, 4.6, -11.5], [0.05, 4.1, 0.05]);
    }
    for (const x of [-12, -6, 0, 6, 12]) {
        box('window', [x, 4.5, -12.1], [5.5, 4.2, 0.08]);
        box('navy', [x, 4.5, -11.9], [0.09, 4.2, 0.1]);
        box('navy', [x, 4.3, -11.9], [5.5, 0.08, 0.1]);
        box('trim', [x, 2.4, -11.6], [5.6, 0.14, 0.6]);
        // Glowing slits and blind slats give the glass layered depth.
        for (let n = 0; n < 5; n++) box('metal', [x, 6.3 - n * 0.14, -11.6], [5.6, 0.045, 0.22]);
    }
    box('teal', [0, 0.8, -11.7], [30, 0.08, 0.06]);
    for (const z of [-9, -3]) {
        box('navy', [0, 7.2, z], [30, 0.28, 0.25]);
        for (const x of [-8, 3, 11]) {
            for (const dx of [-1.5, 1.5]) cylinder('metal', [x + dx, 6.95, z], [0.025, 0.5, 0.025]);
            box('dark', [x, 6.65, z], [3.5, 0.15, 0.5]);
            box('light', [x, 6.55, z], [3.25, 0.035, 0.35]);
        }
    }
    // Wet night skyline viewed through the tall glass. No real district is depicted.
    for (let i = 0; i < 12; i++) {
        const x = -38 + i * 7, height = 9 + (i * 7 % 9), z = -23 - (i % 3) * 5;
        box('navy', [x, height / 2, z], [5.5, height, 5]);
        box('metal', [x, height + 0.1, z], [5.6, 0.2, 5.1]);
        for (let level = 2; level < height; level += 1.8) for (const dx of [-1.5, 0, 1.5]) {
            if ((i + level * 5 + dx * 2) % 4 > 1) box('warm', [x + dx, level, z + 2.55], [0.55, 0.8, 0.03]);
        }
    }
    const plant = (x: number, z: number) => {
        cylinder('dark', [x, 0.5, z], [0.8, 0.8, 0.8]);
        for (let n = 0; n < 7; n++) {
            const a = n * 2.4;
            cylinder('wood', [x, 1.05, z], [0.04, 1.2, 0.04]);
            shape('sphere', 'green', [x + Math.cos(a) * 0.35, 1.25 + n * 0.11, z + Math.sin(a) * 0.35], [0.75, 0.16, 0.35], a);
        }
    };
    plant(13.4, -10.5); plant(-13.5, 5.5);
    if (environment === 'covid-hospital') {
        // Open-front cutaway: ward, protected clinic planning desk and community radio.
        box('floor', [-6, 0.19, -3], [14, 0.12, 15]);
        box('teal', [-6, 0.26, 5], [14, 0.02, 0.16]);
        box('navy', [2, 1.2, -5], [0.16, 2.2, 13]);
        box('window', [2, 3.2, -5], [0.07, 1.8, 13]);
        for (const z of [-11, -7, -3, 1]) box('trim', [2, 3, z], [0.12, 3.8, 0.08]);
        for (const x of [-10, -5]) for (const z of [-7, -1]) {
            box('metal', [x, 0.85, z], [2.3, 0.18, 3.7]); round('white', [x, 1.08, z], [2.1, 0.32, 3.4]);
            box('teal', [x, 1.28, z + 0.4], [2.12, 0.08, 2.5]); round('paper', [x, 1.36, z - 1.05], [1.7, 0.25, 0.7]);
            for (let fold = 0; fold < 5; fold++) box('trim', [x - 0.8 + fold * 0.4, 1.33, z + 0.3], [0.025, 0.02, 2.1]);
            cylinder('metal', [x + 1.6, 1.9, z - 1.4], [0.045, 3.5, 0.045]);
            box('white', [x + 1.6, 2.85, z - 1.4], [0.35, 0.65, 0.15]);
            box('teal', [x + 1.6, 2.5, z - 1.4], [0.22, 0.15, 0.15]);
            for (const dx of [-1.06, 1.06]) {
                box('metal', [x + dx, 1.5, z], [0.06, 0.12, 2.4]);
                for (const dz of [-1, 1]) cylinder('metal', [x + dx, 1.2, z + dz], [0.06, 0.7, 0.06]);
            }
            box('wall', [x, 1.5, z - 1.85], [2.3, 1, 0.15]);
            box('metal', [x - 1.7, 0.8, z - 1], [0.7, 1.4, 0.7]); monitor(x - 1.7, z - 1);
            for (const dx of [-0.8, 0.8]) for (const dz of [-1.4, 1.4]) cylinder('dark', [x + dx, 0.4, z + dz], [0.22, 0.4, 0.22]);
        }
        box('white', [8, 1.1, -4], [8, 2, 2]); box('teal', [8, 2.15, -4], [8.3, 0.18, 2.3]);
        monitor(6, -4, 0.7); monitor(10, -4, 0.7); chair(6, -6); chair(10, -6);
        for (let i = 0; i < 8; i++) box(i % 2 ? 'paper' : 'amber', [4.8 + i * 0.7, 2.3, -3.7], [0.45, 0.12, 0.7]);
        for (const x of [5, 9, 13]) { box('white', [x, 1.5, -10], [2.5, 2.8, 1]); box('metal', [x, 1.5, -9.45], [0.07, 0.8, 0.05]); }
        round('wood', [0, 1.15, 8], [5, 0.22, 2]);
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
        box('white', [17, 1.8, -1], [4, 3.2, 6]); box('teal', [17, 1.6, 2.4], [4, 2.4, 2]);
        box('glass', [17, 2.8, 2.6], [3.6, 1, 1.7]);
        for (let i = 0; i < 9; i++) box('metal', [17, 0.7 + i * 0.3, -4.06], [3.6, 0.05, 0.04]);
        for (const x of [14.9, 19.1]) for (const z of [-3, 2]) cylinder('dark', [x, 0.65, z], [0.7, 1.1, 1.1]);
        box('metal', [17, 0.3, -5.8], [3.5, 0.15, 3]); person(-3, 7, 'amber'); person(7, -2, 'teal');
    } else {
        // A purpose-built night operations / broadcast room, not an empty classroom.
        box('navy', [-1, 3.7, -8.8], [19, 6.5, 0.5]);
        box('wood', [-1, 0.7, -8.4], [19, 1.2, 0.2]);
        for (let x = -10; x <= 8; x += 0.3) box('metal', [x, 0.7, -8.22], [0.035, 1.1, 0.06]);
        for (const x of [-7, -1, 5]) {
            round('dark', [x, 3.9, -8.45], [5.5, 3.7, 0.3]);
            box('glass', [x, 3.9, -8.25], [5.18, 3.38, 0.04]);
        }
        box('warm', [-1, 6.8, -8.25], [19, 0.06, 0.08]);
        box('fabric', [-1, 0.12, 0.5], [18, 0.025, 11]);
        round('wood', [-1, 1.6, 0], [13, 0.35, 3.8]);
        box('dark', [-1, 0.8, -0.3], [10, 1.4, 1.8]);
        box('teal', [-1, 1.15, 0.64], [10, 0.22, 0.04]);
        for (const x of [-5.8, -2.6, 0.6, 3.8]) {
            chair(x, -3);
            box('paper', [x, 1.8, 0.4], [0.9, 0.025, 0.65], 0.12);
            for (let n = 0; n < 4; n++) box('metal', [x, 1.82, 0.2 + n * 0.11], [0.55, 0.004, 0.015]);
            cylinder('dark', [x, 1.85, -0.65], [0.35, 0.08, 0.35]);
            cylinder('metal', [x, 2.12, -0.65], [0.045, 0.5, 0.045]);
            shape('sphere', 'dark', [x, 2.4, -0.65], [0.2, 0.16, 0.32]);
            cylinder('screen', [x, 1.9, -0.65], [0.08, 0.02, 0.08]);
            cylinder('white', [x + 0.7, 2, 0.1], [0.22, 0.35, 0.22]);
        }
        // Side console, paper archive, studio camera and a few occupied seats.
        round('wood', [10.8, 1.5, -3], [3.2, 0.2, 7]);
        box('navy', [10.8, 0.8, -3], [2.7, 1.4, 6.5]);
        monitor(10.8, -4.8); monitor(10.8, -1.5);
        for (let n = 0; n < 8; n++) box(n % 2 ? 'teal' : 'paper', [9.6 + n * 0.26, 2, -5.7], [0.18, 0.9, 0.7]);
        for (const x of [-7, -3, 1]) chair(x, 6.8);
        for (const z of [-5, -2, 1]) {
            box('navy', [-13, 1.3, z], [2.5, 2.5, 2.2]);
            box('wood', [-13, 2.6, z], [2.6, 0.15, 2.3]);
            for (const y of [0.6, 1.4, 2.2]) { box('metal', [-13, y, z + 1.12], [2.2, 0.05, 0.04]); box('trim', [-13, y + 0.25, z + 1.15], [0.6, 0.05, 0.05]); }
        }
        box('dark', [10.2, 2.9, 5], [0.9, 0.7, 1.3]);
        cylinder('metal', [10.2, 1.65, 5], [0.1, 2.4, 0.1]);
        for (const dx of [-0.65, 0.65]) box('metal', [10.2 + dx, 0.35, 5], [0.12, 0.65, 0.12]);
        box('red', [10.7, 3.1, 4.6], [0.08, 0.08, 0.08]);
        person(-5.8, -3.5, 'teal'); person(0.6, -3.5, 'green'); person(10.8, 1.3, 'navy');
        person(-7, 7.2, 'navy');
    }
    return [...batches].map(([finish, geometries]) => {
        const normalized = geometries.map(g => g.index ? g.toNonIndexed() : g);
        const geometry = mergeGeometries(normalized)!;
        normalized.forEach((g, i) => { if (g !== geometries[i]) g.dispose(); });
        geometries.forEach(g => g.dispose());
        const material = new THREE.MeshStandardMaterial({ ...(finish === 'window' ? { transparent: true, opacity: 0.24, depthWrite: false, metalness: 0.25 } : {}), color: COLORS[finish], roughness: finish === 'metal' || finish === 'glass' ? 0.35 : 0.82, metalness: finish === 'metal' ? 0.45 : 0, ...(finish === 'light' || finish === 'warm' || finish === 'screen' ? { emissive: COLORS[finish], emissiveIntensity: finish === 'warm' ? 0.6 : 0.8 } : {}) });
        if (['wall', 'floor', 'wood', 'fabric', 'carton', 'concrete'].includes(finish)) {
            const size = 128, pixels = new Uint8Array(size * size * 4);
            for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
                const noise = ((x * 73 + y * 139 + x * y * 17) % 41) / 41;
                const grain = finish === 'wood' ? Math.sin(y * 0.7 + Math.sin(x * 0.06) * 2) * 13 : 0;
                const value = Math.round(218 + noise * 30 + grain), i = (y * size + x) * 4;
                pixels[i] = pixels[i + 1] = pixels[i + 2] = value; pixels[i + 3] = 255;
            }
            const texture = new THREE.DataTexture(pixels, size, size, THREE.RGBAFormat);
            texture.colorSpace = THREE.SRGBColorSpace; texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.generateMipmaps = true; texture.repeat.set(finish === 'wood' ? 3 : 6, 6); texture.needsUpdate = true;
            material.map = texture; material.bumpMap = texture; material.bumpScale = 0.025;
        }
        return { finish, geometry, material };
    });
}

