/* Real-time battle simulation: pure logic, rendered by BattleView. */
import { create } from 'zustand';
import type { BattleConfig, BattleModifier, BattleOutcome, BattleSide, TacticalEvent, UnitType } from '../types';

// ─── Unit ──────────────────────────────────────────────────────────────────
export interface Unit {
    side: BattleSide;
    type: UnitType;
    x: number;
    z: number;
    hp: number;
    maxHp: number;
    dmg: number;
    range: number;
    speed: number;
    state: 'advance' | 'fight' | 'dead' | 'rout';
    target: number;
    cooldown: number;
    /** Time since death (for fall + sink animation). */
    deadT: number;
    bobPhase: number;
}

export interface Projectile {
    kind: 'arrow' | 'stone' | 'fire-arrow';
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    alive: boolean;
}

export interface Impact {
    x: number; z: number; t: number; big: boolean;
}

export interface BattleState {
    config: BattleConfig;
    units: Unit[];
    projectiles: Projectile[];
    impacts: Impact[];
    time: number;
    firedEvents: string[];
    playerAttackMult: number;
    playerDefenseMult: number;
    playerArcherMult: number;
    enemyAttackMult: number;
    fireArrows: boolean;
    outcome: BattleOutcome | null;
    routTimer: number;
}

const STATS: Record<UnitType, { hp: number; dmg: number; range: number; speed: number }> = {
    infantry: { hp: 100, dmg: 14, range: 2.2, speed: 4.2 },
    cavalry: { hp: 130, dmg: 20, range: 2.6, speed: 9.5 },
    archer: { hp: 70, dmg: 10, range: 30, speed: 3.6 },
};

const GRAVITY = 22;

let seedCounter = 1;
function rnd() {
    // light deterministic-ish jitter
    seedCounter = (seedCounter * 16807) % 2147483647;
    return seedCounter / 2147483647;
}

function spawnArmy(units: Unit[], side: BattleSide, type: UnitType, count: number, attack: number, defense: number) {
    const sign = side === 'player' ? 1 : -1;
    const baseZ = side === 'player' ? 45 : -42;
    const rowOffset = type === 'archer' ? 16 : type === 'cavalry' ? 8 : 0;
    const perRow = 22;
    const start = units.filter((u) => u.side === side && u.type === type).length;
    for (let i = 0; i < count; i++) {
        const n = start + i;
        const row = Math.floor(n / perRow);
        const col = n % perRow;
        const s = STATS[type];
        units.push({
            side,
            type,
            x: (col - perRow / 2) * 3.2 + (rnd() - 0.5) * 1.6,
            z: sign * (Math.abs(baseZ) + rowOffset + row * 3) + (rnd() - 0.5) * 1.4,
            hp: s.hp * defense,
            maxHp: s.hp * defense,
            dmg: s.dmg * attack,
            range: s.range,
            speed: s.speed * (0.9 + rnd() * 0.2),
            state: 'advance',
            target: -1,
            cooldown: rnd(),
            deadT: 0,
            bobPhase: rnd() * Math.PI * 2,
        });
    }
}

export function createBattle(config: BattleConfig): BattleState {
    const units: Unit[] = [];
    const p = config.player;
    const e = config.enemy;
    spawnArmy(units, 'player', 'infantry', p.infantry, p.attack, p.defense);
    spawnArmy(units, 'player', 'cavalry', p.cavalry, p.attack, p.defense);
    spawnArmy(units, 'player', 'archer', p.archers, p.attack, p.defense);
    spawnArmy(units, 'enemy', 'infantry', e.infantry, e.attack, e.defense);
    spawnArmy(units, 'enemy', 'cavalry', e.cavalry, e.attack, e.defense);
    spawnArmy(units, 'enemy', 'archer', e.archers, e.attack, e.defense);
    return {
        config,
        units,
        projectiles: [],
        impacts: [],
        time: 0,
        firedEvents: [],
        playerAttackMult: 1,
        playerDefenseMult: 1,
        playerArcherMult: 1,
        enemyAttackMult: 1,
        fireArrows: false,
        outcome: null,
        routTimer: 0,
    };
}

