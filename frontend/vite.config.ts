import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import checker from 'vite-plugin-checker'


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
  build: {
    rollupOptions: {
      // build 시 타입 오류 무시
      onwarn(warning, warn) {
        if (warning.code === 'PLUGIN_WARNING' && warning.plugin === 'vite-plugin-checker') {
          return
        }
        warn(warning)
      }
    }
  },
  resolve: {
    alias: {
      '@image': path.resolve(__dirname, 'src/assets/image'),
      '@component' : path.resolve(__dirname, 'src/components'),
      '@api' : path.resolve(__dirname, 'src/api'),
      '@store' : path.resolve(__dirname, 'src/stores'),
      '@type' : path.resolve(__dirname, 'src/util/type')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json','.vue']
  },
  server: {
    port: 3000
  }
})
