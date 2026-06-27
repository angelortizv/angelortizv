import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildOgPng } from '../../utils/ogImage';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return [
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
  const { title, subtitle } = props as { title: string; subtitle: string };
  const png = await buildOgPng(title, subtitle);

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
