export const commandNames = [
  "help",
  "whoami",
  "about",
  "skills",
  "projects",
  "clear",
  "date",
] as const;
export function runCommand(input: string, now = new Date()): string {
  const command = input.trim().toLowerCase();
  switch (command) {
    case "help":
      return "Available commands:\n  help      Show this guide\n  whoami    Meet Faraj Enam Ariz\n  about     Portfolio guide\n  skills    Skills & Certifications guide\n  projects  Projects guide\n  clear     Clear the terminal\n  date      Current date in Perth";
    case "whoami":
      return "Faraj Enam Ariz\nPerth, Western Australia\nComputer Systems and Networking graduate.\nOpen About Me for education and career goals, or Resume for professional work experience.";
    case "about":
      return "FarazOS v0.1 — an interactive IT portfolio.\nAbout Me: introduction, education and career goals.\nResume: professional work experience.\nSkills & Certifications: eight skill categories and verification status.\nProjects: Enterprise Infrastructure Home Lab and planned ideas.\nAll commands are local simulations.";
    case "skills":
      return "Open Skills & Certifications for all eight skill categories, experience labels and verification information.\nConfirmed skills reflect owner-supplied background; proposed skills are unverified and hidden by default.\nNo verified certifications are listed.";
    case "projects":
      return "Open Projects for the Enterprise Infrastructure Home Lab summary and clearly labelled planned ideas.\nNetwork Lab and Security Lab remain illustrative learning demos.";
    case "date":
      return now.toLocaleString("en-AU", {
        timeZone: "Australia/Perth",
        dateStyle: "full",
        timeStyle: "long",
      });
    case "clear":
      return "";
    case "":
      return "";
    default:
      return `Command not found: ${input.trim()}\nType help for the supported commands. This simulation cannot execute shell commands.`;
  }
}
