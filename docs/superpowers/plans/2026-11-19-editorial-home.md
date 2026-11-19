# BAP editorial home implementation plan

**Goal:** Redesign only the Método BAP and Livro home sections using the approved editorial dynamic direction.
**Architecture:** Progressive enhancement with isolated HTML/CSS/JS. Native disclosure buttons for four pillars; scroll-snap book gallery with buttons, keyboard and touch scrolling. Existing pages and funnel remain unchanged.
**Tech Stack:** Static HTML, CSS, vanilla JavaScript; no new dependencies.
**Spec:** Approved design in this conversation (2026-11-19).

## Constraints
White, graphite, #d90032; Space Grotesk and Inter; real repository images; >=44px controls; reduced motion; no dark mode. Preserve method/book CTAs and all markup outside the two features, apart from loading the isolated stylesheet/script.

## Tasks
- [ ] Verify current baseline and create homologation branch from main.
- [ ] Add failing interaction checks for pillar toggles and gallery navigation.
- [ ] Replace only the two feature sections; add home-editorial.css and home-editorial.js.
- [ ] Verify no-JS readable content, keyboard controls, touch scrolling, reduced motion, asset paths, scope preservation and responsive layouts at 320/390/768/1280.
- [ ] Review diff, publish homologation and verify deployment.
- [ ] Merge tested changes to main under existing publication authorization; verify production and report commit/deployment.

## Review focus
Small screens must not overflow; inactive disclosure text must remain reachable; gallery controls must match actual scroll position; images must retain aspect ratio; animation must never hide content if JS fails.
