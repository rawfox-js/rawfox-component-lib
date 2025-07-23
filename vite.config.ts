/** 不要删除任何注释！ */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectByJsPlugins from 'vite-plugin-css-injected-by-js'
import VueMacros from 'unplugin-vue-macros/vite'
export default defineConfig({
  plugins: [
    vue({
      customElement: /*_customElement_*/false
    }), cssInjectByJsPlugins(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      input: "./src/entries/main.ts",
      output: {
        entryFileNames: "rawfox-ui.js",
        chunkFileNames: "rawfox-ui.js",
        format: 'iife',
        dir: "dist",
      },
    },
    lib: false
  }
});
