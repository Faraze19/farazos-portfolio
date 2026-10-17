import {
  UserRound,
  FileText,
  FolderCode,
  BadgeCheck,
  SquareTerminal,
  Network,
  ShieldCheck,
  Mail,
} from "lucide-react";

export const apps = [
  {
    id: "about",
    title: "About Me",
    subtitle: "Meet the person behind the desktop",
    icon: UserRound,
    color: "blue",
  },
  {
    id: "resume",
    title: "Resume",
    subtitle: "Experience & education",
    icon: FileText,
    color: "silver",
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Ideas, builds & experiments",
    icon: FolderCode,
    color: "yellow",
  },
  {
    id: "skills",
    title: "Skills & Certifications",
    subtitle: "A learning journey",
    icon: BadgeCheck,
    color: "purple",
  },
  {
    id: "terminal",
    title: "Terminal",
    subtitle: "A little command-line curiosity",
    icon: SquareTerminal,
    color: "green",
  },
  {
    id: "network",
    title: "Network Lab",
    subtitle: "Explore a simulated network",
    icon: Network,
    color: "cyan",
  },
  {
    id: "security",
    title: "Security Lab",
    subtitle: "Think like a defender",
    icon: ShieldCheck,
    color: "orange",
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "Start a conversation",
    icon: Mail,
    color: "pink",
  },
] as const;
export type AppId = (typeof apps)[number]["id"];
export const getApp = (id: AppId) => apps.find((app) => app.id === id)!;
