# Phase 3C-1c — Case Study Polish Fixes

## Commit message
phase-3c-1c: fix checa hero image, family-space quote rendering, list-interface label

## Bugs fixed
1. Checa hero image not rendering — image assets were tracked in git under uppercase paths (`public/assets/Images/Work/`) while MDX files and the HTML output referenced lowercase paths; on Linux (GitHub Actions), these don't match, causing a 404.
2. Family Space teenager quote rendering as inline bold — the blockquote used `*"**...**"*` syntax (bold inside italic) with the attribution on the same line, instead of clean `>` blockquote syntax with attribution on a separate line.
3. List Interface first image label mismatched the image content — label read "Synthesis · Observation patterns" but the image shows the interface under study.

## Root cause — Issue 1
Git was tracking all image assets under `public/assets/Images/Work/` (capital I, capital W). The local Windows filesystem is case-insensitive (`core.ignorecase = true`), so the dev server and local builds worked fine — both paths resolved to the same physical file. On Ubuntu (GitHub Actions, case-sensitive Linux), git checked out files to `public/assets/Images/Work/...`, Astro copied them to `dist/assets/Images/Work/...`, but the built HTML requested `/assets/images/work/...` (lowercase) → HTTP 404 → alt text shown instead of image. Fix: remove the uppercase index entries with `git rm -r --cached "public/assets/Images/"` and re-add the same physical files (already on disk as lowercase) with `git add "public/assets/images/"`.

## Files modified
- `src/content/work/family-space.mdx` (teenager quote, 1 block)
- `src/content/work/list-interface.mdx` (InlineImage label, 1 line)
- Git index only for Issue 1 (no file content changed — `public/assets/images/` files re-tracked under lowercase paths)

## Lines changed
- family-space.mdx: 1 line replaced with 3 lines (+2)
- list-interface.mdx: 1 line changed
- Git index: 12 files removed from uppercase paths, 15 re-added under lowercase paths (includes previously untracked images now picked up)

## Fixes applied

### Issue 1 — Re-track images under lowercase paths
```bash
# Before: git tracked files as public/assets/Images/Work/non-profit/checa-hero.png
# After:  git tracks files as public/assets/images/work/non-profit/checa-hero.png
git rm -r --cached "public/assets/Images/"
git add "public/assets/images/"
```

### Issue 2 — Teenager quote (family-space.mdx, line 102)
**Before:**
```markdown
> *"**I watch movies for an hour a day during the school year. During the weekend it is really long — sometimes I spend the whole day watching something.**"* — Teenager, diary study participant
```
**After:**
```markdown
> "I watch movies for an hour a day during the school year. During the weekend it is really long — sometimes I spend the whole day watching something."
>
> — Teenager, diary study participant
```

### Issue 3 — InlineImage label (list-interface.mdx, line 89)
**Before:**
```
label="Synthesis · Observation patterns"
```
**After:**
```
label="Product · The interface under study"
```

## Regression checks
- Build: `npm run build` completes cleanly, 6 pages, no warnings
- Non-profit: built HTML contains `<img src="/assets/images/work/non-profit/checa-hero.png">` — correct lowercase path; image file present in dist
- Family-space: built HTML renders teenager quote as `<blockquote>` with two `<p>` children (quote text + attribution) — no bold markup; mother's PullQuote component unchanged
- List-interface: built HTML shows `inline-image__label-text` content "Product · The interface under study"
- All other case study pages built without error

## Open questions for designer
- None. All three fixes are mechanical corrections with no design decisions required.
