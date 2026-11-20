# Tealife

**Photography, moments, and writing — a personal website by PR1TEA.**

[繁體中文](#繁體中文) · [English](#english) · [GitHub](https://github.com/PR1TEA) · [Email](mailto:PR1TEA@icloud.com)

![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.33-F69220?logo=pnpm&logoColor=white)
![GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-2C4F7C)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)


---

## 繁體中文

### 關於

**Tealife** 是 PR1TEA 用來放置攝影、生活動態與文章的個人網站。

它使用 Astro 建置，內容主要以 Markdown 維護，並在建置時輸出靜態頁面。沒有資料庫、會員系統或伺服器端應用程式；設計上盡量讓內容本身保持簡單、可整理，也容易長期保存。

首頁保留了一句俄語：*Даже в тяжести самых крутых перемен...*

### 網站內容

| 區域 | 說明 |
| --- | --- |
| **Photography** | 從 `images/photography/` 自動載入照片，以不規則磁磚網格展示。 |
| **Moments** | 以時間軸呈現簡短的 Markdown 記錄。 |
| **Articles** | 文章、系列與分類；支援目錄、圖片、數學公式及程式碼高亮。 |
| **Friends** | 由設定檔管理的友站連結。 |
| **RSS** | 建置時產生 `/rss.xml`，供訂閱更新。 |

首頁另外提供個人名片、當月日曆、最新五篇文章，以及 RSS、GitHub、Email 入口。網站以淺灰色、壁紙與半透明面板為主要視覺元素，桌面和行動裝置各有對應壁紙。

### 技術

- **Astro 7.4.5**：靜態站點生成與 content collections。
- **TypeScript 5.9.3**、**pnpm 10.33.0**、**Node.js 24.11.1**。
- **Markdown / GFM**：文章和動態內容；**KaTeX** 處理數學，**Shiki** 處理程式碼高亮。
- **原生 CSS / JavaScript**：Grid、Flexbox、CSS 變數、`backdrop-filter`、日曆與複製按鈕；不使用前端 UI 框架。
- **Cloudflare Pages**：由 GitHub 觸發建置，部署 `dist/` 靜態檔案。

字體為 Inter Variable、Noto Sans SC Variable 與 JetBrains Mono Variable。網站目前只有淺色主題，並支援基本的鍵盤操作和 `prefers-reduced-motion`。

### 本機開發

需求：Node.js `>=22.23.4`（專案以 `.npmrc` 指定 `24.11.1`）及 pnpm `10.33.0`。

```bash
pnpm install
pnpm dev       # 啟動開發伺服器
pnpm build     # 建置至 dist/
pnpm preview   # 預覽建置結果
pnpm check     # Astro / TypeScript 檢查
pnpm format    # Prettier 格式化
```

### 專案結構

```text
Tealife/
├── images/
│   ├── decorative/         # 頭像、壁紙與 favicon
│   └── photography/        # 相冊照片
├── src/
│   ├── components/         # 頁首、頁腳、名片、日曆、文章列表
│   ├── config/             # 網站、個人資料與友鏈設定
│   ├── content/
│   │   ├── articles/       # 文章 Markdown 與圖片
│   │   └── moments/        # 動態 Markdown
│   ├── layouts/            # 頁面與文章版型
│   ├── pages/              # 靜態路由與 RSS endpoint
│   ├── styles/             # 全站及文章樣式
│   ├── utils/
│   └── content.config.ts   # Content collection schemas
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── .npmrc
├── LICENSE
└── README.md
```

`src/content/photography/` 僅為保留資料夾；相冊實際讀取 `images/photography/`。`dist/`、`node_modules/`、`.astro/` 和 `.cache/` 為產生檔案，不應納入版控。

### 新增內容

**文章**：在 `src/content/articles/` 新增 `.md` 檔案。檔名是路由 slug，例如 `mint-tea.md` 對應 `/articles/mint-tea/`。文章標題由 frontmatter 的 `title` 顯示，正文從 `##` 開始。

```yaml
---
title: "文章標題"
description: "簡短摘要"
pubDate: 2026-11-20
category: "Writing"
tags: ["Notes"]
---
```

