import Section from "./Section.jsx";
import Architecture from "./Architecture.jsx";

// One project case study: links, numbers, architecture, decisions with trade-offs, lessons.
export default function Featured({ project, id }) {
  const p = project;
  return (
    <Section id={id} route={p.route} title={p.name}>
      <p className="lede">{p.tagline}</p>
      {(p.live || p.repo) && (
        <div className="actions">
          {p.live && <a className="btn" href={p.live} target="_blank" rel="noreferrer">Open live app</a>}
          {p.repo && <a className="btn ghost" href={p.repo} target="_blank" rel="noreferrer">Source code</a>}
        </div>
      )}
      <p className="small">{p.status}</p>

      <dl className="numbers">
        {p.numbers.map(([v, l]) => (
          <div key={l}><dt>{l}</dt><dd>{v}</dd></div>
        ))}
      </dl>

      {p.showArchitecture && <Architecture />}

      <h3 className="sub">Stack</h3>
      <ul className="tags">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>

      <h3 className="sub">Engineering decisions</h3>
      <div className="decisions">
        {p.decisions.map((d) => (
          <article key={d.title} className="decision">
            <h4>{d.title}</h4>
            <p>{d.body}</p>
            <p className="tradeoff"><span>Trade-off</span>{d.tradeoff}</p>
          </article>
        ))}
      </div>

      <h3 className="sub">{p.lessonsTitle}</h3>
      <ul className="next">{p.lessons.map((n) => <li key={n}>{n}</li>)}</ul>
    </Section>
  );
}
