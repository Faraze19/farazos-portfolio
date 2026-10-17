import { useState } from "react";
import {
  Network,
  Server,
  Wrench,
  ShieldCheck,
  Headset,
  Terminal,
  Cloud,
  UsersRound,
} from "lucide-react";
import { filterResumeSkills, resumeSkillCategories } from "../lib/resumeSkills";
const icons = {
  networking: Network,
  systems: Server,
  tools: Wrench,
  security: ShieldCheck,
  support: Headset,
  scripting: Terminal,
  cloud: Cloud,
  professional: UsersRound,
};
export function ResumeSkills() {
  const [selected, setSelected] = useState("all");
  const [includeProposed, setIncludeProposed] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const groups = filterResumeSkills(selected, includeProposed);
  return (
    <section className="resume-skills" aria-labelledby="resume-skills-title">
      <div className="resume-section-heading">
        <h3 id="resume-skills-title">Technical skills</h3>
        <span>Explore by area</span>
      </div>
      <p className="resume-skills-guidance">
        Confirmed skills reflect the background supplied for this portfolio.
        Proposed skills are unverified and are not established competencies.
      </p>
      <div
        className="resume-skill-filters"
        role="group"
        aria-label="Filter technical skills"
      >
        <button
          aria-pressed={selected === "all"}
          onClick={() => setSelected("all")}
        >
          All skills
        </button>
        {resumeSkillCategories.map((category) => {
          const Icon = icons[category.id as keyof typeof icons];
          return (
            <button
              key={category.id}
              aria-pressed={selected === category.id}
              onClick={() => setSelected(category.id)}
            >
              <Icon size={13} aria-hidden="true" />
              {category.name}
            </button>
          );
        })}
      </div>
      <div className="resume-skill-options">
        <label>
          <input
            type="checkbox"
            checked={includeProposed}
            onChange={(e) => setIncludeProposed(e.target.checked)}
          />{" "}
          Show proposed skills (unverified)
        </label>
        <label>
          <input
            type="checkbox"
            checked={showExperience}
            onChange={(e) => setShowExperience(e.target.checked)}
          />{" "}
          Show experience labels
        </label>
      </div>
      <p className="resume-skill-count" role="status">
        {groups.reduce((count, group) => count + group.skills.length, 0)} skills
        shown ·{" "}
        {includeProposed
          ? "Includes clearly marked unverified proposals"
          : "Confirmed skills only"}
      </p>
      <div
        className={`resume-skill-results ${selected !== "all" ? "single-category" : ""}`}
      >
        {groups.map((group) => {
          const Icon = icons[group.id as keyof typeof icons];
          return (
            <section
              className="resume-skill-group"
              key={group.id}
              aria-label={group.name}
            >
              <h4>
                <Icon size={16} aria-hidden="true" />
                {group.name}
              </h4>
              {group.skills.length ? (
                <ul>
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className={
                        skill.verification === "proposed"
                          ? "proposed-skill"
                          : "confirmed-skill"
                      }
                    >
                      <span>{skill.name}</span>
                      {skill.verification === "proposed" ? (
                        <small>Proposed · Unverified</small>
                      ) : showExperience && skill.proficiency ? (
                        <small>{skill.proficiency}</small>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="resume-skills-empty">
                  No confirmed skills yet. Enable proposed skills to review
                  suggestions.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
