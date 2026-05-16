# ASSETS.md
# Katarina Riesgo Stropkova — Portfolio Website
# Complete Asset & Content File Map
# ─────────────────────────────────────────────────────────────
# This file maps every asset the codebase references.
# Claude Code must not invent filenames. If a file is listed
# as MISSING or PENDING, stop and flag it — do not use a
# placeholder path that will silently fail.
#
# STATUS KEY
# ✓ READY     — file confirmed, correct name, ready to use
# ⚠ PENDING   — exists as source but needs export/rename
# ✗ MISSING   — does not exist yet, build blocked until ready
# ~ IN CODE   — no file needed, built in HTML/CSS/SVG
# ─────────────────────────────────────────────────────────────


---


## PART 1 — PROJECT SOURCE DOCUMENTS
## Live outside the Astro project. Inputs only, not deployed.

```
project-root/docs/
├── CLAUDE.md                                    ✓ READY
├── DESIGN_SYSTEM.md                             ✓ READY
├── ANIMATION_PROMPT.md                          ✓ READY
├── IMAGE_TREATMENTS.md                          ✓ READY
├── DESIGN_DECISIONS.md                          ✓ READY
├── DEVELOPER_HANDOFF.md                         ✓ READY
└── ASSETS.md                                    ✓ READY  ← this file
```


---


## PART 2 — DESIGN REFERENCE IMAGES
## Source: project-root/design-references/
## Claude Code reads these for visual specs. Never referenced in deployed code.

```
project-root/design-references/
├── Figma_header.png                             ✓ READY
├── Figma_hero_message.png                       ✓ READY
├── Figma_homepage.png                           ✓ READY
├── Figma_homepage2.png                          ✓ READY
├── Figma_footer.png                             ✓ READY
├── Work_page.png                                ✓ READY
├── Case_studies_Work_page.png                   ✓ READY
├── Use_case_page.png                            ✓ READY
├── Password_gate_visual_design.png              ✓ READY
├── Hero_about_page.png                          ✓ READY
├── Main_body_about_page.png                     ✓ READY
├── Reference_about_page.png                     ✓ READY
├── CTA_connect_about_page.png                   ✓ READY
├── Article_page.png                             ✓ READY
├── CTA_article_page.png                         ✓ READY
├── CTA_notebook_page.png                        ✓ READY
└── Headline.png                                 ✓ READY
```

### What each reference image covers

| File | Shows |
|---|---|
| `Figma_header.png` | Desktop header: mark + "Katarina / RIESGO STROPKOVA" left · nav pill centred · "Request access →" right |
| `Figma_hero_message.png` | Hero section: eyebrow · headline · sub · intro · CTA row with status rotator |
| `Figma_homepage.png` | Full homepage hero — larger viewport render |
| `Figma_homepage2.png` | Homepage scrolled: impact strip + work section with both rows |
| `Figma_footer.png` | Footer: zone 1 (contact) + zone 2 (nav + copyright). Also shows locked work row above footer. |
| `Work_page.png` | /work index: hero headline + filter pills + featured open card (full-width) |
| `Case_studies_Work_page.png` | /work index: three locked case cards in 3-column grid below featured card |
| `Use_case_page.png` | Case study page: sidebar left · title/subtitle/tags/meta · pull quote · body opening |
| `Password_gate_visual_design.png` | Password gate: title/meta visible · sidebar at reduced opacity · gate card with form + password row |
| `Hero_about_page.png` | About page hero: two-column · headline left · photo placeholder right |
| `Main_body_about_page.png` | About page: timeline (5 dots) + three story columns |
| `Reference_about_page.png` | About page: mid-page CTA + "From People I've Worked With" + 3 recommendation cards |
| `CTA_connect_about_page.png` | About page bottom CTA: "Let's work together" + LinkedIn button |
| `Article_page.png` | Notebook article: breadcrumb · title/subtitle · meta bar · body + right TOC sidebar |
| `CTA_article_page.png` | Article page end: pull quote + "See my work →" + "Connect on LinkedIn →" |
| `CTA_notebook_page.png` | Notebook index bottom: "More coming soon" row + CTA "The work that informed this thinking. See my work →" |
| `Headline.png` | Notebook index: header with "Note*book*" title (italic rose) + transparency pill |


---


