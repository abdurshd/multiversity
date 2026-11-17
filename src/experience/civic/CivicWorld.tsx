import { useEffect, useMemo } from 'react';
import { Html } from '@react-three/drei';
import { useCurrentBeat } from '../store';
import { buildCivicArchitecture, type CivicEnvironment } from './architecture';
import { useCivic } from './model';
export function CivicWorld({ environment }: { environment: CivicEnvironment }) {
    const batches = useMemo(() => buildCivicArchitecture(environment), [environment]);
    const beat = useCurrentBeat();
    const read = useCivic(s => s.read);
    useEffect(() => () => batches.forEach(p => { p.geometry.dispose(); p.material.dispose(); }), [batches]);
    return <>
        <color attach="background" args={['#263640']} /><fog attach="fog" args={['#263640', 58, 115]} />
        <hemisphereLight args={['#c9d8d8', '#3f322a', 1.7]} />
        <directionalLight position={[15, 27, 18]} intensity={2.25} color="#ffebc5" castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-30} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30} shadow-normalBias={0.06} />
        <directionalLight position={[-18, 18, -20]} intensity={1.2} color="#8faeba" />
        {batches.map(p => <mesh key={p.finish} geometry={p.geometry} material={p.material} castShadow receiveShadow dispose={null} />)}
        {beat?.kind === 'explore' && beat.hotspots.map((h, index) => <Html key={h.id} center position={h.position} zIndexRange={[15, 10]}><button className="civic-marker" aria-label={h.label} onClick={() => useCivic.getState().readRecord(h.id)}>{read.includes(h.id) ? '✓' : index + 1}</button></Html>)}
    </>;
}
