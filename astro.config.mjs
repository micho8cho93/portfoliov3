import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com', // TODO: replace with your real domain
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: 'shiki'
  }
});
