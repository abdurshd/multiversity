// ─── Multiversity 3D Experience: core types ────────────────────────────────

export type Vec3 = [number, number, number];

export type ExperiencePhase =
    | 'loading'
    | 'cinematic'
    | 'explore'
    | 'choice'
    | 'battle'
    | 'ending';

export type StatKey = 'chaos' | 'freedom' | 'diplomacy' | 'strength';
export type StatEffects = Partial<Record<StatKey, number>>;

// ─── Camera ────────────────────────────────────────────────────────────────

/** One cinematic shot: camera glides along `path` while aiming along `lookPath`. */
export interface CameraShot {
    /** Camera positions interpolated with a Catmull-Rom spline (>= 2 points). */
    path: Vec3[];
    /** Look-at targets, also splined (1 point = fixed target). */
    lookPath: Vec3[];
    /** Seconds the shot lasts. */
    duration: number;
    fov?: number;
}

// ─── Narration ─────────────────────────────────────────────────────────────

export interface NarrationLine {
    speaker?: string;
    text: string;
    /** Seconds before this line yields to the next (after typing finishes). */
    hold?: number;
}

// ─── Hotspots (free exploration) ───────────────────────────────────────────

export interface Hotspot {
    id: string;
    position: Vec3;
    label: string;
    icon?: string;
    /** Lore card shown when clicked. */
    title: string;
    description: string;
    /** Camera pushes here while the card is open. */
    closeUp?: CameraShot;
    /** Clicking this hotspot advances the story to `next` beat. */
    advancesTo?: string;
    effects?: StatEffects;
}

// ─── Choices ───────────────────────────────────────────────────────────────

export interface ExperienceChoice {
    id: string;
    label: string;
    description: string;
    icon?: string;
    effects?: StatEffects;
    /** Flags appended to the run state (used by ending resolver). */
    flags?: string[];
    next: string;
}

// ─── Battle ────────────────────────────────────────────────────────────────

export type UnitType = 'infantry' | 'cavalry' | 'archer';
export type BattleSide = 'player' | 'enemy';

export interface ArmyConfig {
    side: BattleSide;
    name: string;
    color: string;
    accentColor: string;
    infantry: number;
    cavalry: number;
    archers: number;
    /** Damage multiplier. */
    attack: number;
    /** Damage resistance multiplier (higher = tougher). */
    defense: number;
}

export interface TacticalOption {
    id: string;
    label: string;
    description: string;
    icon?: string;
    effects?: StatEffects;
    flags?: string[];
    /** Battle modifiers applied when chosen. */
    mod: BattleModifier;
}

export interface BattleModifier {
    /** Spawn extra player cavalry on a flank. */
    flankCavalry?: number;
    /** Multiply player archer damage; also ignites fire arrow particles. */
    archerDamageMult?: number;
    /** Trigger a catapult barrage of N stones at enemy mass. */
    catapultBarrage?: number;
    /** Multiply player attack / defense globally. */
    attackMult?: number;
    defenseMult?: number;
    /** Same for the enemy (e.g. their reinforcements arrive). */
    enemyAttackMult?: number;
    enemyReinforcements?: number;
    /** Player morale shock, positive or negative (0-1 scale of damage to morale). */
    moraleShift?: number;
}

export interface TacticalEvent {
    id: string;
    /** Fires once when battle time passes this many seconds… */
    atTime?: number;
    /** …or when the given side's morale dips below this 0-1 fraction. */
    whenMoraleBelow?: { side: BattleSide; value: number };
    title: string;
    prompt: string;
    options: TacticalOption[];
}

export type BattleTheme = 'great-wall' | 'anatolia' | 'steppe';
export type BattleOutcome = 'victory' | 'defeat' | 'pyrrhic';

export interface BattleConfig {
    id: string;
    name: string;
    objective: string;
    theme: BattleTheme;
    player: ArmyConfig;
    enemy: ArmyConfig;
    events: TacticalEvent[];
    /** Beat to jump to per outcome. */
    onVictory: string;
    onDefeat: string;
    /** Flags set automatically: `<id>:victory` | `<id>:defeat` | `<id>:pyrrhic`. */
}

// ─── Beats (story graph nodes) ─────────────────────────────────────────────

export interface CinematicBeat {
    kind: 'cinematic';
    id: string;
    shots: CameraShot[];
    narration: NarrationLine[];
    /** Scene environment for this beat. */
    environment: EnvironmentId;
    next: string;
}

export interface ExploreBeat {
    kind: 'explore';
    id: string;
    environment: EnvironmentId;
    prompt: string;
    hotspots: Hotspot[];
    /** Initial camera for the orbit controls. */
    camera: { position: Vec3; target: Vec3 };
}

export interface ChoiceBeat {
    kind: 'choice';
    id: string;
    environment: EnvironmentId;
    title: string;
    prompt: string;
    camera: { position: Vec3; target: Vec3 };
    options: ExperienceChoice[];
}

export interface BattleBeat {
    kind: 'battle';
    id: string;
    environment: EnvironmentId;
    battle: BattleConfig;
}

export interface EndingBeat {
    kind: 'ending';
    id: string;
}

export type Beat = CinematicBeat | ExploreBeat | ChoiceBeat | BattleBeat | EndingBeat;

// ─── Environments ──────────────────────────────────────────────────────────

/** Which world variant to render. The Samarkand world reads this to swap set pieces. */
export type EnvironmentId =
    | 'samarkand-day'
    | 'samarkand-dusk'
    | 'winter-march'
    | 'great-wall'
    | 'anatolia';

// ─── Endings ───────────────────────────────────────────────────────────────

export interface EndingDef {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    color: string;
    /** Existing chapter timeline this ending diverges into (deep-link target). */
    linkedTimelineId?: string;
    epilogue: NarrationLine[];
    /** All of these flags must be present for the ending to match. */
    requiresFlags?: string[];
    /** None of these flags may be present. */
    forbidsFlags?: string[];
    /** Optional stat gates, e.g. { chaos: ['<', 70] }. */
    statGates?: Partial<Record<StatKey, ['<' | '>=', number]>>;
    /** Higher wins when several endings match. */
    priority: number;
}

// ─── Script ────────────────────────────────────────────────────────────────

export interface ExperienceScript {
    chapterId: string;
    title: string;
    era: string;
    startBeat: string;
    initialStats: Record<StatKey, number>;
    beats: Record<string, Beat>;
    endings: EndingDef[];
    /** Fallback ending id if nothing matches. */
    defaultEnding: string;
}
