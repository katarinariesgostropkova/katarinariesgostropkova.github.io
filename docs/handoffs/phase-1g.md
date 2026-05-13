# Phase 1G — Footer Horizontal Layout Redesign

## Commit message
phase-1g: footer two-column asymmetric layout

## What changed
The footer `<style>` block in `Footer.astro` was refactored to fix a horizontal
layout problem: Zone 1 content was constrained to `--container-max` (900px), leaving
large empty Deep Tide bands on either side at wide viewports. The inner container
(`.footer__inner`) now uses `--container-wide` (1200px) with `margin: 0 auto` and
responsive horizontal padding, so content fills the wider space at desktop. Zone 1
(`.footer__top`) becomes a two-column CSS Grid on viewports ≥768px — editorial
content (eyebrow, headline, body copy) in column 1 (`1fr`), contact actions (email
row, LinkedIn) in column 2 (`auto`, `justify-self: end`). Grid `row-gap` replaces
`margin-bottom` on all column elements for consistent vertical rhythm. Below 768px
the grid collapses to `display: block` with margin-bottoms restored. Zone 2
(`.footer__bottom`) is unchanged structurally — it inherits the wider container and
its existing `justify-content: space-between` flex layout fills the new width
naturally. The `::before` teal hairline remains on `.site-footer` and spans the full
viewport width independently of the container.

## Files modified
- `src/components/Footer.astro` (`<style>` block only — no template markup changes)

## Lines of CSS changed
~50 lines replaced / restructured within the `<style>` block.

## Token usage
All tokens are pre-existing. No new tokens introduced.

| Token | Usage |
|---|---|
| `--container-wide` (1200px) | `.footer__inner` max-width — replaces `--container-max` |
| `--padding-desktop` (48px) | `.footer__inner` horizontal padding at ≥1024px |
| `--padding-tablet` (32px) | `.footer__inner` horizontal padding at 768–1023px |
| `--padding-mobile` (20px) | `.footer__inner` horizontal padding at ≤767px |
| `--space-16` | `.footer__top` top/bottom padding at desktop |
| `--space-12` | `.footer__top` top/bottom padding at tablet |
| `--space-10` | `.footer__top` top/bottom padding at mobile |
| `--space-8` | `.footer__bottom` top/bottom padding |
| `--space-6` | Grid `row-gap`; bottom bar `gap`; restored mobile `margin-bottom` on headline |
| `--space-4` | Grid `column-gap` base; restored mobile `margin-bottom` on eyebrow |
| `--space-12` | Grid `column-gap` between left and right columns |
| `--color-deep-tide` | `.site-footer` background |
| `--color-teal` | Hairline gradient; eyebrow colour |
| `--border-hairline`, `--border-dark-soft` | `.footer__bottom` border-top |
| All `--text-dark-*` tokens | Unchanged on existing content elements |
| `--font-*`, `--weight-*`, `--leading-*`, `--tracking-*` | Unchanged on content elements |

## Regressions checked
- `npm run build` — succeeds, no warnings
- Teal gradient hairline at top of footer — preserved on `.site-footer::before`, full viewport width
- Zone 2 border-top hairline — preserved on `.footer__bottom`
- `max-width: 540px` on `.footer__headline` — preserved
- `max-width: 480px` on `.footer__body` — preserved
- Mobile single-column layout (≤767px) — grid collapses to `display: block`, margin-bottoms restored
- All colour tokens unchanged — no contrast regressions
- Sticky-footer behaviour unaffected — `global.css` not touched

## Open questions for designer
- At viewports between 768–900px the right column (contact + LinkedIn) sits beside
  the editorial text but the overall container is narrower than the full two-column
  intent. Confirm whether the 768px grid-on / grid-off breakpoint is correct or
  whether it should be raised to 1024px.
- The bottom bar nav links (`Home`, `Work`, `About`, `Notebook`) will wrap to a
  second line at narrow tablet widths since the container is now wider but the nav
  has `flex-wrap: wrap`. Confirm whether this is acceptable or whether the nav should
  hide/truncate below a certain width.

## Note on Phase 1F
Phase 1F closed without code change — the sticky-footer rules in `global.css` are
correct and were confirmed applying by programmatic CSS bundle analysis. The bug
investigated across phases 1D/1E/1F was incorrectly scoped to a vertical layout
problem; the real issue was horizontal layout, now addressed in Phase 1G.
