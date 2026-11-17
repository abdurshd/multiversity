import { useEffect, useMemo } from 'react';
import { Html } from '@react-three/drei';
import { useCurrentBeat, useExperience } from '../store';
import { DESTINATIONS, openCovidReport, useCovidShift } from './model';

import { buildArchitecture, type CovidEnvironment } from './architecture';

export function CovidWorld({ environment }: { environment: CovidEnvironment }) {
    const architecture = useMemo(() => buildArchitecture(environment), [environment]);
    const allocation = useCovidShift(s => s.allocation);
    const beat = useCurrentBeat();
    const visited = useExperience(s => s.visitedHotspots);
    useEffect(() => () => architecture.forEach(p => { p.geometry.dispose(); p.material.dispose(); }), [architecture]);
    return <>
        <color attach="background" args={['#0b1b2b']} />
        <fog attach="fog" args={['#0b1b2b', 55, 110]} />
        <hemisphereLight args={['#b7d6e7', '#263139', 1.7]} />
        <directionalLight position={[14, 28, 17]} color="#ffe6bc" intensity={2.3} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-30} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30} shadow-normalBias={0.06} />
        <directionalLight position={[-20, 15, -15]} color="#71c5db" intensity={1.4} />
        {architecture.map(p => <mesh key={p.finish} geometry={p.geometry} material={p.material} castShadow receiveShadow dispose={null} />)}
        {environment === 'covid-depot' && DESTINATIONS.flatMap((destination, i) => Array.from({ length: allocation[destination] }, (_, n) =>
            <group key={`${destination}-${n}`} position={[-8 + i * 8 + (n % 2) * 1.5 - 0.75, 1.05 + Math.floor(n / 4) * 1.25, 1 + Math.floor(n % 4 / 2) * 1.7]}>
                <mesh castShadow><boxGeometry args={[1.3, 1.2, 1.4]} /><meshStandardMaterial color="#b88f60" roughness={0.9} /></mesh>
                <mesh position={[0, 0, 0.705]}><boxGeometry args={[0.3, 1.2, 0.025]} /><meshStandardMaterial color="#f4dfac" /></mesh>
            </group>))}
        {beat?.kind === 'explore' && beat.id === 'reports' && beat.hotspots.map((h, index) => <Html key={h.id} position={h.position} center zIndexRange={[15, 10]}>
            <button className="covid-marker" onClick={() => openCovidReport(h.id)} aria-label={h.label} title={h.label}>{visited.includes(h.id) ? '✓' : index + 1}</button>
        </Html>)}
    </>;
}
