# AI Revolution: The Release Room

## Scope and routes

- Branch: `feat/episode-ai-revolution`, based on `origin/main` at `a2826b8`.
- Entry: `/experience/ai-revolution`; existing `hasExperience` discovery enables the chapter's play link.
- New chapter-local UI, camera and guarded actions. Historical episodes keep their existing view and store behavior. No battles, soldiers, victory statistics, paid assets, external models, texture downloads, or generated images.
- Procedural cutaway research campus, release control room and server hall. Repeated facade slats, paving, monitor panels, server cabinets/blades/status lights use instancing. Low-segment human figures, tables, seats, documents, planting, water basin, solar canopy, cable-light runs and floor markings establish human scale.
- No links to the chapter's existing cosmic/singularity timelines: a bounded deployment decision does **not** imply any of those futures. Endings link back to the chapter, not to an unrelated outcome.

## Educational framing and source

All people, organizations, dates, sample sizes, test findings, incidents and outcomes are explicitly fictional, including the year 2032. They are neither forecasts nor claims about a real product. They do not establish safety certification or legal compliance. No real executives appear as characters.

Primary source reviewed 2026-11-17: [NIST AI RMF 1.0 Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/), particularly GOVERN 2/5 (responsibility and stakeholder input), MAP 1/5 (context and impacts), MEASURE 2/3 (evaluation and feedback), and MANAGE 4.1 (monitoring, appeal, override, incident response and recovery). This voluntary framework supplies background concepts, not a mandatory checklist. The game's limited slots, particular procedures and outcome rules are authored teaching simplifications, not NIST-prescribed thresholds. No claim that rollback undoes downstream harm, aggregate accuracy proves readiness, human oversight works without capacity, or alignment is solved.

## Gameplay and accessibility

1. Manually paced/skippable campus arrival; review and explicitly record three evidence cards.
2. Fund two of three evaluations. The next screen shows only the selected findings and explicitly marks the untested area unknown.
3. Choose staffed read-only pilot, public hold or broad tool-enabled release. Each has a distinct incident introduction. A hold leads to an offline drill, not a public incident. Hold-only EN/UZ/KO copy continues through incident evidence, response options, recovery controls and accountability: all requests/records are synthetic, no resident is exposed, and live human service/queues are unchanged. The locale-safe copy adapter preserves graph IDs, flags and actions without mutating the script.
4. Inspect trace, recovery and support evidence. Choose rollback, isolation or continued operation. Rollback requires ordered freeze/preserve, human-service restore, then verification. Repeat taps never duplicate records or advance a different beat.
5. Choose public accountability or closed launch-team review. Five endings reflect the complete decision trail; debrief retains the untested area and reflection questions.

Keyboard users have native buttons, selects and checkboxes; Tab/Enter can complete the entire game. Escape closes an evidence card without recording it. Every scene marker has an equivalent list control. Pointer markers are removed from the keyboard order. Game-control touch targets are at least 44px high. No dragging, timing, audio or color discrimination is necessary to finish. Orbit/pinch and explicit zoom/home controls are optional. Reduced-motion preference is honored and can be changed in-episode. Narration does not auto-advance. Scene/beat/card transitions reset the scrolled panel to its top and focus the new heading without scrolling the document. Language changes preserve progress and refresh all narrative/UI strings.

No-WebGL/context-loss handling leaves the **complete decision game** playable in a clearly labeled text mode. That is an accessibility/failure fallback, not evidence that the 3D renderer works. Intentional text-mode toggling does not treat Canvas teardown as an unexpected context failure.

## Automated verification

- `npm ci --cache /tmp/multiversity-ai-npm`: passed, 371 packages installed; lockfile unchanged.
- `node scripts/test-ai.cjs`: passed, **3,610 assertions, all 54 full decision paths, 12 reachable beats and all 5 endings**. Includes ordered recovery interlocks, unknown/stale action rejection, repeated cards/continue/choices, dismiss-without-record, manual vs skipped introduction, beat/line-guarded Continue and Skip, stale/repeated narration controls across scenes and reset, foreign-chapter rejection, skip outside cinematics, reset/replay, camera commands preserving progress, locale key parity/nonempty coverage and every narrative string localized in EN/UZ/KO, and hold-only drill copy for every affected panel in each language with safe English drill fallback.
- `npx tsc --noEmit`: passed.
- Focused ESLint on `src/experience/ai`, `scripts/aiRevolution.ts`, registry, types, `Experience3D.tsx`, `WorldScene.tsx`, and `i18n.ts`: passed with `--max-warnings 0`.
- `npm run build`: passed. Existing large application bundle warning remains; no claim of runtime frame-rate or memory performance is made.
- `git diff --check`: passed.

The regression script tests source graph/action semantics, **not** actual React rendering, touch gestures, camera framing or GPU behavior. Source tests assert translated coverage, not native-speaker review.

## Browser/device limits and remaining review

The local Vite server starts at `http://127.0.0.1:5187`. The cloud browser's separate network returns `ERR_CONNECTION_REFUSED` for this loopback address. Binding Vite to `0.0.0.0` fails in this workspace with `uv_interface_addresses ... Unknown system error 1`. No proxy was available. Per task constraint, no user Mac, native desktop or other worker's tabs were used. **No new screenshots, actual browser playthrough, mobile layout inspection, GPU/WebGL rendering, physical touch, screen-reader session, or device performance validation is claimed.** Parent had independently reported WebGL unavailable even for unchanged production; that is not a validation of this branch.

Before release, use a reachable preview on a WebGL-capable desktop and physical phone to inspect all three environments, 360/390px portrait and short landscape layouts, long Korean/Uzbek cards, scrolling then changing scenes, locale changes mid-run, repeated confirmation, language-preserving replay, text/3D toggles, context loss and Exit/Back/re-entry. Verify minimum readable type, scene visibility behind panels, keyboard focus, rendering budget and reduced-motion behavior. Native Uzbek and Korean copy review is recommended.
