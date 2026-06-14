import type { TFunction } from 'i18next';
import type {
    ArmyConfig,
    Beat,
    BattleConfig,
    EndingDef,
    ExperienceChoice,
    ExperienceScript,
    Hotspot,
    NarrationLine,
    TacticalEvent,
    TacticalOption,
} from './types';

/**
 * Returns a deep-cloned copy of `script` where every human-readable text field
 * has been replaced by `t(key, { defaultValue: <originalText> })`.
 *
 * Keys are built under the namespace `experience-${script.chapterId}`. The
 * structure (array lengths, ids) is always read from the ORIGINAL `script`, so
 * translations can never alter the shape of the data. Ids, numbers, colors,
 * camera paths, flags, enums and stat values are copied verbatim.
 */
export function localizeScript(script: ExperienceScript, t: TFunction): ExperienceScript {
    const ns = `experience-${script.chapterId}`;

    /** t() with namespace prefix + defaultValue fallback to the original text. */
    const tr = (key: string, original: string): string =>
        t(`${ns}:${key}`, { defaultValue: original });

    const localizeNarration = (
        lines: NarrationLine[],
        keyBase: string,
    ): NarrationLine[] =>
        lines.map((line, i) => {
            const next: NarrationLine = {
                ...line,
                text: tr(`${keyBase}.${i}.text`, line.text),
            };
            if (line.speaker !== undefined) {
                next.speaker = tr(`${keyBase}.${i}.speaker`, line.speaker);
            }
            return next;
        });

    const localizeHotspot = (hotspot: Hotspot, beatId: string): Hotspot => {
        const base = `beats.${beatId}.hotspots.${hotspot.id}`;
        return {
            ...hotspot,
            label: tr(`${base}.label`, hotspot.label),
            title: tr(`${base}.title`, hotspot.title),
            description: tr(`${base}.description`, hotspot.description),
        };
    };

    const localizeOption = (option: ExperienceChoice, beatId: string): ExperienceChoice => {
        const base = `beats.${beatId}.options.${option.id}`;
        return {
            ...option,
            label: tr(`${base}.label`, option.label),
            description: tr(`${base}.description`, option.description),
        };
    };

    const localizeArmy = (army: ArmyConfig, beatId: string, side: 'player' | 'enemy'): ArmyConfig => ({
        ...army,
        name: tr(`beats.${beatId}.battle.${side}.name`, army.name),
    });

    const localizeTacticalOption = (
        option: TacticalOption,
        beatId: string,
        eventId: string,
    ): TacticalOption => {
        const base = `beats.${beatId}.battle.events.${eventId}.options.${option.id}`;
        return {
            ...option,
            label: tr(`${base}.label`, option.label),
            description: tr(`${base}.description`, option.description),
        };
    };

    const localizeTacticalEvent = (event: TacticalEvent, beatId: string): TacticalEvent => {
        const base = `beats.${beatId}.battle.events.${event.id}`;
        return {
            ...event,
            title: tr(`${base}.title`, event.title),
            prompt: tr(`${base}.prompt`, event.prompt),
            options: event.options.map((o) => localizeTacticalOption(o, beatId, event.id)),
        };
    };

    const localizeBattle = (battle: BattleConfig, beatId: string): BattleConfig => {
        const base = `beats.${beatId}.battle`;
        return {
            ...battle,
            name: tr(`${base}.name`, battle.name),
            objective: tr(`${base}.objective`, battle.objective),
            player: localizeArmy(battle.player, beatId, 'player'),
            enemy: localizeArmy(battle.enemy, beatId, 'enemy'),
            events: battle.events.map((e) => localizeTacticalEvent(e, beatId)),
        };
    };

    const localizeBeat = (beat: Beat): Beat => {
        const base = `beats.${beat.id}`;
        switch (beat.kind) {
            case 'cinematic':
                return {
                    ...beat,
                    narration: localizeNarration(beat.narration, `${base}.narration`),
                };
            case 'explore':
                return {
                    ...beat,
                    prompt: tr(`${base}.prompt`, beat.prompt),
                    hotspots: beat.hotspots.map((h) => localizeHotspot(h, beat.id)),
                };
            case 'choice':
                return {
                    ...beat,
                    title: tr(`${base}.title`, beat.title),
                    prompt: tr(`${base}.prompt`, beat.prompt),
                    options: beat.options.map((o) => localizeOption(o, beat.id)),
                };
            case 'battle':
                return {
                    ...beat,
                    battle: localizeBattle(beat.battle, beat.id),
                };
            case 'ending':
                return { ...beat };
        }
    };

    const localizeEnding = (ending: EndingDef): EndingDef => {
        const base = `endings.${ending.id}`;
        return {
            ...ending,
            title: tr(`${base}.title`, ending.title),
            subtitle: tr(`${base}.subtitle`, ending.subtitle),
            epilogue: localizeNarration(ending.epilogue, `${base}.epilogue`),
        };
    };

    const beats: Record<string, Beat> = {};
    for (const [beatId, beat] of Object.entries(script.beats)) {
        beats[beatId] = localizeBeat(beat);
    }

    return {
        ...script,
        title: tr('title', script.title),
        era: tr('era', script.era),
        beats,
        endings: script.endings.map(localizeEnding),
    };
}
