import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  site: 'https://katarinariesgostropkova.github.io',
  integrations: [mdx()],
});
