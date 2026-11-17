import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useCurrentBeat, useExperience } from '../store';
import type { CameraShot, Vec3 } from '../types';
import { useTimurNavigation } from '../ui/timurNavigation';
import { useFutureNavigation } from '../future/navigation';

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
    const future = useExperience((s) => s.script?.chapterId === 'future-earth');
    const futureRevision = useFutureNavigation(s => s.revision);
    const futureReducedMotion = useFutureNavigation(s => s.reducedMotion);
    const consumedFutureRevision = useRef(futureRevision);
    const timur = useExperience((s) => s.script?.chapterId === 'timur-legacy');
    const command = useTimurNavigation((s) => s.command);
    const revision = useTimurNavigation((s) => s.revision);
    const size = useThree((s) => s.size);
    const consumedRevision = useRef(revision);
    const transition = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);
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

    useEffect(() => {
        transition.current = null;
        if (!timur || beat?.kind !== 'explore' || !activeHotspotId) return;
        const hotspot = beat.hotspots.find((h) => h.id === activeHotspotId);
        const shot = hotspot?.closeUp;
        if (shot) transition.current = { position: v(shot.path[shot.path.length - 1]), target: v(shot.lookPath[0]) };
    }, [activeHotspotId, beat, timur]);

    // Opt-in touch controls for the Timur slice. Requests move the camera only,
    // preserving visited landmarks, effects, and narrative progress.
    useEffect(() => {
        if (revision === consumedRevision.current) return;
        consumedRevision.current = revision;
        if (!timur || beat?.kind !== 'explore') return;
        const controls = controlsRef.current;
        if (!controls) return;
        if (command === 'overview') {
            transition.current = { position: v(beat.camera.position), target: v(beat.camera.target) };
        } else if (command === 'in' || command === 'out') {
            const offset = camera.position.clone().sub(controls.target);
            offset.setLength(THREE.MathUtils.clamp(offset.length() * (command === 'in' ? 0.75 : 1.33), 10, 120));
            transition.current = { position: controls.target.clone().add(offset), target: controls.target.clone() };
        }
    }, [revision, command, timur, beat, camera]);

    useEffect(() => {
        if (!future) return;
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => useFutureNavigation.getState().setReducedMotion(query.matches);
        update(); query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, [future]);
    useEffect(() => {
        if (consumedFutureRevision.current === futureRevision) return;
        consumedFutureRevision.current = futureRevision;
        if (!future || !beat || (beat.kind !== 'explore' && beat.kind !== 'choice')) return;
        camera.position.set(...beat.camera.position);
        lookRef.current.set(...beat.camera.target);
        controlsRef.current?.target.copy(lookRef.current);
        controlsRef.current?.update();
    }, [futureRevision, future, beat, camera]);

    // Hotspot focus: glide the orbit target toward the active hotspot.
    const hotspotTarget = useMemo(() => {
        if (beat?.kind !== 'explore' || !activeHotspotId) return null;
        const h = beat.hotspots.find((x) => x.id === activeHotspotId);
        return h ? v(h.position) : null;
    }, [beat, activeHotspotId]);

    useFrame((_, delta) => {
        blendRef.current = Math.min(1, blendRef.current + delta * 1.2);

        if (future && futureReducedMotion && cinematic && compiled.length > 0) {
            const shot = compiled[0];
            camera.position.copy(shot.pos.getPoint(1));
            camera.lookAt(shot.look.getPoint(0));
            camera.fov = shot.fov; camera.updateProjectionMatrix();
            return;
        }
        if (cinematic && compiled.length > 0) {
            clockRef.current += delta;
            let t = clockRef.current;
            let i = timur || future ? 0 : shotIndexRef.current;
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
        if (controls && timur && transition.current) {
            const destination = transition.current;
            const alpha = 1 - Math.exp(-delta * 5);
            camera.position.lerp(destination.position, alpha);
            controls.target.lerp(destination.target, alpha);
            if (camera.position.distanceTo(destination.position) < 0.05) transition.current = null;
            controls.update();
        } else if (controls && hotspotTarget && !timur) {
            if (future && futureReducedMotion) controls.target.copy(hotspotTarget);
            else controls.target.lerp(hotspotTarget, delta * 2.5);
        }
    });

    const interactive = !cinematic && phase !== 'loading' && phase !== 'ending';

    return (
        <OrbitControls
            ref={controlsRef}
            enabled={interactive}
            onStart={() => { transition.current = null; }}
            touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
            rotateSpeed={timur && size.width < 768 ? 0.65 : 1}
            enablePan={false}
            enableDamping={!future || !futureReducedMotion}
            dampingFactor={0.08}
            minDistance={10}
            maxDistance={phase === 'battle' ? 160 : 120}
            maxPolarAngle={Math.PI * 0.47}
            minPolarAngle={0.15}
        />
    );
}
