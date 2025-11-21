import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { Box, Text, useKeyboardControls, KeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../stores/useGameStore';

const PlayerController: React.FC = () => {
    const body = useRef<RapierRigidBody>(null);
    const [, getKeys] = useKeyboardControls();
    const { camera } = useThree();

    useFrame((_state, delta) => {
        if (!body.current) return;

        const { forward, backward, left, right } = getKeys();
        const impulse = { x: 0, y: 0, z: 0 };

        const impulseStrength = 0.5 * delta * 60;

        if (forward) impulse.z -= impulseStrength;
        if (backward) impulse.z += impulseStrength;
        if (left) impulse.x -= impulseStrength;
        if (right) impulse.x += impulseStrength;

        body.current.applyImpulse(impulse, true);

        // Camera Follow
        const bodyPos = body.current.translation();
        const cameraOffset = new THREE.Vector3(0, 5, 10);
        const targetCameraPos = new THREE.Vector3(bodyPos.x, bodyPos.y, bodyPos.z).add(cameraOffset);

        camera.position.lerp(targetCameraPos, 0.1);
        camera.lookAt(bodyPos.x, bodyPos.y, bodyPos.z);
    });

    return (
        <RigidBody ref={body} position={[0, 2, 0]} enabledRotations={[false, true, false]} friction={1} restitution={0.2}>
            <Box args={[1, 1, 1]}>
                <meshStandardMaterial color="blue" />
            </Box>
        </RigidBody>
    );
};

export const TimurLevel: React.FC = () => {
    const completeGame = useGameStore((state) => state.completeGame);

    return (
        <KeyboardControls
            map={[
                { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
                { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
                { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
                { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
                { name: 'jump', keys: ['Space'] },
            ]}
        >
            <group>
                <PlayerController />

                {/* Ground */}
                <RigidBody type="fixed" position={[0, -1, 0]} friction={2}>
                    <Box args={[50, 2, 50]}>
                        <meshStandardMaterial color="#57534e" />
                    </Box>
                </RigidBody>

                {/* Win Zone - Capture The Sultan */}
                <RigidBody
                    type="fixed"
                    sensor
                    position={[0, 1, -15]}
                    onIntersectionEnter={() => completeGame('timeline_1_historical')}
                >
                    <Box args={[4, 4, 4]}>
                        <meshStandardMaterial color="gold" transparent opacity={0.5} />
                    </Box>
                    <Text position={[0, 3, 0]} fontSize={1} color="white">
                        Capture Sultan
                    </Text>
                </RigidBody>

                {/* Secret Zone - Negotiate */}
                <RigidBody
                    type="fixed"
                    sensor
                    position={[15, 1, 0]}
                    onIntersectionEnter={() => completeGame('timeline_3_secret_alliance')}
                >
                    <Box args={[2, 2, 2]}>
                        <meshStandardMaterial color="purple" transparent opacity={0.5} />
                    </Box>
                    <Text position={[0, 2, 0]} fontSize={0.5} color="white">
                        Negotiate
                    </Text>
                </RigidBody>

                {/* Obstacles */}
                <RigidBody type="fixed" position={[-5, 1, -5]}>
                    <Box args={[2, 4, 2]}>
                        <meshStandardMaterial color="red" />
                    </Box>
                </RigidBody>
            </group>
        </KeyboardControls>
    );
};