export function morale(state: BattleState, side: BattleSide): number {
    let alive = 0;
    let total = 0;
    for (const u of state.units) {
        if (u.side !== side) continue;
        total += 1;
        if (u.state !== 'dead') alive += u.hp / u.maxHp * 0.5 + 0.5;
    }
    return total === 0 ? 0 : alive / total;
}

export function applyModifier(state: BattleState, mod: BattleModifier) {
    const p = state.config.player;
    if (mod.flankCavalry) {
        const sign = rnd() > 0.5 ? 1 : -1;
        for (let i = 0; i < mod.flankCavalry; i++) {
            const s = STATS.cavalry;
            state.units.push({
                side: 'player',
                type: 'cavalry',
                x: sign * (55 + rnd() * 10),
                z: -20 + rnd() * 20,
                hp: s.hp * p.defense,
                maxHp: s.hp * p.defense,
                dmg: s.dmg * p.attack * 1.2,
                range: s.range,
                speed: s.speed,
                state: 'advance',
                target: -1,
                cooldown: rnd(),
                deadT: 0,
                bobPhase: rnd() * Math.PI * 2,
            });
        }
    }
    if (mod.archerDamageMult) {
        state.playerArcherMult *= mod.archerDamageMult;
        state.fireArrows = true;
    }
    if (mod.catapultBarrage) {
        // Lob stones from behind the player line at the enemy mass.
        for (let i = 0; i < mod.catapultBarrage; i++) {
            const tx = (rnd() - 0.5) * 70;
            const tz = -35 - rnd() * 25;
            const x0 = (rnd() - 0.5) * 60;
            const z0 = 60 + rnd() * 12;
            const T = 2.2 + rnd() * 0.8;
            state.projectiles.push({
                kind: 'stone',
                x: x0, y: 2, z: z0,
                vx: (tx - x0) / T,
                vy: (GRAVITY * T) / 2,
                vz: (tz - z0) / T,
                alive: true,
            });
        }
    }
    if (mod.attackMult) state.playerAttackMult *= mod.attackMult;
    if (mod.defenseMult) state.playerDefenseMult *= mod.defenseMult;
    if (mod.enemyAttackMult) state.enemyAttackMult *= mod.enemyAttackMult;
    if (mod.enemyReinforcements) {
        const e = state.config.enemy;
        spawnArmy(state.units, 'enemy', 'infantry', mod.enemyReinforcements, e.attack, e.defense);
    }
    if (mod.moraleShift) {
        // Damage (or heal) random player units to shift morale.
        const sign = mod.moraleShift > 0 ? -1 : 1;
        const n = Math.floor(Math.abs(mod.moraleShift) * 40);
        const players = state.units.filter((u) => u.side === 'player' && u.state !== 'dead');
        for (let i = 0; i < n && i < players.length; i++) {
            const u = players[Math.floor(rnd() * players.length)];
            u.hp = Math.max(1, u.hp + sign * u.maxHp * 0.3);
        }
    }
}

/** Returns a tactical event that should fire now, if any. */
export function dueEvent(state: BattleState): TacticalEvent | null {
    for (const ev of state.config.events) {
        if (state.firedEvents.includes(ev.id)) continue;
        if (ev.atTime !== undefined && state.time >= ev.atTime) return ev;
        if (ev.whenMoraleBelow && morale(state, ev.whenMoraleBelow.side) < ev.whenMoraleBelow.value) return ev;
    }
    return null;
}

