import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Command,
  MapPin,
  Monitor,
  ShieldCheck,
  Volume2,
  Wifi,
} from "lucide-react";
import { apps, getApp } from "./lib/apps";
import type { AppId } from "./lib/apps";
import { useWindows } from "./hooks/useWindows";
import { Window } from "./components/Window";
import { StartMenu } from "./components/StartMenu";
export default function App() {
  const { windows, dispatch, active } = useWindows();
  const previousActive = useRef(active);
  useEffect(() => {
    if (!active && previousActive.current) {
      desktop.current
        ?.querySelector<HTMLButtonElement>(
          `[data-application="${previousActive.current}"]`,
        )
        ?.focus();
    }
    previousActive.current = active;
  }, [active]);
  const [start, setStart] = useState(false);
  const [info, setInfo] = useState(false);
  const [now, setNow] = useState(new Date());
  const desktop = useRef<HTMLDivElement>(null);
  const startButton = useRef<HTMLButtonElement>(null);
  const open = (id: AppId) => {
    dispatch({ type: "open", id });
    setStart(false);
    setInfo(false);
  };
  const closeStart = () => {
    setStart(false);
    startButton.current?.focus();
  };
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInfo(false);
        if (start) closeStart();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [start]);
  useEffect(() => {
    const resize = () => {
      windows.forEach((w) => dispatch({ type: "move", id: w.id, x: 0, y: 0 }));
    };
    globalThis.addEventListener("resize", resize);
    return () => globalThis.removeEventListener("resize", resize);
  }, [windows, dispatch]);
  const visible = windows.some((w) => !w.minimized);
  return (
    <MotionConfig reducedMotion="user">
      <div className="farazos">
        <a href="#desktop-apps" className="skip-link">
          Skip to applications
        </a>
        <header className="desktop-header">
          <div className="wordmark">
            <span className="logo-symbol" aria-hidden="true">
              f<span>_</span>
            </span>
            <span>
              Faraz<strong>OS</strong>
              <small>PERSONAL DESKTOP</small>
            </span>
            <span className="header-version">v0.1</span>
          </div>
          <div className="header-location">
            <span className="status-dot" /> Perth, Western Australia
            <span className="header-divider" />
            {now.toLocaleDateString("en-AU", {
              weekday: "short",
              day: "numeric",
              month: "short",
              timeZone: "Australia/Perth",
            })}
          </div>
        </header>
        <main ref={desktop} className="desktop" aria-label="FarazOS desktop">
          <div className="wallpaper" aria-hidden="true">
            <div className="wallpaper-grid" />
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="wallpaper-type">
              faraz<span>OS</span>
              <small>CURIOUS BY NATURE. CONNECTED BY DESIGN.</small>
            </div>
            <div className="wallpaper-coordinate">
              31.9523° S &nbsp; 115.8613° E
            </div>
          </div>
          <nav
            id="desktop-apps"
            className="desktop-icons"
            aria-label="Desktop applications"
          >
            {apps.map((app) => (
              <button
                className="desktop-icon"
                data-application={app.id}
                key={app.id}
                onClick={() => open(app.id)}
                title={`Open ${app.title}`}
              >
                <span className={`app-icon ${app.color}`}>
                  <app.icon size={29} strokeWidth={1.65} />
                  <span className="shortcut-arrow" aria-hidden="true">
                    <ArrowUpRight size={10} />
                  </span>
                </span>
                <span>{app.title}</span>
              </button>
            ))}
          </nav>
          <aside className="desktop-note">
            <span className="eyebrow">WELCOME TO MY DESKTOP</span>
            <h2>
              A window into
              <br />
              my world<span>_</span>
            </h2>
            <p>
              IT. Networks. Security.
              <br />
              And a healthy dose of curiosity.
            </p>
            <button onClick={() => open("about")}>
              Meet Faraz
              <ChevronRight size={14} />
            </button>
          </aside>
          <div className="desktop-bottom-note">
            <span className="status-dot" /> SYSTEM READY
            <span className="desktop-tip">
              Click an icon. Make yourself at home.
            </span>
          </div>
          {windows.map((w, i) => (
            <Window
              key={w.id}
              window={w}
              index={i}
              active={active === w.id}
              dispatch={dispatch}
              open={open}
              desktop={desktop}
            />
          ))}
        </main>
        <AnimatePresence>
          {start && <StartMenu open={open} close={closeStart} />}
        </AnimatePresence>
        {info && (
          <div
            className="system-info"
            role="dialog"
            aria-label="Desktop information"
          >
            <div className="eyebrow">FARAZOS / SYSTEM INFO</div>
            <h3>Your browser is the desktop.</h3>
            <p>
              Local portfolio experience · no real network or security status is
              monitored.
            </p>
            <p>
              <MapPin size={13} /> Time zone: Australia/Perth
            </p>
            <p className="keyboard-guide">
              Keyboard: Tab to navigate, Enter to open.
              <br />
              In a window: Alt+F9 minimize, Alt+F10 maximize, Alt+F4 close.
              Alt+Shift+Arrow moves a window.
            </p>
            <button className="text-button" onClick={() => setInfo(false)}>
              Close
              <ChevronRight size={14} />
            </button>
          </div>
        )}
        <footer className="taskbar">
          <button
            ref={startButton}
            className={`start-button ${start ? "pressed" : ""}`}
            aria-expanded={start}
            aria-haspopup="dialog"
            onClick={() => {
              setStart(!start);
              setInfo(false);
            }}
          >
            <span className="start-logo">
              <Command size={21} />
            </span>
            <span>start</span>
          </button>
          <div className="taskbar-divider" />
          <div className="taskbar-apps" aria-label="Open windows">
            {windows.map((w) => {
              const app = getApp(w.id);
              return (
                <button
                  key={w.id}
                  className={`taskbar-app ${active === w.id && !w.minimized ? "selected" : ""} ${w.minimized ? "is-minimized" : ""}`}
                  aria-label={`${w.minimized ? "Restore" : active === w.id ? "Minimize" : "Focus"} ${app.title}`}
                  aria-pressed={active === w.id && !w.minimized}
                  onClick={() =>
                    dispatch({
                      type:
                        active === w.id && !w.minimized ? "minimize" : "focus",
                      id: w.id,
                    })
                  }
                >
                  <app.icon size={17} />
                  <span>{app.title}</span>
                </button>
              );
            })}
          </div>
          <button
            className="system-tray"
            aria-label="Show desktop information and keyboard shortcuts"
            aria-expanded={info}
            onClick={() => {
              setInfo(!info);
              setStart(false);
            }}
          >
            <ShieldCheck size={16} />
            <Wifi size={16} />
            <Volume2 size={16} />
            <span>
              <strong>
                {now.toLocaleTimeString("en-AU", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "Australia/Perth",
                })}
              </strong>
              <small>PERTH · AWST</small>
            </span>
          </button>
          <button
            className="show-desktop"
            aria-label={
              visible ? "Show desktop and minimize all windows" : "Show desktop"
            }
            title="Show desktop"
            onClick={() => {
              dispatch({ type: "desktop" });
              setInfo(false);
              setStart(false);
            }}
          >
            <Monitor size={15} />
          </button>
        </footer>
      </div>
    </MotionConfig>
  );
}
