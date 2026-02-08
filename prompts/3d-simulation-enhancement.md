# Multiversity — 3D Historical Simulation Enhancement Prompt

## Project Context

Multiversity is a React + TypeScript educational web app that visualizes alternate history across 14 chapters (1370 AD → post-human future). Users walk through interactive scenarios, make choices that shift 4 stats (freedom, chaos, diplomacy, strength), and watch alternate timelines branch. The app uses Vite, Tailwind CSS, Framer Motion, React Router, zustand, i18next, and D3.

### What Already Exists

**3D infrastructure (already installed in package.json):**
- `three` (v0.181), `@react-three/fiber` (v9.4), `@react-three/drei` (v10.7), `@react-three/postprocessing` (v3.0), `@react-three/rapier` (v2.2)

**Two working 3D simulations:**
1. **U.S. Independence** (`src/simulation/usIndependence3d.ts` + `src/components/simulation/USIndependence3DView.tsx`): 7 strategic nodes on a flat East-Coast map, 6 frontline arcs, 6 moving unit markers, 4 branch forecast rails, an event pulse, and a Yorktown micro-battle sub-scene with physics-driven artillery trajectories, formation blocks, morale/cohesion, and range rings. Replay scrubber with play/pause/live controls.
2. **French Revolution** (`src/simulation/frenchRevolution3d.ts` + `src/components/simulation/FrenchRevolution3DView.tsx`): Same structural pattern — 7 nodes (Paris, Versailles, Bastille, Lyon, Vendee, Toulon, Valmy), 6 fronts, 5 units, 4 branches. No micro-battle sub-scene yet.

**Integration path:** `SimulationHub.tsx` → `ScenarioRunner.tsx` conditionally renders the 3D view when `chapterId` matches `us-independence` or `french-revolution`, wiring `buildUSIndependenceCampaignState()` or `buildFrenchRevolutionCampaignState()` into the view.

**Remaining 12 chapters have no 3D simulation at all** — they fall back to the animated emoji visual.

### Simulation Engine Pattern

Each simulation engine is a **pure, deterministic TS function** that takes `{ scenario, stats, history }` and outputs a typed campaign state object containing: nodes with control scores, frontlines with tension values, units with routes/speeds, branch forecasts with softmax-normalized probabilities, event pulses, and optional micro-battle states. Choice impacts are defined as lookup tables keyed by choice IDs with node shifts, front shifts, branch biases, and risk deltas.

---

## Task: Build Personalized 3D Simulations for Every Historical Chapter

### Goal

Every one of the 14 chapters must have its own **dedicated, historically-accurate 3D WebGL simulation scene** rendered via React Three Fiber inside the existing `ScenarioRunner` component. Each simulation must:

1. Be **geographically and thematically unique** — not a reskinned copy. The terrain, map shape, node layout, unit factions, color palette, and atmospheric effects should reflect the specific time period and region.
2. Depict **the alternate timeline branches** visually — as the user's choices shift branch probabilities, the 3D scene itself must change (troop positions, territory control colors, frontline tension, atmospheric mood, lighting, fog density, particle effects).
3. Include at least one **micro-battle or micro-event sub-scene** (like the existing Yorktown artillery simulation) that activates at a key scenario moment and shows a zoomed-in, physics-influenced tactical visualization unique to that chapter.
4. Support the **replay/scrubber system** — every decision creates a snapshot; the user can scrub backward and forward through the simulation timeline, watching the 3D scene update per-frame.
5. Be **educational** — overlay HTML labels, tooltips, and info panels (via `@react-three/drei` `<Html>`) showing historical context, place names, dates, and what-if explanations.

---

### Per-Chapter 3D Simulation Specifications

