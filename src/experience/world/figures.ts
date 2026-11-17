/* Detailed low-poly figures built by merging vertex-colored primitives.
   Each figure (soldier + gear, horse + rider, citizen) becomes ONE geometry,
   so whole armies render as a single InstancedMesh draw call. */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { Helmet } from '../types';

const SKIN = '#d8a77a';
const STEEL = '#9aa3ad';
const STEEL_DARK = '#6e7680';
const WOOD = '#7a5a3a';
const WOOD_DARK = '#5e4426';

/** Paint a geometry with a flat vertex color (so merge keeps per-part colors). */
function tint(geom: THREE.BufferGeometry, color: string, exact = false): THREE.BufferGeometry {
    const c = new THREE.Color(color);
    // convert to match sRGB rendering of material colors
    // (THREE.Color already converts hex to linear, so this darkens again: the older
    //  figures were tuned with it; `exact` skips it so dark khaki and field grey survive)
    if (!exact) c.convertSRGBToLinear();
    const count = geom.attributes.position.count;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        arr[i * 3] = c.r;
        arr[i * 3 + 1] = c.g;
        arr[i * 3 + 2] = c.b;
    }
    geom.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    return geom;
}

function part(
    geom: THREE.BufferGeometry,
    color: string,
    pos: [number, number, number],
    rot?: [number, number, number],
    scale?: [number, number, number]
): THREE.BufferGeometry {
    if (scale) geom.scale(...scale);
    if (rot) {
        geom.rotateX(rot[0]);
        geom.rotateY(rot[1]);
        geom.rotateZ(rot[2]);
    }
    geom.translate(...pos);
    return tint(geom, color);
}

function merge(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
    const nonIndexed = parts.map((g) => (g.index ? g.toNonIndexed() : g));
    // drop uv mismatch issues: ensure all have uv (primitives do)
    const merged = mergeGeometries(nonIndexed, false)!;
    nonIndexed.forEach((g) => g.dispose());
    return merged;
}

export interface ArmyPalette {
    /** Robe / tunic color. */
    cloth: string;
    /** Accent: sash, shield face, turban. */
    accent: string;
}

// ─── Infantry: tunic, lamellar chest, helmet with spike, shield, spear ─────
export function buildInfantry(p: ArmyPalette): THREE.BufferGeometry {
    return merge([
        // skirted tunic
        part(new THREE.CylinderGeometry(0.3, 0.46, 0.95, 8), p.cloth, [0, 0.48, 0]),
        // belt
        part(new THREE.CylinderGeometry(0.32, 0.32, 0.08, 8), p.accent, [0, 0.92, 0]),
        // lamellar chest
        part(new THREE.CylinderGeometry(0.33, 0.3, 0.5, 8), STEEL_DARK, [0, 1.2, 0]),
        // shoulders
        part(new THREE.SphereGeometry(0.13, 6, 5), p.cloth, [-0.3, 1.36, 0]),
        part(new THREE.SphereGeometry(0.13, 6, 5), p.cloth, [0.3, 1.36, 0]),
        // head + helmet + spike
        part(new THREE.SphereGeometry(0.17, 8, 7), SKIN, [0, 1.56, 0]),
        part(new THREE.ConeGeometry(0.2, 0.3, 8), STEEL, [0, 1.78, 0]),
        part(new THREE.CylinderGeometry(0.015, 0.03, 0.16, 5), STEEL, [0, 1.98, 0]),
        // round shield on the left arm (boss in the middle)
        part(new THREE.CylinderGeometry(0.34, 0.34, 0.06, 12), p.accent, [-0.42, 1.05, 0.05], [Math.PI / 2, 0, Math.PI / 2]),
        part(new THREE.SphereGeometry(0.08, 6, 5), STEEL, [-0.47, 1.05, 0.05]),
        // spear in the right hand
        part(new THREE.CylinderGeometry(0.024, 0.024, 2.3, 5), WOOD, [0.42, 1.15, 0]),
        part(new THREE.ConeGeometry(0.05, 0.22, 6), STEEL, [0.42, 2.4, 0]),
    ]);
}

