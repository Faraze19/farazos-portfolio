import { useReducer } from "react";
import type { AppId } from "../lib/apps";
export type WindowState = {
  id: AppId;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
};
export type WindowAction =
  | { type: "open" | "focus" | "minimize" | "maximize" | "close"; id: AppId }
  | { type: "move"; id: AppId; x: number; y: number }
  | { type: "desktop" };
export function windowsReducer(
  state: WindowState[],
  action: WindowAction,
): WindowState[] {
  if (action.type === "desktop")
    return state.map((w) => ({ ...w, minimized: true }));
  const found = state.find((w) => w.id === action.id);
  if (action.type === "open" || action.type === "focus") {
    const window = found
      ? { ...found, minimized: false }
      : { id: action.id, minimized: false, maximized: false, x: 0, y: 0 };
    return [...state.filter((w) => w.id !== action.id), window];
  }
  if (action.type === "close") return state.filter((w) => w.id !== action.id);
  return state.map((w) =>
    w.id !== action.id
      ? w
      : action.type === "move"
        ? { ...w, x: action.x, y: action.y }
        : action.type === "minimize"
          ? { ...w, minimized: true }
          : { ...w, maximized: !w.maximized },
  );
}
export function useWindows() {
  const [windows, dispatch] = useReducer(windowsReducer, [
    { id: "about", minimized: false, maximized: false, x: 0, y: 0 },
  ]);
  return {
    windows,
    dispatch,
    active: [...windows].reverse().find((w) => !w.minimized)?.id,
  };
}
