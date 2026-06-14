/* Detailed low-poly figures built by merging vertex-colored primitives.
   Each figure (soldier + gear, horse + rider, citizen) becomes ONE geometry,
   so whole armies render as a single InstancedMesh draw call. */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const SKIN = '#d8a77a';
const STEEL = '#9aa3ad';
const STEEL_DARK = '#6e7680';
const WOOD = '#7a5a3a';
const WOOD_DARK = '#5e4426';

/** Paint a geometry with a flat vertex color (so merge keeps per-part colors). */
function tint(geom: THREE.BufferGeometry, color: string): THREE.BufferGeometry {
    const c = new THREE.Color(color);
    // convert to match sRGB rendering of material colors
    c.convertSRGBToLinear();
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
export function buildCavalry(p: ArmyPalette, horseColor = '#6b4a2f'): THREE.BufferGeometry {
    const horseDark = `#${new THREE.Color(horseColor).offsetHSL(0, 0, -0.08).getHexString()}`;
    const legs: THREE.BufferGeometry[] = [];
    const legPos: [number, number][] = [[-0.22, 0.55], [0.22, 0.55], [-0.22, -0.62], [0.22, -0.62]];
    for (const [x, z] of legPos) {
        legs.push(part(new THREE.CylinderGeometry(0.07, 0.055, 0.85, 6), horseDark, [x, 0.42, z]));
        legs.push(part(new THREE.CylinderGeometry(0.075, 0.075, 0.1, 6), '#2e2218', [x, 0.05, z]));
    }
    return merge([
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
