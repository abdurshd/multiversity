# COVID-19: The Night Shift

## Scope and play route

- Route: `/experience/covid-pandemic`, also discoverable through the chapter's existing Play action.
- Independent branch from `origin/main` at `a2826b89`: `feat/episode-covid-pandemic`.
- One fictional district on **31 March 2020**, not a reconstruction of a named country's response.
- Nine beats, three purpose-built procedural environments, four qualitative handover endings. No battle mechanics, infection/death projections, percentage health scores, treatment choices or clinical advice.
- Flow: historical introduction → three reports → six-crate manifest → loading-bay transition → staffing plan → public briefing → optional public correction → handover.
- Cinematics are manually advanced, with an explicit skip button for each scene. There is no time pressure, auto-advancing text, or delayed decision callback.

## Historical provenance and fiction boundary

Primary sources consulted 17 November 2026:

1. [WHO Europe, COVID-19 pandemic overview](https://www.who.int/europe/emergencies/situations/covid-19/) supports the statement that WHO characterized COVID-19 as a pandemic on **11 March 2020**.
2. [WHO, essential health services news release, 30 March 2020](https://www.who.int/news-room/detail/30-03-2020-who-releases-guidelines-to-help-countries-maintain-essential-health-services-during-the-covid-19-pandemic) supports the contextual statement that the response had to coexist with maintaining essential services. It is not used to calculate any capacity or health outcome.
3. [WHO, risk communication and community engagement interim guidance, 19 March 2020](https://www.who.int/publications/i/item/risk-communication-and-community-engagement-readiness-and-initial-response-for-novel-coronaviruses) establishes that community communication was part of the early response. The chapter's specific radio caller, messages, correction sequence and consequences are authored fiction, not quotations or documented WHO predictions.

The opening, reports, allocation screen, endings and expandable sources panel explicitly label invented elements. All people, locality, requests, stock, staffing circumstances, dispatches, promises and outcomes are fictional. Six crates are abstract logistics tokens, **not standardized protective-equipment quantities or clinical ratios**. The arbitrary bridge-plan targets (hospital 3, clinic 2, outreach 1) are disclosed before sealing. Requests total nine; no allocation can satisfy all requests. An ending describes the handover record, not pandemic control, predicted illness, mortality or a real organization's performance. No future vaccine or treatment hindsight is used to solve an early-2020 scenario.

## Mechanics and guardrails

- All three reports must be opened before dispatch. Closing/reopening a report preserves a single review flag.
- Three integer steppers share a six-token budget. Negative, fractional, NaN, unknown-destination and over-budget edits are rejected in the pure allocation model.
- Sealing is only possible with exactly six tokens, is atomic/idempotent and locks the manifest.
- Chapter-local actions verify the current chapter, beat, phase and (for narration) line index. Repeated/stale choice, report, seal and skip actions cannot replay effects across beats.
- Staffing and communication are distinct decisions. Overpromising creates an additional correction branch; public correction does not erase the original promise from the handover record.
- Four endings: accountable handover; uncorrected promise; uneven support/service-plan gap; repairable partial plan. The resolver has no health-number interpretation.
- Restart clears both the shared narrative state and chapter-local allocation. Language changes update text without resetting evidence, sealed allocation, choices or narration position.

## Rendering and controls

All assets are original procedural geometry, created in this branch. No downloaded assets, external texture/font requests, premium services or paid dependencies are introduced.

- Hospital cutaway: ward beds, side rails, monitors, clinic workstations, cabinets, paper ledger, waiting chairs, tactile entrance paving, radio desk and staff silhouettes.
- Depot: metal shelving, neutral stored containers, three color-coded staging trolleys, six interactive dispatch crates, delivery van, shutter and loading ramp. Allocated crate geometry changes with the manifest.
- Briefing room: document boards, meeting table, microphones, paper notes, chairs, lectern and district windows.
- Common district: tiled floor seams, open-front architecture, rear windows, muted night-city silhouette, warm/cool lighting.
- Static geometry is merged by material. CPU audit: hospital **14 batches / 6,356 triangles**; depot **13 / 4,492**; briefing **14 / 7,156**. Up to twelve extra crate meshes render when six tokens are assigned. These are geometry counts, **not measured draw-call totals or performance guarantees**; shadow passes also incur work.
- Local canvas DPR capped at 1.25; no postprocessing or downloaded HDRI. One 1024 shadow map. Actual mobile frame rate and thermal behavior remain unverified.
- Pointer drag and two-finger zoom via OrbitControls; reset-view button; portrait-aware camera distance; minimum 44px native buttons; buttons duplicate spatial hotspots; visible focus outlines; report-heading focus and scroll on open, Escape dismissal and focus return to the matching DOM report button; scrollable sheets; language selector; non-color labels; manual text pacing; reduced-motion support.
- A chapter-local render error boundary keeps the full decision UI playable if WebGL initialization fails. This is not a claim that fallback/browser behavior was visually verified here.

## Verification results

Passed on the final source:

- `npm ci --cache /tmp/multiversity-covid-npm`
- `npx tsc --noEmit`
- `NODE_OPTIONS=--max-old-space-size=2048 npm run build` (final source passed; existing large-bundle advisory remains). An earlier unconstrained repeat was OS-killed during bundling; after stopping the local dev server, the bounded retry completed in 12.68 seconds.
- Focused ESLint, zero warnings, on all changed TS/TSX files including integration files.
- `node scripts/test-covid.cjs`: **1,135 assertions**, enumerating **168 complete deterministic paths** (28 legal allocations × 2 rosters × 3 communication routes), all 9 beats, all four endings. Distribution: 92 gap, 56 trust, 18 partial, 2 shared. These are exhaustive **CPU state-transition tests, not visual play-tests**.
- Same script verifies localization key parity and every script text lookup in EN/UZ/KO; graph targets; absence of combat/stats effects; malformed allocation inputs; inspection gates; repeated/sealed/stale actions; truthful correction audit trail; reset/reuse; and finite geometry/normals with bounded static complexity.
- `node scripts/test-timur.cjs`: 114 pre-existing Timur source/state assertions passed.
- `git diff --check`.

`npm run lint` is **not green**: it reports one existing unused ESLint suppression in `src/experience/world/greatwar.tsx:5`. That file is byte-for-byte unchanged from `origin/main`; it was not modified to make this chapter appear clean.

## Browser/GPU verification limitations

**No desktop/native UI was used. No browser screenshots are included. No real-device or rendered-3D validation is claimed.**

1. Local Vite served successfully on `127.0.0.1:4182`. Binding to `0.0.0.0` failed because the executor's network-interface query returned `Operation not permitted`.
2. Isolated headless Chromium failed before opening a page with `socket() failed: Operation not permitted`, including the reviewed escalation retry.
3. The cloud browser is on a separate host and could not reach this executor's local preview (`ERR_CONNECTION_REFUSED`). Preview forwarding is unavailable. No user-desktop workaround was attempted.

Required before production acceptance: open the route in a WebGL-capable browser; visually inspect all three environments at 1280×800, 390×844 and landscape; check camera framing, shadows, text wrapping and keyboard focus; perform a complete run and replay; change EN→UZ→KO after a sealed shipment and verify retained state; exercise touch orbit/pinch and reduced motion; induce WebGL failure and inspect fallback; inspect report open/close/Escape focus and scroll, including spatial-marker entry; inspect exit/back/forward; and measure frame time and renderer counts on a real phone. Uzbek and Korean have complete authored translations but still merit native-speaker editorial review.

### Async renderer initialization correction

A parent live preview demonstrated that an R3F async WebGL initialization failure can bypass a class error boundary. The chapter now probes WebGL2 before mounting Canvas, matching its antialias/power preference, and displays the existing localized fallback when unavailable or throwing. The probe releases its temporary context through `WEBGL_lose_context` where available. The class boundary remains for later ordinary render exceptions, and the DOM decisions remain outside the graphics gate. Seven added injected-stub assertions pass (no DOM, unavailable context, exception, correct attributes, supported context, release, absent optional extension). These tests do not validate browser/GPU rendering; actual preview acceptance remains required.

## Visual repair candidate, 17 November 2026

This revision is a response to the owner's screenshot rejecting the original prototype appearance. It is **not a production visual acceptance or a WebGL signoff**.

- Replaced the tiny overhead dollhouse framing with lower, closer scene-specific cameras and camera focus when a report is selected. Manual orbit/zoom, reset view, reduced motion and keyboard-accessible report buttons remain.
- Rebuilt the night interior with deep window frames, blind slats, translucent glazing, structural beams, hanging lamps, wall panelling, softened upholstered seats, layered furniture, staff details, plants, bed/monitor details and original procedural surface textures. Static geometry remains merged by finish.
- Briefing screens now show a district diagram, the player's actual sealed allocation and the recorded communication/staffing state. No epidemiological data is simulated. Screen graphics are generated locally and translated in EN/UZ/KO.
- Added subtle rain on the windows, practical lighting and less flat ambient lighting. No downloaded or paid assets.
- Desktop decisions use a compact side journal rather than a full-width bottom questionnaire. Cinematic text is a smaller subtitle card. A View scene / Resume shift control lets the player inspect the scene without the journal. Mobile keeps an independently scrollable sheet and accessible controls.
- Normalized indexed/non-indexed geometry before material merging; an independent geometry exporter caught this real runtime incompatibility that TypeScript alone could not detect.
- CPU geometry budgets deliberately updated for the richer scene: hospital 20 batches / 26,362 triangles; depot 18 / 12,258; briefing 20 / 28,642. Explicit nonempty merged-geometry assertions added. These are not measured browser draw calls or mobile frame times.

Verification on this candidate: TypeScript, focused ESLint (zero warnings), production build, 1,289 CPU assertions over 168 complete decision paths, and seven injected capability checks passed. Existing bundle-size advisory remains. Translations retain full key parity. Actual browser DOM checks and exact final commit will be recorded after the draft preview is available.

Actual WebGL is still blocked in the available cloud environments. An isolated Chromium launch, including the reviewed escalation, fails because Unix sockets are denied. The independent cloud browser reports WebGL disabled or unavailable at get.webgl.org. Blender CPU renders of exported source geometry are used only as composition proxies to catch framing/intersection problems; they are explicitly **not screenshots of the app** and cannot establish Three.js lighting, alpha sorting, controls, shader correctness, mobile performance or GPU compatibility. Real WebGL acceptance remains mandatory before describing this repair as visually verified.


### Draft-preview browser pass

On preview #20, actual browser DOM (WebGL unavailable) completed both an accountable 3/2/1 corrected-promise handover and an uncorrected 6/0/0 handover. EN → UZ → EN → KO switching preserved the sealed manifest, selected roster, original promise and correction record. Replay returned to the start and reset reports to 0/3. View scene / Resume preserved all six allocations. Evidence gating, Escape close and focus restoration passed. Exit/back/forward restored the episode entry rather than a blank screen.

The repository's existing responsive iframe harness exercised the real app at 360×640, 390×844 and 844×390, not a physical phone. Compact Uzbek allocation controls measured 44×44px; the root had no horizontal overflow (360px scroll width / 360px viewport). Both choice buttons remained reachable through the independently scrolling sheet in landscape. A compact report-heading test exposed that nearest-edge scrolling left the report at the bottom of its panel; changed opening to align the report at the panel top with a 20px margin, targeted retest is required on the next preview. All final geometry uses a one-sided non-shadow-casting ceiling; camera prop and van were moved to clear focal subjects. Three CPU proxy renders verified the resulting composition, not the browser render.
