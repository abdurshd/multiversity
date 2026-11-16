/* World renderer: composes the stylized environments used by experience beats. */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Html, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import type { EnvironmentId, Hotspot } from '../types';
import { useCurrentBeat, useExperience } from '../store';
import {
    Banner, Bazaar, Citizens, CityWalls, Dome, Fire, GreatMosque, Houses,
    Madrasah, Mausoleum, Minaret, PALETTE, Particles, Tents, Trees, mulberry32, sharedMats,
} from './parts';
import { pavingTexture } from './textures';
import { buildMarcher, figureMaterial } from './figures';
import { Cast } from './HeroCharacter';
import { MarengoField, ParisBastille, ParisTerror, ValmyField, Varennes } from './revolution';
import { AntietamField, CharlestonHarbor, FordsTheatre, GettysburgField, Springfield, Washington1861 } from './civilwar';
import { London, Philadelphia, PhiladelphiaWinter, ValleyForge, Versailles, YorktownField } from './colonial';

// ─── Environment settings ──────────────────────────────────────────────────
interface EnvDef {
    skyTop: string;
    skyHorizon: string;
    fog: string;
    sun: string;
    sunPos: [number, number, number];
    ambient: number;
    ground: string;
    groundVar: string;
    /** celestial body: sun disc or moon */
    disc: { pos: [number, number, number]; color: string; size: number };
    clouds: boolean;
}

