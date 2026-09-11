import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const API_PROXY = {
  '/api/produtos': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: () =>
      '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
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