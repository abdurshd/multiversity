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
    /** Modern era only: helmet style. */
    helmet?: Helmet;
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

export type BattleTheme = 'great-wall' | 'anatolia' | 'steppe' | 'colonial';
/** Weapons era: picks soldier models, siege engines and order names. */
export type BattleEra = 'medieval' | 'musket' | 'modern' | 'ww2';
/** Modern-era soldier headgear (picks the helmet silhouette). */
export type Helmet = 'brodie' | 'adrian' | 'stahlhelm' | 'pickelhaube' | 'kepi' | 'm1';
export type BattleOutcome = 'victory' | 'defeat' | 'pyrrhic';

export interface BattleConfig {
    id: string;
    name: string;
    objective: string;
    theme: BattleTheme;
    era?: BattleEra;
    player: ArmyConfig;
    enemy: ArmyConfig;
    events: TacticalEvent[];
    /** Beat to jump to per outcome. */
    onVictory: string;
    onDefeat: string;
    /** Character who leads the player army (stands behind the lines, name plate shown). */
    commander?: string;
    /** Flags set automatically: `<id>:victory` | `<id>:defeat` | `<id>:pyrrhic`. */
}

// ─── Characters (real historical people as stylized 3D figures) ────────────

/** Silhouette + headwear preset for a hero figure. */
export type CharacterOutfit = 'emir' | 'prince' | 'scholar' | 'general' | 'colonial-general' | 'statesman' | 'king' | 'queen' | 'napoleonic' | 'stovepipe' | 'frock-coat' | 'civil-war-general' | 'pickelhaube' | 'plumed-helmet' | 'homburg' | 'peaked-cap' | 'beret';
export type CharacterPose = 'idle' | 'command' | 'think';

export interface CharacterDef {
    id: string;
    name: string;
    role: string;
    /** Face texture cropped from the chapter portrait (scripts/extract-faces.py). */
    face: string;
    outfit: CharacterOutfit;
    /** Head/hand colour matched to the face crop (public/images/chapters/face-skin-tones.json). */
    skin?: string;
    /** Hair cap colour for bare-headed characters (statesman). */
    hair?: string;
    /** Hat colour for outfits with a felt hat (civil-war-general). */
    hat?: string;
    /** Receding hairline (hair only at the back and sides). */
    balding?: boolean;
    /** Breeches + waistcoat colour for coat-style outfits. */
    breeches?: string;
    robe: string;
    accent: string;
}

/** Where a character stands in a beat. */
export interface CastPlacement {
    id: string;
    position: Vec3;
    /** Rotation around Y in radians (0 = facing +Z). */
    facing?: number;
    pose?: CharacterPose;
}

// ─── Beats (story graph nodes) ─────────────────────────────────────────────

export interface CinematicBeat {
    /** Historical figures standing in the scene. */
    cast?: CastPlacement[];
    kind: 'cinematic';
    id: string;
    shots: CameraShot[];
    narration: NarrationLine[];
    /** Scene environment for this beat. */
    environment: EnvironmentId;
    next: string;
}

export interface ExploreBeat {
    /** Historical figures standing in the scene. */
    cast?: CastPlacement[];
    kind: 'explore';
    id: string;
    environment: EnvironmentId;
    prompt: string;
    hotspots: Hotspot[];
    /** Initial camera for the orbit controls. */
    camera: { position: Vec3; target: Vec3 };
}

export interface ChoiceBeat {
    /** Historical figures standing in the scene. */
    cast?: CastPlacement[];
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
    | 'anatolia'
    | 'philadelphia'
    | 'valley-forge'
    | 'yorktown'
    | 'versailles'
    | 'london'
    | 'philadelphia-winter'
    | 'paris-1789'
    | 'paris-terror'
    | 'varennes'
    | 'valmy'
    | 'marengo'
    | 'springfield'
    | 'washington-1861'
    | 'charleston-harbor'
    | 'antietam'
    | 'gettysburg'
    | 'fords-theatre'
    | 'sarajevo-1914'
    | 'berlin-1914'
    | 'marne-1914'
    | 'western-front'
    | 'compiegne'
    | 'washington-1917'
    | 'london-1940'
    | 'sudeten-1938'
    | 'midway-1942'
    | 'el-alamein'
    | 'southwick-1944'
    | 'normandy-1944'
    | 'seoul-1945'
    | 'busan-1950'
    | 'incheon-1950'
    | 'chosin-1950'
    | 'panmunjom-1953'
    | 'petrograd-1917'
    | 'smolny-1917';

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
    /** Historical figures who appear in the episode, by id. */
    characters?: Record<string, CharacterDef>;
    /** Fallback ending id if nothing matches. */
    defaultEnding: string;
}
