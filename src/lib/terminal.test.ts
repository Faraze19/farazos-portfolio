import { describe, expect, it } from "vitest";
import { commandNames, runCommand } from "./terminal";
describe("safe terminal simulation", () => {
  it("implements every documented command", () => {
    for (const command of commandNames)
      expect(typeof runCommand(command)).toBe("string");
    expect(runCommand(" HELP ")).toContain("Available commands");
    expect(runCommand("whoami")).toContain("Faraj Enam Ariz");
    expect(runCommand("whoami")).toContain(
      "Resume for professional work experience",
    );
    expect(runCommand("about")).toContain(
      "introduction, education and career goals",
    );
    expect(runCommand("skills")).toContain("Skills & Certifications");
    expect(runCommand("skills")).toContain("proposed skills are unverified");
    expect(runCommand("projects")).toContain(
      "Enterprise Infrastructure Home Lab",
    );
    expect(runCommand("projects")).toContain("illustrative");
    expect(runCommand("clear")).toBe("");
  });
  it("rejects shell syntax and unsupported commands without interpreting them", () => {
    for (const command of [
      "help; whoami",
      "$(whoami)",
      "rm -rf /",
      "<script>alert(1)</script>",
      "curl example.com",
    ]) {
      expect(runCommand(command)).toContain("Command not found:");
      expect(runCommand(command)).toContain("cannot execute shell commands");
    }
  });
  it("uses Perth time even when the UTC date is the previous day", () => {
    const result = runCommand("date", new Date("2026-10-16T17:00:00Z"));
    expect(result).toContain("17 October 2026");
    expect(result).toMatch(/1:00:00 am/i);
  });
});
