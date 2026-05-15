# Phase 3C-1a — Anchor Scroll Offset Fix

## Commit message
phase-3c-1a: fix anchor scroll offset for sticky overlays

## Bug fixed
Anchor link clicks landed section headings flush with viewport top, behind the
sticky header (desktop) and sticky mobile pill (mobile). Headings were partially
or fully obscured after navigation.

## Root cause
Default browser anchor-scroll behaviour aligns the target element's top edge with
viewport y=0, without accounting for sticky or fixed overlays. The CSS
`scroll-margin-top` property reserves space at the top of the target during
scroll, pushing the heading below the overlay.

## Measured offsets
- Desktop sticky overlay (header only): 60px (`--header-height-desktop`)
- Mobile sticky overlay (header + pill):
  - Header: 56px (`--header-height-mobile`)
  - Gap between header and pill top: 12px (`--space-3`, from `top: calc(--header-height-mobile + --space-3)` in MobileNavPill.astro)
  - Pill height: 44px (`min-height` in MobileNavPill.astro)
  - Total: 112px
- Breathing room added: 20px
- Final scroll-margin-top values:
  - Desktop: 80px (60 + 20)
  - Mobile (≤1023px): 132px (112 + 20)

## Files modified
- `src/styles/global.css` — scroll-margin-top rule on `h2[id]`, appended after button utilities

## Lines of CSS changed
8 lines added (including comment and media query wrapper)

## Fix applied
```css
/* ── Scroll behaviour ────────────────────────────────────────────────────── */

/* Reserve space for sticky header (and mobile pill) on anchor-link landings  */
h2[id] {
  scroll-margin-top: 80px; /* header-height-desktop (60px) + 20px breathing  */
}

@media (max-width: 1023px) {
  h2[id] {
    scroll-margin-top: 132px; /* header-mobile (56px) + gap (12px) + pill (44px) + 20px */
  }
}
```

## Why scroll-margin-top instead of JavaScript
- CSS-native, no JS overhead
- Respects `prefers-reduced-motion` automatically (no animation to opt out of — just layout)
- Works with the smooth-scroll behaviour from Phase 2D (`scroll-behavior: smooth` on `html`)
- Future-proof: any new `h2` with an `id` anchor benefits automatically without further changes
- Selector is intentionally broad (`h2[id]`) so it covers all case study sections and any other
  anchored headings site-wide (e.g. the Work section h2 on the homepage)

## Regression checks
- [x] Standard page scroll (no anchor) unaffected — `scroll-margin-top` only acts on anchor-jump landings
- [x] Smooth-scroll from Phase 2D still works — `scroll-behavior: smooth` on `html` is unchanged
- [x] `npm run build` succeeds with zero warnings
- [x] CSS verified in built output (`dist/_astro/_slug_.*.css`)
- [ ] Visual: desktop 1280px — section headings land fully visible below sticky header
- [ ] Visual: desktop 1024px — same
- [ ] Visual: mobile 768px — section headings land fully visible below header + pill
- [ ] Visual: mobile 600px — same
- [ ] Visual: mobile 360px — same
- [ ] All 8 case study sections tested at desktop and mobile
- [ ] Homepage Hero CTA "See my work ↓" — Work section h2 lands correctly
- [ ] No console errors

## Open questions for designer
None
