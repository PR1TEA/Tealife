---
title: Tealife 的构成与技术栈
description: 从 Astro 到 Cloudflare Pages，说明 Tealife 的页面、内容、视觉与部署。
pubDate: 2026-11-06
updatedDate: 2026-11-06
category: 开发笔记
series: Tealife 指南
seriesOrder: 3
tags: ['Astro', '技术栈', '部落格']
---

Tealife 是一个静态的个人网站。它没有后台、没有资料库，也没有把前端交给一个 UI
框架；大部分的工作在 build 时完成，浏览器只负责显示与少数互动。

## 骨架：Astro 与几个页面

网站由 Astro 7 产生，使用 TypeScript 与 pnpm。页面放在 `src/pages`：

- 首页：满版壁纸、个人名片、日历、最新文章与相册入口。
- `/articles/`：文章列表。
- `/articles/<slug>/`：文章内页。
- `/moments/`、`/photography/`、`/friends/`。
- `/rss.xml`：RSS feed。

版面由两个 layout 包住：`BaseLayout` 负责 `<head>`、页首与页尾；
`ArticleLayout` 加上文章标题、日期、分类、系列、标签、封面与目录。页首与页尾是
元件；首页再使用 `ProfileCard`、`Calendar` 与 `ArticleList`。

## 内容：Markdown 进来，HTML 出去

文章和动态都是 Markdown，放在 `src/content` 的 content collections。每篇文章的
frontmatter 由 schema 验证；标题、摘要、日期、分类、系列、标签、封面都在同一个
区块。文章内页用 `getCollection` 取得资料、`render` 产生 HTML 与标题资料，目录
直接由 `##`、`###` 标题生成。

Markdown 管线由 `@astrojs/markdown-remark` 的 unified processor 处理：
`remark-math` 解析数学，`rehype-katex` 用 KaTeX 渲染；程式码交给 Shiki；表格与清单
使用 GFM。字体是 Fontsource 的 Inter、Noto Sans SC 与 JetBrains Mono 可变字体。

内容流程大概是：

```text
Markdown + frontmatter
  → content collection
  → getCollection / render
  → Astro 页面
  → 静态 HTML
```

## 画面：浅灰、壁纸与毛玻璃

网站只保留浅灰主题。页面背景是 `#e7e7e7`，面板是 `#f3f3f3`；文字 `#1b1b1b`。
这些颜色集中写在 `src/styles/global.css` 的 CSS 变数，其他页面只引用。

首页与下方内容都使用同一张壁纸，差别只在遮罩：首页 hero 是一片较亮的壁纸，内容区
延续同一张图，卡片则用半透明背景与 `backdrop-filter` 做毛玻璃。卡片内的文字保持
不透明，避免玻璃效果吃掉可读性。

排版以 `global.css` 的容器、间距与字级变数为主；`prose.css` 只处理文章内文。版面
用 CSS grid 与 flexbox，没有引入 UI 框架。手机与桌面的差异主要是栏位数与 hero
背景图，不是两套页面。

## 小互动：日历与复制

日历是首页名片下方的一个小元件。它用浏览器 `Date` 取得目前年月，画出当月日期；
没有后端、没有事件、没有导航。年份用完整四位数，闰年交给 `Date`。

RSS、GitHub 与 email 按钮放在 hero 标题下方。RSS 按钮复制目前网域的
`/rss.xml`；email 按钮复制 `PR1TEA@icloud.com`；GitHub 直接连到外部。复制成功会
短暂显示「已复制」。这些互动都是原生 JavaScript，没有框架。

## 图片与资料

网站的图片分成几类：`images/` 下的壁纸、头像与 favicon；文章图片；以及
`images/photography/` 的相册。相册页会自动收集该资料夹的图片，依档名排序并用
Astro 的 `<Image>` 输出；文章图片用 Markdown 相对路径；壁纸由 CSS 或首页引入。

设定集中在 `src/config`：`site.ts` 放站名、语系与主要导览；`profile.ts` 放名片
资料；`friendsconfig.ts` 放友链。文章与动态的内容则在 `src/content`。资料和画面
分开，新增内容通常不需要碰页面程式。

## 部署：GitHub 到 Cloudflare Pages

`pnpm build` 产生 `dist`，这是一份纯静态档案。Cloudflare Pages 从 GitHub 拉
repo、安装依赖、执行 build，然后发布 `dist`；这个站不需要
`@astrojs/cloudflare` adapter，也不需要服务器。

RSS 的 `/rss.xml` 也是在 build 时产生的静态档。对外订阅的网址就是部署网域加上
`/rss.xml`。`src/config/site.ts` 的 `SITE.url` 决定 feed 内文章连结的网域；如果
还没有填，feed 内部会是相对路径，补上正式网域后重新部署即可。

## 为什么是这些选择

这个站的功能不多，重点在让文字和图片有一个稳定、可读的地方。Astro 的静态输出让
部署很单纯；content collections 让文章与动态有结构；Markdown 让写作留在文字档；
CSS 变数与少量原生 JS 让视觉和互动可以自己控制。

代价是它不会有即时后台、留言或复杂的应用逻辑；每一篇文章都经过一次 build。对一个
以内容为主的个人站来说，这样的交换是合理的。
