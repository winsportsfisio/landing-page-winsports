import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://winsportsfisio.com.br',
  trailingSlash: 'ignore',
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
      customPages: ['https://winsportsfisio.com.br/politica-de-privacidade'],
    }),
  ],
  compressHTML: true,
});
