# Phase 3C-0 — Content Infrastructure & Checa Restructure

## Commit message
phase-3c-0: MDX support, content collections, Checa restructured to MDX

## What changed
Added `@astrojs/mdx` integration and defined two Astro content collections (`work` and `homepage`) in a new `src/content.config.ts`. The `copy.md` master content document was moved from the content root into a new `src/content/homepage/` subdirectory with minimal frontmatter added, resolving the Phase 2A content layer warning. The Checa case study was fully restructured from a flat markdown file (`nonprofit.md`) into a typed MDX file (`non-profit.mdx`) with complete YAML frontmatter (title, slug, meta, sections, callout, tags, categories, heroImage, status), component imports, `<SectionHeading>` replacements for every `##` heading, and an `<InlineImage>` for the personas visual. A new `CaseCallout.astro` component was built to render the "What this project demonstrates" block; it is not referenced in the MDX body — the callout content lives in frontmatter and will be rendered by Phase 3C-1's case study page. The `work.js` data file is unchanged and coexists with the new content collection.

## Files created
- `src/content.config.ts` — Zod schemas for `work` (MDX) and `homepage` (markdown) collections
- `src/content/homepage/copy.md` — moved from `src/content/copy.md` with frontmatter added
- `src/content/work/non-profit.mdx` — restructured from `nonprofit.md`
- `src/components/CaseCallout.astro` — new component for "What this project demonstrates" callouts

## Files modified
- `astro.config.mjs` — added `@astrojs/mdx` integration
- `package.json` + `package-lock.json` — added `@astrojs/mdx@^3.1.0` as devDependency

## Files deleted
- `src/content/copy.md` — replaced by `src/content/homepage/copy.md`
- `src/content/work/nonprofit.md` — replaced by `src/content/work/non-profit.mdx`

## Also updated
- `specs/CLAUDE.md §11` — corrected section IDs for `/work/asociacion` to match Phase 3C-0 spec: `two-audiences` → `audiences`, `design-decisions` → `decisions`, `revealed` → `findings`, `stands` → `where-it-stands`. Section 5 label updated to `'Testing With Real and Synthetic Users'`. These IDs are what `sidebar-observer.js` will use to match `<section id="...">` elements in Phase 3C-1.

---

## Content collection schema

```ts
// work collection — src/content/work/**/*.mdx
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title:       z.string(),
    slug:        z.string(),
    eyebrow:     z.string().optional(),
    description: z.string(),
    heroImage: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    meta: z.object({
      company:  z.string(),
      team:     z.string(),
      role:     z.string(),
      timeline: z.string(),
    }),
    sections: z.array(
      z.object({
        title: z.string(),
        id:    z.string(),
      })
    ),
    callout: z.object({
      label: z.string(),
      body:  z.string(),
    }).optional(),
    tags:       z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    private:    z.boolean().optional().default(false),
    order:      z.number().optional(),
    status:     z.string().optional(),
  }),
});

// homepage collection — src/content/homepage/**/*.md
const homepage = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/homepage' }),
  schema: z.object({
    slug:  z.string(),
    title: z.string().optional(),
  }),
});
```

---

## Component contract: CaseCallout

**Props:** `{ label: string }`
**Body:** passed via `<slot />`
**Visual:** linen background (`--color-linen`), rose left border (`--color-rose`, 3px), 12px border-radius, teal uppercase label (`--color-teal`), Cormorant Garamond 300 18px body

**Usage (Phase 3C-1 page renders this from frontmatter):**
```astro
<CaseCallout label={entry.data.callout.label}>
  {entry.data.callout.body}
</CaseCallout>
```

---

## CaseCallout placement decision

Frontmatter-only (option i). The callout content lives in the `callout` field of the MDX frontmatter. Phase 3C-1's case study page reads `entry.data.callout` and renders `<CaseCallout>` in the layout, between the meta table and the first section. The MDX body does **not** include any `<CaseCallout>` markup — the body starts directly with `<SectionHeading number="01" .../>`.

---

## Checa frontmatter (full record)

