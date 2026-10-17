// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import App from "./App";
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  });
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(cleanup);
describe("desktop applications", () => {
  it("opens all eight apps and exposes their actual content", () => {
    render(<App />);
    const icons = screen.getByRole("navigation", {
      name: "Desktop applications",
    });
    for (const title of [
      "About Me",
      "Resume",
      "Projects",
      "Skills & Certifications",
      "Terminal",
      "Network Lab",
      "Security Lab",
      "Contact",
    ]) {
      fireEvent.click(within(icons).getByRole("button", { name: title }));
      expect(
        screen.getByRole("region", { name: `${title} window` }),
      ).toBeTruthy();
    }
    expect(
      within(screen.getByRole("region", { name: "About Me window" })).getByRole(
        "heading",
        { name: "Faraj Enam Ariz." },
      ),
    ).toBeTruthy();
    expect(screen.getByText("RESUME / FARAJ ENAM ARIZ")).toBeTruthy();
    expect(
      screen.getByText("Faraj Enam Ariz · Perth, Western Australia"),
    ).toBeTruthy();
    expect(screen.getByText("Contact details coming soon")).toBeTruthy();
    expect(
      screen.getByText(
        "No verified certifications listed yet. Credential names, dates and verification links will be added only after confirmation.",
      ),
    ).toBeTruthy();
  });
  it("places each detail in its intended app and keeps Resume focused on work", () => {
    render(<App />);
    fireEvent.click(
      within(
        screen.getByRole("navigation", { name: "Desktop applications" }),
      ).getByRole("button", { name: "Resume" }),
    );
    const resume = within(
      screen.getByRole("region", { name: "Resume window" }),
    );
    const download = resume.getByRole("button", {
      name: "Download Resume (PDF)",
    }) as HTMLButtonElement;
    expect(download.disabled).toBe(true);
    expect(download.getAttribute("aria-describedby")).toBe("resume-pdf-status");
    expect(resume.getByText("Resume PDF coming soon")).toBeTruthy();
    expect(resume.getByText("Open to Work")).toBeTruthy();
    expect(
      resume.getByText("IT Support | Network & Systems Support | Service Desk"),
    ).toBeTruthy();
    expect(resume.queryByText("Curtin University")).toBeNull();
    expect(
      resume.queryByRole("region", { name: "Technical skills" }),
    ).toBeNull();
    expect(resume.queryByText("Enterprise Infrastructure Home Lab")).toBeNull();
    const timeline = resume.getByRole("list", { name: "Career timeline" });
    const entries = within(timeline).getAllByRole("listitem");
    expect(entries).toHaveLength(2);
    expect(entries[0].textContent).toContain("Shift Manager");
    expect(entries[1].textContent).toContain("Junior Network Support");
    const firstCard = entries[0].querySelector("details")!;
    fireEvent.click(firstCard.querySelector("summary")!);
    expect(firstCard.open).toBe(false);
    fireEvent.click(firstCard.querySelector("summary")!);
    expect(firstCard.open).toBe(true);
    const icons = within(
      screen.getByRole("navigation", { name: "Desktop applications" }),
    );
    expect(icons.getAllByRole("button")).toHaveLength(8);
    fireEvent.click(icons.getByRole("button", { name: "About Me" }));
    const about = within(
      screen.getByRole("region", { name: "About Me window" }),
    );
    const education = within(about.getByRole("region", { name: "Education" }));
    expect(education.getByText("Curtin University")).toBeTruthy();
    expect(
      education.getByText(
        "Bachelor of Technology (Computer Systems and Networking)",
      ),
    ).toBeTruthy();
    expect(education.getByText("Curtin College")).toBeTruthy();
    expect(
      education.getByText("Diploma of Information Technology"),
    ).toBeTruthy();
    expect(education.getByText("2025")).toBeTruthy();
    expect(education.getByText("2022")).toBeTruthy();
    fireEvent.click(icons.getByRole("button", { name: "Projects" }));
    const projects = within(
      screen.getByRole("region", { name: "Projects window" }),
    );
    expect(
      projects.getByRole("article", {
        name: "Enterprise Infrastructure Home Lab",
      }),
    ).toBeTruthy();
    expect(
      projects.getByText(
        "Configured users, file permissions, VLANs, firewall rules and NAT.",
      ),
    ).toBeTruthy();
    fireEvent.click(
      icons.getByRole("button", { name: "Skills & Certifications" }),
    );
    const skillsApp = within(
      screen.getByRole("region", { name: "Skills & Certifications window" }),
    );
    const skills = skillsApp.getByRole("region", { name: "Technical skills" });
    const groups = within(skills);
    expect(groups.getAllByRole("region")).toHaveLength(8);
    expect(
      skillsApp.getByRole("heading", { name: "Certification cabinet" }),
    ).toBeTruthy();
    expect(
      groups.getByRole("region", { name: "Networking & Infrastructure" }),
    ).toBeTruthy();
    fireEvent.click(
      groups.getByRole("button", { name: "Systems Administration" }),
    );
    expect(
      groups
        .getByRole("button", { name: "Systems Administration" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      groups.queryByRole("region", { name: "Networking & Infrastructure" }),
    ).toBeNull();
    expect(groups.getByText("Active Directory")).toBeTruthy();
    fireEvent.click(groups.getByRole("button", { name: "All skills" }));
    expect(
      groups.getByRole("region", { name: "Networking & Infrastructure" }),
    ).toBeTruthy();
    const panel = screen.getByRole("region", { name: "Resume window" });
    expect(
      panel.querySelector('a[download], a[href^="tel:"], a[href^="mailto:"]'),
    ).toBeNull();
    expect(panel.textContent).not.toMatch(/visa|@|\+61/iu);
  });
  it("minimizes, restores, maximizes, closes and reopens a window", () => {
    render(<App />);
    fireEvent.click(
      within(screen.getByRole("region", { name: "About Me window" })).getByRole(
        "button",
        { name: "Minimize About Me" },
      ),
    );
    expect(
      screen.queryByRole("region", { name: "About Me window" }),
    ).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Restore About Me" }));
    let panel = screen.getByRole("region", { name: "About Me window" });
    fireEvent.click(
      within(panel).getByRole("button", { name: "Maximize About Me" }),
    );
    expect(panel.classList.contains("maximized")).toBe(true);
    fireEvent.click(
      within(panel).getByRole("button", { name: "Restore About Me" }),
    );
    expect(panel.classList.contains("maximized")).toBe(false);
    fireEvent.keyDown(panel, { key: "F4", altKey: true });
    expect(document.activeElement).toBe(
      within(
        screen.getByRole("navigation", { name: "Desktop applications" }),
      ).getByRole("button", { name: "About Me" }),
    );
    expect(
      screen.queryByRole("region", { name: "About Me window" }),
    ).toBeNull();
    fireEvent.click(
      within(
        screen.getByRole("navigation", { name: "Desktop applications" }),
      ).getByRole("button", { name: "About Me" }),
    );
    panel = screen.getByRole("region", { name: "About Me window" });
    expect(panel).toBeTruthy();
  });
  it("searches Start, handles empty results and returns focus on Escape", async () => {
    render(<App />);
    const start = screen.getByRole("button", { name: "start" });
    fireEvent.click(start);
    const search = screen.getByRole("textbox", { name: "Search applications" });
    expect(document.activeElement).toBe(search);
    fireEvent.change(search, { target: { value: "network" } });
    const menu = screen.getByRole("dialog", { name: "Start menu" });
    expect(within(menu).getByText("Faraj Enam Ariz")).toBeTruthy();
    expect(
      within(menu).getByRole("button", { name: /Network Lab/ }),
    ).toBeTruthy();
    expect(within(menu).queryByRole("button", { name: /About Me/ })).toBeNull();
    fireEvent.change(search, { target: { value: "no-such-app" } });
    expect(within(menu).getByText("No applications found.")).toBeTruthy();
    fireEvent.keyDown(search, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Start menu" })).toBeNull(),
    );
    expect(document.activeElement).toBe(start);
  });
  it("renders terminal input as text, remembers history and clears output", () => {
    render(<App />);
    fireEvent.click(
      within(
        screen.getByRole("navigation", { name: "Desktop applications" }),
      ).getByRole("button", { name: "Terminal" }),
    );
    const input = screen.getByRole("textbox", { name: "Terminal command" });
    const submit = (command: string) => {
      fireEvent.change(input, { target: { value: command } });
      fireEvent.submit(input.closest("form")!);
    };
    expect(screen.getByText("faraz@farazos:~$")).toBeTruthy();
    submit("whoami");
    expect(screen.getByRole("log").textContent).toContain("Faraj Enam Ariz");
    submit("<script>alert(1)</script>");
    expect(screen.getByRole("log").querySelector("script")).toBeNull();
    expect(screen.getByRole("log").textContent).toContain("Command not found:");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect((input as HTMLInputElement).value).toBe("<script>alert(1)</script>");
    submit("clear");
    expect(screen.getByRole("log").textContent).toBe("");
  });
  it("provides feedback in both learning labs", () => {
    render(<App />);
    const icons = screen.getByRole("navigation", {
      name: "Desktop applications",
    });
    fireEvent.click(within(icons).getByRole("button", { name: "Network Lab" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Simulate a connection" }),
    );
    expect(
      screen.getByText(/Illustrative HTTPS connection complete/),
    ).toBeTruthy();
    fireEvent.click(
      within(icons).getByRole("button", { name: "Security Lab" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Use the known service address/ }),
    );
    expect(screen.getByText("Good call.")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Next scenario" }));
    expect(screen.getByText(/You are configuring a new account/)).toBeTruthy();
  });
});
