import { profile } from "../data/profile.js";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <p className="eyebrow">{profile.role} · {profile.location}</p>
          <h1>{profile.name}</h1>
          <p className="headline">{profile.headline}</p>
          <div className="actions">
            <a className="btn" href="#work">See my work</a>
            {profile.resumeUrl && <a className="btn ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume (PDF)</a>}
            <a className="btn ghost" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <p className="open-to"><span className="dot" aria-hidden="true" /> Open to: {profile.openTo}</p>
        </div>
        <aside className="response" aria-label="Project summary as an API response">
          <div className="response-bar"><span className="status">200 OK</span><span>GET /event-platform</span></div>
          <pre>{`{
  "v1": {
    "architecture": "microservices",
    "services": 10,
    "databases": 6,
    "stack": ["Spring Cloud Gateway",
              "Eureka", "OpenFeign"]
  },
  "v2": {
    "architecture": "modular monolith",
    "memory": "512 MB",
    "startup": "74s → 34s",
    "live": true
  }
}`}</pre>
        </aside>
      </div>
    </section>
  );
}
