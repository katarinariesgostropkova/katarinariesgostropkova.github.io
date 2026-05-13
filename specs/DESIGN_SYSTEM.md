# DESIGN_SYSTEM.md
# Katarina Riesgo Stropkova · Portfolio Website
# Version 1.1 · 2025
# ─────────────────────────────────────────────────────────────
# INSTRUCTIONS FOR CLAUDE CODE
# Read this file before writing any code.
# All design decisions are made here. Do not introduce colours,
# fonts, weights, spacing values, or motion values not defined
# in this file. If a value you need is missing, flag it before
# creating a new one. This file is the single source of truth.
# ─────────────────────────────────────────────────────────────


## 1. VISUAL DNA

- **Owner:** Katarina Riesgo Stropkova — Research-Led Product Designer
- **Tone:** Calm, precise, intellectually warm. Senior researcher's portfolio.
- **Colour roles:** Teal = information. Deep Tide = structure. Rose = action (buttons, CTAs). Never swap.
- **Motion:** Ease-out for all transitions. No bounce, no spring.
- **Avoid:** Opacity-based body text colours. Jost 300 below 16px. Cormorant below 20px.


## 2. COLOUR TOKENS

```css
:root {
  --color-deep-tide:    #1C2B3A;
  --color-warm-canvas:  #F7F6F2;
  --color-linen:        #EAE9E4;
  --color-teal:         #2BA5A5;
  --color-rose:         #D4797A;
  --color-slate:        #6B7A8D;   /* LIGHT SURFACES ONLY */
  --color-slate-mid:    #A8B5C2;   /* DARK SURFACES ONLY  */
  --color-deep-tide-08: rgba(28,43,58,0.08);
  --color-teal-08:      rgba(43,165,165,0.08);
  --color-teal-12:      rgba(43,165,165,0.12);
  --color-teal-40:      rgba(43,165,165,0.40);
  --color-rose-12:      rgba(212,121,122,0.12);
  --color-error:        #C0392B;
  --color-success:      #0F6E56;
}
```

### Light surface text — explicit hex only (verified on #F7F6F2)
RULE: Never use rgba opacity for body text. Use these tokens.

```css
:root {
  --text-primary:    #1C2B3A;  /* 10.4:1 AAA — headlines, nav, buttons        */
  --text-secondary:  #3D4F61;  /*  6.8:1 AA  — sub-headlines, strong body     */
  --text-body:       #4E6174;  /*  5.4:1 AA  — body paragraphs, intro text    */
  --text-muted:      #6B7A8D;  /*  4.6:1 AA  — meta, labels — Jost 400 12px+ */
  --text-subtle:     #8A97A6;  /*  3.5:1     — decorative only, 24px+ serif   */
}
```

