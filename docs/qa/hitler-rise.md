# Hitler Rise: The Record Must Remain

## Scope

Independent branch `feat/episode-hitler-rise`, based on `origin/main` commit `a2826b89e2faf55104aff63383d234af5fd584af`. Play route: `/experience/hitler-rise` (registered through the existing chapter Play mechanism).

A fictional independent Berlin newsroom moves from Hitler's appointment on 30 January 1933, through the 28 February emergency decree, to the 23 March Enabling Act. The player is a civic/editorial worker, never a Nazi leader. Eleven beats combine three evidence dossiers, a first-edition decision, a revisable negotiation, and a limited institutional response. Four endings describe different **fictional local records and commitments**, not national victory, survival rates, resistance scores or the defeat of Nazism.

The episode explicitly assigns responsibility for Nazi persecution to perpetrators, not victims. It includes no extremist emblems, slogans, salutes, uniformed characters, political portraits, propaganda illustrations, combat or paid assets. All figures are unmarked civilians. Historical coercion is explained in text, not staged as a spectacle.

The repository's existing chapter data contains unrelated art-school and other alternate-history timelines. This episode does **not** reuse, endorse, or link its endings to those timelines. Existing chapter data, simulation code and other episodes were left unchanged.

## Historical sources and interpretation

Authoritative sources consulted 17 November 2026:

