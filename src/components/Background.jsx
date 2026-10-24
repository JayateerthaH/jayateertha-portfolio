import Section from "./Section.jsx";
import { education, achievements } from "../data/profile.js";

export default function Background() {
  return (
    <Section id="background" route="/education" title="Education and achievements">
      <div className="two-col">
        <div className="card">
          <h3>{education.school}</h3>
          <p>{education.degree}</p>
          <p className="meta">{education.dates} · {education.grade}</p>
        </div>
        <ul className="plain">{achievements.map((a) => <li key={a}>{a}</li>)}</ul>
      </div>
    </Section>
  );
}
