import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildHomeOgPng, buildOgPng } from '../../utils/ogImage';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return [
    { params: { slug: 'home' }, props: { home: true, title: '', subtitle: '' } },
    {
      params: { slug: 'default' },
      props: {
        title: 'Angelo Ortiz Vega',
        subtitle: 'Escritura sobre tecnología, ideas y cosas que vale la pena recordar.',
      },
    },
    ...posts.map(post => ({
      params: { slug: post.slug },
      props: {
        title: post.data.title,
        subtitle: 'Angelo Ortiz Vega',
      },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const { title, subtitle, home } = props as { title: string; subtitle: string; home?: boolean };
  const png = home ? await buildHomeOgPng() : await buildOgPng(title, subtitle);

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