Below is what each chapter's 3D simulation should contain. For each, define:
- **Terrain/map geometry** and visual style
- **Strategic nodes** (cities, bases, key locations) with positions
- **Frontlines/pressure arcs** between nodes
- **Unit factions** with colors and movement routes
- **Branch timelines** with titles, colors, and forecast logic
- **Micro-battle/micro-event** sub-scene
- **Atmospheric effects** (lighting, fog, particles, post-processing)

---

#### Chapter 1: The Iron Emir — Timur's Legacy (1370–1450)
- **Map:** Central Asian steppe — vast flat terrain with Silk Road trade paths, desert patches, and mountain ridges (Tien Shan, Hindu Kush represented as elevated mesh strips).
- **Nodes:** Samarkand (capital, center), Herat, Tabriz, Delhi, Damascus, Ankara, Beijing (far-reach target).
- **Frontlines:** Silk Road corridors between nodes. Caravan supply lines glow brighter when diplomacy is high.
- **Factions:** Timurid (gold/amber), Ottoman (red), Mamluk (green), Ming Dynasty (jade), local warlords (gray).
- **Branches:** "Immortal Emir" (Timur lives, gold), "Unified Succession" (stable empire, blue), "Western Campaign" (Europe invasion, crimson).
- **Micro-scene:** Siege of Ankara (1402) — show Timurid war elephants charging Ottoman lines, animated arrow volleys arcing with physics, crumbling fortification walls. Morale meters for each side.
- **Atmosphere:** Warm golden-hour lighting, dust particle system rising from terrain, heat shimmer post-processing effect.

#### Chapter 2: U.S. Independence (1776) — ALREADY EXISTS
- **Current state:** Fully implemented with East Coast map, 7 nodes, Yorktown micro-battle, replay controls.
- **Enhancements needed:**
  - Add naval battle micro-scene for the Chesapeake Bay engagement (French fleet vs British fleet) with ship meshes, cannon fire arcs, and wind vectors.
  - Add a "Declaration Signing" ceremonial sub-scene that activates during the `continental-congress` scenario showing Independence Hall interior with delegates.
  - Add weather effects: snow at Valley Forge scenarios, fog during retreat scenarios.
  - Add terrain height variation — Appalachian ridgeline as elevated mesh.

#### Chapter 3: French Revolution (1789) — PARTIALLY EXISTS
- **Current state:** 7 nodes, 6 fronts, 5 units, 4 branches. No micro-scene.
- **Enhancements needed:**
  - Add Bastille Storming micro-scene: crowd meshes surging against fortress walls, cannon smoke, drawbridge mechanics. Morale/crowd-size meters.
  - Add guillotine square sub-scene for Reign of Terror scenarios: crowd density visualization, tension gauge.
  - Add Seine River as animated water line through Paris region.
  - Add post-processing: warm candlelight glow for early scenes, blood-red bloom for Terror scenes.

#### Chapter 4: Russian Empire & Central Asia (1721–1917)
- **Map:** Vast Eurasian landmass — snow-covered northern terrain, steppe center, Caucasus mountains, warm southern edge toward India.
- **Nodes:** St. Petersburg, Moscow, Omsk, Tashkent, Kabul, Tbilisi, Vladivostok.
- **Frontlines:** Trans-Siberian corridor, Caucasus pressure line, Central Asian expansion axis, Afghan frontier.
- **Factions:** Imperial Russian (dark blue), Central Asian Khanates (turquoise), British Empire (red — Great Game), Ottoman (orange), Persian (purple).
- **Branches:** "Asian Pivot" (cyan), "Constitutional Empire" (emerald), "Great Game Victory" (amber).
- **Micro-scene:** Siege of Geok-Tepe (1881) — Russian artillery bombarding Turkmen fortress, trench approach lines, breach dynamics.
- **Atmosphere:** Cold blue lighting in the north, warm amber in the south. Snowfall particle system in northern scenarios. Aurora borealis shimmer effect near St. Petersburg.

