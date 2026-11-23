import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      /** 单一分类，例如：使用说明、开发笔记 */
      category: z.string(),
      /** 系列名称，可选 */
      series: z.string().optional(),
      /** 系列中的排序，可选 */
      seriesOrder: z.number().optional(),
      /** 自定义标签 */
      tags: z.array(z.string()).default([]),
      /** 封面图，相对于文章文件的路径 */
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

const moments = defineCollection({
  loader: glob({ base: './src/content/moments', pattern: '**/*.md' }),
  schema: z.object({
    pubDate: z.coerce.date(),
  }),
});

export const collections = { articles, moments };
