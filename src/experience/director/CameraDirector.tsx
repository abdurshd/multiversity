import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useCurrentBeat, useExperience } from '../store';
import type { CameraShot, Vec3 } from '../types';

const v = (a: Vec3) => new THREE.Vector3(a[0], a[1], a[2]);

/** Smooth ease-in-out for cinematic glides. */
const ease = (t: number) => t * t * (3 - 2 * t);

interface CompiledShot {
    pos: THREE.CatmullRomCurve3;
    look: THREE.CatmullRomCurve3;
    duration: number;
    fov: number;
}

function compileShots(shots: CameraShot[], baseFov: number): CompiledShot[] {
    return shots.map((s) => ({
        pos: new THREE.CatmullRomCurve3(
            (s.path.length > 1 ? s.path : [...s.path, ...s.path]).map(v)
        ),
        look: new THREE.CatmullRomCurve3(
            (s.lookPath.length > 1 ? s.lookPath : [...s.lookPath, ...s.lookPath]).map(v)
        ),
        duration: s.duration,
        fov: s.fov ?? baseFov,
    }));
}

/**
 * Owns the camera. Cinematic beats fly the camera along splines; interactive
 * beats hand control to constrained OrbitControls; transitions are blended.
 */
export function CameraDirector() {
    const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
    const beat = useCurrentBeat();
    const phase = useExperience((s) => s.phase);
    const activeHotspotId = useExperience((s) => s.activeHotspotId);

    const controlsRef = useRef<OrbitControlsImpl | null>(null);
    const clockRef = useRef(0);
    const shotIndexRef = useRef(0);
    const lookRef = useRef(new THREE.Vector3());
    const blendRef = useRef(1); // 0→1 blend after beat change

    const cinematic = phase === 'cinematic' && beat?.kind === 'cinematic';

    const compiled = useMemo<CompiledShot[]>(() => {
        if (beat?.kind === 'cinematic') return compileShots(beat.shots, 50);
        return [];
    }, [beat]);

    // Reset clocks on beat change; aim orbit camera for interactive beats.
    useEffect(() => {
        clockRef.current = 0;
        shotIndexRef.current = 0;
        blendRef.current = 0;
        if (!beat) return;
        if (beat.kind === 'explore' || beat.kind === 'choice') {
            camera.position.set(...beat.camera.position);
            lookRef.current.set(...beat.camera.target);
            controlsRef.current?.target.copy(lookRef.current);
        } else if (beat.kind === 'battle') {
            camera.position.set(0, 60, 95);
            lookRef.current.set(0, 0, 0);
            controlsRef.current?.target.set(0, 2, 0);
        }
        camera.fov = 50;
        camera.updateProjectionMatrix();
    }, [beat, camera]);

    // Hotspot focus: glide the orbit target toward the active hotspot.
    const hotspotTarget = useMemo(() => {
        if (beat?.kind !== 'explore' || !activeHotspotId) return null;
        const h = beat.hotspots.find((x) => x.id === activeHotspotId);
        return h ? v(h.position) : null;
    }, [beat, activeHotspotId]);

    useFrame((_, delta) => {
        blendRef.current = Math.min(1, blendRef.current + delta * 1.2);

        if (cinematic && compiled.length > 0) {
            clockRef.current += delta;
            let t = clockRef.current;
            let i = shotIndexRef.current;
            while (i < compiled.length - 1 && t > compiled[i].duration) {
                t -= compiled[i].duration;
                i += 1;
            }
            shotIndexRef.current = i;
            const shot = compiled[i];
            const u = ease(Math.min(1, t / shot.duration));
            const pos = shot.pos.getPoint(u);
            const look = shot.look.getPoint(u);
            // Blend in from wherever the camera was when the beat started.
            camera.position.lerp(pos, Math.min(1, blendRef.current + 0.04));
            lookRef.current.lerp(look, Math.min(1, blendRef.current + 0.04));
            camera.lookAt(lookRef.current);
            if (Math.abs(camera.fov - shot.fov) > 0.1) {
                camera.fov = THREE.MathUtils.lerp(camera.fov, shot.fov, delta * 2);
                camera.updateProjectionMatrix();
            }
            return;
        }

        // Interactive modes: optionally pull the focus toward an open hotspot.
        const controls = controlsRef.current;
        if (controls && hotspotTarget) {
            controls.target.lerp(hotspotTarget, delta * 2.5);
        }
    });

    const interactive = !cinematic && phase !== 'loading' && phase !== 'ending';

    return (
        <OrbitControls
            ref={controlsRef}
            enabled={interactive}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            minDistance={10}
            maxDistance={phase === 'battle' ? 160 : 120}
            maxPolarAngle={Math.PI * 0.47}
            minPolarAngle={0.15}
        />
    );
}