```yaml
title: 'Building a public presence from scratch'
slug: 'non-profit'
eyebrow: 'Case study'
description: 'How do you design a credible public presence for an organisation that is still becoming itself — with two distinct audiences, no budget and no team?'
heroImage:
  src: '/assets/images/work/non-profit/checa-hero.png'
  alt: 'Checa de Galicia homepage — Czech and Galician community welcome, with coastal photography'
meta:
  company: 'Asociación Cultural Checa de Galicia'
  team: 'Solo — designer, researcher and builder'
  role: 'Brand identity, UX design, content strategy, front-end development'
  timeline: 'Ongoing — initial launch followed by planned annual review'
sections:
  - title: 'The Opening'
    id: 'opening'
  - title: 'The Brief'
    id: 'brief'
  - title: 'Two Audiences, One Website'
    id: 'audiences'
  - title: 'The Design Decisions'
    id: 'decisions'
  - title: 'Testing With Real and Synthetic Users'
    id: 'testing'
  - title: 'What Testing Revealed'
    id: 'findings'
  - title: 'Where It Stands'
    id: 'where-it-stands'
  - title: 'Looking Back'
    id: 'looking-back'
callout:
  label: 'What this project demonstrates'
  body: 'A full design process — persona research, audience definition, testing and iteration — executed alone, with zero budget, on a real product with real community stakes. The only case study in this portfolio where the designer owned everything from brief to live product.'
tags:
  - 'Product Design'
  - 'Brand Identity'
  - 'Design System'
  - 'Research'
categories:
  - 'product'
  - 'research'
  - 'design-systems'
private: false
status: 'Live'
```

**First SectionHeading:**
```mdx
<SectionHeading
  number="01"
  title="The Opening"
  id="opening"
/>
```

**Personas InlineImage (Section 03):**
```mdx
<InlineImage
  src="/assets/images/work/non-profit/asociacion-personas.png"
  alt="Two user research personas for the Checa de Galicia website: The Dual-Language Roots Family and The Atlantic Connector"
  label="Research · Two personas explored"
  captionBold="Two primary personas"
  caption=" identified through community research and expat-forum analysis — representing the two core motivations for joining Checa de Galicia."
/>
```

---

## Tokens used (CaseCallout)

| Token | Role |
|---|---|
| `--color-linen` | Background |
| `--color-rose` | Left border |
| `--space-6` | Padding |
| `--space-10` | Vertical margin |
| `--font-sans` | Label font family |
| `--font-size-meta` | Label font size |
| `--weight-medium` | Label font weight |
| `--color-teal` | Label colour |
| `--tracking-widest` | Label letter spacing |
| `--space-3` | Label bottom margin / paragraph gap |
| `--font-serif` | Body font family |
| `--weight-light` | Body font weight |
| `--text-primary` | Body colour |
| `--leading-normal` | Body line height |

No new tokens added to `global.css`.

---

## Deviations from spec — accepted exceptions

- **CaseCallout body uses `18px` font-size literal.** Sits between `--font-size-subhead` (16px) and `--font-size-section` (28px) with no canonical token. Deliberate one-off to distinguish callout body from standard body text. Same pattern as Phase 2C's `20px` work-card-title literal.
- **Phase 2A `copy.md` warning resolved** by moving the file into the `homepage` content collection with minimal frontmatter. The homepage components still inline copy strings and do not yet read from the collection — that migration is deferred to Phase 4 or post-launch.

---

## Regression checks

- `npm run build` — passes, 3 pages built, zero warnings
- Phase 2A content layer warning — confirmed absent from build output
- `work` collection types generated without schema validation errors
- `homepage` collection types generated without schema validation errors
- `/` (homepage) — renders correctly
- `/work` — renders correctly, driven by `work.js` (unchanged)
- `/_case-study-test` — renders correctly via `case-study-test.astro`
- No broken imports introduced

---

## Open questions for designer

None.

---

## Next phase

Phase 3C-1 will create the dynamic case study route (`src/pages/work/[slug].astro`) and render the Checa entry through `CaseStudyLayout`. It will read `entry.data.callout` from frontmatter and render `<CaseCallout>` between the meta table and the first `<SectionHeading>`. Each content `<section>` in the rendered body must carry `id`, `data-title`, and `data-index` attributes matching the corrected IDs in `CLAUDE.md §11` so `sidebar-observer.js` can track them.

The three locked cases remain as PDFs in `project-root/content/` until Katarina writes them in markdown (Phases 3C-2 and beyond). `work.js` continues to drive the `/work` index until the collection migration is completed in Phase 3C-3 or later.