// ─── Archer: tunic, sash, turban, bow, quiver ──────────────────────────────
export function buildArcher(p: ArmyPalette): THREE.BufferGeometry {
    const bow = new THREE.TorusGeometry(0.5, 0.03, 5, 10, Math.PI);
    return merge([
        part(new THREE.CylinderGeometry(0.28, 0.42, 0.92, 8), p.cloth, [0, 0.46, 0]),
        // crossed sash
        part(new THREE.CylinderGeometry(0.3, 0.34, 0.12, 8), p.accent, [0, 0.95, 0]),
        part(new THREE.CylinderGeometry(0.3, 0.28, 0.46, 8), p.cloth, [0, 1.18, 0]),
        // head + turban
        part(new THREE.SphereGeometry(0.16, 8, 7), SKIN, [0, 1.52, 0]),
        part(new THREE.SphereGeometry(0.2, 8, 5), p.accent, [0, 1.65, 0], undefined, [1, 0.62, 1]),
        part(new THREE.SphereGeometry(0.06, 5, 4), '#f1e4c8', [0, 1.78, 0]),
        // bow held out to the left
        part(bow, WOOD_DARK, [-0.42, 1.2, 0], [0, Math.PI / 2, Math.PI / 2]),
        // quiver on the back
        part(new THREE.CylinderGeometry(0.08, 0.06, 0.55, 6), WOOD, [0.12, 1.25, -0.26], [0.35, 0, 0.25]),
        part(new THREE.CylinderGeometry(0.05, 0.01, 0.18, 5), '#d9c8a4', [0.21, 1.55, -0.33], [0.35, 0, 0.25]),
    ]);
}

// ─── Cavalry: full horse (head, neck, legs, tail, saddle) + armored rider ──
function horseParts(p: ArmyPalette, horseColor: string): THREE.BufferGeometry[] {
    const horseDark = `#${new THREE.Color(horseColor).offsetHSL(0, 0, -0.08).getHexString()}`;
    const legs: THREE.BufferGeometry[] = [];
    const legPos: [number, number][] = [[-0.22, 0.55], [0.22, 0.55], [-0.22, -0.62], [0.22, -0.62]];
    for (const [x, z] of legPos) {
        legs.push(part(new THREE.CylinderGeometry(0.07, 0.055, 0.85, 6), horseDark, [x, 0.42, z]));
        legs.push(part(new THREE.CylinderGeometry(0.075, 0.075, 0.1, 6), '#2e2218', [x, 0.05, z]));
    }
    return [
        // body (capsule lying along z)
        part(new THREE.CapsuleGeometry(0.34, 1.0, 4, 8), horseColor, [0, 1.05, 0], [Math.PI / 2, 0, 0]),
        // chest + rump bulges
        part(new THREE.SphereGeometry(0.32, 7, 6), horseColor, [0, 1.08, 0.5]),
        part(new THREE.SphereGeometry(0.33, 7, 6), horseColor, [0, 1.1, -0.5]),
        // neck + head + ears + muzzle
        part(new THREE.CylinderGeometry(0.14, 0.2, 0.62, 7), horseColor, [0, 1.45, 0.72], [0.7, 0, 0]),
        part(new THREE.BoxGeometry(0.2, 0.24, 0.5), horseColor, [0, 1.72, 0.98], [0.25, 0, 0]),
        part(new THREE.BoxGeometry(0.14, 0.12, 0.18), horseDark, [0, 1.62, 1.2], [0.25, 0, 0]),
        part(new THREE.ConeGeometry(0.045, 0.14, 4), horseDark, [-0.08, 1.88, 0.88]),
        part(new THREE.ConeGeometry(0.045, 0.14, 4), horseDark, [0.08, 1.88, 0.88]),
        // mane ridge
        part(new THREE.BoxGeometry(0.06, 0.34, 0.5), '#3a2a1c', [0, 1.62, 0.7], [0.55, 0, 0]),
        // tail
        part(new THREE.ConeGeometry(0.09, 0.7, 6), '#3a2a1c', [0, 0.85, -0.92], [-2.6, 0, 0]),
        ...legs,
        // saddle blanket (accent) + saddle
        part(new THREE.BoxGeometry(0.78, 0.1, 0.85), p.accent, [0, 1.32, -0.05]),
        part(new THREE.BoxGeometry(0.4, 0.12, 0.5), WOOD_DARK, [0, 1.42, -0.05]),
    ];
}

export function buildCavalry(p: ArmyPalette, horseColor = '#6b4a2f'): THREE.BufferGeometry {
    return merge([
        ...horseParts(p, horseColor),
        // rider: legs hidden by horse — torso, chest, head, helmet
        part(new THREE.CylinderGeometry(0.24, 0.3, 0.55, 8), p.cloth, [0, 1.72, -0.05]),
        part(new THREE.CylinderGeometry(0.26, 0.24, 0.34, 8), STEEL_DARK, [0, 2.0, -0.05]),
        part(new THREE.SphereGeometry(0.15, 8, 7), SKIN, [0, 2.26, -0.05]),
        part(new THREE.ConeGeometry(0.18, 0.26, 8), STEEL, [0, 2.45, -0.05]),
        part(new THREE.CylinderGeometry(0.012, 0.026, 0.14, 5), STEEL, [0, 2.62, -0.05]),
        // lance with pennon
        part(new THREE.CylinderGeometry(0.022, 0.022, 2.6, 5), WOOD, [0.4, 1.95, 0], [0.18, 0, 0]),
        part(new THREE.ConeGeometry(0.045, 0.2, 6), STEEL, [0.45, 3.22, 0.23]),
        part(new THREE.BoxGeometry(0.02, 0.12, 0.34), p.accent, [0.42, 3.0, 0.32]),
    ]);
}

