import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return rss({
    title: 'Angelo Ortiz Vega',
    description: 'Writing on technology, ideas, and things worth remembering.',
    site: context.site ?? 'https://angelortizv.com',
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map(post => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/writing/${post.slug}/`,
      })),
    customData: `<language>es</language>`,
  });
}
