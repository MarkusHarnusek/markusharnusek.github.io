import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    problem: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    year: z.number(),
    highlight: z.string().optional(),
    featured: z.boolean().default(false),
    links: z
      .object({
        repo: z.string().optional(),
        demo: z.string().optional(),
        writeup: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { projects };