export function tick(state: BattleState, dt: number) {
    state.time += dt;
    const units = state.units;

    // retarget at staggered intervals, fight, move
    for (let i = 0; i < units.length; i++) {
        const u = units[i];
        if (u.state === 'dead') {
            u.deadT += dt;
            continue;
        }
        if (u.state === 'rout') {
            const sign = u.side === 'player' ? 1 : -1;
            u.z += sign * u.speed * 1.4 * dt;
            continue;
        }
        u.cooldown -= dt;

        // (re)acquire target
        let t = u.target >= 0 ? units[u.target] : undefined;
        if (!t || t.state === 'dead' || t.state === 'rout') {
            let best = -1;
            let bestD = Infinity;
            // sample stride keeps retargeting cheap
            const stride = units.length > 400 ? 2 : 1;
            for (let j = (i % stride); j < units.length; j += stride) {
                const v = units[j];
                if (v.side === u.side || v.state === 'dead' || v.state === 'rout') continue;
                const d = (v.x - u.x) ** 2 + (v.z - u.z) ** 2;
                if (d < bestD) { bestD = d; best = j; }
            }
            u.target = best;
            t = best >= 0 ? units[best] : undefined;
        }
        if (!t) { u.state = 'advance'; continue; }

        const dx = t.x - u.x;
        const dz = t.z - u.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        if (dist <= u.range) {
            u.state = 'fight';
            if (u.cooldown <= 0) {
                u.cooldown = 0.8 + rnd() * 0.5;
                let dmg = u.dmg;
                if (u.side === 'player') {
                    dmg *= state.playerAttackMult;
                    if (u.type === 'archer') dmg *= state.playerArcherMult;
                } else {
                    dmg *= state.enemyAttackMult;
                }
                const defenseMult = t.side === 'player' ? state.playerDefenseMult : 1;
                if (u.type === 'archer' && dist > 6) {
                    // loose an arrow (visual); damage applies on a short delay via projectile hit
                    const T = Math.max(0.5, dist / 26);
                    state.projectiles.push({
                        kind: u.side === 'player' && state.fireArrows ? 'fire-arrow' : 'arrow',
                        x: u.x, y: 1.6, z: u.z,
                        vx: dx / T,
                        vy: (GRAVITY * T) / 2 - 1.6 / T,
                        vz: dz / T,
                        alive: true,
                    });
                }
                t.hp -= dmg / defenseMult;
                if (t.hp <= 0 && t.state !== 'dead') {
                    t.state = 'dead';
                    t.deadT = 0;
                }
            }
        } else {
            u.state = 'advance';
            u.x += (dx / dist) * u.speed * dt;
            u.z += (dz / dist) * u.speed * dt;
        }
    }

    // projectiles
    for (const pr of state.projectiles) {
        if (!pr.alive) continue;
        pr.vy -= GRAVITY * dt;
        pr.x += pr.vx * dt;
        pr.y += pr.vy * dt;
        pr.z += pr.vz * dt;
        if (pr.y <= 0) {
            pr.alive = false;
            state.impacts.push({ x: pr.x, z: pr.z, t: 0, big: pr.kind === 'stone' });
            if (pr.kind === 'stone') {
                // splash damage to nearby enemies
                for (const u of state.units) {
                    if (u.state === 'dead') continue;
                    const d = (u.x - pr.x) ** 2 + (u.z - pr.z) ** 2;
                    if (d < 36) {
                        u.hp -= 90 * (1 - Math.sqrt(d) / 6);
                        if (u.hp <= 0) { u.state = 'dead'; u.deadT = 0; }
                    }
                }
            }
        }
    }
    if (state.projectiles.length > 400) {
        state.projectiles = state.projectiles.filter((p) => p.alive);
    }
    for (const im of state.impacts) im.t += dt;
    state.impacts = state.impacts.filter((im) => im.t < 1.6);

    // morale + rout + outcome
    const pm = morale(state, 'player');
    const em = morale(state, 'enemy');
    if (!state.outcome) {
        if (em < 0.22 || pm < 0.18) {
            const losing: BattleSide = em < pm ? 'enemy' : 'player';
            for (const u of units) {
                if (u.side === losing && u.state !== 'dead') u.state = 'rout';
            }
            state.routTimer += dt;
            if (state.routTimer > 3.2) {
                if (losing === 'enemy') {
                    state.outcome = pm < 0.45 ? 'pyrrhic' : 'victory';
                } else {
                    state.outcome = 'defeat';
                }
            }
        }
        // hard time limit: decide on points
        if (!state.outcome && state.time > 150) {
            state.outcome = pm >= em ? 'pyrrhic' : 'defeat';
        }
    }
}

// ─── Battle HUD store (UI ↔ sim bridge) ────────────────────────────────────
interface BattleHudState {
    paused: boolean;
    event: TacticalEvent | null;
    playerMorale: number;
    enemyMorale: number;
    intro: boolean;
    setHud: (p: Partial<BattleHudState>) => void;
}

export const useBattleHud = create<BattleHudState>((set) => ({
    paused: false,
    event: null,
    playerMorale: 1,
    enemyMorale: 1,
    intro: true,
    setHud: (p) => set(p),
}));
