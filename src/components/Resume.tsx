import { ResumeSkills } from "./ResumeSkills";
import {
  GraduationCap,
  Network,
  Server,
  UsersRound,
  ChevronDown,
  Download,
  MapPin,
  FileText,
} from "lucide-react";

export function Resume() {
  return (
    <div className="resume-dashboard">
      <header className="resume-hero">
        <div className="resume-topline">
          <span className="eyebrow">RESUME / FARAJ ENAM ARIZ</span>
          <span className="resume-availability">
            <span className="status-dot" /> Open to Work
          </span>
        </div>
        <h2>
          Faraj Enam Ariz<span>.</span>
        </h2>
        <p className="resume-headline">
          IT Support | Network &amp; Systems Support | Service Desk
        </p>
        <p className="resume-location">
          <MapPin size={13} aria-hidden="true" /> Perth, Western Australia
        </p>
        <div className="resume-download">
          {/* Keep disabled: no approved resume PDF has been supplied. Add a real, reviewed asset before enabling any download link. */}
          <button
            className="resume-download-button"
            disabled
            aria-describedby="resume-pdf-status"
          >
            <Download size={17} aria-hidden="true" /> Download Resume (PDF)
          </button>
          <div id="resume-pdf-status">
            <strong>Resume PDF coming soon</strong>
            <span>The download will be available once a PDF is provided.</span>
          </div>
        </div>
      </header>
      <div className="resume-body">
        <div className="resume-section-heading">
          <h3>Professional snapshot</h3>
          <span>Expand or collapse each card</span>
        </div>
        <div className="resume-card-grid">
          <details className="resume-card" open>
            <summary>
              <span className="resume-card-icon">
                <GraduationCap size={21} aria-hidden="true" />
              </span>
              <h4>
                Education<small>Academic foundation</small>
              </h4>
              <ChevronDown size={16} aria-hidden="true" />
            </summary>
            <div className="resume-card-body">
              <div className="resume-education-entry">
                <h5>Curtin University</h5>
                <p>Bachelor of Technology (Computer Systems and Networking)</p>
                <span className="resume-date">2025</span>
              </div>
              <div className="resume-education-entry">
                <h5>Curtin College</h5>
                <p>Diploma of Information Technology</p>
                <span className="resume-date">2022</span>
              </div>
            </div>
          </details>
          <details className="resume-card" open>
            <summary>
              <span className="resume-card-icon">
                <Network size={21} aria-hidden="true" />
              </span>
              <h4>
                Technical Experience<small>Junior Network Support</small>
              </h4>
              <ChevronDown size={16} aria-hidden="true" />
            </summary>
            <div className="resume-card-body">
              <h5>Inspire Broadband, Dhaka</h5>
              <span className="resume-date">March 2021 – September 2021</span>
              <p>
                Assisted with customer connectivity, DNS, gateway and latency
                troubleshooting.
              </p>
            </div>
          </details>
          <details className="resume-card" open>
            <summary>
              <span className="resume-card-icon">
                <Server size={21} aria-hidden="true" />
              </span>
              <h4>
                Enterprise Infrastructure Home Lab
                <small>Self-directed technical project</small>
              </h4>
              <ChevronDown size={16} aria-hidden="true" />
            </summary>
            <div className="resume-card-body">
              <p>
                Windows Server 2022, Windows 11, Active Directory, Group Policy,
                DNS, DHCP, VMware, GNS3 and pfSense.
              </p>
              <p>
                Configured users, file permissions, VLANs, firewall rules and
                NAT.
              </p>
            </div>
          </details>
          <details className="resume-card" open>
            <summary>
              <span className="resume-card-icon">
                <UsersRound size={21} aria-hidden="true" />
              </span>
              <h4>
                Leadership &amp; Customer Service<small>Shift Manager</small>
              </h4>
              <ChevronDown size={16} aria-hidden="true" />
            </summary>
            <div className="resume-card-body">
              <h5>McDonald's, Canning Vale, Perth</h5>
              <span className="resume-date">December 2022 – Present</span>
              <p>
                Shift operations, staff training, customer support and basic
                POS/kiosk troubleshooting.
              </p>
            </div>
          </details>
        </div>
        <ResumeSkills />
        <div className="resume-bottom-note">
          <FileText size={14} aria-hidden="true" />
          <span>Professional overview · Faraj Enam Ariz</span>
        </div>
      </div>
    </div>
  );
}
