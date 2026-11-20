# Tealife

**PR1TEA's personal site for photography, moments, and writing.**

[繁體中文](#繁體中文) · [English](#english) · [GitHub](https://github.com/PR1TEA) · [Email](mailto:PR1TEA@icloud.com) · RSS: `/rss.xml`

![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.33-F69220?logo=pnpm&logoColor=white)
![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-2C4F7C)
![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)

![Tealife desktop wallpaper](images/decorative/backgrounds/desktop_wallpaper.jpg)

---

## 繁體中文

### 簡介

Tealife 是 PR1TEA 的個人網站，收錄攝影、動態與文章。本站以 Astro 7 建置，輸出靜態網站，部署在 Cloudflare Pages。

它沒有後端、資料庫、留言或搜尋；內容以 Markdown 管理，大部分工作在 build 時完成。這個 README 說明專案結構、開發方式、內容格式、設計與部署流程。

### 目錄

- [功能](#功能)
- [技術棧](#技術棧)
- [專案結構](#專案結構)
- [快速開始](#快速開始)
- [設定](#設定)
- [內容](#內容)
- [路由](#路由)
- [設計](#設計)
- [部署](#部署)
- [授權與版權](#授權與版權)
- [聯絡](#聯絡)
- [致謝](#致謝)
- [貢獻](#貢獻)
- [專案狀態](#專案狀態)

### 功能

- **首頁**：滿版壁紙、`Даже в тяжести самых крутых перемен...` 標題、RSS／GitHub／Email 按鈕、個人名片、當月日曆、最新 5 篇文章與「更多」入口。
- **文章**：文章列表、文章內頁、目錄（TOC）、分類、系列、標籤、封面、KaTeX 數學、Shiki 程式碼高亮與圖片。
- **動態**：以時間軸呈現短篇 Markdown 內容。
- **攝影**：`images/photography/` 自動收集圖片，依檔名排序，使用 Astro `<Image>` 輸出，並以大小不一的磁磚排列。
- **友鏈**：由 `friendsconfig.ts` 管理的卡片；顯示頭像、名稱與簡介，整張卡片可點擊。
- **RSS**：build 時產生 `/rss.xml`，所有頁面的 `<head>` 也有 RSS alternate link。
- **按鈕**：RSS 按鈕複製目前網域的 feed 連結；Email 按鈕複製 `PR1TEA@icloud.com`；GitHub 按鈕前往 `https://github.com/PR1TEA`。
- **視覺**：淺灰主題、壁紙與毛玻璃；桌面與手機使用不同壁紙；沒有深色／淺色切換。
- **靜態**：沒有伺服器端執行環境，`pnpm build` 產生 `dist`。

### 技術棧

| 層級 | 技術 |
| --- | --- |
| 框架 | Astro 7.4.5，靜態輸出 |
| 語言 | TypeScript 5.9.3 |
| 套件管理 | pnpm 10.33.0 |
| Node | 24.11.1（`.npmrc` 固定；`engines` 要求 `>=22.23.4`） |
| 內容 | Astro content collections、Markdown、GFM |
| Markdown 管線 | `@astrojs/markdown-remark`、`remark-math`、`rehype-katex`、KaTeX |
| 程式碼高亮 | Shiki（`github-light`／`github-dark` 雙主題；目前使用淺色） |
| 字體 | Fontsource Variable：Inter、Noto Sans SC、JetBrains Mono |
| 樣式 | 原生 CSS、CSS 變數、Grid／Flexbox、`backdrop-filter` |
| 互動 | 原生 JavaScript：日曆、RSS／Email 複製 |
| RSS | 自訂 `src/pages/rss.xml.ts`，靜態 endpoint |
| 部署 | GitHub → Cloudflare Pages，輸出 `dist` |
| 授權 | 程式碼 GPL-3.0；文章、動態與攝影作品另有版權 |

### 專案結構

```text
Tealife/
├── images/
│   ├── decorative/
│   │   ├── avatars/pr1tea_avatar.jpg
│   │   ├── backgrounds/desktop_wallpaper.jpg
│   │   ├── backgrounds/mobile_wallpaper.jpg
│   │   └── icons/favicon.svg
│   └── photography/
│       ├── P1.avif … P15.avif
│       └── .gitkeep
├── src/
│   ├── components/
│   │   ├── ArticleList.astro
│   │   ├── Calendar.astro
│   │   ├── ProfileCard.astro
│   │   ├── SiteFooter.astro
│   │   └── SiteHeader.astro
│   ├── config/
│   │   ├── friendsconfig.ts
│   │   ├── profile.ts
│   │   └── site.ts
│   ├── content/
│   │   ├── articles/
│   │   │   ├── images/.gitkeep
│   │   │   └── *.md
│   │   ├── moments/*.md
│   │   └── photography/.gitkeep
│   ├── layouts/
│   │   ├── ArticleLayout.astro
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── articles/[...slug].astro
│   │   ├── articles/index.astro
│   │   ├── friends/index.astro
│   │   ├── moments/index.astro
│   │   ├── photography/index.astro
│   │   ├── index.astro
│   │   └── rss.xml.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── prose.css
│   ├── utils/date.ts
│   ├── content.config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── .npmrc
├── LICENSE
└── README.md
```

`src/content/photography/` 只是保留資料夾；實際相冊由 `images/photography/` 讀取。`dist/`、`node_modules/`、`.astro/` 與 `.cache/` 都是產生檔，不進版控。

### 快速開始

需求：

- Node `>=22.23.4`；本專案以 `.npmrc` 固定 `24.11.1`。
- pnpm `10.33.0`（`packageManager`）。

```bash
pnpm install
pnpm dev       # 開發伺服器
pnpm build     # 產生 dist/
pnpm preview   # 預覽 build 結果
pnpm check     # Astro／TypeScript 檢查
pnpm format    # Prettier 格式化
```

`pnpm build` 只產生靜態檔案；`dist/` 不會被 commit。`.npmrc` 另外設定了 Node 下載鏡像；若你的網路可直接連線 nodejs.org，可視情況移除該行。

### 設定

- **`src/config/site.ts`**：站名、正式網域、站點描述、語系、開始日期，以及 `SECTIONS` 導覽。`SECTIONS` 目前包含 Photography、Moments、Articles、Friends。
- **`src/config/profile.ts`**：首頁個人名片。可設定 `name`、`avatar`、`bio`、`links`；沒有填的欄位不會顯示。頭像由 `../../images/decorative/avatars/pr1tea_avatar.jpg` 匯入。
- **`src/config/friendsconfig.ts`**：友鏈資料，見下方「內容」。
- **`src/content.config.ts`**：`articles` 與 `moments` 的 content collection schema。
- **`SITE.url`**：目前是空字串。部署後請填入正式網域（`pages.dev` 或自訂網域）；這會影響 `/rss.xml` 內文章連結是否為絕對網址。
- **`SITE.description`**：目前是空字串；若設定，會成為預設 meta description。
- **`SITE.lang`**：`zh-Hant`。

### 內容

#### 文章

文章放在 `src/content/articles/`，副檔名 `.md`；檔名會成為文章 slug，例如 `mint-tea.md` 對應 `/articles/mint-tea/`。文章頁的 `<h1>` 由 frontmatter 的 `title` 產生，正文從 `##` 開始。

| 欄位 | 型別 | 必填 | 預設 | 說明 |
| --- | --- | --- | --- | --- |
| `title` | string | 是 | — | 文章標題 |
| `description` | string | 是 | — | 列表摘要與 meta description |
| `pubDate` | date | 是 | — | 發佈日期，`YYYY-MM-DD`；列表依此排序 |
| `updatedDate` | date | 否 | — | 更新日期；與 `pubDate` 不同時才顯示 |
| `category` | string | 是 | — | 單一分類 |
| `series` | string | 否 | — | 系列名稱 |
| `seriesOrder` | number | 否 | — | 系列內排序；搭配 `series` 使用 |
| `tags` | string[] | 否 | `[]` | 標籤 |
| `cover` | image | 否 | — | 封面圖，相對路徑 |
| `coverAlt` | string | 否 | `title` | 封面替代文字 |

- 正文使用 Markdown 與 GFM；支援清單、表格、引用、程式碼區塊與圖片。
- 行內數學用 `$...$`，區塊數學用 `$$...$$`；由 KaTeX 渲染。
- 程式碼區塊標註語言，由 Shiki 高亮。
- 文章目錄由 `##` 與 `###` 自動產生；不需要手動建立 TOC。
- 圖片放在 `src/content/articles/images/`，在 Markdown 用相對路徑引用，例如 `![說明](./images/photo.jpg)`。
- 首頁顯示最新 5 篇文章，並提供「更多」連到 `/articles/`。

#### 動態

動態放在 `src/content/moments/`，`.md` 檔。frontmatter 只需要 `pubDate`；正文以 Markdown 撰寫，於 `/moments/` 以時間軸呈現。

#### 友鏈

友鏈集中在 `src/config/friendsconfig.ts`：

```ts
export interface FriendLink {
  title: string;
  imgurl: string;
  desc: string;
  siteurl: string;
  tags?: string[];
  weight?: number;
  enabled?: boolean;
}

export const friendsConfig: FriendLink[] = [
  {
    title: '鼠子',
    imgurl: 'https://blog.miomoe.cn/favicon.ico',
    desc: '欢迎来到鼠子YuiNijika的朋友圈！',
    siteurl: 'https://blog.miomoe.cn/',
    tags: ['Blog'],
    weight: 10,
    enabled: true,
  },
];
```

- `title`：朋友名稱。
- `imgurl`：頭像 URL。
- `desc`：名稱下方的簡介。
- `siteurl`：點擊卡片後前往的網址。
- `tags`：目前只用於整理，頁面不顯示。
- `weight`：排序權重，數字越大越前面，預設 `0`。
- `enabled`：`false` 可隱藏，預設 `true`。

新增朋友只需要修改這個檔案；`/friends/` 會自動過濾與排序，不需要改頁面。

#### 攝影

`/photography/` 會用 `import.meta.glob` 自動收集 `images/photography/` 下的圖片，支援 AVIF、JPG、JPEG、PNG、WebP。檔名以數字自然排序（`P1`、`P2`……`P10`），並用 Astro `<Image>` 輸出寬度 640 的圖片。版面是大小不一的磁磚，部分索引會有 wide／large 的跨欄效果。

#### 圖片

- 裝飾圖片：`images/decorative/`，包含頭像、桌面／手機壁紙與 favicon。
- 文章圖片：`src/content/articles/images/`，用相對路徑引用。
- 攝影作品：`images/photography/`。
- 封面圖透過 frontmatter 的 `cover` 指定，由 Astro image 管線處理。

### 路由

| 路由 | 說明 |
| --- | --- |
| `/` | 首頁 |
| `/articles/` | 文章列表 |
| `/articles/<slug>/` | 文章內頁 |
| `/moments/` | 動態時間軸 |
| `/photography/` | 攝影相冊 |
| `/friends/` | 友鏈 |
| `/rss.xml` | RSS feed |

所有路由都是靜態輸出；文章內頁由 `getStaticPaths` 在 build 時產生。

### 設計

- **淺灰主題**：頁面背景 `#e7e7e7`、面板 `#f3f3f3`、文字 `#1b1b1b`、次要文字 `#5c5c5c`、邊框 `#cfcfcf`。顏色集中在 `src/styles/global.css` 的 CSS 變數。
- **壁紙與遮罩**：首頁與下方內容使用同一張壁紙；桌面使用 `desktop_wallpaper.jpg`，手機 portrait 使用 `mobile_wallpaper.jpg`。首頁有淺灰遮罩，保持文字可讀。
- **毛玻璃**：首頁名片、日曆、文章面板與頁腳使用半透明背景與 `backdrop-filter`；文字保持不透明，確保可讀性。
- **字體**：Inter Variable（拉丁）、Noto Sans SC Variable（中文）、JetBrains Mono Variable（程式碼），由 Fontsource 載入。
- **版面**：原生 CSS Grid／Flexbox；容器、間距、字級都是 CSS 變數；沒有 UI 框架。
- **互動**：日曆是原生 `Date` 計算的當月日曆；RSS／Email 按鈕是原生剪貼簿操作；沒有前端框架。
- **深色模式**：目前只有淺色主題，沒有切換按鈕。
- **自適應**：手機上導覽換行、首頁堆疊、hero 使用手機壁紙；支援 `prefers-reduced-motion`。
- **無障礙**：skip link、語意化標題、`aria-current`、可見 focus 樣式。

### 部署

本站是純靜態 Astro 專案，不需要 `@astrojs/cloudflare` adapter，也不需要伺服器端 runtime。

GitHub → Cloudflare Pages 設定：

| 設定 | 值 |
| --- | --- |
| Framework preset | Astro |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Root directory | 專案根目錄 |
| Node version | `24.11.1` |
| pnpm version | `10.33.0` |
| Adapter | 無 |

- `dist/` 不進版控；Cloudflare 會從 GitHub 安裝依賴並執行 build。
- `.npmrc` 以 pnpm 固定 Node 24.11.1；若 Cloudflare 的 build 卡在 Node 下載，可在 Pages 設定 `NODE_VERSION=24.11.1`，並視情況移除 `.npmrc` 的 `node-mirror` 行。
- 第一次部署後，把 `src/config/site.ts` 的 `SITE.url` 設為實際網域，例如 `https://<project>.pages.dev` 或自訂網域，再重新部署。
- 如果有自訂網域，建議以自訂網域作為 canonical；`pages.dev` 仍然可以打開同一個靜態網站。
- `/rss.xml` 是 build 時產生的靜態檔；`SITE.url` 為空時，feed 內文章連結會是相對路徑；補上正式網域後會變成絕對網址。
- RSS 按鈕複製的是目前所在網域的 `/rss.xml`；不需要在程式碼中硬編碼網域。

### 授權與版權

- **程式碼**：GNU General Public License v3.0（GPL-3.0-only）。完整條文見 [`LICENSE`](LICENSE)。專案版權與署名為 `Tealife / Copyright (C) 2026 PR1TEA`。
- **文章、動態與 PR1TEA 的原創攝影作品**：版權所有，並不因為程式碼採用 GPL 而自動變成可自由重用的素材。若要轉載或重用，請先聯絡 PR1TEA。
- **第三方素材與依賴**：壁紙、字體、套件與其他第三方資源仍屬各自權利人；Astro、KaTeX、Shiki、Fontsource 等依其原授權使用。
- GPLv3 的正式條文與 FSF 版權聲明保持原文，不因專案署名而修改。

### 聯絡

- GitHub：[https://github.com/PR1TEA](https://github.com/PR1TEA)
- Email：[PR1TEA@icloud.com](mailto:PR1TEA@icloud.com)
- RSS：部署網域下的 `/rss.xml`

首頁的 RSS、GitHub 與 Email 按鈕提供相同的入口；RSS 與 Email 按鈕會複製連結或地址。

### 致謝

- [Astro](https://astro.build/)
- [KaTeX](https://katex.org/)
- [Shiki](https://shiki.style/)
- [Fontsource](https://fontsource.org/)
- [pnpm](https://pnpm.io/)

### 貢獻

這是 PR1TEA 的個人網站。程式碼的錯誤回報與改進建議可以透過 GitHub Issues／Pull Requests 提出；文章、動態與攝影作品屬於個人內容，請勿在未經同意的情況下重用。

### 專案狀態

個人專案，持續維護中。目前是靜態、內容優先的網站：沒有後端、資料庫、留言、搜尋或會員系統。

---

## English

### About

Tealife is PR1TEA's personal site for photography, moments, and writing. It is built with Astro 7, rendered as a static site, and deployed on Cloudflare Pages.

There is no backend, database, comments system, or search. Content is managed in Markdown, and most work happens at build time. This README covers the project structure, development workflow, content formats, design, and deployment.

### Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Content](#content)
- [Routes](#routes)
- [Design](#design)
- [Deployment](#deployment)
- [License & Copyright](#license--copyright)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)
- [Contributing](#contributing)
- [Project Status](#project-status)

### Features

- **Home**: full-screen wallpaper, the `Даже в тяжести самых крутых перемен...` heading, RSS/GitHub/Email buttons, profile card, current-month calendar, the latest 5 articles, and a "more" link.
- **Articles**: article index, article pages, table of contents, category, series, tags, cover images, KaTeX math, Shiki code highlighting, and images.
- **Moments**: short Markdown entries displayed as a timeline.
- **Photography**: images under `images/photography/` are collected automatically, sorted by filename, rendered with Astro `<Image>`, and arranged as a mixed-size tile grid.
- **Friends**: config-driven cards with avatar, name, and description; the whole card is clickable.
- **RSS**: a static `/rss.xml` generated at build time, plus an RSS alternate link in every page `<head>`.
- **Buttons**: the RSS button copies the current domain's feed URL; the Email button copies `PR1TEA@icloud.com`; the GitHub button opens `https://github.com/PR1TEA`.
- **Visuals**: a light gray theme with wallpapers and frosted glass; desktop and mobile use different wallpapers; there is no dark/light toggle.
- **Static**: no server runtime; `pnpm build` produces `dist`.

### Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Astro 7.4.5, static output |
| Language | TypeScript 5.9.3 |
| Package manager | pnpm 10.33.0 |
| Node | 24.11.1 (pinned by `.npmrc`; `engines` requires `>=22.23.4`) |
| Content | Astro content collections, Markdown, GFM |
| Markdown pipeline | `@astrojs/markdown-remark`, `remark-math`, `rehype-katex`, KaTeX |
| Code highlighting | Shiki (`github-light` / `github-dark`; light in use) |
| Fonts | Fontsource Variable: Inter, Noto Sans SC, JetBrains Mono |
| Styling | Native CSS, CSS variables, Grid/Flexbox, `backdrop-filter` |
| Interactivity | Native JavaScript: calendar, RSS/Email copy |
| RSS | Custom `src/pages/rss.xml.ts` static endpoint |
| Deployment | GitHub → Cloudflare Pages, output `dist` |
| License | Code under GPL-3.0; articles, moments, and photographs have separate copyright |

### Project Structure

```text
Tealife/
├── images/
│   ├── decorative/
│   │   ├── avatars/pr1tea_avatar.jpg
│   │   ├── backgrounds/desktop_wallpaper.jpg
│   │   ├── backgrounds/mobile_wallpaper.jpg
│   │   └── icons/favicon.svg
│   └── photography/
│       ├── P1.avif … P15.avif
│       └── .gitkeep
├── src/
│   ├── components/
│   │   ├── ArticleList.astro
│   │   ├── Calendar.astro
│   │   ├── ProfileCard.astro
│   │   ├── SiteFooter.astro
│   │   └── SiteHeader.astro
│   ├── config/
│   │   ├── friendsconfig.ts
│   │   ├── profile.ts
│   │   └── site.ts
│   ├── content/
│   │   ├── articles/
│   │   │   ├── images/.gitkeep
│   │   │   └── *.md
│   │   ├── moments/*.md
│   │   └── photography/.gitkeep
│   ├── layouts/
│   │   ├── ArticleLayout.astro
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── articles/[...slug].astro
│   │   ├── articles/index.astro
│   │   ├── friends/index.astro
│   │   ├── moments/index.astro
│   │   ├── photography/index.astro
│   │   ├── index.astro
│   │   └── rss.xml.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── prose.css
│   ├── utils/date.ts
│   ├── content.config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── .npmrc
├── LICENSE
└── README.md
```

`src/content/photography/` is a reserved folder; the live gallery reads `images/photography/`. `dist/`, `node_modules/`, `.astro/`, and `.cache/` are generated and not tracked.

### Getting Started

Requirements:

- Node `>=22.23.4`; the repo pins `24.11.1` in `.npmrc`.
- pnpm `10.33.0` (`packageManager`).

```bash
pnpm install
pnpm dev       # development server
pnpm build     # outputs dist/
pnpm preview   # preview the build
pnpm check     # Astro/TypeScript checks
pnpm format    # Prettier
```

`pnpm build` only produces static files; `dist/` is not committed. `.npmrc` also configures a Node download mirror; remove that line if your network can reach nodejs.org directly.

### Configuration

- **`src/config/site.ts`**: site name, canonical URL, description, language, start date, and the `SECTIONS` navigation. `SECTIONS` currently contains Photography, Moments, Articles, and Friends.
- **`src/config/profile.ts`**: the home profile card. Set `name`, `avatar`, `bio`, and `links`; empty fields are not rendered. The avatar is imported from `../../images/decorative/avatars/pr1tea_avatar.jpg`.
- **`src/config/friendsconfig.ts`**: friend links; see Content below.
- **`src/content.config.ts`**: the `articles` and `moments` content collection schemas.
- **`SITE.url`**: currently empty. After deployment, set it to the production domain (`pages.dev` or a custom domain); this controls whether `/rss.xml` item links are absolute.
- **`SITE.description`**: currently empty; if set, it becomes the default meta description.
- **`SITE.lang`**: `zh-Hant`.

### Content

#### Articles

Articles live in `src/content/articles/` as `.md` files. The filename becomes the slug, so `mint-tea.md` maps to `/articles/mint-tea/`. The article page `<h1>` comes from the frontmatter `title`; start the body at `##`.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | Yes | — | Article title |
| `description` | string | Yes | — | List summary and meta description |
| `pubDate` | date | Yes | — | Publish date, `YYYY-MM-DD`; used for sorting |
| `updatedDate` | date | No | — | Shown only when different from `pubDate` |
| `category` | string | Yes | — | One category |
| `series` | string | No | — | Series name |
| `seriesOrder` | number | No | — | Order within a series |
| `tags` | string[] | No | `[]` | Tags |
| `cover` | image | No | — | Cover image, relative path |
| `coverAlt` | string | No | `title` | Cover alt text |

- The body uses Markdown/GFM: lists, tables, quotes, fenced code, and images.
- Inline math uses `$...$`; block math uses `$$...$$`; both render with KaTeX.
- Fenced code blocks use Shiki highlighting.
- The table of contents is generated from `##` and `###`; no manual TOC is needed.
- Put article images in `src/content/articles/images/` and reference them relatively, e.g. `![alt](./images/photo.jpg)`.
- The home page shows the latest 5 articles and a "more" link to `/articles/`.

#### Moments

Moments live in `src/content/moments/` as `.md` files. The frontmatter only needs `pubDate`; the body is Markdown and appears as a timeline at `/moments/`.

#### Friends

Friend links live in `src/config/friendsconfig.ts`:

```ts
export interface FriendLink {
  title: string;
  imgurl: string;
  desc: string;
  siteurl: string;
  tags?: string[];
  weight?: number;
  enabled?: boolean;
}

export const friendsConfig: FriendLink[] = [
  {
    title: '鼠子',
    imgurl: 'https://blog.miomoe.cn/favicon.ico',
    desc: '欢迎来到鼠子YuiNijika的朋友圈！',
    siteurl: 'https://blog.miomoe.cn/',
    tags: ['Blog'],
    weight: 10,
    enabled: true,
  },
];
```

- `title`: friend name.
- `imgurl`: avatar URL.
- `desc`: description below the name.
- `siteurl`: destination when the card is clicked.
- `tags`: currently for organization only; not displayed.
- `weight`: sort weight; higher comes first; default `0`.
- `enabled`: set `false` to hide; default `true`.

Add a friend by editing this file only; `/friends/` filters and sorts automatically.

#### Photography

`/photography/` uses `import.meta.glob` to collect images from `images/photography/`, supporting AVIF, JPG, JPEG, PNG, and WebP. Filenames are sorted numerically (`P1`, `P2`, … `P10`), and Astro `<Image>` outputs 640px-wide images. The layout is a mixed-size tile grid with occasional wide/large tiles.

#### Images

- Decorative assets: `images/decorative/` (avatar, desktop/mobile wallpapers, favicon).
- Article images: `src/content/articles/images/`, referenced relatively.
- Photography: `images/photography/`.
- Covers are specified by the `cover` frontmatter field and processed by Astro's image pipeline.

### Routes

| Route | Description |
| --- | --- |
| `/` | Home |
| `/articles/` | Article index |
| `/articles/<slug>/` | Article page |
| `/moments/` | Moments timeline |
| `/photography/` | Photography gallery |
| `/friends/` | Friend links |
| `/rss.xml` | RSS feed |

All routes are static; article pages are generated by `getStaticPaths` at build time.

### Design

- **Light gray theme**: page `#e7e7e7`, surfaces `#f3f3f3`, text `#1b1b1b`, muted text `#5c5c5c`, borders `#cfcfcf`. Colors are CSS variables in `src/styles/global.css`.
- **Wallpaper and mask**: the home hero and lower content use the same wallpaper; desktop uses `desktop_wallpaper.jpg`, mobile portrait uses `mobile_wallpaper.jpg`. A light mask keeps text readable.
- **Frosted glass**: the profile, calendar, article panel, and footer use translucent backgrounds and `backdrop-filter`; the text remains opaque.
- **Typography**: Inter Variable (Latin), Noto Sans SC Variable (Chinese), and JetBrains Mono Variable (code), loaded through Fontsource.
- **Layout**: native CSS Grid/Flexbox; container, spacing, and type scales are CSS variables; no UI framework.
- **Interactivity**: the calendar is rendered with native `Date`; RSS/Email buttons use the native clipboard; no frontend framework.
- **Dark mode**: light theme only; there is no toggle.
- **Responsive**: the mobile nav wraps, the home stacks, and the hero uses the mobile wallpaper; `prefers-reduced-motion` is respected.
- **Accessibility**: skip link, semantic headings, `aria-current`, and visible focus styles.

### Deployment

This is a pure static Astro project. It does not need the `@astrojs/cloudflare` adapter or a server runtime.

GitHub → Cloudflare Pages settings:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Root directory | repository root |
| Node version | `24.11.1` |
| pnpm version | `10.33.0` |
| Adapter | None |

- `dist/` is not committed; Cloudflare installs dependencies and runs the build from GitHub.
- `.npmrc` pins Node 24.11.1 through pnpm. If the Cloudflare build stalls downloading Node, set `NODE_VERSION=24.11.1` in Pages and remove the `node-mirror` line from `.npmrc` if necessary.
- After the first deployment, set `SITE.url` in `src/config/site.ts` to the production domain, such as `https://<project>.pages.dev` or a custom domain, and redeploy.
- If you use a custom domain, treat it as the canonical domain; `pages.dev` still serves the same static site.
- `/rss.xml` is generated at build time. When `SITE.url` is empty, item links are relative; after setting the domain, they become absolute.
- The RSS button copies `/rss.xml` from the current domain; no domain needs to be hardcoded.

### License & Copyright

- **Code**: GNU General Public License v3.0 (GPL-3.0-only). See [`LICENSE`](LICENSE). The project notice is `Tealife / Copyright (C) 2026 PR1TEA`.
- **Articles, moments, and PR1TEA's original photographs**: all rights reserved. They are not automatically licensed under the GPL because the source code is open. Contact PR1TEA before republishing or reusing them.
- **Third-party assets and dependencies**: wallpapers, fonts, packages, and other third-party resources remain with their respective owners; Astro, KaTeX, Shiki, and Fontsource are used under their own licenses.
- The GPLv3 text and the FSF copyright notice remain verbatim.

### Contact

- GitHub: [https://github.com/PR1TEA](https://github.com/PR1TEA)
- Email: [PR1TEA@icloud.com](mailto:PR1TEA@icloud.com)
- RSS: `/rss.xml` on the deployed domain

The home page's RSS, GitHub, and Email buttons provide the same entry points; the RSS and Email buttons copy the link or address.

### Acknowledgements

- [Astro](https://astro.build/)
- [KaTeX](https://katex.org/)
- [Shiki](https://shiki.style/)
- [Fontsource](https://fontsource.org/)
- [pnpm](https://pnpm.io/)

### Contributing

This is PR1TEA's personal site. Bug reports and code suggestions are welcome through GitHub Issues/Pull Requests. Articles, moments, and photographs are personal content; please do not reuse them without permission.

### Project Status

A personal project under active maintenance. It is a static, content-first site: no backend, database, comments, search, or membership system.
