# Phase 3E-a — About Page Photo + Timeline Rework

## Commit message
```
phase-3e-a: about page hero single-column, horizontal scrolling timeline
```

## What changed
Two design refinements to the About page:

1. **Hero block restructured** from two-column (photo right, ~360px) to single-column centred (photo above headline). Photo reduced to 180px wide in 3/4 portrait aspect, sitting in a linen frame. Headline and body paragraph stack below the photo, both centred, with the body capped at 640px for readable measure.
2. **AboutTimeline.astro was already implemented** in the horizontal scroll layout per Resolution 2 (likely from a prior pass in Phase 3E). Verified the structure matches the brief exactly — `<section>` → `<h2>` → scroll wrapper → `<ol>` → `<li>` entries with dot + dates + role + institution, plus the right-edge gradient fade, scrollbar styling, connecting line, and entry dimensions. **No changes were made to that file.** `var(--border-medium)` resolves to `rgba(28, 43, 58, 0.15)` (verified in `global.css:182`), an exact match to the brief's literal value — kept tokenised rather than regressing to a raw rgba.

## Files modified
- `src/pages/about.astro` — hero block markup and CSS rewrite (single-column, photo first)

## Files unchanged (already correct)
- `src/components/AboutTimeline.astro` — already matches Resolution 2 verbatim

## Lines changed
- `about.astro`: ~50 lines net (hero markup -28 / +20 lines; hero CSS rewrite -82 / +56 lines)

## Decisions applied
- **Photo size:** 180px max-width (medium presence per brief)
- **Photo shape:** 3/4 portrait in linen frame, `--space-4` padding (was `--space-6` at the larger size), `--radius-md` outer + inner
- **Photo `width`/`height` attrs:** updated from `720x960` to `360x480` (still 3/4, sized for the new max-width)
- **Photo `loading="eager"`:** preserved (still LCP candidate for the page)
- **Headline font-size:** 36px mobile / 52px desktop (`--font-size-hero` scale per brief — chose explicit pixel literals since no `--font-size-hero` token exists in the codebase, consistent with the 20px / 18px one-off precedents from Phase 3E)
- **Headline margin-bottom:** `--space-4` (was `--space-6`)
- **Body max-width:** 640px (readable measure inside a wider container)
- **Container:** kept `--container-max` (900px) — reads well at narrower width with a centred 640px body and 180px photo
- **Timeline orientation:** always horizontal scroll across all breakpoints (already in place)
- **Scroll affordance:** soft gradient fade on right edge to `--color-canvas` (already in place)

## Animation hooks preserved
- `data-about-hero` on hero `<section>` (unchanged)
- `data-about-timeline` on timeline `<section>` (already present)
- `data-timeline-track` on the `<ol>` (already present)
- `data-timeline-entry` on each `<li>` (already present, 5 instances)
- `data-entry-index="0..4"` on each `<li>` (already present)
- `data-about-story` on story `<section>` (unchanged)
- `data-recommendations` on recommendations `<section>` (unchanged)

## Regression checks
- `npm run build` — 7 pages built, zero warnings, zero errors
- `/about/index.html` regenerated
- `/` (homepage), `/work`, `/work/non-profit`, `/work/family-space`, `/work/list-interface`, `/work/required-field` — all build correctly
- No changes outside the hero block of `about.astro`
- Frontmatter in `src/content/about/main.md` untouched — all content (headline text, body, photo src/alt, timeline entries) preserved verbatim
- Header `Nav.astro` active state on `/about` unaffected (no nav changes)
- Footer renders on `/about` (no footer changes)

## Browser/visual verification
Not performed in this slice — text confirmation only, per the documents-win constraint. The brief lists 10+ screenshot checkpoints (1280 / 1024 / 768 / 600 / 360 widths for both hero and timeline, plus accessibility checks). Recommend Katarina run `npm run dev` and walk through the verification checklist in the Phase 3E-a brief before sign-off, since:
- Some checks (scroll behaviour, gradient fade visibility while scrolling, screen-reader region announcement, Lighthouse a11y ≥ 95) require a live browser
- The 52px desktop headline is a notable size jump from the prior 40px — worth eyeballing for balance with the 180px photo

## Open questions for designer
- **52px desktop headline.** Chose the brief's literal `--font-size-hero` value (52/36) over the prior section-scale (28/36/40). If the 52px reads as too large above a 180px photo, easy revert: change `font-size: 52px` back to `40px` at the 768px+ breakpoint.
- **AboutTimeline left-edge fade.** Brief's verification checklist asks "when scrolled, does the gradient fade now appear on the left edge?" — currently no left fade is wired. Brief itself says "Phase 4 may add left-edge fade when scrolled — verify that for now no left fade is needed." Treating that as Phase 4 work, not 3E-a.

## Next phase
Phase 3F — Notebook page (index at `/notebook` + first article at `/notebook/predicting-the-future-of-ux`). After 3F: Phase 4 (all 13 animations) including item ⑬ timeline scroll reveal, which can now play across the horizontal layout using the `data-timeline-track` and `data-entry-index` hooks.
