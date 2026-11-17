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

/** 18th-century hair: a cap over the back of the skull, side rolls and a tied queue. */
function PeriwigHair({ color, bald = false }: { color: string; bald?: boolean }) {
    return (
        <group>
            {/* back/top cap — tilted back so the face decal stays clear */}
            <mesh castShadow position={[0, bald ? -0.02 : 0.05, -0.08]} rotation={[-0.35, 0, 0]} scale={bald ? [1.02, 0.82, 0.96] : [1.04, 0.98, 1]}>
                <sphereGeometry args={[0.45, 24, 16, 0, Math.PI * 2, 0, bald ? Math.PI * 0.42 : Math.PI * 0.5]} />
                <meshStandardMaterial color={color} roughness={0.95} side={THREE.DoubleSide} />
            </mesh>
            {bald && (
                <mesh position={[0, -0.06, -0.16]} rotation={[-1.2, 0, 0]}>
                    <sphereGeometry args={[0.455, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.38]} />
                    <meshStandardMaterial color={color} roughness={0.95} side={THREE.DoubleSide} />
                </mesh>
            )}
            {/* side rolls over the ears */}
            {[-1, 1].map((s) => (
                <mesh key={s} castShadow position={[s * 0.4, -0.05, -0.04]} rotation={[0, 0, Math.PI / 2]}>
                    <capsuleGeometry args={[0.1, 0.12, 4, 10]} />
                    <meshStandardMaterial color={color} roughness={0.95} />
                </mesh>
            ))}
            {/* queue tied with a black ribbon */}
            <mesh castShadow position={[0, -0.28, -0.42]} rotation={[0.35, 0, 0]}>
                <capsuleGeometry args={[0.07, 0.28, 4, 8]} />
                <meshStandardMaterial color={color} roughness={0.95} />
            </mesh>
            <mesh position={[0, -0.14, -0.43]}>
                <boxGeometry args={[0.2, 0.08, 0.06]} />
                <meshStandardMaterial color="#121212" roughness={0.6} />
            </mesh>
        </group>
    );
}

