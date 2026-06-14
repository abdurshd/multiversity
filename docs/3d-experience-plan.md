# Multiversity — Cinematic 3D Experience Plan

## Vision

Turn timeline simulations from "text + abstract 3D map" into a **playable, cinematic 3D episode** — a hybrid of an interactive film and a light strategy game. Pilot chapter: **Timur's Legacy**.

The player:

1. Watches a cinematic fly-through of a detailed, stylized **Samarkand (1404)** — Registan-style madrasahs, the great mosque, ribbed mausoleum dome, city walls, bazaar, walking citizens, banners in the wind.
2. **Freely explores** the city between story beats (orbit/zoom camera, clickable glowing hotspots that reveal lore and advance the story).
3. Makes **strategic choices** at decision points (march on China / consolidate the empire / turn west on Europe), each shifting the four stats (Chaos, Freedom, Diplomacy, Strength).
4. If a path leads to war, a **real-time battle** plays out: hundreds of instanced soldiers, cavalry, archers, catapults with arcing projectiles, dust and fire. The battle **pauses at key moments** for tactical choices (breach the wall with cannon vs. tunnels, commit cavalry to the flank, fire arrows…) which visibly change how the battle unfolds.
5. Reaches **one of four endings**, three of which map to the chapter's existing alternative timelines:
   - `immortal-emir` — win the China campaign
   - `unified-succession` — consolidate and secure the succession
   - `western-campaign` — win the Gates of Europe campaign
   - `historical-fragmentation` — lose a campaign / let chaos win: history as it really happened
6. The ending screen links straight into the existing `TimelineExplorer` for that timeline — connecting the game to the multiverse content already built.

## Interaction model (per answers)

- **Camera:** cinematic spline shots between beats (with letterbox bars + skip), free orbit exploration between them, battle camera during combat.
- **Battles:** real-time simulation the player influences via pause-and-choose tactical moments — not direct RTS unit control.
- **Visuals:** 100% procedural stylized geometry (no external assets) — consistent with the existing codebase, instant loading, fully controllable.
- **Scope:** complete experience for Timur; engine is chapter-agnostic (script-driven) so other chapters can be added by authoring a script + world scene.

## Architecture

```
src/experience/
├── types.ts                 # Beat, Shot, Choice, Hotspot, BattleConfig, Ending, Script
├── store.ts                 # zustand store: phase machine, stats, flags, battle results
├── director/
│   └── CameraDirector.tsx   # spline cinematics ⇄ orbit explore ⇄ battle cam
├── world/
│   ├── parts.tsx            # Dome, Minaret, IwanPortal, Madrasah, Walls, Banner,
│   │                        # Tree, Citizen crowd, Torch fire, Dust — reusable pieces
│   └── SamarkandScene.tsx   # composed city + campaign set pieces (Great Wall, Ankara)
├── battle/
│   ├── battleSim.ts         # pure game loop: units, combat, morale, tactical events
│   └── BattleView.tsx       # InstancedMesh renderer, projectiles, impacts, smoke
├── ui/
│   └── Overlay.tsx          # letterbox, typewriter narration, choice cards,
│                            # battle HUD (morale bars, tactical modal), ending screen
└── scripts/
    └── timur.ts             # the authored Timur episode (beats, battles, endings)

src/pages/Experience3D.tsx   # full-screen page, /experience/:chapterId
```

### Phase machine (zustand)

`loading → cinematic → explore → choice → cinematic → battle → battle-choice → … → ending`

Each **beat** declares its kind and what comes next; choices and battle outcomes set **flags**; the ending resolver matches flags + stats to one of the four endings.

### Battle simulation

- ~400–600 units (infantry / cavalry / archers per side) as `InstancedMesh` — one draw call per unit type.
- Tick: advance toward nearest enemy → engage → exchange damage (type-vs-type multipliers) → deaths animate (fall + sink). Morale = weighted survivors; rout below threshold.
- **Tactical events** trigger at time/morale thresholds: simulation pauses, camera pushes in, player picks an option; modifiers apply (spawn flanking cavalry, buff archers with fire arrows, catapult barrage with arcing stones and impact dust).
- Outcome (`victory` / `defeat` / pyrrhic) recorded into flags → drives endings and stats.

### Integration with existing app

- Route `/experience/:chapterId` added to `App.tsx`.
- "⚔ Launch 3D Experience" entry button on `ChapterDetail` and `SimulationHub` for chapters that have a script (`hasExperience()`).
- Endings deep-link to `/timeline/timur-legacy/<timelineId>` (existing TimelineExplorer).
- Stats are the same four used by the existing campaign engine.

## Timur episode outline

| Act | Beat | Type |
|---|---|---|
| I | Aerial dawn over Samarkand, narration sets 1404 | cinematic |
| I | Explore the city: Registan court, Bibi-Khanym mosque, war council | explore (hotspots) |
| I | **The Council of Samarkand** — East / Consolidate / West | choice |
| II-East | Winter march to Otrar; press on vs. wait out winter | cinematic + choice |
| II-East | **Battle of the Great Wall** (catapults vs. tunnels, cavalry flank, fire arrows) | battle |
| II-Cons. | Name the heir (Shah Rukh / Pir Muhammad / council) ; rebel khan crisis (negotiate vs. crush) | choices (+ optional battle) |
| II-West | March through Anatolia; **Gates of Europe** battle vs. Ottoman–European coalition | cinematic + battle |
| III | Epilogue cinematic + ending resolution | ending |

## Follow-ups (not in this round)

- i18n extraction of script text (uz translations), sound design, more chapters (each = 1 script + 1 world scene), mobile touch tuning, quality presets.
