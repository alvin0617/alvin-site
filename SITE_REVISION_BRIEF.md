# alvinhung.ai — 去 AI 感修改指引

> 給 Claude Code 的執行文件。專案位置：`~/alvin-site`（Astro 5，部署在 GitHub Pages，repo `alvin0617/alvin-site`）。
> 目標：讓首頁讀起來像 Alvin 本人寫的，而不是 AI 產生的範本。設計（Swiss grotesk、深淺色切換）不動，只改內容與文案結構。

---

## 0. 執行原則

1. **不要自行編造內容。** 任何標記為 `【需 Alvin 提供】` 的地方，先停下來問他，不要用 AI 生成的佔位文字填補。
2. **不要「把 AI 文字改得更像人」。** 要做的是把文字換成 Alvin 的真實資訊與語氣。
3. 每完成一個段落就 `npm run build` 確認能過；全部完成後列出 diff 摘要給 Alvin 確認，**確認後才 push**。
4. 視覺設計、版面、配色、字體、深淺色切換、RSS、Substack 連結都不要改。

---

## 1. 現況問題清單（依嚴重程度排序）

### P0 — 假內容
首頁 `02 ARTICLES` 列出三篇文章：
- The K-shaped divergence nobody priced in（JUL 2026）
- Reading a 13F like a supply chain（JUN 2026）
- Seven layers of the AI infrastructure stack（MAY 2026）

**檢查**：`src/content/` 裡這三篇是否只是建站時的範例 Markdown（內容空白或是佔位文字）。
- 如果是範例 → 刪除，改為真實文章（見任務 T1）。
- 如果有真實內容 → 保留，回報給 Alvin。

### P1 — 典型 AI 句型
以下句子要整句重寫或刪除：

| 位置 | 原文 | 問題 |
|---|---|---|
| 01 MYSELF | "I care less about the narrative and more about what capital flows and the supply chain are doing before the story catches up." | 「less X, more Y」對稱句型，加上「before the story catches up」，是 LLM 的慣用收尾 |
| 01 MYSELF | "My conviction is simple: research frameworks can be applied fluidly across any market, and a nimble multi-agent workflow is what carries the thinking through to finished work." | 「My conviction is simple:」開頭，詞彙抽象（fluidly, nimble, carries the thinking through） |
| Hero / meta | "crypto markets, AI infrastructure, and the capital flows underneath." | 三連列舉，結尾用抽象詞「underneath」 |
| 03 WATCHING | "How attention moves markets — tracking KOL signal, narrative velocity, and whether the calls actually correlate with price." | 破折號加三連列舉，「narrative velocity」是空泛術語 |
| 05 NEWSLETTER | "Weekly-ish. No paywall on the free tier." | 刻意營造的俏皮語氣，是 AI 模仿「人味」的常見手法 |

### P1 — 破折號過量
全頁的長破折號（—）超過 5 個。
**規則**：全站文案的 `—` 最多保留 1 個，其餘改成句號、逗號、冒號或括號。

### P2 — 結構過度對稱
- `03 WATCHING` 四個項目的句子長度、結構幾乎一樣（一句說明＋列舉）。改成長短不一：有的一句話，有的兩三句，有的只有一個關鍵字。
- `01`～`05` 的編號小標可以保留（這是設計風格），但段落內文不要每段都用同一種句型開頭。

### P2 — 「Now」過期
`04 NOW` 標示 `UPDATED JUL 2026`，內容停在 7 月。
→ 換成當月真實狀態（見任務 T3），日期改為實際更新月份。

---

## 2. 任務清單

### T1 — 文章列表換成真實內容
- 【需 Alvin 提供】3～5 篇已發表的文章：標題、日期、網址（Substack 或 cryptowesearch.com）。
- 做法擇一（先問 Alvin）：
  - (a) 首頁的文章列表直接連到外部網址（最快）
  - (b) 在 `src/content/` 建立對應的 Markdown，放摘要並附原文連結
- 範例文章刪除後，確認 `/writing`、RSS 沒有殘留連結。

### T2 — 重寫 01 MYSELF 與 Hero
- 【需 Alvin 提供】3～5 則他自己最滿意的 Threads／X／Substack 貼文，作為語氣參考。
- 寫作規則：
  - 短句為主，可以直接、可以有個性。
  - 用具體名詞取代抽象詞：寫他實際追蹤的東西（例如具體的公司、指標、他做過的工具），不要寫 "capital flows"、"frameworks"、"workflow"。
  - 不用「not X but Y」「less X, more Y」「My conviction is」「Here's the thing」這類句型。
  - 不用 "delve, nimble, fluidly, seamless, robust, landscape, underneath, navigate" 等 AI 高頻詞。
  - 可以保留中英混用，這是 Alvin 的真實風格。
- 重寫後的版本給 Alvin 確認，不要直接上線。

### T3 — 更新 04 NOW
- 【需 Alvin 提供】這個月實際在做的 2～3 件事。
- 格式：條列或兩三句短句，不要寫成段落散文。
- 日期改為實際更新月份（例如 `UPDATED NOV 2026`）。

### T4 — 重寫 03 WATCHING
- 保留四個分類與中文標籤（市場經濟／五行・命理／運動產業／KOL・訊號）。
- 每項說明改成長短不一，刪掉破折號與三連列舉。
- 「Sport & the body」可以補上 Alvin 現在真的在做的事（例如匹克球、運動經紀），【需 Alvin 確認】是否要公開。

### T5 — 清理全站文案
- 全站搜尋 `—`，依 P1 規則處理。
- 05 NEWSLETTER 的 "Weekly-ish. No paywall on the free tier." 改成平實說明，或直接刪掉。
- 檢查 `<meta name="description">`、`og:description`、`twitter:description`，和 Hero 改寫後的文字保持一致。

---

## 3. 驗收標準

- [ ] 首頁沒有任何佔位或範例內容，每個連結都通往真實頁面
- [ ] 全站 `—` ≤ 1 個
- [ ] 第 1 節表格列出的句子已全部移除或重寫
- [ ] 03 WATCHING 四項的說明長度明顯不同
- [ ] 04 NOW 的日期是當月
- [ ] `npm run build` 通過
- [ ] Alvin 已看過 diff 並同意，才 push 到 `main`

---

## 4. 之後再做（不在這次範圍）

- **`/skill.md`**：參考 haoyi.im 的做法，提供公開的 JSON feed 加上一份給 AI agent 讀的 skill 檔，讓別人的 agent 能訂閱 Alvin 的研究。等文章內容充實後再做。
- **`/llms.txt`**：讓 AI 搜尋引擎好引用網站內容（AEO）。
