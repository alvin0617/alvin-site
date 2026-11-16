---
title: The K-shaped divergence nobody priced in
date: 2026-07-18
description: Why the memory drawdown and the software rotation are the same story told twice.
---

This is a sample post. Delete it, or replace the text with your own. Everything
below is ordinary **Markdown**, so if you already write in Obsidian you can paste
your notes straight in.

## How the frontmatter works

The block at the very top (between the `---` lines) is what the site reads:

- `title` — shows up in the list and as the page heading
- `date` — controls the ordering (newest first)
- `description` — used for SEO and the RSS feed
- `draft: true` — add this line to hide a post while you work on it

## Writing normally

You get headings, **bold**, *italic*, [links](https://cryptowesearch.substack.com),
and lists for free:

1. Capital flow first
2. Narrative second
3. Price last

> A quote looks like this — good for pulling out a key line.

Inline `code` and blocks both work:

```python
signal = kol_calls.merge(prices, on="date")
signal["hit"] = signal["price_now"] > signal["price_at_call"]
print(signal["hit"].mean())
```

That's the whole system. Add a new `.md` file to `src/content/writing/` and it
becomes a new article automatically.
