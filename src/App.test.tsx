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
    expect(screen.getByText("Contact details coming soon")).toBeTruthy();
    expect(
      screen.getByText(
        "No verified certifications listed yet. Credential names, dates and verification links will be added only after confirmation.",
      ),
    ).toBeTruthy();
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
    submit("whoami");
    expect(screen.getByRole("log").textContent).toContain("Faraz Enam");
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