#### Chapter 5: Life of Abraham Lincoln (1809–1865)
- **Map:** Continental U.S. split into Union (blue terrain) and Confederacy (gray terrain) with the Mason-Dixon line as a glowing boundary.
- **Nodes:** Washington D.C., Richmond, Gettysburg, Vicksburg, Atlanta, Fort Sumter, Appomattox.
- **Frontlines:** Eastern Theater, Western Theater, Naval Blockade (coastal arc), Mississippi River campaign line.
- **Factions:** Union (blue), Confederate (gray/butternut), Border States (amber), freed militia (teal).
- **Branches:** "Lincoln Survives" (blue), "Two Nations" (split red/blue), "Peaceful Abolition" (green).
- **Micro-scene:** Battle of Gettysburg — Pickett's Charge visualization with infantry formation blocks advancing across open field under artillery barrage. Casualty pressure gauge, morale collapse trigger.
- **Atmosphere:** Smoke-heavy battlefield haze, cannon flash lighting, dramatic cloud shadows moving across terrain.

#### Chapter 6: Life of Lenin (1870–1924)
- **Map:** Western Russia focused — showing Petrograd, Moscow, and the industrial heartland. Factory smokestacks as 3D props.
- **Nodes:** Petrograd (St. Petersburg), Moscow, Kiev, Omsk (White Army HQ), Kronstadt, Baku.
- **Frontlines:** White Army encirclement lines, foreign intervention corridors (British from north, Japanese from east), internal Bolshevik consolidation lines.
- **Factions:** Bolshevik (red), Menshevik (pink), White Army (white/silver), Foreign Intervention (multi — green), anarchist (black).
- **Branches:** "Menshevik Path" (rose), "White Victory" (silver), "Lenin Lives" (deep red).
- **Micro-scene:** Storming of the Winter Palace — animated crowd rush, guards positioning, Red Guard approach vectors, signal flare from Aurora cruiser.
- **Atmosphere:** Industrial gray fog, red banner particle effects, factory smoke columns, dramatic spotlight on key moments.

#### Chapter 7: Life of Hitler (1889–1945)
- **Map:** Central Europe — Germany highlighted with political boundary overlays showing Weimar Republic fragmentation.
- **Nodes:** Berlin, Munich (Beer Hall), Vienna (art school), Nuremberg, Berchtesgaden, Wolf's Lair (Rastenburg).
- **Frontlines:** Political influence corridors: SA street violence zones, political rally routes, opposition resistance network lines.
- **Factions:** Nazi Party (black/red), Weimar Democrats (gold), Communist KPD (deep red), Military Conservatives (field gray), Resistance (white).
- **Branches:** "The Artist" (warm gold — peaceful), "Beer Hall Success" (dark red — early chaos), "Assassination Success" (silver — Valkyrie).
- **Micro-scene:** Beer Hall Putsch — street-level view of the Feldherrnhalle march, police barricade, gunfire exchange, crowd scatter dynamics.
- **Atmosphere:** Dark moody lighting, film-noir style shadows, rain/wet street reflections, oppressive low fog ceiling.

#### Chapter 8: World War II (1939–1945)
- **Map:** Full globe projection or Europe-Pacific dual theater. Continental terrain with national borders.
- **Nodes:** London, Berlin, Moscow, Tokyo, Washington, Normandy, Stalingrad, Midway, Hiroshima.
- **Frontlines:** Western Front, Eastern Front, Pacific Theater, Atlantic U-boat lanes, North Africa campaign line.
- **Factions:** Allies-West (blue), Allies-Soviet (deep red), Axis-Germany (black), Axis-Japan (rising sun red), Resistance (green).
- **Branches:** "Axis Victory" (black/red), "Soviet Europe" (deep crimson), "Negotiated Peace" (gray).
- **Micro-scene:** D-Day landing — beach assault visualization with landing craft approaching, defensive bunker fire arcs, casualty waves, beach-head establishment progress meter.
- **Atmosphere:** Overcast gray skies, artillery flash lighting, ocean wave particles, smoke curtains.

