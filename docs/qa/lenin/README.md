# Petrograd: The Weight of a Promise

Independent chapter branch: `feat/episode-lenin-revolution`, based on `origin/main` at `a2826b89`.
Route: `/experience/lenin-revolution`.

## What is playable

A fictional Bolshevik district delegate negotiates supply, political authority and institutional restraints in September 1917–January 1918. This is **not a combat episode** and not a renamed military campaign. Four optional/selectable locations lead to three consequential decisions. Three supply policies change the credibility of later promises; three political routes lead to separate final dilemmas. Fifteen beats, eighteen complete decision routes and five endings.

- Shared supply oversight + plural government + protected dissent: accountable coalition (counterfactual).
- Shared oversight + electoral route + binding vote: electoral bargain (counterfactual).
- Uprising + independent assembly: constrained victory (counterfactual).
- Uprising + assembly dissolution: historical direction, explicitly not an exact replay.
- Other combinations: fragile settlement (counterfactual).

No choice promises to prevent civil war or makes dictatorship inevitable. Suppression is described as a loss of rights with human costs, not a victory reward. The visible commitment ledger preserves the significance of earlier choices. Choice selection previews the decision; a separate commit button changes state. The handler checks its original beat to reject repeat/stale commits.

## Original visual work

Two chapter-local procedural sets: a canal district with granite quays, bridge, tram rails, brick factories, bakery queue, lamps and a Smolny-inspired classical facade; a cutaway assembly room with benches, delegates, ledger papers, ballot box, lectern and windows. These are artistic composites, **not surveyed reconstructions**. Lenin uses the repository's existing face asset; he is not assigned invented quotations. No new downloaded/paid assets, outside textures, insignia or prohibited emblems.

The additional environment geometry uses four instanced batches per set (boxes, cylinders, heads, lamp panels), plus one unshadowed point light. Shared engine terrain, sky, cast and shadow passes add their own draw calls; four batches is **not** a measurement of total rendered draw calls. Existing mobile DPR / postprocessing tier remains in effect. No GPU benchmark or physical-device performance claim is made.

## Localization and interaction

English, Uzbek and Korean each contain all 76 narrative/character fields plus the chapter-local controls. Text uses the existing `localizeScript` pipeline; localization cannot modify paths, flags, effects or cameras. Existing global start/cinematic/ending controls use their existing translated namespace.

Every world hotspot has a DOM button counterpart. Touch targets are at least 48 CSS pixels in styles; panels scroll at constrained viewport heights. Drag/pinch remain the existing camera inputs. Keyboard focus returns on Escape/dismiss; effects are not applied on preview or cancellation. Mobile ending overflow styling is scoped to this chapter. DOM fixture below is supplied for verification, not reported as passed.

## Automated verification

Passed locally:
- `npx tsc --noEmit`.
- `npm run build` (Vite emitted its existing large bundle warning).
- Focused ESLint across all modified/new application TypeScript and TSX files.
- `node scripts/test-lenin.cjs`: graph has no cycles or missing destinations; all 15 beats reachable; all 18 paths complete; all five endings reached; every path exercised with full narration and cinematic skip, then repeated with identical stats/flags/outcome; reset clears flags, ending and visits; repeated hotspot discovery is idempotent; all localized narrative keys exist, and translation preserves graph/effect shape.

Not passed / blocked:
- Actual browser DOM interaction and responsive screenshots. An isolated headless Chromium attempt failed **before page load** with `socket() failed: Operation not permitted` and a crashpad database error. No security flags/settings were changed to bypass this. Consequently focus, overflow and double-click checks in the DOM fixture have not executed in a real browser here.
- WebGL scene rendering, camera occlusion/visual composition, frame time, physical mobile gestures and device performance. The parent also observed unavailable WebGL in its cloud browser. These require a GPU-capable browser before visual signoff.
- Combat checks: not applicable; this chapter has no battle node.

## Reproduce remaining checks

