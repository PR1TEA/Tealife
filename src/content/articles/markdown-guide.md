---
title: 文章格式與寫作說明
description: Tealife 的文章 frontmatter、分類、系列、標籤、封面與 Markdown 語法說明。
pubDate: 2026-11-06
updatedDate: 2026-11-06
category: 使用說明
series: Tealife 指南
seriesOrder: 1
tags: ['Markdown', '寫作', '範例']
# cover: ./images/cover.jpg
# coverAlt: 封面圖片說明
---

這篇文章同時是範例，也是往後寫文章時的格式說明。文章使用 `.md`，放在
`src/content/articles/`。

## 新增一篇文章

1. 在 `src/content/articles/` 新增一個 `.md` 檔，檔名會成為文章的識別名稱。
2. 填寫下方 frontmatter。
3. 正文直接使用 Markdown。

## Frontmatter 欄位

| 欄位          | 必填 | 說明                        |
| ------------- | ---- | --------------------------- |
| `title`       | 是   | 文章標題                    |
| `description` | 是   | 列表與 SEO 使用的摘要       |
| `pubDate`     | 是   | 發佈日期，格式 `YYYY-MM-DD` |
| `updatedDate` | 否   | 更新日期                    |
| `category`    | 是   | 單一分類，例如 `使用說明`   |
| `series`      | 否   | 系列名稱                    |
| `seriesOrder` | 否   | 文章在系列中的排序          |
| `tags`        | 否   | 自訂標籤陣列                |
| `cover`       | 否   | 封面圖，路徑相對於文章檔    |
| `coverAlt`    | 否   | 封面圖的替代文字            |

封面圖放在文章圖片資料夾，並在 frontmatter 指定：

```yaml
cover: ./images/cover.jpg
coverAlt: 封面圖片說明
```

## 文章圖片

圖片放在 `src/content/articles/images/`，正文以相對路徑引用：

```md
![圖片說明](./images/photo.jpg)
```

## 標題層級

文章標題由頁面顯示，正文從 `##` 開始，不要重複使用 `#`。

### 這是一個小標題

段落可以使用 **粗體**、_斜體_、`行內程式碼`，以及[連結](https://astro.build)。

## 清單與引用

- 清單項目
- 第二項

1. 有序清單
2. 第二項

> 引用文字放在這裡。

## 程式碼

程式碼區塊使用三個反引號，並標註語言：

```ts
const message: string = 'Hello, world.';
console.log(message);
```

## 數學公式

行內公式：$a^2 + b^2 = c^2$。

區塊公式：

$$
\int_{0}^{1} x^2 \, dx = \frac{1}{3}
$$

## 表格

| 項目 | 值             |
| ---- | -------------- |
| 分類 | `使用說明`     |
| 系列 | `Tealife 指南` |

## 分類、系列與標籤

- **分類**：每篇文章一個，寫在 `category`。
- **系列**：相關文章共用同一個 `series`，再用 `seriesOrder` 排序。
- **標籤**：可有多個，寫在 `tags`，用來跨分類整理文章。
