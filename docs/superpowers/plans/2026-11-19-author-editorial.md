# Author editorial redesign implementation plan

**Goal:** Apply the selected home editorial dynamic direction to sobre-o-autor.html.
**Architecture:** Preserve biography, archive URLs, videos, setup and global navigation. Page-specific CSS and vanilla JS progressively enhance native disclosure panels, chapter navigation, a horizontal archive and an accessible native dialog.
**Tech Stack:** Existing static HTML, Space Grotesk / Inter, CSS and vanilla JavaScript; no added dependencies.
**Spec:** User selected the same editorial dynamic direction as home: portrait/name hero, music/physiotherapy/BAP narrative, expandable formation, engaging photo gallery, videos and setup. White, graphite, #d90032, existing real imagery, mobile and reduced motion.

## Tasks
- [ ] Preserve current published content and links as regression baseline; add failing disclosure and gallery contract checks.
- [ ] Update only author page markup; add author-editorial.css and author-editorial.js. Use a native dialog for Escape, focus containment and focus restoration; disable the old author lightbox initialization on this page by retiring its modal ID.
- [ ] Validate 320/390/768/1280 widths, all four disclosures, archive scrolling/limits, dialog buttons/keyboard/Escape, image errors and CTA destinations. Existing content remains readable without JS.
- [ ] Independent review, fix material issues, publish homologation branch, confirm Vercel bap build, merge under current authorization, verify production and provide URL/commit/screenshot.

## Review focus
No title overflow at small widths; no unsupported biography claims; no duplicated generated art; modal must contain focus and return it to trigger; scrolling and active gallery states stay in sync; no content hidden if animations/JS fail.
