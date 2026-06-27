import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildOgSvg } from '../../utils/ogImage';

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

export const GET: APIRoute = ({ props }) => {
  const { title, subtitle } = props as { title: string; subtitle: string };

  return new Response(buildOgSvg(title, subtitle), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
