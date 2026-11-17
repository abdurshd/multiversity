import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as THREE from "three";
import { aiRevolutionScript } from "../scripts/aiRevolution";
import { localizeScript } from "../localizeScript";
import { useCurrentBeat, useExperience } from "../store";
import { AiWorld } from "./AiWorld";
import { AiCamera } from "./AiCamera";
import { aiScenarioBeat } from "./scenario";
import {
  acknowledgeAiStation,
  advanceAiScene,
  chooseAiOption,
  finishAiReview,
  reviewAiStation,
  useAiView,
} from "./state";
import "./ai.css";

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return { reduced, setReduced };
}
const stages: Record<string, number> = {
  arrival: 1,
  evidence: 1,
  evaluation: 2,
  release: 3,
  "pilot-signal": 4,
  "wide-signal": 4,
  "drill-signal": 4,
  incident: 4,
  response: 4,
  "recovery-check": 4,
  accountability: 5,
  end: 5,
};

export default function AiExperience() {
  const { t, i18n } = useTranslation("experience-ai-revolution");
  const state = useExperience();
  const currentBeat = useCurrentBeat();
  const beat = aiScenarioBeat(currentBeat, state.flags, t);
  const [webglAvailable] = useState(hasWebGL);
  const [textOnly, setTextOnly] = useState(!webglAvailable);
  const [sceneFailed, setSceneFailed] = useState(!webglAvailable);
  const { reduced, setReduced } = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const panel = useRef<HTMLElement>(null);
  const previousKey = useRef("");
  const initialized = useRef(false);
  const userDisabledScene = useRef(textOnly);
  userDisabledScene.current = textOnly;
  const env = useRef("ai-campus");
  if (beat && beat.kind !== "ending") env.current = beat.environment;
  const tr = (key: string) => t(`ui.${key}`);

  useEffect(() => {
    const script = localizeScript(aiRevolutionScript, t);
    const current = useExperience.getState();
    if (initialized.current && current.script?.chapterId === script.chapterId) {
      useExperience.setState({
        script,
        ending: current.ending
          ? (script.endings.find((e) => e.id === current.ending?.id) ?? null)
          : null,
      });
    } else current.loadScript(script);
    initialized.current = true;
  }, [t, i18n.language]);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  useEffect(() => {
    const key = `${state.beatId}:${state.phase}:${state.narrationIndex}:${state.activeHotspotId ?? ""}`;
    if (previousKey.current !== key) {
      previousKey.current = key;
      if (panel.current) panel.current.scrollTop = 0;
      heading.current?.focus({ preventScroll: true });
    }
  }, [state.beatId, state.phase, state.narrationIndex, state.activeHotspotId]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") useExperience.getState().openHotspot(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  if (state.script?.chapterId !== "ai-revolution")
    return <div className="ai-experience" />;
  const active =
    beat?.kind === "explore"
      ? beat.hotspots.find((h) => h.id === state.activeHotspotId)
      : null;
  const complete =
    beat?.kind === "explore" &&
    beat.hotspots.every((h) =>
      state.visitedHotspots.includes(`${beat.id}:${h.id}`),
    );
  const choice =
    beat?.kind === "choice"
      ? beat.options.find((o) => `${beat.id}:${o.id}` === selected)
      : null;
  const stage = stages[state.beatId] ?? 1;
  const failScene = () => {
    setSceneFailed(true);
    setTextOnly(true);
  };
  const facts = state.flags.filter((f) =>
    [
      "tested-language",
      "tested-permissions",
      "tested-recovery",
      "pilot",
      "hold",
      "wide",
      "rollback",
      "isolate",
      "continue",
      "accountable",
      "closed",
    ].includes(f),
  );

  return (
    <main className="ai-experience">
      <div className="ai-scene" aria-hidden="true">
        {!textOnly && !sceneFailed && (
          <SceneBoundary onFailure={failScene}>
            <Canvas
              shadows
              dpr={[1, 1.5]}
              camera={{ position: [24, 18, 28], fov: 48, near: 0.1, far: 180 }}
              gl={{
                antialias: true,
                powerPreference: "low-power",
                toneMapping: THREE.ACESFilmicToneMapping,
              }}
              onCreated={({ gl }) =>
                gl.domElement.addEventListener(
                  "webglcontextlost",
                  (event) => {
                    if (!userDisabledScene.current) {
                      event.preventDefault();
                      failScene();
                    }
                  },
                  { once: true },
                )
              }
            >
              <Suspense fallback={null}>
                <AiWorld environment={env.current} />
                <AiCamera reducedMotion={reduced} />
              </Suspense>
            </Canvas>
          </SceneBoundary>
        )}
        {textOnly && (
          <div className="ai-text-backdrop">
            <div className="ai-blueprint">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <span>{tr("textMode")}</span>
          </div>
        )}
      </div>
      <header className="ai-header">
        <Link to="/chapters/ai-revolution">← {tr("exit")}</Link>
        <span className="ai-brand">
          MERIDIAN <span> / {tr("fiction")}</span>
        </span>
        <select
          aria-label={tr("language")}
          value={i18n.language.split("-")[0]}
          onChange={(e) => void i18n.changeLanguage(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="uz">UZ</option>
          <option value="ko">KO</option>
        </select>
      </header>
      {state.phase !== "loading" && (
        <div className="ai-stage" aria-label={tr("progress")}>
          <span>0{stage} / 05</span>
          <span>{tr(`stages.${stage}`)}</span>
          <div>
            {[1, 2, 3, 4, 5].map((n) => (
              <i key={n} className={n <= stage ? "on" : ""} />
            ))}
          </div>
        </div>
      )}
      <section
        ref={panel}
        className={`ai-panel ${state.phase === "loading" || state.phase === "ending" ? "ai-panel-wide" : ""}`}
        aria-label={tr("reviewDesk")}
      >
        {state.phase === "loading" && (
          <>
            <p className="ai-eyebrow">{state.script.era}</p>
            <h1 ref={heading} tabIndex={-1}>
              {state.script.title}
            </h1>
            <p>{tr("intro")}</p>
            <p className="ai-notice">{tr("disclaimer")}</p>
            <div className="ai-facts">
              <span>{tr("duration")}</span>
              <span>{tr("noTimer")}</span>
              <span>{tr("endings")}</span>
            </div>
            <p className="ai-muted">{tr("controls")}</p>
            <button
              className="ai-primary"
              onClick={() => {
                setSelected(null);
                state.begin();
              }}
            >
              {tr("begin")} →
            </button>
          </>
        )}
        {state.phase === "cinematic" && beat?.kind === "cinematic" && (
          <>
            <p className="ai-eyebrow">
              {beat.narration[state.narrationIndex]?.speaker}
            </p>
            <h2 ref={heading} tabIndex={-1} className="ai-narration">
              {beat.narration[state.narrationIndex]?.text}
            </h2>
            <div className="ai-actions">
              <button
                className="ai-primary"
                onClick={() => advanceAiScene(beat.id, state.narrationIndex)}
              >
                {tr("next")} →
              </button>
              <button
                onClick={() =>
                  advanceAiScene(beat.id, state.narrationIndex, true)
                }
              >
                {tr("skip")}
              </button>
            </div>
          </>
        )}
        {state.phase === "explore" && beat?.kind === "explore" && (
          <>
            <p className="ai-eyebrow">
              {tr(beat.id === "recovery-check" ? "checklist" : "evidence")}
            </p>
            <h2 ref={heading} tabIndex={-1}>
              {active ? active.title : beat.prompt}
            </h2>
            {active ? (
              <>
                <p>{active.description}</p>
                <div className="ai-actions">
                  <button
                    className="ai-primary"
                    onClick={() => acknowledgeAiStation(beat.id, active.id)}
                  >
                    {tr(beat.id === "recovery-check" ? "execute" : "record")} ✓
                  </button>
                  <button onClick={() => state.openHotspot(null)}>
                    {tr("back")}
                  </button>
                </div>
              </>
            ) : (
              <>
                <ol className="ai-stations">
                  {beat.hotspots.map((h, index) => {
                    const done = state.visitedHotspots.includes(
                      `${beat.id}:${h.id}`,
                    );
                    const locked =
                      beat.id === "recovery-check" &&
                      beat.hotspots
                        .slice(0, index)
                        .some(
                          (prior) =>
                            !state.visitedHotspots.includes(
                              `${beat.id}:${prior.id}`,
                            ),
                        );
                    return (
                      <li key={h.id}>
                        <button
                          disabled={locked}
                          onClick={() => reviewAiStation(beat.id, h.id)}
                        >
                          <span className="ai-station-number">
                            {done ? "✓" : index + 1}
                          </span>
                          <span>{h.label}</span>
                          <span className="ai-muted">
                            {tr(
                              done ? "reviewed" : locked ? "locked" : "inspect",
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
                <p className="ai-muted" role="status">
                  {t("ui.reviewCount", {
                    count: beat.hotspots.filter((h) =>
                      state.visitedHotspots.includes(`${beat.id}:${h.id}`),
                    ).length,
                  })}
                </p>
                <button
                  className="ai-primary"
                  disabled={!complete}
                  onClick={() => finishAiReview(beat.id)}
                >
                  {tr("continue")} →
                </button>
              </>
            )}
          </>
        )}
        {state.phase === "choice" && beat?.kind === "choice" && (
          <>
            <p className="ai-eyebrow">{tr("decision")}</p>
            <h2 ref={heading} tabIndex={-1}>
              {beat.title}
            </h2>
            <p>{beat.prompt}</p>
            {beat.id === "release" && (
              <div className="ai-test-results">
                <h3>{tr("results")}</h3>
                {["language", "permissions", "recovery"].map((test) => (
                  <p key={test}>
                    {tr(
                      `tests.${test}.${state.flags.includes(`tested-${test}`) ? "known" : "unknown"}`,
                    )}
                  </p>
                ))}
              </div>
            )}
            <div className="ai-choices" role="group" aria-label={beat.title}>
              {beat.options.map((o) => (
                <button
                  aria-pressed={choice?.id === o.id}
                  key={o.id}
                  onClick={() => setSelected(`${beat.id}:${o.id}`)}
                >
                  <span className="ai-option-mark">{o.icon}</span>
                  <span>
                    <strong>{o.label}</strong>
                    <small>{o.description}</small>
                  </span>
                </button>
              ))}
            </div>
            <button
              className="ai-primary"
              disabled={!choice}
              onClick={() => {
                if (choice) chooseAiOption(beat.id, choice.id);
                setSelected(null);
              }}
            >
              {tr("commit")} →
            </button>
          </>
        )}
        {state.phase === "ending" && state.ending && (
          <>
            <p className="ai-eyebrow">
              {tr("debrief")} · {tr("fiction")}
            </p>
            <h1 ref={heading} tabIndex={-1}>
              {state.ending.title}
            </h1>
            <p className="ai-subtitle">{state.ending.subtitle}</p>
            {state.ending.epilogue.map((line, index) => (
              <p key={index}>{line.text}</p>
            ))}
            <h2>{tr("recordTitle")}</h2>
            <ul className="ai-run-record">
              {facts.map((flag) => (
                <li key={flag}>{tr(`flags.${flag}`)}</li>
              ))}
            </ul>
            <div className="ai-test-results">
              <h2>{tr("uncertainty")}</h2>
              {["language", "permissions", "recovery"]
                .filter((test) => !state.flags.includes(`tested-${test}`))
                .map((test) => (
                  <p key={test}>{tr(`tests.${test}.unknown`)}</p>
                ))}
            </div>
            <p className="ai-notice">{tr("reflection")}</p>
            <p className="ai-muted">
              {tr("sourceNote")}{" "}
              <a
                href="https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"
                target="_blank"
                rel="noreferrer"
              >
                NIST AI RMF 1.0 ↗
              </a>
            </p>
            <div className="ai-actions">
              <button
                className="ai-primary"
                onClick={() => {
                  setSelected(null);
                  state.reset();
                }}
              >
                {tr("replay")} ↶
              </button>
              <Link to="/chapters/ai-revolution">{tr("chapter")}</Link>
            </div>
          </>
        )}
      </section>
      {facts.length > 0 && state.phase !== "ending" && (
        <details className="ai-ledger">
          <summary>
            {tr("recordTitle")} · {facts.length}
          </summary>
          <ul>
            {facts.map((flag) => (
              <li key={flag}>{tr(`flags.${flag}`)}</li>
            ))}
          </ul>
        </details>
      )}
      <footer className="ai-tools">
        {state.phase === "explore" && !textOnly && (
          <div className="ai-camera-tools">
            <button
              onClick={() => useAiView.getState().request("in")}
              aria-label={tr("zoomIn")}
            >
              ＋
            </button>
            <button
              onClick={() => useAiView.getState().request("out")}
              aria-label={tr("zoomOut")}
            >
              −
            </button>
            <button onClick={() => useAiView.getState().request("home")}>
              {tr("overview")}
            </button>
          </div>
        )}
        <label>
          <input
            type="checkbox"
            checked={reduced}
            onChange={(e) => setReduced(e.target.checked)}
          />
          {tr("reduceMotion")}
        </label>
        <label>
          <input
            type="checkbox"
            checked={textOnly}
            disabled={sceneFailed}
            onChange={(e) => setTextOnly(e.target.checked)}
          />
          {tr("textMode")}
        </label>
        {sceneFailed && <span role="status">{tr("webgl")}</span>}
      </footer>
    </main>
  );
}
