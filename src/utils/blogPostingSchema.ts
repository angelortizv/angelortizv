interface Options {
  title: string;
  description?: string;
  date: Date;
  slug: string;
  site: URL | string | undefined;
}

export function buildBlogPostingSchema({
  title,
  description,
  date,
  slug,
  site,
}: Options): Record<string, unknown> {
  const base = site ?? 'https://angelortizv.com';
  const url = new URL(`/writing/${slug}/`, base).href;
  const image = new URL(`/og/${slug}`, base).href;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description ?? title,
    datePublished: date.toISOString(),
    dateModified: date.toISOString(),
    inLanguage: 'es',
    author: {
      '@type': 'Person',
      name: 'Angelo Ortiz Vega',
      url: String(base),
    },
    publisher: {
      '@type': 'Person',
      name: 'Angelo Ortiz Vega',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    image,
  };
}
