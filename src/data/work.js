/**
 * Homepage work teaser — two rows only.
 * Full index (all four cases) lives at /work (Phase 3).
 * private: true triggers the locked variant in WorkRow.astro.
 * Content verbatim from src/content/copy.md §02 Work Preview Section.
 */
export const homepageWork = [
  {
    slug: 'asociacion',
    title: 'Building a public presence from scratch',
    meta: 'Asociación Cultural Checa de Galicia · 2024–2025',
    tags: ['Product Design', 'Web Development'],
    excerpt:
      'A full design and build for a Czech cultural association in Galicia — information architecture, visual identity, responsive build. The only case study here you can explore without a password.',
    ctaLabel: 'Explore →',
    ctaHref: '/work/asociacion',
    private: false,
    thumbnail: {
      src: '/assets/images/work/non-profit/checa-hero.png',
      alt: 'Checa de Galicia homepage — hero section with coastal photography and Czech-Galician community tagline',
    },
  },
  {
    slug: 'nda-work',
    title: 'Featured Projects: Evidence-Based Design',
    meta: 'Avast · Oracle NetSuite',
    tags: ['UX Research', 'Enterprise ERP'],
    excerpt:
      'Three research projects from enterprise UX — covering design systems, parental controls and list interfaces. Protected by NDA.',
    ctaLabel: 'Request access',
    ctaHref: '#',
    private: true,
  },
];
