# FarazOS — Phase 1

An original interactive IT portfolio for **Faraz Enam**, based in **Perth, Western Australia**. Windows XP desktop nostalgia meets a modern navy, blue and cyan identity. The general desktop interaction concept was referenced from https://a4feef.github.io/portfolio/; no source code or assets were copied. Wallpaper, wordmark and favicon are original CSS/SVG; application icons are from Lucide.

## Install and preview

Requires Node.js **22.12+** (Node 24 recommended) and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, including `/farazos-portfolio/` (normally `http://localhost:5173/farazos-portfolio/`).

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

The preview serves the production build, normally at `http://localhost:4173/farazos-portfolio/`. `dist/` is generated and ignored by Git.

## What works

- Eight application windows: About Me, Resume, Projects, Skills & Certifications, Terminal, Network Lab, Security Lab and Contact.
- Click/tap or keyboard-open desktop icons, searchable Start menu, active taskbar indicators and Show Desktop.
- Desktop window dragging, focus stacking, minimize/restore, maximize/restore and close. Double-click a title bar to maximize. One instance of each app; app state survives minimizing and resets when closed.
- Small screens use fixed, full-workspace windows with internally scrolling content and a horizontally scrolling taskbar. Desktop positions reset on viewport resize so title bars remain reachable.
- Keyboard focus indicators, semantic buttons and labels, Start menu focus containment, Escape dismissal, reduced-motion support and terminal output announcements.
- Perth clock and date independent of the visitor's time zone.
- A simulated network topology and connection trace, plus three security awareness scenarios with feedback.
- Contact can copy the supplied name and location. There is no contact submission endpoint.

### Keyboard controls

Tab / Shift+Tab move focus; Enter or Space activates buttons. The Start menu supports Up/Down navigation and Escape to dismiss. Inside a focused window:

| Shortcut        | Action                  |
| --------------- | ----------------------- |
| Alt+F9          | Minimize                |
| Alt+F10         | Maximize / restore      |
| Alt+F4          | Close                   |
| Alt+Shift+Arrow | Move by 20px on desktop |

Browser/OS shortcuts can intercept these combinations; all actions also have visible buttons. Touch/mobile windows stay fixed in the workspace rather than requiring dragging.

### Safe terminal

Only `help`, `whoami`, `about`, `skills`, `projects`, `clear` and `date` are recognised. Up/Down recalls command history. Input is processed with a fixed switch and rendered as React text. It is never passed to a shell, `eval`, a backend or a network API. Labs also run entirely in the browser; IP addresses are documentation-only ranges. System tray icons are decorative portfolio UI, not actual device/network status.

## Content and honesty

Only the supplied name, location and portfolio direction are treated as confirmed. Employment history, education, credentials, contact addresses and completed project evidence are deliberately absent. Planned project ideas, learning areas and lab demos are labelled accordingly. Add verified content in `src/components/AppContent.tsx`; update the terminal copy in `src/lib/terminal.ts` at the same time. Add a resume download or professional links only when real, approved assets/details exist.

## Structure

```text
src/
  App.tsx                     Desktop, wallpaper, taskbar and system info
  components/Window.tsx       Accessible window shell and drag controls
  components/StartMenu.tsx    Search and keyboard navigation
  components/AppContent.tsx   Portfolio content
  components/Terminal.tsx     Terminal history and input
  components/Labs.tsx         Interactive simulated labs
  hooks/useWindows.ts         Typed window state reducer
  lib/apps.ts                 Central application registry
  lib/terminal.ts             Pure command allowlist
  styles.css                  Tailwind entry, theme and responsive styling
```

React + TypeScript + Vite, Tailwind CSS v4 via its Vite plugin, Framer Motion and Lucide React. No external fonts or image services are required. Vitest covers the window reducer and safe terminal interpreter, including rejected shell syntax and Perth date boundaries. DOM integration tests cover all eight apps, window controls, Start search/focus, terminal input/history and both learning labs. DOM tests do not replace visual browser or screen-reader review.

## Manual review checklist

1. Open all eight apps from desktop and Start, filter the Start list, and try a no-results search.
2. Drag, minimize, restore, maximize and close windows. Confirm taskbar focus and Show Desktop work.
3. Use keyboard-only navigation; check Start focus and Escape, window action buttons and shortcuts.
4. Try each terminal command, history, clear and an unsupported command.
5. Select each network node, toggle the simulated trace and answer each security scenario.
6. Check 375px/700px/mobile and wide desktop sizes, resize after dragging, and review with reduced motion enabled.
7. Confirm all career/project placeholders remain explicit and no unverified links appear.

## Future GitHub Pages deployment — approval required

**No deployment workflow is included or enabled by this change.** Vite already sets `base: '/farazos-portfolio/'` in `vite.config.ts` so production assets resolve for the repository's Pages subpath.

After review and explicit deployment approval:

1. Merge the approved changes and configure repository Settings → Pages → GitHub Actions.
2. Add a reviewed Pages workflow that checks out the repo, sets up Node 24, runs `npm ci`, `npm run typecheck`, `npm test` and `npm run build`.
3. Upload `dist/` with `actions/upload-pages-artifact` and deploy with `actions/deploy-pages`, granting only the required `contents: read`, `pages: write` and `id-token: write` permissions and the `github-pages` environment.
4. Verify the published `/farazos-portfolio/` path and asset loading.

There are no deployment credentials, analytics, data collection, arbitrary command execution or third-party requests in the application. Browser visual and assistive-technology review should be completed before release.