const ENV: Record<EnvironmentId, EnvDef> = {
    'samarkand-day': {
        skyTop: '#5d96c9', skyHorizon: '#d9e6e2', fog: '#cfd9d2', sun: '#fff2d4',
        sunPos: [80, 110, 40], ambient: 0.5, ground: '#c4a87e', groundVar: '#a98f66',
        disc: { pos: [260, 340, 130], color: '#fff7e0', size: 28 }, clouds: true,
    },
    'samarkand-dusk': {
        skyTop: '#241b3e', skyHorizon: '#b3542e', fog: '#4a3a55', sun: '#ff9a52',
        sunPos: [-90, 30, 60], ambient: 0.26, ground: '#8a7458', groundVar: '#6e5c46',
        disc: { pos: [-420, 90, 280], color: '#ffb066', size: 42 }, clouds: false,
    },
    'winter-march': {
        skyTop: '#1c2738', skyHorizon: '#8fa5b8', fog: '#a8bac8', sun: '#dfe9f2',
        sunPos: [40, 60, -60], ambient: 0.42, ground: '#e6edf1', groundVar: '#c6d4dd',
        disc: { pos: [180, 300, -340], color: '#f2f6fa', size: 24 }, clouds: false,
    },
    'great-wall': {
        skyTop: '#7d9bb4', skyHorizon: '#dcc8a2', fog: '#cbb795', sun: '#ffe2b0',
        sunPos: [-70, 90, -50], ambient: 0.46, ground: '#ad9c78', groundVar: '#90805f',
        disc: { pos: [-300, 320, -200], color: '#fff0cf', size: 26 }, clouds: true,
    },
    'anatolia': {
        skyTop: '#6e94b8', skyHorizon: '#e4cfa4', fog: '#d2bb92', sun: '#ffd9a0',
        sunPos: [70, 70, -80], ambient: 0.46, ground: '#b5a077', groundVar: '#998357',
        disc: { pos: [300, 280, -300], color: '#ffeccb', size: 26 }, clouds: true,
    },
    'philadelphia': {
        skyTop: '#5a8fc4', skyHorizon: '#e2e6dc', fog: '#d4dccf', sun: '#fff0d0',
        sunPos: [70, 100, 60], ambient: 0.5, ground: '#7f9a5a', groundVar: '#68824a',
        disc: { pos: [250, 330, 200], color: '#fff6dc', size: 26 }, clouds: true,
    },
    'valley-forge': {
        skyTop: '#3a4a5e', skyHorizon: '#b6c2cc', fog: '#bcc8d2', sun: '#e8eef4',
        sunPos: [-50, 55, -70], ambient: 0.44, ground: '#e6edf1', groundVar: '#c6d4dd',
        disc: { pos: [-220, 260, -320], color: '#f0f4f8', size: 22 }, clouds: false,
    },
    'yorktown': {
        skyTop: '#6d8fb2', skyHorizon: '#e6d5b0', fog: '#d6c7a4', sun: '#ffd89c',
        sunPos: [-80, 70, 70], ambient: 0.46, ground: '#7f9150', groundVar: '#9a8a52',
        disc: { pos: [-320, 260, 280], color: '#ffe9c4', size: 28 }, clouds: true,
    },
    'versailles': {
        skyTop: '#5d8fc6', skyHorizon: '#eadfca', fog: '#ddd4c0', sun: '#fff1d6',
        sunPos: [60, 90, 80], ambient: 0.52, ground: '#86a05c', groundVar: '#6f8a4c',
        disc: { pos: [220, 300, 260], color: '#fff8e2', size: 26 }, clouds: true,
    },
    'london': {
        skyTop: '#66788c', skyHorizon: '#cfd2d0', fog: '#bfc4c4', sun: '#f1ead8',
        sunPos: [-60, 80, 70], ambient: 0.5, ground: '#6f8550', groundVar: '#5c7044',
        disc: { pos: [-260, 280, 260], color: '#f3efe2', size: 22 }, clouds: true,
    },
    'philadelphia-winter': {
        skyTop: '#46566b', skyHorizon: '#c3ccd4', fog: '#c7d0d8', sun: '#eef2f6',
        sunPos: [60, 60, 70], ambient: 0.44, ground: '#e6edf1', groundVar: '#c6d4dd',
        disc: { pos: [240, 240, 300], color: '#f2f5f8', size: 22 }, clouds: false,
    },
    'paris-1789': {
        skyTop: '#5c87b4', skyHorizon: '#e3d7c0', fog: '#d6cbb5', sun: '#ffe2b4',
        sunPos: [70, 80, 60], ambient: 0.5, ground: '#9b9a6c', groundVar: '#86875a',
        disc: { pos: [260, 280, 220], color: '#fff2d8', size: 26 }, clouds: true,
    },
    'paris-terror': {
        skyTop: '#5a6472', skyHorizon: '#c8c2b8', fog: '#bdb7ad', sun: '#efe6d6',
        sunPos: [-60, 70, 60], ambient: 0.5, ground: '#8f9268', groundVar: '#7b7f58',
        disc: { pos: [-240, 260, 240], color: '#efe8da', size: 22 }, clouds: true,
    },
    'varennes': {
        skyTop: '#0d1324', skyHorizon: '#2f3550', fog: '#232a3e', sun: '#9fb4e0',
        sunPos: [-50, 60, -40], ambient: 0.32, ground: '#4c5a3c', groundVar: '#3e4a31',
        disc: { pos: [-200, 260, -300], color: '#eef2ff', size: 16 }, clouds: false,
    },
    'valmy': {
        skyTop: '#7b93ad', skyHorizon: '#d9dcd6', fog: '#cfd3cf', sun: '#fbefd8',
        sunPos: [60, 60, 80], ambient: 0.5, ground: '#7f8a50', groundVar: '#6e7845',
        disc: { pos: [240, 220, 300], color: '#fff6e2', size: 24 }, clouds: true,
    },
    'marengo': {
        skyTop: '#4f86c4', skyHorizon: '#e8dcbc', fog: '#d9cfae', sun: '#ffe6b0',
        sunPos: [80, 100, 40], ambient: 0.5, ground: '#93a055', groundVar: '#a69450',
        disc: { pos: [300, 340, 160], color: '#fff3d4', size: 28 }, clouds: true,
    },
    'springfield': {
        skyTop: '#1c2238', skyHorizon: '#a35a3a', fog: '#4a3e46', sun: '#ffb070',
        sunPos: [-90, 26, 60], ambient: 0.34, ground: '#8a7a55', groundVar: '#76683f',
        disc: { pos: [-300, 70, 200], color: '#ffc488', size: 24 }, clouds: true,
    },
    'washington-1861': {
        skyTop: '#5e86b4', skyHorizon: '#e2ddd0', fog: '#d4d2c8', sun: '#fff1d6',
        sunPos: [70, 90, 60], ambient: 0.5, ground: '#86955c', groundVar: '#73824c',
        disc: { pos: [260, 300, 200], color: '#fff6e0', size: 26 }, clouds: true,
    },
    'charleston-harbor': {
        skyTop: '#1d2540', skyHorizon: '#d17a4a', fog: '#6a5560', sun: '#ffab6a',
        sunPos: [40, 22, -110], ambient: 0.36, ground: '#3d5a6a', groundVar: '#365261',
        disc: { pos: [60, 100, -420], color: '#ffc27e', size: 16 }, clouds: true,
    },
    'antietam': {
        skyTop: '#6f8fb3', skyHorizon: '#e3e0d2', fog: '#d6d6cc', sun: '#fff0d4',
        sunPos: [80, 70, -40], ambient: 0.5, ground: '#7a9150', groundVar: '#8f9455',
        disc: { pos: [280, 240, -160], color: '#fff6e2', size: 24 }, clouds: true,
    },
    'gettysburg': {
        skyTop: '#4d82c0', skyHorizon: '#ece2c4', fog: '#ddd6be', sun: '#ffeec8',
        sunPos: [-40, 110, -60], ambient: 0.52, ground: '#7f9a52', groundVar: '#9a9a58',
        disc: { pos: [-160, 380, -240], color: '#fff4d8', size: 28 }, clouds: true,
    },
    'fords-theatre': {
        skyTop: '#0a0d18', skyHorizon: '#1d2236', fog: '#1a1418', sun: '#ffcf8a',
        sunPos: [10, 80, 30], ambient: 0.3, ground: '#3a2c22', groundVar: '#30241c',
        disc: { pos: [-200, 260, -300], color: '#eef2ff', size: 14 }, clouds: false,
    },
};

