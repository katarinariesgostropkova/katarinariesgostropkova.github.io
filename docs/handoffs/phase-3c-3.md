# Phase 3C-3 — /work Migrated to Content Collection

## Commit message
phase-3c-3: /work and homepage migrated to work content collection; work.js deleted

## Files modified
- `src/pages/work.astro` — refactored to use `getCollection('work')`, sorted by `order`, entries adapted to WorkRow Props at call site
- `src/pages/index.astro` — Row 1 (Checa) migrated to `getCollection`; composite locked Row 2 stays inline
- `src/content/work/non-profit.mdx` — added `order: 1`
- `src/content/work/family-space.mdx` — added `order: 2`
- `src/content/work/list-interface.mdx` — added `order: 3`
- `src/content/work/required-field.mdx` — added `order: 4`
- `src/content.config.ts` — sections field key corrected from `title` to `label` (schema alignment)

## Files deleted
- `src/data/work.js`

## WorkRow adapter

Applied at call site in both `work.astro` and `index.astro`:

```javascript
const work = entries.map((entry) => ({
  title:      entry.data.title,
  meta:       `${entry.data.meta.company} · ${entry.data.meta.timeline}`,
  tags:       entry.data.tags ?? [],
  excerpt:    entry.data.description,
  ctaLabel:   entry.data.private ? 'Request access →' : 'Explore →',
  ctaHref:    `/work/${entry.data.slug}`,
  locked:     entry.data.private,
  categories: entry.data.categories ?? [],
  thumbnail:  entry.data.heroImage
    ? { mode: 'image', src: entry.data.heroImage.src, alt: entry.data.heroImage.alt }
    : { mode: 'locked' },
}));
```

Meta field: `company + ' · ' + timeline` — matches the existing homepage pattern ("Asociación Cultural Checa de Galicia · Ongoing — initial launch followed by planned annual review").

In `index.astro`, the Checa entry is found by `entries.find((e) => e.data.slug === 'non-profit')` and adapted identically.

## Order locked
- non-profit: 1
- family-space: 2
- list-interface: 3
- required-field: 4

Sorted in `work.astro` via `.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))`.

## Regression checks
- `npm run build` passes with zero warnings — 6 pages built
- All four `/work/[slug]` routes generated: non-profit, family-space, list-interface, required-field
- `/work` and `/` (index) build cleanly
- No remaining imports from `src/data/work.js` confirmed before deletion

## Open questions for designer
None.

## Next phase
Phase 3D (password gate) is now unblocked. All three locked cases have proper routes (`/work/family-space`, `/work/list-interface`, `/work/required-field`) and the collection has `private: true` flags consistently. Phase 3D can wire the password gate against `entry.data.private`.

Phase 4 wires animations (filter pills, sidebar tracking, scroll reveals, all cosmetic motion).
