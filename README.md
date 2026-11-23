# Tealife

**Photography, moments, and writing — a personal website by PR1TEA.**

[简体中文](#简体中文) · [English](#english) · [GitHub](https://github.com/PR1TEA) · [Email](mailto:PR1TEA@icloud.com)

![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.33-F69220?logo=pnpm&logoColor=white)
![GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-2C4F7C)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)


---

## 简体中文

### 关于

**Tealife** 是 PR1TEA 用来放置摄影、生活动态与文章的个人网站。

它使用 Astro 建置，内容主要以 Markdown 维护，并在建置时输出静态页面。没有资料库、会员系统或伺服器端应用程式；设计上尽量让内容本身保持简单、可整理，也容易长期保存。

首页保留了一句俄语：*Даже в тяжести самых крутых перемен...*

### 网站内容

| 区域 | 说明 |
| --- | --- |
| **Photography** | 从 `images/photography/` 自动载入照片，以不规则磁砖网格展示。 |
| **Moments** | 以时间轴呈现简短的 Markdown 记录。 |
| **Articles** | 文章、系列与分类；支援目录、图片、数学公式及程式码高亮。 |
| **Friends** | 由设定档管理的友站连结。 |
| **RSS** | 建置时产生 `/rss.xml`，供订阅更新。 |

首页另外提供个人名片、当月日历、最新五篇文章，以及 RSS、GitHub、Email 入口。网站以浅灰色、壁纸与半透明面板为主要视觉元素，桌面和行动装置各有对应壁纸。

### 技术

- **Astro 7.4.5**：静态站点生成与 content collections。
- **TypeScript 5.9.3**、**pnpm 10.33.0**、**Node.js 24.11.1**。
- **Markdown / GFM**：文章和动态内容；**KaTeX** 处理数学，**Shiki** 处理程式码高亮。
- **原生 CSS / JavaScript**：Grid、Flexbox、CSS 变数、`backdrop-filter`、日历与复制按钮；不使用前端 UI 框架。
- **Cloudflare Pages**：由 GitHub 触发建置，部署 `dist/` 静态档案。

字体为 Inter Variable、Noto Sans SC Variable 与 JetBrains Mono Variable。网站目前只有浅色主题，并支援基本的键盘操作和 `prefers-reduced-motion`。

### 本机开发

需求：Node.js `>=22.23.4`（专案以 `.npmrc` 指定 `24.11.1`）及 pnpm `10.33.0`。

```bash
pnpm install
pnpm dev       # 启动开发伺服器
pnpm build     # 建置至 dist/
pnpm preview   # 预览建置结果
pnpm check     # Astro / TypeScript 检查
pnpm format    # Prettier 格式化
```

### 专案结构

```text
Tealife/
├── images/
│   ├── decorative/         # 头像、壁纸与 favicon
│   └── photography/        # 相册照片
├── src/
│   ├── components/         # 页首、页脚、名片、日历、文章列表
│   ├── config/             # 网站、个人资料与友链设定
│   ├── content/
│   │   ├── articles/       # 文章 Markdown 与图片
│   │   └── moments/        # 动态 Markdown
│   ├── layouts/            # 页面与文章版型
│   ├── pages/              # 静态路由与 RSS endpoint
│   ├── styles/             # 全站及文章样式
│   ├── utils/
│   └── content.config.ts   # Content collection schemas
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── .npmrc
├── LICENSE
└── README.md
```

`src/content/photography/` 仅为保留资料夹；相册实际读取 `images/photography/`。`dist/`、`node_modules/`、`.astro/` 和 `.cache/` 为产生档案，不应纳入版控。

### 新增内容

**文章**：在 `src/content/articles/` 新增 `.md` 档案。档名是路由 slug，例如 `mint-tea.md` 对应 `/articles/mint-tea/`。文章标题由 frontmatter 的 `title` 显示，正文从 `##` 开始。

```yaml
---
title: "文章标题"
description: "简短摘要"
pubDate: 2026-11-20
category: "Writing"
tags: ["Notes"]
---
```

必要栏位为 `title`、`description`、`pubDate`、`category`；可选栏位为 `updatedDate`、`series`、`seriesOrder`、`tags`、`cover`、`coverAlt`。支援 Markdown / GFM、`$...$` 与 `$$...$$` 数学公式、Shiki 程式码区块；`##` 和 `###` 会自动产生文章目录。文章图片可放在 `src/content/articles/images/`，以相对路径引用。封面则透过 frontmatter 的 `cover` 设定。

**动态**：在 `src/content/moments/` 新增 `.md`，frontmatter 只需要 `pubDate`，其余为 Markdown 正文。

**摄影**：将 AVIF、JPG、JPEG、PNG 或 WebP 放入 `images/photography/`。图片依档名自然排序（如 `P1`、`P2`、`P10`），经 Astro `<Image>` 处理并输出 640px 宽度版本。

**友链**：在 `src/config/friendsconfig.ts` 编辑 `friendsConfig`；每笔资料包含 `title`、`imgurl`、`desc`、`siteurl`，可选 `tags`、`weight`、`enabled`。`weight` 越大越靠前，`enabled: false` 会隐藏该项；`tags` 目前不显示于页面。

### 设定与部署

| 设定档 | 用途 |
| --- | --- |
| `src/config/site.ts` | 网站名称、正式网址、描述、语言、起始日期与导览项目。 |
| `src/config/profile.ts` | 首页名片的名称、头像、简介与连结。 |
| `src/config/friendsconfig.ts` | 友链内容及排序。 |
| `src/content.config.ts` | `articles`、`moments` 的内容 schema。 |

Cloudflare Pages 使用 **Astro** preset，建置指令 `pnpm build`，输出目录 `dist`，根目录为专案根目录；无需 Cloudflare adapter 或伺服器 runtime。Node 版本为 `24.11.1`，pnpm 版本为 `10.33.0`。

部署后请将 `src/config/site.ts` 的 `SITE.url` 设为实际网址（建议使用自订网域作为 canonical），并填写 `SITE.description`。`SITE.url` 若留空，RSS 文章连结可能是相对路径。`.npmrc` 另外设定了 Node 下载镜像；若建置时下载 Node 发生问题，可检查镜像设定与 Pages 的 `NODE_VERSION`。

### 授权与联络

**程式码**以 [GNU GPL v3.0](LICENSE)（GPL-3.0-only）授权；**文章、动态与原创摄影作品**不因此自动采用 GPL，未经同意请勿转载或重用。第三方素材与依赖仍遵循各自授权。著作权标示：`Tealife / Copyright (C) 2026 PR1TEA`。

欢迎透过 GitHub Issues／Pull Requests 回报程式问题或提出改进建议。

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
