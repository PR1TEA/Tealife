---
title: Tealife 的構成與技術棧
description: 從 Astro 到 Cloudflare Pages，說明 Tealife 的頁面、內容、視覺與部署。
pubDate: 2026-11-06
updatedDate: 2026-11-06
category: 開發筆記
series: Tealife 指南
seriesOrder: 3
tags: ['Astro', '技術棧', '部落格']
---

Tealife 是一個靜態的個人網站。它沒有後台、沒有資料庫，也沒有把前端交給一個 UI
框架；大部分的工作在 build 時完成，瀏覽器只負責顯示與少數互動。

## 骨架：Astro 與幾個頁面

網站由 Astro 7 產生，使用 TypeScript 與 pnpm。頁面放在 `src/pages`：

- 首頁：滿版壁紙、個人名片、日曆、最新文章與相冊入口。
- `/articles/`：文章列表。
- `/articles/<slug>/`：文章內頁。
- `/moments/`、`/photography/`、`/friends/`。
- `/rss.xml`：RSS feed。

版面由兩個 layout 包住：`BaseLayout` 負責 `<head>`、頁首與頁尾；
`ArticleLayout` 加上文章標題、日期、分類、系列、標籤、封面與目錄。頁首與頁尾是
元件；首頁再使用 `ProfileCard`、`Calendar` 與 `ArticleList`。

## 內容：Markdown 進來，HTML 出去

文章和動態都是 Markdown，放在 `src/content` 的 content collections。每篇文章的
frontmatter 由 schema 驗證；標題、摘要、日期、分類、系列、標籤、封面都在同一個
區塊。文章內頁用 `getCollection` 取得資料、`render` 產生 HTML 與標題資料，目錄
直接由 `##`、`###` 標題生成。

Markdown 管線由 `@astrojs/markdown-remark` 的 unified processor 處理：
`remark-math` 解析數學，`rehype-katex` 用 KaTeX 渲染；程式碼交給 Shiki；表格與清單
使用 GFM。字體是 Fontsource 的 Inter、Noto Sans SC 與 JetBrains Mono 可變字體。

內容流程大概是：

```text
Markdown + frontmatter
  → content collection
  → getCollection / render
  → Astro 頁面
  → 靜態 HTML
```

## 畫面：淺灰、壁紙與毛玻璃

網站只保留淺灰主題。頁面背景是 `#e7e7e7`，面板是 `#f3f3f3`；文字 `#1b1b1b`。
這些顏色集中寫在 `src/styles/global.css` 的 CSS 變數，其他頁面只引用。

首頁與下方內容都使用同一張壁紙，差別只在遮罩：首頁 hero 是一片較亮的壁紙，內容區
延續同一張圖，卡片則用半透明背景與 `backdrop-filter` 做毛玻璃。卡片內的文字保持
不透明，避免玻璃效果吃掉可讀性。

排版以 `global.css` 的容器、間距與字級變數為主；`prose.css` 只處理文章內文。版面
用 CSS grid 與 flexbox，沒有引入 UI 框架。手機與桌面的差異主要是欄位數與 hero
背景圖，不是兩套頁面。

## 小互動：日曆與複製

日曆是首頁名片下方的一個小元件。它用瀏覽器 `Date` 取得目前年月，畫出當月日期；
沒有後端、沒有事件、沒有導航。年份用完整四位數，閏年交給 `Date`。

RSS、GitHub 與 email 按鈕放在 hero 標題下方。RSS 按鈕複製目前網域的
`/rss.xml`；email 按鈕複製 `PR1TEA@icloud.com`；GitHub 直接連到外部。複製成功會
短暫顯示「已複製」。這些互動都是原生 JavaScript，沒有框架。

## 圖片與資料

網站的圖片分成幾類：`images/` 下的壁紙、頭像與 favicon；文章圖片；以及
`images/photography/` 的相冊。相冊頁會自動收集該資料夾的圖片，依檔名排序並用
Astro 的 `<Image>` 輸出；文章圖片用 Markdown 相對路徑；壁紙由 CSS 或首頁引入。

設定集中在 `src/config`：`site.ts` 放站名、語系與主要導覽；`profile.ts` 放名片
資料；`friendsconfig.ts` 放友鏈。文章與動態的內容則在 `src/content`。資料和畫面
分開，新增內容通常不需要碰頁面程式。

## 部署：GitHub 到 Cloudflare Pages

`pnpm build` 產生 `dist`，這是一份純靜態檔案。Cloudflare Pages 從 GitHub 拉
repo、安裝依賴、執行 build，然後發佈 `dist`；這個站不需要
`@astrojs/cloudflare` adapter，也不需要伺服器。

RSS 的 `/rss.xml` 也是在 build 時產生的靜態檔。對外訂閱的網址就是部署網域加上
`/rss.xml`。`src/config/site.ts` 的 `SITE.url` 決定 feed 內文章連結的網域；如果
還沒有填，feed 內部會是相對路徑，補上正式網域後重新部署即可。

## 為什麼是這些選擇

這個站的功能不多，重點在讓文字和圖片有一個穩定、可讀的地方。Astro 的靜態輸出讓
部署很單純；content collections 讓文章與動態有結構；Markdown 讓寫作留在文字檔；
CSS 變數與少量原生 JS 讓視覺和互動可以自己控制。

代價是它不會有即時後台、留言或複雜的應用邏輯；每一篇文章都經過一次 build。對一個
以內容為主的個人站來說，這樣的交換是合理的。