#### Chapter 9: Cold War (1947–1991)
- **Map:** Global bipolar projection — Western bloc (blue hemisphere glow) vs Eastern bloc (red hemisphere glow) with contested Third World zones in between.
- **Nodes:** Washington, Moscow, Havana, Berlin (Wall), Saigon, Kabul, Cape Canaveral, Baikonur.
- **Frontlines:** Iron Curtain line across Europe, nuclear deterrence arcs (ICBM trajectories as dashed parabolas), proxy war hotspots pulsing.
- **Factions:** NATO/Western (blue), Warsaw Pact (red), Non-Aligned (green), China (orange).
- **Branches:** "Hot War" (nuclear orange/white), "Red World" (deep red), "Early Peace" (emerald).
- **Micro-scene:** Cuban Missile Crisis — Caribbean map zoom with Soviet ship convoy approaching blockade line, U.S. Navy destroyer positions, missile site readiness gauges on Cuba, DEFCON level indicator rising.
- **Atmosphere:** Tense sterile lighting, radar sweep overlay effect, Geiger counter particle flickers near nuclear sites, cold blue-green CRT monitor aesthetic.

#### Chapter 10: Dissolution of USSR (1991)
- **Map:** Soviet Union territory with republic boundaries overlaid, showing fragmentation process.
- **Nodes:** Moscow (Kremlin), Kyiv, Minsk, Alma-Ata, Tbilisi, Vilnius, Baku.
- **Frontlines:** Secession pressure lines radiating outward from Moscow, economic collapse gradient (color desaturation spreading), military allegiance contested corridors.
- **Factions:** Soviet Hardliners (red), Reform Communists (pink), Democratic Movements (blue), Nationalist Separatists (per-republic colors), Military (olive).
- **Branches:** "Union Preserved" (red/gold), "Chinese Model" (red/yellow), "Civil War" (fragmented multi-color).
- **Micro-scene:** August Coup — Moscow White House defense, tank columns in streets, crowd barricades, Yeltsin standing on tank moment, radio broadcast influence radius visualization.
- **Atmosphere:** Gray overcast Soviet aesthetic, concrete textures, flag particles (Soviet flags being replaced by national flags as republics break away), radio static audio visualization.

#### Chapter 11: COVID-19 Pandemic (2019–2023)
- **Map:** Global epidemiological map — continents with infection spread visualization (heat map gradient spreading outward from Wuhan).
- **Nodes:** Wuhan, Milan, New York, Mumbai, São Paulo, London, Melbourne.
- **Frontlines:** Infection corridors along airline routes (arcing flight paths), border closure lines appearing, vaccine distribution routes (green supply lines).
- **Factions:** WHO/Global Health (blue), National Governments (varied), Anti-lockdown movements (orange), Vaccine alliances (green), Virus mutations (red morphing particles).
- **Branches:** "Total Containment" (green), "Black Death Variant" (dark red/black), "Permanent Pandemic" (gray/amber).
- **Micro-scene:** Hospital ICU crisis — beds filling up visualization, ventilator supply count, healthcare worker fatigue meter, case curve graph rendered as 3D wall chart in the scene.
- **Atmosphere:** Clinical white/blue sterile lighting, virus particle system floating through scene, mask overlays on node markers, quarantine zone pulsing red boundaries.

