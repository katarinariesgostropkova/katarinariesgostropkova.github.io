import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
        label: z.string(),
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

const homepage = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/homepage' }),
  schema: z.object({
    slug:  z.string(),
    title: z.string().optional(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title:         z.string(),
    slug:          z.string(),
    heroHeadline:  z.string(),
    heroBody:      z.string(),
    heroPhoto:     z.object({ src: z.string(), alt: z.string() }),
    timelineEntries: z.array(z.object({
      dates:       z.string(),
      role:        z.string(),
      institution: z.string(),
      dotColor:    z.enum(['rose', 'teal']),
    })),
    storyColumns:  z.array(z.object({
      eyebrow:     z.string(),
      body:        z.string(),
    })),
    midCtaText:    z.string(),
    midCtaLabel:   z.string(),
    midCtaHref:    z.string(),
    recommendations: z.array(z.object({
      state:       z.enum(['live', 'placeholder']),
      name:        z.string().optional(),
      initials:    z.string().optional(),
      subtitle:    z.string().optional(),
      trait:       z.string().optional(),
      quote:       z.string().optional(),
    })),
    bottomCtaHeading: z.string(),
    bottomCtaBody:    z.string(),
    bottomCtaLabel:   z.string(),
    bottomCtaHref:    z.string(),
  }),
});

export const collections = { work, homepage, about };
