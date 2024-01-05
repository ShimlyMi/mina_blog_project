'use strict'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'

const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, ".", dir)
}

const name = defaultSettings.title || '米娜小屋的后台'
const port = process.env.VITE_PORT || 8896

// https://vitejs.dev/config/
export default defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      'build': resolve('build')
    },
  },
  server: {
    port: port,
    host: "0.0.0.0",
    open: false,
    proxy: {
      "/api": {
        // 要访问的跨域域名
        target: "http://127.0.0.1:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
})
