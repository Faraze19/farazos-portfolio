import { describe, expect, it } from "vitest";
import { windowsReducer } from "./useWindows";
import type { WindowState } from "./useWindows";
const initial: WindowState[] = [
  { id: "about", minimized: false, maximized: false, x: 0, y: 0 },
];
describe("window lifecycle", () => {
  it("opens one instance per app and brings existing apps to the front", () => {
    let state = windowsReducer(initial, { type: "open", id: "terminal" });
    state = windowsReducer(state, { type: "open", id: "about" });
    expect(state.map((w) => w.id)).toEqual(["terminal", "about"]);
    expect(state).toHaveLength(2);
  });
  it("preserves position and maximized state when minimizing and restoring", () => {
    let state = windowsReducer(initial, {
      type: "move",
      id: "about",
      x: 40,
      y: -20,
    });
    state = windowsReducer(state, { type: "maximize", id: "about" });
    state = windowsReducer(state, { type: "minimize", id: "about" });
    expect(state[0].minimized).toBe(true);
    state = windowsReducer(state, { type: "focus", id: "about" });
    expect(state[0]).toEqual({
      id: "about",
      x: 40,
      y: -20,
      maximized: true,
      minimized: false,
    });
    state = windowsReducer(state, { type: "maximize", id: "about" });
    expect(state[0].maximized).toBe(false);
  });
  it("shows the desktop without closing apps and removes closed windows", () => {
    let state = windowsReducer(initial, { type: "open", id: "security" });
    state = windowsReducer(state, { type: "desktop" });
    expect(state.every((w) => w.minimized)).toBe(true);
    state = windowsReducer(state, { type: "close", id: "security" });
    expect(state.map((w) => w.id)).toEqual(["about"]);
    expect(initial[0].minimized).toBe(false);
  });
});
