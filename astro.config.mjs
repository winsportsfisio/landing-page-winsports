import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://winsportsfisio.com.br',
  trailingSlash: 'ignore',
  changefreq: 'monthly',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap({
      changefreq: 'yearly',
      priority: 0.7,
      lastmod: new Date('2026-04-23'),
    }),
  ],
  compressHTML: true,
});