1. [US Holocaust Memorial Museum, Hitler Comes to Power](https://encyclopedia.ushmm.org/content/en/article/hitler-comes-to-power): Hindenburg appointed Hitler chancellor on 30 January 1933; he was not directly elected to that office; the Nazi Party did not win a majority in the November 1932 election. The script distinguishes appointment from the subsequent consolidation of dictatorship.
2. [USHMM, Reichstag Fire Decree](https://encyclopedia.ushmm.org/content/en/article/reichstag-fire-decree): the 28 February decree suspended constitutional protections, including press and assembly freedoms, and enabled suppression of publications. The page includes a translated primary legal document. The episode does not adjudicate who caused the fire or reproduce the decree's propagandistic preamble.
3. [USHMM, The Enabling Act](https://encyclopedia.ushmm.org/content/en/article/the-enabling-act): passed 23 March and published the following day; lawmaking without parliamentary consent; intimidation and persecution surrounding passage. No successful judicial reversal is invented.
4. [German Bundestag historical exhibition, Sham parliamentarism in the National Socialist era](https://www.bundestag.de/resource/blob/189782/fcc189675467bf155755c5b4bd70955a/sham_parliament-data.pdf): destruction of parliamentary independence, persecution/exclusion of opposition, and Social Democratic opposition to the Enabling Act. Used for the distinction between a recorded vote and free consent.

Sources are paraphrased with dates and in-game links. The final dossier deliberately asks the player to reject certainty about an unknowable counterfactual: the documents cannot establish how every deputy would have voted without coercion. It does not imply all deputies were merely coerced, excuse collaborators, or suggest that one fictional editor could have reversed events.

All local places, people, letters, telephone notes, commitments, dialogue, capacity constraints and outcomes are labeled fiction. The telephone rumor intentionally has **no invented source URL**. The two-agreement limit is an authored team-capacity rule, not a historical statistic. Any agreement supports limited work, not a promise of immunity or rescue.

## Mechanics and architecture

- **Evidence desk:** open both documents; select the relevant source; classify the claim as supported, contradicted or not established; check the pair. Wrong assessments give rereading feedback without penalty. Only a correct source/verdict pair unlocks continuation. Three dossiers distinguish appointment, legal authorization and uncertainty about counterfactual consent.
- **First edition:** either publish the precise distinction or preserve it in the research ledger. This decision remains in the ending ledger; it does not award political power.
- **Negotiation:** inspect archivist, printer and legal-adviser offers. Asking for a safety guarantee is refused and can be reconsidered. Accept two limited commitments; withdraw/replace them before closing. Closing requires all three offers to have been read and locks the chosen agreements.
- **Institutional response:** bulletin requires the printer agreement; legal objection requires counsel; withholding the final public edition is always available. The archive agreement changes whether a bulletin has an offsite duplicate. No choice promises protection.
- **Duplicate/stale guards:** chapter, beat, phase and narration index checked inside actions; invalid sources/verdicts/partners ignored; completed evidence and closed agreements cannot be replayed. Unknown options never advance.
- **Replay:** resets both stores, evidence, feedback, agreements, active documents and narrative flags. Exit/re-entry starts a new run. Language switching goes through the same tested updater used by the live component and preserves the current run and ending identity.
- **Accessibility:** native 44px-or-larger controls, native radio groups, explicit source labels, disabled-condition text, focus outlines, document heading focus/scroll, Close/Escape and return to matching DOM source button, scrollable sheet, focus after verification, manual narration, reduced motion, language selector, portrait camera framing, touch orbit/pinch and reset-view button. All evidence is reachable without touching the 3D scene. Keyboard camera orbit is not implemented; substantive decisions remain keyboard accessible.

## Procedural art

All geometry is original, generated deterministically without external textures, fonts, HDRIs or downloads:

- Newsroom: mechanical platen press, rollers and flywheel, typewriters with individual keys, composing drawers, paper signatures, rotary telephone, desks, green-shaded lamps, civilian workers.
- Archive: tall shelving with labeled binders, drawer cabinet, reading desk, telephone desk, rolling document cart and paper bundles.
- Civic room: modest meeting table, lamps, evidence desks, chairs, cabinet and plain information board. This is not presented as a replica of the Reichstag or any actual meeting place.
- Shared period shell: plank joints, dado panels, cornices, tall sash windows, radiators, plain clock and courtyard facades.

CPU geometry audit: newsroom **16 material batches / 14,652 triangles**; archive **16 / 12,000**; meeting room **16 / 9,900**. Geometry is merged by material; these counts are not measured renderer draw calls, frame rates or mobile performance. Shadow passes incur additional rendering. Canvas DPR is capped at 1.25, with one 1024 shadow map and no postprocessing.

A synchronous WebGL2 preflight checks capability before mounting R3F, releases a successful temporary context when the extension is available, and keeps the full DOM exercise available on failure. An error boundary remains around the canvas. This incorporates the fallback defect discovered during another chapter's deployment review; stub tests are not a substitute for browser validation.

## Verification

Passed against final source:

- `npm ci --cache /tmp/multiversity-hitler-npm`
- `npx tsc --noEmit`
- Focused ESLint with zero warnings over every changed TS/TSX file.
- `node scripts/test-hitler-rise.cjs`: **3,052 assertions**, **224 complete deterministic state paths**, all eleven beats and four endings. Paths cover every agreement pair/order, first-edition decision, permitted final response and document-reading order. Ending counts: public-preserved 32; public-single 32; legal 64; private 96.
- Tests also cover all source/verdict pairings; evidence gates; close/reopen; wrong answer/retry; invalid/stale/duplicate/phase-inconsistent actions; guarantee refusal; withdrawal/replacement; overcommit prevention; lock; blocked final responses; reset/reuse; source provenance; EN/UZ/KO key parity and every localizer lookup; live language updater state preservation; WebGL preflight stubs; finite geometry positions/normals and bounded complexity.
- `node scripts/test-timur.cjs`: 114 existing source/state assertions.
- `NODE_OPTIONS=--max-old-space-size=2048 npm run build`.
- `git diff --check`.

These are CPU/state and compilation checks, **not browser play-tests**. Full-repository lint remains blocked by the existing unused suppression in `src/experience/world/greatwar.tsx:5`, unchanged from the branch base. Existing Vite bundle-size advisory remains.

## Explicit unverified areas

No desktop/native UI was used. No browser screenshots, 3D rendering, physical mobile test, performance measurement or native-speaker translation review is claimed. The executor is not reachable from the cloud browser and no deployment preview was available during implementation. Prior isolated-browser attempts on this executor failed before navigation; those were not repeated for this chapter.

Before production acceptance, use a deploy preview to inspect all scenes at desktop, phone portrait and landscape sizes; play each response and replay; check correct/incorrect evidence attempts and negotiation withdrawal; test document focus/scroll/Close/Escape from DOM and spatial markers; inspect reduced motion and source links; change EN→UZ→KO mid-dossier and after agreements; verify exit/back/re-entry resets; confirm the WebGL-unavailable fallback and successful WebGL path; check touch gestures and actual frame time/draw calls on a physical phone. Uzbek and Korean are complete authored translations and still require editorial review by native speakers.
