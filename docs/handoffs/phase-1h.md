# Phase 1H — Footer Grid Breakpoint Adjustment

## Commit message
phase-1h: footer grid engages at 1024px, single-column below

## What changed
Two targeted changes to the `<style>` block in `Footer.astro`:

**Change 1 — Grid breakpoint raised from 768px to 1024px.**
`.footer__top` is now `display: block` by default (no media query), so all viewports
below 1024px get the single-column stacked layout. The two-column grid is enabled
only inside `@media (min-width: 1024px)`. The `margin-bottom` values on
`.footer__eyebrow`, `.footer__headline`, `.footer__body`, and `.footer__contact` are
now set on the element rules (the default block layout needs them). The grid media
query explicitly resets them to `0` so row-gap handles spacing at desktop. The
redundant `@media (max-width: 767px)` block that previously re-enabled `display:
block` and restored margin-bottoms is removed; only the mobile padding rule
(`padding: var(--space-10) 0`) remains under that breakpoint.

**Change 2 — `flex-wrap: wrap` removed from `.footer__bottom`.**
The bottom bar (brand / nav / copyright) stays on a single row at all widths ≥768px.
The mobile `flex-direction: column` rule at ≤767px is unchanged.

## Files modified
- `src/components/Footer.astro` (`<style>` block only)

## Lines changed
~15 lines modified / removed.

## Regressions checked
- `npm run build` — clean, no warnings
- Grid breakpoint: confirmed `min-width: 1024px` in built CSS
- Default `display: block` on `.footer__top` — no grid below 1024px
- `margin-bottom` present on element rules (block layout), zeroed in grid MQ
- `flex-wrap` removed from `.footer__bottom` — single-row bar at ≥768px
- `flex-direction: column` at ≤767px on `.footer__bottom` — preserved
- Teal hairline, zone 2 border-top, all colour tokens — unchanged
- `max-width: 540px` on headline, `max-width: 480px` on body — unchanged
- Sticky-footer rules in `global.css` — not touched

## Open questions
None. The 768px / 1024px breakpoint distinction is now clean: Zone 1 grid
engages at 1024px, bottom bar stacks at 767px.
