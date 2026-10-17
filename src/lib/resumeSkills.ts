/**
 * Review configuration for Resume only. "confirmed" means supported by the
 * owner's previously supplied background, not an independently assessed level.
 * New suggestions must stay "proposed" until the owner confirms evidence.
 * Do not infer Currently Learning merely from a proposed skill.
 */
export type Proficiency =
  "Hands-on Experience" | "Lab Experience" | "Currently Learning";
export type ResumeSkill =
  | {
      name: string;
      verification: "confirmed";
      evidence: string;
      proficiency?: Proficiency;
    }
  | {
      name: string;
      verification: "proposed";
      evidence?: never;
      proficiency?: never;
    };
export type SkillCategory = { id: string; name: string; skills: ResumeSkill[] };
const evidence = {
  network:
    "Owner-supplied Inspire Broadband role: customer connectivity, DNS, gateway and latency troubleshooting.",
  lab: "Owner-supplied enterprise home lab: Windows Server 2022, Windows 11, Active Directory, Group Policy, DNS, DHCP, VMware, GNS3, pfSense; users, file permissions, VLANs, firewall rules and NAT.",
  support:
    "Owner-supplied McDonald's Shift Manager role: shift operations, staff training, customer support and basic POS/kiosk troubleshooting.",
  leadership:
    "Owner-supplied About Me and Shift Manager background: communication, leadership, problem-solving, staff training, customer support and shift operations.",
};
const lab = (name: string): ResumeSkill => ({
  name,
  verification: "confirmed",
  evidence: evidence.lab,
  proficiency: "Lab Experience",
});
const work = (name: string, source: keyof typeof evidence): ResumeSkill => ({
  name,
  verification: "confirmed",
  evidence: evidence[source],
  proficiency: "Hands-on Experience",
});
const proposed = (name: string): ResumeSkill => ({
  name,
  verification: "proposed",
});
export const resumeSkillCategories: SkillCategory[] = [
  {
    id: "networking",
    name: "Networking & Infrastructure",
    skills: [
      proposed("TCP/IP"),
      proposed("LAN/WAN"),
      work("DNS", "network"),
      lab("DHCP"),
      lab("VLANs"),
      proposed("Routing & Switching"),
      lab("NAT"),
      proposed("Subnetting"),
      lab("Firewall Configuration"),
      work("Network Troubleshooting", "network"),
      work("Customer connectivity", "network"),
      work("DNS issues", "network"),
      work("Gateway issues", "network"),
      work("Latency", "network"),
    ],
  },
  {
    id: "systems",
    name: "Systems Administration",
    skills: [
      lab("Windows Server 2022"),
      proposed("Windows 10/11"),
      lab("Windows 11"),
      lab("Active Directory"),
      lab("Group Policy"),
      proposed("User & Group Management"),
      lab("User configuration"),
      lab("File Permissions"),
      lab("DNS/DHCP Services"),
    ],
  },
  {
    id: "tools",
    name: "Platforms & Tools",
    skills: [
      lab("VMware"),
      lab("GNS3"),
      lab("pfSense"),
      proposed("Cisco IOS"),
      proposed("Wireshark"),
      proposed("Microsoft 365"),
      proposed("Remote Desktop"),
      proposed("Git & GitHub"),
    ],
  },
  {
    id: "security",
    name: "Cybersecurity",
    skills: [
      proposed("Network Security"),
      lab("Firewall Rules"),
      lab("Access Control"),
      proposed("Security Fundamentals"),
      proposed("Threat Analysis"),
      proposed("Vulnerability Assessment"),
      proposed("Security Monitoring"),
    ],
  },
  {
    id: "support",
    name: "IT Support & Service Management",
    skills: [
      work("Technical Troubleshooting", "network"),
      proposed("End-User Support"),
      proposed("Incident Management"),
      proposed("Ticketing Systems"),
      proposed("Remote Support"),
      proposed("Hardware & Software Support"),
      proposed("Documentation"),
      proposed("Escalation Procedures"),
      work("Basic POS / kiosk support", "support"),
    ],
  },
  {
    id: "scripting",
    name: "Scripting & Automation",
    skills: [
      proposed("Python"),
      proposed("PowerShell"),
      proposed("Bash"),
      proposed("Git"),
      proposed("AI-Assisted Development"),
      proposed("Workflow Automation"),
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Emerging Technologies",
    skills: [
      proposed("Microsoft Azure"),
      proposed("AWS Fundamentals"),
      proposed("Cloud Networking"),
      lab("Virtualisation"),
      proposed("AI Tools & Automation"),
    ],
  },
  {
    id: "professional",
    name: "Professional & Leadership",
    skills: [
      work("Team Leadership", "leadership"),
      work("Staff Training", "support"),
      work("Customer Service", "support"),
      work("Problem Solving", "leadership"),
      proposed("Stakeholder Communication"),
      proposed("Time Management"),
      work("Operational Coordination", "support"),
    ],
  },
];
export function filterResumeSkills(
  categoryId = "all",
  includeProposed = false,
) {
  return resumeSkillCategories
    .filter((category) => categoryId === "all" || category.id === categoryId)
    .map((category) => ({
      ...category,
      skills: category.skills.filter(
        (skill) => includeProposed || skill.verification === "confirmed",
      ),
    }));
}
