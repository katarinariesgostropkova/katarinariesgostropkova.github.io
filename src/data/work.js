/**
 * Full work index — four individual case entries.
 * Used by /work (all four rows) and src/pages/index.astro (work[0] only).
 * The homepage composite locked row is inlined in index.astro, not here.
 * private: true triggers the locked variant in WorkRow.astro.
 * categories: [] drives Phase 4 filter behaviour (animation ⑨).
 * Content verbatim from src/content/copy.md §03, tags from designer
 * resolutions locked for Phase 3A.
 */
export const work = [
  {
    id: 'non-profit',
    title: 'Building a public presence from scratch',
    meta: 'Asociación Cultural Checa de Galicia · 2024–2025',
    tags: ['Product Design', 'Brand Identity', 'Design System', 'Research'],
    categories: ['product', 'research', 'design-systems'],
    excerpt:
      'A full design and build for a Czech cultural association in Galicia — information architecture, visual identity, responsive build. The only case study here you can explore without a password.',
    ctaLabel: 'Explore →',
    ctaHref: '/work/non-profit',
    private: false,
    thumbnail: {
      mode: 'image',
      src: '/assets/images/work/non-profit/checa-hero.png',
      alt: 'Checa de Galicia homepage — hero section with coastal photography and Czech-Galician community tagline',
    },
  },
  {
    id: 'family-space',
    title: 'Family Space · Parental Controls',
    meta: 'Verizon · 4-month study · 2020',
    tags: ['Product Discovery', 'UX Research'],
    categories: ['product', 'research'],
    excerpt:
      'Bridging the Gap: Aligning parental oversight with child autonomy in digital safety.',
    ctaLabel: 'Request access →',
    ctaHref: '#',
    private: true,
    thumbnail: { mode: 'locked' },
  },
  {
    id: 'list-interface',
    title: 'List Interface · Designing for Clarity at Scale',
    meta: 'Enterprise ERP · NetSuite · Multi-month discovery',
    tags: ['Feature Discovery', 'UX Research'],
    categories: ['research', 'design-systems'],
    excerpt:
      'Starting from a signal about cognitive overload, this work reframed the question — from what to build, to what the interface is actually for.',
    ctaLabel: 'Request access →',
    ctaHref: '#',
    private: true,
    thumbnail: { mode: 'locked' },
  },
  {
    id: 'design-system',
    title: 'The Required Field Indicator',
    meta: 'Enterprise ERP · NetSuite · 2023',
    tags: ['Design System', 'UX Research'],
    categories: ['research', 'design-systems'],
    excerpt:
      'A usability study that challenged an inherited component — and revealed how the path from evidence to organisational action is its own design problem.',
    ctaLabel: 'Request access →',
    ctaHref: '#',
    private: true,
    thumbnail: { mode: 'locked' },
  },
];
