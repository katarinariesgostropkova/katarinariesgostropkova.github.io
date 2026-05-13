# Phase 1F Closed — Sticky-Footer Investigation (Closed Without Fix)

## Status
Closed. No code changes required. Investigation scoped to wrong problem.

## What was confirmed correct

The sticky-footer rules in `src/styles/global.css` are correct and applying:

```css
html { height: 100%; }
body { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }
```

The built CSS bundle (`dist/_astro/index.DZ7gMmd_.css`) contains exactly one `body`
element rule, with `display: flex` and `flex-direction: column` present. The bundle
is correctly linked in the rendered HTML. No component style block overrides `body`.
The layout model is structurally sound.

## Why the investigation ran long

The user's DevTools observation ("body shows display: block, no rule from global.css
visible in Styles panel") was consistent with a stale browser cache serving a pre-fix
CSS bundle hash — not a code defect. Multiple phases (1D, 1E, 1F) were spent trying
to find a source-level cause for a symptom that had no source-level cause.

## The real bug

The user-reported symptom — "the footer is not stretching to the full width of the
screen at wide viewports" — is a **horizontal layout problem**, not a sticky-footer
problem.

The footer content was constrained to `max-width: var(--container-max)` (900px) by
`.footer__zone-1-inner` and `.footer__zone-2-inner`. At viewports wider than 900px
this leaves large empty side bands of Deep Tide background on both sides of the
content, which reads visually as "the footer not filling the screen."

The sticky-footer pattern (body flex column, main flex: 1) is unrelated to this.

## What Phase 1G must address

Refactor the footer so that:
- The Deep Tide background spans the full viewport width (owned by `.site-footer`)
- Content is constrained and aligned inside a dedicated inner container
- The teal gradient hairline also spans full width

**Scope:** `src/components/Footer.astro` only. No changes to `global.css`.

## Phases 1D / 1E / 1F — disposition

| Phase | Diagnosis | Correct? | Code change |
|-------|-----------|----------|-------------|
| 1D | Two body{} blocks causing cascade variance | Incorrect | Merged to one block — harmless, keep |
| 1E | Environmental (stale cache) | Correct | None |
| 1F | Same as 1E, confirmed by bundle analysis | Correct | None |