// ─── Citizen: robe, sash, head, turban — tinted per-instance via instanceColor
//     (robe painted white so instanceColor multiplies into the real hue). ───
export function buildCitizenRobe(): THREE.BufferGeometry {
    return merge([
        part(new THREE.CylinderGeometry(0.26, 0.44, 1.0, 8), '#ffffff', [0, 0.5, 0]),
        part(new THREE.CylinderGeometry(0.27, 0.26, 0.36, 8), '#e6e6e6', [0, 1.12, 0]),
        // arms folded: two short cylinders across the front
        part(new THREE.CylinderGeometry(0.07, 0.07, 0.42, 6), '#f2f2f2', [0, 1.05, 0.2], [0, 0, Math.PI / 2]),
        part(new THREE.SphereGeometry(0.12, 6, 5), '#e6e6e6', [-0.26, 1.18, 0.05]),
        part(new THREE.SphereGeometry(0.12, 6, 5), '#e6e6e6', [0.26, 1.18, 0.05]),
    ]);
}

export function buildCitizenHead(): THREE.BufferGeometry {
    return merge([
        part(new THREE.SphereGeometry(0.17, 8, 7), SKIN, [0, 0, 0]),
        part(new THREE.SphereGeometry(0.21, 8, 5), '#f1e4c8', [0, 0.13, 0], undefined, [1, 0.6, 1]),
        part(new THREE.SphereGeometry(0.055, 5, 4), '#c9b88a', [0, 0.27, 0]),
    ]);
}

// ─── Marching soldier with cloak (winter column) ───────────────────────────
export function buildMarcher(): THREE.BufferGeometry {
    return merge([
        part(new THREE.CylinderGeometry(0.3, 0.5, 1.05, 8), '#4a3a2e', [0, 0.52, 0]),
        part(new THREE.CylinderGeometry(0.31, 0.3, 0.4, 8), '#3c2f25', [0, 1.22, 0]),
        // fur collar
        part(new THREE.TorusGeometry(0.24, 0.09, 6, 10), '#7a6a55', [0, 1.42, 0], [Math.PI / 2, 0, 0]),
        part(new THREE.SphereGeometry(0.16, 8, 7), SKIN, [0, 1.56, 0]),
        // fur hat
        part(new THREE.SphereGeometry(0.19, 8, 5), '#5a4633', [0, 1.68, 0], undefined, [1, 0.7, 1]),
        // slung spear over the shoulder
        part(new THREE.CylinderGeometry(0.022, 0.022, 2.1, 5), WOOD, [0.3, 1.5, -0.1], [0.5, 0, 0.3]),
        part(new THREE.ConeGeometry(0.05, 0.2, 6), STEEL, [0.62, 2.42, -0.62]),
        // backpack roll
        part(new THREE.CapsuleGeometry(0.12, 0.4, 3, 6), '#6a5238', [0, 1.2, -0.32], [0, 0, Math.PI / 2]),
    ]);
}

// ─── Shared materials ──────────────────────────────────────────────────────
export function figureMaterial(): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0.08 });
}

// ─── Detailed arrow (shaft + head + fletching) ────────────────────────────
export function buildArrow(fletch: string): THREE.BufferGeometry {
    return merge([
        part(new THREE.CylinderGeometry(0.025, 0.025, 1.3, 4), '#d9c8a4', [0, 0, 0]),
        part(new THREE.ConeGeometry(0.05, 0.16, 5), STEEL_DARK, [0, 0.72, 0]),
        part(new THREE.ConeGeometry(0.09, 0.26, 4), fletch, [0, -0.62, 0]),
    ]);
}

// ─── 18th-century line infantry: long coat, crossbelts, tricorne, musket ───
const TRICORN = '#1e1a17';
const BELT = '#efe9dc';

function tricorne(y: number): THREE.BufferGeometry[] {
    return [
        // brim folded into three points: a squat 3-sided cone + crown
        part(new THREE.ConeGeometry(0.3, 0.12, 3), TRICORN, [0, y, 0], [0, Math.PI / 6, 0], [1, 1, 1]),
        part(new THREE.CylinderGeometry(0.15, 0.17, 0.13, 8), TRICORN, [0, y + 0.08, 0]),
    ];
}

