import { useExperience } from '../store';

// Chapter-local run identity. loadScript/reset creates fresh run state while
// entering loading, even when the same script/beat/index is reused on replay.
let runGeneration = 0;
useExperience.subscribe((state, previous) => {
    if (state.script?.chapterId === 'future-earth' && state.phase === 'loading'
        && (state.script !== previous.script || state.stats !== previous.stats || state.flags !== previous.flags)) runGeneration += 1;
});

/** Capture exactly one visible narration line. Neither action can affect a
 * later line, another beat/chapter, or a replay after reset. No timer is used. */
export function captureFutureCinematicActions() {
    const captured = useExperience.getState();
    const generation = runGeneration;
    let consumed = false;
    const act = (skip: boolean): boolean => {
        const live = useExperience.getState();
        const beat = live.script?.beats[live.beatId];
        if (consumed || generation !== runGeneration
            || captured.script?.chapterId !== 'future-earth' || live.script !== captured.script
            || captured.phase !== 'cinematic' || live.phase !== 'cinematic'
            || live.beatId !== captured.beatId || live.narrationIndex !== captured.narrationIndex
            || beat?.kind !== 'cinematic' || !beat.narration[live.narrationIndex]) return false;
        consumed = true;
        if (skip) live.skipCinematic(); else live.advanceNarration();
        return true;
    };
    return { continue: () => act(false), skip: () => act(true) };
}