1. `npm ci && npm run dev`.
2. Open `/experience/lenin-revolution` and complete each strategic route. Test intro skip and replay, lore close/Escape, exit/re-entry, language change, choice preview/cancel, rapid commit taps and ending replay. Existing engine language changes restart the run; no persistence change is introduced here.
3. Inspect street and interior camera views, orbit boundaries and large-font/mobile layouts at 390×844, 360×640 and landscape 844×390. Check all ending screens and English, Uzbek and Korean text.
4. DOM-only fixture: `/scripts/lenin-ui.html?test=1&lang=en` (also `uz`, `ko`). It deliberately does not mount WebGL. A successful run appends `#qa-result` with `PASS`; failures set `data-qa-failure` on the body. It tests preview/cancel, Escape/focus return, same-handler double commit, lore dismissal/revisit, reset, horizontal overflow and minimum touch target height. `?beat=mandate&lang=ko` previews a chosen panel. Fixture is not part of the production entry point.

## Historical sources and boundaries

Read 17 November 2026. Historical dialogue is not quoted. Contemporary political documents below establish what actors argued; their partisan judgments are not treated as neutral fact.

- [University of Warwick, Modern Records Centre: The February Revolution](https://warwick.ac.uk/services/library/mrc/collections/digital/russia/menshevik/) provides the chronology of abdication, overlapping governmental/soviet authority, continuing shortages and the Kornilov crisis. Dates are explicitly identified where the Russian and Gregorian calendars differ.
- [Vladimir Lenin, On Compromises, 1–3 September 1917 (14–16 September Gregorian)](https://www.marxists.org/archive/lenin/works/1917/sep/03.htm), a primary document in the Marxists Internet Archive, establishes the brief proposal for a peaceful compromise with Socialist-Revolutionaries and Mensheviks. The episode does **not** assert that a lasting coalition resulted or that its fictional district conference occurred.
- [David L. Hoffmann, Ohio State University, The October Revolution in Russia](https://origins.osu.edu/milestones/november-2017-october-revolution-russia?language_content_entity=en) contextualizes the capture of key Petrograd sites, the arrest of ministers and the subsequent civil war. The episode avoids the later cinematic myth of a huge palace battle.
- [Lenin, Draft Decree on the Dissolution of the Constituent Assembly, January 1918](https://www.marxists.org/archive/lenin/works/1918/jan/06a.htm), a primary document, records the Bolshevik rationale for terminating a competing elected institution. Its justification is not endorsed. The chapter contrasts it with explicitly invented institutional compromises.

The grain train, queue representative, local ration ledger, individual dispatch seizure, assembled conference, all dialogue and every negotiated settlement are game inventions. The player's decisions model competing principles, not historical causation or precise probabilities. These distinctions are shown in the opening, exploration cards, branch narration, on-screen caption and ending subtitles, not only in these notes.

Additional CPU geometry checks evaluate only the pure set builder: repeated generation is deterministic, every transform is finite with positive dimensions, and the two sets each use four batches. This catches invalid instance data, not visual defects.

Repository-wide lint is not clean: after removing an initial out-of-project test-fixture extension issue, the remaining failure is the pre-existing unused `eslint-disable` at `src/experience/world/greatwar.tsx:5`. That unrelated file is unchanged. Focused lint on every touched application TS/TSX file passes. The development fixture is JavaScript and passes `node --check`.

### Review corrections

The chapter-local panel now resets its scroll position whenever the selected option, active lore card or beat changes, so a preview cannot inherit the lower option list's scroll offset. The DOM fixture includes a preview-scroll assertion, still pending browser execution here.

A chapter-only renderer error boundary now preserves the DOM story, negotiations, exit and replay controls if WebGL initialization or rendering throws. Its unobtrusive fallback notice is translated in EN/UZ/KO. This is a graceful-degradation path, **not a substitute for 3D visual verification**. Browser confirmation of actual WebGL failure handling is pending. Other chapters' renderer behavior is unchanged.

### Async renderer initialization correction

A parent live preview demonstrated that an R3F async WebGL initialization failure can bypass a class error boundary. The chapter now probes WebGL2 before mounting Canvas, matching its antialias/power preference, and displays the existing localized fallback when unavailable or throwing. The probe releases its temporary context through `WEBGL_lose_context` where available. The class boundary remains for later ordinary render exceptions, and the DOM decisions remain outside the graphics gate. Seven added injected-stub assertions pass (no DOM, unavailable context, exception, correct attributes, supported context, release, absent optional extension). These tests do not validate browser/GPU rendering; actual preview acceptance remains required.
