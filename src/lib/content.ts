import { getCollection } from 'astro:content';
import elements from '../data/elements.json';

export const ELEMENTS = elements;
// 相生順序：木 → 火 → 土 → 金 → 水 → 木
export const SHENG = ['wood', 'fire', 'earth', 'metal', 'water'];
export const bySlug = (slug: string) => elements.find((e) => e.slug === slug)!;

const safe = async (name: any, filter?: any) => {
  try { return await getCollection(name, filter); } catch { return []; }
};

export async function loadAll() {
  const writing = (await safe('writing', ({ data }: any) => !data.draft))
    .sort((a: any, b: any) => b.data.date.valueOf() - a.data.date.valueOf());
  const updates = (await safe('updates'))
    .sort((a: any, b: any) => b.data.date.valueOf() - a.data.date.valueOf());
  const work = (await safe('work')).sort((a: any, b: any) => a.data.order - b.data.order);
  return { writing, updates, work };
}

export const has = (slug: string) => (item: any) => item.data.elements.includes(slug);
export const postHref = (p: any) => p.data.externalUrl ?? `/writing/${p.id}`;
export const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
export const fmtDay = (d: Date) => d.toISOString().slice(0, 10);
