import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    description: z.string(),
    heroImage: z.object({ src: z.string(), alt: z.string() }).optional(),
    meta: z.object({
      company: z.string(),
      team: z.string(),
      role: z.string(),
      timeline: z.string(),
    }),
    sections: z.array(z.object({ id: z.string(), label: z.string() })),
    callout: z.object({ label: z.string(), body: z.string() }).optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    private: z.boolean().optional(),
    status: z.string().optional(),
  }),
});

export const collections = { work };
