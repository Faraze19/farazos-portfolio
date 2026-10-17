// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { HomeLabCaseStudy } from "./HomeLabCaseStudy";
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(cleanup);
describe("documented home lab case study", () => {
  it("keeps supplied facts separate from unknown topology details", () => {
    render(<HomeLabCaseStudy />);
    const details = within(
      screen.getByRole("region", { name: "Selected component details" }),
    );
    expect(details.getByText("192.168.100.10")).toBeTruthy();
    expect(details.getByText("homelab.local")).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: /Ubuntu01 Ubuntu Server/ }),
    );
    expect(details.getByText("192.168.100.30")).toBeTruthy();
    expect(details.queryByText("192.168.100.10")).toBeNull();
    fireEvent.click(
      screen.getByRole("button", {
        name: /Lab subnet Documented network range/,
      }),
    );
    expect(details.getByText("192.168.100.0/24")).toBeTruthy();
    expect(
      details.getByText(/no physical or virtual connection map supplied/),
    ).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", {
        name: /Windows 11 client Domain-joined client/,
      }),
    );
    expect(
      details.getByText("Hostname / IP address").nextElementSibling
        ?.textContent,
    ).toBe("Not supplied");
    fireEvent.click(
      screen.getByRole("button", {
        name: /VMware Workstation Virtualisation platform/,
      }),
    );
    expect(details.getByText(/adapter mode/)).toBeTruthy();
    expect(screen.getByText(/No links are drawn/)).toBeTruthy();
  });
  it("provides six expandable technical guides without claiming test results", () => {
    render(<HomeLabCaseStudy />);
    const guides = screen.getByRole("region", {
      name: "03 / Configuration Walkthroughs",
    });
    const disclosures = guides.querySelectorAll("details");
    expect(disclosures).toHaveLength(6);
    for (const disclosure of disclosures) {
      expect(disclosure.open).toBe(false);
      fireEvent.click(disclosure.querySelector("summary")!);
      expect(disclosure.open).toBe(true);
      expect(disclosure.textContent).toContain("Evidence pending:");
    }
    expect(guides.textContent).toContain("not a verified step-by-step record");
    expect(guides.querySelector("pre, code, img")).toBeNull();
  });
  it("retains the genuine build while leaving issue outcomes and evidence unverified", () => {
    const { container } = render(<HomeLabCaseStudy />);
    expect(screen.getByText("Built · owner-confirmed")).toBeTruthy();
    expect(screen.getByText("Documentation in progress")).toBeTruthy();
    expect(screen.getByText("GNS3 virtualisation issue")).toBeTruthy();
    expect(
      screen.getByText("Unverified. No successful resolution is claimed."),
    ).toBeTruthy();
    expect(screen.getAllByText("Screenshot not supplied")).toHaveLength(6);
    expect(screen.getAllByText("Awaiting genuine evidence")).toHaveLength(6);
    expect(container.querySelector("img, a[download]")).toBeNull();
  });
  it("moves keyboard focus to the requested section", () => {
    render(<HomeLabCaseStudy />);
    const nav = within(
      screen.getByRole("navigation", { name: "Home lab case study sections" }),
    );
    fireEvent.click(
      nav.getByRole("button", { name: "05 Evidence & Documentation" }),
    );
    expect(document.activeElement).toBe(
      screen.getByRole("heading", { name: "05 / Evidence & Documentation" }),
    );
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
