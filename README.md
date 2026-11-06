# tealife

以 Astro 建立的個人網站。目前完成第二階段：專案骨架、全域樣式、個人名片與首頁。

## 指令

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm check
pnpm format
```

## Node 版本

專案以 pnpm 的 `use-node-version` 固定在 Node 24.11.1（Astro 7 需要 ≥22.23.4）。
`.npmrc` 另外設定了 Node 下載鏡像；若你的網路可直接連線 nodejs.org，可移除該行。

## 目錄

```text
images/                  專案根目錄的圖片
├── album/               相簿
├── article/             文章
└── decorative/          裝飾元素
    ├── icons/
    ├── avatars/
    ├── stickers/
    └── backgrounds/     desktop_wallpaper.jpg

src/
├── components/        SiteHeader、SiteFooter、ThemeToggle、ProfileCard
├── config/            site.ts（站名、語系、導覽）、profile.ts（個人名片）
├── content/
│   └── photography/   相簿專用資料夾（第四階段填入相簿資料與照片）
├── layouts/           BaseLayout
├── pages/             /、/photography/、/moments/、/articles/
└── styles/            global.css（設計變數、重置、容器）
```

## 個人名片

資料在 `src/config/profile.ts`。只填你願意公開的內容；沒有填的欄位不會顯示。

## 設計

- 中性色盤，沒有品牌強調色。
- 首頁是滿版背景（`images/decorative/backgrounds/desktop_wallpaper.jpg`，固定不隨捲動移動）加上置中標題；下方為文章區塊，再往下是名片與入口。
- 字體：Inter（拉丁）、Noto Sans SC（中文）、JetBrains Mono（程式碼）。
- 字型以 Fontsource 的 unicode-range 子集載入，瀏覽器只下載實際用到的區段。
- 深色模式由 `data-theme` 與 CSS 變數切換。

## 尚未實作

文章、動態、攝影、日曆、友情連結。依階段逐步加入。