## PART 3 — CONTENT DOCUMENTS
## Source: project-root/content/

```
project-root/content/
├── nonprofit_case_study.docx                    ✓ READY
├── required_field_case_study_safe_v3.docx       ✓ READY
├── family_space_case_study_V3.docx              ✓ READY
├── record_list_case_study_safe_v3.docx          ✓ READY
├── about_page_content.docx                      ✓ READY
├── notebook_page_content.docx                   ✓ READY
└── notebook_article_v1.docx                     ✓ READY
```

### Content → Page mapping

| Source file | Builds into Astro page | Notes |
|---|---|---|
| `nonprofit_case_study.docx` | `src/pages/work/asociacion.astro` | Open case study |
| `required_field_case_study_safe_v3.docx` | `src/pages/work/required-field.astro` | Locked — NDA safe version |
| `family_space_case_study_V3.docx` | `src/pages/work/family-space.astro` | Locked — NDA safe version |
| `record_list_case_study_safe_v3.docx` | `src/pages/work/list-interface.astro` | Locked — filename says "record_list", slug is "list-interface" |
| `about_page_content.docx` | `src/pages/about.astro` | |
| `notebook_page_content.docx` | `src/pages/notebook/index.astro` | |
| `notebook_article_v1.docx` | `src/pages/notebook/predicting-the-future-of-ux.astro` | |

**Critical naming note:** `record_list_case_study_safe_v3.docx` → the Astro slug is `list-interface`, the image prefix is `li-`, and the URL is `/work/list-interface`. The source filename uses "record_list" — do not let this bleed into any deployed path or variable name.


---


## PART 4 — DEPLOYED STATIC ASSETS
## Source: public/
## Every path below must exist exactly as written before Claude Code references it.

### 4.1 Brand & meta

```
public/
├── favicon.svg                                  ✓ READY — use as single SVG source for all mark instances
├── favicon.ico                                  ✓ READY
└── site.webmanifest                             ~ IN CODE — Claude Code creates this from site_webmanifest.txt
                                                   content. Do not wait for a renamed file.

public/assets/favicons/
├── favicon-96x96.png                            ✓ READY
├── web-app-manifest-192x192.png                 ✓ READY
├── web-app-manifest-512x512.png                 ✓ READY
└── apple-touch-icon.png                         ✓ READY

public/assets/images/
└── og-image.png                                 ✓ READY
```

**mark-light.svg / mark-dark.svg — not needed as separate files.**
`favicon.svg` is the single source for the mark. Light and dark surface variants are handled in CSS:

```css
/* Light surface — default */
.logo-mark .mark-teardrop { fill: var(--color-deep-tide); }

/* Dark surface — footer, mobile overlay */
.logo-mark--dark .mark-teardrop {
  fill: rgba(247,246,242,0.08);
  stroke: rgba(247,246,242,0.45);
  stroke-width: 2;
}
```

Apply `.logo-mark--dark` on the `<LogoMark>` component instance inside `Footer.astro` and `MobileOverlay.astro`.

**site.webmanifest** is created by Claude Code directly in the project. Content from `site_webmanifest.txt`:
```json
{
  "name": "K·R·S",
  "short_name": "Katarina",
  "icons": [
    { "src": "/assets/favicons/web-app-manifest-192x192.png?v=v2", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "/assets/favicons/web-app-manifest-512x512.png?v=v2", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "theme_color": "#1c2b3a",
  "background_color": "#f7f6f2",
  "display": "standalone"
}
```

**Head tags in BaseLayout.astro:**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="96x96" href="/assets/favicons/favicon-96x96.png" />
<link rel="apple-touch-icon" href="/assets/favicons/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#1c2b3a" />
```

### 4.2 About page photo

```
public/assets/images/about/
└── katarina-photo.png                           ✓ READY — confirmed provided
```

Rename rule: whatever filename the photo arrives as → rename to `katarina-photo.png`.
Export spec: portrait crop, aspect-ratio 3/4, minimum 800px wide. WebP export alongside PNG.

### 4.3 Work images — Asociación (open case study)

```
public/assets/images/work/asociacion/
├── asociacion-mockup.png                        ✓ READY — laptop mockup, hero image
└── asociacion-personas.png                      ✓ READY
    └── Two persona profiles side by side:
        The Dual-Language Roots Family (Lucie)
        and The Atlantic Connector (Jakub)
