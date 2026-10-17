import {
  ArrowUpRight,
  GraduationCap,
  Headset,
  Server,
  UsersRound,
  MapPin,
  Network,
  ShieldCheck,
  Clock3,
  ChevronRight,
  Folder,
  Mail,
  Check,
  Copy,
} from "lucide-react";
import { useState } from "react";
import type { AppId } from "../lib/apps";
import { Terminal } from "./Terminal";
import { Resume } from "./Resume";
import { ResumeSkills } from "./ResumeSkills";
import { NetworkLab, SecurityLab } from "./Labs";
type Props = { id: AppId; open: (id: AppId) => void };
export function AppContent({ id, open }: Props) {
  if (id === "terminal") return <Terminal />;
  if (id === "network") return <NetworkLab />;
  if (id === "security") return <SecurityLab />;
  if (id === "contact") return <Contact />;
  if (id === "about")
    return (
      <div className="about-page">
        <div className="about-banner">
          <span className="eyebrow">A PERSONAL OPERATING SYSTEM</span>
          <span className="version">EST. PERTH, WA</span>
          <div className="avatar-mark" aria-hidden="true">
            fe<span>_</span>
          </div>
          <div className="banner-grid" />
        </div>
        <div className="about-body">
          <div className="profile-location">
            <MapPin size={13} /> Perth, Western Australia{" "}
            <span>UTC +08:00</span>
          </div>
          <div className="eyebrow welcome-label">HELLO, WORLD. I’M</div>
          <h1>
            Faraj Enam Ariz<span>.</span>
          </h1>
          <p className="about-intro professional-headline">
            Computer Systems &amp; Networking Graduate | IT Support | Networking
            | Cybersecurity
          </p>
          <div
            className="interest-row"
            role="list"
            aria-label="Professional skills"
          >
            <span role="listitem">
              <Headset size={14} aria-hidden="true" /> IT Support
            </span>
            <span role="listitem">
              <Network size={14} aria-hidden="true" /> Networking
            </span>
            <span role="listitem">
              <Server size={14} aria-hidden="true" /> Windows Server
            </span>
            <span role="listitem">
              <UsersRound size={14} aria-hidden="true" /> Active Directory
            </span>
            <span role="listitem">
              <ShieldCheck size={14} aria-hidden="true" /> Cybersecurity
            </span>
          </div>
          <div className="professional-summary">
            <p className="bio">
              I'm a Computer Systems and Networking graduate from{" "}
              <strong>Curtin University</strong>, based in Perth, Western
              Australia, with a passion for IT infrastructure, networking,
              cybersecurity and technical problem-solving.
            </p>
            <p className="bio">
              My background brings together junior network support and a
              self-directed enterprise infrastructure home lab. I enjoy turning
              technical challenges into practical solutions.
            </p>
            <p className="bio">
              Alongside my technical background, my experience as a Shift
              Manager has strengthened my communication, leadership and
              problem-solving skills in fast-paced environments.
            </p>
            <p className="bio">
              I'm currently seeking opportunities in{" "}
              <strong>
                IT Support, Service Desk, Network Support, NOC and junior
                infrastructure roles
              </strong>{" "}
              where I can apply my technical knowledge and continue developing
              professionally.
            </p>
          </div>
          <section
            className="about-education"
            aria-labelledby="about-education-title"
          >
            <h2 id="about-education-title">
              <GraduationCap size={19} aria-hidden="true" /> Education
            </h2>
            <div className="education-entry">
              <div>
                <h3>Curtin University</h3>
                <p>Bachelor of Technology (Computer Systems and Networking)</p>
              </div>
              <span className="resume-date">2025</span>
            </div>
            <div className="education-entry">
              <div>
                <h3>Curtin College</h3>
                <p>Diploma of Information Technology</p>
              </div>
              <span className="resume-date">2022</span>
            </div>
          </section>
          <div className="about-actions">
            <button className="primary-button" onClick={() => open("projects")}>
              Explore my workspace
              <ArrowUpRight size={16} />
            </button>
            <button className="text-button" onClick={() => open("contact")}>
              Get in touch
              <ChevronRight size={15} />
            </button>
          </div>
          <div className="profile-note">
            <span className="status-dot" /> Open to IT opportunities{" "}
            <span>Perth, Western Australia</span>
          </div>
        </div>
      </div>
    );
  if (id === "resume") return <Resume />;
  if (id === "projects")
    return (
      <div className="app-page">
        <div className="eyebrow">PROJECTS / WORKSPACE</div>
        <h2>Projects &amp; experiments.</h2>
        <p className="intro">
          A home for documented builds, experiments and lessons learned.
        </p>
        <article
          className="detail-box home-lab-project"
          aria-labelledby="home-lab-title"
        >
          <span className="eyebrow">SELF-DIRECTED TECHNICAL PROJECT</span>
          <h3 id="home-lab-title">
            <Server size={20} aria-hidden="true" /> Enterprise Infrastructure
            Home Lab
          </h3>
          <p>
            Windows Server 2022, Windows 11, Active Directory, Group Policy,
            DNS, DHCP, VMware, GNS3 and pfSense.
          </p>
          <p>
            Configured users, file permissions, VLANs, firewall rules and NAT.
          </p>
        </article>
        <h3>Planned ideas</h3>
        <div className="notice">
          The ideas below are planned, not completed work.
        </div>
        <div className="project-list">
          {[
            {
              title: "Home network documentation",
              description:
                "A possible future project covering topology, addressing and troubleshooting notes.",
              icon: Network,
            },
            {
              title: "Security learning journal",
              description:
                "A possible future collection of defensive security exercises and reflections.",
              icon: ShieldCheck,
            },
            {
              title: "IT support knowledge base",
              description:
                "A possible future library of repeatable support and troubleshooting guides.",
              icon: Folder,
            },
          ].map((project, i) => (
            <article className="project-card" key={project.title}>
              <div className="project-number">0{i + 1}</div>
              <project.icon size={26} />
              <div>
                <span className="pill">PLANNED IDEA</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="inline-note">
          <Clock3 size={16} /> In the meantime, try the interactive learning
          demos.
        </div>
        <div className="about-actions">
          <button className="secondary-button" onClick={() => open("network")}>
            Network Lab
            <ArrowUpRight size={15} />
          </button>
          <button className="secondary-button" onClick={() => open("security")}>
            Security Lab
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    );
  return (
    <div className="app-page">
      <div className="eyebrow">SKILLS & CERTIFICATIONS</div>
      <h2>Always learning.</h2>
      <p className="intro">
        An evolving space for knowledge and verified credentials.
      </p>
      <ResumeSkills />
      <div className="detail-box">
        <h3>Certification cabinet</h3>
        <p>
          No verified certifications listed yet. Credential names, dates and
          verification links will be added only after confirmation.
        </p>
        <span className="pill">Awaiting verified credentials</span>
      </div>
    </div>
  );
}
function Contact() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        "Faraj Enam Ariz — Perth, Western Australia",
      );
      setCopied(true);
      setError(false);
    } catch {
      setError(true);
    }
  };
  return (
    <div className="app-page contact-page">
      <div className="contact-symbol">
        <Mail size={38} />
      </div>
      <div className="eyebrow">CONTACT / SAY HELLO</div>
      <h2>
        Good things start
        <br />
        with a conversation.
      </h2>
      <p className="intro">Faraj Enam Ariz · Perth, Western Australia</p>
      <div className="detail-box">
        <h3>Contact details coming soon</h3>
        <p>
          A verified email address and professional profile links haven’t been
          supplied yet. They will appear here once confirmed.
        </p>
        <p>No messages are collected or sent by this site.</p>
      </div>
      <button className="primary-button" onClick={copy}>
        {copied ? "Profile details copied" : "Copy profile details"}
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <p className="copy-status" role="status">
        {error
          ? "Clipboard unavailable. You can select: Faraj Enam Ariz — Perth, Western Australia."
          : copied
            ? "Copied Faraj Enam Ariz’s name and location to your clipboard."
            : ""}
      </p>
    </div>
  );
}
