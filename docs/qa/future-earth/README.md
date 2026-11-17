# Future Earth: After the Tide

Branch `feat/episode-future-earth`, based directly on fetched `origin/main` (`a2826b89e2faf55104aff63383d234af5fd584af`). Route `/experience/future-earth`.

## Scope and design

An **imagined** estuary district in 2086, after an **imagined** storm. The player coordinates two repair shifts and then a public accountability decision. This is speculative civic fiction, not a forecast, an engineering design, operational emergency advice, climate attribution or a casualty/emissions model. The existing chapter's unrelated distant-future timeline scenarios are not linked or altered.

This is a scheduling and dependency puzzle, not a renamed combat encounter or a sequence of ordinary story choices:

- Each shift has three crew tokens; unused crew tokens expire.
- Two power tokens are initially available. A commissioned substation raises capacity to four **next shift**, never retroactively within its current draft.
- Repaired water, shelter and communications continue consuming power in subsequent shifts.
- Draft selections can be added/removed; unaffordable additions are disabled with a reason. Review is reversible. Dispatch commits a shift once, guarded by the expected shift number.
- After both shifts, an explicit completed/unresolved record and per-shift history are carried to the civic forum.
- The public-review or contractor-only policy changes accountability, not available workers or simulated lives saved.

| Project | Crew tokens | Sustained power |
|---|---:|---:|
| Substation | 2 | 0; adds 2 capacity next shift |
| Water service | 1 | 2 |
| Civic shelter | 1 | 1 |
| Public signal hub | 1 | 1 |
| Quay access route | 2 | 0 |
| Rain garden | 1 | 0 |

These integer costs and completion states are invented pedagogical assumptions. No score claims to measure real resilience. A restored water icon is explicitly **not** a drinking-water safety certification. Rain-garden repair does not make the coast flood-proof. An access route does not certify evacuation safety or universal accessibility.

154 feasible ordered two-shift packages feed two accountability choices and six endings: connected recovery, access prioritized over communications, incomplete essentials, closed-ledger accountability gap, missing water service, or missing shelter. Each ending states remaining needs, not a guaranteed century-long future. No single package completes every project.

## Implementation and original art

Chapter-local code lives in `src/experience/future/` plus `scripts/futureEarth.ts` and `world/future.tsx`. Shared changes are narrow, `future-earth` opt-ins: registry, environment union/settings, local overlay, capability fallback and camera controls. No dependency/lockfile changes, external asset downloads, paid assets, Cold War edits or existing chapter copy edits.

Original procedural set:
- Raised waterfront district with stepped residential towers, planted balconies, cylindrical water works, a microgrid yard with solar canopies, signal mast, shelter and ramp, terraced rain gardens, a visibly incomplete quay bridge, resident figures and site status strips.
- A cutaway civic forum with tiered seats, glazing, plants and a scale district model. Committed shifts update a view-only repair mirror so status lights and the quay deck change during planning. The forum model then reads the handed-over narrative record. The visual mirror cannot resolve an ending.
- Four instanced geometry batches per environment. The district also adds one water plane; the forum adds one unshadowed point light. Shared terrain, sky, markers and shadows add rendering work, so this is not a total draw-call or performance measurement.
- Pure deterministic geometry descriptors are CPU-tested. Rendered box/cylinder/sphere geometries are declarative R3F children, allowing normal disposal rather than unowned merged buffers.

All story, planner rules, projects, status labels, reset prompts and fallback copy are provided in English, Uzbek and Korean. Cinematics use chapter-local, translated full-text Continue and Skip buttons. Existing global ending controls use their existing translations. The generic historical stats are hidden for this episode, including ending badges, because zero-filled engine statistics would falsely imply a measured outcome.

## Interaction and accessibility

Every world evidence marker has a DOM button counterpart. Project cards include cost, status, description and a visible disabled reason; completion is not conveyed only by color. Native buttons have at least 44px targets (normally 48px). Selection uses `aria-pressed`; resource totals are announced; panels scroll and are capped at viewport-relative heights.

