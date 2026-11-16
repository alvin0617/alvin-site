# alvinhung.ai

Personal site. Swiss homepage + a Markdown-driven writing section, built with
[Astro](https://astro.build). Deploys as a static site to Cloudflare Pages.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Write an article

Drop a Markdown file into `src/content/writing/`. That's it — it becomes a page
automatically. If you write in Obsidian, paste the note in and add this block at
the top:

```markdown
---
title: Your title here
date: 2026-07-20
description: One line for SEO and the RSS feed.
draft: false          # set true to hide while you work
---

Your content, in normal Markdown.
```

The three files already in that folder are samples — delete or overwrite them.

## Edit "who + where"

Everything personal lives in `src/config.ts`:

- `SUBSTACK_URL` — your official Cryptowesearch Substack (the Newsletter button + footer point here)
- `SOCIAL` — the footer "Elsewhere" links (replace the `#` placeholders)

Homepage copy (Myself / Watching / Now) is in `src/pages/index.astro`.

## Deploy to Cloudflare Pages

Push this folder to a GitHub repo, then in Cloudflare:
**Workers & Pages → Create → Pages → Connect to Git → pick the repo**, and set:

| Setting | Value |
| --- | --- |
| Framework preset | **Astro** |
| Build command | `npm run build` |
| Build output directory | `dist` |

Then **Custom domains → Set up a domain → `alvinhung.ai`**.

## What's where

```
src/
  config.ts              ← name, Substack URL, social links
  content/writing/*.md   ← your articles (add files here)
  pages/index.astro      ← homepage (hero, Myself, Watching, Now, Newsletter)
  pages/writing/         ← article list + individual article template
  pages/rss.xml.js       ← RSS feed at /rss.xml
  layouts/Base.astro     ← <head>, theme toggle, header/footer wrapper
  components/            ← Header + Footer
  styles/global.css      ← all the Swiss styling
```
