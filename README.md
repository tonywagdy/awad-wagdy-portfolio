# Awad Wagdy — Professional Portfolio

A bilingual (Arabic/English with full RTL support) dark interactive portfolio and CV for **Awad Wagdy Awad** — Full-Stack Software Engineer, Desktop Systems Specialist (Offline & Online), and Computer Vision & LiDAR QA Expert.

Built with React 19, TypeScript, Vite, Tailwind CSS v4, and Motion. This is a fully static front end — no backend and no API keys required.

## Run Locally

**Prerequisites:** Node.js 18+ (or a compatible runtime)

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open http://localhost:3000

## Portfolio UI checks

- `npm run lint` checks TypeScript.
- `npm run build` produces the production site in `dist`.
- `npm run preview` serves the build for browser checks (default port 4173).
- Optional browser smoke test: install Playwright with `npm install --no-save --package-lock=false playwright`, then run `node scripts/smoke-test.mjs` while the preview server is running. Both tests read `TEST_BASE_URL` (default `http://127.0.0.1:4173`) and use installed Microsoft Edge by default; set `PLAYWRIGHT_CHANNEL` to another installed supported channel if needed.
- The smoke test covers hero tabs and keyboard controls, CV modal dialog with Escape and print isolation, Arabic/RTL and language persistence, mobile navigation and Escape, sticky navigation, portfolio filtering, reduced-motion CSS, responsive hero/control bounds, and uncaught browser errors. Screenshots are saved under `artifacts`.
- Project cards test: run `node scripts/projects-test.mjs` against the preview server to verify the Al-Amin cards render from local screenshots with no outbound links or references to the client projects anywhere in the page.

The interface respects `prefers-reduced-motion`, disables decorative WebGL on small or coarse-pointer screens, and remembers the selected language when browser storage is available.
