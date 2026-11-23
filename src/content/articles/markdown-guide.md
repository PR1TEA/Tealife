---
# 必填｜字串｜文章标题；显示于文章页与列表。
title: 文章格式与写作说明
# 必填｜字串｜列表摘要与 meta description。
description: Tealife 的文章 frontmatter、Markdown 语法、栏位定义与 Kalman filter 数学范例。
# 必填｜日期｜YYYY-MM-DD；列表依此由新到旧排序。
pubDate: 2026-11-06
# 选填｜日期｜YYYY-MM-DD；与 pubDate 不同时才会显示。
updatedDate: 2026-11-06
# 必填｜字串｜单一分类，例如「使用说明」。
category: 使用说明
# 选填｜字串｜系列名称；同一系列文章共用。
series: Tealife 指南
# 选填｜整数｜系列内排序；需搭配 series。
seriesOrder: 1
# 选填｜字串阵列｜跨分类标签；YAML 行内阵列或 - 清单。
tags: ['Markdown', '写作', '范例']
# 选填｜图片路径｜相对于本文档；例：./images/cover.jpg
# cover: ./images/cover.jpg
# 选填｜字串｜封面替代文字；未填时 fallback 到 title。
# coverAlt: 封面图片说明
---

这篇文章同时是范例，也是往后写文章时的完整参考。文章使用 `.md`，放在
`src/content/articles/`；档名会成为网址的一部分。

## 档案、路由与新增流程

1. 在 `src/content/articles/` 新增 `.md` 档。
2. 档名使用小写英文与连字号，例如 `markdown-guide.md`；文章网址会是
   `/articles/markdown-guide/`。
3. 填写 frontmatter；正文从 `##` 开始。
4. 执行 `pnpm check` 与 `pnpm build`，确认 schema 与内容没有错误。

> 档名是 slug；标题可以使用中文，两者不必相同。

## Frontmatter 参数

frontmatter 是文件最上方两个 `---` 之间的 YAML 区块，由
`src/content.config.ts` 的 schema 验证。

| 栏位          | 型别     | 必填 | 预设  | 定义与用途                                     |
| ------------- | -------- | ---- | ----- | ---------------------------------------------- |
| `title`       | string   | 是   | —     | 文章标题；文章页与列表使用。                   |
| `description` | string   | 是   | —     | 列表摘要与 SEO description；简短说明文章内容。 |
| `pubDate`     | date     | 是   | —     | 发布日期，`YYYY-MM-DD`；列表依此由新到旧排序。 |
| `updatedDate` | date     | 否   | —     | 更新日期；与 `pubDate` 不同时才会显示。        |
| `category`    | string   | 是   | —     | 单一分类，例如 `使用说明`。                    |
| `series`      | string   | 否   | —     | 系列名称；同一系列文章共用。                   |
| `seriesOrder` | number   | 否   | —     | 系列内排序；需搭配 `series`。                  |
| `tags`        | string[] | 否   | `[]`  | 跨分类标签；YAML 阵列。                        |
| `cover`       | image    | 否   | —     | 封面图；路径相对于本文档。                     |
| `coverAlt`    | string   | 否   | title | 封面替代文字；未填时使用 `title`。             |

- 日期使用 `YYYY-MM-DD`，不要加时间；schema 会转成日期物件。
- `cover` 由 Astro 的 image 管线处理；路径例：`./images/cover.jpg`。
- `coverAlt` 建议填写；它会成为封面的 `alt`。
- `tags` 可写成 `['Markdown', '写作']` 或 YAML 的 `-` 清单。

封面范例：

```yaml
cover: ./images/cover.jpg
coverAlt: 封面图片说明
```

## 文章图片

图片放在 `src/content/articles/images/`（或文章旁边的相对资料夹），正文用
相对路径：

```md
![图片说明](./images/photo.jpg)
```

- `![]` 的方括号是替代文字；务必描述图片内容。
- 路径相对于目前的 `.md` 档。
- 封面走 frontmatter 的 `cover`，不是正文图片。

## 标题与目录

- 文章页的 `<h1>` 由 `title` 产生；正文不要再用 `#`。
- 使用 `##`、`###` 建立层级；这两个层级会进入文章目录（TOC）。
- 标题会自动产生锚点；不需要手动写 HTML id。

```md
## 二级标题

### 三级标题
```

## Markdown 语法速查

