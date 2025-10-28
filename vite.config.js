import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有以 'ion-' 开头的标签都视为自定义元素
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // ✅ 新增 server 部分
  server: {
    host: '0.0.0.0',  // 允许外部访问（局域网）
    port: 5173,       // 自定义端口（默认5173）
    open: true,       // 自动打开浏览器（可选）
  },
})
