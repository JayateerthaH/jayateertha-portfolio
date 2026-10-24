import { useEffect, useState } from "react";
import { profile } from "../data/profile.js";

const NAV = [["work", "Microservices"], ["campusevents", "Monolith"], ["trace", "Request flow"], ["skills", "Skills"], ["contact", "Contact"]];

function readTheme() {
  try { return localStorage.getItem("theme"); } catch { return null; }
}

export default function Header() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
    else delete document.documentElement.dataset.theme;
  }, [theme]);

  function toggle() {
    const dark = theme ? theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch { /* storage blocked */ }
  }

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a href="#top" className="logo">{profile.name}</a>
        <nav aria-label="Sections">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <button type="button" className="theme-toggle" onClick={toggle} aria-label="Switch light or dark theme">
          <span aria-hidden="true">◐</span>
        </button>
      </div>
    </header>
  );
}