```

### 4.4 Work images — Required Field (locked)

**Folder path:** `public/assets/images/work/design-system/`

```
public/assets/images/work/design-system/
├── rf-hero.png                                  ✓ READY — renamed from: thumbnail_design system
│   └── Hero image for the Required Field case
│       study page — renders above the meta table
│
├── rf-three-variants.png                        ✓ READY — renamed from: required field_three options
│   └── Three mockups side by side:
│       current design (grey "Required" label) /
│       red label + red asterisk /
│       red asterisk only
│
└── rf-recognition-chart.png                     ✓ READY — renamed from: Research findings_v2
    └── Recognition speed + perceived familiarity
        rating chart across all three variants
```

### 4.5 Work images — Family Space (locked)

> Note (May 2026): fs-hero.png consolidates content previously
> spread across fs-parenting-styles.png, fs-problem-cycle.png,
> and fs-psychological-values.png. Those three files have been
> deleted. Phase 3C Family Space case study uses fs-hero.png as
> the single body image.

```
public/assets/images/work/family-space/
└── fs-hero.png                                  ✓ READY
    └── Hero image for the Family Space case
        study page — renders above the meta table
        (replaces the three-screen inline layout)
```

**Removed:** `fs-app-screen-01/02/03.png` — replaced by `fs-hero.png` above meta table.
**Removed:** `fs-feature-matrix.png` — will not be used. No placeholder needed.
**Removed:** `fs-parenting-styles.png`, `fs-problem-cycle.png`, `fs-psychological-values.png` — consolidated into `fs-hero.png` (May 2026).

### 4.6 Work images — List Interface (locked)

```
public/assets/images/work/list-interface/
├── li-hero.png                                  ✓ READY
│   └── Hero image for the List Interface case
│       study page — renders above the meta table
│
├── li-redwood-ui.png                            ✓ READY
│   └── Replaces affinity map — UI reference
│       image (Redwood design system context)
│
├── li-behaviour-modes.png                       ✓ READY
│   └── Conceptual diagram: execution-mode vs
│       analytical-mode user behaviour patterns
│
└── li-operational-vs-analytical.png             ✓ READY
    └── Left: analytical context (user configures)
        Right: operational context (pre-configured)
```

**Removed:** `li-affinity-map.png` — will not be provided. No placeholder needed.
**Added:** `li-redwood-ui.png` — replaces affinity map position in case study body.


---


## PART 5 — LOCKED CARD THUMBNAILS (built in code, no image files)

Confirmed from `Case_studies_Work_page.png` — thumbnails are abstract bar/line compositions on Deep Tide background. Built as inline SVG inside `WorkCardThumbnail.astro`.

| Case study | Visual pattern seen in Figma | Implementation |
|---|---|---|
| Required Field | Horizontal bars — teal dominant rows, one rose accent bar, varying widths | ~ IN CODE |
| Family Space | Horizontal bars — teal and rose alternating, grouped in sets | ~ IN CODE |
| List Interface | Columnar structure — teal header row, grey data rows fading in opacity | ~ IN CODE |

**Do not export these as image files.** They are code-generated SVG compositions.
If the exact SVG composition needs to precisely match the Figma designs, reference `Case_studies_Work_page.png` directly.


---


## PART 6 — INLINE IMAGE PLACEHOLDER COMPONENT
## Used when a [ VISUAL ] marker exists in a content doc but the image file is MISSING

```html
<div class="inline-image-placeholder">
  <p class="placeholder-label">[ Image pending: rf-three-variants.png ]</p>
