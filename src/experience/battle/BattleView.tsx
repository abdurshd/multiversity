/* Renders + drives the real-time battle simulation with instanced meshes. */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { BattleConfig, BattleSide, UnitType } from '../types';
import { useExperience } from '../store';
import {
    type BattleState, createBattle, dueEvent, morale, tick, useBattleHud,
} from './battleSim';
import { Banner } from '../world/parts';
import { buildArcher, buildArrow, buildCavalry, buildInfantry, figureMaterial } from '../world/figures';

/** Live sim handle so the DOM overlay can apply tactical modifiers. */
export const simRef: { state: BattleState | null } = { state: null };

const MAX_EXTRA = 80; // headroom for flank cavalry / reinforcements
const MAX_PROJECTILES = 400;
const MAX_IMPACTS = 60;

const _dummy = new THREE.Object3D();
const _dir = new THREE.Vector3();

export function BattleView({ config }: { config: BattleConfig }) {
    const finishBattle = useExperience((s) => s.finishBattle);
    const addFlags = useExperience((s) => s.addFlags);
    const setHud = useBattleHud((s) => s.setHud);

    const sim = useMemo(() => createBattle(config), [config]);
    const reportedRef = useRef(false);
    const outcomeTimerRef = useRef(0);
    const hudTimerRef = useRef(0);

    useEffect(() => {
        simRef.state = sim;
        reportedRef.current = false;
        outcomeTimerRef.current = 0;
        useBattleHud.setState({
            paused: true,
            intro: true,
            event: null,
            playerMorale: 1,
            enemyMorale: 1,
        });
        return () => {
            if (simRef.state === sim) simRef.state = null;
        };
    }, [sim]);

    // instanced mesh refs, one per side+type, plus projectiles/impacts
    const meshRefs = {
        player: {
            infantry: useRef<THREE.InstancedMesh>(null),
            cavalry: useRef<THREE.InstancedMesh>(null),
            archer: useRef<THREE.InstancedMesh>(null),
        },
        enemy: {
            infantry: useRef<THREE.InstancedMesh>(null),
            cavalry: useRef<THREE.InstancedMesh>(null),
            archer: useRef<THREE.InstancedMesh>(null),
        },
    } as const;
    const arrowsRef = useRef<THREE.InstancedMesh>(null);
    const fireArrowsRef = useRef<THREE.InstancedMesh>(null);
    const stonesRef = useRef<THREE.InstancedMesh>(null);
    const impactsRef = useRef<THREE.InstancedMesh>(null);
    const puffsRef = useRef<THREE.InstancedMesh>(null);

    // detailed merged figure geometries, one per side+type (single draw call each)
    const figures = useMemo(() => {
        const pPal = { cloth: config.player.color, accent: config.player.accentColor };
        const ePal = { cloth: config.enemy.color, accent: config.enemy.accentColor };
        return {
            player: { infantry: buildInfantry(pPal), archer: buildArcher(pPal), cavalry: buildCavalry(pPal, '#6b4a2f') },
            enemy: { infantry: buildInfantry(ePal), archer: buildArcher(ePal), cavalry: buildCavalry(ePal, '#473325') },
            arrow: buildArrow('#d9c8a4'),
            fireArrow: buildArrow('#ff8a2a'),
        };
    }, [config]);
    const figureMat = useMemo(() => figureMaterial(), []);
    const arrowMat = useMemo(() => figureMaterial(), []);
    const fireArrowMat = useMemo(() => {
        const m = figureMaterial();
        m.emissive = new THREE.Color('#ff6a00');
        m.emissiveIntensity = 1.6;
        return m;
    }, []);

    const capacity = useMemo(() => {
        const cap = (side: BattleSide, type: UnitType) =>
            sim.units.filter((u) => u.side === side && u.type === type).length + MAX_EXTRA;
        return {
            player: { infantry: cap('player', 'infantry'), cavalry: cap('player', 'cavalry'), archer: cap('player', 'archer') },
            enemy: { infantry: cap('enemy', 'infantry'), cavalry: cap('enemy', 'cavalry'), archer: cap('enemy', 'archer') },
        };
    }, [sim]);

    useFrame(({ clock }, rawDelta) => {
        const hud = useBattleHud.getState();
        const delta = Math.min(rawDelta, 0.05);

        if (!hud.paused && !hud.intro) {
            tick(sim, delta);

            // tactical events
            const ev = dueEvent(sim);
            if (ev && !sim.outcome) {
                sim.firedEvents.push(ev.id);
                setHud({ paused: true, event: ev });
            }

            // outcome
            if (sim.outcome && !reportedRef.current) {
                outcomeTimerRef.current += delta;
                if (outcomeTimerRef.current > 3) {
                    reportedRef.current = true;
                    addFlags([
                        `${config.id}:${sim.outcome}`,
                        ...(sim.outcome !== 'defeat' ? [`${config.id}:won`] : []),
                    ]);
                    finishBattle(
                        sim.outcome,
                        sim.outcome === 'defeat' ? config.onDefeat : config.onVictory
                    );
                }
            }

            // throttle HUD updates
            hudTimerRef.current += delta;
            if (hudTimerRef.current > 0.15) {
                hudTimerRef.current = 0;
                setHud({
                    playerMorale: morale(sim, 'player'),
                    enemyMorale: morale(sim, 'enemy'),
                });
            }
        }

        // ── write instance matrices ──
        const t = clock.elapsedTime;
        const counters: Record<BattleSide, Record<UnitType, number>> = {
            player: { infantry: 0, cavalry: 0, archer: 0 },
            enemy: { infantry: 0, cavalry: 0, archer: 0 },
        };

        for (const u of sim.units) {
            const mesh = meshRefs[u.side][u.type].current;
            if (!mesh) continue;
            const i = counters[u.side][u.type]++;
            if (i >= capacity[u.side][u.type]) continue;

            const dying = u.state === 'dead';
            const fall = dying ? Math.min(1, u.deadT * 2.2) : 0;
            const sink = dying ? Math.max(0, (u.deadT - 4) * 0.25) : 0;
            // figures stand with feet at y=0; cavalry gallops with a faster bob
            const bobSpeed = u.type === 'cavalry' ? 9 : 6;
            const bob = dying ? 0 : Math.abs(Math.sin(t * bobSpeed + u.bobPhase)) * (u.state === 'advance' ? 0.14 : 0.05);
            const sway = dying ? 0 : Math.sin(t * bobSpeed + u.bobPhase) * 0.045;
            const lunge = u.state === 'fight' ? Math.sin(t * 8 + u.bobPhase) * 0.2 : 0;

            _dummy.position.set(u.x, bob - sink * 2 - fall * 0.15, u.z);
            // face the target / travel direction
            const tgt = u.target >= 0 ? sim.units[u.target] : null;
            const face = tgt ? Math.atan2(tgt.x - u.x, tgt.z - u.z) : u.side === 'player' ? Math.PI : 0;
            _dummy.rotation.set(fall * (Math.PI / 2), face, sway);
            _dummy.position.x += Math.sin(face) * lunge;
            _dummy.position.z += Math.cos(face) * lunge;
            _dummy.scale.setScalar(Math.max(0.001, 1 - sink * 1.5));
            _dummy.updateMatrix();
            mesh.setMatrixAt(i, _dummy.matrix);
        }

        (['player', 'enemy'] as const).forEach((side) => {
            (['infantry', 'cavalry', 'archer'] as const).forEach((type) => {
                const mesh = meshRefs[side][type].current;
                if (!mesh) return;
                mesh.count = Math.min(counters[side][type], capacity[side][type]);
                mesh.instanceMatrix.needsUpdate = true;
            });
        });

        // projectiles
        let arrowI = 0, fireI = 0, stoneI = 0;
        for (const pr of sim.projectiles) {
            if (!pr.alive) continue;
            if (pr.kind === 'stone') {
                if (!stonesRef.current || stoneI >= MAX_PROJECTILES) continue;
                _dummy.position.set(pr.x, pr.y, pr.z);
                _dummy.rotation.set(t * 3, t * 2, 0);
                _dummy.scale.setScalar(1);
                _dummy.updateMatrix();
                stonesRef.current.setMatrixAt(stoneI++, _dummy.matrix);
            } else {
                const mesh = pr.kind === 'fire-arrow' ? fireArrowsRef.current : arrowsRef.current;
                const idx = pr.kind === 'fire-arrow' ? fireI : arrowI;
                if (!mesh || idx >= MAX_PROJECTILES) continue;
                _dummy.position.set(pr.x, pr.y, pr.z);
                _dir.set(pr.vx, pr.vy, pr.vz).normalize();
                _dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), _dir);
                _dummy.scale.setScalar(1);
                _dummy.updateMatrix();
                mesh.setMatrixAt(idx, _dummy.matrix);
                if (pr.kind === 'fire-arrow') fireI++; else arrowI++;
            }
        }
        if (arrowsRef.current) { arrowsRef.current.count = arrowI; arrowsRef.current.instanceMatrix.needsUpdate = true; }
        if (fireArrowsRef.current) { fireArrowsRef.current.count = fireI; fireArrowsRef.current.instanceMatrix.needsUpdate = true; }
        if (stonesRef.current) { stonesRef.current.count = stoneI; stonesRef.current.instanceMatrix.needsUpdate = true; }

        // impacts: expanding dust rings + billowing puffs on heavy hits
        if (impactsRef.current && puffsRef.current) {
            let n = 0;
            let np = 0;
            for (const im of sim.impacts) {
                if (n >= MAX_IMPACTS) break;
                const grow = (im.big ? 7 : 2.4) * Math.min(1, im.t * 2);
                _dummy.position.set(im.x, 0.15, im.z);
                _dummy.rotation.set(-Math.PI / 2, 0, 0);
                _dummy.scale.setScalar(Math.max(0.001, grow));
                _dummy.updateMatrix();
                impactsRef.current.setMatrixAt(n++, _dummy.matrix);
                if (im.big && np < MAX_IMPACTS) {
                    // three offset dust balls rising and tumbling
                    for (let k = 0; k < 3 && np < MAX_IMPACTS; k++) {
                        const a = k * 2.1 + im.x;
                        _dummy.position.set(
                            im.x + Math.cos(a) * (0.6 + im.t * 1.6),
                            0.4 + im.t * (2.0 + k * 0.5),
                            im.z + Math.sin(a) * (0.6 + im.t * 1.6)
                        );
                        _dummy.rotation.set(im.t * 2 + k, a, im.t);
                        _dummy.scale.setScalar(Math.max(0.001, (0.8 + k * 0.3) * Math.min(1, im.t * 3) * (1.6 - im.t * 0.8)));
                        _dummy.updateMatrix();
                        puffsRef.current.setMatrixAt(np++, _dummy.matrix);
                    }
                }
            }
            impactsRef.current.count = n;
            impactsRef.current.instanceMatrix.needsUpdate = true;
            puffsRef.current.count = np;
            puffsRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    const p = config.player;
    const e = config.enemy;

    return (
        <group>
            {/* ── armies: detailed merged figures, one draw call per side+type ── */}
            <instancedMesh ref={meshRefs.player.infantry} args={[figures.player.infantry, figureMat, capacity.player.infantry]} frustumCulled={false} castShadow />
            <instancedMesh ref={meshRefs.player.archer} args={[figures.player.archer, figureMat, capacity.player.archer]} frustumCulled={false} castShadow />
            <instancedMesh ref={meshRefs.player.cavalry} args={[figures.player.cavalry, figureMat, capacity.player.cavalry]} frustumCulled={false} castShadow />
            <instancedMesh ref={meshRefs.enemy.infantry} args={[figures.enemy.infantry, figureMat, capacity.enemy.infantry]} frustumCulled={false} castShadow />
            <instancedMesh ref={meshRefs.enemy.archer} args={[figures.enemy.archer, figureMat, capacity.enemy.archer]} frustumCulled={false} castShadow />
            <instancedMesh ref={meshRefs.enemy.cavalry} args={[figures.enemy.cavalry, figureMat, capacity.enemy.cavalry]} frustumCulled={false} castShadow />

            {/* ── projectiles ── */}
            <instancedMesh ref={arrowsRef} args={[figures.arrow, arrowMat, MAX_PROJECTILES]} frustumCulled={false} />
            <instancedMesh ref={fireArrowsRef} args={[figures.fireArrow, fireArrowMat, MAX_PROJECTILES]} frustumCulled={false} />
            <instancedMesh ref={stonesRef} args={[undefined, undefined, MAX_PROJECTILES]} frustumCulled={false}>
                <dodecahedronGeometry args={[0.9, 0]} />
                <meshStandardMaterial color="#6e675c" roughness={1} flatShading />
            </instancedMesh>
            <instancedMesh ref={impactsRef} args={[undefined, undefined, MAX_IMPACTS]} frustumCulled={false}>
                <ringGeometry args={[0.5, 1, 16]} />
                <meshBasicMaterial color="#cbb795" transparent opacity={0.55} side={THREE.DoubleSide} depthWrite={false} />
            </instancedMesh>
            <instancedMesh ref={puffsRef} args={[undefined, undefined, MAX_IMPACTS]} frustumCulled={false}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial color="#b8a684" transparent opacity={0.5} flatShading depthWrite={false} />
            </instancedMesh>

            {/* siege engines behind the player line */}
            <Catapult position={[-34, 0, 62]} />
            <Catapult position={[34, 0, 62]} />
            <Banner position={[-40, 0, 58]} color={p.color} height={8} />
            <Banner position={[40, 0, 58]} color={p.color} height={8} />
            <Banner position={[0, 0, -70]} color={e.color} height={8} />
        </group>
    );
}

function Catapult({ position }: { position: [number, number, number] }) {
    const armRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        // idle creak + slow re-arm cycle
        const t = clock.elapsedTime % 6;
        const angle = t < 0.3 ? -1.0 + t * 4 : t < 3 ? 0.2 - (t - 0.3) * 0.45 : -1.0;
        armRef.current.rotation.x = Math.max(-1.05, Math.min(0.25, angle));
    });
    return (
        <group position={position}>
            <mesh position={[0, 0.6, 0]}>
                <boxGeometry args={[3.4, 1.2, 5]} />
                <meshStandardMaterial color="#7a5a3a" roughness={1} />
            </mesh>
            {[-1.4, 1.4].map((x) => (
                <mesh key={x} position={[x, 1.8, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.3, 2.4, 0.3]} />
                    <meshStandardMaterial color="#5e4426" roughness={1} />
                </mesh>
            ))}
            <group ref={armRef} position={[0, 2.6, 0.6]}>
                <mesh position={[0, 0, -2.2]} rotation={[Math.PI / 2, 0, 0]}>
                    <boxGeometry args={[0.35, 4.6, 0.35]} />
                    <meshStandardMaterial color="#8a6a44" roughness={1} />
                </mesh>
                <mesh position={[0, 0.3, -4.4]}>
                    <sphereGeometry args={[0.55, 8, 6]} />
                    <meshStandardMaterial color="#6e675c" roughness={1} />
                </mesh>
            </group>
            {/* wheels */}
            {[[-1.6, 1.9], [1.6, 1.9], [-1.6, -1.9], [1.6, -1.9]].map(([x, z], i) => (
                <mesh key={i} position={[x, 0.55, z]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.55, 0.55, 0.3, 10]} />
                    <meshStandardMaterial color="#4e3a24" roughness={1} />
                </mesh>
            ))}
        </group>
    );
}
