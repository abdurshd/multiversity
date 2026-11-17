import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as Controls } from 'three-stdlib';
import * as THREE from 'three';
import type { Vec3 } from '../types';
import { useCurrentBeat, useExperience } from '../store';
import { useUnionCamera } from '../ui/unionActions';

/** Optional chapter camera. Dolly/orbit buttons mirror touch gestures without moving story state. */
export function UnionCamera() {
    const camera = useThree(s => s.camera) as THREE.PerspectiveCamera;
    const beat = useCurrentBeat();
    const phase = useExperience(s => s.phase);
    const active = useExperience(s => s.activeHotspotId);
    const control = useRef<Controls>(null);
    const elapsed = useRef(0);
    const destination = useRef<{ p: THREE.Vector3; t: THREE.Vector3 } | null>(null);
    const { command, revision } = useUnionCamera();
    const consumed = useRef(revision);
    const reducedMotion = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
    const cinematic = phase === 'cinematic' && beat?.kind === 'cinematic';
    const curve = useMemo(() => beat?.kind === 'cinematic' ? new THREE.CatmullRomCurve3(beat.shots[0].path.map(p => new THREE.Vector3(...p))) : null, [beat]);
    useEffect(() => {
        elapsed.current = 0;
        destination.current = null;
        const c: { position: Vec3; target: Vec3 } = beat && (beat.kind === 'explore' || beat.kind === 'choice') ? beat.camera : { position: [34, 24, 44], target: [0, 2, -8] };
        camera.position.set(...c.position);
        control.current?.target.set(...c.target);
        camera.lookAt(...c.target); camera.fov = 48; camera.updateProjectionMatrix();
    }, [beat, camera]);
    useEffect(() => {
        if (beat?.kind !== 'explore' || !active) return;
        const h = beat.hotspots.find(h => h.id === active);
        if (h?.closeUp) destination.current = { p: new THREE.Vector3(...h.closeUp.path[h.closeUp.path.length - 1]), t: new THREE.Vector3(...h.position) };
    }, [beat, active]);
    useEffect(() => {
        if (consumed.current === revision) return;
        consumed.current = revision;
        if (!control.current || !beat || (beat.kind !== 'explore' && beat.kind !== 'choice')) return;
        const target = control.current.target.clone();
        const offset = camera.position.clone().sub(target);
        if (command === 'overview') {
            destination.current = { p: new THREE.Vector3(...beat.camera.position), t: new THREE.Vector3(...beat.camera.target) };
            return;
        }
        if (command === 'in' || command === 'out') offset.setLength(THREE.MathUtils.clamp(offset.length() * (command === 'in' ? .78 : 1.28), 9, 85));
        else offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), command === 'left' ? -.3 : .3);
        destination.current = { p: target.clone().add(offset), t: target };
    }, [revision, command, beat, camera]);
    useFrame((_, dt) => {
        if (cinematic && beat.kind === 'cinematic') {
            elapsed.current += dt;
            const shot = beat.shots[0];
            const t = reducedMotion ? 1 : THREE.MathUtils.smoothstep(Math.min(1, elapsed.current / shot.duration), 0, 1);
            if (curve) camera.position.copy(curve.getPoint(t));
            camera.lookAt(...shot.lookPath[0]);
        } else if (destination.current && control.current) {
            const { p, t } = destination.current;
            const blend = reducedMotion ? 1 : 1 - Math.exp(-dt * 5);
            camera.position.lerp(p, blend); control.current.target.lerp(t, blend); control.current.update();
            if (camera.position.distanceTo(p) < .02) destination.current = null;
        }
    });
    return <OrbitControls ref={control} enabled={phase === 'explore' || phase === 'choice'} enablePan={false}
        minDistance={9} maxDistance={85} minPolarAngle={.18} maxPolarAngle={Math.PI * .46}
        enableDamping dampingFactor={.08} rotateSpeed={.65} onStart={() => { destination.current = null; }}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }} />;
}
