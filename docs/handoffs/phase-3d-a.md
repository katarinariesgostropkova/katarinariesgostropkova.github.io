# Phase 3D-a — /work Card Order Fix

## Commit message
```
phase-3d-a: sort /work cards by frontmatter order field
```

## Bug fixed
`/work` showed cards in filesystem (alphabetical) order — `family-space → list-interface → non-profit → required-field` — rather than the explicit `order` field set in each MDX frontmatter.

## Root cause
`order: z.number().optional()` was absent from the Zod schema in `src/content/config.ts`. Zod strips undeclared fields by default, so `entry.data.order` was always `undefined` at runtime. The sort in `work.astro` — `(a.data.order ?? 99) - (b.data.order ?? 99)` — evaluated to `(99 - 99) = 0` for every pair, leaving entries in their original filesystem order.

The sort call itself was correct. The frontmatter values were correct (1–4). Only the schema was missing the field.

The homepage was unaffected: it hardcodes `workEntries.find((e) => e.slug === 'non-profit')` and does not depend on sort order.

## Files modified
- `src/content/config.ts` — 1 line added

## Lines changed
1

## Fix applied

**Before:**
```ts
    status: z.string().optional(),
  }),
```

**After:**
```ts
    status: z.string().optional(),
    order: z.number().optional(),
  }),
```

## Regression checks
- `npm run build` succeeds, zero warnings
- `/work` card order: non-profit (1) → family-space (2) → list-interface (3) → required-field (4) — confirmed in built HTML
- Password gate still triggers correctly on locked cases (separate fix, phase-3d)
- Homepage: Checa row and composite locked row unaffected
- Filter pill row renders at top of `/work`
- All four `/work/[slug]` pages accessible

## Open questions
None.
