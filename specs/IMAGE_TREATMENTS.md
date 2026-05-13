# IMAGE_TREATMENTS.md
# Katarina Riesgo Stropkova — Portfolio Website
# Image System Specification
# ─────────────────────────────────────────────────────────────
# Read this file before implementing any image component.
# All token values must match DESIGN_SYSTEM.md exactly.
# Two image contexts exist in this portfolio. No others.
# ─────────────────────────────────────────────────────────────


## Overview

There are exactly two image contexts in this portfolio:

1. **Work card thumbnail** — the visual panel inside each card on `/work` and the homepage work section
2. **Inline case study image** — full-width images between paragraphs on `/work/[slug]` pages

Every image in the portfolio uses one of these two treatments. No exceptions. No custom treatments per project.


## Colour Reference — Image Contexts Only

| Token | Value | Usage in images |
|-------|-------|----------------|
| `--color-linen` | `#EAE9E4` | Background for all image frames — never white |
| `--color-deep-tide` | `#1C2B3A` | Browser chrome bar, locked card backgrounds |
| `--color-teal` | `#2BA5A5` | Eyebrow labels, second browser dot, gradient lines |
| `--color-rose` | `#D4797A` | Third browser dot, accent elements |
| `--color-warm-canvas` | `#F7F6F2` | Badge background, image content backgrounds |

**Hard rules:**
- Never use `#FFFFFF` as a background anywhere in image frames
- Never introduce a colour outside this palette inside image frames or labels
- Rose `#D4797A` is never used as text — browser dot and accents only


---


## 1. Work Card Thumbnail

### What it is
The left panel of each work card. Approximately 300×190px on desktop. Shows a browser-framed screenshot of the project, cropped to hero section only.

### When to use
Every card on the work index (`/work`) and the homepage work section teaser.

### CSS

```css
/* Thumbnail container */
.thumb-slot {
  background: #EAE9E4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* Open/status badge */
.thumb-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: #1C2B3A;
  background: #F7F6F2;
  border: 0.5px solid rgba(28, 43, 58, 0.15);
  border-radius: 100px;
  padding: 3px 10px;
}

/* Browser chrome frame */
.browser-frame {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(28, 43, 58, 0.12);
}

/* Browser top bar */
.browser-bar {
  background: #1C2B3A;
  height: 22px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
}

/* Browser dots */
.browser-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(247, 246, 242, 0.20);
}

/* Dot 2: teal */
.browser-dot:nth-child(2) {
  background: #2BA5A5;
  opacity: 0.7;
}

/* Dot 3: rose */
.browser-dot:nth-child(3) {
  background: #D4797A;
  opacity: 0.7;
}

/* URL bar pill */
.browser-url {
  flex: 1;
  background: rgba(247, 246, 242, 0.08);
  border-radius: 100px;
  height: 12px;
  margin: 0 8px;
}

/* Screenshot — always cropped to hero only */
.browser-screenshot {
  width: 100%;
  height: 110px;
  object-fit: cover;
  object-position: top center;
  display: block;
}
```

### HTML Markup

```html
<div class="thumb-slot">
  <span class="thumb-badge">Open to explore</span>
  <div class="browser-frame">
    <div class="browser-bar">
      <div class="browser-dot"></div>
      <div class="browser-dot"></div>
      <div class="browser-dot"></div>
      <div class="browser-url"></div>
    </div>
    <img
      class="browser-screenshot"
      src="/assets/images/checa-hero.png"
      alt="Checa de Galicia homepage — hero section"
    />
  </div>
</div>
```

### Rules

- Badge text options: "Open to explore" (open case) — no badge on locked cards (they use the Deep Tide locked thumbnail instead)
- Screenshot must always be cropped with `object-fit: cover` and `object-position: top center`
- Never show more than the hero section of any screenshot at thumbnail size
- Never add coloured borders around the screenshot itself
- Never add shadows inside the thumbnail
- The client's own brand colours visible inside the screenshot are fine — do not recolour them
- Padding around browser frame: always 20px


### Locked card thumbnail — different treatment

Locked cards do not use the browser frame. They use a Deep Tide background with a lock chip:

```html
<div class="thumb-slot" style="background: #1C2B3A; padding: 0;">
  <!-- Abstract visual composition (bars, rows) here -->
  <div class="lock-chip">
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
      <rect x="0.5" y="4.5" width="9" height="7" rx="1.5"
        stroke="rgba(247,246,242,0.5)" stroke-width="0.8"/>
      <path d="M2.5 4.5V3C2.5 1.9 3.4 1 4.5 1H5.5C6.6 1 7.5 1.9 7.5 3V4.5"
        stroke="rgba(247,246,242,0.5)" stroke-width="0.8" stroke-linecap="round"/>
    </svg>
    <span>Locked</span>
  </div>
</div>
```

```css
.lock-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(247, 246, 242, 0.08);
  border: 0.5px solid rgba(247, 246, 242, 0.15);
  border-radius: 100px;
}

.lock-chip span {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: rgba(247, 246, 242, 0.55);
}
```

---


## 2. Inline Case Study Image

### What it is
Full-width image blocks between body paragraphs on case study pages. Research artifacts, flow diagrams, annotated screens, personas, charts. They break out of the text column to use the full content width.

### When to use
Any image inside a `/work/[slug]` case study page.

### CSS

```css
/* Outer wrapper */
.inline-image-block {
  width: 100%;
  margin: 8px 0 48px;
}

/* Linen frame */
.inline-image-frame {
  background: #EAE9E4;
  border-radius: 12px;
  border: 0.5px solid rgba(28, 43, 58, 0.08);
  padding: 24px;
  box-shadow: 0 2px 12px rgba(28, 43, 58, 0.06);
  overflow: hidden;
}

/* Teal eyebrow label with gradient line */
.inline-image-label {
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: #2BA5A5;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.inline-image-label::after {
  content: '';
  flex: 1;
  height: 0.5px;
  background: rgba(43, 165, 165, 0.40);
}

/* Image inside frame */
.inline-image-frame img {
  width: 100%;
  display: block;
  border-radius: 8px;
}

/* Caption — below the frame, not inside */
.inline-image-caption {
  margin-top: 12px;
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 300;
  color: #6B7A8D;
  line-height: 1.6;
}

.inline-image-caption strong {
  font-weight: 400;
  color: #1C2B3A;
}
```

### HTML Markup

```html
<div class="inline-image-block">
  <div class="inline-image-frame">
    <div class="inline-image-label">User research · Personas</div>
    <img
      src="/assets/images/personas.png"
      alt="Two user research personas: The Dual-Language Roots Family and The Atlantic Connector"
    />
  </div>
  <p class="inline-image-caption">
    <strong>Two primary personas</strong> identified through community
    research and expat forum analysis — representing the two core
    motivations for joining Checa de Galicia.
  </p>
</div>
```

### Label text — per image type

| Image type | Label format |
|------------|-------------|
| Personas | `User research · Personas` |
| Journey map | `User research · Journey map` |
| Usability study | `Usability study · [descriptor]` |
| Flow diagram | `Interaction design · [descriptor]` |
| Annotated screen | `Design · [descriptor]` |
| Chart / data | `Research findings · [descriptor]` |
| Photography | `[Project name] · [descriptor]` |

Always: Jost 500, 9px, uppercase, letterspacing 0.20em, `#2BA5A5`.

### Width rules

| Image type | Width |
|------------|-------|
| Research artifacts (personas, journey maps) | Full width always |
| Single UI screen or annotated wireframe — complex | Full width |
| Single UI screen — simple | `max-width: 640px`, centred |
| Photography | Full width |
| Data / charts | Full width |

### Rules

- Caption always below the frame, never inside it
- Bold the first phrase of the caption in `font-weight: 400`, `color: #1C2B3A`
- No shadows inside the image frame
- No coloured borders around images inside the frame
- Annotation colours inside diagrams: teal `#2BA5A5` only — never red, orange, or off-brand colours
- If image contains text in a system font (from Figma or doc export): acceptable for launch, flag for rebuild



---


## 2b. Three-Column Image Variant

### What it is
A variant of the inline case study image for displaying three screenshots side by side. Used in the Family Space case study to show three app screens together. The linen frame, label, and caption treatment are identical to the standard inline image. Only the internal layout changes.

### When to use
When three related screenshots need to be shown simultaneously for comparison — app screens, UI states, variant testing. Not for unrelated images.

### CSS addition

```css
/* Three-column grid inside the linen frame */
.inline-image-grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.inline-image-grid-3 img {
  width: 100%;
  display: block;
  border-radius: 8px;
  object-fit: cover;
}

/* Mobile: stack to single column */
@media (max-width: 600px) {
  .inline-image-grid-3 {
    grid-template-columns: 1fr;
  }
}
```

