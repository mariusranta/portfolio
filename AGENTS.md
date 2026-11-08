# Repository Guidelines

## Project Structure

This is a small, dependency-free static site. The repository root contains index.html, which holds the page markup, styles, and command-line interaction. There are currently no separate source, asset, or test directories. Keep changes focused in this file unless the project gains a clear need for additional files.

## Development and Checks

There is no build step, package manager, or automated test suite. To preview locally, run python -m http.server 8000 from the repository root and open http://localhost:8000. For a simple content edit, inspect the changed HTML and manually exercise the affected command in a browser. Check keyboard history, clear behavior, window controls, and a narrow viewport when changing interaction or layout.

## Code Style

Use two spaces for indentation, double quotes in JavaScript, and semicolons. Keep CSS class names descriptive and kebab-case; use camelCase for JavaScript variables and functions. The command interface is implemented with an explicit switch in index.html; add commands there and keep help text synchronized, except for intentionally hidden commands. Render user-entered or dynamic text with textContent, not innerHTML. Keep terminal styling readable, responsive, and consistent with the green-on-black console theme.

## Testing Guidelines

No test framework or coverage target is configured. Verify relevant behavior manually in a browser. For command changes, try the command and an unknown command; for responsive or window changes, inspect desktop and mobile widths and use the controls with mouse and keyboard.

## Commits and Pull Requests

Recent commits use short, imperative summaries such as “Update contact details” and “Present experience as terminal timeline.” Follow that pattern. Pull requests should explain the user-visible change, include screenshots for visual updates, and state the checks performed. Link an issue when one exists. Changes merged or pushed to main trigger the connected Vercel deployment; confirm the deployment is ready before reporting a live update.

## Configuration and Secrets

This static site needs no environment variables. Do not commit credentials, access tokens, or private contact information beyond details explicitly intended for publication.
