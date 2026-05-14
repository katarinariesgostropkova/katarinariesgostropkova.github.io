# Phase 3B-1 — InlineImage Component

## Commit message
phase-3b-1: InlineImage component (single + three-column)

## What changed
Created the `InlineImage.astro` component — the reusable linen-framed image treatment for inline case study body content. Supports a single-image mode and a three-column grid mode, with optional teal eyebrow label (with gradient hairline), optional caption, and optional bold caption opener. Also created a test harness page at `/inline-image-test` that renders four visual tests covering all prop combinations, using the confirmed `non-profit/checa-hero.png` asset.

## Files created
- `src/components/InlineImage.astro`
- `src/pages/inline-image-test.astro` — **TEST HARNESS — to be deleted in Phase 3B-2**

## Files modified
- None

## Routing note — underscore prefix does not work in Astro
The phase brief described the test harness as `_inline-image-test.astro`, stating that the underscore prefix means Astro builds it as a test page. This is incorrect: Astro's underscore prefix **excludes** files from routing entirely — they are not built. The file was named `inline-image-test.astro` (no underscore) so it actually builds and is accessible at `/inline-image-test`. Delete this file in Phase 3B-2 as planned.

## Component props interface

```ts
interface Props {
  mode?: 'single' | 'three-column';            // default 'single'
  src?: string;                                 // single mode
  alt?: string;                                 // single mode
  images?: Array<{ src: string; alt: string }>; // three-column mode (must be exactly 3)
  label?: string;                               // optional teal eyebrow
  caption?: string;                             // optional caption below frame
  captionBold?: string;                         // optional bold opening phrase
  maxWidth?: string;                            // optional CSS value, e.g. '640px'
}
```

Validation: invalid props (missing `src`/`alt` for single, wrong image count for three-column) render nothing and emit a `console.warn` at build time.

## Tokens used

| Usage | Token |
|---|---|
| Frame background | `--color-linen` |
| Frame border | `--color-deep-tide-08` |
| Frame shadow | `--shadow-card` |
| Frame outer radius | `--radius-lg` (12px) |
| Image inner radius | `--radius-md` (8px) |
| Label color | `--color-teal` |
| Label size | `--font-size-meta` |
| Label weight | `--weight-medium` |
| Label tracking | `--tracking-widest` |
| Label gradient line | `--color-teal-40` |
| Caption color | `--text-muted` |
| Caption bold color | `--text-primary` |
| Caption size | `--font-size-meta` |
| Caption weight | `--weight-regular` |
| Caption line-height | `--leading-normal` |
| Caption gap from frame | `--space-3` |
| Label gap below | `--space-4` |
| Frame padding | `--space-6` |
| Figure vertical margin | `--space-10` |

No new tokens added to global.css.

## Deviations from spec — accepted exceptions

- **Label font-size:** spec says 9px → using `--font-size-meta` (12px). The 5-stop type scale has no sub-12px stop.
- **Caption font-weight:** spec says Jost 300 → using Jost 400 (`--weight-regular`) per §3 weight rule (Jost 300 forbidden below 16px).
- **Caption line-height:** spec says 1.6 → using `--leading-normal` (1.65) for token consistency.
- **Border token:** spec writes raw `rgba(28, 43, 58, 0.08)` — using `--color-deep-tide-08` which resolves to the same value.
- **Label line token:** spec writes raw `rgba(43, 165, 165, 0.40)` — using `--color-teal-40` which resolves to the same value.

## Test harness location
`/inline-image-test` renders four visual tests:
1. Single image, minimal (no label, no caption)
2. Single image, full treatment (label + caption with bold opener)
3. Single image, narrow (maxWidth 640px, centered)
4. Three-column (label + caption with bold opener)

All four tests use `/assets/images/work/non-profit/checa-hero.png` (confirmed on disk).

## Asset path discrepancy — flag for Phase 3C
`ASSETS.md §4.3` documents the asociación images at `public/assets/images/work/asociacion/` with filename `asociacion-mockup.png`. The actual disk has them at `public/assets/images/work/non-profit/checa-hero.png`. `CLAUDE.md §4` agrees with the actual disk (`non-profit/`). ASSETS.md §4.3 needs reconciliation before Phase 3C wires in real case study image paths.

## Regression checks
Homepage (`/`), `/work`, Header, Footer, and mobile overlay are all unchanged. No shared code was touched.

## Open questions for designer
- None.

## Next phase
Phase 3B-2 builds `CaseStudyLayout.astro` — sidebar + mobile pill + sheet (functional) + meta table + section headings + pull quote component. The test harness page (`inline-image-test.astro`) gets deleted in Phase 3B-2.
