// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://markusharnusek.github.io',
  output: 'static',
  build: {
    inlineStylesheets: 'never',
  },
  vite: {
    css: {
      transformer: 'postcss',
    },
  },
});
