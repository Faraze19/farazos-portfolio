import { useEffect, useRef, useState } from "react";
import { Search, ArrowUpRight, MapPin, X } from "lucide-react";
import { motion } from "framer-motion";
import { apps } from "../lib/apps";
import type { AppId } from "../lib/apps";
export function StartMenu({
  open,
  close,
}: {
  open: (id: AppId) => void;
  close: () => void;
}) {
  const [query, setQuery] = useState("");
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    menu.current?.querySelector("input")?.focus();
  }, []);
  const filtered = apps.filter((a) =>
    `${a.title} ${a.subtitle}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <button
        className="menu-backdrop"
        tabIndex={-1}
        aria-label="Dismiss Start menu"
        onClick={close}
      />
      <motion.div
        className="start-menu"
        role="dialog"
        aria-label="Start menu"
        ref={menu}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onKeyDown={(e) => {
          const elements = [
            ...menu.current!.querySelectorAll<HTMLElement>("input, button"),
          ];
          if (e.key === "Escape") {
            e.stopPropagation();
            close();
          }
          if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Tab") {
            e.preventDefault();
            const direction =
              e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey) ? -1 : 1;
            const at = elements.indexOf(document.activeElement as HTMLElement);
            elements[
              (at + direction + elements.length) % elements.length
            ]?.focus();
          }
        }}
      >
        <div className="start-profile">
          <span className="start-avatar">fe</span>
          <div>
            <strong>Faraj Enam Ariz</strong>
            <span>
              <MapPin size={12} /> Perth, Western Australia
            </span>
          </div>
          <button
            className="icon-button"
            aria-label="Close Start menu"
            onClick={close}
          >
            <X size={17} />
          </button>
        </div>
        <label className="start-search">
          <Search size={16} />
          <input
            aria-label="Search applications"
            placeholder="Find your next window…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="start-heading">
          YOUR WORKSPACE<span>{filtered.length} applications</span>
        </div>
        <div className="start-apps">
          {filtered.map((app) => (
            <button key={app.id} onClick={() => open(app.id)}>
              <span className={`app-icon small ${app.color}`}>
                <app.icon size={21} />
              </span>
              <span>
                <strong>{app.title}</strong>
                <small>{app.subtitle}</small>
              </span>
              <ArrowUpRight size={15} />
            </button>
          ))}
          {!filtered.length && (
            <p className="no-results">No applications found.</p>
          )}
        </div>
        <div className="start-footer">
          <span className="status-dot" /> FarazOS v0.1
          <span>Made to explore.</span>
        </div>
      </motion.div>
    </>
  );
}