/** Short 19th-century hair: a cap over the back of the skull with fuller sides. */
function ShortHair({ color, full = false }: { color: string; full?: boolean }) {
    return (
        <group>
            <mesh castShadow position={[0, 0.06, -0.1]} rotation={[-0.4, 0, 0]} scale={full ? [1.12, 1.08, 1.08] : [1, 1, 1]}>
                <sphereGeometry args={[0.46, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
                <meshStandardMaterial color={color} roughness={0.95} side={THREE.DoubleSide} />
            </mesh>
            {[-1, 1].map((s) => (
                <mesh key={s} castShadow position={[s * 0.4, -0.04, -0.06]} scale={full ? [0.75, 1.1, 1.1] : [0.5, 0.9, 0.9]}>
                    <sphereGeometry args={[0.18, 12, 10]} />
                    <meshStandardMaterial color={color} roughness={0.95} />
                </mesh>
            ))}
        </group>
    );
}

function Headwear({ outfit, accent, hair, hat, balding = false }: { outfit: CharacterDef['outfit']; accent: string; hair?: string; hat?: string; balding?: boolean }) {
    switch (outfit) {
        case 'stovepipe':
            // dark hair under a tall silk stovepipe hat
            return (
                <group>
                    <ShortHair color={hair ?? '#1e1814'} />
                    <group position={[0, 0.34, -0.04]} rotation={[-0.08, 0, 0]}>
                        <mesh castShadow position={[0, 0, 0]}>
                            <cylinderGeometry args={[0.62, 0.62, 0.04, 28]} />
                            <meshStandardMaterial color="#121214" roughness={0.45} />
                        </mesh>
                        <mesh castShadow position={[0, 0.5, 0]}>
                            <cylinderGeometry args={[0.38, 0.35, 1.0, 28]} />
                            <meshStandardMaterial color="#121214" roughness={0.35} metalness={0.1} />
                        </mesh>
                        <mesh position={[0, 0.1, 0]}>
                            <cylinderGeometry args={[0.36, 0.36, 0.14, 28]} />
                            <meshStandardMaterial color="#2a2a2e" roughness={0.6} />
                        </mesh>
                    </group>
                </group>
            );
        case 'frock-coat':
            return <ShortHair color={hair ?? '#3a2a1e'} full />;
        case 'pickelhaube':
            // black leather spiked helmet with brass eagle plate
            return (
                <group>
                    <ShortHair color={hair ?? '#5a4a3a'} />
                    <group position={[0, 0.28, -0.04]} rotation={[-0.12, 0, 0]}>
                        <mesh castShadow scale={[1, 0.85, 1.05]}>
                            <sphereGeometry args={[0.47, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#121214" roughness={0.3} metalness={0.2} />
                        </mesh>
                        {/* front visor and neck guard */}
                        <mesh position={[0, 0.02, 0.3]} rotation={[0.35, 0, 0]}>
                            <cylinderGeometry args={[0.5, 0.5, 0.03, 20, 1, false, -Math.PI / 3, (Math.PI * 2) / 3]} />
                            <meshStandardMaterial color="#121214" roughness={0.3} />
                        </mesh>
                        <mesh position={[0, 0.04, -0.3]} rotation={[-0.4, 0, 0]}>
                            <cylinderGeometry args={[0.5, 0.5, 0.03, 20, 1, false, Math.PI * 0.66, (Math.PI * 2) / 3]} />
                            <meshStandardMaterial color="#121214" roughness={0.3} />
                        </mesh>
                        <mesh position={[0, 0.2, 0.42]} rotation={[-0.35, 0, 0]}>
                            <cylinderGeometry args={[0.14, 0.14, 0.03, 6]} />
                            <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
                        </mesh>
                        {/* the spike */}
                        <mesh position={[0, 0.42, 0]}>
                            <cylinderGeometry args={[0.07, 0.09, 0.08, 10]} />
                            <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
                        </mesh>
                        <mesh castShadow position={[0, 0.6, 0]}>
                            <coneGeometry args={[0.05, 0.3, 10]} />
                            <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
                        </mesh>
                    </group>
                </group>
            );
        case 'plumed-helmet':
            // Austrian general's cocked hat with a cascade of green feathers
            return (
                <group>
                    <ShortHair color={hair ?? '#3a2c22'} />
                    <group position={[0, 0.34, -0.04]}>
                        <mesh castShadow rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={[1, 1, 0.55]}>
                            <cylinderGeometry args={[0.6, 0.6, 0.3, 24, 1, false, Math.PI / 2, Math.PI]} />
                            <meshStandardMaterial color="#141418" roughness={0.6} side={THREE.DoubleSide} />
                        </mesh>
                        {Array.from({ length: 11 }, (_, i) => {
                            const a = (i / 10 - 0.5) * 2.4;
                            return (
                                <mesh key={i} castShadow position={[Math.sin(a) * 0.32, 0.3 + Math.cos(a) * 0.12, Math.cos(a) * 0.05]} rotation={[0, 0, -a * 0.9]} scale={[0.12, 0.42, 0.06]}>
                                    <sphereGeometry args={[1, 10, 8]} />
                                    <meshStandardMaterial color={i % 2 ? '#2f7a3a' : '#3f9a4a'} roughness={0.8} />
                                </mesh>
                            );
                        })}
                        <mesh position={[0.36, 0.16, 0.1]}>
                            <sphereGeometry args={[0.07, 10, 8]} />
                            <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.3} />
                        </mesh>
                    </group>
                </group>
            );
        case 'civil-war-general':
            // felt slouch hat with a gold cord
            return (
                <group>
                    <ShortHair color={hair ?? '#4a3020'} />
                    <group position={[0, 0.33, -0.04]} rotation={[-0.12, 0, 0]}>
                        <mesh castShadow position={[0, 0, 0]} scale={[1, 1, 0.95]}>
                            <cylinderGeometry args={[0.7, 0.72, 0.04, 28]} />
                            <meshStandardMaterial color={hat ?? '#1b1b1d'} roughness={0.9} />
                        </mesh>
                        <mesh castShadow position={[0, 0.2, 0]} scale={[1, 0.8, 1]}>
                            <sphereGeometry args={[0.4, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                            <meshStandardMaterial color={hat ?? '#1b1b1d'} roughness={0.9} />
                        </mesh>
                        <mesh position={[0, 0.02, 0]}>
                            <cylinderGeometry args={[0.41, 0.41, 0.2, 24, 1, true]} />
                            <meshStandardMaterial color={hat ?? '#1b1b1d'} roughness={0.9} side={THREE.DoubleSide} />
                        </mesh>
                        <mesh position={[0, 0.08, 0]}>
                            <torusGeometry args={[0.41, 0.02, 6, 28]} />
                            <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.35} />
                        </mesh>
                    </group>
                </group>
            );
        case 'colonial-general':
            // powdered hair under a black tricorne edged in gold
            return (
                <group>
                    <PeriwigHair color={hair ?? '#e6e1d6'} />
                    <group position={[0, 0.36, -0.04]} rotation={[-0.1, 0, 0]}>
                        <mesh castShadow position={[0, 0.08, 0]}>
                            <cylinderGeometry args={[0.3, 0.38, 0.26, 20]} />
                            <meshStandardMaterial color="#17171b" roughness={0.75} />
                        </mesh>
                        {/* flat brim, then three sides cocked up into a triangle with a point at the front */}
                        <mesh castShadow position={[0, -0.03, 0]}>
                            <cylinderGeometry args={[0.66, 0.66, 0.04, 3]} />
                            <meshStandardMaterial color="#17171b" roughness={0.75} />
                        </mesh>
                        {[Math.PI / 3, Math.PI, (Math.PI * 5) / 3].map((a) => (
                            <group key={a} rotation={[0, a, 0]}>
                                <group position={[0, -0.02, 0.33]} rotation={[0.32, 0, 0]}>
                                    <mesh castShadow position={[0, 0.15, 0]}>
                                        <boxGeometry args={[1.14, 0.3, 0.04]} />
                                        <meshStandardMaterial color="#17171b" roughness={0.75} />
                                    </mesh>
                                    <mesh position={[0, 0.3, 0.01]}>
                                        <boxGeometry args={[1.16, 0.035, 0.06]} />
                                        <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.35} />
                                    </mesh>
                                </group>
                            </group>
                        ))}
                        {/* black cockade on the left side */}
                        <mesh position={[-0.3, 0.16, 0.22]} rotation={[0.3, -Math.PI / 3, 0]}>
                            <cylinderGeometry args={[0.08, 0.08, 0.03, 12]} />
                            <meshStandardMaterial color="#111111" roughness={0.6} />
                        </mesh>
                    </group>
                </group>
            );
        case 'queen':
            // towering powdered pouf with curls and a ribbon
            return (
                <group>
                    <PeriwigHair color={hair ?? '#ece6da'} />
                    {[0.32, 0.6, 0.86].map((y, i) => (
                        <mesh key={y} castShadow position={[0, y, -0.06 - i * 0.02]} scale={[1, 0.85, 0.9]}>
                            <sphereGeometry args={[0.4 - i * 0.07, 18, 14]} />
                            <meshStandardMaterial color={hair ?? '#ece6da'} roughness={0.95} />
                        </mesh>
                    ))}
                    <mesh position={[0.22, 0.75, 0.18]} rotation={[0, 0, 0.6]}>
                        <torusGeometry args={[0.12, 0.04, 8, 16]} />
                        <meshStandardMaterial color={accent} roughness={0.5} />
                    </mesh>
                    <mesh position={[-0.12, 1.12, -0.05]} rotation={[0, 0, 0.35]}>
                        <coneGeometry args={[0.06, 0.6, 8]} />
                        <meshStandardMaterial color="#f7f3ea" roughness={0.8} />
                    </mesh>
                </group>
            );
        case 'napoleonic':
            // short unpowdered hair and the bicorne worn side to side
            return (
                <group>
                    <mesh castShadow position={[0, 0.06, -0.08]} rotation={[-0.35, 0, 0]}>
                        <sphereGeometry args={[0.46, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                        <meshStandardMaterial color={hair ?? '#3a2a1e'} roughness={0.95} side={THREE.DoubleSide} />
                    </mesh>
                    <group position={[0, 0.3, -0.02]}>
                        <mesh castShadow rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.62]}>
                            <cylinderGeometry args={[0.78, 0.78, 0.34, 28, 1, false, Math.PI / 2, Math.PI]} />
                            <meshStandardMaterial color="#141418" roughness={0.75} side={THREE.DoubleSide} />
                        </mesh>
                        <mesh position={[0.36, 0.2, 0.18]}>
                            <cylinderGeometry args={[0.1, 0.1, 0.03, 14]} />
                            <meshStandardMaterial color="#c4232f" roughness={0.6} />
                        </mesh>
                        <mesh position={[0.36, 0.2, 0.2]}>
                            <cylinderGeometry args={[0.06, 0.06, 0.03, 14]} />
                            <meshStandardMaterial color="#f2efe6" roughness={0.6} />
                        </mesh>
                    </group>
                </group>
            );
        case 'statesman':
            return <PeriwigHair color={hair ?? '#8a7a66'} bald={balding} />;
        case 'king':
            // powdered wig under a jewelled crown
            return (
                <group>
                    <PeriwigHair color={hair ?? '#ece7dc'} />
                    <group position={[0, 0.36, -0.02]}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.34, 0.34, 0.18, 24, 1, true]} />
                            <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} side={THREE.DoubleSide} />
                        </mesh>
                        <mesh position={[0, 0.12, 0]} scale={[1, 0.6, 1]}>
                            <sphereGeometry args={[0.3, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#8c1023" roughness={0.6} />
                        </mesh>
                        {Array.from({ length: 8 }, (_, i) => {
                            const a = (i / 8) * Math.PI * 2;
                            return (
                                <mesh key={i} position={[Math.sin(a) * 0.34, 0.14, Math.cos(a) * 0.34]}>
                                    {i % 2 === 0 ? <octahedronGeometry args={[0.06]} /> : <sphereGeometry args={[0.04, 8, 6]} />}
                                    <meshStandardMaterial color={i % 2 === 0 ? GOLD : '#f2efe6'} metalness={0.7} roughness={0.25} />
                                </mesh>
                            );
                        })}
                        <mesh position={[0, 0.34, 0]}>
                            <boxGeometry args={[0.04, 0.16, 0.04]} />
                            <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
                        </mesh>
                        <mesh position={[0, 0.36, 0]}>
                            <boxGeometry args={[0.12, 0.04, 0.04]} />
                            <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
                        </mesh>
                        <mesh position={[0, 0.02, 0.34]}>
                            <sphereGeometry args={[0.05, 10, 8]} />
                            <meshStandardMaterial color="#1d3fa8" roughness={0.2} metalness={0.3} emissive="#081a50" />
                        </mesh>
                    </group>
                </group>
            );
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

/** 18th-century silhouette: knee breeches, stockings, buckled shoes, a long
    coat open over a waistcoat, with turned-back facings in the accent colour. */
/** 1860s body: long trousers, knee-length frock coat, waistcoat, white collar and black tie. */
function FrockBody({ coat, accent, trousers, military, tunic = false }: { coat: string; accent: string; trousers: string; military: boolean; tunic?: boolean }) {
    return (
        <group>
            {[-0.22, 0.22].map((x) => (
                <group key={x} position={[x, 0, 0]}>
                    <mesh castShadow position={[0, 0.08, 0.06]}>
                        <boxGeometry args={[0.24, 0.14, 0.42]} />
                        <meshStandardMaterial color="#121212" roughness={0.45} />
                    </mesh>
                    <mesh castShadow position={[0, 0.66, 0]}>
                        <cylinderGeometry args={[0.19, 0.15, 1.16, 12]} />
                        <meshStandardMaterial color={trousers} roughness={0.85} />
                    </mesh>
                    {tunic && (
                        <mesh castShadow position={[0, 0.42, 0]}>
                            <cylinderGeometry args={[0.18, 0.17, 0.8, 12]} />
                            <meshStandardMaterial color="#141210" roughness={0.35} metalness={0.1} />
                        </mesh>
                    )}
                    {military && !tunic && (
                        <mesh position={[x > 0 ? 0.19 : -0.19, 0.66, 0]}>
                            <boxGeometry args={[0.02, 1.1, 0.06]} />
                            <meshStandardMaterial color={accent} roughness={0.6} />
                        </mesh>
                    )}
                </group>
            ))}
            {/* waistcoat */}
            <mesh castShadow position={[0, 1.6, 0.02]}>
                <cylinderGeometry args={[0.45, 0.44, 1.0, 20]} />
                <meshStandardMaterial color={military ? coat : '#1f1d1c'} roughness={0.75} />
            </mesh>
            {/* knee-length skirt of the frock coat */}
            <mesh castShadow receiveShadow position={[0, tunic ? 1.3 : 1.02, 0]}>
                <cylinderGeometry args={[0.5, tunic ? 0.58 : 0.66, tunic ? 0.64 : 1.2, 24, 1, true, Math.PI * (military ? 0.04 : 0.12), Math.PI * (military ? 1.92 : 1.76)]} />
                <meshStandardMaterial color={coat} roughness={0.75} side={THREE.DoubleSide} />
            </mesh>
            {/* chest */}
            <mesh castShadow position={[0, 1.94, -0.02]}>
                <cylinderGeometry args={[0.52, 0.5, 0.8, 24, 1, true, Math.PI * (military ? 0.04 : 0.2), Math.PI * (military ? 1.92 : 1.6)]} />
                <meshStandardMaterial color={coat} roughness={0.75} side={THREE.DoubleSide} />
            </mesh>
            {military ? (
                <>
                    {/* double row of buttons and a sash at the waist */}
                    {[-0.13, 0.13].map((x) =>
                        [1.5, 1.7, 1.9, 2.1].map((y) => (
                            <mesh key={`${x}${y}`} position={[x, y, 0.5]}>
                                <sphereGeometry args={[0.035, 8, 6]} />
                                <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.3} />
                            </mesh>
                        )),
                    )}
                    <mesh position={[0, 1.36, 0]}>
                        <cylinderGeometry args={[0.53, 0.53, 0.14, 24]} />
                        <meshStandardMaterial color={accent} roughness={0.6} />
                    </mesh>
                </>
            ) : (
                /* lapels */
                [-1, 1].map((sd) => (
                    <mesh key={sd} position={[sd * 0.2, 1.98, 0.44]} rotation={[-0.2, sd * 0.4, sd * 0.25]}>
                        <boxGeometry args={[0.14, 0.6, 0.04]} />
                        <meshStandardMaterial color={coat} roughness={0.6} />
                    </mesh>
                ))
            )}
            {/* white shirt collar and black tie */}
            <mesh position={[0, 2.3, 0.1]}>
                <cylinderGeometry args={[0.24, 0.3, 0.14, 18]} />
                <meshStandardMaterial color="#f4f2ec" roughness={0.8} />
            </mesh>
            <mesh position={[0, 2.24, 0.34]} scale={[1.6, 0.7, 0.6]}>
                <sphereGeometry args={[0.07, 10, 8]} />
                <meshStandardMaterial color="#0f0f10" roughness={0.6} />
            </mesh>
            {[-1, 1].map((sd) => (
                <group key={sd} position={[sd * 0.56, 2.22, 0]}>
                    <mesh castShadow>
                        <sphereGeometry args={[0.22, 14, 12]} />
                        <meshStandardMaterial color={coat} roughness={0.75} />
                    </mesh>
                    {military && (
                        <mesh position={[0, 0.2, 0]} rotation={[0, 0, sd * 0.2]}>
                            <boxGeometry args={[0.16, 0.04, 0.34]} />
                            <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.35} />
                        </mesh>
                    )}
                </group>
            ))}
        </group>
    );
}

function CoatBody({ coat, accent, breeches, epaulettes }: { coat: string; accent: string; breeches: string; epaulettes: boolean }) {
    return (
        <group>
            {[-0.22, 0.22].map((x) => (
                <group key={x} position={[x, 0, 0]}>
                    <mesh castShadow position={[0, 0.08, 0.06]}>
                        <boxGeometry args={[0.24, 0.14, 0.42]} />
                        <meshStandardMaterial color="#141414" roughness={0.5} />
                    </mesh>
                    <mesh position={[0, 0.16, 0.25]}>
                        <boxGeometry args={[0.12, 0.05, 0.03]} />
                        <meshStandardMaterial color="#c9ccd1" metalness={0.8} roughness={0.3} />
                    </mesh>
                    {/* white stockings */}
                    <mesh castShadow position={[0, 0.48, 0]}>
                        <cylinderGeometry args={[0.13, 0.11, 0.6, 12]} />
                        <meshStandardMaterial color="#efece4" roughness={0.85} />
                    </mesh>
                    {/* breeches */}
                    <mesh castShadow position={[0, 0.98, 0]}>
                        <cylinderGeometry args={[0.2, 0.15, 0.5, 12]} />
                        <meshStandardMaterial color={breeches} roughness={0.8} />
                    </mesh>
                </group>
            ))}
            {/* waistcoat */}
            <mesh castShadow position={[0, 1.55, 0.02]}>
                <cylinderGeometry args={[0.46, 0.44, 1.0, 20]} />
                <meshStandardMaterial color={breeches} roughness={0.75} />
            </mesh>
            {/* coat: open skirt (C-shaped) + closed chest */}
            <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
                <cylinderGeometry args={[0.5, 0.7, 1.0, 24, 1, true, Math.PI * 0.16, Math.PI * 1.68]} />
                <meshStandardMaterial color={coat} roughness={0.7} side={THREE.DoubleSide} />
            </mesh>
            {/* facings along the opening */}
            {[-1, 1].map((sd) => (
                <mesh key={sd} position={[sd * 0.17, 1.35, 0.5]} rotation={[-0.15, sd * 0.35, sd * 0.12]}>
                    <boxGeometry args={[0.13, 1.4, 0.04]} />
                    <meshStandardMaterial color={accent} roughness={0.6} />
                </mesh>
            ))}
            <mesh castShadow position={[0, 1.98, -0.04]}>
                <cylinderGeometry args={[0.52, 0.5, 0.72, 24, 1, true, Math.PI * 0.22, Math.PI * 1.56]} />
                <meshStandardMaterial color={coat} roughness={0.7} side={THREE.DoubleSide} />
            </mesh>
            {/* gilt buttons */}
            {[1.25, 1.45, 1.65, 1.85, 2.05].map((y) => (
                <mesh key={y} position={[0, y, 0.47]}>
                    <sphereGeometry args={[0.035, 8, 6]} />
                    <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.3} />
                </mesh>
            ))}
            {/* white cravat */}
            <mesh position={[0, 2.26, 0.22]} rotation={[0.3, 0, 0]}>
                <coneGeometry args={[0.16, 0.3, 10]} />
                <meshStandardMaterial color="#f5f2ea" roughness={0.9} />
            </mesh>
            <mesh position={[0, 2.34, 0]}>
                <cylinderGeometry args={[0.26, 0.42, 0.14, 20]} />
                <meshStandardMaterial color={accent} roughness={0.6} />
            </mesh>
            {[-1, 1].map((sd) => (
                <group key={sd} position={[sd * 0.56, 2.22, 0]}>
                    <mesh castShadow>
                        <sphereGeometry args={[0.22, 14, 12]} />
                        <meshStandardMaterial color={coat} roughness={0.7} />
                    </mesh>
                    {epaulettes && (
                        <group position={[0, 0.16, 0]}>
                            <mesh>
                                <cylinderGeometry args={[0.2, 0.22, 0.06, 14]} />
                                <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
                            </mesh>
                            <mesh position={[0, -0.1, 0]}>
                                <cylinderGeometry args={[0.23, 0.24, 0.16, 14, 1, true]} />
                                <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.5} side={THREE.DoubleSide} />
                            </mesh>
                        </group>
                    )}
                </group>
            ))}
        </group>
    );
}

