import { useState, useRef } from "react";
import {
  Server,
  Monitor,
  Layers,
  Network,
  ChevronDown,
  Image,
  FileText,
  AlertCircle,
} from "lucide-react";
import { labDevices, labWalkthroughs, labEvidence } from "../lib/homeLab";
const sections = [
  "Project Overview",
  "Network Architecture",
  "Configuration Walkthroughs",
  "Troubleshooting & Lessons Learned",
  "Evidence & Documentation",
];
const deviceIcons = [Layers, Server, Monitor, Server, Network];
export function HomeLabCaseStudy() {
  const [selected, setSelected] = useState<string>("dc");
  const headings = useRef<(HTMLHeadingElement | null)[]>([]);
  const device = labDevices.find((item) => item.id === selected)!;
  return (
    <article className="lab-case-study" aria-labelledby="home-lab-title">
      <header className="case-study-header">
        <span className="eyebrow">HANDS-ON INFRASTRUCTURE / CASE STUDY</span>
        <h3 id="home-lab-title">
          <Server size={22} aria-hidden="true" /> Enterprise Infrastructure Home
          Lab
        </h3>
        <div className="case-statuses">
          <span>Built · owner-confirmed</span>
          <span>Documentation in progress</span>
        </div>
        <p>
          A genuine self-directed technical project. The build is confirmed by
          its owner; configuration evidence and unknown details are identified
          below.
        </p>
      </header>
      <nav
        className="case-section-nav"
        aria-label="Home lab case study sections"
      >
        {sections.map((name, i) => (
          <button
            key={name}
            aria-label={`0${i + 1} ${name}`}
            onClick={() => {
              headings.current[i]?.scrollIntoView({
                block: "start",
                behavior: "auto",
              });
              headings.current[i]?.focus({ preventScroll: true });
            }}
          >
            <span>0{i + 1}</span>
            {name}
          </button>
        ))}
      </nav>
      <div className="case-study-body">
        <section aria-labelledby="case-overview">
          <h4
            id="case-overview"
            tabIndex={-1}
            ref={(node) => {
              headings.current[0] = node;
            }}
          >
            01 / Project Overview
          </h4>
          <p>
            The purpose of this enterprise home lab is to learn and practise
            Windows Server administration, Active Directory, networking,
            virtualisation and infrastructure troubleshooting.
          </p>
          <div className="case-fact-box">
            <span className="eyebrow">
              EXISTING OWNER-SUPPLIED BUILD SUMMARY
            </span>
            <p>
              Windows Server 2022, Windows 11, Active Directory, Group Policy,
              DNS, DHCP, VMware, GNS3 and pfSense.
            </p>
            <p>
              Configured users, file permissions, VLANs, firewall rules and NAT.
            </p>
          </div>
        </section>
        <section aria-labelledby="case-network">
          <h4
            id="case-network"
            tabIndex={-1}
            ref={(node) => {
              headings.current[1] = node;
            }}
          >
            02 / Network Architecture
          </h4>
          <p>
            Select a component to inspect its documented role and configuration.
          </p>
          <div
            className="case-network-map"
            role="group"
            aria-label="Documented lab components"
          >
            {labDevices.map((item, i) => {
              const Icon = deviceIcons[i];
              return (
                <button
                  key={item.id}
                  aria-label={`${item.name} ${item.role}`}
                  aria-pressed={selected === item.id}
                  aria-controls="case-device-details"
                  onClick={() => setSelected(item.id)}
                >
                  <Icon size={23} aria-hidden="true" />
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </button>
              );
            })}
          </div>
          <p className="case-caution">
            <AlertCircle size={15} aria-hidden="true" />
            Logical inventory, not a verified connection map. No links are drawn
            because virtual adapters, device relationships, gateway and routing
            paths have not been supplied. GNS3 and pfSense are part of the
            broader build summary; their topology placement is unverified.
          </p>
          <section
            id="case-device-details"
            className="case-device-details"
            aria-label="Selected component details"
            aria-live="polite"
          >
            <h5>{device.name}</h5>
            <dl>
              {device.details.map(([name, value]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </section>
        <section aria-labelledby="case-walkthroughs">
          <h4
            id="case-walkthroughs"
            tabIndex={-1}
            ref={(node) => {
              headings.current[2] = node;
            }}
          >
            03 / Configuration Walkthroughs
          </h4>
          <p>
            Technical explanations for the documented subject areas. These
            describe the configuration approach, not a verified step-by-step
            record of this build.
          </p>
          <div className="case-walkthroughs">
            {labWalkthroughs.map((item) => (
              <details key={item.title}>
                <summary>
                  {item.title}
                  <ChevronDown size={15} aria-hidden="true" />
                </summary>
                <div>
                  <p>{item.explanation}</p>
                  <p className="case-verification">
                    <strong>Evidence pending:</strong> {item.verify}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section aria-labelledby="case-lessons">
          <h4
            id="case-lessons"
            tabIndex={-1}
            ref={(node) => {
              headings.current[3] = node;
            }}
          >
            04 / Troubleshooting &amp; Lessons Learned
          </h4>
          <div className="case-issue">
            <span className="case-unverified">Resolution unverified</span>
            <h5>GNS3 virtualisation issue</h5>
            <p>
              The owner has identified a GNS3 virtualisation issue. The exact
              symptoms, error message, software versions, attempted fixes and
              final outcome have not yet been supplied.
            </p>
            <dl>
              <div>
                <dt>Known</dt>
                <dd>GNS3 virtualisation issue reported.</dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>Unverified. No successful resolution is claimed.</dd>
              </div>
              <div>
                <dt>Documentation to add</dt>
                <dd>
                  Original error, environment details, investigation steps,
                  changes made and observed results.
                </dd>
              </div>
            </dl>
          </div>
          <h5 className="case-lessons-label">
            Investigation guide — not recorded outcomes
          </h5>
          <p>
            Capture the exact error and environment before changing settings.
            Check vendor guidance for virtualisation requirements and
            compatibility, change one variable at a time, and record the
            observed result. A lesson learned or fix will be added only when
            supported by the actual investigation.
          </p>
        </section>
        <section aria-labelledby="case-evidence">
          <h4
            id="case-evidence"
            tabIndex={-1}
            ref={(node) => {
              headings.current[4] = node;
            }}
          >
            05 / Evidence &amp; Documentation
          </h4>
          <p>
            No genuine screenshots or documentation files have been supplied for
            this view yet. Each placeholder below identifies evidence to add;
            none represents a screenshot, configuration capture or successful
            test.
          </p>
          <div className="case-evidence-grid">
            {labEvidence.map((name) => (
              <figure key={name}>
                <div className="case-evidence-placeholder">
                  <Image size={25} aria-hidden="true" />
                  <span>Screenshot not supplied</span>
                </div>
                <figcaption>
                  {name}
                  <small>Awaiting genuine evidence</small>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="case-documents">
            <FileText size={21} aria-hidden="true" />
            <div>
              <h5>Documentation library</h5>
              <p>
                No files available yet. Add approved build notes, configuration
                records and troubleshooting logs when supplied. Redact private
                information before publication.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
