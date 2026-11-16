import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every .md file in src/content/writing/ becomes an article.
// Drop your Obsidian notes here (with the frontmatter below) and they
// turn into pages automatically.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