export function buildMusketeer(p: ArmyPalette): THREE.BufferGeometry {
    return merge([
        // breeches/gaiters + coat skirt
        part(new THREE.CylinderGeometry(0.18, 0.22, 0.55, 8), BELT, [0, 0.28, 0]),
        part(new THREE.CylinderGeometry(0.28, 0.4, 0.55, 8), p.cloth, [0, 0.72, 0]),
        // coat body with facings
        part(new THREE.CylinderGeometry(0.3, 0.29, 0.55, 8), p.cloth, [0, 1.18, 0]),
        part(new THREE.BoxGeometry(0.18, 0.5, 0.06), p.accent, [0, 1.18, 0.27]),
        // white crossbelts
        part(new THREE.BoxGeometry(0.07, 0.72, 0.04), BELT, [0, 1.12, 0.29], [0, 0, 0.6]),
        part(new THREE.BoxGeometry(0.07, 0.72, 0.04), BELT, [0, 1.12, 0.29], [0, 0, -0.6]),
        part(new THREE.SphereGeometry(0.12, 6, 5), p.cloth, [-0.3, 1.36, 0]),
        part(new THREE.SphereGeometry(0.12, 6, 5), p.cloth, [0.3, 1.36, 0]),
        // head + powdered queue + tricorne
        part(new THREE.SphereGeometry(0.16, 8, 7), SKIN, [0, 1.56, 0]),
        part(new THREE.SphereGeometry(0.1, 6, 5), '#e8e2d4', [0, 1.55, -0.12]),
        ...tricorne(1.7),
        // shouldered musket with bayonet
        part(new THREE.CylinderGeometry(0.03, 0.035, 1.5, 5), WOOD, [0.34, 1.35, 0.02], [0.12, 0, 0]),
        part(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 4), STEEL, [0.34, 2.3, 0.14], [0.12, 0, 0]),
        // cartridge box
        part(new THREE.BoxGeometry(0.22, 0.16, 0.1), '#2a1d14', [0.2, 0.92, -0.26]),
    ]);
}

// ─── Rifleman / skirmisher: hunting shirt, round hat, long rifle ───────────
export function buildRifleman(p: ArmyPalette): THREE.BufferGeometry {
    return merge([
        part(new THREE.CylinderGeometry(0.18, 0.22, 0.55, 8), '#5b4a36', [0, 0.28, 0]),
        part(new THREE.CylinderGeometry(0.27, 0.36, 0.6, 8), p.accent, [0, 0.76, 0]),
        part(new THREE.CylinderGeometry(0.28, 0.27, 0.5, 8), p.accent, [0, 1.2, 0]),
        // fringed cape collar
        part(new THREE.CylinderGeometry(0.2, 0.36, 0.16, 8), '#cdbb93', [0, 1.38, 0]),
        part(new THREE.SphereGeometry(0.16, 8, 7), SKIN, [0, 1.56, 0]),
        // round slouch hat
        part(new THREE.CylinderGeometry(0.3, 0.3, 0.03, 10), '#3b2f22', [0, 1.68, 0]),
        part(new THREE.CylinderGeometry(0.15, 0.17, 0.16, 8), '#3b2f22', [0, 1.77, 0]),
        // long rifle held at the ready
        part(new THREE.CylinderGeometry(0.025, 0.03, 1.7, 5), WOOD_DARK, [0.25, 1.25, 0.25], [1.1, 0, 0]),
        // powder horn
        part(new THREE.ConeGeometry(0.06, 0.28, 6), '#e9dcc0', [-0.24, 0.95, 0.1], [0, 0, 1.2]),
    ]);
}

// ─── Dragoon: horse + coated rider with helmet crest and sabre ─────────────
export function buildDragoon(p: ArmyPalette, horseColor = '#5a3e28'): THREE.BufferGeometry {
    const base = buildCavalry(p, horseColor);
    // reuse the horse; swap the medieval rider details for a dragoon silhouette
    const extras = merge([
        part(new THREE.BoxGeometry(0.16, 0.34, 0.05), p.accent, [0, 1.98, 0.21]),
        part(new THREE.BoxGeometry(0.06, 0.2, 0.36), '#1e1a17', [0, 2.6, -0.05]),
        part(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 4), STEEL, [0.38, 2.0, 0.25], [0.9, 0, 0]),
    ]);
    const merged = mergeGeometries([base, extras], false)!;
    base.dispose();
    extras.dispose();
    return merged;
}

// ─── Musket ball (projectile for the musket era) ───────────────────────────
export function buildMusketBall(): THREE.BufferGeometry {
    return merge([part(new THREE.SphereGeometry(0.09, 5, 4), '#2b2b2b', [0, 0, 0])]);
}

// ─── Colonist crowd (instanceColor tints the white coat) ───────────────────
export function buildColonistBody(): THREE.BufferGeometry {
    return merge([
        part(new THREE.CylinderGeometry(0.16, 0.2, 0.5, 8), '#d9d2c2', [0, 0.25, 0]),
        part(new THREE.CylinderGeometry(0.27, 0.38, 0.6, 8), '#ffffff', [0, 0.78, 0]),
        part(new THREE.CylinderGeometry(0.28, 0.27, 0.4, 8), '#f0f0f0', [0, 1.18, 0]),
        part(new THREE.BoxGeometry(0.16, 0.34, 0.05), '#f4efe4', [0, 1.18, 0.26]),
        part(new THREE.SphereGeometry(0.12, 6, 5), '#e6e6e6', [-0.27, 1.32, 0]),
        part(new THREE.SphereGeometry(0.12, 6, 5), '#e6e6e6', [0.27, 1.32, 0]),
    ]);
}

