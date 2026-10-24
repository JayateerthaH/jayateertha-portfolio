import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>© {new Date().getFullYear()} {profile.name} · Built with React and deployed on Vercel</p>
        <ul>
          <li><a href={`mailto:${profile.email}`}>Email</a></li>
          <li><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href={profile.links.leetcode} target="_blank" rel="noreferrer">LeetCode</a></li>
          <li><a href="#top">Back to top ↑</a></li>
        </ul>
      </div>
    </footer>
  );
}
