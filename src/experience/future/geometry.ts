/** Deterministic, original civic set data; no browser APIs, textures or assets.
 * Units and layouts are artistic, not surveyed/engineered dimensions. */
import type { Vec3 } from '../types';
import type { ProjectId } from './planning';
export type FutureSolid = { position: Vec3; scale: Vec3; color: string; yaw?: number; pitch?: number };
export interface FutureGeometry { boxes: FutureSolid[]; cylinders: FutureSolid[]; foliage: FutureSolid[]; lamps: FutureSolid[]; }
export const FUTURE_SITES: Record<ProjectId, Vec3> = { grid: [22, 2, -26], water: [-23, 2, -20], shelter: [-16, 2, 10], signal: [0, 2, -7], quay: [18, 2, 36], garden: [18, 2, 15] };
export function buildFutureGeometry(interior: boolean, completed: ProjectId[] = []): FutureGeometry {
    const out: FutureGeometry = { boxes: [], cylinders: [], foliage: [], lamps: [] };
    const box = (position: Vec3, scale: Vec3, color: string, yaw = 0) => out.boxes.push({ position, scale, color, yaw });
    const cylinder = (position: Vec3, scale: Vec3, color: string) => out.cylinders.push({ position, scale, color });
    const glow = (position: Vec3, scale: Vec3, color: string) => out.lamps.push({ position, scale, color });
    const plant = (x: number, z: number, base = 2, size = 1) => {
        cylinder([x, base + size, z], [.14 * size, 2 * size, .14 * size], '#6b6950');
        out.foliage.push({ position: [x, base + 2.5 * size, z], scale: [2.3 * size, 2.7 * size, 2.1 * size], color: '#597d64' });
    };
    const resident = (x: number, z: number, c: string, base = 2) => {
        box([x, base + .95, z], [.5, 1.2, .4], c);
        for (const dx of [-.15, .15]) box([x + dx, base + .3, z], [.2, .6, .25], '#384b55');
        out.foliage.push({ position: [x, base + 1.8, z], scale: [.48, .55, .48], color: '#bd9475' });
    };
    if (!interior) {
        // A raised inhabited platform, open water beyond the southern edge.
        box([0, .85, -10], [78, 2, 85], '#7b9191');
        box([0, 1.9, -10], [76, .12, 83], '#a3b1a6');
        for (let x = -36; x <= 36; x += 6) {
            box([x, 2.1, 30], [4.8, .25, 3.5], '#d0c7ad');
            cylinder([x, 3, 31.5], [.07, 2, .07], '#365966');
        }
        box([0, 3.6, 31.5], [73, .1, .1], '#587984');
        // Distinct pale residential towers; staggered floors and planted terraces.
        for (let i = 0; i < 5; i++) {
            const x = -30 + i * 15, h = [22, 30, 17, 25, 20][i];
            box([x, h / 2 + 2, -42], [10, h, 12], '#c6cfbd');
            box([x, h + 2.4, -42], [11.5, .6, 13], '#587f78');
            for (let y = 5; y < h + 1; y += 3) {
                box([x, y, -35.8], [9.2, 1.6, .15], '#527e8c');
                box([x, y - 1.2, -35.4], [11, .3, 1.5], '#d5dbc8');
                for (const dx of [-3.7, 3.7]) box([x + dx, y - .5, -34.7], [1.3, 1, .6], '#688966');
            }
            plant(x + 2, -42, h + 2.7, .7);
        }
        // Filtration yard: three highly visible cylindrical tanks and pipe gantry.
        box([-23, 2.4, -20], [18, .9, 17], '#7d9895');
        for (const x of [-29, -23, -17]) {
            cylinder([x, 6.6, -20], [2.2, 8, 2.2], '#aac9c2');
            cylinder([x, 10.7, -20], [2.35, .35, 2.35], '#476d76');
            cylinder([x, 5.7, -20], [2.25, .5, 2.25], '#4d999b');
        }
        box([-23, 11.6, -20], [15, .45, .45], '#536f76');
        box([-23, 3.1, -11], [16, .4, 2], '#c6cebc');
        // Substation plinth, insulated switch cabinets and blue solar canopies.
        box([22, 2.4, -26], [22, .9, 18], '#96aaa6');
        for (const x of [16, 22, 28]) {
            box([x, 4, -26], [3.5, 3.2, 4], '#507879');
            for (const dx of [-1, 0, 1]) cylinder([x + dx, 6.2, -26], [.17, 1.2, .17], '#b4c3bc');
        }
        for (const z of [-32, -20]) {
            box([22, 8, z], [23, .3, 5], '#254f72');
            for (const x of [12, 32]) cylinder([x, 4.9, z], [.18, 6, .18], '#718886');
            for (let x = 12; x <= 32; x += 2) box([x, 8.17, z], [.03, .02, 5], '#6798ad');
        }
        // Public signal mast in the crossroads; civic light ribbon, not a weapon.
        cylinder([0, 9, -7], [.7, 14, .7], '#b4c8bd');
        for (const y of [13, 16]) cylinder([0, y, -7], [2.5, .3, 2.5], '#528a94');
        box([0, 3.5, -7], [8, 3, 6], '#739d9b');
        box([0, 4.4, -3.9], [5.5, 1.3, .15], '#263f53');
        // Shelter: broad low public building with shaded ramps and accessible deck.
        box([-16, 5.2, 10], [24, 6.4, 13], '#cbcbb6');
        box([-16, 8.6, 10], [27, .6, 16], '#577c79');
        box([-16, 4.8, 16.6], [18, 4.8, .15], '#456c7c');
        for (const x of [-26, -6]) cylinder([x, 5.2, 18], [.22, 6.3, .22], '#b2c6bb');
        box([-16, 8.6, 17.5], [27, .6, 5], '#a5baa7');
        box([-16, 2.3, 20], [25, .6, 7], '#c9c9b2');
        out.boxes.push({ position: [-16, 2.3, 25], scale: [8, .2, 4.5], color: '#c9c9b2', pitch: .15 });
        // Clearly incomplete quay connection: repairs replace the missing deck.
        out.boxes.push({ position: [18, 2.65, 31.5], scale: [10, .3, 7], color: '#b4b9a1', pitch: -.18 });
        for (const x of [14, 22]) for (let z = 34; z <= 56; z += 8) cylinder([x, 1.4, z], [.5, 5, .5], '#637e81');
        for (const z of [35, 51, 57]) box([18, 3.1, z], [10, .5, 5], '#b4b9a1');
        if (completed.includes('quay')) box([18, 3.1, 43], [10, .5, 11], '#b4b9a1');
        else for (const z of [38, 48]) { box([18, 4.2, z], [10, .3, .25], '#e1b66c'); for (const x of [14, 22]) cylinder([x, 3.8, z], [.1, 1.5, .1], '#616c65'); }
        // Rain gardens: terraced retention strips, reeds and footbridges.
        for (let row = 0; row < 3; row++) {
            box([20, 2.1, 4 + row * 6], [17, .6, 3.7], '#6d8b70');
            box([20, 2.43, 4 + row * 6], [15.5, .09, 2.5], '#557d78');
            for (let i = 0; i < 8; i++) cylinder([13 + i * 2, 3, 4 + row * 6], [.055, 1.2, .055], '#afbe81');
        }
        for (const x of [-35, 8, 35]) for (const z of [-8, 23]) plant(x, z, 2, 1.4);
        for (let i = 0; i < 10; i++) resident(-6 + (i % 5) * 2.2, 20 + Math.floor(i / 5) * 2, i % 2 ? '#6e8c9c' : '#b49375');
        // Pedestrian network stripes, simple wayfinding and work-site status lights.
        for (let z = -29; z <= 23; z += 2) box([7, 1.98, z], [.35, .05, 1.2], '#e4d59d');
        for (const [id, p] of Object.entries(FUTURE_SITES)) {
            const ready = completed.includes(id as ProjectId);
            glow([p[0], p[1] + 1, p[2] + 4], [4, .2, .25], ready ? '#74cfae' : '#d0a66c');
        }
    } else {
        // Civic forum cutaway, a scale district model at its centre.
        box([0, .25, -5], [46, .5, 40], '#7c9691');
        box([0, .55, -5], [44, .1, 38], '#b7c6b4');
        box([0, 7, -25], [46, 14, .7], '#6f9798');
        for (const x of [-22, 22]) box([x, 7, -15], [.7, 14, 20], '#a9bfb1');
        for (let x = -18; x <= 18; x += 6) {
            box([x, 8, -24.5], [4.8, 9.5, .2], '#345e73');
            box([x, 8, -24.2], [.15, 9.6, .2], '#d9ddc5');
            box([x, 8, -24.2], [4.8, .15, .2], '#d9ddc5');
        }
        cylinder([0, 2.2, -5], [8, 3.3, 8], '#496d74');
        cylinder([0, 3.9, -5], [8.4, .2, 8.4], '#749d9d');
        box([0, 4.04, -5], [10, .1, 10], '#b3c8b0');
        for (let i = 0; i < 5; i++) box([-4 + i * 2, 4.8 + i % 2, -8], [1.1, 1.5 + i % 2 * 2, 1.1], '#cdd6bf');
        PROJECT_IDS_LOCAL.forEach((id, i) => glow([-4 + (i % 3) * 3.7, 4.2, -3 + Math.floor(i / 3) * 3], [2, .1, 1.8], completed.includes(id) ? '#87d2b5' : '#d7b97c'));
        for (const side of [-1, 1]) for (let row = 0; row < 3; row++) {
            const x = side * (12 + row * 3.2);
            box([x, .9 + row * .2, 0], [2.6, 1 + row * .4, 20], '#829e8b');
            for (let z = -7; z <= 7; z += 3.5) resident(x, z, row % 2 ? '#a79075' : '#657e96', 1.3 + row * .4);
        }
        for (const x of [-17, 17]) plant(x, -20, .6, 2);
        glow([0, 12, -24], [36, .15, .2], '#a3d9c6');
    }
    return out;
}
const PROJECT_IDS_LOCAL: ProjectId[] = ['grid', 'water', 'shelter', 'signal', 'quay', 'garden'];
