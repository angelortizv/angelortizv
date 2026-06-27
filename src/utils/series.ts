import type { CollectionEntry } from 'astro:content';
import { SERIES_META, type SeriesSlug } from '../data/series';

type Post = CollectionEntry<'posts'>;

export function getSeriesPosts(posts: Post[], seriesSlug: SeriesSlug): Post[] {
  return posts
    .filter(p => p.data.series === seriesSlug)
    .sort((a, b) => {
      const orderA = a.data.seriesOrder ?? 0;
      const orderB = b.data.seriesOrder ?? 0;
      return orderA - orderB || a.data.date.valueOf() - b.data.date.valueOf();
    });
}

export function getActiveSeries(posts: Post[]): SeriesSlug[] {
  const slugs = new Set(
    posts
      .map(p => p.data.series)
      .filter((s): s is SeriesSlug => Boolean(s && s in SERIES_META)),
  );
  return [...slugs];
}

export function getSeriesMeta(slug: SeriesSlug) {
  return SERIES_META[slug];
}
