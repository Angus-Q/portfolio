import { defineCollection, z } from 'astro:content';

const portfolioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    image: z.object({
        src: z.string(),
        alt: z.string(),
    }).optional(),
  }),
});

const newsletterCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
  }),
});

export const collections = {
  'portfolio': portfolioCollection,
  'newsletter': newsletterCollection,
};