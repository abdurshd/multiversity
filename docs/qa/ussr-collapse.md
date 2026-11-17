# The Last Union: 1991 episode

## Scope and design

Independent branch `feat/episode-ussr-collapse`, based on main `a2826b8`.
Entry: `/experience/ussr-collapse`.

A fictional inter-republic liaison studies six dispatches and negotiates five policy decisions. This is a noncombat chapter about consent, public safety, transport, social obligations and authority. There are 13 graph nodes, 40 complete decision combinations, and five reachable endings. Cinematics are user-paced, with a scene skip. Two three-report gates introduce the competing obligations before decisions.

- **Authority:** emergency directives undermine the proposal's legitimacy.
- **Voluntary compact:** consent + supply + rights + association + coordination keep discussion open. This does **not** proclaim that the USSR survives or force any republic to join.
- **Protected separation:** consent + supply + rights + sovereignty + coordination produce an explicitly hypothetical safety-net scenario, not guaranteed prosperity.
- **Unfinished obligations:** other packages expose missing protections without predicting war.
- **Historical record:** the player explicitly sets the experiment aside to read documented events. This ending takes precedence over simulation flags.

No existing alternate-timeline link is attached: the repository's authoritarian preserved-union, restored-monarchy and other broad timelines do not describe these limited scenarios. Cold War and every existing chapter remain unchanged in substance.

## Historical method and sources (checked 17 November 2026)

All dialogue is original indirect narration. No invented quotations are attributed to real leaders. The liaison, municipal square, negotiation room, dispatches, exact sequence of working sessions, numerical meters, and causal outcomes are **fictional/compressed teaching devices**. Labels distinguish factual checkpoints from experiments in all three languages. The player cannot undo the Ukrainian referendum, command all republics or guarantee peace.

Primary / official references:

