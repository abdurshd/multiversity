import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as Controls } from 'three-stdlib';
import * as THREE from 'three';
import { useCurrentBeat, useExperience } from '../store';
import { useCivic } from './model';

export function CivicCamera() {
    const camera = useThree(s => s.camera);
    const size = useThree(s => s.size);
    const framing = Math.min(1.6, Math.max(1, size.height / Math.max(size.width, 1)));
    const beat = useCurrentBeat();
    const phase = useExperience(s => s.phase);
    const revision = useCivic(s => s.viewRevision);
    const controls = useRef<Controls>(null);
    const elapsed = useRef(0);
    const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const change = () => setReduced(media.matches);
        media.addEventListener('change', change);
        return () => media.removeEventListener('change', change);
    }, []);
    useEffect(() => {
        elapsed.current = 0;
        if (!beat || beat.kind === 'ending') return;
        const position = beat.kind === 'cinematic' ? beat.shots[0].path[0] : beat.kind === 'explore' || beat.kind === 'choice' ? beat.camera.position : [25, 20, 29];
        const target = beat.kind === 'cinematic' ? beat.shots[0].lookPath[0] : beat.kind === 'explore' || beat.kind === 'choice' ? beat.camera.target : [0, 1, 0];
        camera.position.set(target[0] + (position[0] - target[0]) * framing, target[1] + (position[1] - target[1]) * framing, target[2] + (position[2] - target[2]) * framing);
        controls.current?.target.set(target[0], target[1], target[2]);
        camera.lookAt(target[0], target[1], target[2]); controls.current?.update();
    }, [beat, camera, revision, framing]);
    useFrame((_, delta) => {
        if (beat?.kind !== 'cinematic' || reduced || phase !== 'cinematic') return;
        const shot = beat.shots[0]; elapsed.current += Math.min(delta, 0.1);
        const t = Math.min(elapsed.current / shot.duration, 1), ease = t * t * (3 - 2 * t);
        const from = shot.path[0], to = shot.path[shot.path.length - 1];
        const target = shot.lookPath[0];
        camera.position.set(...([0, 1, 2].map(axis => target[axis] + (THREE.MathUtils.lerp(from[axis], to[axis], ease) - target[axis]) * framing) as [number, number, number]));
        camera.lookAt(...shot.lookPath[0]);
    });
    return <OrbitControls ref={controls} enabled={phase === 'explore' || phase === 'choice'} enablePan={false} enableDamping={!reduced} minDistance={18} maxDistance={80} minPolarAngle={0.35} maxPolarAngle={1.25} rotateSpeed={0.6} touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }} />;
}
