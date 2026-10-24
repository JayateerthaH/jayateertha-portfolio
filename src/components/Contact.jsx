import { useState } from "react";
import Section from "./Section.jsx";
import { profile } from "../data/profile.js";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard?.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }, () => {});
  }

  return (
    <Section id="contact" method="POST" route="/contact" title="Get in touch">
      <p className="lede">Open to {profile.openTo}. The fastest way to reach me is email.</p>
      <div className="contact">
        <div className="email-row">
          <a href={`mailto:${profile.email}`} className="email">{profile.email}</a>
          <button type="button" className="btn ghost" onClick={copyEmail}>{copied ? "Copied" : "Copy email"}</button>
        </div>
        <ul className="contact-links">
          <li><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href={profile.links.leetcode} target="_blank" rel="noreferrer">LeetCode</a></li>
        </ul>
      </div>
      <footer className="footer">© {new Date().getFullYear()} {profile.name}</footer>
    </Section>
  );
}