#### Chapter 12: AI Revolution (2020s–Future)
- **Map:** Abstract global network topology — glowing circuit-board-style terrain with data center nodes, neural network connection lines replacing traditional geography.
- **Nodes:** Silicon Valley, Beijing AI Lab, London DeepMind, Brussels (EU Regulation), Singapore, unnamed underground data center.
- **Frontlines:** Data flow bandwidth lines, AI capability frontiers (expanding wavefronts), regulatory containment barriers, corporate competition corridors.
- **Factions:** Tech Giants (neon cyan), State AI Programs (varied national colors), Open Source Movement (green), AI Safety Orgs (amber), Autonomous AI (self-evolving purple).
- **Branches:** "Symbiosis/Utopia" (golden white), "Paperclip Maximizer" (cold silver/void), "Butlerian Jihad" (warm organic brown), "Silicon Curtain" (split neon red/blue), "Digital Ascension" (ethereal violet).
- **Micro-scene:** AGI Alignment Test — visualization of an AI system's decision tree expanding in real-time, with safety constraints as containment shells around the expanding node graph, showing breakout potential vs alignment holding.
- **Atmosphere:** Cyberpunk neon aesthetic, data stream particle rain, holographic UI overlays, pulsing neural network background texture, glitch effects when chaos is high.

#### Chapter 13: The Fate of Earth (Post-Human/Far Future)
- **Map:** Solar system scale — Earth, Moon, Mars, asteroid belt, with orbital paths and Dyson Swarm ring segments.
- **Nodes:** Earth (origin), Luna Base, Mars Colony, Asteroid Mining Hub, Jupiter Station, Dyson Swarm Anchor.
- **Frontlines:** Interplanetary supply lanes, communication delay corridors, resource extraction routes, expansion wavefronts.
- **Factions:** Earth Conservatives (blue/green), Mars Independents (rust red), Transhumanists (chrome silver), Digital Consciousness (ethereal purple), Nature Preservationists (emerald).
- **Branches:** "Star Trek Future" (optimistic blue/gold), "Silent Earth" (muted brown/gray), "Dyson Swarm" (brilliant solar gold).
- **Micro-scene:** Dyson Swarm Construction — animated orbital mechanics showing solar collectors being deployed, energy beam routing, Earth disassembly progress meter (if that branch is dominant).
- **Atmosphere:** Deep space black with star field, solar lighting, lens flare from sun, nebula particle clouds, time-lapse orbital motion.

---

### Technical Implementation Plan

#### Phase 1: Shared 3D Infrastructure (Do First)
1. **Create a generic simulation engine factory** (`src/simulation/createCampaignEngine.ts`) that takes a chapter config (nodes, fronts, units, branch definitions, choice impacts, micro-scene triggers) and returns a typed `build*CampaignState()` function. Refactor existing U.S. and French engines to use this factory to prove the pattern.
2. **Create a generic 3D view component** (`src/components/simulation/GenericCampaign3DView.tsx`) that renders any campaign state — terrain, nodes, fronts, units, branches, pulse, and optional micro-scene slot. Extract the shared rendering logic from `USIndependence3DView` and `FrenchRevolution3DView` into this component. Each chapter can then pass custom terrain geometry, color palettes, and micro-scene components as props/children.
3. **Create a chapter-to-simulation registry** (`src/simulation/registry.ts`) that maps `chapterId` → `{ buildState, View3D, microSceneComponent }`. Update `ScenarioRunner.tsx` to look up the registry instead of hardcoding `if (chapterId === 'us-independence')` checks.
4. **Add shared micro-scene infrastructure:** a `MicroScene` wrapper component that handles zoom camera transitions, overlay UI, and the enter/exit animation when a micro-scene activates.

