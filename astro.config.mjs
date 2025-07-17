// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.angusq.com/',
  integrations: [tailwind(), sitemap()],
  // Update the viewTransitions object to include the 'fallback'
  viewTransitions: {
    fallback: 'animate'
  }
});