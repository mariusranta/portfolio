# Terminal Portfolio Architecture

## Current implementation

The site is a dependency-free static page. The root `index.html` currently contains the semantic page structure, all terminal/window CSS, and the command interpreter and window-control behavior in one inline script. Vercel serves the repository as a static site; there is no package manager, build step, or automated test suite.

## Proposed architecture

Keep the site static and dependency-free, and separate its concerns into small same-origin files:

```text
index.html                  Page metadata and terminal/window shell
styles.css                  Existing terminal, responsive, and window styling
scripts/
  app.js                    Startup, command form, history, input focus, wiring
  commands.js               Existing command parser, command output, timeline data
  terminal.js               Safe transcript, command, timeline, and link rendering
  window-controls.js        Minimize, maximize, close, reopen behavior
ARCHITECTURE.md             This plan and the regression checklist
```

The HTML keeps the existing element IDs, classes, labels, content, and semantics. CSS rules are moved without visual redesign. JavaScript is split by responsibility while keeping the current command names, output strings, case handling, history behavior, and window-control transitions. Dynamic text continues to render through `textContent`; command links retain their current targets and security attributes.

Load `styles.css` as a normal stylesheet and `scripts/app.js` as a native ES module. Native modules defer execution until parsing is complete. The static host can cache these same-origin assets, and the page gains no runtime or build dependencies. The existing static deployment target remains the repository root.

## Verification plan

1. Capture the current page at desktop (1440×900) and mobile (390×844) before editing, then compare after editing. Check the black canvas, green monospace terminal text, title bar, window controls, line spacing, transcript scrolling, and mobile breakpoint.
2. Compare the command outputs for `help`, `about`, `projects`, `experience`, `contact`, `whoami`, `date`, `echo`, `clear`, `cls`, `dir`, `ver`, `gf`, and `girlfriend`; include mixed-case and unknown commands.
3. Exercise Enter submission, Up/Down history and draft restoration, clear behavior, minimize/restore, maximize/restore, close/reopen, input focus, external links, and a narrow viewport.
4. Check that every referenced asset loads, the JavaScript parses, dynamic output is still rendered safely, and the Vercel preview deployment succeeds before promoting the verified commit to production.

## Scope

This is an implementation-only refactor. Do not change the page copy, command output, terminal colors, font stack, layout, breakpoints, accessibility labels, or interaction semantics.
