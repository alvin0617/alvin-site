# alvinhung.ai v2：五行互動首頁 — 開發規格

> 給 Claude Code（Fable 5.2）的執行文件。
> 專案：`~/alvin-site`（Astro 5，部署在 GitHub Pages，repo `alvin0617/alvin-site`，網域 alvinhung.ai，DNS 在 Cloudflare）。
> 啟動方式：`cd ~/alvin-site && claude`，再說「照 WUXING_SITE_SPEC.md 執行」。
> 相關文件：`SITE_REVISION_BRIEF.md`（文案去 AI 感的規則，本規格的文案部分一律遵守）。

---

## 0. 執行原則

1. **分階段交付。** 依第 9 節的 Phase 順序做，每個 Phase 結束時 `npm run build`、本機預覽、截圖給 Alvin 確認，確認後才進下一階段。
2. **不編造內容。** 標記 `【需 Alvin 提供】` 的地方先停下來問，不用 AI 生成的佔位文案頂替。開發期間需要佔位就用明顯的 `TODO:` 字樣，不要寫成像真的一樣的句子。
3. **不 push，除非 Alvin 同意。** 每次 push 前列 diff 摘要。
4. **保留現有基礎設施**：RSS、Substack 連結、`public/CNAME`、`.github/workflows/deploy.yml`、`site: 'https://alvinhung.ai'` 都不要動。
5. 現有的 Swiss grotesk 首頁先搬到 `/classic` 保留，等 v2 確認上線後再決定要不要刪。

---

## 1. 概念

### 靈感
參考 https://natochi.cv/ ：整個首頁是一棵顆粒質感的手繪樹，樹枝就是導覽（work with me／writing／updates／me）；點一根樹枝，樹會往外長出新枝條，逛網站變成探索。右下角有音樂播放器，寫著「maybe you'll know me better if you listen to what i like」。

**不要照抄樹的造型。** 我們取的是它的精神：首頁是一個可以探索的「場景」，不是導覽列加清單。

### Alvin 的版本：五行
Alvin 的五個領域剛好對應五行，而命理、玄學本來就是他的個人興趣，這個比喻是他自己的，不是借來的。

| 五行 | 特質 | 領域 | slug |
|---|---|---|---|
| 水 | 直覺、看不見的東西 | 玄學（個人興趣）| `water` |
| 木 | 生長、從無到有 | Building／workflow（產品開發）| `wood` |
| 火 | 燃燒、享受 | Sports／pickleball（運動與品牌經營）| `fire` |
| 土 | 身體、扎根 | Wellness／訓練（身心優化）| `earth` |
| 金 | 趨勢、新機會 | AI／technology（知識與寫作）| `metal` |

**相生順序**：木 → 火 → 土 → 金 → 水 → 木。
Alvin 已確認對應（2026-11-17，火與金對調）。五句短語：木 Connecting the dots／火 Burn, and enjoy it／土 好的精神與狀態／金 Keep up with the trend, explore new opportunities／水 Be liquid and well prepared。

> 【需 Alvin 確認】五個領域與五行的對應。如果他想調整（例如金對應 AI），只需改資料檔，不影響程式。

---

## 2. 網站結構

```
/                       首頁：五行星盤（主要互動場景）
/[element]              單一領域頁，例：/wood、/fire
/writing                全部文章（可依 element 篩選）
/writing/[slug]         單篇文章
/updates                全部動態（短的近況、類似 now page 的時間軸）
/work-with-me           合作方式總頁（各領域的合作項目列在一起）
/me                     關於 Alvin
/classic                舊版首頁（暫時保留）
/rss.xml                保留
```

每個 `/[element]` 頁面都有三條支線：**writing／work with me／updates**，內容只顯示該領域的。

---

## 3. 首頁互動規格

### 3.1 初始畫面
- 深色背景，帶細緻顆粒雜訊（grain）。整體像夜空或古星盤，不要做成科技感 UI。
- 畫面中央是五個節點，依相生順序排成正五邊形（木在上方，順時針：木、火、土、金、水）。
- 節點之間用細線連成相生的循環，線上有方向感（例如緩慢流動的點或極淡的箭頭）。
- 整個星盤非常緩慢地旋轉，約 120 秒轉一圈。滑鼠移入任一節點時暫停。
- 每個節點旁標示中文字（木／火／土／金／水）＋英文領域名（例如 `building`）。
- 角落放網站名「Alvin」，以及到 `/me`、`/writing`、`/updates`、`/work-with-me` 的小型文字連結。這些是固定的輔助導覽，要低調，主角是星盤。

### 3.2 Hover
- 節點亮起，相連的兩條相生線（進來的、出去的）也跟著變亮。
- 節點旁浮出一句短語，每個領域一句。【需 Alvin 提供】五句，每句 15 字以內，用他自己的語氣。

