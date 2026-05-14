# Phase 2C — Homepage Work Teaser

## Commit message
phase-2c: homepage work teaser (WorkRow loop, Checa + locked composite)

## What changed
Added the Work Teaser section to the homepage, sitting between ImpactStrip and the footer. The section loops over `src/data/work.js` and renders a `WorkRow` component per entry; entries with `private: true` receive the locked variant (Deep Tide thumbnail, slate tags, ghost CTA). Two rows ship: Checa de Galicia (open) and a composite NDA card representing all three locked cases.

## Files created
- `src/components/WorkCardThumbnail.astro` — thumbnail slot; mode `'image'` (linen-padded) or `'locked'` (Deep Tide + centred chip)
- `src/components/WorkRow.astro` — homepage teaser row; `locked` prop switches thumbnail mode, tag colour, and CTA variant
- `src/data/work.js` — homepage work data array; `private: true` is the locked flag

## Files modified
- `src/pages/index.astro` — added Work section with loop; imports `WorkRow` and `homepageWork`
- `src/styles/global.css` — added `.btn--ghost` (uses existing `--btn-ghost-border` and `--btn-ghost-text` tokens)
- `specs/CLAUDE.md` — updated §4 component registry: `WorkRow`, `WorkCardThumbnail`, `src/data/work.js`, corrected image paths

## Asset operations
Renamed and restructured all work images from the original `public/assets/Images/` (Title Case, double `.png.png` extensions) to the spec-correct `public/assets/images/` (lowercase, single extension). Full map:

| Old path | New path |
|---|---|
| `assets/Images/Work/non-profit/checa-hero.png.png` | `assets/images/work/non-profit/checa-hero.png` |
| `assets/Images/Work/non-profit/asociacion-personas.png.png` | `assets/images/work/non-profit/asociacion-personas.png` |
| `assets/Images/Work/design-system/rf-hero.png.png` | `assets/images/work/design-system/rf-hero.png` |
| `assets/Images/Work/design-system/rf-recognition-chart.png.png` | `assets/images/work/design-system/rf-recognition-chart.png` |
| `assets/Images/Work/design-system/rf-three-variants.png.png` | `assets/images/work/design-system/rf-three-variants.png` |
| `assets/Images/Work/family-space/fs-hero.png.png` | `assets/images/work/family-space/fs-hero.png` |
| `assets/Images/Work/family-space/fs-parenting-styles.png.png` | `assets/images/work/family-space/fs-parenting-styles.png` |
| `assets/Images/Work/family-space/fs-problem-cycle.png.png` | `assets/images/work/family-space/fs-problem-cycle.png` |
| `assets/Images/Work/family-space/fs-psychological-values.png.png` | `assets/images/work/family-space/fs-psychological-values.png` |
| `assets/Images/Work/list-interface/li-behaviour-modes.png.png` | `assets/images/work/list-interface/li-behaviour-modes.png` |
| `assets/Images/Work/list-interface/li-hero.png.png` | `assets/images/work/list-interface/li-hero.png` |
| `assets/Images/Work/list-interface/li-operational-vs-analytical.png.png` | `assets/images/work/list-interface/li-operational-vs-analytical.png` |
| `assets/Images/Work/list-interface/li-redwood-ui.png.webp` | `assets/images/work/list-interface/li-redwood-ui.webp` |
| `assets/Images/About/Profile image.png` | `assets/images/about/katarina-photo.png` |
| `assets/og-image.png.png` | `assets/images/og-image.png` |

## Content extracted from copy.md
**Row 1 (open):** Title: "Building a public presence from scratch" · Meta: "Asociación Cultural Checa de Galicia · 2024–2025" · Tags: Product Design, Web Development · Excerpt: "A full design and build for a Czech cultural association in Galicia — information architecture, visual identity, responsive build. The only case study here you can explore without a password." · CTA: "Explore →" → `/work/asociacion`

**Row 2 (locked):** copy.md §02 labels this "LOCKED CARD — REPRESENTS ALL THREE NDA CASE STUDIES" — it is a deliberate composite, not one of the three individual cases. Title: "Seven years of research and design work" · Meta: "Avast · Oracle NetSuite" · Tags: UX Research, Enterprise ERP · Excerpt: "Three research projects from enterprise UX — covering design systems, parental controls and list interfaces. Protected by NDA." · CTA: "Request access" → `#`

## Designer resolutions applied
- Locked thumbnail: Deep Tide background + centred chip (lock SVG + "LOCKED" text), no blur, no abstract bars
- Heading: "A few things I've worked on" — no links beside it
- Two rows only (full index at `/work` in Phase 3)
- Checa thumbnail: image mode, linen-padded slot, no HTML browser chrome

## Tokens used
`--color-canvas` `--color-linen` `--color-deep-tide` `--color-rose` `--color-teal` `--text-primary` `--text-body` `--text-muted` `--text-secondary` `--font-serif` `--font-sans` `--weight-light` `--weight-regular` `--font-size-section` `--font-size-body` `--font-size-meta` `--leading-snug` `--leading-normal` `--tracking-tight` `--tracking-normal` `--tracking-wide` `--radius-md` `--radius-full` `--tag-teal-bg` `--tag-teal-text` `--tag-slate-bg` `--tag-slate-text` `--btn-ghost-border` `--btn-ghost-text` `--space-1` through `--space-12` `--container-wide` `--padding-desktop` `--padding-tablet` `--padding-mobile`

## Animation hooks left for future phase
- `data-work-teaser` on `<section>` (animation ⑧ scroll reveal)
- `data-card="rose"` on Row 1, `data-card="locked"` on Row 2
- `data-card-accent="rose"` on Row 1's accent `<span>` (animation ⑥ scaleY hover)

## Deviations from spec — accepted exceptions
- **20px card title**: `WorkRow__title` uses `font-size: 20px` as a literal value. DESIGN_SYSTEM.md §10 explicitly specifies "Cormorant 300 20px" for card titles. This sits between the five canonical scale stops; using the literal rather than the nearest token (`--font-size-subhead` 16px) preserves the intended hierarchy.
- **Composite locked card**: The homepage locked row uses a composite card representing all three NDA cases (per copy.md), not one individual case. This was the designer's deliberate choice in copy.md.
- **`katarina-photo.png`**: File is PNG, not JPEG as ASSETS.md specifies. Extension kept as-is from source; Phase 3 About page build should confirm final format.

## Regression: Impact Strip bottom hairline
Work section background is `--color-canvas` (same as page background). The hairline between Impact Strip and Work section is `0.5px solid rgba(28,43,58,0.08)` on the last Work row — rendered by WorkRow's `border-bottom`. The Impact Strip's own bottom edge renders against canvas, which matches the intent. Verify visually at the Impact Strip → Work transition.

## Open questions for designer
- `li-redwood-ui.webp`: file on disk is `.webp` only, no `.png` companion. Phase 3 case study pages use `<picture>` for WebP/PNG fallback — confirm whether a PNG source needs to be exported, or if WebP-only is acceptable.
- `katarina-photo.png` is PNG not JPEG. Confirm format preference before About page build (Phase 3).

## Next phase prerequisite
Phase 3 (case study pages + `/work` index) will wire the "Request access" href to the password gate. Currently `href="#"` — clicking does nothing. Also: the `WorkCard.astro` component (Phase 3 `/work` grid card) is a separate component from `WorkRow.astro` per CLAUDE.md §4.
