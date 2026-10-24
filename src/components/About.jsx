import Section from "./Section.jsx";
import { about } from "../data/profile.js";

export default function About() {
  return (
    <Section id="about" route="/about" title="About">
      <div className="prose">
        {about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
      </div>
    </Section>
  );
}