export function buildColonistHead(): THREE.BufferGeometry {
    return merge([
        part(new THREE.SphereGeometry(0.16, 8, 7), SKIN, [0, 0, 0]),
        ...tricorne(0.14),
    ]);
}

// ─── Modern era (1914 onward): helmets, puttees, bolt-action rifles ────────
const WEBBING = '#8a7a58';

/** Like part(), but with exact colors (see tint). */
function mpart(
    geom: THREE.BufferGeometry,
    color: string,
    pos: [number, number, number],
    rot?: [number, number, number],
    scale?: [number, number, number]
): THREE.BufferGeometry {
    if (scale) geom.scale(...scale);
    if (rot) {
        geom.rotateX(rot[0]);
        geom.rotateY(rot[1]);
        geom.rotateZ(rot[2]);
    }
    geom.translate(...pos);
    return tint(geom, color, true);
}


function helmetParts(kind: Helmet, y: number, cloth: string): THREE.BufferGeometry[] {
    switch (kind) {
        case 'brodie': {
            const c = '#5e6248';
            return [
                mpart(new THREE.CylinderGeometry(0.31, 0.31, 0.025, 12), c, [0, y, 0]),
                mpart(new THREE.SphereGeometry(0.17, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), c, [0, y, 0], undefined, [1, 0.75, 1]),
            ];
        }
        case 'adrian': {
            const c = '#6f7f92';
            return [
                mpart(new THREE.SphereGeometry(0.18, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), c, [0, y, 0]),
                mpart(new THREE.CylinderGeometry(0.24, 0.25, 0.025, 12), c, [0, y, 0], undefined, [1, 1, 1.15]),
                mpart(new THREE.BoxGeometry(0.035, 0.07, 0.3), c, [0, y + 0.18, 0]),
            ];
        }
        case 'stahlhelm': {
            const c = '#5b5f58';
            return [
                mpart(new THREE.SphereGeometry(0.2, 10, 7, 0, Math.PI * 2, 0, Math.PI / 2), c, [0, y - 0.02, -0.01], undefined, [1, 0.95, 1.05]),
                // the flared "coal scuttle" skirt over the ears and neck
                mpart(new THREE.CylinderGeometry(0.2, 0.25, 0.14, 12, 1, true), c, [0, y - 0.08, -0.02]),
                mpart(new THREE.BoxGeometry(0.3, 0.02, 0.08), c, [0, y - 0.02, 0.19], [0.3, 0, 0]),
            ];
        }
        case 'pickelhaube': {
            const c = '#1c1c1e';
            return [
                mpart(new THREE.SphereGeometry(0.18, 10, 7, 0, Math.PI * 2, 0, Math.PI / 2), c, [0, y - 0.02, 0], undefined, [1, 1.15, 1.05]),
                mpart(new THREE.BoxGeometry(0.26, 0.02, 0.1), c, [0, y - 0.02, 0.17]),
                mpart(new THREE.CylinderGeometry(0.035, 0.05, 0.05, 6), '#c8a24a', [0, y + 0.2, 0]),
                mpart(new THREE.ConeGeometry(0.03, 0.14, 6), '#c8a24a', [0, y + 0.29, 0]),
                mpart(new THREE.CircleGeometry(0.06, 6), '#c8a24a', [0, y + 0.06, 0.19]),
            ];
        }
        case 'm1': {
            // US M1 "steel pot": deep round dome, narrow even brim, chin strap
            const c = '#4b5233';
            return [
                mpart(new THREE.SphereGeometry(0.2, 12, 7, 0, Math.PI * 2, 0, Math.PI / 2), c, [0, y - 0.04, 0], undefined, [1, 1.05, 1.08]),
                mpart(new THREE.CylinderGeometry(0.235, 0.235, 0.025, 12), c, [0, y - 0.04, 0], undefined, [1, 1, 1.1]),
                mpart(new THREE.BoxGeometry(0.32, 0.03, 0.02), '#6a6a52', [0, y - 0.16, 0.06], [0.4, 0, 0]),
            ];
        }
        default:
            return [
                mpart(new THREE.CylinderGeometry(0.15, 0.16, 0.16, 10), cloth, [0, y + 0.04, 0], [-0.15, 0, 0]),
                mpart(new THREE.BoxGeometry(0.22, 0.02, 0.12), '#1c1c1e', [0, y - 0.03, 0.14]),
            ];
    }
}

