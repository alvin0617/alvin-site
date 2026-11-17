import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 五行 slug。每篇內容至少標一個，可以標多個（跨領域）。
const element = z.enum(['wood', 'fire', 'earth', 'metal', 'water']);

// src/content/writing/*.md — 文章。放在 Substack 等外站的文章填 externalUrl。
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    elements: z.array(element).min(1),
    summary: z.string().optional(),
    externalUrl: z.string().url().optional(),
    lang: z.enum(['zh-TW', 'en']).default('zh-TW'),
    draft: z.boolean().default(false),
  }),
});

// src/content/updates/*.md — 短近況。內文就是 Markdown 本體。
const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    date: z.coerce.date(),
    elements: z.array(element).min(1),
  }),
});

// src/content/work/*.md — 合作項目。
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    elements: z.array(element).min(1),
    description: z.string(),
    cta: z.object({ label: z.string(), href: z.string() }),
    order: z.number().default(0),
  }),
});

export const collections = { writing, updates, work };
