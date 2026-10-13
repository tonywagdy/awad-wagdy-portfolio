# Portfolio project sources

The two Al-Amin cards present real delivered projects. Per the owner's decision, the portfolio intentionally contains **no links, URLs, or references** to either project's live website or source code — not in the shipped site and not in this repository. The cards display local screenshots only.

- `public/projects/alamin.jpg` and `public/projects/catalog.jpg` are one-time JPEG captures of the live projects at 1440×1000 with `prefers-reduced-motion` enabled.
- Card feature descriptions were verified against the projects' source code when the cards were built; commit details and URLs are intentionally not recorded here.
- If the screenshots ever need refreshing, capture them again from the live projects and overwrite the two JPEGs. Do not add the project URLs to any file in this repository.

## Verification

- `npm run lint` and `npm run build`.
- Start `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`, then run `node scripts/projects-test.mjs`.
- The test verifies: two cards render from local screenshots, zero outbound links, zero references to the projects' websites or repositories anywhere in the rendered page, filtering, bilingual layout, responsive bounds, collapsed demos, and image failure fallback.
- `TEST_BASE_URL` overrides the preview address for both the project test and the general smoke test.

The AL FARES and LiDAR portfolio demonstrations remain collapsed by default and contain no external links; this change does not independently verify their source projects.