/** Royal mantle: velvet cape down the back with an ermine edge. */
function ErmineCape({ color }: { color: string }) {
    const spots = useMemo(() => Array.from({ length: 14 }, (_, i) => {
        const a = Math.PI * 0.62 + (i / 13) * Math.PI * 0.76;
        return [Math.sin(a) * 0.86, 0.2 + (i % 3) * 0.08, Math.cos(a) * 0.86] as [number, number, number];
    }), []);
    return (
        <group>
            <mesh castShadow position={[0, 1.2, -0.04]}>
                <cylinderGeometry args={[0.58, 0.88, 2.1, 24, 1, true, Math.PI * 0.6, Math.PI * 0.8]} />
                <meshStandardMaterial color={color} roughness={0.55} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0.25, -0.04]}>
                <cylinderGeometry args={[0.85, 0.9, 0.24, 24, 1, true, Math.PI * 0.6, Math.PI * 0.8]} />
                <meshStandardMaterial color="#f4f1ea" roughness={1} side={THREE.DoubleSide} />
            </mesh>
            {spots.map((p, i) => (
                <mesh key={i} position={[p[0] * 1.03, p[1], p[2] * 1.03 - 0.04]}>
                    <boxGeometry args={[0.03, 0.07, 0.03]} />
                    <meshStandardMaterial color="#111111" />
                </mesh>
            ))}
        </group>
    );
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
    const furCollar = def.outfit === 'emir' || def.outfit === 'prince' || def.outfit === 'king';
    const frockStyle = def.outfit === 'stovepipe' || def.outfit === 'frock-coat' || def.outfit === 'civil-war-general' || def.outfit === 'pickelhaube' || def.outfit === 'plumed-helmet';
    const coatStyle = def.outfit === 'colonial-general' || def.outfit === 'statesman' || def.outfit === 'napoleonic';

    return (
        <group
            ref={root}
            position={placement.position}
            rotation={[0, placement.facing ?? 0, 0]}
            scale={scale}
        >
            <SelectionRing color={def.accent} />
            {frockStyle ? (
                <group ref={torso}>
                    <FrockBody
                        coat={def.robe}
                        accent={def.accent}
                        trousers={def.breeches ?? '#2a2a2c'}
                        military={def.outfit === 'civil-war-general' || def.outfit === 'pickelhaube' || def.outfit === 'plumed-helmet'}
                        tunic={def.outfit === 'pickelhaube' || def.outfit === 'plumed-helmet'}
                    />
                </group>
            ) : coatStyle ? (
                <group ref={torso}>
                    <CoatBody coat={def.robe} accent={def.accent} breeches={def.breeches ?? '#e7dcc0'} epaulettes={def.outfit === 'colonial-general' || def.outfit === 'napoleonic'} />
                </group>
            ) : (
            <>
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
                        <meshStandardMaterial color={def.outfit === 'king' ? '#f4f1ea' : FUR} roughness={1} />
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
                {def.outfit === 'king' && <ErmineCape color={def.accent} />}
            </group>
            </>
            )}
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
                <Headwear outfit={def.outfit} accent={def.accent} hair={def.hair} hat={def.hat} balding={def.balding} />
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