| 元素       | 写法                          | 定义／用途                        |
| ---------- | ----------------------------- | --------------------------------- |
| 二级标题   | `## 标题`                     | 主要段落；进入 TOC。              |
| 三级标题   | `### 标题`                    | 子段落；进入 TOC。                |
| 粗体       | `**文字**`                    | 强调。                            |
| 斜体       | `_文字_`                      | 次要强调。                        |
| 行内程式码 | `` `code` ``                  | 参数、档名、短程式码。            |
| 连结       | `[文字](https://example.com)` | 外部或站内连结。                  |
| 图片       | `![alt](./images/photo.jpg)`  | 插入图片。                        |
| 无序清单   | `- 项目`                      | 不强调顺序。                      |
| 有序清单   | `1. 项目`                     | 有顺序的步骤。                    |
| 引用       | `> 文字`                      | 补充说明或引言。                  |
| 程式码区块 | 三个反引号 + 语言             | 语法高亮。                        |
| 行内公式   | `$x_k$`                       | KaTeX 行内数学。                  |
| 区块公式   | `$$ ... $$`                   | KaTeX 区块数学。                  |
| 表格       | 见下方「表格」章节            | GFM 表格。                        |
| 水平线     | `---`                         | 段落分隔，勿与 frontmatter 混淆。 |

### 段落、强调与连结

