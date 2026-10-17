import { useEffect, useRef, useState } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import { Minus, Square, X, Copy } from "lucide-react";
import { getApp } from "../lib/apps";
import type { WindowState, WindowAction } from "../hooks/useWindows";
import type { Dispatch } from "react";
import type { AppId } from "../lib/apps";
import { AppContent } from "./AppContent";
type Props = {
  window: WindowState;
  index: number;
  active: boolean;
  dispatch: Dispatch<WindowAction>;
  open: (id: AppId) => void;
  desktop: React.RefObject<HTMLDivElement | null>;
};
export function Window({
  window: w,
  index,
  active,
  dispatch,
  open,
  desktop,
}: Props) {
  const app = getApp(w.id);
  const controls = useDragControls();
  const [compact, setCompact] = useState(
    () => matchMedia("(max-width: 700px)").matches,
  );
  useEffect(() => {
    const query = matchMedia("(max-width: 700px)");
    const update = () => setCompact(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const panel = useRef<HTMLElement>(null);
  const x = useMotionValue(w.x);
  const y = useMotionValue(w.y);
  useEffect(() => {
    if (
      active &&
      !w.minimized &&
      !panel.current?.contains(document.activeElement)
    )
      panel.current?.focus({ preventScroll: true });
  }, [active, w.minimized]);
  useEffect(() => {
    x.set(w.maximized ? 0 : w.x);
    y.set(w.maximized ? 0 : w.y);
  }, [w.maximized, w.x, w.y, x, y]);
  return (
    <motion.section
      ref={panel}
      tabIndex={-1}
      role="region"
      aria-label={`${app.title} window`}
      className={`os-window ${w.maximized ? "maximized" : ""} ${active ? "active" : ""} ${w.id === "terminal" ? "terminal-window" : ""}`}
      style={{
        x,
        y,
        zIndex: index + 10,
        display: w.minimized ? "none" : undefined,
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.16 }}
      drag={!w.maximized && !compact}
      dragListener={false}
      dragControls={controls}
      dragConstraints={desktop}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={() =>
        dispatch({ type: "move", id: w.id, x: x.get(), y: y.get() })
      }
      onPointerDown={() => {
        if (!active) dispatch({ type: "focus", id: w.id });
      }}
      onFocusCapture={() => {
        if (!active) dispatch({ type: "focus", id: w.id });
      }}
      onKeyDown={(e) => {
        if (e.altKey && e.key === "F4") {
          e.preventDefault();
          dispatch({ type: "close", id: w.id });
        }
        if (e.altKey && e.key === "F9") {
          e.preventDefault();
          dispatch({ type: "minimize", id: w.id });
        }
        if (e.altKey && e.key === "F10") {
          e.preventDefault();
          dispatch({ type: "maximize", id: w.id });
        }
        if (
          e.altKey &&
          e.shiftKey &&
          ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) &&
          !w.maximized &&
          !compact
        ) {
          e.preventDefault();
          const rect = panel.current!.getBoundingClientRect();
          const bounds = desktop.current!.getBoundingClientRect();
          const dx =
            e.key === "ArrowLeft" ? -20 : e.key === "ArrowRight" ? 20 : 0;
          const dy = e.key === "ArrowUp" ? -20 : e.key === "ArrowDown" ? 20 : 0;
          dispatch({
            type: "move",
            id: w.id,
            x: Math.max(
              bounds.left - rect.left + w.x,
              Math.min(bounds.right - rect.right + w.x, w.x + dx),
            ),
            y: Math.max(
              bounds.top - rect.top + w.y,
              Math.min(bounds.bottom - rect.bottom + w.y, w.y + dy),
            ),
          });
        }
      }}
    >
      <div
        className="window-titlebar"
        onPointerDown={(e) => {
          if (!(e.target as HTMLElement).closest("button")) controls.start(e);
        }}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest("button"))
            dispatch({ type: "maximize", id: w.id });
        }}
      >
        <span className={`title-icon ${app.color}`}>
          <app.icon size={15} />
        </span>
        <span>{app.title}</span>
        <span className="title-path">/ farazos</span>
        <div className="window-controls">
          <button
            aria-label={`Minimize ${app.title}`}
            onClick={() => dispatch({ type: "minimize", id: w.id })}
          >
            <Minus size={16} />
          </button>
          <button
            aria-label={`${w.maximized ? "Restore" : "Maximize"} ${app.title}`}
            onClick={() => dispatch({ type: "maximize", id: w.id })}
          >
            {w.maximized ? <Copy size={13} /> : <Square size={13} />}
          </button>
          <button
            className="close-button"
            aria-label={`Close ${app.title}`}
            onClick={() => dispatch({ type: "close", id: w.id })}
          >
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="window-toolbar">
        <span>FarazOS</span>
        <span className="toolbar-divider">/</span>
        <span>{app.title}</span>
        <span className="toolbar-right">
          {w.id === "about" ? "README.md" : `${w.id}.app`}
        </span>
      </div>
      <div className="window-content">
        <AppContent id={w.id} open={open} />
      </div>
      <div className="window-status">
        <span>
          <span className="tiny-dot" />
          {app.title}
        </span>
        <span>FarazOS · Phase 1</span>
      </div>
    </motion.section>
  );
}
