# Phase 2D — Homepage Polish

## Commit message
phase-2d: remove status rotator, enable smooth scroll

## What changed
The status rotator widget (dot, cycling list, pause button) was removed from the Hero section. The hero composition now ends cleanly after the rose CTA pill: eyebrow → headline → subhead → intro → CTA. A single `scroll-behavior: smooth` property was merged into the existing `html` rule in `global.css`, enabling CSS-native smooth scrolling for all in-page anchor clicks (including the Hero CTA `href="#work"`). No JavaScript was added; the browser handles animation and automatically disables it for users with `prefers-reduced-motion: reduce`.

## Files modified
- `src/components/Hero.astro` (status rotator markup and CSS removed)
- `src/styles/global.css` (`scroll-behavior: smooth` added to `html` rule)

## Lines removed from Hero.astro
~56 lines removed: 56 lines of markup (lines 28–83 in the pre-change file) and ~60 lines of scoped CSS (8 rule blocks: `.status-rotator`, `__dot`, `__list`, `__item`, `__item[aria-hidden="true"]`, `__link`, `__arrow`, `__pause`).

## Removed from project scope
- The status rotator component (was in Phase 2A)
- **Animation ⑦ from ANIMATION_PROMPT.md** — rotation, pause button, item cycling. The animations phase no longer needs to build this. The pause button SVG and `data-status-*` attributes are gone entirely.

## Regressions checked
- `npm run build` succeeds, no new warnings (pre-existing copy.md content warning unchanged)
- `grep -r "status-rotator" dist/` — zero matches in HTML and CSS bundles
- Hero renders: eyebrow → headline → subhead → intro → rose CTA (composition ends there)
- Smooth scroll wired: `href="#work"` CTA scrolls to Work section via CSS-native animation
- `prefers-reduced-motion` respected automatically by browser (no manual handling needed)

## Open questions for designer
None.
