import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrbitControls, Environment, Loader } from '@react-three/drei';
import { useGameStore } from './stores/useGameStore';
import { TimurLevel } from './levels/TimurAnkara/TimurLevel';

export const GameCanvas: React.FC = () => {
    const currentLevel = useGameStore((state) => state.currentLevel);

    return (
        <div className="w-full h-screen bg-slate-950 relative">
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
                <Suspense fallback={null}>
                    <Environment preset="sunset" />
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[10, 10, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize={[1024, 1024]}
                    />

                    <Physics debug>
                        {/* Level Loader */}
                        {currentLevel === 'timur-ankara' && <TimurLevel />}

                        {/* Default/Fallback Scene */}
                        {!currentLevel && (
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshStandardMaterial color="orange" />
                            </mesh>
                        )}

                        {/* Floor for physics testing */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                            <planeGeometry args={[100, 100]} />
                            <meshStandardMaterial color="#334155" />
                        </mesh>
                    </Physics>

                    <OrbitControls makeDefault />
                </Suspense>
            </Canvas>
            <Loader />

            {/* Simple HUD Overlay */}
            <div className="absolute top-4 left-4 text-white pointer-events-none">
                <h1 className="text-2xl font-bold">Multiversity 3D Prototype</h1>
                <p className="text-sm opacity-70">Level: {currentLevel || 'None'}</p>
            </div>
        </div>
    );
};
