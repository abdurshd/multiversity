import type { TFunction } from "i18next";
import type { Beat } from "../types";
import en from "../../locales/en/experience/ai-revolution.json";

type Copy = {
  title?: string;
  prompt?: string;
  hotspots?: Record<
    string,
    { label?: string; title?: string; description?: string }
  >;
  options?: Record<string, { label?: string; description?: string }>;
};

/** Keep the hold branch entirely in simulated traffic without changing graph IDs/actions. */
export function aiScenarioBeat(
  beat: Beat | null,
  flags: readonly string[],
  t: TFunction,
): Beat | null {
  if (!beat || !flags.includes("hold")) return beat;
  const copy: Copy | undefined = (en.drill as Record<string, Copy>)[beat.id];
  if (!copy) return beat;
  const translate = (field: string, fallback: string) =>
    t(`experience-ai-revolution:drill.${beat.id}.${field}`, {
      defaultValue: fallback,
    });
  if (beat.kind === "explore")
    return {
      ...beat,
      prompt: copy.prompt ? translate("prompt", copy.prompt) : beat.prompt,
      hotspots: beat.hotspots.map((hotspot) => {
        const override = copy.hotspots?.[hotspot.id];
        if (!override) return hotspot;
        return {
          ...hotspot,
          ...Object.fromEntries(
            Object.entries(override).map(([key, value]) => [
              key,
              translate(`hotspots.${hotspot.id}.${key}`, value),
            ]),
          ),
        };
      }),
    };
  if (beat.kind === "choice")
    return {
      ...beat,
      title: copy.title ? translate("title", copy.title) : beat.title,
      prompt: copy.prompt ? translate("prompt", copy.prompt) : beat.prompt,
      options: beat.options.map((option) => {
        const override = copy.options?.[option.id];
        if (!override) return option;
        return {
          ...option,
          ...Object.fromEntries(
            Object.entries(override).map(([key, value]) => [
              key,
              translate(`options.${option.id}.${key}`, value),
            ]),
          ),
        };
      }),
    };
  return beat;
}
