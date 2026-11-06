---
# 必填｜字串｜文章標題；顯示於文章頁與列表。
title: 文章格式與寫作說明
# 必填｜字串｜列表摘要與 meta description。
description: Tealife 的文章 frontmatter、Markdown 語法、欄位定義與 Kalman filter 數學範例。
# 必填｜日期｜YYYY-MM-DD；列表依此由新到舊排序。
pubDate: 2026-11-06
# 選填｜日期｜YYYY-MM-DD；與 pubDate 不同時才會顯示。
updatedDate: 2026-11-06
# 必填｜字串｜單一分類，例如「使用說明」。
category: 使用說明
# 選填｜字串｜系列名稱；同一系列文章共用。
series: Tealife 指南
# 選填｜整數｜系列內排序；需搭配 series。
seriesOrder: 1
# 選填｜字串陣列｜跨分類標籤；YAML 行內陣列或 - 清單。
tags: ['Markdown', '寫作', '範例']
# 選填｜圖片路徑｜相對於本文檔；例：./images/cover.jpg
# cover: ./images/cover.jpg
# 選填｜字串｜封面替代文字；未填時 fallback 到 title。
# coverAlt: 封面圖片說明
---

這篇文章同時是範例，也是往後寫文章時的完整參考。文章使用 `.md`，放在
`src/content/articles/`；檔名會成為網址的一部分。

## 檔案、路由與新增流程

1. 在 `src/content/articles/` 新增 `.md` 檔。
2. 檔名使用小寫英文與連字號，例如 `markdown-guide.md`；文章網址會是
   `/articles/markdown-guide/`。
3. 填寫 frontmatter；正文從 `##` 開始。
4. 執行 `pnpm check` 與 `pnpm build`，確認 schema 與內容沒有錯誤。

> 檔名是 slug；標題可以使用中文，兩者不必相同。

## Frontmatter 參數

frontmatter 是文件最上方兩個 `---` 之間的 YAML 區塊，由
`src/content.config.ts` 的 schema 驗證。

| 欄位          | 型別     | 必填 | 預設  | 定義與用途                                     |
| ------------- | -------- | ---- | ----- | ---------------------------------------------- |
| `title`       | string   | 是   | —     | 文章標題；文章頁與列表使用。                   |
| `description` | string   | 是   | —     | 列表摘要與 SEO description；簡短說明文章內容。 |
| `pubDate`     | date     | 是   | —     | 發佈日期，`YYYY-MM-DD`；列表依此由新到舊排序。 |
| `updatedDate` | date     | 否   | —     | 更新日期；與 `pubDate` 不同時才會顯示。        |
| `category`    | string   | 是   | —     | 單一分類，例如 `使用說明`。                    |
| `series`      | string   | 否   | —     | 系列名稱；同一系列文章共用。                   |
| `seriesOrder` | number   | 否   | —     | 系列內排序；需搭配 `series`。                  |
| `tags`        | string[] | 否   | `[]`  | 跨分類標籤；YAML 陣列。                        |
| `cover`       | image    | 否   | —     | 封面圖；路徑相對於本文檔。                     |
| `coverAlt`    | string   | 否   | title | 封面替代文字；未填時使用 `title`。             |

- 日期使用 `YYYY-MM-DD`，不要加時間；schema 會轉成日期物件。
- `cover` 由 Astro 的 image 管線處理；路徑例：`./images/cover.jpg`。
- `coverAlt` 建議填寫；它會成為封面的 `alt`。
- `tags` 可寫成 `['Markdown', '寫作']` 或 YAML 的 `-` 清單。

封面範例：

```yaml
cover: ./images/cover.jpg
coverAlt: 封面圖片說明
```

## 文章圖片

圖片放在 `src/content/articles/images/`（或文章旁邊的相對資料夾），正文用
相對路徑：

```md
![圖片說明](./images/photo.jpg)
```

- `![]` 的方括號是替代文字；務必描述圖片內容。
- 路徑相對於目前的 `.md` 檔。
- 封面走 frontmatter 的 `cover`，不是正文圖片。

## 標題與目錄

- 文章頁的 `<h1>` 由 `title` 產生；正文不要再用 `#`。
- 使用 `##`、`###` 建立層級；這兩個層級會進入文章目錄（TOC）。
- 標題會自動產生錨點；不需要手動寫 HTML id。

```md
## 二級標題

### 三級標題
```

## Markdown 語法速查

