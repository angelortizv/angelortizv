import { getCollection, getEntry } from 'astro:content';
import type { APIContext } from 'astro';
import { getActiveSeries } from '../utils/series';

export async function GET(context: APIContext) {
  const site = context.site ?? 'https://angelortizv.com';
  const today = new Date().toISOString().split('T')[0];

  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const nowEntry = await getEntry('now', 'index');
  const nowLastmod = nowEntry?.data.updated.toISOString().split('T')[0] ?? today;

  const staticPages: { path: string; lastmod: string }[] = [
    { path: '', lastmod: today },
    { path: '/writing', lastmod: today },
    { path: '/about', lastmod: today },
    { path: '/now', lastmod: nowLastmod },
    { path: '/series', lastmod: today },
  ];

  const postUrls = posts.map(post => ({
    url: new URL(`/writing/${post.slug}/`, site).href,
    lastmod: post.data.date.toISOString().split('T')[0],
  }));

  const staticUrls = staticPages.map(({ path, lastmod }) => ({
    url: new URL(path, site).href,
    lastmod,
  }));

  const seriesSlugs = getActiveSeries(posts);
  const seriesUrls = seriesSlugs.map(slug => ({
    url: new URL(`/series/${slug}/`, site).href,
    lastmod: today,
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
