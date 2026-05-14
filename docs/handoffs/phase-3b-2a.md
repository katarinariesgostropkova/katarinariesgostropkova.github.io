# Phase 3B-2a — Work Card Mobile Accent Polish

## Commit message
phase-3b-2a: fix work card rose accent overlap on mobile

## What changed
On desktop, the rose accent bar sits at `left: 0` of the card article, and the text content lives in the right grid column — so there is thumbnail-width of horizontal space between them. On mobile (≤767px) the grid collapses to a single column, placing the content directly below the thumbnail with its left edge also at `left: 0`, which caused the 3px accent line to visually sit against (or behind) the title text. A single CSS rule was added inside the existing mobile breakpoint block: `padding-left: var(--space-4)` (16px) on `.work-row__content`. This pushes all content text 16px right, creating ~13px of clear breathing room between the accent's right edge (3px) and the content, while keeping the accent visible at the card's left edge.

## Files modified
- `src/components/WorkRow.astro` (CSS only, no markup change)

## Lines of CSS changed
3 lines added (rule + property + closing brace)

## Fix applied

**Before** — mobile breakpoint had no rule for `.work-row__content`:
```css
@media (max-width: 767px) {
  .work-row {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    padding: var(--space-8) 0;
  }

  .work-row__accent {
    top: var(--space-8);
    bottom: var(--space-8);
  }
}
```

**After**:
```css
@media (max-width: 767px) {
  .work-row {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    padding: var(--space-8) 0;
  }

  .work-row__accent {
    top: var(--space-8);
    bottom: var(--space-8);
  }

  .work-row__content {
    padding-left: var(--space-4); /* 16px — clears the 3px accent with breathing room */
  }
}
```

## Regression checks
- `npm run build` — passes, 3 pages built, no new warnings
- Desktop accent (1280px): accent at `left: 0`, spanning `top/bottom: var(--space-10)` (40px inset), content in right grid column — no layout change, fix is scoped to ≤767px only
- Mobile content (≤767px): 16px left padding on `.work-row__content` creates clear gap between accent and text; accent remains visible at card left edge
- `top: var(--space-8)` / `bottom: var(--space-8)` unchanged — accent aligns with card's inner bounds, does not extend past top or bottom
- Locked cards: `work-row--locked` has no `.work-row__accent` element rendered; locked cards are unaffected
- Pages `/work` and `/_case-study-test` — build succeeded for both routes

## Open questions for designer
- Confirm 16px (`--space-4`) indent is the preferred breathing room, or adjust to `--space-3` (12px) for a tighter look
- Confirm the accent should span the full card height including the thumbnail area on mobile, vs. being constrained to the content block only
