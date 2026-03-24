import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/pilotmaster/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // GitHub Pages filters out files starting with an underscore by default
        sanitizeFileName: (name) => {
          return name.replace(/\0/g, '').replace(/[^a-z0-9.]/gi, '-').replace(/^-+/, '');
        },
      },
    },
  },
})