/** Infantryman: tunic, webbing, puttees, pack, helmet, rifle with bayonet held at the port. */
export function buildTrenchSoldier(p: ArmyPalette, helmet: Helmet = 'brodie'): THREE.BufferGeometry {
    const dark = `#${new THREE.Color(p.cloth).offsetHSL(0, 0, -0.08).getHexString()}`;
    return merge([
        // boots + wrapped puttees
        mpart(new THREE.BoxGeometry(0.14, 0.1, 0.24), '#2a1f16', [-0.1, 0.05, 0.04]),
        mpart(new THREE.BoxGeometry(0.14, 0.1, 0.24), '#2a1f16', [0.1, 0.05, 0.04]),
        mpart(new THREE.CylinderGeometry(0.075, 0.07, 0.4, 6), dark, [-0.1, 0.3, 0]),
        mpart(new THREE.CylinderGeometry(0.075, 0.07, 0.4, 6), dark, [0.1, 0.3, 0]),
        // breeches + tunic skirt + body
        mpart(new THREE.CylinderGeometry(0.24, 0.2, 0.3, 8), p.cloth, [0, 0.62, 0]),
        mpart(new THREE.CylinderGeometry(0.29, 0.3, 0.26, 8), p.cloth, [0, 0.86, 0]),
        mpart(new THREE.CylinderGeometry(0.28, 0.29, 0.5, 8), p.cloth, [0, 1.18, 0]),
        // belt, cross straps, ammunition pouches
        mpart(new THREE.CylinderGeometry(0.3, 0.3, 0.07, 8), WEBBING, [0, 0.98, 0]),
        mpart(new THREE.BoxGeometry(0.06, 0.62, 0.03), WEBBING, [0.1, 1.2, 0.27], [0, 0, 0.2]),
        mpart(new THREE.BoxGeometry(0.06, 0.62, 0.03), WEBBING, [-0.1, 1.2, 0.27], [0, 0, -0.2]),
        mpart(new THREE.BoxGeometry(0.14, 0.12, 0.08), WEBBING, [-0.16, 1.0, 0.27]),
        mpart(new THREE.BoxGeometry(0.14, 0.12, 0.08), WEBBING, [0.16, 1.0, 0.27]),
        // collar badge (army accent)
        mpart(new THREE.BoxGeometry(0.2, 0.06, 0.04), p.accent, [0, 1.42, 0.2]),
        // pack + rolled groundsheet + entrenching tool
        mpart(new THREE.BoxGeometry(0.36, 0.34, 0.16), WEBBING, [0, 1.16, -0.3]),
        mpart(new THREE.CapsuleGeometry(0.07, 0.3, 3, 6), dark, [0, 1.38, -0.3], [0, 0, Math.PI / 2]),
        mpart(new THREE.BoxGeometry(0.1, 0.18, 0.03), '#4a3a28', [0.12, 0.86, -0.3]),
        // shoulders + arms angled forward to the rifle
        mpart(new THREE.SphereGeometry(0.11, 6, 5), p.cloth, [-0.29, 1.36, 0]),
        mpart(new THREE.SphereGeometry(0.11, 6, 5), p.cloth, [0.29, 1.36, 0]),
        mpart(new THREE.CylinderGeometry(0.065, 0.06, 0.48, 6), p.cloth, [-0.24, 1.18, 0.18], [0.9, 0, -0.35]),
        mpart(new THREE.CylinderGeometry(0.065, 0.06, 0.48, 6), p.cloth, [0.27, 1.12, 0.12], [0.6, 0, 0.2]),
        // head
        mpart(new THREE.SphereGeometry(0.15, 8, 7), SKIN, [0, 1.58, 0]),
        ...helmetParts(helmet, 1.66, p.cloth),
        // rifle carried across the body at the port, bayonet fixed
        mpart(new THREE.CylinderGeometry(0.03, 0.035, 1.25, 5), WOOD_DARK, [0, 1.22, 0.36], [0.35, 0, -0.9]),
        mpart(new THREE.CylinderGeometry(0.018, 0.018, 0.5, 4), STEEL_DARK, [-0.5, 1.6, 0.48], [0.35, 0, -0.9]),
        mpart(new THREE.ConeGeometry(0.02, 0.36, 4), STEEL, [-0.8, 1.8, 0.56], [0.35, 0, -0.9]),
    ]);
}