</div>
```

```css
.inline-image-placeholder {
  background: var(--color-linen);
  border: 1.5px dashed rgba(43, 165, 165, 0.35);
  border-radius: var(--radius-lg);
  padding: var(--space-12) var(--space-8);
  text-align: center;
}
.placeholder-label {
  font-family: var(--font-sans);
  font-size: var(--text-ui);
  color: var(--text-muted);
  font-style: italic;
}
```

The label must name the exact expected filename. When the real file arrives, replace the placeholder with `<InlineImage>` — no other code changes needed.


---


## PART 7 — VISUAL MARKER → FILENAME MAP
## Every [ VISUAL ] tag in every content document, mapped to its expected deployed filename

### nonprofit_case_study.docx

| Marker | Expected filename | Status |
|---|---|---|
| Screenshot of live website | `asociacion-mockup.png` | ✓ READY |
| Two persona profiles (Lucie + Jakub) | `asociacion-personas.png` | ✓ READY |

### required_field_case_study_safe_v3.docx

| Marker | Expected filename | Deployed path | Status |
|---|---|---|---|
| Hero image (above meta table) | `rf-hero.png` | `public/assets/images/work/design-system/rf-hero.png` | ✓ READY |
| Three variants side by side | `rf-three-variants.png` | `public/assets/images/work/design-system/rf-three-variants.png` | ✓ READY |
| Recognition speed + familiarity chart | `rf-recognition-chart.png` | `public/assets/images/work/design-system/rf-recognition-chart.png` | ✓ READY |

### family_space_case_study_V3.docx

| Marker | Expected filename | Status |
|---|---|---|
| Hero image (above meta table) | `fs-hero.png` | ✓ READY |
| Problem cycle diagram | `fs-problem-cycle.png` | ✓ READY |
| Psychological values slide | `fs-psychological-values.png` | ✓ READY |
| Parenting styles diagram | `fs-parenting-styles.png` | ✓ READY |
| Three app screens | — removed, replaced by hero | — |
| Feature matrix | — removed, not used | — |

### record_list_case_study_safe_v3.docx

| Marker | Expected filename | Status |
|---|---|---|
| Hero image (above meta table) | `li-hero.png` | ✓ READY |
| Synthesis artefact / affinity map | `li-redwood-ui.png` | ✓ READY — replaces affinity map |
| Execution vs analytical mode diagram | `li-behaviour-modes.png` | ✓ READY |
| Operational vs analytical diagram | `li-operational-vs-analytical.png` | ✓ READY |


---


## PART 8 — STATUS SUMMARY

| Category | Ready | Pending | Missing | In code |
|---|---|---|---|---|
| Design reference images | 17 | 0 | 0 | — |
| Source documents | 7 | 0 | 0 | — |
| Brand / meta assets | 7 | 0 | 0 | 1 |
| About page photo | 1 | 0 | 0 | — |
| Asociación images | 2 | 0 | 0 | — |
| Required Field images | 3 | 0 | 0 | — |
| Family Space images | 1 | 0 | 0 | — |
| List Interface images | 4 | 0 | 0 | — |
| Locked card thumbnails | — | — | — | 3 |
| **TOTAL** | **42** | **0** | **0** | **4** |

### Everything is ready. No blockers.

### What can be built immediately (no asset blockers)

- All page shells, layouts, navigation, header, footer
- All 13 animations
- Homepage — complete
- Work index — complete (thumbnails in code)
- About page — complete (photo confirmed ready)
- Nonprofit case study — complete
- Notebook index and article page — complete
- Required Field, Family Space, List Interface — shell, sidebar, meta table, text content, pull quotes, NDA note; image positions render as labelled placeholders

### What is blocked until assets arrive

- Required Field: 2 artifact images → placeholders in place until delivered
- Family Space: images delivered and consolidated into fs-hero.png (May 2026)
- List Interface: 3 artifact images → placeholders in place until delivered
- Brand: favicon, mark SVGs, og-image → not blocking page builds, blocking launch checklist


---


## PART 9 — IMAGE EXPORT CHECKLIST FOR KATARINA

When exporting from Figma or receiving a file, check before placing:

- [ ] Filename matches exactly what is listed in Part 4 above
- [ ] Lowercase, hyphens only, no underscores, no spaces, no version numbers
- [ ] Placed in the correct subfolder (not dropped in `/public` root)
- [ ] Exported at 2× retina resolution
- [ ] WebP version exported alongside PNG/JPEG source
- [ ] Not a blank white rectangle — open it and visually confirm before handing over

When an image is ready, tell Claude Code:
**"Drop `[filename]` into `[exact folder path]` — it's ready."**
Claude Code will replace the placeholder with the `<InlineImage>` component call.


---


*Read alongside: CLAUDE.md · DESIGN_SYSTEM.md · IMAGE_TREATMENTS.md · ANIMATION_PROMPT.md*
*Last updated: May 2026*
