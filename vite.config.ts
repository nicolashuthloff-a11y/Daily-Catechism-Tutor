import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'bible-data': ['./src/data/bibleData'],
          'catechism-data': [
            './src/data/pennyCatechismData',
            './src/data/penny/index',
            './src/data/curriculumData',
          ],
          'prayers-data': [
            './src/data/prayerGuideData',
            './src/data/rosaryGuideData',
            './src/data/latinParallelData',
          ],
        },
      },
    },
  },
});
