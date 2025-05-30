import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  plugins: [vue(),
  Components({
    resolvers: [
      IconsResolver({
        prefix: 'Icon',
        enabledCollections: ['mdi'],
      }),
    ],
  }),
  Icons({
    autoInstall: true,
  }),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
});
