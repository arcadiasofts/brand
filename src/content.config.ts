import { defineCollection, z } from "astro:content";

const brand = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdate: z.coerce.date(),
    color: z.string(),
    scheme: z.string(),
  }),
});

export const collections = { brand };
