import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';

const mathPlugins = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeSlug, rehypeKatex],
};

export default defineConfig({
  site: 'https://angelortizv.com',
  integrations: [mdx(mathPlugins)],
  markdown: {
    ...mathPlugins,
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
