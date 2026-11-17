/** Hand-built, chapter-local set dressing. Static props are merged by finish so
 * hundreds of architectural details cost only a handful of draw calls. */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { mosaicTexture } from './textures';

const FINISHES = {
    stone: '#c5af87', ivory: '#eee0be', tile: '#257f86', wood: '#513b29',
    brass: '#ba904b', terracotta: '#a9623c', leaves: '#3f6250',
    wine: '#903e44', linen: '#d2b480', glow: '#ffc578',
};
type Finish = keyof typeof FINISHES;
type V3 = [number, number, number];

function makeDetails() {
    const parts: Record<Finish, THREE.BufferGeometry[]> = {
        stone: [], ivory: [], tile: [], wood: [], brass: [], terracotta: [],
        leaves: [], wine: [], linen: [], glow: [],
    };
    const put = (finish: Finish, geometry: THREE.BufferGeometry, position: V3, rotation: V3 = [0, 0, 0]) => {
        const matrix = new THREE.Matrix4().compose(new THREE.Vector3(...position), new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)), new THREE.Vector3(1, 1, 1));
        const g = geometry.index ? geometry.toNonIndexed() : geometry;
        g.applyMatrix4(matrix);
        parts[finish].push(g);
        if (g !== geometry) geometry.dispose();
    };
    const box = (f: Finish, size: V3, p: V3, r?: V3) => put(f, new THREE.BoxGeometry(...size), p, r);
    const column = (f: Finish, radius: number, height: number, p: V3) => put(f, new THREE.CylinderGeometry(radius, radius * 1.1, height, 8), p);

    // Rills and pale stone coping establish a readable cross-axis in the square.
    for (const x of [-0.85, 0.85]) box('ivory', [0.3, 0.38, 17], [x, 0.24, -9]);
    box('tile', [1.4, 0.13, 17], [0, 0.15, -9]);
    for (const side of [-1, 1]) {
        for (const z of [1.15, 2.85]) box('ivory', [15, 0.38, 0.3], [side * 11, 0.24, z]);
        box('tile', [15, 0.13, 1.4], [side * 11, 0.15, 2]);
        // Narrow footbridges keep the promenade visually walkable.
        box('stone', [2, 0.22, 2.1], [side * 10, 0.56, 2]);
        for (const z of [-1, 5]) {
            box('stone', [3.8, 0.5, 0.65], [side * 15, 0.75, z]);
            for (const dx of [-1.25, 1.25]) box('stone', [0.45, 0.65, 0.6], [side * 15 + dx, 0.32, z]);
        }
    }
    box('stone', [2.2, 0.22, 2], [0, 0.56, -10]);

    // Eight-point mosaic medallions: two layered diamonds, not printed decals.
    for (const [x, z] of [[-10, -10], [10, -10], [-10, 12], [10, 12]]) {
        box('ivory', [4.4, 0.06, 4.4], [x, 0.09, z], [0, Math.PI / 4, 0]);
        box('tile', [3.7, 0.06, 3.7], [x, 0.13, z]);
        box('tile', [3.7, 0.06, 3.7], [x, 0.14, z], [0, Math.PI / 4, 0]);
        box('ivory', [1.7, 0.06, 1.7], [x, 0.18, z], [0, Math.PI / 4, 0]);
        box('brass', [0.7, 0.06, 0.7], [x, 0.22, z]);
    }

    // Clipped cypress gardens frame, rather than conceal, the three monuments.
    for (const x of [-22, 22]) {
        for (const z of [-17, -6, 13]) {
            box('stone', [3.6, 0.5, 3.6], [x, 0.25, z]);
            box('tile', [3.25, 0.14, 3.25], [x, 0.54, z]);
            column('wood', 0.19, 2.1, [x, 1.3, z]);
            put('leaves', new THREE.ConeGeometry(1.2, 6.5, 9), [x, 4.7, z]);
            put('leaves', new THREE.ConeGeometry(0.85, 3.8, 9), [x, 6.7, z]);
            for (const dx of [-1, 1]) {
                put('leaves', new THREE.IcosahedronGeometry(0.6, 0), [x + dx, 0.9, z + 0.75]);
            }
        }
    }

    // Brass lanterns read as warm emissive points at dusk without extra lights.
    for (const [x, z] of [[-7, -21], [7, -21], [-19, 18], [19, 18], [-5, 43], [23, 43], [-3, 56], [25, 56]]) {
        column('stone', 0.4, 0.5, [x, 0.25, z]);
        column('wood', 0.12, 3.2, [x, 1.8, z]);
        column('brass', 0.35, 0.12, [x, 3.2, z]);
        column('glow', 0.22, 0.65, [x, 3.55, z]);
        put('brass', new THREE.ConeGeometry(0.42, 0.38, 6), [x, 4.05, z]);
        for (let i = 0; i < 4; i++) {
            const a = i * Math.PI / 2;
            column('brass', 0.035, 0.8, [x + Math.cos(a) * 0.25, 3.6, z + Math.sin(a) * 0.25]);
        }
    }

    // Merchant rest area just beyond the existing bazaar; drooping textile roofs,
    // patterned borders and pottery provide recognizable human-scale silhouettes.
    for (const [x, z, color] of [[-18, 39, 'wine'], [0, 40, 'linen']] as const) {
        const fabric = new THREE.PlaneGeometry(7, 5, 12, 6);
        fabric.rotateX(-Math.PI / 2);
        const p = fabric.attributes.position;
        for (let i = 0; i < p.count; i++) {
            const sag = 0.48 * (1 - Math.pow(p.getX(i) / 3.5, 2));
            p.setY(i, -sag + 0.12 * Math.cos(p.getZ(i) * 2));
        }
        fabric.computeVertexNormals();
        put(color, fabric, [x, 4.4, z]);
        for (const dx of [-3.3, 3.3]) for (const dz of [-2.3, 2.3]) column('wood', 0.11, 4.6, [x + dx, 2.3, z + dz]);
        box('wine', [5.8, 0.07, 3.6], [x, 0.1, z]);
        for (const dz of [-1.55, 1.55]) box('linen', [5.4, 0.02, 0.12], [x, 0.15, z + dz]);
        box('wood', [2.8, 0.22, 1.5], [x, 0.7, z]);
        for (const dx of [-1, 1]) box('wood', [0.18, 0.7, 1.1], [x + dx, 0.35, z]);
        for (let i = 0; i < 3; i++) {
            const px = x + 2.2 + (i % 2) * 0.75;
            const pz = z - 0.7 + Math.floor(i / 2) * 0.9;
            put('terracotta', new THREE.SphereGeometry(0.46, 10, 7), [px, 0.6, pz]);
            column('terracotta', 0.23, 0.4, [px, 1, pz]);
            column('wood', 0.18, 0.02, [px, 1.21, pz]);
        }
    }
    return (Object.keys(parts) as Finish[]).map(finish => {
        const geometry = mergeGeometries(parts[finish]);
        parts[finish].forEach(g => g.dispose());
        return { finish, geometry: geometry! };
    });
}