### 3.3 點擊節點
- 星盤停止旋轉，被點的節點移到畫面中央（或放大），其他四個節點淡出、退到邊緣但仍可點。
- 從節點長出三條支線，分別指向 **writing**、**work with me**、**updates**（這就是 natochi「樹枝長出來」的對應做法）。
- 每條支線末端顯示該領域最新的 1～3 筆內容標題，以及「keep going →」連到 `/[element]` 完整頁。
- 左下角有返回鍵，回到完整星盤。
- 網址同步更新為 `/?el=wood`（可分享、可上一頁返回）。

### 3.4 點擊相生線
- 例如點「木 → 火」這條線，顯示同時標了兩個 element 的內容，代表跨領域的作品，例如「做了一個工具，然後寫了一篇文章」。
- 如果沒有跨領域內容，這條線就不可點，不要顯示空狀態。

### 3.5 個人元素（二擇一，【需 Alvin 決定】）
- **A. 今日一卡**：右下角有一張蓋著的卡，點開翻面顯示今日卡牌與一句話，並標示對應五行，同時點亮星盤上那個節點。卡牌資料來自 `src/data/cards.json`，【需 Alvin 提供】卡牌清單（名稱、一句話、對應五行）。以日期當亂數種子，同一天每個訪客看到同一張。
- **B. 音樂**：右下角小播放器，加一句 Alvin 自己寫的話。【需 Alvin 提供】曲目或播放清單連結。

建議 A，因為它和五行、和 Alvin 每天抽卡的習慣直接相關，是別人做不出來的。

---

## 4. 視覺方向

- **質感**：顆粒、手繪、不完美。用 SVG `feTurbulence` 濾鏡或一張低透明度的 noise 貼圖疊在整頁。節點不要是乾淨的幾何圓，要有手繪的邊緣，可用 SVG filter 做輕微扭曲。
- **配色**：底色深墨色（例如 `#1c1b1f`），線條和文字是米白。每個五行節點在 hover／active 時才顯出它的顏色，平常都是米白：
  - 木 青綠、火 朱紅、土 赭黃、金 銀白、水 深藍
  - 色彩要偏低飽和，像礦物顏料，不要螢光色。
- **字體**：英文沿用現有網站的 grotesk；中文的「木火土金水」可以用一套有書法或刻印感的字體作為唯一的裝飾性元素，【需 Alvin 確認】。
- **動態**：一律緩慢、柔和。不要彈跳、不要粒子爆炸、不要游標拖尾。尊重 `prefers-reduced-motion`：開啟時停止旋轉與流動動畫。
- **深淺色**：v2 以深色為主。現有的深淺色切換保留在內頁；首頁星盤固定深色即可。

---

## 5. 內容模型

### 5.1 Content collections（Astro 5，`src/content.config.ts`，使用 `glob` loader）

```ts
// 每篇 writing
writing: {
  title: string
  date: date
  elements: ('water'|'wood'|'fire'|'earth'|'metal')[]   // 至少 1 個，可多個
  summary: string            // 一兩句
  externalUrl?: string       // 若文章在 Substack／cryptowesearch.com，填原文連結
  lang: 'zh-TW' | 'en'
}

// 每則 update（短動態）
updates: {
  date: date
  elements: (...)[]
  body: string               // markdown，短
}

// 每個合作項目
work: {
  title: string
  elements: (...)[]
  description: string
  cta: { label: string, href: string }   // 例：email、表單、Calendly
}
```

### 5.2 五行資料檔 `src/data/elements.json`

```json
[
  { "slug": "wood",  "zh": "木", "en": "building", "domain": "Building / workflow", "tagline": "TODO", "color": "#..." },
  { "slug": "fire",  "zh": "火", "en": "ai",       "domain": "AI / technology",     "tagline": "TODO", "color": "#..." },
  { "slug": "earth", "zh": "土", "en": "wellness", "domain": "Wellness / training", "tagline": "TODO", "color": "#..." },
  { "slug": "metal", "zh": "金", "en": "sports",   "domain": "Sports / pickleball", "tagline": "TODO", "color": "#..." },
  { "slug": "water", "zh": "水", "en": "esoteric", "domain": "玄學",                 "tagline": "TODO", "color": "#..." }
]
```

相生順序寫在程式常數裡：`['wood','fire','earth','metal','water']`。

### 5.3 現有內容的處理
- 舊首頁那三篇範例文章（K-shaped divergence、13F、Seven layers），先確認是否為建站範例。如果是，刪除；不要搬進新結構。
- 【需 Alvin 提供】每個領域至少 1 篇 writing（可以是外部連結）、1 則 update、1 個 work with me 項目，作為上線的最低內容量。內容不足的領域，節點仍然顯示，但點開後只放一句「正在長」之類的短語，【需 Alvin 提供】這句話的寫法。

---

## 6. 技術實作