| 元素       | 寫法                          | 定義／用途                        |
| ---------- | ----------------------------- | --------------------------------- |
| 二級標題   | `## 標題`                     | 主要段落；進入 TOC。              |
| 三級標題   | `### 標題`                    | 子段落；進入 TOC。                |
| 粗體       | `**文字**`                    | 強調。                            |
| 斜體       | `_文字_`                      | 次要強調。                        |
| 行內程式碼 | `` `code` ``                  | 參數、檔名、短程式碼。            |
| 連結       | `[文字](https://example.com)` | 外部或站內連結。                  |
| 圖片       | `![alt](./images/photo.jpg)`  | 插入圖片。                        |
| 無序清單   | `- 項目`                      | 不強調順序。                      |
| 有序清單   | `1. 項目`                     | 有順序的步驟。                    |
| 引用       | `> 文字`                      | 補充說明或引言。                  |
| 程式碼區塊 | 三個反引號 + 語言             | 語法高亮。                        |
| 行內公式   | `$x_k$`                       | KaTeX 行內數學。                  |
| 區塊公式   | `$$ ... $$`                   | KaTeX 區塊數學。                  |
| 表格       | 見下方「表格」章節            | GFM 表格。                        |
| 水平線     | `---`                         | 段落分隔，勿與 frontmatter 混淆。 |

### 段落、強調與連結

