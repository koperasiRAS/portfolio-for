// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: 'https://for-portfolio-mu.vercel.app',
  integrations: [
    sitemap(),
    react(),
  ],
});