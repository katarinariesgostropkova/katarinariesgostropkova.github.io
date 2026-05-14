# Phase 3A — /work Index Page

## Commit message
phase-3a: /work index with four cases and filter row

## What changed
Created the `/work` index page as a new static layout. Extended `src/data/work.js` from two entries to four individual case entries, removing the composite locked row which is now inlined directly in `index.astro`. The homepage continues to render the same two-row teaser (Checa + composite), while `/work` renders all four discrete rows beneath a filter pill row. WorkRow.astro received a minor interface fix to make the `thumbnail.src` and `thumbnail.alt` fields optional, accommodating locked entries that carry no image.

## Files created
- `src/pages/work.astro`

## Files modified
- `src/data/work.js` — renamed export from `homepageWork` to `work`; extended from 2 to 4 entries; composite locked entry removed and inlined into homepage
- `src/pages/index.astro` — composite locked row inlined as `compositeRow` object in frontmatter; Checa row now reads from `work[0]`; import updated from `homepageWork` to `work`
- `src/components/WorkRow.astro` — thumbnail interface updated: `src` and `alt` made optional, `mode` field added as optional (`'image' | 'locked'`); WorkRow still derives display mode from the `locked` prop at runtime

## Content extracted from copy.md

**Page heading (§03):**
> "Research that shaped products. Design that shipped."
> (copy.md annotation: 'shipped.' appears in teal italic — applied as `<em class="work-index__heading-accent">`)

**Page subheadline / intro (§03):**
> "Some work is research-focused. Some goes all the way to delivery. All of it is grounded in evidence."

**Case 1 — Checa de Galicia (§03 Card 1):**
> Title: "Building a public presence from scratch"
> Meta: "Asociación Cultural Checa de Galicia · 2024–2025"
> Excerpt: "A full design and build for a Czech cultural association in Galicia — information architecture, visual identity, responsive build. The only case study here you can explore without a password."
> CTA: "Explore →"

**Case 2 — Family Space (§03 Card 3):**
> Title: "Family Space · Parental Controls"
> Meta: "Verizon · 4-month study · 2020"
> Excerpt: "Understanding why children deleted the app — and what a balanced parental control product could look like for both parents and children."
> CTA: "Request access"

**Case 3 — List Interface (§03 Card 4):**
> Title: "List Interface · Designing for Clarity at Scale"
> Meta: "Enterprise ERP · NetSuite · Multi-month discovery"
> Excerpt: "Starting from a signal about cognitive overload, this work reframed the question — from what to build, to what the interface is actually for."
> CTA: "Request access"

**Case 4 — Required Field Indicator (§03 Card 2):**
> Title: "The Required Field Indicator"
> Meta: "Enterprise ERP · NetSuite · 2023"
> Excerpt: "A usability study that challenged an inherited component — and revealed how the path from evidence to organisational action is its own design problem."
> CTA: "Request access"

**Homepage composite (§02 Locked Card, inlined in index.astro):**
> Title: "Seven years of research and design work" *(see deviations)*
> Meta: "Avast · Oracle NetSuite"
> Tags: UX Research · Enterprise ERP
> Excerpt: "Three research projects from enterprise UX — covering design systems, parental controls and list interfaces. Protected by NDA."
> CTA: "Request access"

## Filter category mapping (Resolution 3)

| Case | categories array |
|------|-----------------|
| Checa de Galicia | `['product', 'research', 'design-systems']` |
| Family Space | `['product', 'research']` |
| List Interface | `['research', 'design-systems']` |
| Required Field Indicator | `['research', 'design-systems']` |

## Tokens used

| Purpose | Token |
|---------|-------|
| Active pill background | `--color-deep-tide` |
| Active pill text | `--color-canvas` |
| Active pill border | `--color-deep-tide` |
| Inactive pill text | `--text-muted` |
| Inactive pill border | `rgba(107, 122, 141, 0.35)` — raw value, no token exists |
| Inactive hover text | `--text-secondary` |
| Inactive hover border | `--text-secondary` |
| Heading accent colour | `--color-teal` |
| Page background | `--color-canvas` |
| Heading font | `--font-serif`, `--font-size-hero`, `--weight-light` |
| Heading colour | `--text-primary` |
| Heading spacing | `--leading-tight`, `--tracking-tight` |
| Intro font | `--font-sans`, `--font-size-subhead`, `--weight-regular` |
| Intro colour | `--text-secondary` |
| Intro spacing | `--leading-normal` |
| Pill font | `--font-sans`, `--font-size-meta`, `--weight-regular`, `--tracking-wide` |
| Pill shape | `--radius-full` |
| Pill transition | `--duration-fast`, `--ease-out` |
| Layout | `--container-wide`, `--padding-desktop`, `--padding-tablet`, `--padding-mobile` |
| Spacing | `--space-3`, `--space-6`, `--space-10`, `--space-12`, `--space-16` |

## Animation hooks left for future phase

- `data-work-index` on `<section>` — animation ⑧ scroll reveal
- `data-filter-row` on filter container — animation ⑨ filter behaviour
- `data-filter-pill` + `data-filter="key"` on each pill button
- `data-work-row` + `data-categories="key1 key2"` on each row wrapper
- `aria-pressed` on pill buttons — Phase 4 JS toggles these on click

## Deviations from spec — accepted exceptions

1. **Teal italic on "shipped."** — copy.md §03 explicitly annotates `'SHIPPED.' IN TEAL ITALIC`. The spec's Step 2.3 markup showed a plain `<h1>`. Applied the `<em class="work-index__heading-accent">` treatment to match copy.md, consistent with the "human eye." treatment on the Hero. Document wins per constraint (a).

2. **Homepage composite title** — The spec's Step 2.2 gave "Seven years of research and design work"; copy.md §02 gives "Featured Projects: Evidence-Based Design". Designer confirmed copy.md is correct. `index.astro` uses "Featured Projects: Evidence-Based Design".

3. **Card order on /work** — copy.md §03 orders: Checa → Required Field → Family Space → List Interface. Resolution 1 orders: Checa → Family Space → List Interface → Required Field. Resolution 1 was followed as the locked designer decision for Phase 3A.

4. **Filter labels** — copy.md §03 lists: All · UX Research · Product Design · 0 → 1. Resolution 2 lists: All · Product · Research · Design Systems. Resolution 2 was followed as the locked designer decision for Phase 3A.

5. **Per-case tags** — copy.md §03 and Resolution 4 give different tags for all four cases. Resolution 4 was followed as the locked designer decision for Phase 3A.

6. **WorkRow.astro thumbnail interface** — made `src`, `alt`, and `mode` optional to support locked entries that carry no image src. Runtime behaviour unchanged; WorkRow still derives display mode from the `locked` prop.

## Regression checks

- `/` homepage renders: Hero, ImpactStrip, two-row teaser (Checa + composite locked), footer — confirmed via build
- `/work` renders: h1 with teal italic "shipped.", intro, four filter pills, four case rows — confirmed via build
- Build output: 2 pages, 0 new warnings (pre-existing copy.md path warning unchanged)

## Open questions for designer

None. All three open questions resolved post-build:
1. **Composite title** — "Featured Projects: Evidence-Based Design" confirmed. Updated in `index.astro`.
2. **Eyebrow label** — omitted. No eyebrow above the /work h1.
3. **Locked CTA arrow** — "Request access →" (with arrow) confirmed. Updated in `work.js` (all three locked entries) and `index.astro` (composite row).

## Next phase prerequisite
Phase 3B (case study layout & template) is next. Phase 3C builds the four individual case study pages. Phase 3D wires the password gate. Phase 4 wires filter behaviour and all motion.
