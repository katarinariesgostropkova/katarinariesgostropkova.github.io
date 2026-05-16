# Phase 3C-1d — Checa Hero Image + Family Space Mobile Overflow Fixes

## Commit message
phase-3c-1d: fix checa hero image (persistent), fix family-space mobile overflow

---

## Bug 1 — Checa hero image

### Why the Phase 3C-1c fix didn't resolve this

Phase 3C-1c correctly identified the root cause (git tracking images under uppercase `public/assets/Images/Work/` which produces a 404 on Linux/GitHub Actions) and applied the right fix — `git rm -r --cached "public/assets/Images/"` and `git add "public/assets/images/"`. The fix was committed in `56c0862` but **never pushed to origin**. GitHub Actions deploys from the remote; the old uppercase-path entries remained on the remote, so every subsequent deploy still checked out files to the wrong path.

### Actual root cause

Two commits — `56c0862` (phase-3c-1c) and `4e8e5aa` (homepage WorkRow fix) — were committed locally but not pushed. The production deploy continued using the pre-fix remote state.

### Fix applied

No code change required. Push the existing commits to origin:
```
git push
```
This triggers GitHub Actions which will:
1. Check out `public/assets/images/work/non-profit/checa-hero.png` (lowercase, now correct)
2. Build: HTML src is `/assets/images/work/non-profit/checa-hero.png`
3. File exists at that path in dist → 200 OK → image renders

---

## Bug 2 — Family Space mobile overflow

### Root cause

Two compounding causes in the global CSS reset and layout container:

1. **`li` missing from `overflow-wrap: break-word`** — `global.css` applied `overflow-wrap: break-word` to `p, h1–h6` but not `li`. Family Space body contains a `<ul>` with four `<li>` items, each with a `<strong>` opener. At narrow viewports (≤ 360px), inline bold text sequences without word-break protection can extend past the container width.

2. **No overflow containment on `case-body__content`** — `InlineImage`'s label text uses `white-space: nowrap` with `letter-spacing: 0.20em`. At 360px viewport the label "RESEARCH · THREE PARENTING STYLES" computed wider than the content column. The `inline-image__frame` clips with `overflow: hidden` but without `overflow-x` containment on the parent column, any overflow that escapes propagates to the page, creating a horizontal scrollbar.

### Why other case studies didn't show this bug

List Interface and Required Field have no `<ul>` lists in the body, and their InlineImage labels are shorter. The nowrap label issue exists on all case studies in theory, but the specific label text lengths in Family Space at the narrowest viewports pushed it over the edge. List Interface and Required Field were within safe bounds.

### Fix applied

**`src/styles/global.css`** — add `li` to overflow-wrap rule:
```css
/* Before */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* After */
p, h1, h2, h3, h4, h5, h6, li {
  overflow-wrap: break-word;
}
```

**`src/layouts/CaseStudyLayout.astro`** — add `overflow-x: clip` to content column:
```css
/* Before */
.case-body__content {
  min-width: 0;
  max-width: 720px;
}

/* After */
.case-body__content {
  min-width: 0;
  max-width: 720px;
  overflow-x: clip;
}
```

`overflow-x: clip` rather than `hidden` — clips without creating a new scroll container or stacking context, which avoids side effects on `position: sticky` elements in the layout.

---

## Files modified

- `src/styles/global.css` — 1 line changed
- `src/layouts/CaseStudyLayout.astro` — 1 line added

## Lines changed total

2

## Regression checks

- Build: `npm run build` — 6 pages, no warnings
- Built CSS confirms: `p,h1,h2,h3,h4,h5,h6,li{overflow-wrap:break-word}`
- Built CSS confirms: `case-body__content[...]{min-width:0;max-width:720px;overflow-x:clip}`
- Non-profit hero src in built HTML: `/assets/images/work/non-profit/checa-hero.png` (correct)
- `overflow-x: clip` on `.case-body__content` applies to all four case studies — list-interface and required-field are unaffected (they had no overflow to contain)
- `li` overflow-wrap is a global reset addition — applies site-wide with no visual side effects

## Open questions for designer

- None. Both fixes are defensive CSS corrections with no visual design decisions.
