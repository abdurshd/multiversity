/* Stylized hero figures for the real historical people of an episode.
   Cartoon proportions (big head, chunky robe) keep them readable from the
   strategy camera; the face is the chapter portrait projected onto the head
   as a decal, so each figure keeps the likeness of the real person. */
import { Suspense, useMemo, useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Decal, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { CastPlacement, CharacterDef, CharacterPose } from '../types';

const SKIN = '#d9a77c';
const FUR = '#6b4a32';
const STEEL = '#a7b0ba';
const GOLD = '#d9a441';

/** Ground disc + name plate colours follow the character's accent. */
function SelectionRing({ color }: { color: string }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (!ref.current) return;
        const s = 1 + Math.sin(clock.elapsedTime * 2.2) * 0.05;
        ref.current.scale.set(s, s, s);
    });
    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
            <ringGeometry args={[1.05, 1.3, 40]} />
            <meshBasicMaterial color={color} transparent opacity={0.75} toneMapped={false} />
        </mesh>
    );
}

function Face({ url }: { url: string }) {
    const tex = useTexture(url);
    useMemo(() => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 4;
    }, [tex]);
    return (
        <Decal position={[0, -0.02, 0.36]} rotation={[0, 0, 0]} scale={[0.74, 0.8, 0.7]}>
            <meshStandardMaterial
                map={tex}
                transparent
                roughness={0.65}
                polygonOffset
                polygonOffsetFactor={-4}
                depthWrite={false}
            />
        </Decal>
    );
}

function Headwear({ outfit, accent }: { outfit: CharacterDef['outfit']; accent: string }) {
    switch (outfit) {
        case 'emir':
            // brocade crown cone with a fur band and a ruby, as in the portrait
            return (
                <group position={[0, 0.3, -0.02]}>
                    <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.38, 0.13, 10, 24]} />
                        <meshStandardMaterial color={FUR} roughness={1} />
                    </mesh>
                    <mesh castShadow position={[0, 0.3, 0]}>
                        <coneGeometry args={[0.34, 0.62, 20]} />
                        <meshStandardMaterial color={accent} roughness={0.45} metalness={0.45} />
                    </mesh>
                    <mesh position={[0, 0.2, 0.3]}>
                        <sphereGeometry args={[0.06, 10, 8]} />
                        <meshStandardMaterial color="#b3122e" roughness={0.2} metalness={0.3} emissive="#5a0010" />
                    </mesh>
                </group>
            );
        case 'general':
            return (
                <group position={[0, 0.3, 0]}>
                    <mesh castShadow position={[0, 0.12, 0]}>
                        <coneGeometry args={[0.44, 0.55, 18]} />
                        <meshStandardMaterial color={STEEL} roughness={0.3} metalness={0.8} />
                    </mesh>
                    <mesh position={[0, 0.48, 0]}>
                        <cylinderGeometry args={[0.02, 0.04, 0.3, 6]} />
                        <meshStandardMaterial color={STEEL} metalness={0.8} roughness={0.3} />
                    </mesh>
                </group>
            );
        case 'scholar':
        case 'prince':
        default: {
            // layered turban; the prince gets a jewelled plume
            const big = outfit === 'scholar';
            return (
                <group position={[0, 0.3, -0.02]}>
                    <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[big ? 0.4 : 0.36, big ? 0.17 : 0.14, 12, 24]} />
                        <meshStandardMaterial color="#f2ead8" roughness={0.9} />
                    </mesh>
                    <mesh castShadow position={[0, 0.16, 0]} scale={[1, 0.75, 1]}>
                        <sphereGeometry args={[big ? 0.4 : 0.34, 18, 14]} />
                        <meshStandardMaterial color="#efe5cf" roughness={0.9} />
                    </mesh>
                    {!big && (
                        <group position={[0, 0.2, 0.33]}>
                            <mesh>
                                <sphereGeometry args={[0.055, 10, 8]} />
                                <meshStandardMaterial color={accent} metalness={0.6} roughness={0.25} />
                            </mesh>
                            <mesh position={[0, 0.2, -0.04]} rotation={[-0.25, 0, 0]}>
                                <coneGeometry args={[0.05, 0.4, 8]} />
                                <meshStandardMaterial color="#f7f1e3" roughness={0.8} />
                            </mesh>
                        </group>
                    )}
                </group>
            );
        }
    }
}