必要欄位為 `title`、`description`、`pubDate`、`category`；可選欄位為 `updatedDate`、`series`、`seriesOrder`、`tags`、`cover`、`coverAlt`。支援 Markdown / GFM、`$...$` 與 `$$...$$` 數學公式、Shiki 程式碼區塊；`##` 和 `###` 會自動產生文章目錄。文章圖片可放在 `src/content/articles/images/`，以相對路徑引用。封面則透過 frontmatter 的 `cover` 設定。

**動態**：在 `src/content/moments/` 新增 `.md`，frontmatter 只需要 `pubDate`，其餘為 Markdown 正文。

**攝影**：將 AVIF、JPG、JPEG、PNG 或 WebP 放入 `images/photography/`。圖片依檔名自然排序（如 `P1`、`P2`、`P10`），經 Astro `<Image>` 處理並輸出 640px 寬度版本。

**友鏈**：在 `src/config/friendsconfig.ts` 編輯 `friendsConfig`；每筆資料包含 `title`、`imgurl`、`desc`、`siteurl`，可選 `tags`、`weight`、`enabled`。`weight` 越大越靠前，`enabled: false` 會隱藏該項；`tags` 目前不顯示於頁面。

### 設定與部署

| 設定檔 | 用途 |
| --- | --- |
| `src/config/site.ts` | 網站名稱、正式網址、描述、語言、起始日期與導覽項目。 |
| `src/config/profile.ts` | 首頁名片的名稱、頭像、簡介與連結。 |
| `src/config/friendsconfig.ts` | 友鏈內容及排序。 |
| `src/content.config.ts` | `articles`、`moments` 的內容 schema。 |

Cloudflare Pages 使用 **Astro** preset，建置指令 `pnpm build`，輸出目錄 `dist`，根目錄為專案根目錄；無需 Cloudflare adapter 或伺服器 runtime。Node 版本為 `24.11.1`，pnpm 版本為 `10.33.0`。

部署後請將 `src/config/site.ts` 的 `SITE.url` 設為實際網址（建議使用自訂網域作為 canonical），並填寫 `SITE.description`。`SITE.url` 若留空，RSS 文章連結可能是相對路徑。`.npmrc` 另外設定了 Node 下載鏡像；若建置時下載 Node 發生問題，可檢查鏡像設定與 Pages 的 `NODE_VERSION`。

### 授權與聯絡

**程式碼**以 [GNU GPL v3.0](LICENSE)（GPL-3.0-only）授權；**文章、動態與原創攝影作品**不因此自動採用 GPL，未經同意請勿轉載或重用。第三方素材與依賴仍遵循各自授權。著作權標示：`Tealife / Copyright (C) 2026 PR1TEA`。

歡迎透過 GitHub Issues／Pull Requests 回報程式問題或提出改進建議。

