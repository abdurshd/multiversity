import { useEffect, useMemo, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { OrbitControls as Controls } from "three-stdlib";
import * as THREE from "three";
import { useCurrentBeat, useExperience } from "../store";
import { useAiView } from "./state";

export function AiCamera({ reducedMotion }: { reducedMotion: boolean }) {
  const camera = useThree((s) => s.camera);
  const controls = useRef<Controls>(null);
  const beat = useCurrentBeat();
  const phase = useExperience((s) => s.phase);
  const active = useExperience((s) => s.activeHotspotId);
  const command = useAiView((s) => s.command);
  const revision = useAiView((s) => s.revision);
  const consumedRevision = useRef(revision);
  const time = useRef(0);
  const target = useRef(new THREE.Vector3(0, 2, 0));
  const path = useMemo(
    () =>
      beat?.kind === "cinematic"
        ? new THREE.CatmullRomCurve3(
            beat.shots[0].path.map((p) => new THREE.Vector3(...p)),
          )
        : null,
    [beat],
  );
  useEffect(() => {
    time.current = 0;
    if (beat?.kind === "explore" || beat?.kind === "choice") {
      camera.position.set(...beat.camera.position);
      target.current.set(...beat.camera.target);
    } else if (beat?.kind === "cinematic") {
      camera.position.set(...beat.shots[0].path[0]);
      target.current.set(...beat.shots[0].lookPath[0]);
    }
    controls.current?.target.copy(target.current);
    camera.lookAt(target.current);
    controls.current?.update();
  }, [beat, camera]);
  useEffect(() => {
    if (revision === consumedRevision.current) return;
    consumedRevision.current = revision;
    if (beat?.kind !== "explore" || !controls.current) return;
    if (command === "home") {
      camera.position.set(...beat.camera.position);
      controls.current.target.set(...beat.camera.target);
    } else {
      const offset = camera.position.clone().sub(controls.current.target);
      offset.setLength(
        THREE.MathUtils.clamp(
          offset.length() * (command === "in" ? 0.8 : 1.25),
          6,
          48,
        ),
      );
      camera.position.copy(controls.current.target).add(offset);
    }
    controls.current.update();
  }, [revision, command, camera, beat]);
  useEffect(() => {
    if (beat?.kind !== "explore" || !active || !controls.current) return;
    const h = beat.hotspots.find((candidate) => candidate.id === active);
    if (!h) return;
    controls.current.target.set(...h.position);
    camera.position.set(
      h.position[0] + 8,
      h.position[1] + 7,
      h.position[2] + 12,
    );
    controls.current.update();
  }, [active, beat, camera]);
  useFrame((_, delta) => {
    if (
      phase !== "cinematic" ||
      !path ||
      reducedMotion ||
      beat?.kind !== "cinematic"
    )
      return;
    time.current = Math.min(
      beat.shots[0].duration,
      time.current + Math.min(delta, 0.1),
    );
    const u = time.current / beat.shots[0].duration;
    camera.position.copy(path.getPoint(u * u * (3 - 2 * u)));
    camera.lookAt(target.current);
  });
  return (
    <OrbitControls
      ref={controls}
      enabled={phase === "explore" && !active}
      enablePan={false}
      enableDamping={!reducedMotion}
      minDistance={6}
      maxDistance={48}
      minPolarAngle={0.25}
      maxPolarAngle={Math.PI * 0.46}
      touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
    />
  );
}
