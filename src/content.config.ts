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

const homepage = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/homepage' }),
  schema: z.object({
    slug:  z.string(),
    title: z.string().optional(),
  }),
});

export const collections = { work, homepage };
