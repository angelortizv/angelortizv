import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getActiveSeries } from '../utils/series';

export async function GET(context: APIContext) {
  const site = context.site ?? 'https://angelortizv.com';

  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const staticPages = ['', '/writing', '/about', '/now', '/series'];

  const postUrls = posts.map(post => ({
    url: new URL(`/writing/${post.slug}/`, site).href,
    lastmod: post.data.date.toISOString().split('T')[0],
  }));

  const staticUrls = staticPages.map(path => ({
    url: new URL(path, site).href,
    lastmod: new Date().toISOString().split('T')[0],
  }));

  const seriesSlugs = getActiveSeries(posts);
  const seriesUrls = seriesSlugs.map(slug => ({
    url: new URL(`/series/${slug}/`, site).href,
    lastmod: new Date().toISOString().split('T')[0],
  }));

  const allUrls = [...staticUrls, ...seriesUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
