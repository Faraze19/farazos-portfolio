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
      return "Available commands:\n  help      Show this guide\n  whoami    Meet Faraj Enam Ariz\n  about     About FarazOS\n  skills    Learning areas\n  projects  Project status\n  clear     Clear the terminal\n  date      Current date in Perth";
    case "whoami":
      return "Faraj Enam Ariz\nPerth, Western Australia\nIT portfolio owner. Career details awaiting verification.";
    case "about":
      return "FarazOS v0.1 — an interactive IT portfolio.\nBuilt with React + TypeScript. All commands are local simulations.";
    case "skills":
      return "Portfolio learning areas: networking, IT support, cybersecurity.\nProficiency and certifications have not yet been verified.";
    case "projects":
      return "Project evidence is coming soon.\nNetwork Lab and Security Lab are illustrative portfolio demos, not completed career projects.";
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
