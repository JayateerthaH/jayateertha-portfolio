import Section from "./Section.jsx";
import { otherProjects } from "../data/profile.js";

export default function OtherProjects() {
  return (
    <Section id="projects" route="/projects" title="Other projects">
      <div className="cards">
        {otherProjects.map((p) => (
          <article key={p.name} className="card">
            <h3>{p.name}</h3>
            <ul className="tags">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            <p>{p.body}</p>
            {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Source code →</a>}
          </article>
        ))}
      </div>
    </Section>
  );
}
