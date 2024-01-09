import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    port: parseInt(process.env.VITE_APP_WEB_PORT || '3000'),
},
  resolve: {
    
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
