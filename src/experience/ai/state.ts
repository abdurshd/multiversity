import { create } from "zustand";
import { useExperience } from "../store";
import { aiReviewNext } from "../scripts/aiRevolution";

export const useAiView = create<{
  command: "home" | "in" | "out";
  revision: number;
  request: (command: "home" | "in" | "out") => void;
}>((set) => ({
  command: "home",
  revision: 0,
  request: (command) =>
    set((state) => ({ command, revision: state.revision + 1 })),
}));

/** Chapter-local action guards: stale/double activation must not advance a later beat. */
export function reviewAiStation(beatId: string, hotspotId: string): boolean {
  const state = useExperience.getState();
  if (
    state.script?.chapterId !== "ai-revolution" ||
    state.phase !== "explore" ||
    state.beatId !== beatId
  )
    return false;
  const beat = state.script.beats[beatId];
  if (beat.kind !== "explore") return false;
  const index = beat.hotspots.findIndex((h) => h.id === hotspotId);
  if (index < 0) return false;
  if (
    beatId === "recovery-check" &&
    beat.hotspots
      .slice(0, index)
      .some((h) => !state.visitedHotspots.includes(`${beatId}:${h.id}`))
  )
    return false;
  state.openHotspot(hotspotId);
  return true;
}

export function acknowledgeAiStation(
  beatId: string,
  hotspotId: string,
): boolean {
  const state = useExperience.getState();
  if (
    state.activeHotspotId !== hotspotId ||
    !reviewAiStation(beatId, hotspotId)
  )
    return false;
  state.visitHotspot(`${beatId}:${hotspotId}`);
  state.openHotspot(null);
  return true;
}

export function finishAiReview(beatId: string): boolean {
  const state = useExperience.getState();
  const beat = state.script?.beats[beatId];
  if (
    state.script?.chapterId !== "ai-revolution" ||
    state.beatId !== beatId ||
    state.phase !== "explore" ||
    beat?.kind !== "explore"
  )
    return false;
  if (
    !beat.hotspots.every((h) =>
      state.visitedHotspots.includes(`${beatId}:${h.id}`),
    )
  )
    return false;
  const next = aiReviewNext[beatId];
  if (!next) return false;
  state.gotoBeat(next);
  return true;
}

export function chooseAiOption(beatId: string, optionId: string): boolean {
  const state = useExperience.getState();
  const beat = state.script?.beats[beatId];
  if (
    state.script?.chapterId !== "ai-revolution" ||
    state.beatId !== beatId ||
    state.phase !== "choice" ||
    beat?.kind !== "choice"
  )
    return false;
  const option = beat.options.find((o) => o.id === optionId);
  if (!option) return false;
  state.choose(option.effects, option.flags, option.next);
  return true;
}

/** A rendered narration control may only act on the exact line it displayed. */
export function advanceAiScene(
  beatId: string,
  narrationIndex: number,
  skip = false,
): boolean {
  const state = useExperience.getState();
  const beat = state.script?.beats[beatId];
  if (
    state.script?.chapterId !== "ai-revolution" ||
    state.phase !== "cinematic" ||
    state.beatId !== beatId ||
    state.narrationIndex !== narrationIndex ||
    beat?.kind !== "cinematic"
  )
    return false;
  if (skip) state.skipCinematic();
  else state.advanceNarration();
  return true;
}