const WINTER = new Set<EnvironmentId>(['winter-march', 'valley-forge', 'philadelphia-winter']);

export function WorldScene({ environment }: { environment: EnvironmentId }) {
    const env = ENV[environment];
    return (
        <group>
            <fog attach="fog" args={[env.fog, 90, 340]} />
            <SkyDome top={env.skyTop} horizon={env.skyHorizon} />
            {/* sun / moon disc */}
            <mesh position={env.disc.pos}>
                <sphereGeometry args={[env.disc.size, 16, 12]} />
                <meshBasicMaterial color={env.disc.color} fog={false} />
            </mesh>
            {/* image-based light: a tiny procedural sky cube (rendered once, no download)
                gives every PBR material soft sky fill and warm sun-side reflections */}
            <Environment resolution={64} frames={1} environmentIntensity={0.55}>
                <color attach="background" args={[env.skyHorizon]} />
                <Lightformer form="rect" intensity={2.2} color={env.skyTop} scale={[40, 40, 1]} position={[0, 18, 0]} rotation={[Math.PI / 2, 0, 0]} />
                <Lightformer form="circle" intensity={5} color={env.sun} scale={6} position={[env.sunPos[0] / 10, env.sunPos[1] / 10, env.sunPos[2] / 10]} target={[0, 0, 0]} />
                <Lightformer form="rect" intensity={0.8} color={env.ground} scale={[40, 40, 1]} position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            </Environment>
            <ambientLight intensity={env.ambient * 0.45} />
            <directionalLight
                position={env.sunPos}
                intensity={environment === 'samarkand-dusk' ? 1.5 : environment === 'varennes' ? 0.7 : environment === 'fords-theatre' ? 0.25 : environment === 'springfield' || environment === 'charleston-harbor' ? 1.5 : 2.1}
                color={env.sun}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0004}
                shadow-normalBias={0.04}
                shadow-camera-left={-130}
                shadow-camera-right={130}
                shadow-camera-top={130}
                shadow-camera-bottom={-130}
            />
            <hemisphereLight args={[env.skyHorizon, env.ground, 0.4]} />
            <Terrain base={env.ground} variant={env.groundVar} winter={WINTER.has(environment)} />
            {env.clouds && <Clouds dark={false} />}
            {(environment === 'varennes' || environment === 'springfield') && <Stars />}
            {WINTER.has(environment) && <Clouds dark />}
            {environment === 'samarkand-day' || environment === 'samarkand-dusk' ? (
                <Samarkand dusk={environment === 'samarkand-dusk'} />
            ) : environment === 'winter-march' ? (
                <WinterMarch />
            ) : environment === 'great-wall' ? (
                <GreatWallField />
            ) : environment === 'philadelphia' ? (
                <Philadelphia />
            ) : environment === 'valley-forge' ? (
                <ValleyForge />
            ) : environment === 'yorktown' ? (
                <YorktownField />
            ) : environment === 'versailles' ? (
                <Versailles />
            ) : environment === 'london' ? (
                <London />
            ) : environment === 'philadelphia-winter' ? (
                <PhiladelphiaWinter />
            ) : environment === 'paris-1789' ? (
                <ParisBastille />
            ) : environment === 'paris-terror' ? (
                <ParisTerror />
            ) : environment === 'varennes' ? (
                <Varennes />
            ) : environment === 'valmy' ? (
                <ValmyField />
            ) : environment === 'marengo' ? (
                <MarengoField />
            ) : environment === 'springfield' ? (
                <Springfield />
            ) : environment === 'washington-1861' ? (
                <Washington1861 />
            ) : environment === 'charleston-harbor' ? (
                <CharlestonHarbor />
            ) : environment === 'antietam' ? (
                <AntietamField />
            ) : environment === 'gettysburg' ? (
                <GettysburgField />
            ) : environment === 'fords-theatre' ? (
                <FordsTheatre />
            ) : (
                <AnatoliaField />
            )}
            <HotspotMarkers />
            <SceneCast />
        </group>
    );
}

