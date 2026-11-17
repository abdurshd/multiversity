import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as Controls } from 'three-stdlib';
import * as THREE from 'three';
import { useCurrentBeat, useExperience } from '../store';
import { useCovidShift } from './model';

export function CovidCamera() {
    const camera = useThree(s => s.camera), size = useThree(s => s.size);
    const framing = Math.min(1.45, Math.max(1, size.height / Math.max(size.width, 1)));
    const beat = useCurrentBeat(), phase = useExperience(s => s.phase), active = useExperience(s => s.activeHotspotId);
    const revision = useCovidShift(s => s.revision);
    const controls = useRef<Controls>(null), elapsed = useRef(0);
    const focus = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);
    const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const change = () => setReduced(media.matches); media.addEventListener('change', change);
        return () => media.removeEventListener('change', change);
    }, []);
    useEffect(() => {
        elapsed.current = 0; focus.current = null;
        if (!beat || beat.kind === 'ending' || beat.kind === 'battle') return;
        const position = beat.kind === 'cinematic' ? beat.shots[0].path[0] : beat.camera.position;
        const target = beat.kind === 'cinematic' ? beat.shots[0].lookPath[0] : beat.camera.target;
        camera.position.set(target[0] + (position[0] - target[0]) * framing, target[1] + (position[1] - target[1]) * framing, target[2] + (position[2] - target[2]) * framing);
        controls.current?.target.set(...target); camera.lookAt(...target); controls.current?.update();
    }, [beat, camera, revision, framing]);
    useEffect(() => {
        if (beat?.id !== 'reports' || !active) { focus.current = null; return; }
        const views: Record<string, [number[], number[]]> = {
            ward: [[0, 5.2, 8], [-7, 1.8, -3]], ledger: [[13, 4.7, 5], [8, 2.1, -4]], radio: [[5, 4.1, 15], [0, 1.6, 8]],
        };
        const view = views[active]; if (!view) return;
        const target = new THREE.Vector3(...view[1]);
        const position = new THREE.Vector3(...view[0]).sub(target).multiplyScalar(framing).add(target);
        focus.current = { position, target };
        if (reduced) { camera.position.copy(position); controls.current?.target.copy(target); controls.current?.update(); focus.current = null; }
    }, [active, beat?.id, camera, framing, reduced]);
    useFrame((_, delta) => {
        if (focus.current && controls.current) {
            const alpha = 1 - Math.exp(-Math.min(delta, 0.1) * 4);
            camera.position.lerp(focus.current.position, alpha); controls.current.target.lerp(focus.current.target, alpha); controls.current.update();
            if (camera.position.distanceTo(focus.current.position) < 0.02) focus.current = null;
            return;
        }
        if (beat?.kind !== 'cinematic' || reduced || phase !== 'cinematic') return;
        const shot = beat.shots[0]; elapsed.current += Math.min(delta, 0.1);
        const t = Math.min(elapsed.current / shot.duration, 1), ease = t * t * (3 - 2 * t);
        const from = shot.path[0], to = shot.path[shot.path.length - 1], target = shot.lookPath[0];
        camera.position.set(...([0, 1, 2].map(axis => target[axis] + (THREE.MathUtils.lerp(from[axis], to[axis], ease) - target[axis]) * framing) as [number, number, number]));
        camera.lookAt(...target);
    });
    return <OrbitControls ref={controls} enabled={phase === 'explore' || phase === 'choice'} onStart={() => { focus.current = null; }} enablePan={false} enableDamping={!reduced} minDistance={6} maxDistance={42} minPolarAngle={0.6} maxPolarAngle={1.48} rotateSpeed={0.5} touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }} />;
}
