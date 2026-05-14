# Phase 2B — Homepage Impact Strip

## Commit message
phase-2b: homepage impact strip with three coloured tokens

## What changed
`src/components/ImpactStrip.astro` was rewritten to implement the final designer-resolved Impact Strip: three impact units in a horizontal grid, each with a distinct token colour (Deep Tide / teal / rose), all labels and descriptions at `--font-size-meta`, and two semi-transparent teal hairlines via `::before` / `::after` anchoring the strip as a distinct band between Hero and the forthcoming Work teaser. The SVG decorative arc, the Research → Roadmap pill, and the old Unit 2 ("3 Continents / Fieldwork") content were removed. `src/pages/index.astro` already had the correct import and wire-up from a prior session and required no changes.

## Files created
- `src/components/ImpactStrip.astro`

## Files modified
- `src/pages/index.astro` — no changes required; import and placement already correct

## Content rendered

**Unit 1**
- Token: `7`
- Label: `YRS`
- Description: UX research across consumer cybersecurity and enterprise ERP

**Unit 2**
- Token: `1`
- Label: `SHIPPED PRODUCT`
- Description: Designed, built and launched — solo

**Unit 3**
- Token: `MA`
- Label: `COGNITION & COMMUNICATION`
- Description: University of Copenhagen

## Designer resolutions applied
- Unit 2 content per strip_handoff.docx (1 SHIPPED PRODUCT — Designed, built and launched — solo)
- Three distinct token colours per handoff doc colour table: Deep Tide / teal / rose
- MA in rose on linen: accepted contrast exception (display element, not body text)
- 11px and 10px → `--font-size-meta` (12px)
- Research → Roadmap pill removed entirely
- Decorative arc replaced with two semi-transparent teal hairlines (top and bottom of strip)

## Tokens used
```
--color-linen
--space-12
--space-10
--container-wide
--padding-desktop
--padding-tablet
--padding-mobile
--text-primary
--color-teal
--color-rose
--font-serif
--font-sans
--font-size-section
--font-size-meta
--weight-light
--weight-regular
--leading-tight
--leading-normal
--tracking-tight
--tracking-wide
--text-body
--space-2
--space-1
--space-8
```

Hairline decoration uses `rgba(43, 165, 165, 0.20)` as a literal value — acceptable per spec since it is behind aria-hidden decoration with no named token equivalent at this opacity.

## Animation hooks left for future phase
- `data-impact-strip` on `<section>` — scroll-reveal trigger (animation ⑧)
- `data-count="7"` on Unit 1 number — count-up from 0 to 7 (animation ⑤)
- `data-count="1"` on Unit 2 number — count-up from 0 to 1 (animation ⑤)
- `data-impact-static="MA"` on Unit 3 number — signals no count-up; static text

## Deviations from spec — accepted exceptions
- MA token in rose on linen: 3.8:1 contrast ratio. Designed exception per §10 and DESIGN_DECISIONS.md §2.1 for a large display element (Cormorant Garamond ~28px), not body text.
- Body sizes specified as 10px or 11px throughout §10 are rendered at 12px (`--font-size-meta`) to honour the §3 five-stop type scale ceiling.

## Regressions checked
- Hero renders correctly
- Footer renders correctly
- Header renders correctly at all widths
- `npm run build` succeeds with no new warnings (pre-existing `copy.md` content-collection warning persists as allowed)
- No "Roadmap" string in built HTML
- No `<svg>` in impact-strip section
- All four animation data-attributes present in built DOM

## Open questions for designer
None.
