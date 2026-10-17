import {
  Network,
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
          <h3>Professional Work Experience</h3>
          <span>Most recent first · Expand for responsibilities</span>
        </div>
        <ol className="career-timeline" aria-label="Career timeline">
          <li>
            <details className="resume-card" open>
              <summary>
                <span className="resume-card-icon">
                  <UsersRound size={21} aria-hidden="true" />
                </span>
                <h4>
                  Shift Manager<small>McDonald's, Canning Vale, Perth</small>
                  <span className="resume-date">December 2022 – Present</span>
                </h4>
                <ChevronDown size={16} aria-hidden="true" />
              </summary>
              <div className="resume-card-body">
                <p>
                  Shift operations, staff training, customer support and basic
                  POS/kiosk troubleshooting.
                </p>
              </div>
            </details>
          </li>
          <li>
            <details className="resume-card" open>
              <summary>
                <span className="resume-card-icon">
                  <Network size={21} aria-hidden="true" />
                </span>
                <h4>
                  Junior Network Support<small>Inspire Broadband, Dhaka</small>
                  <span className="resume-date">
                    March 2021 – September 2021
                  </span>
                </h4>
                <ChevronDown size={16} aria-hidden="true" />
              </summary>
              <div className="resume-card-body">
                <p>
                  Assisted with customer connectivity, DNS, gateway and latency
                  troubleshooting.
                </p>
              </div>
            </details>
          </li>
        </ol>
        <div className="resume-bottom-note">
          <FileText size={14} aria-hidden="true" />
          <span>Professional overview · Faraj Enam Ariz</span>
        </div>
      </div>
    </div>
  );
}
