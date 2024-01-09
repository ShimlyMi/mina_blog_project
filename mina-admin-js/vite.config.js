'use strict'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

import path from 'path'

const defaultSettings = require('./src/settings.js')

function pathResolve(dir) {
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
          '@': pathResolve('src')
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
      // svgLoader(),
      AutoImport({
          resolvers: [ElementPlusResolver()],
      }),
      Components({
          resolvers: [ElementPlusResolver()],
      }),
  ],
  resolve: {
    alias: {
        '@': pathResolve('src'),
        'build': pathResolve('build')
    },
  },
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: `@import "./src/styles/index.scss";`
    //         }
    //     }
    // },
  server: {
    port: port,
    host: "0.0.0.0",
    open: false,
    proxy: {
      "/api": {
        // 要访问的跨域域名
          target: "http://localhost:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
    build: {
        sourcemap: false,
        // 消除打包大小超过500kb警告
        chunkSizeWarningLimit: 4000,
        rollupOptions: {
            input: {
                index: pathResolve("index.html")
            },
            // 静态资源分类打包
            output: {
                chunkFileNames: "static/js/[name]-[hash].js",
                entryFileNames: "static/js/[name]-[hash].js",
                assetFileNames: "static/[ext]/[name]-[hash].[ext]"
            }
        }
    },
})