// ─── Sky dome: vertical gradient shader ────────────────────────────────────
function SkyDome({ top, horizon }: { top: string; horizon: string }) {
    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            side: THREE.BackSide,
            depthWrite: false,
            fog: false,
            uniforms: {
                topColor: { value: new THREE.Color(top) },
                horizonColor: { value: new THREE.Color(horizon) },
            },
            vertexShader: /* glsl */ `
                varying vec3 vWorld;
                void main() {
                    vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: /* glsl */ `
                uniform vec3 topColor;
                uniform vec3 horizonColor;
                varying vec3 vWorld;
                void main() {
                    float h = clamp(vWorld.y / 320.0, 0.0, 1.0);
                    h = pow(h, 0.62);
                    gl_FragColor = vec4(mix(horizonColor, topColor, h), 1.0);
                }
            `,
        });
    }, [top, horizon]);
    return (
        <mesh material={material}>
            <sphereGeometry args={[760, 24, 16]} />
        </mesh>
    );
}

// ─── Terrain: gentle hills beyond the action radius, vertex-colored ────────
function Terrain({ base, variant, winter }: { base: string; variant: string; winter: boolean }) {
    const geom = useMemo(() => {
        const g = new THREE.PlaneGeometry(1100, 1100, 90, 90);
        g.rotateX(-Math.PI / 2);
        const pos = g.attributes.position;
        const baseC = new THREE.Color(base);
        const varC = new THREE.Color(variant);
        const colors = new Float32Array(pos.count * 3);
        const rand = mulberry32(winter ? 77 : 42);
        // deterministic per-vertex noise from coordinates
        const noise = (x: number, z: number) =>
            Math.sin(x * 0.021) * Math.cos(z * 0.017) +
            Math.sin(x * 0.043 + 1.7) * Math.cos(z * 0.037 + 0.6) * 0.5;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const z = pos.getZ(i);
            const r = Math.sqrt(x * x + z * z);
            // flat playfield, hills rising beyond
            const rim = Math.max(0, r - 140);
            const h = rim * 0.085 * (1 + noise(x, z) * 0.55) + (r > 140 ? noise(x * 2.3, z * 2.3) * 1.6 : 0);
            pos.setY(i, h);
            const n = (noise(x * 3.1, z * 3.1) + 1.4) / 2.8 + (rand() - 0.5) * 0.06;
            const c = baseC.clone().lerp(varC, THREE.MathUtils.clamp(n, 0, 1));
            if (winter) {
                // blue-ish shading in dips, white on rises
                const shade = THREE.MathUtils.clamp(0.5 + h * 0.03 + n * 0.18, 0.4, 1);
                c.setRGB(0.78 * shade + 0.14, 0.83 * shade + 0.13, 0.88 * shade + 0.12);
            }
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }
        g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        g.computeVertexNormals();
        return g;
    }, [base, variant, winter]);
    return (
        <mesh geometry={geom} receiveShadow>
            <meshStandardMaterial vertexColors roughness={1} />
        </mesh>
    );
}

// ─── Drifting clouds ───────────────────────────────────────────────────────
function Clouds({ dark }: { dark: boolean }) {
    const group = useRef<THREE.Group>(null!);
    const clouds = useMemo(() => {
        const rand = mulberry32(dark ? 55 : 33);
        return Array.from({ length: 7 }, () => ({
            x: (rand() - 0.5) * 600,
            y: 85 + rand() * 60,
            z: (rand() - 0.5) * 600,
            s: 8 + rand() * 14,
            speed: 0.6 + rand() * 0.8,
            blobs: Array.from({ length: 4 }, () => ({
                dx: (rand() - 0.5) * 2.4,
                dy: (rand() - 0.5) * 0.5,
                dz: (rand() - 0.5) * 1.2,
                r: 0.55 + rand() * 0.5,
            })),
        }));
    }, [dark]);
    useFrame((_, delta) => {
        group.current.children.forEach((c, i) => {
            c.position.x += clouds[i].speed * delta;
            if (c.position.x > 380) c.position.x = -380;
        });
    });
    return (
        <group ref={group}>
            {clouds.map((c, i) => (
                <group key={i} position={[c.x, c.y, c.z]}>
                    {c.blobs.map((b, k) => (
                        <mesh key={k} position={[b.dx * c.s, b.dy * c.s, b.dz * c.s]}>
                            <sphereGeometry args={[b.r * c.s, 8, 6]} />
                            <meshStandardMaterial
                                color={dark ? '#9aa8b5' : '#ffffff'}
                                transparent
                                opacity={dark ? 0.5 : 0.75}
                                flatShading
                                fog={false}
                                depthWrite={false}
                            />
                        </mesh>
                    ))}
                </group>
            ))}
        </group>
    );
}

// ─── Samarkand, 1404 ───────────────────────────────────────────────────────
function Samarkand({ dusk }: { dusk: boolean }) {
    const paving = useMemo(() => pavingTexture([10, 10]), []);
    return (
        <group>
            {/* paved Registan plaza */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
                <circleGeometry args={[27, 36]} />
                <meshStandardMaterial map={paving} roughness={0.9} />
            </mesh>
            {/* central pool */}
            <group position={[0, 0, 2]}>
                <mesh position={[0, 0.25, 0]}>
                    <cylinderGeometry args={[3.4, 3.6, 0.5, 18]} />
                    <meshStandardMaterial map={pavingTexture([3, 1])} roughness={0.9} />
                </mesh>
                <mesh position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[3.1, 18]} />
                    <meshStandardMaterial color="#2a6f86" roughness={0.15} metalness={0.4} />
                </mesh>
            </group>

            <Madrasah position={[0, 0, -32]} domeColor={PALETTE.turquoise} />
            <Madrasah position={[-34, 0, 6]} rotation={[0, Math.PI / 2.4, 0]} domeColor={PALETTE.lapis} />
            <Madrasah position={[34, 0, 6]} rotation={[0, -Math.PI / 2.4, 0]} domeColor={PALETTE.gold} />
            <GreatMosque position={[52, 0, -52]} rotation={[0, Math.PI / 4 + Math.PI, 0]} />
            <Mausoleum position={[-48, 0, 42]} rotation={[0, Math.PI / 5, 0]} />
            <Minaret height={20} position={[18, 0, 26]} />

            <Houses count={150} innerRadius={44} outerRadius={88} />
            <Bazaar position={[-4, 0, 30]} />
            <Trees count={36} innerRadius={28} outerRadius={84} />
            <Citizens count={42} radius={26} />
            <CityWalls radius={96} />

            <Banner position={[-14, 0, 12]} color={PALETTE.crimson} />
            <Banner position={[14, 0, 12]} color={PALETTE.gold} />
            <Banner position={[0, 0, -16]} color={PALETTE.crimson} />

            {/* war council camp by the gate */}
            <Tents position={[8, 0, 52]} count={8} color="#e8dcc0" />
            <Fire position={[14, 0, 58]} scale={1.2} />
            <Banner position={[20, 0, 54]} color={PALETTE.crimson} height={8} />

            <Particles count={dusk ? 140 : 220} color={dusk ? '#caa3ff' : '#e8c987'} size={0.28} />
            {dusk && (
                <group>
                    <Fire position={[-10, 0, 8]} scale={0.8} />
                    <Fire position={[10, 0, 8]} scale={0.8} />
                    <Stars />
                </group>
            )}
        </group>
    );
}

function Stars() {
    const positions = useMemo(() => {
        const rand = mulberry32(99);
        const arr = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            const a = rand() * Math.PI * 2;
            const e = rand() * Math.PI * 0.46 + 0.08;
            const r = 700;
            arr[i * 3] = Math.cos(a) * Math.cos(e) * r;
            arr[i * 3 + 1] = Math.sin(e) * r;
            arr[i * 3 + 2] = Math.sin(a) * Math.cos(e) * r;
        }
        return arr;
    }, []);
    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#ffffff" size={1.3} sizeAttenuation={false} transparent opacity={0.85} fog={false} />
        </points>
    );
}

// ─── Winter march to Otrar ─────────────────────────────────────────────────
function WinterMarch() {
    return (
        <group>
            <Tents position={[-10, 0, -6]} count={15} color="#e8e4da" />
            <Fire position={[2, 0, 4]} scale={1.4} />
            <Fire position={[-18, 0, 10]} scale={1} />
            <Fire position={[16, 0, -2]} scale={1} />
            <Banner position={[0, 0, -2]} color={PALETTE.crimson} height={9} />
            <Banner position={[-22, 0, 2]} color={PALETTE.crimson} />
            <Trees count={30} innerRadius={38} outerRadius={130} snowy />
            {/* frozen river */}
            <mesh rotation={[-Math.PI / 2, 0, 0.4]} position={[34, 0.06, 30]}>
                <planeGeometry args={[18, 280]} />
                <meshStandardMaterial color="#b9d4e2" roughness={0.12} metalness={0.35} />
            </mesh>
            {/* river banks */}
            <mesh rotation={[-Math.PI / 2, 0, 0.4]} position={[34, 0.03, 30]}>
                <planeGeometry args={[24, 284]} />
                <meshStandardMaterial color="#cfdde6" roughness={0.9} />
            </mesh>
            <MarchingColumn />
            {/* supply sledges */}
            {[[-44, -12], [-48, -4], [-52, 6]].map(([x, z], i) => (
                <group key={i} position={[x, 0, z]} rotation={[0, 0.3, 0]}>
                    <mesh position={[0, 0.55, 0]} castShadow>
                        <boxGeometry args={[1.6, 0.9, 3]} />
                        <meshStandardMaterial color="#6a5238" roughness={1} />
                    </mesh>
                    <mesh position={[0, 0.95, 0]}>
                        <capsuleGeometry args={[0.55, 1.4, 4, 8]} />
                        <meshStandardMaterial color="#d9d2c2" roughness={1} />
                    </mesh>
                    {[-0.7, 0.7].map((sx) => (
                        <mesh key={sx} position={[sx, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <boxGeometry args={[0.12, 0.12, 3.4]} />
                            <meshStandardMaterial color="#4e3a24" roughness={1} />
                        </mesh>
                    ))}
                </group>
            ))}
            <Particles count={650} snow color="#ffffff" size={0.34} />
        </group>
    );
}

function MarchingColumn() {
    const bodyRef = useRef<THREE.InstancedMesh>(null!);
    const torchRef = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const geom = useMemo(() => buildMarcher(), []);
    const mat = useMemo(() => figureMaterial(), []);
    const count = 96;
    const torchCount = Math.floor(count / 6);
    const lanes = useMemo(() => {
        const rand = mulberry32(31);
        return Array.from({ length: count }, (_, i) => ({
            lane: (i % 6) - 2.5,
            offset: Math.floor(i / 6) * 3.1 + rand() * 1.5,
            bob: rand() * Math.PI * 2,
            scale: 0.92 + rand() * 0.16,
        }));
    }, []);
    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        let torchI = 0;
        lanes.forEach((u, i) => {
            const z = ((u.offset + t * 2.1) % 130) - 85;
            const x = u.lane * 2.5 - 32;
            const bob = Math.abs(Math.sin(t * 5.2 + u.bob)) * 0.1;
            const sway = Math.sin(t * 5.2 + u.bob) * 0.05;
            dummy.position.set(x, bob, z);
            dummy.rotation.set(0, 0, sway);
            dummy.scale.setScalar(u.scale);
            dummy.updateMatrix();
            bodyRef.current.setMatrixAt(i, dummy.matrix);
            if (i % 6 === 0 && torchI < torchCount) {
                dummy.position.set(x + 0.45, 2.3 + bob, z);
                const f = 1 + Math.sin(t * 9 + i) * 0.25;
                dummy.scale.set(f * 0.8, f, f * 0.8);
                dummy.rotation.set(0, t * 2 + i, 0);
                dummy.updateMatrix();
                torchRef.current.setMatrixAt(torchI++, dummy.matrix);
            }
        });
        bodyRef.current.instanceMatrix.needsUpdate = true;
        torchRef.current.count = torchI;
        torchRef.current.instanceMatrix.needsUpdate = true;
    });
    return (
        <group>
            <instancedMesh ref={bodyRef} args={[geom, mat, count]} castShadow frustumCulled={false} />
            <instancedMesh ref={torchRef} args={[undefined, undefined, torchCount]} frustumCulled={false}>
                <coneGeometry args={[0.12, 0.4, 6]} />
                <meshStandardMaterial color="#ffb347" emissive="#ff7a1a" emissiveIntensity={2.6} transparent opacity={0.95} depthWrite={false} />
            </instancedMesh>
        </group>
    );
}

// ─── Great Wall battlefield (China campaign) ──────────────────────────────
export function GreatWallField() {
    const mats = sharedMats();
    return (
        <group>
            <group position={[0, 0, -55]}>
                <mesh position={[0, 6, 0]} material={mats.stone} castShadow>
                    <boxGeometry args={[240, 12, 10]} />
                </mesh>
                {/* walkway parapets, both sides */}
                {Array.from({ length: 30 }, (_, i) => (
                    <group key={i}>
                        <mesh position={[i * 8 - 116, 12.8, 4.4]} material={mats.stone}>
                            <boxGeometry args={[4, 1.6, 1]} />
                        </mesh>
                        <mesh position={[i * 8 - 116, 12.8, -4.4]} material={mats.stone}>
                            <boxGeometry args={[4, 1.6, 1]} />
                        </mesh>
                    </group>
                ))}
                {[-90, -30, 30, 90].map((x) => (
                    <group key={x} position={[x, 0, 0]}>
                        <mesh position={[0, 9, 0]} material={mats.stone} castShadow>
                            <boxGeometry args={[14, 18, 14]} />
                        </mesh>
                        {/* pagoda-style double roof */}
                        <mesh position={[0, 19, 0]}>
                            <coneGeometry args={[11, 3, 4]} />
                            <meshStandardMaterial color="#5e3a2a" roughness={0.9} flatShading />
                        </mesh>
                        <mesh position={[0, 21.6, 0]} material={mats.stone}>
                            <boxGeometry args={[7, 3, 7]} />
                        </mesh>
                        <mesh position={[0, 24, 0]}>
                            <coneGeometry args={[6, 2.6, 4]} />
                            <meshStandardMaterial color="#5e3a2a" roughness={0.9} flatShading />
                        </mesh>
                        {/* arrow slit windows */}
                        {[-3.5, 0, 3.5].map((wx) => (
                            <mesh key={wx} position={[wx, 10, 7.05]}>
                                <boxGeometry args={[1, 2.4, 0.2]} />
                                <meshStandardMaterial color="#1c140c" roughness={1} />
                            </mesh>
                        ))}
                        {/* Ming banner */}
                        <Banner position={[5, 21, 5]} color="#3f5f8f" height={6} />
                    </group>
                ))}
            </group>
            <Tents position={[-20, 0, 70]} count={10} color="#e8dcc0" />
            <Banner position={[-30, 0, 66]} color={PALETTE.crimson} height={9} />
            <Banner position={[30, 0, 66]} color={PALETTE.crimson} height={9} />
            <Fire position={[-12, 0, 76]} scale={1.2} />
            <Trees count={18} innerRadius={95} outerRadius={160} />
            <Particles count={200} color="#d9c089" size={0.3} />
        </group>
    );
}

// ─── Anatolian fortress field (Gates of Europe campaign) ──────────────────
export function AnatoliaField() {
    const mats = sharedMats();
    return (
        <group>
            <group position={[0, 0, -60]}>
                <mesh position={[0, 4, 0]} material={mats.brickDark}>
                    <cylinderGeometry args={[46, 60, 8, 24]} />
                </mesh>
                <group position={[0, 8, 0]}>
                    {Array.from({ length: 10 }, (_, i) => {
                        const a = (i / 10) * Math.PI * 2;
                        return (
                            <group key={i} position={[Math.cos(a) * 30, 0, Math.sin(a) * 30]}>
                                <mesh position={[0, 6, 0]} material={mats.stone} castShadow>
                                    <cylinderGeometry args={[3.4, 4, 12, 8]} />
                                </mesh>
                                <mesh position={[0, 12.6, 0]}>
                                    <coneGeometry args={[3.8, 2.6, 8]} />
                                    <meshStandardMaterial color="#7a4a3a" roughness={0.9} flatShading />
                                </mesh>
                            </group>
                        );
                    })}
                    <mesh position={[0, 4, 0]} material={mats.stone}>
                        <cylinderGeometry args={[30.5, 30.5, 8, 24, 1, true]} />
                    </mesh>
                    {/* keep with crescent banner */}
                    <mesh position={[0, 9, 0]} material={mats.stone} castShadow>
                        <boxGeometry args={[16, 18, 16]} />
                    </mesh>
                    {[-5, 0, 5].map((wx) => (
                        <mesh key={wx} position={[wx, 12, 8.05]}>
                            <boxGeometry args={[1.4, 3, 0.2]} />
                            <meshStandardMaterial color="#1c140c" roughness={1} />
                        </mesh>
                    ))}
                    <Dome radius={4} drumHeight={2} position={[0, 18, 0]} color="#3a7d5c" />
                    <Banner position={[10, 18, 0]} color="#1f6f50" height={8} />
                </group>
            </group>
            {/* cypress trees dotting the hills */}
            {[[-70, 30], [-85, 10], [75, 25], [90, -5], [60, 50], [-60, 55]].map(([x, z], i) => (
                <group key={i} position={[x, 0, z]}>
                    <mesh position={[0, 3.2, 0]} castShadow>
                        <coneGeometry args={[1.1, 6.4, 7]} />
                        <meshStandardMaterial color="#2a4435" roughness={1} flatShading />
                    </mesh>
                    <mesh position={[0, 0.3, 0]}>
                        <cylinderGeometry args={[0.14, 0.2, 0.6, 5]} />
                        <meshStandardMaterial color="#4e3826" roughness={1} />
                    </mesh>
                </group>
            ))}
            <Tents position={[-24, 0, 72]} count={12} color="#e8dcc0" />
            <Banner position={[-34, 0, 70]} color={PALETTE.crimson} height={9} />
            <Fire position={[-14, 0, 80]} scale={1.2} />
            <Trees count={16} innerRadius={100} outerRadius={170} />
            <Particles count={180} color="#dcc18d" size={0.3} />
        </group>
    );
}

// ─── Hotspot markers (explore beats) ───────────────────────────────────────
/** Historical figures placed in the current beat (or the battle commander). */
function SceneCast() {
    const beat = useCurrentBeat();
    const characters = useExperience((s) => s.script?.characters);
    if (!beat || beat.kind === 'ending') return null;
    if (beat.kind === 'battle') {
        const id = beat.battle.commander;
        if (!id) return null;
        return (
            <Cast
                characters={characters}
                cast={[{ id, position: [-46, 0, 32], facing: 0.75, pose: 'command' }]}
                scale={3.4}
            />
        );
    }
    return <Cast cast={beat.cast} characters={characters} scale={3} />;
}

function HotspotMarkers() {
    const beat = useCurrentBeat();
    if (beat?.kind !== 'explore') return null;
    return (
        <group>
            {beat.hotspots.map((h) => (
                <HotspotMarker key={h.id} hotspot={h} />
            ))}
        </group>
    );
}

function HotspotMarker({ hotspot }: { hotspot: Hotspot }) {
    const visited = useExperience((s) => s.visitedHotspots.includes(hotspot.id));
    const open = useExperience((s) => s.openHotspot);
    const visit = useExperience((s) => s.visitHotspot);
    const gemRef = useRef<THREE.Mesh>(null!);
    const ringRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        gemRef.current.position.y = hotspot.position[1] + 4 + Math.sin(t * 2) * 0.4;
        gemRef.current.rotation.y = t * 1.2;
        const s = 1 + Math.sin(t * 2.4) * 0.18;
        ringRef.current.scale.set(s, s, s);
    });
    const color = hotspot.advancesTo ? '#ffb83d' : visited ? '#6dd5c8' : '#4cc3ff';
    return (
        <group position={[hotspot.position[0], 0, hotspot.position[2]]}>
            <mesh
                ref={gemRef}
                position={[0, hotspot.position[1] + 4, 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    visit(hotspot.id);
                    open(hotspot.id);
                }}
                onPointerOver={() => (document.body.style.cursor = 'pointer')}
                onPointerOut={() => (document.body.style.cursor = 'auto')}
            >
                <octahedronGeometry args={[1.1, 0]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} transparent opacity={0.92} />
            </mesh>
            <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
                <ringGeometry args={[1.6, 2.1, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
            <Html center distanceFactor={70} position={[0, hotspot.position[1] + 6.6, 0]} style={{ pointerEvents: 'none' }}>
                <div
                    style={{
                        whiteSpace: 'nowrap',
                        padding: '3px 10px',
                        borderRadius: 999,
                        background: 'rgba(10,12,24,0.75)',
                        border: `1px solid ${color}`,
                        color: '#f3ead6',
                        fontSize: 12,
                        fontFamily: 'system-ui, sans-serif',
                    }}
                >
                    {hotspot.icon ? `${hotspot.icon} ` : ''}{hotspot.label}
                </div>
            </Html>
        </group>
    );
}