1. **CIS, Alma-Ata Declaration, 21 December 1991.** [Primary Russian text hosted by UNHCR Refworld](https://www.refworld.org/sites/default/files/2025-06/alma-ata_declaration.pdf), both pages read. Lists eleven participants, affirms sovereignty and minority rights, describes coordination and strategic-force arrangements, and says the CIS is neither a state nor a suprastate. Supports the historical ending and the distinction between cooperation and a new federal state. It is a commitment, not proof of successful implementation.
2. **Verkhovna Rada, referendum commemoration.** [Official parliamentary page](https://www.rada.gov.ua/en/print/230954.html), read. Confirms the 1 December 1991 independence vote and 90.32% support. The script carefully says participating voters, not all citizens. [The 24 August declaration and referendum authorization](https://zakon.rada.gov.ua/rada/show/en/1427-12) is a primary legal source surfaced in search.
3. **U.S. Department of State, Office of the Historian.** [The Berlin Wall Falls and USSR Dissolves](https://history.state.gov/departmenthistory/short-history/berlinwall), read; supports Gorbachev's 25 December resignation. [Official chronology](https://2001-2009.state.gov/p/eur/ci/rs/c22305.htm) indexed search excerpt supports the 8 December Belarus/Russia/Ukraine agreement. Direct archived chronology retrieval returned a technical restriction; no verbatim quotation is used.
4. **George H. W. Bush Presidential Library.** [Post-coup Soviet Union records collection](https://www.bush41library.gov/digital-research-room/finding-aid/foia/records-us-policy-toward-post-coup-soviet-unionformer-soviet), official archival finding aid, indexed result confirms the failed August coup and subsequent dissolution context. The chapter does not invent specific actions by individuals during it.
5. **IMF, Annual Report 1992.** [Official PDF](https://www.imf.org/external/pubs/ft/ar/archive/pdf/ar1992.pdf) and [World Economic Outlook chapter](https://www.elibrary.imf.org/display/book/9781451945065/ch004.xml), indexed official excerpts support 1991 output, supply and inter-republic trade disruption. Direct full-text retrieval was blocked with HTTP 403. Only this broad supported claim is used; the game meters are not attributed to the IMF or presented as GDP, inflation or casualty statistics.
6. **UN Dag Hammarskjöld Library.** [December 1991 membership correspondence guide](https://ask.un.org/faq/378083), read, provides further primary archival links and clarifies the international institutional transition. No simplified claim that all successor states automatically inherited UN membership is made.

The UI exposes four relevant source links with localized descriptions and disclosure text. Human editorial review of Uzbek and Korean is advisable before treating this as professionally reviewed historical translation.

## Environment and performance approach

Two original procedural compositions, no purchased/downloaded assets:

- Late-Soviet civic square: concrete housing facades with inset windows/sills, government doors/pilasters and accessible steps, road markings, a delivery bus, food kiosk and crates, public notices, radio table, benches, planters, lights and human-scale civilians. The square's three evidence destinations occupy distinct positions.
- Administrative negotiation room: parquet grid, tall windows and radiators, wood panelling, eleven equal table places, chairs, folders, papers, cups, communication desks, clerks, filing cabinets and a freestanding memorandum board.

Static props/windows are instanced by material, not one mesh/draw per object. No emblems, paid art, remote fonts or portraits. Approximate metre-scale geometry is deliberately a composite, not a surveyed Moscow/Alma-Ata reconstruction. Rendered visual quality, draw-call totals, FPS, GPU memory and physical mobile performance **have not been measured** in this executor.

Chapter-only camera supports drag/pinch plus five labelled 44px buttons (left/right/zoom in/out/reset overview), report close-up framing, bounded distance and angle, and reduced-motion snapshots. The DOM panel has a bounded scroll area, portrait/landscape rules, native buttons, visible focus, a focusable changing heading, readable source disclosures and a complete keyboard path. Decision functions validate current beat/phase/option and ignore stale/double taps before applying effects. No battle engine changes.

## Verification

Passed on final code:

- `npm ci --cache /tmp/multiversity-ussr-npm`
- `npx tsc --noEmit`
- `node scripts/test-ussr.cjs`: **5,743 assertions**, all **13** reachable beats, **40** complete decision combinations each with full narration and scene skipping, all **5** reachable outcomes, exact **EN/UZ/KO** translation-key parity and no missing script translation fallback.
- Tests cover evidence locks, repeated evidence selection, report dismissal, camera-command story-state isolation, invalid/stale/double choice calls, repeat skip/advance, ending precedence, finite graph traversal, clamped meters and clean replay resets.
- Focused ESLint across **all new and modified TS/TSX files** with `--max-warnings 0`.
- `npm run build`: successful. Vite reports its existing-style >500kB chunk warning; this is not a runtime performance measurement.
- `node scripts/test-timur.cjs`: existing chapter regression passes, 114 assertions and 20 reachable beats.
- `git diff --check`.

### Explicitly not verified

Cloud browser request to `http://127.0.0.1:5184/experience/ussr-collapse` failed with **ERR_CONNECTION_REFUSED** because the cloud browser host cannot reach this executor's loopback. Vite itself runs successfully on 127.0.0.1; `--host 0.0.0.0` instead encounters the sandbox `uv_interface_addresses` system error. No forwarding is available. The shared desktop was deliberately not used.

Therefore **no actual browser screenshots, WebGL render, touch gesture, physical-device, screen-reader or rendered mobile-layout pass is claimed**. Parent context also notes a separate baseline WebGL creation failure, but this worker did not reach WebGL and does not report reproducing that error. Pure action tests are not visual or physical input tests. No combat test is applicable.

### Preview acceptance checklist still required

1. Open the chapter in EN/UZ/KO at desktop, 390×844 portrait, 360×640 small portrait and 844×390 landscape. Confirm sources/long Korean and Uzbek labels remain readable and panel scrolling does not hide exit/camera controls.
2. Inspect both 3D sets, report close-ups, blocked sight lines, shadows and any z-fighting; capture real screenshots. Check kiosk, eleven seats and window batches at human-scale camera distances.
3. Play one full and one skipped run using touch, then keyboard only. Verify panel/camera gestures do not interfere, focus remains visible, and a report close restores the overview.
4. Replay each scenario from the menu. Double-tap a choice and Continue, then exit and browser-back/reload. `?beat=` is an authoring jump, not a saved-game restoration, and supplies no prior choice flags.
5. Measure mobile draw calls/FPS and memory; verify reduced-motion behaviour, context-loss handling and screen-reader announcements. The chapter-only Canvas boundary keeps the DOM exercise mounted on render/initialization failure; inducing and visually inspecting that fallback still requires browser QA.

## Integration surface

New chapter-local script, scene, camera, overlay, CSS, actions, three locale JSON files and this regression/QA documentation. Small opt-in additions only in `scripts/index.ts`, environment type/registry/renderer, `i18n.ts`, overlay dispatch and `Experience3D.tsx` camera dispatch. A chapter-only renderer error boundary leaves all DOM reports, choices and endings playable when initialization fails. Its notice is localized in EN/UZ/KO; other chapters retain their previous error handling. Beat/phase/narration changes reset the story panel scroll; opened reports receive focus and scroll into view, and Close/Escape restore focus to the report button. No global store/battle mechanics changed. Independent sibling PRs may touch these registration sites; preserve both registrations when merging.

### Async renderer failure review correction

Parent preview testing of another chapter demonstrated that an R3F async WebGL initialization failure can bypass a React error boundary. This chapter now probes WebGL2 **before mounting Canvas** and renders the translated fallback notice if creation is unavailable or throws. The probe releases its temporary context. The class boundary remains for ordinary render failures, and the DOM exercise is outside both. Seven injected-stub assertions cover the capability gate; these are not GPU/browser validation. Final regression total: **5,743 assertions**.