- **框架**：沿用 Astro 5。首頁星盤做成一個互動 island（純 SVG + 原生 JS 或一個輕量元件），不要為了這個引入大型動畫函式庫。如需動畫輔助，最多用一個小型函式庫，並說明理由。
- **靜態輸出**：所有頁面維持靜態產生，部署流程不變。
- **效能**：首頁 JS 壓縮後 < 50KB；顆粒材質用 CSS 或小張貼圖，不要用大圖。Lighthouse Performance ≥ 90。
- **網址狀態**：首頁展開狀態用 query string（`/?el=wood`），支援上一頁返回與直接分享。

---

## 7. 可讀性、SEO 與 AI 可讀性（重要）

natochi.cv 幾乎全是圖像，文字抓取工具讀不到任何內容。**我們不能犯同樣的錯。**

- 星盤的每個節點、每條支線都必須是真正的 `<a href>`，文字放在 DOM 裡，不能只畫在 canvas 上。
- 首頁在星盤下方（或用 `<noscript>` 加視覺隱藏但可被讀取的區塊）提供一份完整的純文字索引：五個領域、各自的簡介，以及到 writing／updates／work with me 的連結。
- 每頁都有正確的 `<title>`、`meta description`、`og:*`。
- 新增 `/llms.txt`：用純文字列出 Alvin 是誰、五個領域、主要文章連結。
- 鍵盤可操作：Tab 能依序移到五個節點，Enter 展開，Esc 返回。節點要有可見的 focus 樣式。
- 螢幕閱讀器：節點的 `aria-label` 寫成「木：Building／workflow，展開」這種完整說明。

---

## 8. 手機版

- 螢幕寬度 < 768px 時，不顯示旋轉星盤，改為：
  - 頂部一個靜態的小型五行圖示（裝飾用）
  - 下面五張直排卡片，依相生順序排列，每張卡片有中文字、領域名、一句短語
  - 點卡片進入 `/[element]` 頁
- 今日一卡（或音樂）在手機上放在五張卡片下方。

---

## 9. 交付階段

**Phase 1：靜態骨架**
- 建立第 2 節所有路由、第 5 節的 content collections 與 `elements.json`
- 舊首頁搬到 `/classic`
- 各頁先用最簡單的排版顯示真實資料（暫無資料就用 `TODO:`）
- 驗收：所有頁面可到達、build 通過

**Phase 2：首頁星盤（桌機）**
- 第 3.1～3.3 節：五邊形排列、緩慢旋轉、hover、點擊展開三條支線、返回
- 第 4 節視覺：顆粒、手繪邊緣、低飽和五行色
- 驗收：截圖與一段螢幕錄影給 Alvin 確認「感覺對不對」。**這一步最重要，感覺不對就在這裡改，不要往下做。**

**Phase 3：完整互動**
- 第 3.4 節相生線
- 第 3.5 節個人元素（依 Alvin 的選擇）
- 網址狀態、鍵盤操作、`prefers-reduced-motion`

**Phase 4：手機版、SEO、上線**
- 第 7、8 節
- `/llms.txt`
- Lighthouse 檢查
- Alvin 確認後 push

---

## 10. 驗收清單

- [ ] 五個節點依相生順序排列，相生線方向正確（木→火→土→金→水→木）
- [ ] 點任一節點都能長出 writing／work with me／updates 三條支線，並連到真實內容
- [ ] 所有導覽都是真正的 `<a href>`；關閉 JavaScript 時仍可透過文字索引瀏覽全站
- [ ] 鍵盤可完整操作；`prefers-reduced-motion` 生效
- [ ] 手機版顯示為卡片清單，可正常進入各領域
- [ ] 首頁 JS < 50KB，Lighthouse Performance ≥ 90
- [ ] 全站沒有 AI 生成的佔位文案；文案符合 `SITE_REVISION_BRIEF.md` 的規則（破折號 ≤ 1、無 AI 慣用句型）
- [ ] `/llms.txt` 存在且內容正確
- [ ] RSS、Substack 連結、CNAME、部署 workflow 仍然正常
- [ ] Alvin 已確認，才 push

---

## 11. 需要 Alvin 提供的清單（開工前先問）

1. 確認五行與領域的對應（第 1 節表格）
2. 五句節點短語（每句 15 字以內）
3. 每個領域至少 1 篇 writing、1 則 update、1 個 work with me 項目
4. 內容不足時的那句「正在長」短語
5. 個人元素：今日一卡（附卡牌清單）或音樂（附曲目）
6. 中文裝飾字體是否使用書法／刻印風格
7. work with me 的聯絡方式（email、表單或預約連結）

---

## 12. 不在這次範圍

- 多語系切換（目前中英混用即可）
- CMS 後台（內容直接寫 Markdown）
- `/skill.md` 與 JSON feed（給 AI agent 訂閱用），等內容充實後再做
- CW Trader Desk 相關頁面