/** Machine-gun team: one gunner kneeling behind a water-cooled gun on a tripod. */
export function buildMachineGunner(p: ArmyPalette, helmet: Helmet = 'brodie'): THREE.BufferGeometry {
    return merge([
        // kneeling legs
        mpart(new THREE.BoxGeometry(0.2, 0.18, 0.5), p.cloth, [-0.12, 0.09, -0.05]),
        mpart(new THREE.CylinderGeometry(0.075, 0.07, 0.38, 6), p.cloth, [0.12, 0.22, 0.12], [0.3, 0, 0]),
        mpart(new THREE.CylinderGeometry(0.27, 0.27, 0.46, 8), p.cloth, [0, 0.62, -0.08], [0.25, 0, 0]),
        mpart(new THREE.CylinderGeometry(0.29, 0.29, 0.07, 8), WEBBING, [0, 0.45, -0.1]),
        mpart(new THREE.SphereGeometry(0.15, 8, 7), SKIN, [0, 1.0, 0.04]),
        ...helmetParts(helmet, 1.08, p.cloth),
        mpart(new THREE.CylinderGeometry(0.06, 0.06, 0.42, 6), p.cloth, [-0.2, 0.74, 0.22], [1.2, 0, 0]),
        mpart(new THREE.CylinderGeometry(0.06, 0.06, 0.42, 6), p.cloth, [0.2, 0.74, 0.22], [1.2, 0, 0]),
        // tripod
        mpart(new THREE.CylinderGeometry(0.02, 0.02, 0.7, 4), STEEL_DARK, [0, 0.3, 0.75], [0.5, 0, 0]),
        mpart(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 4), STEEL_DARK, [-0.2, 0.28, 0.5], [-0.3, 0, 0.5]),
        mpart(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 4), STEEL_DARK, [0.2, 0.28, 0.5], [-0.3, 0, -0.5]),
        // receiver, water jacket, muzzle, ammunition belt box
        mpart(new THREE.BoxGeometry(0.16, 0.16, 0.34), '#2b2d2f', [0, 0.66, 0.5]),
        mpart(new THREE.CylinderGeometry(0.075, 0.075, 0.6, 10), '#3a3d40', [0, 0.68, 0.95], [Math.PI / 2, 0, 0]),
        mpart(new THREE.CylinderGeometry(0.03, 0.04, 0.12, 6), '#1e1f20', [0, 0.68, 1.3], [Math.PI / 2, 0, 0]),
        mpart(new THREE.BoxGeometry(0.18, 0.16, 0.26), '#4f5a3a', [0.28, 0.12, 0.5]),
        // sandbag lip in front of the gun
        mpart(new THREE.CapsuleGeometry(0.1, 0.5, 3, 6), '#a8956c', [0, 0.1, 1.15], [0, 0, Math.PI / 2]),
    ]);
}

/** 1914 cavalry: horse and rider in field uniform with helmet, lance and carbine. */
export function buildModernCavalry(p: ArmyPalette, helmet: Helmet = 'brodie', horseColor = '#5a3e28'): THREE.BufferGeometry {
    return merge([
        ...horseParts(p, horseColor),
        mpart(new THREE.CylinderGeometry(0.24, 0.3, 0.55, 8), p.cloth, [0, 1.72, -0.05]),
        mpart(new THREE.CylinderGeometry(0.26, 0.24, 0.34, 8), p.cloth, [0, 2.0, -0.05]),
        mpart(new THREE.BoxGeometry(0.06, 0.5, 0.03), WEBBING, [0, 1.95, 0.2], [0, 0, 0.5]),
        mpart(new THREE.SphereGeometry(0.15, 8, 7), SKIN, [0, 2.26, -0.05]),
        ...helmetParts(helmet, 2.34, p.cloth),
        mpart(new THREE.CylinderGeometry(0.02, 0.02, 2.6, 5), '#6e6a5e', [0.4, 1.95, 0], [0.18, 0, 0]),
        mpart(new THREE.ConeGeometry(0.04, 0.2, 6), STEEL, [0.45, 3.22, 0.23]),
        mpart(new THREE.BoxGeometry(0.02, 0.12, 0.3), p.accent, [0.42, 3.0, 0.32]),
        mpart(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 5), WOOD_DARK, [-0.36, 1.45, -0.2], [0.3, 0, 0]),
    ]);
}

/** Rifle bullet / shell fragment (modern projectiles are tiny and fast). */
export function buildBullet(): THREE.BufferGeometry {
    return merge([mpart(new THREE.CapsuleGeometry(0.04, 0.12, 2, 4), '#c9a24a', [0, 0, 0])]);
}

/** WWII tank (fills the cavalry slot in the 'ww2' era): hull, tracks, turret, gun pointing +z.
    The national marking is picked from the crew's helmet so no extra config is needed. */
