# Phase 3C-1b — Three Case Studies Restructured to MDX

## Commit message
phase-3c-1b: family-space, list-interface, required-field restructured to MDX with frontmatter

## Files created
- `src/content/work/family-space.mdx`
- `src/content/work/list-interface.mdx`
- `src/content/work/required-field.mdx`

## Files deleted
- `src/content/work/family_space.md` (was underscore-named, not hyphen)
- `src/content/work/record_list.md` (was named record_list, not list-interface)
- `src/content/work/required_field.md` (was underscore-named)

## Frontmatter records

### family-space.mdx
```yaml
slug: 'family-space'
sections:
  - label: 'The Opening'
    id: 'opening'
  - label: 'The Research Approach'
    id: 'approach'
  - label: 'What We Found — and What It Changed'
    id: 'findings'
  - label: 'What the Research Pointed Toward'
    id: 'direction'
  - label: 'What Happened and Where It Landed'
    id: 'outcome'
  - label: 'Looking Back'
    id: 'looking-back'
order: 2
```

### list-interface.mdx
```yaml
slug: 'list-interface'
sections:
  - label: 'The Opening'
    id: 'opening'
  - label: 'Who We Were Designing For'
    id: 'audience'
  - label: 'What We Did to Find Out'
    id: 'method'
  - label: 'What We Learned'
    id: 'findings'
  - label: 'How the Thinking Evolved'
    id: 'evolution'
  - label: 'Where the Work Led'
    id: 'outcome'
  - label: 'Looking Back'
    id: 'looking-back'
order: 3
```

### required-field.mdx
```yaml
slug: 'required-field'
sections:
  - label: 'The Opening'
    id: 'opening'
  - label: 'The Background'
    id: 'background'
  - label: 'The Problem'
    id: 'problem'
  - label: 'The Study'
    id: 'study'
  - label: 'Taking It Forward'
    id: 'taking-forward'
  - label: 'What the Experience Revealed'
    id: 'revealed'
  - label: 'Looking Back'
    id: 'looking-back'
order: 4
```

## Image references resolved

| File | Placeholder | Asset |
|---|---|---|
| family-space | Problem cycle diagram | `fs-problem-cycle.png` |
| family-space | Slide on psychological values | `fs-psychological-values.png` |
| family-space | Feature prioritisation matrix | **DELETED — no replacement** |
| family-space | Parenting styles diagram | `fs-parenting-styles.png` |
| list-interface | Synthesis artefact | `li-redwood-ui.webp` (extension is .webp, not .png) |
| list-interface | Execution vs analytical behaviours | `li-behaviour-modes.png` |
| list-interface | Analytical vs operational context | `li-operational-vs-analytical.png` |
| required-field | Three variants side by side | `rf-three-variants.png` |
| required-field | Recognition speed and familiarity chart | `rf-recognition-chart.png` |

All `<InlineImage>` components use `label` only — no `caption`, no `captionBold`.

## Family Space PullQuote
Mother's diary quote rendered as `<PullQuote variant="rose">` with `attribution="Mother, diary study participant"`. Teenager's quote kept as inline blockquote in prose (`> *"..."*`) per the one-rose-per-page rule. `PullQuote` import added to `family-space.mdx` only.

## Schema deviation — sections field key
The spec specified `title:` in sections frontmatter. The legacy schema at `src/content/config.ts` (Astro 4 API) uses `label: z.string()` — matching `non-profit.mdx`. All three new files use `label:`. The newer `src/content.config.ts` was updated from `title` to `label` to stay in sync.

## Tokens used
Same as Phase 3C-0 + 3C-1 (no new tokens)

## Deviations from spec
1. **Sections key is `label` not `title`** — existing schema and non-profit.mdx use `label`. New files follow the existing convention. Both schema files updated to use `label` consistently.
2. **`li-redwood-ui` is `.webp` not `.png`** — `src` in InlineImage updated to `.webp`. Anticipated in spec ("verify extension").
3. **Source `.md` filenames differed from spec** — `family_space.md`, `record_list.md`, `required_field.md` (underscores, one entirely different name). Deleted correctly.

## Open questions for designer
None.
