import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';
import { useExperience } from '../store';
import { useCovidShift } from './model';
import type { CovidEnvironment } from './architecture';

/** Local canvas graphics: no remote assets and no invented medical telemetry. */
function Screen({ position, title, values, variant = 0 }: { position: [number, number, number]; title: string; values: string[]; variant?: number }) {
    const valueKey = values.join('|');
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas'); canvas.width = 768; canvas.height = 512;
        const c = canvas.getContext('2d')!;
        c.fillStyle = '#0b202b'; c.fillRect(0, 0, 768, 512);
        c.strokeStyle = '#173c47'; c.lineWidth = 1;
        for (let x = 0; x < 768; x += 32) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 512); c.stroke(); }
        for (let y = 0; y < 512; y += 32) { c.beginPath(); c.moveTo(0, y); c.lineTo(768, y); c.stroke(); }
        c.fillStyle = '#7ee5d2'; c.fillRect(32, 32, 6, 30);
        c.font = '600 26px sans-serif'; c.fillText(title, 55, 56, 675);
        c.fillStyle = '#35515b'; c.fillRect(32, 82, 704, 2);
        const items = valueKey.split('|');
        if (variant === 0) {
            c.strokeStyle = '#31545f'; c.lineWidth = 9;
            for (let n = 0; n < 5; n++) { c.beginPath(); c.moveTo(55 + n * 170, 115); c.lineTo(200 + n * 150, 460); c.stroke(); }
            for (let n = 0; n < 4; n++) { c.beginPath(); c.moveTo(20, 145 + n * 95); c.lineTo(740, 120 + n * 95); c.stroke(); }
            [[160, 200], [520, 180], [370, 380]].forEach(([x, y], i) => {
                c.fillStyle = '#102d39'; c.beginPath(); c.arc(x, y, 28, 0, Math.PI * 2); c.fill();
                c.strokeStyle = ['#78e0d0', '#f2cb88', '#a7d6a2'][i]; c.lineWidth = 3; c.stroke();
                c.fillStyle = '#f1f6ed'; c.font = '600 25px sans-serif'; c.fillText(String(i + 1), x - 7, y + 8);
                c.font = '22px sans-serif'; c.fillText(items[i] ?? '', Math.max(30, x - 100), y + 59, 230);
            });
        } else {
            items.forEach((value, i) => {
                const y = 135 + i * 105;
                c.fillStyle = '#14333d'; c.fillRect(30, y - 20, 707, 88);
                c.fillStyle = ['#78e0d0', '#f2cb88', '#a7d6a2'][i % 3]; c.fillRect(30, y - 20, 4, 88);
                c.font = '500 25px sans-serif'; c.fillText(value, 55, y + 15, 640);
                c.fillStyle = '#3b5860'; c.fillRect(55, y + 40, 590 - i * 80, 3);
            });
        }
        const t = new THREE.CanvasTexture(canvas); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
    }, [title, valueKey, variant]);
    useEffect(() => () => texture.dispose(), [texture]);
    return <mesh position={position}><planeGeometry args={[5.16, 3.36]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>;
}
function WindowRain() {
    const lines = useRef<THREE.LineSegments>(null);
    const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReduced(media.matches); media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);
    const geometry = useMemo(() => {
        const positions = new Float32Array(180 * 6);
        for (let i = 0; i < 180; i++) {
            const x = ((i * 73.13) % 29) - 14.5, y = 2.6 + ((i * 31.37) % 3.6);
            positions.set([x, y, -11.75, x - 0.035, y - 0.18 - (i % 3) * 0.06, -11.75], i * 6);
        }
        const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(positions, 3)); return g;
    }, []);
    useEffect(() => () => geometry.dispose(), [geometry]);
    useFrame((_, delta) => {
        if (reduced || !lines.current) return;
        const a = geometry.attributes.position;
        for (let i = 0; i < a.count; i += 2) {
            let top = a.getY(i) - Math.min(delta, 0.05) * 1.3; if (top < 2.65) top = 6.3;
            a.setY(i, top); a.setY(i + 1, top - 0.18 - ((i / 2) % 3) * 0.06);
        }
        a.needsUpdate = true;
    });
    return <lineSegments ref={lines} geometry={geometry}><lineBasicMaterial color="#a1ced6" transparent opacity={0.23} depthWrite={false} /></lineSegments>;
}
export function CovidDetails({ environment }: { environment: CovidEnvironment }) {
    const { t } = useTranslation('experience-covid-pandemic');
    const allocation = useCovidShift(s => s.allocation), sealed = useCovidShift(s => s.sealed);
    const flags = useExperience(s => s.flags);
    const labels = [t('ui.hospital'), t('ui.clinic'), t('ui.outreach')];
    return <>
        <WindowRain />
        {environment === 'covid-briefing' && <>
            <Screen position={[-7, 3.9, -8.205]} title={t('ui.districtMap')} values={labels} />
            <Screen position={[-1, 3.9, -8.205]} title={sealed ? t('ui.sealed') : t('ui.shipmentTitle')} values={labels.map((l, i) => `${l}  ${[allocation.hospital, allocation.clinic, allocation.outreach][i]}`)} variant={1} />
            <Screen position={[5, 3.9, -8.205]} title={t('ui.publicRecord')} values={[
                flags.includes('continuity') ? t('beats.roster.options.continuity.label') : t('ui.staffing'),
                flags.includes('overpromise') ? t('beats.briefing.options.certainty.label') : t('ui.knownUnknown'),
                flags.includes('corrected') ? t('beats.correction.options.correct.label') : t('ui.nextUpdate'),
            ]} variant={2} />
        </>}
        <pointLight position={[-8, 5.8, -4]} color="#b3eddf" intensity={34} distance={15} decay={2} />
        <pointLight position={[6, 5.8, 0]} color="#ffd6a0" intensity={48} distance={17} decay={2} />
        <pointLight position={[0, 5.6, -9]} color="#7ec6df" intensity={38} distance={16} decay={2} />
    </>;
}
