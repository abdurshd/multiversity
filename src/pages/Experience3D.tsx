/* Full-screen cinematic 3D experience: /experience/:chapterId */
import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, N8AO, SMAA, ToneMapping, Vignette, HueSaturation } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import * as THREE from 'three';
import { useExperience, useCurrentBeat } from '../experience/store';
import { getExperienceScript } from '../experience/scripts';
import { localizeScript } from '../experience/localizeScript';
import { WorldScene } from '../experience/world/WorldScene';
import { BattleView } from '../experience/battle/BattleView';
import { CameraDirector } from '../experience/director/CameraDirector';
import { ExperienceOverlay } from '../experience/ui/Overlay';
import type { EnvironmentId } from '../experience/types';

/** Coarse device tier: phones and low-core machines skip the costly passes. */
function useQualityTier(): 'low' | 'high' {
    return useMemo(() => {
        if (typeof window === 'undefined') return 'high';
        const small = window.innerWidth < 768;
        const cores = navigator.hardwareConcurrency ?? 8;
        return small || cores <= 4 ? 'low' : 'high';
    }, []);
}

function SceneContent({ quality }: { quality: 'low' | 'high' }) {
    const beat = useCurrentBeat();
    const battleRunKey = useExperience((s) => s.battleRunKey);
    const lastEnvRef = useRef<EnvironmentId>('samarkand-day');
    if (beat && beat.kind !== 'ending') lastEnvRef.current = beat.environment;
    const environment = lastEnvRef.current;

    return (
        <>
            <WorldScene environment={environment} />
            {beat?.kind === 'battle' && <BattleView key={battleRunKey} config={beat.battle} />}
            <CameraDirector />
            {/* Game-style grade: contact shadows (AO), bloom only on fire and lights,
                filmic tone mapping, light saturation lift, edge vignette, SMAA. */}
            <EffectComposer multisampling={0} enableNormalPass={false}>
                {quality === 'high' ? (
                    <N8AO halfRes aoRadius={5} distanceFalloff={1.2} intensity={2.4} quality="medium" color="#2a1d14" />
                ) : (
                    <></>
                )}
                <Bloom intensity={0.7} luminanceThreshold={0.9} luminanceSmoothing={0.2} mipmapBlur />
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
                <HueSaturation saturation={0.12} />
                <Vignette offset={0.25} darkness={0.55} />
                <SMAA />
            </EffectComposer>
        </>
    );
}

export default function Experience3D() {
    const { chapterId } = useParams<{ chapterId: string }>();
    const { t, i18n } = useTranslation('components-experience');
    const script = chapterId ? getExperienceScript(chapterId) : null;
    const loadScript = useExperience((s) => s.loadScript);
    const quality = useQualityTier();

    // ?beat=<id> opens the episode straight at one scene (handy for authoring and sharing)
    const [searchParams] = useSearchParams();
    const startBeat = searchParams.get('beat');

    useEffect(() => {
        if (!script) return;
        loadScript(localizeScript(script, t));
        if (startBeat && script.beats[startBeat]) useExperience.getState().gotoBeat(startBeat);
    }, [script, loadScript, t, i18n.language, startBeat]);

    if (!script) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
                <span className="text-5xl">🌀</span>
                <h1 className="text-2xl font-bold mt-4 text-slate-800 dark:text-slate-100">
                    {t('page.unavailable_title', { defaultValue: 'This chronicle is still being written' })}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                    {t('page.unavailable_description', {
                        defaultValue:
                            "The immersive 3D experience for this chapter isn't available yet. Timur's Legacy is the first playable chronicle.",
                    })}
                </p>
                <div className="flex gap-3 mt-6">
                    <Link
                        to="/experience/timur-legacy"
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold"
                    >
                        {t('page.play_timur', { defaultValue: '⚔ Play Timur\'s Legacy' })}
                    </Link>
                    <Link
                        to="/chapters"
                        className="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300"
                    >
                        {t('page.all_chapters', { defaultValue: 'All Chapters' })}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] bg-slate-950">
            <Canvas
                shadows="soft"
                dpr={quality === 'low' ? [1, 1.25] : [1, 1.75]}
                camera={{ position: [170, 95, 170], fov: 50, near: 0.5, far: 1200 }}
                gl={{ antialias: false, powerPreference: 'high-performance', toneMapping: THREE.NoToneMapping }}
            >
                <Suspense fallback={null}>
                    <SceneContent quality={quality} />
                </Suspense>
            </Canvas>
            <ExperienceOverlay />
            {/* exit */}
            <Link
                to={`/chapters/${script.chapterId}`}
                className="absolute top-4 left-4 z-50 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur border border-slate-400/25 text-slate-300 text-sm hover:bg-slate-800/80"
            >
                {t('page.exit', { defaultValue: '← Exit' })}
            </Link>
        </div>
    );
}
