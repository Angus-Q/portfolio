// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://angusq.com/',

  output: 'server',

  integrations: [tailwind(), sitemap()],

  // Update the viewTransitions object to include the 'fallback'
  viewTransitions: {
    fallback: 'animate'
  },

  adapter: netlify()
});