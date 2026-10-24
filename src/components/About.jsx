import Section from "./Section.jsx";
import { about, tour } from "../data/profile.js";

export default function About() {
  return (
    <Section id="about" route="/about" title="About">
      <div className="about-grid">
        <div className="prose">
          {about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
        <aside className="tour" aria-label="Where to start">
          <h3>Short on time?</h3>
          <ol>
            {tour.map(([time, label, href]) => (
              <li key={href}><span className="time">{time}</span><a href={href}>{label}</a></li>
            ))}
          </ol>
        </aside>
      </div>
    </Section>
  );
}
