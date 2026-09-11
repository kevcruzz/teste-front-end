import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const API_PROXY = {
  '/api': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: (path: string) =>
      path.replace(/^\/api/, '/teste-front-end/junior/tecnologia'),
  },
};

export default defineConfig({
  plugins: [react()],
  server: { proxy: API_PROXY },
  preview: { proxy: API_PROXY },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
        additionalData: '@use "tokens" as *;\n',
      },
    },
  },
});