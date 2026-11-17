import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useExperience } from '../store';
import { buildFutureGeometry, type FutureSolid } from '../future/geometry';
import { PROJECT_IDS } from '../future/planning';
import { useFutureRepairs } from '../future/visualState';

function FutureBatch({ solids, shape = 'box', emissive = false }: { solids: FutureSolid[]; shape?: 'box' | 'cylinder' | 'sphere'; emissive?: boolean }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    useLayoutEffect(() => {
        if (!mesh.current) return;
        const transform = new THREE.Object3D(); const color = new THREE.Color();
        solids.forEach((s, i) => {
            transform.position.set(...s.position); transform.scale.set(...s.scale); transform.rotation.set(s.pitch ?? 0, s.yaw ?? 0, 0); transform.updateMatrix();
            mesh.current!.setMatrixAt(i, transform.matrix); mesh.current!.setColorAt(i, color.set(s.color));
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
        mesh.current.computeBoundingSphere();
    }, [solids]);
    return <instancedMesh ref={mesh} args={[undefined, undefined, solids.length]} castShadow={!emissive} receiveShadow>
        {shape === 'box' ? <boxGeometry /> : shape === 'cylinder' ? <cylinderGeometry args={[1, 1, 1, 12]} /> : <sphereGeometry args={[.5, 10, 7]} />}
        {emissive ? <meshBasicMaterial toneMapped={false} /> : <meshStandardMaterial roughness={.7} metalness={.1} />}
    </instancedMesh>;
}
export function FutureDistrict({ interior = false }: { interior?: boolean }) {
    const flags = useExperience(s => s.flags);
    const planning = useExperience(s => s.beatId === 'dispatch');
    const completed = useFutureRepairs(s => s.completed);
    const geometry = useMemo(() => buildFutureGeometry(interior, planning ? completed : PROJECT_IDS.filter(id => flags.includes(`future:${id}`))), [interior, flags, planning, completed]);
    return <group>
        {!interior && <mesh position={[0, .15, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[450, 450]} /><meshStandardMaterial color="#3c7884" metalness={.42} roughness={.32} /></mesh>}
        <FutureBatch solids={geometry.boxes} /><FutureBatch solids={geometry.cylinders} shape="cylinder" /><FutureBatch solids={geometry.foliage} shape="sphere" /><FutureBatch solids={geometry.lamps} emissive />
        {interior && <pointLight position={[0, 12, -5]} intensity={50} distance={45} decay={2} color="#d1efd7" />}
    </group>;
}
