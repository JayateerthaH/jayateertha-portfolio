import { useEffect, useState } from "react";
import { profile } from "../data/profile.js";

const NAV = [["about", "About"], ["work", "Microservices"], ["campusevents", "Monolith"], ["trace", "Request flow"], ["skills", "Skills"], ["background", "Education"], ["contact", "Contact"]];

function readTheme() {
  try { return localStorage.getItem("theme"); } catch { return null; }
}

// Highlights the nav link of the section currently in view.
function useActiveSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const els = NAV.map(([id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (seen.length) setActive(seen[0].target.id);
    }, { rootMargin: "-80px 0px -55% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Header() {
  const [theme, setTheme] = useState(readTheme);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
    else delete document.documentElement.dataset.theme;
  }, [theme]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggle() {
    const dark = theme ? theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch { /* storage blocked */ }
  }

  const links = NAV.map(([id, label]) => (
    <a key={id} href={`#${id}`} className={active === id ? "on" : undefined} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>
  ));

  return (
    <header className="site-header">
      <a className="skip" href="#about">Skip to content</a>
      <div className="wrap header-inner">
        <a href="#top" className="logo">{profile.name}</a>
        <nav className="desktop-nav" aria-label="Sections">{links}</nav>
        <button type="button" className="icon-btn" onClick={toggle} aria-label="Switch light or dark theme" title="Light / dark">
          <span aria-hidden="true">◐</span>
        </button>
        <button type="button" className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"}>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>
      {open && <nav id="mobile-nav" className="mobile-nav wrap" aria-label="Sections">{links}</nav>}
    </header>
  );
}
