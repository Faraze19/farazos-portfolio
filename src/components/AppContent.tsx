import {
  ArrowUpRight,
  MapPin,
  Code2,
  Network,
  ShieldCheck,
  FileText,
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
            Faraz Enam<span>.</span>
          </h1>
          <p className="about-intro">
            A curious mind.
            <br />
            An IT-focused world.
          </p>
          <p className="bio">
            Welcome to my corner of the internet. FarazOS is an interactive
            space for my IT journey — bringing together networking,
            cybersecurity and the joy of figuring things out.
          </p>
          <p className="bio secondary">
            Take a look around. Open a window, explore a lab, or say hello.
          </p>
          <div className="interest-row">
            <span>
              <Network size={14} /> Networking
            </span>
            <span>
              <ShieldCheck size={14} /> Cybersecurity
            </span>
            <span>
              <Code2 size={14} /> Technology
            </span>
          </div>
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
            <span className="status-dot" /> Portfolio in progress{" "}
            <span>Career details & project evidence coming soon</span>
          </div>
        </div>
      </div>
    );
  if (id === "resume")
    return (
      <div className="app-page">
        <div className="eyebrow">RESUME / FARAZ ENAM</div>
        <h2>The story so far.</h2>
        <p className="intro">Perth, Western Australia</p>
        <div className="notice">
          <FileText size={18} /> A verified resume has not been added yet. No
          employment, education or achievements are claimed here.
        </div>
        <div className="resume-sections">
          {["Professional experience", "Education", "Certifications"].map(
            (title, i) => (
              <section key={title}>
                <span className="section-index">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>Awaiting verified details from Faraz.</p>
                </div>
                <span className="pill">To be added</span>
              </section>
            ),
          )}
        </div>
        <div className="detail-box">
          <h3>Looking for more information?</h3>
          <p>
            The Contact app lists the current contact status. A downloadable
            resume will appear here once supplied and approved.
          </p>
          <button className="text-button" onClick={() => open("contact")}>
            Open Contact
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    );
  if (id === "projects")
    return (
      <div className="app-page">
        <div className="eyebrow">PROJECTS / WORKSPACE</div>
        <h2>Room for what’s next.</h2>
        <p className="intro">
          A home for documented builds, experiments and lessons learned.
        </p>
        <div className="notice">
          No completed projects have been verified. The entries below are
          planned ideas, not finished work.
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
      <div className="notice">
        These are portfolio learning areas. Skill levels, practical experience
        and certifications are awaiting verification.
      </div>
      <div className="skill-grid">
        {[
          {
            title: "Networking",
            icon: Network,
            items: [
              "TCP/IP & addressing",
              "Routing & switching",
              "Network troubleshooting",
            ],
          },
          {
            title: "Cybersecurity",
            icon: ShieldCheck,
            items: [
              "Security fundamentals",
              "Threat awareness",
              "Defensive thinking",
            ],
          },
          {
            title: "IT support",
            icon: Code2,
            items: [
              "Operating systems",
              "Troubleshooting methods",
              "Technical documentation",
            ],
          },
        ].map((group) => (
          <section className="skill-card" key={group.title}>
            <group.icon size={24} />
            <h3>{group.title}</h3>
            <span className="eyebrow">LEARNING AREA</span>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
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
        "Faraz Enam — Perth, Western Australia",
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
      <p className="intro">Faraz Enam · Perth, Western Australia</p>
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
          ? "Clipboard unavailable. You can select: Faraz Enam — Perth, Western Australia."
          : copied
            ? "Copied Faraz’s name and location to your clipboard."
            : ""}
      </p>
    </div>
  );
}
