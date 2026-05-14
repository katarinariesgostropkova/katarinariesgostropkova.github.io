# Phase 3B-1a — InlineImage Simplification & Family Space Asset Consolidation

## Commit message
phase-3b-1a: remove three-column variant; consolidate family-space assets

## What changed
Three Family Space image files whose content was consolidated into `fs-hero.png` by the designer were deleted from disk. `InlineImage.astro` was simplified by removing the `three-column` variant entirely — the component now has a single mode (linen frame + optional label + image + optional caption), and the Props interface no longer has `mode` or `images` fields. The test harness was updated to remove Test 4. `ASSETS.md` Parts 4 and 7 were updated to reflect the new single-file Family Space asset inventory, with a consolidation note added for future reference.

## Files deleted
- public/assets/images/work/family-space/fs-parenting-styles.png
- public/assets/images/work/family-space/fs-problem-cycle.png
- public/assets/images/work/family-space/fs-psychological-values.png

## Files modified
- src/components/InlineImage.astro (removed three-column variant)
- src/pages/inline-image-test.astro (removed Test 4)
- specs/ASSETS.md (Parts 4 and 7 updated)

## Lines removed from InlineImage.astro
Approximately 30 lines removed: `mode` and `images` props, the three-column validation branch, the `{mode === 'single' && ...}` conditional wrapper, the `{mode === 'three-column' && ...}` markup block, the `.inline-image__grid` CSS rules, and the `@media (max-width: 600px)` grid collapse rule. The `inline-image--${mode}` dynamic class was replaced with a static `inline-image` class.

## Simplified Props interface
```ts
interface Props {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
  captionBold?: string;
  maxWidth?: string;
}
```

## Spec status
IMAGE_TREATMENTS.md §2b (three-column variant) remains in the spec for future reference. If a future case needs the variant, it can be re-implemented from spec in approximately 20 lines of code.

## Regressions checked
- `npm run build` passes, no new warnings
- `ls public/assets/images/work/family-space/` confirms only `fs-hero.png` remains
- `grep -rn "three-column|inline-image__grid" src/` returns zero matches
- `grep -rn "fs-parenting-styles|fs-problem-cycle|fs-psychological-values" src/` returns zero matches
- InlineImage.astro Props interface has no `images` or `mode` field
- `inline-image-test.astro` has 3 tests, not 4
- ASSETS.md Part 4 family-space lists `fs-hero.png` as single image with consolidation note
- ASSETS.md Part 7 Family Space count updated: 4 → 1; TOTAL updated: 45 → 42
- ASSETS.md Part 8 stale "7 artifact images" line updated

## Open questions for designer
None.

## Next phase
Phase 3B-2 builds CaseStudyLayout + sidebar + functional mobile pill + sheet + meta table + section headings + pull quote component. The `inline-image-test.astro` page will be deleted in Phase 3B-2 along with the CaseStudyLayout going live.