### HTML Markup

```html
<div class="inline-image-block">
  <div class="inline-image-frame">
    <div class="inline-image-label">Family Space · App screens</div>
    <div class="inline-image-grid-3">
      <img src="/assets/images/family-space-app-01.png"
        alt="Family Space app — [describe screen 1]" />
      <img src="/assets/images/family-space-app-02.png"
        alt="Family Space app — [describe screen 2]" />
      <img src="/assets/images/family-space-app-03.png"
        alt="Family Space app — [describe screen 3]" />
    </div>
  </div>
  <p class="inline-image-caption">
    <strong>Three app screens</strong> showing [describe what they illustrate].
  </p>
</div>
```

### Rules
- Always three images — if you have two or four, use a different layout
- Gap between images: 12px always
- All three images should be the same aspect ratio for visual consistency
- On mobile: stacks to single column — `grid-template-columns: 1fr`
- Label and caption follow identical spec to standard inline image

---


## 3. Image File Conventions

### File paths
```
/public/assets/images/
  checa-hero.png          ← thumbnail screenshot
  checa-personas.png      ← inline case study image
  checa-sitemap.png       ← inline case study image
  [project]-[descriptor].png
```

All filenames: lowercase, hyphens only, no underscores, no spaces.

### Export spec
- Format: WebP preferred, JPEG fallback
- Quality: 85%
- Resolution: 2× (retina) — at max-width 900px, inline images export at 1800px wide
- Thumbnail screenshots: export at 800px wide minimum

### Alt text rules
- Always descriptive — describe what the image shows, not what it is
- Thumbnail: `"[Project name] homepage — hero section"`
- Inline: describe the artifact content — `"Two user research personas: [name 1] and [name 2]"`
- Never: `"image"`, `"screenshot"`, `"photo"`


---


## 4. Astro Component — Suggested Structure

### WorkCardThumbnail.astro

```astro
---
interface Props {
  src: string
  alt: string
  badge?: string
  locked?: boolean
}

const { src, alt, badge, locked = false } = Astro.props
---

<div class="thumb-slot">
  {badge && <span class="thumb-badge">{badge}</span>}
  {locked ? (
    <div class="lock-thumb">
      <slot name="visual" />
      <div class="lock-chip">
        <svg><!-- lock icon --></svg>
        <span>Locked</span>
      </div>
    </div>
  ) : (
    <div class="browser-frame">
      <div class="browser-bar">
        <div class="browser-dot"></div>
        <div class="browser-dot"></div>
        <div class="browser-dot"></div>
        <div class="browser-url"></div>
      </div>
      <img class="browser-screenshot" src={src} alt={alt} />
    </div>
  )}
</div>
```

### InlineImage.astro

```astro
---
interface Props {
  src: string
  alt: string
  label: string
  caption?: string
  captionBold?: string
  maxWidth?: string
}

const { src, alt, label, caption, captionBold, maxWidth = '100%' } = Astro.props
---

<div class="inline-image-block">
  <div class="inline-image-frame" style={maxWidth !== '100%' ? `max-width: ${maxWidth}; margin: 0 auto;` : ''}>
    <div class="inline-image-label">{label}</div>
    <img src={src} alt={alt} />
  </div>
  {caption && (
    <p class="inline-image-caption">
      {captionBold && <strong>{captionBold}</strong>}
      {caption}
    </p>
  )}
</div>
```

Usage:
```astro
<InlineImage
  src="/assets/images/checa-personas.png"
  alt="Two user research personas"
  label="User research · Personas"
  captionBold="Two primary personas"
  caption=" identified through community research and expat forum analysis."
/>
```


---


## 5. Known Issues — Flag for Rebuild

| File | Issue | Priority |
|------|-------|----------|
| `Personas.png` | Working document export — system fonts, white background, emoji section headers, yellow badge | Second pass — frame treatment is sufficient for launch |
| `logo-full.svg` | File contains blank white rectangle — needs re-export from Figma with actual path data | Before launch |
| All images | Need 2× retina exports as WebP | Before launch |


---

*Read alongside: DESIGN_SYSTEM.md · DEVELOPER_HANDOFF.md · Claude Code animation prompt*
*Last updated: May 2026*
