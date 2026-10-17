// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { ResumeSkills } from "./ResumeSkills";
import { resumeSkillCategories } from "../lib/resumeSkills";
afterEach(cleanup);
describe("Resume skill verification and filtering", () => {
  it("filters all eight categories and restores the compact overview", () => {
    render(<ResumeSkills />);
    const names = [
      "Networking & Infrastructure",
      "Systems Administration",
      "Platforms & Tools",
      "Cybersecurity",
      "IT Support & Service Management",
      "Scripting & Automation",
      "Cloud & Emerging Technologies",
      "Professional & Leadership",
    ];
    for (const name of names) {
      fireEvent.click(screen.getByRole("button", { name }));
      expect(
        screen.getByRole("button", { name }).getAttribute("aria-pressed"),
      ).toBe("true");
      expect(screen.getAllByRole("region")).toHaveLength(2);
      expect(screen.getByRole("region", { name })).toBeTruthy();
    }
    expect(screen.getByRole("status").textContent).toContain(
      "Confirmed skills only",
    );
    fireEvent.click(screen.getByRole("button", { name: "All skills" }));
    expect(screen.getAllByRole("region")).toHaveLength(9);
  });
  it("hides unverified suggestions by default and labels every proposal when revealed", () => {
    render(<ResumeSkills />);
    expect(screen.queryByText("Python")).toBeNull();
    expect(screen.queryByText("Microsoft Azure")).toBeNull();
    expect(screen.getByText("Windows 11")).toBeTruthy();
    expect(screen.queryByText("Windows 10/11")).toBeNull();
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: "Show proposed skills (unverified)",
      }),
    );
    expect(screen.getByText("Python")).toBeTruthy();
    expect(screen.getByText("Microsoft Azure")).toBeTruthy();
    for (const category of resumeSkillCategories) {
      const region = within(
        screen.getByRole("region", { name: category.name }),
      );
      for (const skill of category.skills.filter(
        (skill) => skill.verification === "proposed",
      )) {
        const badge = region.getByText(skill.name).closest("li")!;
        expect(within(badge).getByText("Proposed · Unverified")).toBeTruthy();
        expect(skill.proficiency).toBeUndefined();
      }
    }
    fireEvent.click(
      screen.getByRole("button", { name: "Scripting & Automation" }),
    );
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: "Show proposed skills (unverified)",
      }),
    );
    expect(screen.queryByText("Python")).toBeNull();
    expect(screen.getByText(/No confirmed skills yet/)).toBeTruthy();
  });
  it("shows optional evidence-based labels without assigning proficiency to proposals", () => {
    render(<ResumeSkills />);
    expect(screen.queryByText("Lab Experience")).toBeNull();
    fireEvent.click(
      screen.getByRole("checkbox", { name: "Show experience labels" }),
    );
    const server = screen.getByText("Windows Server 2022").closest("li")!;
    expect(within(server).getByText("Lab Experience")).toBeTruthy();
    const dns = within(
      screen.getByRole("region", { name: "Networking & Infrastructure" }),
    )
      .getByText("DNS")
      .closest("li")!;
    expect(within(dns).getByText("Hands-on Experience")).toBeTruthy();
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: "Show proposed skills (unverified)",
      }),
    );
    const python = screen.getByText("Python").closest("li")!;
    expect(
      within(python).queryByText(/Experience|Currently Learning/),
    ).toBeNull();
    for (const category of resumeSkillCategories) {
      for (const skill of category.skills) {
        if (skill.verification === "confirmed")
          expect(skill.evidence.length).toBeGreaterThan(0);
      }
    }
  });
});