#### Phase 2: Chapter Simulation Engines (Data Layer)
For each of the 12 remaining chapters, create a `src/simulation/<chapterId>3d.ts` file containing:
- Node definitions with 3D positions
- Frontline definitions
- Unit blueprints
- Branch metadata and base scores
- Choice impact lookup table (keyed by the chapter's existing `StoryChoice.id` values from `src/data/chapters/<chapterId>.ts`)
- Scenario-to-node mapping
- Micro-scene state builder
- The `build*CampaignState()` export function (using the factory from Phase 1)

#### Phase 3: Chapter 3D Views (Rendering Layer)
For each chapter, create a `src/components/simulation/<ChapterName>3DView.tsx` that provides:
- Custom terrain/map mesh (unique geometry per chapter)
- Custom color palettes and faction colors
- Custom atmospheric effects (lighting, fog, particles)
- Custom micro-scene component
- Educational overlay panels with chapter-specific labels
- Register in the chapter registry

#### Phase 4: Micro-Scenes
Build the 13 unique micro-scene components (one per chapter, U.S. already has Yorktown):
- Each micro-scene is a self-contained R3F `<group>` with its own internal state
- Physics-driven where appropriate (artillery, crowd dynamics, ship movements)
- Morale/tension/progress meters
- Activated by specific `scenario.id` triggers
- Support snapshot replay

#### Phase 5: Polish & Post-Processing
- Add per-chapter post-processing profiles using `@react-three/postprocessing`: bloom, vignette, chromatic aberration, depth of field
- Add per-chapter particle systems: dust, snow, smoke, data streams, virus particles, stars
- Add camera transition animations when switching between macro-map and micro-scene views
- Performance optimization: LOD (level of detail), instanced meshes for crowds/armies, frustum culling, lazy loading of chapter 3D assets
- Mobile responsiveness: reduce particle counts, simplify geometry, lower shadow resolution on mobile

#### Phase 6: Integration & Testing
- Update `ScenarioRunner.tsx` to use the registry — any `chapterId` with a registered simulation gets the 3D view
- Ensure replay/scrubber works for all chapters
- TypeScript strict mode: `tsc --noEmit` passes
- Build check: `npm run build` passes
- Browser validation: no runtime errors, 3D scenes render, choices update the scene, replay works
- Performance: maintain 30+ FPS on mid-range devices

---

### Implementation Order (Priority)

Start with the **generic infrastructure** (Phase 1), then implement chapters in this order to spread across different visual styles:

1. **Chapter 1: Timur's Legacy** — steppe/siege warfare (tests desert terrain + siege micro-scene)
2. **Chapter 5: Lincoln / Civil War** — continental map split (tests nation-division visualization)
3. **Chapter 9: Cold War** — global bipolar (tests global projection + nuclear tension)
4. **Chapter 12: AI Revolution** — abstract futuristic (tests non-geographic abstract visualization)
5. **Chapter 8: WWII** — multi-theater global (tests the most complex multi-region system)
6. **Chapter 4: Russian Empire** — vast Eurasian (tests extreme-scale terrain)
7. **Chapter 6: Lenin** — urban/industrial (tests city-scale visualization)
8. **Chapter 7: Hitler** — political map (tests political influence visualization vs military)
9. **Chapter 10: USSR Dissolution** — fragmentation (tests dynamic territory splitting)
10. **Chapter 11: COVID** — epidemiological (tests infection-spread visualization)
11. **Chapter 13: Future Earth** — space scale (tests solar system visualization)
12. **Enhance Chapter 2: U.S. Independence** — add naval micro-scene + weather
13. **Enhance Chapter 3: French Revolution** — add Bastille micro-scene + Seine River

---

### Constraints & Requirements
- **Do not break existing functionality.** All current features, routing, i18n, and chapter data must continue working.
- **Deterministic engines only.** No `Math.random()` — use hash-based seeds from scenario ID + choice history for any variation.
- **TypeScript strict.** All simulation state and view props must be fully typed. No `any`.
- **Reuse existing dependencies.** Everything needed is already in `package.json` (three, fiber, drei, rapier, postprocessing). Do not add new 3D libraries.
- **WebGL fallback.** Every 3D view must check for WebGL availability and show a graceful fallback (already patterned in existing views).
- **Educational overlays.** Every scene must have HTML overlays explaining what the user is seeing — this is an educational app, not just eye candy.
- **Performance budget.** No scene should exceed 50MB of GPU memory. Cap object counts. Use instanced meshes for repeated geometry (troops, buildings). Implement LOD for complex micro-scenes.
