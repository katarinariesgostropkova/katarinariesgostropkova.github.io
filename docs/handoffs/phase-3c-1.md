# Phase 3C-1 — Case Study Route & Checa Page

## Commit message
phase-3c-1: dynamic case study route, Checa page live

## What changed
Created the dynamic `[slug].astro` route that reads from the `work` content collection via `getStaticPaths()`, rendering one page per case study. Added `src/content/config.ts` to define and validate the collection schema. Wired the `callout` prop into `CaseStudyLayout` (import, Props interface, destructure, markup, and responsive padding). Renamed the `sections[].title` field to `sections[].label` in `non-profit.mdx` to match the interface expected by `CaseStudySidebar` and `MobileNavPill`. Deleted the Phase 3B-2 test harness.

## Files created
- `src/pages/work/[slug].astro` — dynamic route
- `src/content/config.ts` — content collection schema definition

## Files modified
- `src/layouts/CaseStudyLayout.astro` — added `callout` prop, imported `CaseCallout`, rendered callout block between meta table and body, added `.case-callout-wrap` with responsive padding rules
- `src/content/work/non-profit.mdx` — renamed all `sections[].title` fields to `sections[].label`

## Files deleted
- `src/pages/case-study-test.astro` — replaced by the real route

## Route behaviour
- `getStaticPaths` reads from the `work` content collection
- Each entry's `entry.slug` (auto-generated from filename) drives the URL param
- `non-profit.mdx` → `/work/non-profit`
- Future case studies will auto-generate routes when their `.mdx` files are added to `src/content/work/` — no new code needed

## Sections approach
Per Resolution 3, section identification uses `<h2 id="...">` rendered by the `<SectionHeading>` component. There are NO `<section>` wrapper elements in the MDX body. Phase 4's sidebar observer will watch `h2[id]` elements directly, scoped to the `[data-case-study]` container.

## Animation hooks left for Phase 4

**Sidebar scroll tracking (animation ⑩):**
- Each `<SectionHeading>` renders `<h2 id="{id}">` — the 8 ids for Checa are: `opening`, `brief`, `audiences`, `decisions`, `testing`, `findings`, `where-it-stands`, `looking-back`
- The content area is scoped by `data-case-study` on `.case-body` in `CaseStudyLayout.astro` — Phase 4 observer query: `[data-case-study] h2[id]`
- The sidebar links carry `data-section-link` and `data-section-id="{id}"` attributes (in `CaseStudySidebar.astro`) — already in place from Phase 3B
- The callout `<aside>` has `role="note"` — Phase 4 can target `[role="note"]` for a fade-in reveal, or use `data-callout` (the attribute is passed to `<CaseCallout>` in the layout but not yet forwarded to the `<aside>` element — see Open questions)

## Deviations from spec — accepted exceptions

1. **`slug` not in content schema** — Astro 4 reserves `slug` as an auto-generated field; it cannot be declared in the Zod schema. `entry.slug` is used in `getStaticPaths` instead of `entry.data.slug`. The `slug` field in `non-profit.mdx` frontmatter is harmless (ignored by the schema validator) and left in place in case future tooling reads it.

2. **`render()` import** — The spec draft used `import { render } from 'astro:content'` (Astro 5 / Content Layer API syntax). This project is Astro 4.15.0 without the experimental contentLayer flag, so `entry.render()` (method form) is used instead.

3. **Test harness path** — The spec referenced `src/pages/_case-study-test.astro` (underscore prefix). The actual file was `src/pages/case-study-test.astro` (no underscore, per a documented deviation in phase-3b-2.md). The correct file was deleted.

4. **`data-callout` on `<aside>`** — `CaseCallout.astro` renders `<aside role="note">` and does not forward arbitrary HTML attributes. The attribute `data-callout` passed from the layout does not currently reach the DOM element. See Open questions.

## Regression checks
- `/` — unchanged, builds cleanly
- `/work` — unchanged, builds cleanly
- `/work/non-profit` — new route, builds and generates `dist/work/non-profit/index.html`
- `case-study-test.astro` deleted; `/case-study-test` route no longer exists

## Open questions for designer

1. **`data-callout` forwarding** — `CaseCallout.astro` does not spread `...Astro.props` onto its `<aside>`, so `data-callout` passed from the layout is currently swallowed. If Phase 4 needs a `data-callout` attribute on the `<aside>` element for the fade-in animation, add `{...Astro.props}` spread or a dedicated `data-callout` prop to `CaseCallout.astro`. Flag for Phase 4 to decide.

2. **`slug` field in frontmatter** — The `slug: 'non-profit'` line in `non-profit.mdx` is now unused by the schema (Astro generates slug from filename). It can be removed for cleanliness, or left as documentation. Decision deferred.

## Next phase
- **Phase 3C-2+** — build the three locked case studies (Family Space, List Interface, Required Field Indicator) once Katarina writes their `.mdx` files in `src/content/work/`. The `[slug].astro` route picks them up automatically.
- **Phase 3C-3** — migrate `/work` index from `work.js` to read from the content collection.
- **Phase 3D** — wire password gate for locked cases.
- **Phase 4** — wire animation ⑩ (sidebar scroll tracking). Observer target: `[data-case-study] h2[id]`. Active link tracking via `data-section-link` / `data-section-id` on sidebar anchors.
