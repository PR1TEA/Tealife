---
title: 如何新增友链
description: 在 friendsconfig.ts 新增、排序与隐藏友链的步骤；不需要修改 Friends 页面。
pubDate: 2026-11-06
updatedDate: 2026-11-06
category: 使用说明
series: Tealife 指南
seriesOrder: 2
tags: ['Friends', '友链', '教学']
---

友链页面位于 `/friends/`，资料集中在 `src/config/friendsconfig.ts`。新增朋友时只要改这个档案，不需要动 Astro 页面。

## 设定档位置

```ts
src / config / friendsconfig.ts;
```

## 栏位定义

| 栏位      | 型别     | 必填 | 预设 | 说明                               |
| --------- | -------- | ---- | ---- | ---------------------------------- |
| `title`   | string   | 是   | —    | 朋友名称。                         |
| `imgurl`  | string   | 是   | —    | 头像 URL；可以是 favicon 或图片。  |
| `desc`    | string   | 是   | —    | 名称下方的简介。                   |
| `siteurl` | string   | 是   | —    | 点击卡片后前往的网址。             |
| `tags`    | string[] | 否   | `[]` | 标签；目前只用于整理，页面不显示。 |
| `weight`  | number   | 否   | `0`  | 排序权重；数字越大越前面。         |
| `enabled` | boolean  | 否   | true | 设为 `false` 可暂时隐藏。          |

## 新增一位朋友

1. 打开 `src/config/friendsconfig.ts`。
2. 在 `friendsConfig` 阵列中新增一个物件。
3. 填入 `title`、`imgurl`、`desc`、`siteurl`。
4. 需要排序时设定 `weight`；要隐藏时设定 `enabled: false`。
5. 执行 `pnpm build`。

```ts
{
  title: '朋友名称',
  imgurl: 'https://example.com/avatar.png',
  desc: '一句简介',
  siteurl: 'https://example.com/',
  tags: ['Blog'],
  weight: 10,
  enabled: true,
}
```

## 显示规则

- 只显示 `enabled` 不是 `false` 的项目。
- 依 `weight` 由大到小排序。
- 卡片点击后以新分页开启 `siteurl`。
- 卡片显示头像、名称与 `desc`；`tags` 目前不显示。

## 不需要改的地方

- `/friends/` 页面不需要改。
- 导览列的 `Friends` 由 `src/config/site.ts` 的 `SECTIONS` 产生。
- 新增朋友后重新 build 即可。
