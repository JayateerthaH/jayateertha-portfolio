import Section from "./Section.jsx";
import { skills, learning, problemSolving, profile } from "../data/profile.js";

export default function Skills() {
  return (
    <Section id="skills" route="/skills" title="Skills">
      <div className="skills">
        {skills.map(([group, items]) => (
          <div key={group} className="skill-row">
            <h4>{group}</h4>
            <ul className="tags">{items.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        ))}
        <div className="skill-row learning">
          <h4>Currently learning</h4>
          <ul className="tags dashed">{learning.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>

      <div className="ps">
        <div className="ps-num">
          <span>{problemSolving.solved}</span>
          <small>problems solved</small>
        </div>
        {problemSolving.rating && (
          <div className="ps-num">
            <span>{problemSolving.rating}</span>
            <small>LeetCode contest rating</small>
          </div>
        )}
        <p>{problemSolving.note} <a href={profile.links.leetcode} target="_blank" rel="noreferrer">LeetCode profile →</a></p>
      </div>
    </Section>
  );
}