/** Arm hanging from a shoulder pivot; `swing` rotates it forward/up. */
function Arm({ side, robe, skin, armRef }: { side: 1 | -1; robe: string; skin: string; armRef: RefObject<THREE.Group | null> }) {
    return (
        <group ref={armRef} position={[side * 0.6, 2.2, 0]}>
            <mesh castShadow position={[0, -0.42, 0]}>
                <capsuleGeometry args={[0.15, 0.62, 6, 12]} />
                <meshStandardMaterial color={robe} roughness={0.75} />
            </mesh>
            <mesh castShadow position={[0, -0.9, 0]}>
                <sphereGeometry args={[0.13, 12, 10]} />
                <meshStandardMaterial color={skin} roughness={0.7} />
            </mesh>
        </group>
    );
}

const POSE: Record<CharacterPose, { right: [number, number, number]; left: [number, number, number] }> = {
    idle: { right: [0.08, 0, -0.1], left: [0.08, 0, 0.1] },
    // right arm thrown forward, pointing the army onward
    command: { right: [-1.7, 0, -0.15], left: [0.15, 0, 0.15] },
    // right hand raised to the chin
    think: { right: [-2.2, 0, 0.55], left: [0.3, 0, 0.12] },
};

export function HeroCharacter({
    def,
    placement,
    scale = 1,
}: {
    def: CharacterDef;
    placement: CastPlacement;
    scale?: number;
}) {
    const root = useRef<THREE.Group>(null);
    const torso = useRef<THREE.Group>(null);
    const head = useRef<THREE.Group>(null);
    const rightArm = useRef<THREE.Group>(null);
    const leftArm = useRef<THREE.Group>(null);
    const pose = POSE[placement.pose ?? 'idle'];
    const phase = useMemo(() => (def.id.length * 1.37) % (Math.PI * 2), [def.id]);
    const tmp = useMemo(() => ({ v: new THREE.Vector3(), q: new THREE.Quaternion() }), []);

    useFrame(({ clock, camera }) => {
        const t = clock.elapsedTime + phase;
        if (torso.current) torso.current.scale.y = 1 + Math.sin(t * 1.6) * 0.012;
        if (rightArm.current) {
            rightArm.current.rotation.set(pose.right[0] + Math.sin(t * 1.3) * 0.04, pose.right[1], pose.right[2]);
        }
        if (leftArm.current) {
            leftArm.current.rotation.set(pose.left[0] - Math.sin(t * 1.3) * 0.04, pose.left[1], pose.left[2]);
        }
        // head turns toward the camera (clamped), so the face stays readable
        if (head.current && root.current) {
            tmp.v.copy(camera.position);
            root.current.worldToLocal(tmp.v);
            const yaw = THREE.MathUtils.clamp(Math.atan2(tmp.v.x, tmp.v.z), -0.7, 0.7);
            head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, yaw, 0.06);
            head.current.rotation.z = Math.sin(t * 0.7) * 0.03;
        }
    });

    const skin = def.skin ?? SKIN;
    const furCollar = def.outfit === 'emir' || def.outfit === 'prince';

    return (
        <group
            ref={root}
            position={placement.position}
            rotation={[0, placement.facing ?? 0, 0]}
            scale={scale}
        >
            <SelectionRing color={def.accent} />
            {/* boots */}
            {[-0.22, 0.22].map((x) => (
                <mesh key={x} castShadow position={[x, 0.14, 0.12]}>
                    <capsuleGeometry args={[0.13, 0.22, 4, 10]} />
                    <meshStandardMaterial color="#3b2a1d" roughness={0.8} />
                </mesh>
            ))}
            <group ref={torso}>
                {/* long robe with a gold hem */}
                <mesh castShadow receiveShadow position={[0, 0.98, 0]}>
                    <cylinderGeometry args={[0.46, 0.78, 1.7, 24]} />
                    <meshStandardMaterial color={def.robe} roughness={0.7} />
                </mesh>
                <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.77, 0.05, 8, 32]} />
                    <meshStandardMaterial color={GOLD} roughness={0.35} metalness={0.7} />
                </mesh>
                {/* front opening trim */}
                <mesh position={[0, 1.05, 0.6]} rotation={[-0.19, 0, 0]}>
                    <boxGeometry args={[0.12, 1.6, 0.04]} />
                    <meshStandardMaterial color={def.accent} roughness={0.4} metalness={0.4} />
                </mesh>
                {/* sash */}
                <mesh castShadow position={[0, 1.55, 0]}>
                    <cylinderGeometry args={[0.5, 0.52, 0.18, 24]} />
                    <meshStandardMaterial color={def.accent} roughness={0.5} metalness={0.3} />
                </mesh>
                {/* chest */}
                <mesh castShadow position={[0, 1.98, 0]}>
                    <cylinderGeometry args={[0.52, 0.48, 0.7, 24]} />
                    <meshStandardMaterial color={def.robe} roughness={0.7} />
                </mesh>
                {furCollar ? (
                    <mesh castShadow position={[0, 2.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.42, 0.16, 10, 24]} />
                        <meshStandardMaterial color={FUR} roughness={1} />
                    </mesh>
                ) : (
                    <mesh position={[0, 2.32, 0]}>
                        <cylinderGeometry args={[0.3, 0.46, 0.12, 20]} />
                        <meshStandardMaterial color={def.accent} roughness={0.5} />
                    </mesh>
                )}
                {[-1, 1].map((s) => (
                    <mesh key={s} castShadow position={[s * 0.56, 2.2, 0]}>
                        <sphereGeometry args={[0.22, 14, 12]} />
                        <meshStandardMaterial color={def.robe} roughness={0.7} />
                    </mesh>
                ))}
            </group>
            <Arm side={1} robe={def.robe} skin={skin} armRef={leftArm} />
            <Arm side={-1} robe={def.robe} skin={skin} armRef={rightArm} />
            {/* head: big cartoon sphere carrying the portrait face */}
            <group ref={head} position={[0, 2.86, 0]}>
                <mesh castShadow>
                    <sphereGeometry args={[0.44, 32, 24]} />
                    <meshStandardMaterial color={skin} roughness={0.7} />
                    <Suspense fallback={null}>
                        <Face url={def.face} />
                    </Suspense>
                </mesh>
                <Headwear outfit={def.outfit} accent={def.accent} />
            </group>
            <Html position={[0, 4.35, 0]} center distanceFactor={34} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
                <div className="flex flex-col items-center whitespace-nowrap select-none">
                    <div
                        className="rounded-full px-3 py-1 text-[13px] font-semibold text-white shadow-lg"
                        style={{ background: 'rgba(15,23,42,0.82)', border: `1.5px solid ${def.accent}` }}
                    >
                        {def.name}
                    </div>
                    <div className="mt-0.5 rounded-full bg-slate-950/70 px-2 text-[10px] text-amber-100/90">{def.role}</div>
                </div>
            </Html>
        </group>
    );
}

/** Renders every cast member of a beat that has a character definition. */
export function Cast({
    cast,
    characters,
    scale,
}: {
    cast: CastPlacement[] | undefined;
    characters: Record<string, CharacterDef> | undefined;
    scale?: number;
}) {
    if (!cast?.length || !characters) return null;
    return (
        <group>
            {cast.map((p) => {
                const def = characters[p.id];
                return def ? <HeroCharacter key={p.id} def={def} placement={p} scale={scale} /> : null;
            })}
        </group>
    );
}