Escape dismisses lore, review, reset confirmation or policy preview without dispatching. Review/lore openings reset panel scroll; dismissal returns focus to a visible initiating control; a new shift focuses its heading. A full planning restart requires an explicit discard confirmation and clears both shifts. Duplicate dispatch and final-handoff handlers are guarded. The fixture below is provided to verify those actual React flows, but has not run in a browser in this environment.

A view-only camera-reset command preserves assignments and story state. For `prefers-reduced-motion`, Future Earth uses a fixed cinematic camera frame, disables orbit damping and decorative marker movement, and disables CSS animation/transitions. Other chapters retain their previous behavior.

A WebGL2 capability preflight matches the Canvas context options, releases a successful temporary context, and shows a localized nonblocking fallback before mounting R3F when unavailable. A React error boundary remains around the renderer. Survey, planning, narration, exit and replay are separate DOM state. This mitigates the asynchronous initialization failure observed in another chapter; it is not a claim that every future graphics-driver failure is recoverable.

## Checks run

- `node scripts/test-future-earth.cjs`: 154 feasible ordered plans × 2 policies × 3 languages × full/skip narration; six endings and every story beat reached. Checks immutable drafting, independent crew/power rejection, next-shift commissioning, persistent loads, duplicate/stale commits, reset, repeated run determinism, hotspot visit deduplication, localized narrative fields and UI key parity, camera-command state isolation, deterministic geometry with finite positive transforms, and WebGL success/failure/release stubs.
- `npx tsc --noEmit`.
- Focused ESLint with `--max-warnings 0` on every changed/new application TS/TSX file.
- `node --check scripts/future-ui.js`.
- `NODE_OPTIONS=--max-old-space-size=2048 npm run build`; Vite's large-bundle warning remains.
- `git diff --check`.

Repository-wide lint is **not** clean: unchanged `src/experience/world/greatwar.tsx:5` contains an unused `eslint-disable`. It was not edited.

**Not run:** actual browser interaction, the DOM fixture, screenshots, WebGL rendering, visual camera/occlusion checks, driver-failure UI behavior, physical touch and mobile frame-time checks. No desktop/browser was used for this task. Source/store enumeration is not browser play-testing, and CPU geometry validity is not visual signoff.

## Remaining browser/GPU review

1. `npm ci && npm run dev`; open `/experience/future-earth` with a capable browser, then one without WebGL. Confirm no app-wide failure on the fallback path.
2. Inspect all six landmarks, the water/land plane and quay gap/ramp. Confirm the final restored bridge and forum status lights match the repair record. Inspect orbit clipping and camera reset.
3. At 360×640, 390×844 and 844×390, test all three languages; verify no horizontal overflow, readable disabled reasons, scrollable policy review and ending controls.
4. Enable reduced motion and verify still cinematic framing, no decorative marker animation, and preserved manual orbit/reset.
5. Complete `grid + signal` in shift one and `water + shelter + garden` in shift two, then public review for the connected ending. Compare `water` first, then `grid + garden`: the late grid cannot power shelter within that final shift.
6. Test selections, Escape, edit-review, resetting after shift one, canceling reset after shift two, double dispatch, double final handoff, policy preview/cancel, ending replay, and exit/re-entry. Existing engine language changes reload the run; this slice does not add persistent saves.
7. DOM-only fixture `/scripts/future-ui.html?test=1&lang=en` (also `uz`, `ko`) mounts the actual overlay and model, with 3D deliberately absent. A success appends `#qa-result` beginning `PASS`; failure sets `data-qa-failure` on the body. `?beat=survey&lang=ko` is a visual panel fixture. These development files are not production build entry points.

## Sources and fact/fiction boundary

Sources checked 17 November 2026. No source supplies the game costs, city, storm, future date, construction dimensions, duration of a shift, or outcome rules.