段落之間留一個空行。**粗體**、_斜體_、`行內程式碼` 可以混用。
[站內連結](/articles/) 使用絕對路徑；[外部連結](https://astro.build) 使用完整 URL。

### 清單與引用

- 清單項目
- 第二項

1. 有序清單
2. 第二項

> 引用文字放在這裡；適合放補充說明。

### 程式碼

程式碼區塊使用三個反引號，並在第一行標註語言：

```ts
const message: string = 'Hello, world.';
console.log(message);
```

- 語言標籤會交給 Shiki 做語法高亮；支援 `ts`、`js`、`json`、`bash`、`css`、
  `html` 等常見語言。
- 行內程式碼用單個反引號，例如 `pnpm build`。
- 若要在程式碼區塊裡顯示三個反引號，外層改用四個反引號。

## 數學公式：Kalman filter 的基本假設

本站使用 KaTeX 渲染行內與區塊數學。以下用 Kalman filter（卡爾曼濾波器）的
線性高斯模型示範，並定義每個變數。

行內公式：狀態向量 $x_k \in \mathbb{R}^n$，觀測向量 $z_k \in \mathbb{R}^p$。

Kalman filter 的基本假設：

1. **線性狀態模型**：狀態由前一個狀態與控制輸入線性決定。

   $$
   x_k = F_k x_{k-1} + B_k u_k + w_k
   $$

2. **線性觀測模型**：觀測是狀態的線性函數。

   $$
   z_k = H_k x_k + v_k
   $$

3. **高斯白噪聲**：$w_k$ 與 $v_k$ 是零均值、互相獨立的高斯白噪聲，且與初始
   狀態獨立。

   $$
   w_k \sim \mathcal{N}(0, Q_k), \qquad
   v_k \sim \mathcal{N}(0, R_k), \qquad
   \mathbb{E}[w_k v_j^\top] = 0
   $$

4. **高斯初始狀態**：初始狀態的均值與共變異數已知。

   $$
   x_0 \sim \mathcal{N}(\hat{x}_0, P_0)
   $$

5. **模型已知**：$F_k, B_k, H_k, Q_k, R_k$ 已知；$Q_k$ 半正定，$R_k$ 正定，
   且矩陣維度一致。

在這些假設下，Kalman filter 的估計是最小均方誤差（MMSE）意義下的最佳估計。
它以預測與更新兩步遞迴：

**預測（predict）**

$$
\begin{aligned}
\hat{x}_{k \mid k-1} &= F_k \hat{x}_{k-1 \mid k-1} + B_k u_k, \\
P_{k \mid k-1} &= F_k P_{k-1 \mid k-1} F_k^\top + Q_k.
\end{aligned}
$$

**更新（update）**

$$
\begin{aligned}
K_k &= P_{k \mid k-1} H_k^\top
  \left(H_k P_{k \mid k-1} H_k^\top + R_k\right)^{-1}, \\
\hat{x}_{k \mid k} &= \hat{x}_{k \mid k-1}
  + K_k \left(z_k - H_k \hat{x}_{k \mid k-1}\right), \\
P_{k \mid k} &= \left(I - K_k H_k\right) P_{k \mid k-1}.
\end{aligned}
$$

### 變數與符號定義

| 符號                       | 維度／型別                | 定義                                       |
| -------------------------- | ------------------------- | ------------------------------------------ |
| $k$                        | 整數                      | 離散時間索引。                             |
| $n$                        | 整數                      | 狀態向量維度。                             |
| $m$                        | 整數                      | 控制輸入維度。                             |
| $p$                        | 整數                      | 觀測向量維度。                             |
| $x_k$                      | $\mathbb{R}^n$            | $k$ 時刻的狀態向量。                       |
| $x_{k-1}$                  | $\mathbb{R}^n$            | 上一時刻的狀態向量。                       |
| $u_k$                      | $\mathbb{R}^m$            | $k$ 時刻的控制輸入。                       |
| $z_k$                      | $\mathbb{R}^p$            | $k$ 時刻的觀測向量。                       |
| $F_k$                      | $\mathbb{R}^{n \times n}$ | 狀態轉移矩陣。                             |
| $B_k$                      | $\mathbb{R}^{n \times m}$ | 控制輸入矩陣。                             |
| $H_k$                      | $\mathbb{R}^{p \times n}$ | 觀測矩陣。                                 |
| $w_k$                      | $\mathbb{R}^n$            | 過程噪聲；$\mathcal{N}(0, Q_k)$。          |
| $v_k$                      | $\mathbb{R}^p$            | 觀測噪聲；$\mathcal{N}(0, R_k)$。          |
| $Q_k$                      | $\mathbb{R}^{n \times n}$ | 過程噪聲共變異數；半正定。                 |
| $R_k$                      | $\mathbb{R}^{p \times p}$ | 觀測噪聲共變異數；正定。                   |
| $\hat{x}_{k \mid k-1}$     | $\mathbb{R}^n$            | 預測（先驗）狀態估計。                     |
| $\hat{x}_{k \mid k}$       | $\mathbb{R}^n$            | 更新（後驗）狀態估計。                     |
| $P_{k \mid k-1}$           | $\mathbb{R}^{n \times n}$ | 預測誤差共變異數。                         |
| $P_{k \mid k}$             | $\mathbb{R}^{n \times n}$ | 更新誤差共變異數。                         |
| $K_k$                      | $\mathbb{R}^{n \times p}$ | Kalman gain。                              |
| $I$                        | $\mathbb{R}^{n \times n}$ | 單位矩陣。                                 |
| $\mathbb{E}[\cdot]$        | —                         | 期望值。                                   |
| $\mathcal{N}(\mu, \Sigma)$ | —                         | 均值 $\mu$、共變異數 $\Sigma$ 的高斯分布。 |
| $(\cdot)^\top$             | —                         | 矩陣或向量轉置。                           |
| $(\cdot)^{-1}$             | —                         | 方陣反矩陣。                               |

- $k \mid k-1$ 讀作「在 $k$ 時刻、使用到 $k-1$ 為止的資訊」；$k \mid k$ 則是
  使用到 $k$ 時刻的資訊。
- 在 Markdown 表格內避免直接寫 `|`；本文用 `\mid` 避免把表格欄位切開。
- 區塊公式用 `$$ ... $$`；行內公式用 `$ ... $`。
- KaTeX 支援 `\mathbb`、`\mathcal`、`\top`、`\mid`、`\begin{aligned}` 等常見語法。

## 表格

GFM 表格以 `|` 分欄，第二行用 `---` 定義欄位：

| 項目 | 值             |
| ---- | -------------- |
| 分類 | `使用說明`     |
| 系列 | `Tealife 指南` |

- 可以用 `:---`、`:---:`、`---:` 控制左、中、右對齊。
- 表格內若需要真正的 `|` 字元，使用 `\|` 跳脫。

## 分類、系列與標籤

- **分類**：每篇文章一個，寫在 `category`；用於大類整理。
- **系列**：相關文章共用同一個 `series`，再用 `seriesOrder` 排序。
- **標籤**：可有多個，寫在 `tags`；用來跨分類整理文章。

## 名詞定義

| 名詞               | 定義                                             |
| ------------------ | ------------------------------------------------ |
| Frontmatter        | 文件最上方兩個 `---` 之間的 YAML 設定區塊。      |
| YAML               | 用來描述 frontmatter 的設定格式。                |
| Slug               | 由檔名產生的網址識別，例如 `markdown-guide`。    |
| Content collection | Astro 的內容集合；本站文章位於 `articles`。      |
| TOC                | 由 `##`、`###` 標題自動產生的文章目錄。          |
| KaTeX              | 將 TeX 數學語法渲染成網頁數學的引擎。            |
| Shiki              | 將程式碼區塊轉成語法高亮的引擎。                 |
| GFM                | GitHub Flavored Markdown；支援表格、清單等語法。 |

## 發佈前檢查

1. 檔案在 `src/content/articles/`，檔名可作為 slug。
2. `title`、`description`、`pubDate`、`category` 已填寫。
3. 正文沒有重複的 `#`；從 `##` 開始。
4. 圖片與封面路徑相對於文章檔；`coverAlt` 已描述圖片。
5. 程式碼區塊有語言標籤；數學公式可正常渲染。
6. 標籤、系列與 `seriesOrder` 符合預期。
7. 執行 `pnpm check` 與 `pnpm build`。
