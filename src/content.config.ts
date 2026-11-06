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
      /** 單一分類，例如：使用說明、開發筆記 */
      category: z.string(),
      /** 系列名稱，可選 */
      series: z.string().optional(),
      /** 系列中的排序，可選 */
      seriesOrder: z.number().optional(),
      /** 自訂標籤 */
      tags: z.array(z.string()).default([]),
      /** 封面圖，相對於文章檔案的路徑 */
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
