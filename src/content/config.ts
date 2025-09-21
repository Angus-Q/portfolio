import { defineCollection, z } from 'astro:content';

const imageSchema = z.object({
  src: z.string(),
  alt: z.string()
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    publishDate: z.coerce.date().optional(), // Keep for backward compatibility
    category: z.string(),
    subcategory: z.string().optional(),
    image: imageSchema.optional(),
    tags: z.array(z.string()).optional()
  })
});

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    image: imageSchema.optional(),
    link: z.string().url().optional()
  })
});

export const collections = { articles, portfolio };
