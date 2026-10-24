import { useEffect, useState } from "react";
import Section from "./Section.jsx";
import { traces } from "../data/profile.js";

// Steps one registration request through either architecture, layer by layer.
export default function RequestTrace() {
  const [mode, setMode] = useState("microservices");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const trace = traces[mode];
  const steps = trace.steps;

  useEffect(() => {
    if (!playing) return undefined;
    const t = setInterval(() => {
      setActive((i) => {
        if (i >= steps.length - 1) { setPlaying(false); return i; }
        return i + 1;
      });
    }, 1700);
    return () => clearInterval(t);
  }, [playing, steps.length]);

  function choose(m) {
    setMode(m);
    setActive(0);
    setPlaying(false);
  }

  const step = steps[active];

  return (
    <Section id="trace" method="POST" route="/event/{id}/register" title="Follow one request, two architectures">
      <p className="lede">What happens when a student taps Register, in the microservices version and in the monolith. Compare where authentication happens and when the ticket is sent.</p>
      <div className="seg" role="tablist" aria-label="Architecture">
        {Object.entries(traces).map(([key, t]) => (
          <button key={key} type="button" role="tab" aria-selected={mode === key} onClick={() => choose(key)}>{t.label}</button>
        ))}
      </div>
      <p className="route trace-route">{trace.route}</p>
      <div className="trace">
        <ol className="trace-steps">
          {steps.map((s, i) => (
            <li key={s.at}>
              <button
                type="button"
                className={i === active ? "on" : i < active ? "past" : ""}
                onClick={() => { setPlaying(false); setActive(i); }}
                aria-current={i === active ? "step" : undefined}
              >
                <span className="n">{i + 1}</span>
                <span className="at">{s.at}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="trace-detail" aria-live="polite">
          <p className="route"><span className="method method-post">{active + 1}/{steps.length}</span> {step.at}</p>
          <h4>{step.what}</h4>
          <p>{step.detail}</p>
          <div className="actions">
            <button type="button" className="btn" onClick={() => { setActive(0); setPlaying(true); }} disabled={playing}>{playing ? "Playing…" : "Play request"}</button>
            <button type="button" className="btn ghost" onClick={() => { setPlaying(false); setActive((i) => Math.max(0, i - 1)); }} disabled={active === 0}>Back</button>
            <button type="button" className="btn ghost" onClick={() => { setPlaying(false); setActive((i) => Math.min(steps.length - 1, i + 1)); }} disabled={active === steps.length - 1}>Next</button>
          </div>
        </div>
      </div>
    </Section>
  );
}