段落之间留一个空行。**粗体**、_斜体_、`行内程式码` 可以混用。
[站内连结](/articles/) 使用绝对路径；[外部连结](https://astro.build) 使用完整 URL。

### 清单与引用

- 清单项目
- 第二项

1. 有序清单
2. 第二项

> 引用文字放在这里；适合放补充说明。

### 程式码

程式码区块使用三个反引号，并在第一行标注语言：

```ts
const message: string = 'Hello, world.';
console.log(message);
```

- 语言标签会交给 Shiki 做语法高亮；支援 `ts`、`js`、`json`、`bash`、`css`、
  `html` 等常见语言。
- 行内程式码用单个反引号，例如 `pnpm build`。
- 若要在程式码区块里显示三个反引号，外层改用四个反引号。

## 数学公式：Kalman filter 的基本假设

本站使用 KaTeX 渲染行内与区块数学。以下用 Kalman filter（卡尔曼滤波器）的
线性高斯模型示范，并定义每个变数。

行内公式：状态向量 $x_k \in \mathbb{R}^n$，观测向量 $z_k \in \mathbb{R}^p$。

Kalman filter 的基本假设：

1. **线性状态模型**：状态由前一个状态与控制输入线性决定。

   $$
   x_k = F_k x_{k-1} + B_k u_k + w_k
   $$

2. **线性观测模型**：观测是状态的线性函数。

   $$
   z_k = H_k x_k + v_k
   $$

3. **高斯白噪声**：$w_k$ 与 $v_k$ 是零均值、互相独立的高斯白噪声，且与初始
   状态独立。

   $$
   w_k \sim \mathcal{N}(0, Q_k), \qquad
   v_k \sim \mathcal{N}(0, R_k), \qquad
   \mathbb{E}[w_k v_j^\top] = 0
   $$

4. **高斯初始状态**：初始状态的均值与共变异数已知。

   $$
   x_0 \sim \mathcal{N}(\hat{x}_0, P_0)
   $$

5. **模型已知**：$F_k, B_k, H_k, Q_k, R_k$ 已知；$Q_k$ 半正定，$R_k$ 正定，
   且矩阵维度一致。

在这些假设下，Kalman filter 的估计是最小均方误差（MMSE）意义下的最佳估计。
它以预测与更新两步递回：

**预测（predict）**

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

### 变数与符号定义

| 符号                       | 维度／型别                | 定义                                       |
| -------------------------- | ------------------------- | ------------------------------------------ |
| $k$                        | 整数                      | 离散时间索引。                             |
| $n$                        | 整数                      | 状态向量维度。                             |
| $m$                        | 整数                      | 控制输入维度。                             |
| $p$                        | 整数                      | 观测向量维度。                             |
| $x_k$                      | $\mathbb{R}^n$            | $k$ 时刻的状态向量。                       |
| $x_{k-1}$                  | $\mathbb{R}^n$            | 上一时刻的状态向量。                       |
| $u_k$                      | $\mathbb{R}^m$            | $k$ 时刻的控制输入。                       |
| $z_k$                      | $\mathbb{R}^p$            | $k$ 时刻的观测向量。                       |
| $F_k$                      | $\mathbb{R}^{n \times n}$ | 状态转移矩阵。                             |
| $B_k$                      | $\mathbb{R}^{n \times m}$ | 控制输入矩阵。                             |
| $H_k$                      | $\mathbb{R}^{p \times n}$ | 观测矩阵。                                 |
| $w_k$                      | $\mathbb{R}^n$            | 过程噪声；$\mathcal{N}(0, Q_k)$。          |
| $v_k$                      | $\mathbb{R}^p$            | 观测噪声；$\mathcal{N}(0, R_k)$。          |
| $Q_k$                      | $\mathbb{R}^{n \times n}$ | 过程噪声共变异数；半正定。                 |
| $R_k$                      | $\mathbb{R}^{p \times p}$ | 观测噪声共变异数；正定。                   |
| $\hat{x}_{k \mid k-1}$     | $\mathbb{R}^n$            | 预测（先验）状态估计。                     |
| $\hat{x}_{k \mid k}$       | $\mathbb{R}^n$            | 更新（后验）状态估计。                     |
| $P_{k \mid k-1}$           | $\mathbb{R}^{n \times n}$ | 预测误差共变异数。                         |
| $P_{k \mid k}$             | $\mathbb{R}^{n \times n}$ | 更新误差共变异数。                         |
| $K_k$                      | $\mathbb{R}^{n \times p}$ | Kalman gain。                              |
| $I$                        | $\mathbb{R}^{n \times n}$ | 单位矩阵。                                 |
| $\mathbb{E}[\cdot]$        | —                         | 期望值。                                   |
| $\mathcal{N}(\mu, \Sigma)$ | —                         | 均值 $\mu$、共变异数 $\Sigma$ 的高斯分布。 |
| $(\cdot)^\top$             | —                         | 矩阵或向量转置。                           |
| $(\cdot)^{-1}$             | —                         | 方阵反矩阵。                               |

- $k \mid k-1$ 读作「在 $k$ 时刻、使用到 $k-1$ 为止的资讯」；$k \mid k$ 则是
  使用到 $k$ 时刻的资讯。
- 在 Markdown 表格内避免直接写 `|`；本文用 `\mid` 避免把表格栏位切开。
- 区块公式用 `$$ ... $$`；行内公式用 `$ ... $`。
- KaTeX 支援 `\mathbb`、`\mathcal`、`\top`、`\mid`、`\begin{aligned}` 等常见语法。

## 表格

GFM 表格以 `|` 分栏，第二行用 `---` 定义栏位：

| 项目 | 值             |
| ---- | -------------- |
| 分类 | `使用说明`     |
| 系列 | `Tealife 指南` |

- 可以用 `:---`、`:---:`、`---:` 控制左、中、右对齐。
- 表格内若需要真正的 `|` 字元，使用 `\|` 跳脱。

## 分类、系列与标签

- **分类**：每篇文章一个，写在 `category`；用于大类整理。
- **系列**：相关文章共用同一个 `series`，再用 `seriesOrder` 排序。
- **标签**：可有多个，写在 `tags`；用来跨分类整理文章。

## 名词定义

| 名词               | 定义                                             |
| ------------------ | ------------------------------------------------ |
| Frontmatter        | 文件最上方两个 `---` 之间的 YAML 设定区块。      |
| YAML               | 用来描述 frontmatter 的设定格式。                |
| Slug               | 由档名产生的网址识别，例如 `markdown-guide`。    |
| Content collection | Astro 的内容集合；本站文章位于 `articles`。      |
| TOC                | 由 `##`、`###` 标题自动产生的文章目录。          |
| KaTeX              | 将 TeX 数学语法渲染成网页数学的引擎。            |
| Shiki              | 将程式码区块转成语法高亮的引擎。                 |
| GFM                | GitHub Flavored Markdown；支援表格、清单等语法。 |

## 发布前检查

1. 档案在 `src/content/articles/`，档名可作为 slug。
2. `title`、`description`、`pubDate`、`category` 已填写。
3. 正文没有重复的 `#`；从 `##` 开始。
4. 图片与封面路径相对于文章档；`coverAlt` 已描述图片。
5. 程式码区块有语言标签；数学公式可正常渲染。
6. 标签、系列与 `seriesOrder` 符合预期。
7. 执行 `pnpm check` 与 `pnpm build`。
