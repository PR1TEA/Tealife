---
title: 如何新增友鏈
description: 在 friendsconfig.ts 新增、排序與隱藏友鏈的步驟；不需要修改 Friends 頁面。
pubDate: 2026-11-06
updatedDate: 2026-11-06
category: 使用說明
series: Tealife 指南
seriesOrder: 2
tags: ['Friends', '友鏈', '教學']
---

友鏈頁面位於 `/friends/`，資料集中在 `src/config/friendsconfig.ts`。新增朋友時只要改這個檔案，不需要動 Astro 頁面。

## 設定檔位置

```ts
src / config / friendsconfig.ts;
```

## 欄位定義

| 欄位      | 型別     | 必填 | 預設 | 說明                               |
| --------- | -------- | ---- | ---- | ---------------------------------- |
| `title`   | string   | 是   | —    | 朋友名稱。                         |
| `imgurl`  | string   | 是   | —    | 頭像 URL；可以是 favicon 或圖片。  |
| `desc`    | string   | 是   | —    | 名稱下方的簡介。                   |
| `siteurl` | string   | 是   | —    | 點擊卡片後前往的網址。             |
| `tags`    | string[] | 否   | `[]` | 標籤；目前只用於整理，頁面不顯示。 |
| `weight`  | number   | 否   | `0`  | 排序權重；數字越大越前面。         |
| `enabled` | boolean  | 否   | true | 設為 `false` 可暫時隱藏。          |

## 新增一位朋友

1. 打開 `src/config/friendsconfig.ts`。
2. 在 `friendsConfig` 陣列中新增一個物件。
3. 填入 `title`、`imgurl`、`desc`、`siteurl`。
4. 需要排序時設定 `weight`；要隱藏時設定 `enabled: false`。
5. 執行 `pnpm build`。

```ts
{
  title: '朋友名稱',
  imgurl: 'https://example.com/avatar.png',
  desc: '一句簡介',
  siteurl: 'https://example.com/',
  tags: ['Blog'],
  weight: 10,
  enabled: true,
}
```

## 顯示規則

- 只顯示 `enabled` 不是 `false` 的項目。
- 依 `weight` 由大到小排序。
- 卡片點擊後以新分頁開啟 `siteurl`。
- 卡片顯示頭像、名稱與 `desc`；`tags` 目前不顯示。

## 不需要改的地方

- `/friends/` 頁面不需要改。
- 導覽列的 `Friends` 由 `src/config/site.ts` 的 `SECTIONS` 產生。
- 新增朋友後重新 build 即可。