export function buildTank(p: ArmyPalette, helmet: Helmet = 'm1'): THREE.BufferGeometry {
    const german = helmet === 'stahlhelm';
    // hull paint follows the army's uniform colour: olive drab, desert sand or field grey
    const hull = `#${new THREE.Color(p.cloth).offsetHSL(0, -0.04, -0.03).getHexString()}`;
    const dark = `#${new THREE.Color(hull).offsetHSL(0, 0, -0.07).getHexString()}`;
    const track = '#2b2a27';
    const parts: THREE.BufferGeometry[] = [
        // tracks with road wheels
        mpart(new THREE.BoxGeometry(0.55, 0.75, 4.1), track, [-1.05, 0.4, 0]),
        mpart(new THREE.BoxGeometry(0.55, 0.75, 4.1), track, [1.05, 0.4, 0]),
        // lower hull, sloped glacis, upper hull
        mpart(new THREE.BoxGeometry(1.6, 0.6, 3.9), dark, [0, 0.75, 0]),
        mpart(new THREE.BoxGeometry(2.6, 0.18, 3.7), hull, [0, 1.12, -0.1]),
        mpart(new THREE.BoxGeometry(2.0, 0.7, 0.9), hull, [0, 0.95, 1.85], [0.7, 0, 0]),
        mpart(new THREE.BoxGeometry(2.0, 0.45, 3.0), hull, [0, 1.42, -0.25]),
        // engine deck grille and exhausts
        mpart(new THREE.BoxGeometry(1.4, 0.04, 0.9), '#33352c', [0, 1.66, -1.2]),
        mpart(new THREE.CylinderGeometry(0.09, 0.09, 0.5, 6), '#3a2e26', [-0.6, 1.2, -2.05], [Math.PI / 2, 0, 0]),
        mpart(new THREE.CylinderGeometry(0.09, 0.09, 0.5, 6), '#3a2e26', [0.6, 1.2, -2.05], [Math.PI / 2, 0, 0]),
        // turret, mantlet, gun, commander's hatch
        mpart(new THREE.CylinderGeometry(0.78, 0.9, 0.62, 10), hull, [0, 1.95, -0.15]),
        mpart(new THREE.BoxGeometry(0.7, 0.42, 0.35), dark, [0, 1.95, 0.75]),
        mpart(new THREE.CylinderGeometry(0.08, 0.1, 2.0, 8), '#3b3f36', [0, 1.98, 1.85], [Math.PI / 2, 0, 0]),
        mpart(new THREE.CylinderGeometry(0.13, 0.13, 0.22, 8), '#3b3f36', [0, 1.98, 2.8], [Math.PI / 2, 0, 0]),
        mpart(new THREE.CylinderGeometry(0.28, 0.3, 0.16, 8), dark, [-0.25, 2.33, -0.35]),
        // commander head out of the hatch
        mpart(new THREE.SphereGeometry(0.15, 8, 7), SKIN, [-0.25, 2.55, -0.35]),
        ...helmetParts(helmet === 'stahlhelm' ? 'kepi' : helmet, 2.63, '#2a2a28'),
        // stowage box at the turret rear
        mpart(new THREE.BoxGeometry(1.1, 0.35, 0.4), WEBBING, [0, 1.9, -1.05]),
        // crew tarp rolled on the stowage box
        mpart(new THREE.CapsuleGeometry(0.12, 0.8, 3, 6), '#6a6450', [0, 2.12, -1.05], [0, 0, Math.PI / 2]),
    ];
    for (const side of [-1, 1]) {
        for (let i = 0; i < 5; i++) {
            parts.push(mpart(new THREE.CylinderGeometry(0.3, 0.3, 0.1, 10), '#3f3d36', [side * 1.34, 0.36, -1.6 + i * 0.8], [0, 0, Math.PI / 2]));
        }
        // national marking on both turret sides
        const x = side * 0.86;
        if (german) {
            parts.push(mpart(new THREE.BoxGeometry(0.03, 0.42, 0.14), '#f2f2ee', [x, 1.98, -0.15]));
            parts.push(mpart(new THREE.BoxGeometry(0.03, 0.14, 0.42), '#f2f2ee', [x, 1.98, -0.15]));
            parts.push(mpart(new THREE.BoxGeometry(0.035, 0.3, 0.07), '#151515', [x, 1.98, -0.15]));
            parts.push(mpart(new THREE.BoxGeometry(0.035, 0.07, 0.3), '#151515', [x, 1.98, -0.15]));
        } else if (helmet === 'brodie') {
            parts.push(mpart(new THREE.CylinderGeometry(0.2, 0.2, 0.03, 12), '#1f3c8a', [x, 1.98, -0.15], [0, 0, Math.PI / 2]));
            parts.push(mpart(new THREE.CylinderGeometry(0.13, 0.13, 0.035, 12), '#f2f2ee', [x, 1.98, -0.15], [0, 0, Math.PI / 2]));
            parts.push(mpart(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 10), '#b3262d', [x, 1.98, -0.15], [0, 0, Math.PI / 2]));
        } else {
            // five-pointed white star
            const star = new THREE.Shape();
            for (let k = 0; k < 10; k++) {
                const r = k % 2 === 0 ? 0.24 : 0.1;
                const a = (k / 10) * Math.PI * 2;
                if (k === 0) star.moveTo(Math.sin(a) * r, Math.cos(a) * r);
                else star.lineTo(Math.sin(a) * r, Math.cos(a) * r);
            }
            const g = new THREE.ShapeGeometry(star);
            parts.push(mpart(g, '#f2f2ee', [x + side * 0.02, 1.98, -0.15], [0, side * Math.PI / 2, 0]));
        }
    }
    return merge(parts);
}