- [US EPA: Power Resilience for the Water and Wastewater Sector](https://www.epa.gov/waterresilience/power-resilience-water-and-wastewater-sector). Read the agency page. Supports the contextual dependency of water operations on electricity, and the need for utility-specific resilience planning. It does not validate our token capacity, repair sequence or water safety.
- [NOAA: What are nature-based solutions?](https://oceanservice.noaa.gov/facts/nature-based.html). Read the agency page. Supports using natural habitats/processes within infrastructure projects to reduce coastal hazard risks, while emphasizing evaluation of outcomes over time. Our planted terraces are an artistic setting, not a design recommended by NOAA.
- [US EPA: Mitigate Flooding](https://www.epa.gov/green-infrastructure/mitigate-flooding). Read the agency page. Supports the roles of stormwater retention/infiltration and the need for site-specific hydrologic/hydraulic analysis. The game performs no such analysis.
- [US EPA: Bioretention (Rain Gardens), December 2021](https://www.epa.gov/system/files/documents/2021-11/bmp-bioretention-rain-gardens.pdf). Read the official PDF text. Supports the explicit limitation that rain gardens are not blanket protection against extreme storms and depend on site conditions. No dimensions, performance percentages or safety recommendations are imported into the puzzle.
- [IPCC AR6 WGII: Cities, settlements and key infrastructure](https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-6/) and [Summary for Policymakers](https://www.ipcc.ch/report/ar6/wg2/chapter/summary-for-policymakers/). Search-indexed official excerpts supported the initial research into cascading infrastructure risks and combined structural/ecosystem adaptation. Direct page/PDF retrieval returned HTTP 403, so this note does not claim a complete report read. The playable copy uses qualitative context, not scenario forecasts or extracted probabilities.

FEMA/DHS lifeline materials were also discovered, but their direct document retrieval returned 403; no claim of detailed FEMA procedural compliance is made. The game is not an emergency-management certification or incident-response tool.

## Critical-review corrections

Future Earth no longer mounts the shared typewriter/automatic-advance cinematic overlay. Full narration is immediately readable, with native Continue and Skip buttons, a scrollable card, visible line count and focus on the new text. There is no automatic advancement timer or clickable prose. Each action captures the chapter, script identity, phase, beat, line index and a chapter-local run generation; it is one-shot and rejects stale actions, including after reset and a same-script/same-beat/same-index replay. Mouse multi-click detail is also rejected. No shared store or other chapter cinematic behavior was changed.

The CPU path enumeration now uses these guarded actions. Additional regression cases cover repeated Continue/Skip, a stale line, a later cinematic beat, another chapter, callbacks retained through reset/loading, same-index replay, and a capture made outside cinematic phase.

The DOM fixture had a real lifecycle defect: it mounted `FutureOverlay` permanently, preserving its one-shot handoff guard through the hearing scene and blocking policy submission. It now mirrors production phase-specific mounting and mounts `FutureCinematic` for cinematic phases. The scripted flow uses the real Skip/Continue buttons for hearing/debrief. This fixes the fixture construction; it does not claim browser execution has passed here.


## Live deploy-preview DOM verification (2026-11-17)

On PR #19 remote head `bf4b20389c76f4b4532583c5444275a9c000ee0d`, a newly created cloud browser tab displayed the localized WebGL-unavailable fallback and completed the Korean production UI: native narration Continue/Skip, water evidence and focus return, first shift grid + public signal, review/Escape/reopen, second shift water + shelter + garden, committed repair record, hearing, public-accountability preview/Escape/reopen/confirm, debrief Continue, and connected-recovery ending. A genuine 1180×757 DOM-only ending screenshot was captured outside the source tree. This is one live browser path, not exhaustive browser testing or a 3D render.

A separate responsive reviewer completed another Korean production path and identified compact preview focus below the fold. The follow-up focuses the panel's top heading for repair and policy reviews, rather than the potentially offscreen Edit/Reconsider buttons. Escape still restores the originating visible control. DOM-fixture assertions now cover these focus targets; the development fixture itself has not been run in a browser. CPU regression checks remain separate. Physical mobile/touch, WebGL visuals/camera occlusion and GPU performance remain unverified.
