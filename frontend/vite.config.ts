import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router'
      ],
      dts: 'src/auto-imports.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@image': path.resolve(__dirname, 'src/assets/image'),
      '@component' : path.resolve(__dirname, 'src/components'),
      '@api' : path.resolve(__dirname, 'src/api'),
      '@store' : path.resolve(__dirname, 'src/stores')
    }
  },
  server: {
    port: 3000
  }
})
