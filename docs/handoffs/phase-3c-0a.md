# Phase 3C-0a — Mobile Sidebar Hide Fix

## Commit message
phase-3c-0a: hide CaseStudySidebar below 1024px

## Bug fixed
At mobile widths the desktop sidebar rendered alongside the mobile pill+sheet,
producing two navigation elements simultaneously.

## Root cause
**(c) Specificity / selector conflict** — specifically Astro's CSS scoping.

`CaseStudyLayout.astro` had a `.case-body > :first-child { display: none; }` rule
inside `@media (max-width: 1023px)`, intended to hide the sidebar. However, Astro
scopes `<style>` blocks by appending a `data-astro-cid-*` attribute to selectors.
When the terminal selector is `:first-child` (a pseudo-class), Astro cannot reliably
append the scope attribute to it, so the rule failed to match the `<aside>` root
element of the child `CaseStudySidebar` component. The sidebar remained visible at
all viewport widths.

Additionally, a misleading comment in the layout stated "sidebar hides itself via
its own sticky/width behaviour" — this was never true; `CaseStudySidebar.astro` had
no media query of any kind.

## Files modified
- `src/components/CaseStudySidebar.astro`
- `src/layouts/CaseStudyLayout.astro`

## Lines of CSS changed
- **Added** 4 lines to `CaseStudySidebar.astro`
- **Removed** 7 lines from `CaseStudyLayout.astro` (the broken `:first-child` rule
  and its associated comment)
- **Updated** 1 comment block in `CaseStudyLayout.astro` to reflect the correct mechanism

## Fix applied

**CaseStudySidebar.astro — added at end of `<style>` block:**
```css
/* Before: nothing — no media query existed */

/* After: */
/* Hidden below 1024px — mobile pill+sheet takes over navigation */
@media (max-width: 1023px) {
  .case-sidebar {
    display: none;
  }
}
```

**CaseStudyLayout.astro — removed from `@media (max-width: 1023px)` block:**
```css
/* Before: */
.case-body {
  grid-template-columns: 1fr;
  /* Sidebar renders first in DOM but is hidden via its own sticky/width behaviour;
     the JS pill+sheet takes over for section navigation */
}

/* Hide the sidebar column on mobile — sidebar component renders but is not visible */
.case-body > :first-child {
  display: none;
}

/* After: */
.case-body {
  grid-template-columns: 1fr;
}
```

The grid collapse (`grid-template-columns: 1fr`) was already correct and is kept.
The broken `:first-child` rule is removed. The sidebar now owns its own hide behaviour.

## Regression checks
- `npm run build` passes with no new warnings (3 pages built, 941ms)
- At ≥1024px: sidebar visible in left column, mobile pill hidden — unchanged
- At ≤1023px: `.case-sidebar { display: none; }` fires from within the component's
  own scoped styles — no Astro scoping ambiguity, selector is unambiguous
- `display: none` (not `visibility: hidden`) ensures sidebar takes no grid space
  and is removed from the tab order — keyboard navigation will not pass through
  hidden sidebar links at mobile
- Mobile pill+sheet (MobileNavPill) is a separate component with no dependency on
  `.case-sidebar` CSS — unaffected
- `grid-template-columns: 1fr` at mobile ensures content fills full width with no
  reserved sidebar column

## Open questions for designer
None.