function RillWater({ dusk }: { dusk: boolean }) {
    const material = useRef<THREE.ShaderMaterial>(null);
    const geometry = useMemo(() => {
        const pool = new THREE.CircleGeometry(3.08, 48).rotateX(-Math.PI / 2).translate(0, 0.445, 2);
        const shapes = [pool, new THREE.PlaneGeometry(1.4, 17).rotateX(-Math.PI / 2).translate(0, 0.32, -9), ...[-1, 1].map(side => new THREE.PlaneGeometry(15, 1.4).rotateX(-Math.PI / 2).translate(side * 11, 0.32, 2))];
        const merged = mergeGeometries(shapes);
        shapes.forEach(g => g.dispose());
        return merged!;
    }, []);
    const uniforms = useMemo(() => ({ time: { value: 0 }, deep: { value: new THREE.Color(dusk ? '#193f51' : '#246a76') }, sky: { value: new THREE.Color(dusk ? '#ae886d' : '#b6dbcf') } }), [dusk]);
    useFrame((_, dt) => { if (material.current) material.current.uniforms.time.value += Math.min(dt, 0.05); });
    return <mesh geometry={geometry}>
        <shaderMaterial ref={material} uniforms={uniforms} vertexShader={`
            varying vec3 vPosition;
            void main() { vPosition = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `} fragmentShader={`
            uniform float time;
            uniform vec3 deep;
            uniform vec3 sky;
            varying vec3 vPosition;
            void main() {
                float ripple = sin(length(vPosition.xz - vec2(0.0, 2.0)) * 11.0 - time * 1.6);
                float wave = sin(vPosition.x * 3.2 + vPosition.z * 4.1 + time * 0.7);
                float sheen = smoothstep(0.72, 1.0, ripple * wave) * 0.38;
                gl_FragColor = vec4(mix(deep, sky, 0.2 + sheen), 1.0);
                #include <tonemapping_fragment>
                #include <colorspace_fragment>
            }
        `} />
    </mesh>;
}

export function SamarkandDetails({ dusk }: { dusk: boolean }) {
    const batches = useMemo(makeDetails, []);
    const tile = useMemo(() => mosaicTexture([2, 2], 1404), []);
    return <group>
        {batches.map(({ finish, geometry }) => <mesh key={finish} geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial color={FINISHES[finish]} map={finish === 'tile' ? tile : null}
                roughness={finish === 'brass' ? 0.4 : 0.87} metalness={finish === 'brass' ? 0.55 : 0}
                side={finish === 'wine' || finish === 'linen' ? THREE.DoubleSide : THREE.FrontSide}
                emissive={finish === 'glow' ? '#ffb354' : '#000000'} emissiveIntensity={finish === 'glow' ? (dusk ? 2 : 0.2) : 0} />
        </mesh>)}
        <RillWater dusk={dusk} />
    </group>;
}