On linen (#EAE9E4): use --text-body minimum for anything below 16px.

### Dark surface text — on #1C2B3A

```css
:root {
  --text-dark-100:  rgba(247,246,242,1.00);  /* 10.4:1 AAA */
  --text-dark-085:  rgba(247,246,242,0.85);  /*  8.8:1 AAA */
  --text-dark-072:  rgba(247,246,242,0.72);  /*  7.4:1 AAA */
  --text-dark-065:  rgba(247,246,242,0.65);  /*  6.7:1 AA  */
  --text-dark-050:  rgba(247,246,242,0.50);  /*  5.1:1 AA  */
  --text-dark-045:  rgba(247,246,242,0.45);  /*  4.6:1 AA — floor */
}
```

### Colour rules
- Slate (#6B7A8D) FORBIDDEN on Deep Tide
- Rose (#D4797A) FORBIDDEN as text — buttons and mark only
- Teal as text: min 14px dark, min 16px light


## 3. TYPOGRAPHY

Two families. Three weights. Five stops. No exceptions.

```css
:root {
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans:  'Jost', 'Helvetica Neue', sans-serif;
  --weight-light:   300;
  --weight-regular: 400;
  --weight-medium:  500;
}
```

### Weight rules — non-negotiable

| Weight | Permitted | Forbidden |
|--------|-----------|-----------|
| Jost 300 | 16px+ decorative only (status rotator, footer tagline) | Body, meta, labels, anything below 16px |
| Jost 400 | ALL text 15px and below. Sub-headlines. Body. Meta. UI | — |
| Jost 500 | Eyebrow labels only | Body text |
| Cormorant 300/400 | 20px minimum | Anything below 20px |

### Type scale — 5 stops only

```css
:root {
  --text-display:  52px;  /* Cormorant 300 — hero. 36px mobile      */
  --text-headline: 28px;  /* Cormorant 300 — sections, footer CTA   */
  --text-body-lg:  16px;  /* Jost 400      — sub-headline, body     */
  --text-body-sm:  14px;  /* Jost 400      — intro, excerpts        */
  --text-ui:       12px;  /* Jost 400      — meta, nav, labels      */

  --leading-tight:  1.08;
  --leading-snug:   1.20;
  --leading-normal: 1.65;
  --leading-loose:  1.75;

  --tracking-tight:   0.01em;
  --tracking-normal:  0.02em;
  --tracking-body:    0.04em;
  --tracking-wide:    0.08em;
  --tracking-wider:   0.14em;
  --tracking-widest:  0.20em;
}
```

Variants: eyebrow = 10px Jost 500 uppercase teal · card title = 20px Cormorant · impact unit = 12px Jost 400 teal

### Google Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
```


## 4. SPACING — 4px base

```css
:root {
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:20px; --space-6:24px; --space-8:32px; --space-10:40px;
  --space-12:48px; --space-16:64px; --space-20:80px; --space-24:96px; --space-32:128px;
}
```


## 5. BORDER RADIUS

```css
:root {
  --radius-none:0px; --radius-sm:4px; --radius-md:8px;
  --radius-lg:12px; --radius-xl:16px; --radius-full:100px;
}
```


## 6. SHADOWS — functional only

```css
:root {
  --shadow-header:  0 1px 0 rgba(28,43,58,0.08);
  --shadow-card:    0 2px 12px rgba(28,43,58,0.06);
  --shadow-overlay: 0 8px 32px rgba(28,43,58,0.24);
}
```


## 7. MOTION TOKENS

```css
:root {
  --duration-instant:100ms; --duration-fast:150ms; --duration-base:200ms;
  --duration-moderate:300ms; --duration-slow:400ms;
  --duration-mark:800ms; --duration-entry:1000ms;
  --ease-out:    cubic-bezier(0.22,1,0.36,1);
  --ease-in-out: cubic-bezier(0.45,0,0.55,1);
}
```

Only animate: opacity, transform, stroke-dashoffset.
Never animate: width, height, color, background-color.

prefers-reduced-motion MUST be first rule in animations.css:
```css
@media (prefers-reduced-motion: reduce) {
  *,*::before,*::after {
    animation-duration:0.01ms !important;
    animation-iteration-count:1 !important;
    transition-duration:0.01ms !important;
  }
}
```

### Claude Code animation queue

| # | Animation | Notes |
|---|-----------|-------|
| 1 | Mark entry sequence | teardrop→oval→dot→content, 1000ms, sessionStorage gated |
| 2 | Logo hover rotation | 360°, 800ms ease-in-out, once per page load |
| 3 | Mobile overlay | flood + nav cascade 40ms stagger + ghost mark |
| 4 | Header scroll compression | scrollY>80px, 200ms ease-out |
| 5 | Impact strip count-up | IntersectionObserver, 800ms, 7 and 3 count up |
| 6 | Case row rose accent | scaleY hover, 300ms ease-out |
| 7 | Status rotator | 3 items, 4s each, translateY fade, pause button, aria-live |
| 8 | Scroll reveals | translateY 12px→0, opacity 0→1, IntersectionObserver 0.15 |


## 8. LOGO MARK — Option B

SVG viewBox always 0 0 120 150. Always SVG.

Light surface:
```svg
<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
  <path d="M60 8C60 8 14 58 14 96C14 126 35 148 60 148C85 148 106 126 106 96C106 58 60 8 60 8Z" fill="#1C2B3A"/>
  <ellipse cx="60" cy="100" rx="18" ry="26" fill="none" stroke="#2BA5A5" stroke-width="9"/>
  <circle cx="60" cy="70" r="8" fill="#D4797A"/>
</svg>
```

Dark surface:
```svg
<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
  <path d="M60 8C60 8 14 58 14 96C14 126 35 148 60 148C85 148 106 126 106 96C106 58 60 8 60 8Z" fill="rgba(247,246,242,0.08)" stroke="rgba(247,246,242,0.45)" stroke-width="2"/>
  <ellipse cx="60" cy="100" rx="18" ry="26" fill="none" stroke="#2BA5A5" stroke-width="9"/>
  <circle cx="60" cy="70" r="8" fill="#D4797A"/>
</svg>
```

Sizes: 96px hero · 48px footer-z1 · 32px doc · 26px desktop nav · 20px mobile nav · 18px favicon


## 9. LAYOUT CONSTANTS

```css
:root {
  --container-max:900px; --container-wide:1200px; --container-narrow:640px;
  --padding-desktop:48px; --padding-tablet:32px; --padding-mobile:20px;
  --header-height-desktop:60px; --header-height-scrolled:52px; --header-height-mobile:56px;
  --header-bg:rgba(247,246,242,0.92); --header-bg-scrolled:rgba(247,246,242,1.00);
  --header-blur:8px; --footer-bg:#1C2B3A;
}
```

| Breakpoint | Range | Nav | Logo | CTA |
|------------|-------|-----|------|-----|
| Desktop | ≥1024px | Floating pill 4 items | Mark 26px + Katarina + surname | None |
| Tablet | 768–1023px | Pill shrinks | Mark 22px + Katarina | None |
| Mobile | ≤767px | Hamburger only | Mark 20px + Katarina + surname | None |
| Small mobile | ≤380px | Hamburger | Mark 18px + Katarina | None |


## 10. HOMEPAGE COMPONENT SPECS

### Hero
- Eyebrow: Jost 500 10px uppercase #2BA5A5
- Headline: Cormorant 300 52px #1C2B3A. "human eye." italic #2BA5A5
- Sub: Jost 400 16px #3D4F61
- Intro: Jost 400 14px #4E6174
- CTA: rose pill "See my work ↓" anchors #work. Background #D4797A, padding 12px 26px, min-height 44px
- Status rotator: teal dot 7px + "Open to opportunities" Jost 300 12px rgba(28,43,58,0.55) + pause button

### Impact Strip
- Background #EAE9E4. Decorative arc aria-hidden.
- Values: Cormorant 300 38px #1C2B3A. Units: Jost 400 12px #2BA5A5.
- MA: Cormorant 300 38px #D4797A
- Research→Roadmap: Deep Tide pill, Jost 400 11px #F7F6F2 + teal arrow
- Descriptions: Jost 400 11px #4E6174

### Work Section
- Heading: Cormorant 300 28px #1C2B3A. No links beside.
- Row 1 (non-profit open): linen thumb + mock screen. Tags teal+slate. Title Cormorant 300 20px #1C2B3A. Meta Jost 400 12px #6B7A8D. Excerpt Jost 400 14px #4E6174. CTA: rose pill "Explore →"
- Row 2 (locked): Deep Tide thumb + "Locked" chip. Tags slate. Title Cormorant 300 20px #6B7A8D. CTA: ghost pill "Request access"
- Left rose accent ::before scaleY on hover 300ms


## 11. ACCESSIBILITY — WCAG 2.1 AA

Permitted: --text-primary on canvas 10.4:1 · --text-secondary 6.8:1 · --text-body 5.4:1 · --text-muted Jost 400 12px+ 4.6:1 · teal on deep tide 14px+ 5.1:1

Forbidden: Slate on Deep Tide 2.6:1 · Rose as text 3.8:1 · Jost 300 below 16px · Canvas below 45% opacity on deep tide · Touch targets below 44×44px

Focus: 2px solid #2BA5A5, offset 3px, --radius-sm
Overlay: aria-expanded, role="dialog", focus trap, Escape closes


## 12. FILE STRUCTURE

```
/public/assets/
  mark-light.svg  mark-dark.svg  favicon-32.png  favicon-16.png
  apple-touch-icon.png  og-image.png (1200×630px)

/src/styles/
  tokens.css    ← ALL :root vars
  global.css    ← reset + focus-visible
  animations.css ← prefers-reduced-motion FIRST

/src/components/
  Header.astro  Footer.astro  NavOverlay.astro

/src/pages/
  index.astro  work.astro  about.astro  notebook.astro
```


## 13. NAVIGATION

| Label | Route |
|-------|-------|
| Home | / |
| Work | /work |
| About | /about |
| Notebook | /notebook |


## 14. TOKEN QUICK-REFERENCE

```css
--btn-rose-bg:#D4797A; --btn-rose-text:#F7F6F2;
--btn-dark-bg:#1C2B3A; --btn-dark-text:#F7F6F2;
--btn-ghost-border:rgba(107,122,141,0.35); --btn-ghost-text:#6B7A8D;
--btn-radius:100px; --btn-min-height:44px;
--btn-padding-sm:8px 18px; --btn-padding-md:10px 24px; --btn-padding-lg:12px 28px;

--card-bg:#ffffff; --card-border:rgba(28,43,58,0.10); --card-radius:12px;
--case-accent:#D4797A; --case-accent-w:3px;

--tag-teal-bg:rgba(43,165,165,0.12); --tag-teal-text:#2BA5A5;
--tag-rose-bg:rgba(212,121,122,0.12); --tag-rose-text:#D4797A;
--tag-slate-bg:rgba(107,122,141,0.10); --tag-slate-text:#6B7A8D;
--tag-padding:3px 10px; --tag-radius:100px;

--border-hairline:0.5px solid; --border-light:rgba(28,43,58,0.08);
--border-medium:rgba(28,43,58,0.15); --border-dark-soft:rgba(247,246,242,0.08);
--border-teal:rgba(43,165,165,0.40);
```

---
*v1.1 — Key changes from v1.0: Jost 300 restricted to 16px+ decorative contexts. All body text uses Jost 400. Opacity-based text colours replaced with explicit hex tokens --text-primary through --text-subtle. Type scale reduced from 9 stops to 5.*
*If a value is not here, ask before creating it.*