[GitHub](https://github.com/PR1TEA) · [Email](mailto:PR1TEA@icloud.com) · RSS：`/rss.xml`

---

## English

### About

**Tealife** is PR1TEA's personal website for photography, short updates, and writing.

Built with Astro, it keeps most content in Markdown and generates static pages at build time. There is no database, account system, or server-side application. The site is intentionally small and content-focused, with an emphasis on keeping personal work organized and maintainable.

A line in Russian appears on the homepage: *Даже в тяжести самых крутых перемен...*

### What's here

| Section | Description |
| --- | --- |
| **Photography** | Photos loaded automatically from `images/photography/` and arranged in a mixed-size tile grid. |
| **Moments** | Short Markdown entries in a timeline. |
| **Articles** | Writing with categories, series, contents, images, math, and syntax highlighting. |
| **Friends** | Config-driven links to other sites. |
| **RSS** | A static feed generated at `/rss.xml`. |

The homepage also includes a profile card, a calendar, five recent articles, and RSS/GitHub/Email links. The design uses light-gray surfaces, wallpapers, and translucent panels, with different wallpapers for desktop and mobile.

### Stack

- **Astro 7.4.5** for static generation and content collections.
- **TypeScript 5.9.3**, **pnpm 10.33.0**, and **Node.js 24.11.1**.
- **Markdown / GFM**, **KaTeX** for math, and **Shiki** for code highlighting.
- **Vanilla CSS / JavaScript** for layout, a calendar, and copy-to-clipboard controls; no frontend UI framework.
- **Cloudflare Pages** for GitHub-triggered static deployment.

Fonts are Inter Variable, Noto Sans SC Variable, and JetBrains Mono Variable. The site currently has a light theme only, with basic keyboard accessibility and `prefers-reduced-motion` support.

### Getting started

Requires Node.js `>=22.23.4` (the project pins `24.11.1` in `.npmrc`) and pnpm `10.33.0`.

```bash
pnpm install
pnpm dev       # start the development server
pnpm build     # generate dist/
pnpm preview   # preview the production build
pnpm check     # Astro / TypeScript checks
pnpm format    # Prettier
```

### Project layout

```text
Tealife/
├── images/
│   ├── decorative/         # avatar, wallpapers, favicon
│   └── photography/        # gallery photos
├── src/
│   ├── components/         # headers, footer, profile, calendar, article list
│   ├── config/             # site, profile, friends
│   ├── content/
│   │   ├── articles/       # articles and embedded images
│   │   └── moments/        # short entries
│   ├── layouts/            # page and article layouts
│   ├── pages/              # routes and RSS endpoint
│   ├── styles/             # global and prose styles
│   ├── utils/
│   └── content.config.ts   # collection schemas
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── .npmrc
├── LICENSE
└── README.md
```

`src/content/photography/` is a reserved directory; the gallery actually reads `images/photography/`. Generated directories (`dist/`, `node_modules/`, `.astro/`, `.cache/`) are not committed.

### Adding content

**Articles:** Add a `.md` file to `src/content/articles/`. Its filename becomes the URL slug: `mint-tea.md` → `/articles/mint-tea/`. The page heading comes from the frontmatter `title`; begin the body with `##`.

```yaml
---
title: "Article title"
description: "Short summary"
pubDate: 2026-11-20
category: "Writing"
tags: ["Notes"]
---
```

Required fields: `title`, `description`, `pubDate`, and `category`. Optional fields: `updatedDate`, `series`, `seriesOrder`, `tags`, `cover`, and `coverAlt`. Markdown/GFM is supported alongside inline `$...$` and block `$$...$$` math, Shiki code blocks, and a generated table of contents from `##`/`###` headings. Put article images in `src/content/articles/images/` and reference them relatively. Set a cover via frontmatter `cover`.

**Moments:** Add a `.md` file to `src/content/moments/`; only `pubDate` is required in the frontmatter.

**Photography:** Add AVIF, JPG, JPEG, PNG, or WebP images to `images/photography/`. Filenames are naturally sorted (`P1`, `P2`, `P10`), and Astro `<Image>` generates 640px-wide output.

**Friends:** Edit `friendsConfig` in `src/config/friendsconfig.ts`. Each item has `title`, `imgurl`, `desc`, and `siteurl`, with optional `tags`, `weight`, and `enabled`. Higher weights appear first, `enabled: false` hides an item, and tags are currently not rendered.

### Configuration and deployment

| File | Purpose |
| --- | --- |
| `src/config/site.ts` | Site name, canonical URL, description, language, start date, and navigation. |
| `src/config/profile.ts` | Homepage profile name, avatar, bio, and links. |
| `src/config/friendsconfig.ts` | Friend links and ordering. |
| `src/content.config.ts` | Schemas for `articles` and `moments`. |

For Cloudflare Pages, choose the **Astro** preset with `pnpm build`, output directory `dist`, and the repository root as the build root. No Cloudflare adapter or server runtime is needed. Use Node `24.11.1` and pnpm `10.33.0`.

After deployment, set `SITE.url` in `src/config/site.ts` to your production URL (prefer a custom domain as canonical) and fill in `SITE.description`. Leaving `SITE.url` empty can produce relative RSS item links. `.npmrc` includes a Node download mirror; if installation stalls during deployment, check that setting and the Pages `NODE_VERSION` variable.

### License and contact

**Code** is licensed under the [GNU GPL v3.0](LICENSE) (GPL-3.0-only). **Articles, moments, and original photographs** are not automatically covered by the code license; please obtain permission before republishing or reusing them. Third-party assets and dependencies retain their respective licenses. Copyright notice: `Tealife / Copyright (C) 2026 PR1TEA`.

Code-related bug reports and improvements are welcome through GitHub Issues and Pull Requests.

[GitHub](https://github.com/PR1TEA) · [Email](mailto:PR1TEA@icloud.com) · RSS: `/rss.xml`
