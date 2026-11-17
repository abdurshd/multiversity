/* Deterministic narrative and UI-action tests. GPU and real-device touch are separate. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
      fileName: filename,
    }).outputText,
    filename,
  );
const {
  aiRevolutionScript: script,
  aiReviewNext,
} = require("../src/experience/scripts/aiRevolution.ts");
const { useExperience } = require("../src/experience/store.ts");
const {
  reviewAiStation,
  acknowledgeAiStation,
  finishAiReview,
  chooseAiOption,
  advanceAiScene,
  useAiView,
} = require("../src/experience/ai/state.ts");
const { localizeScript } = require("../src/experience/localizeScript.ts");
const { aiScenarioBeat } = require("../src/experience/ai/scenario.ts");
const state = () => useExperience.getState();
let count = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  count++;
};
const reachable = new Set();
function graph(id) {
  check(!!script.beats[id], `Target ${id} exists`);
  if (reachable.has(id)) return;
  reachable.add(id);
  const beat = script.beats[id];
  check(beat.id === id, `Stable id ${id}`);
  check(beat.kind !== "battle", "No disguised combat");
  if (beat.kind === "cinematic") {
    check(
      beat.narration.length &&
        beat.shots.every(
          (s) => s.duration > 0 && s.path.length >= 2 && s.lookPath.length,
        ),
      "Cinematic valid",
    );
    graph(beat.next);
  }
  if (beat.kind === "explore") {
    check(beat.hotspots.length === 3, "Three evidence stations");
    graph(aiReviewNext[id]);
  }
  if (beat.kind === "choice") beat.options.forEach((o) => graph(o.next));
}
graph(script.startBeat);
check(
  reachable.size === Object.keys(script.beats).length,
  "Every beat reachable",
);
function start() {
  state().loadScript(script);
  state().begin();
  check(
    advanceAiScene(state().beatId, state().narrationIndex, true),
    "Current scene can be skipped",
  );
}
function review() {
  const b = script.beats[state().beatId];
  check(!finishAiReview(b.id), "Cannot bypass required evidence");
  check(!reviewAiStation(b.id, "invalid"), "Reject unknown station");
  if (b.id === "recovery-check")
    check(
      !reviewAiStation(b.id, "verify"),
      "Cannot verify before freeze and restore",
    );
  b.hotspots.forEach((h) => {
    check(reviewAiStation(b.id, h.id), "Open evidence");
    state().openHotspot(null);
    check(
      !state().visitedHotspots.includes(`${b.id}:${h.id}`),
      "Dismiss without recording does not grant progress",
    );
    check(!acknowledgeAiStation(b.id, h.id), "Cannot record a closed card");
    reviewAiStation(b.id, h.id);
    check(acknowledgeAiStation(b.id, h.id), "Acknowledge evidence");
    const before = state().visitedHotspots.length;
    reviewAiStation(b.id, h.id);
    acknowledgeAiStation(b.id, h.id);
    check(
      state().visitedHotspots.length === before,
      "Repeated review is idempotent",
    );
  });
  check(finishAiReview(b.id), "All evidence unlocks continuation");
  check(!finishAiReview(b.id), "Repeated continue cannot skip new beat");
}
function choose(option) {
  const id = state().beatId;
  check(!chooseAiOption(id, "invalid"), "Unknown option rejected");
  check(chooseAiOption(id, option), `Choice ${id}:${option} accepted`);
  check(!chooseAiOption(id, option), "Stale double activation rejected");
}
const endings = new Set();
let paths = 0;
for (const evaluation of ["people", "systems", "coverage"])
  for (const release of ["pilot", "hold", "wide"])
    for (const response of ["rollback", "isolate", "continue"])
      for (const account of ["public", "internal"]) {
        start();
        review();
        choose(evaluation);
        choose(release);
        check(
          state().beatId ===
            {
              pilot: "pilot-signal",
              hold: "drill-signal",
              wide: "wide-signal",
            }[release],
          "Release has distinct incident framing",
        );
        check(
          advanceAiScene(state().beatId, state().narrationIndex, true),
          "Current scene can be skipped",
        );
        review();
        choose(response);
        if (response === "rollback") review();
        choose(account);
        const expected =
          response === "continue" && release !== "hold"
            ? "exposure"
            : account === "internal"
              ? "closed"
              : release === "hold"
                ? "hold"
                : release === "pilot" && evaluation !== "coverage"
                  ? "staged"
                  : "repair";
        check(
          state().phase === "ending" && state().ending.id === expected,
          `Outcome ${evaluation}/${release}/${response}/${account} => ${expected}`,
        );
        check(
          state().flags.length === 5,
          "Exactly two test flags and three policy decisions",
        );
        endings.add(state().ending.id);
        paths++;
        state().reset();
        check(
          state().phase === "loading" &&
            !state().ending &&
            !state().activeHotspotId &&
            state().flags.length === 0 &&
            state().visitedHotspots.length === 0 &&
            state().narrationIndex === 0,
          "Replay fully resets",
        );
      }
check(endings.size === script.endings.length, "All five endings reachable");
state().loadScript(script);
check(!advanceAiScene("arrival", 0), "Cannot advance before beginning");
state().begin();
check(!advanceAiScene("arrival", -1), "Invalid narration index rejected");
check(advanceAiScene("arrival", 0), "Current narration line advances");
check(
  !advanceAiScene("arrival", 0),
  "Repeated Continue cannot consume next line",
);
check(
  !advanceAiScene("arrival", 0, true),
  "Delayed Skip cannot consume a newer line",
);
check(
  state().beatId === "arrival" && state().narrationIndex === 1,
  "Repeated controls leave newer narration intact",
);
check(
  advanceAiScene("arrival", 1),
  "Current final line advances to exploration",
);
check(state().beatId === "evidence", "Manual intro equals skipped intro");
check(!advanceAiScene("arrival", 1), "Repeated final-line Continue is inert");
check(!advanceAiScene("arrival", 1, true), "Repeated final-line Skip is inert");
check(!advanceAiScene("evidence", 0, true), "Skip is inert outside cinematics");
for (const scene of ["pilot-signal", "drill-signal", "wide-signal"]) {
  state().gotoBeat(scene);
  check(
    !advanceAiScene("arrival", 0, true),
    "Stale previous-scene Skip cannot skip a later cinematic",
  );
  check(
    state().beatId === scene,
    "Stale scene callback preserves current scene",
  );
  check(
    advanceAiScene(scene, 0, true),
    "Current incident scene can be skipped",
  );
  check(!advanceAiScene(scene, 0, true), "Repeated incident Skip is inert");
  check(!advanceAiScene(scene, 0), "Delayed Continue after Skip is inert");
}
state().reset();
check(
  !advanceAiScene("wide-signal", 0, true),
  "Late callback after reset is inert",
);
state().loadScript({ ...script, chapterId: "other-chapter" });
state().begin();
check(
  !advanceAiScene("arrival", 0),
  "AI controls cannot advance another chapter",
);
start();
const before = JSON.stringify({
  stats: state().stats,
  flags: state().flags,
  beatId: state().beatId,
  visited: state().visitedHotspots,
});
for (const command of ["home", "in", "out", "home"])
  useAiView.getState().request(command);
check(
  before ===
    JSON.stringify({
      stats: state().stats,
      flags: state().flags,
      beatId: state().beatId,
      visited: state().visitedHotspots,
    }),
  "Camera does not change story",
);
const flatten = (value, prefix = "", result = {}) => {
  for (const [key, v] of Object.entries(value)) {
    const p = prefix ? `${prefix}.${key}` : key;
    if (typeof v === "string") result[p] = v;
    else if (v && typeof v === "object") flatten(v, p, result);
  }
  return result;
};
const en = JSON.parse(
  fs.readFileSync("src/locales/en/experience/ai-revolution.json", "utf8"),
);
const baseline = flatten(en);
for (const lang of ["en", "uz", "ko"]) {
  const locale = JSON.parse(
    fs.readFileSync(
      `src/locales/${lang}/experience/ai-revolution.json`,
      "utf8",
    ),
  );
  const flat = flatten(locale);
  check(
    JSON.stringify(Object.keys(flat).sort()) ===
      JSON.stringify(Object.keys(baseline).sort()),
    `${lang}: same locale keys`,
  );
  check(
    Object.values(flat).every((v) => v.trim().length > 0),
    `${lang}: no blanks`,
  );
  if (lang !== "en")
    check(
      Object.keys(flat).every((key) => flat[key] !== baseline[key]),
      `${lang}: every displayed string translated`,
    );
  const lookup = (key, options = {}) =>
    flat[key.replace("experience-ai-revolution:", "")] ??
    options.defaultValue ??
    key;
  for (const beatId of [
    "incident",
    "response",
    "recovery-check",
    "accountability",
  ]) {
    const original = script.beats[beatId];
    const saved = JSON.stringify(original);
    const drill = aiScenarioBeat(original, ["hold"], lookup);
    const expected = locale.drill[beatId];
    check(
      drill.prompt === expected.prompt,
      `${lang}/${beatId}: hold uses localized drill framing`,
    );
    if (original.kind === "explore") {
      for (const station of drill.hotspots) {
        const override = expected.hotspots[station.id];
        for (const [key, value] of Object.entries(override))
          check(
            station[key] === value,
            `${lang}/${beatId}/${station.id}: drill ${key} used`,
          );
      }
      check(
        JSON.stringify(drill.hotspots.map((h) => h.id)) ===
          JSON.stringify(original.hotspots.map((h) => h.id)),
        "Drill copy preserves checklist IDs",
      );
    } else {
      for (const option of drill.options)
        for (const [key, value] of Object.entries(expected.options[option.id]))
          check(
            option[key] === value,
            `${lang}/${beatId}/${option.id}: drill ${key} used`,
          );
      check(
        JSON.stringify(drill.options.map((o) => [o.id, o.next, o.flags])) ===
          JSON.stringify(original.options.map((o) => [o.id, o.next, o.flags])),
        "Drill copy preserves decision graph",
      );
    }
    check(
      JSON.stringify(original) === saved,
      "Drill copy never mutates source beat",
    );
    check(
      aiScenarioBeat(original, ["pilot"], lookup) === original &&
        aiScenarioBeat(original, ["wide"], lookup) === original,
      "Non-hold branches retain public-incident copy",
    );
  }
  const fallbackDrill = aiScenarioBeat(
    script.beats.incident,
    ["hold"],
    (_key, opts) => opts.defaultValue,
  );
  check(
    fallbackDrill.prompt === en.drill.incident.prompt,
    "Missing translation falls back to drill-safe English",
  );
  const missing = [];
  const localized = localizeScript(script, (key) => {
    const k = key.replace("experience-ai-revolution:", "");
    if (!flat[k]) missing.push(k);
    return flat[k] ?? key;
  });
  check(!missing.length, `${lang}: every narrative field covered: ${missing}`);
  check(
    localized.beats.release.options[0].next ===
      script.beats.release.options[0].next,
    "Localization cannot rewrite graph",
  );
}
const uiSource = fs.readFileSync("src/experience/ai/AiExperience.tsx", "utf8");
const uiKeys = [...uiSource.matchAll(/tr\((['"])([^'"]+)\1\)/g)];
check(uiKeys.length > 20, "UI translation scan found literal calls");
for (const [, , key] of uiKeys)
  check(!!baseline[`ui.${key}`], `UI literal key ${key} exists`);
check(
  !script.endings.some((e) => e.linkedTimelineId),
  "No misleading link from bounded deployment outcomes to old cosmic-future timelines",
);
console.log(
  `AI checks passed: ${count} assertions; ${paths} full paths; ${reachable.size} beats; ${endings.size} endings; EN/UZ/KO complete. No GPU or physical-touch validation claimed.`,
);
