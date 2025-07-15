// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  // Update the viewTransitions object to include the 'fallback'
  viewTransitions: {
    fallback: 'animate'
  }
});