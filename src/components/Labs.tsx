import { useState } from "react";
import {
  Check,
  Router,
  Monitor,
  Globe,
  Server,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
const nodes = [
  {
    name: "Workstation",
    icon: Monitor,
    ip: "192.0.2.10",
    detail:
      "The client starts a request. Its default gateway sends traffic outside the local subnet.",
  },
  {
    name: "Gateway",
    icon: Router,
    ip: "192.0.2.1",
    detail:
      "The router connects the local subnet to other networks. Firewall policy controls permitted traffic.",
  },
  {
    name: "DNS server",
    icon: Server,
    ip: "198.51.100.53",
    detail:
      "DNS resolves a hostname to an IP address before the client connects to its destination.",
  },
  {
    name: "Web server",
    icon: Globe,
    ip: "203.0.113.80",
    detail:
      "The destination responds over HTTPS. These documentation-only addresses never receive real requests.",
  },
];
export function NetworkLab() {
  const [selected, setSelected] = useState(0);
  const [trace, setTrace] = useState(false);
  return (
    <div className="app-page">
      <div className="eyebrow">NETWORK LAB / INTERACTIVE DEMO</div>
      <h2>Follow the connection.</h2>
      <p className="intro">
        A small network. A useful way to explore how the pieces fit together.
      </p>
      <div className="notice">
        Illustrative learning demo — no network traffic is sent.
      </div>
      <div className="topology">
        {nodes.map((node, i) => (
          <div className="node-wrap" key={node.name}>
            <button
              className={`network-node ${selected === i ? "selected" : ""}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <node.icon size={28} />
              <strong>{node.name}</strong>
              <code>{node.ip}</code>
            </button>
            {i < 3 && <ChevronRight className="node-arrow" size={17} />}
          </div>
        ))}
      </div>
      <div className="detail-box">
        <span className="eyebrow">NODE 0{selected + 1}</span>
        <h3>{nodes[selected].name}</h3>
        <p>{nodes[selected].detail}</p>
      </div>
      <button className="primary-button" onClick={() => setTrace(!trace)}>
        {trace ? "Reset trace" : "Simulate a connection"}
        <ChevronRight size={15} />
      </button>
      {trace && (
        <pre className="trace" role="status">
          {
            "[simulation] Client → Gateway → DNS lookup\n[simulation] Client → Gateway → Web server :443\n✓ Illustrative HTTPS connection complete"
          }
        </pre>
      )}
    </div>
  );
}
const questions = [
  {
    scenario:
      "An unexpected email asks you to reset your password using an unfamiliar link. What is the best next step?",
    options: [
      "Open the link to check the page",
      "Use the known service address and report the email",
      "Reply with your current password",
    ],
    answer: 1,
    explanation:
      "Use a trusted bookmark or type the known service address. Report suspected phishing through the organisation’s approved process.",
  },
  {
    scenario:
      "You are configuring a new account. Which approach best protects access?",
    options: [
      "Reuse an easy-to-remember password",
      "Share the login with your team",
      "Use a unique password and multi-factor authentication",
    ],
    answer: 2,
    explanation:
      "A unique password limits credential reuse attacks. MFA adds another check if a password is compromised.",
  },
  {
    scenario:
      "A workstation displays a suspicious file alert. What should you do?",
    options: [
      "Follow the incident procedure and notify IT/security",
      "Disable the protection software",
      "Forward the file to a colleague",
    ],
    answer: 0,
    explanation:
      "Follow the organisation’s incident procedure. Avoid opening or distributing the file, and preserve the alert details for the response team.",
  },
];
export function SecurityLab() {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const question = questions[index];
  return (
    <div className="app-page">
      <div className="eyebrow">SECURITY LAB / AWARENESS DEMO</div>
      <h2>A defender’s mindset.</h2>
      <p className="intro">Pause. Investigate. Make the safer decision.</p>
      <div className="notice">
        Educational scenarios — not evidence of professional security work.
      </div>
      <div className="scenario">
        <div className="scenario-label">
          <ShieldAlert size={18} /> SCENARIO {index + 1} / {questions.length}
        </div>
        <h3>{question.scenario}</h3>
        <div className="answers">
          {question.options.map((option, i) => (
            <button
              key={option}
              aria-pressed={choice === i}
              className={choice === i ? "chosen" : ""}
              onClick={() => setChoice(i)}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {option}
              {choice === i && <Check size={18} />}
            </button>
          ))}
        </div>
        {choice !== null && (
          <div className="feedback" role="status">
            <strong>
              {choice === question.answer ? "Good call." : "Let’s reconsider."}
            </strong>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>
      <button
        className="primary-button"
        onClick={() => {
          setIndex((index + 1) % questions.length);
          setChoice(null);
        }}
      >
        Next scenario
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
