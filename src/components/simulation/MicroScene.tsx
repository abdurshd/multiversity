import React, { ReactNode, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Vec3 } from '../../simulation/campaignTypes';

interface MicroSceneProps {
  active: boolean;
  target: Vec3;
  children: ReactNode;
}

const DEFAULT_CAMERA = new THREE.Vector3(0, 8, 11);

const MicroScene: React.FC<MicroSceneProps> = ({ active, target, children }) => {
  const { camera } = useThree();

  const targetVector = useMemo(() => new THREE.Vector3(target[0], target[1], target[2]), [target]);
  const activeCameraPosition = useMemo(
    () => new THREE.Vector3(target[0] + 3.8, target[1] + 3.4, target[2] + 4.2),
    [target],
  );

  useFrame((_, delta) => {
    const desired = active ? activeCameraPosition : DEFAULT_CAMERA;
    const damping = 1 - Math.exp(-delta * 2.4);

    camera.position.lerp(desired, damping);

    if (active) {
      const lookTarget = targetVector.clone();
      camera.lookAt(lookTarget);
    } else {
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group visible={active}>
      {children}
    </group>
  );
};

export default MicroScene;
