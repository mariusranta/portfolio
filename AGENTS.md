# Repository Guidelines

## Project Structure

This is a small, dependency-free static site. The repository root contains `index.html` and `styles.css`; terminal behavior lives in `scripts/`:

- `app.js` wires page startup, command submission, and history.
- `commands.js` parses commands and produces command output.
- `terminal.js` renders transcript lines, links, and timelines.
- `window-controls.js` handles terminal minimize, maximize, close, and reopen.\n- `projects-window.js` renders the Projects document and its in-page window controls, including image and playable video blocks.

`ARCHITECTURE.md` documents the boundaries and regression checklist. Keep the site static and avoid adding a framework or build step without a clear need.

## Development and Checks

There is no build step, package manager, or automated test suite. To preview locally, run `python -m http.server 8000` from the repository root and open `http://localhost:8000`. For a content or command edit, inspect the changed files and manually exercise the affected command in a browser. Check keyboard history, clear behavior, window controls, and a narrow viewport when changing interaction or layout.

## Code Style

Use two spaces for indentation, double quotes in JavaScript, and semicolons. Keep CSS class names descriptive and kebab-case; use camelCase for JavaScript variables and functions. The command interface is implemented with an explicit switch in `scripts/commands.js`; keep its help text synchronized, except for intentionally hidden commands. Render user-entered or dynamic text with `textContent`, not `innerHTML`. Keep terminal styling readable, responsive, and consistent with the green-on-black console theme.

## Testing Guidelines

No test framework or coverage target is configured. Verify relevant behavior manually in a browser. For command changes, try the command and an unknown command; for responsive or window changes, inspect desktop and mobile widths and use the controls with mouse and keyboard.

## Commits and Pull Requests

Recent commits use short, imperative summaries such as “Update contact details” and “Present experience as terminal timeline.” Follow that pattern. Pull requests should explain the user-visible change, include screenshots for visual updates, and state the checks performed. Link an issue when one exists. Changes merged or pushed to `main` trigger the connected Vercel deployment; confirm the deployment is ready before reporting a live update.

## Configuration and Secrets

This static site needs no environment variables. Do not commit credentials, access tokens, or private contact information beyond details explicitly intended for publication.
