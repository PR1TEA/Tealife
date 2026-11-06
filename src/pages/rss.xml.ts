import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => XML_ENTITIES[character] ?? character);
}

export const GET: APIRoute = async () => {
  const articles = (await getCollection('articles')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const base = SITE.url ? new URL(SITE.url) : null;
  const feedUrl = (path: string) => (base ? new URL(path, base).href : path);

  const items = articles
    .map((article) => {
      const link = feedUrl(`/articles/${article.id}/`);

      return `<item>
        <title>${escapeXml(article.data.title)}</title>
        <link>${escapeXml(link)}</link>
        <guid isPermaLink="false">${escapeXml(link)}</guid>
        <pubDate>${article.data.pubDate.toUTCString()}</pubDate>
        <description>${escapeXml(article.data.description)}</description>
      </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE.name)}</title>
    <link>${escapeXml(feedUrl('/'))}</link>
    <description>${escapeXml(SITE.description || SITE.name)}</description>
    <language>${escapeXml(SITE.lang)}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
