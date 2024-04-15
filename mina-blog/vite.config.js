import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from "vite-plugin-compression"; // gzip压缩
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from "path";
import requireTransform from "vite-plugin-require-transform"; // 支持require
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"; // 支持svg

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: true,
      dirs: "src/components",
      resolvers: [ElementPlusResolver()],
    }),
    viteCompression({
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      deleteOriginFile: false, //删除源文件
      threshold: 10240, //压缩前最小文件大小
      algorithm: "gzip", //压缩算法
      ext: ".gz", //文件类型
    }),
    // 让vite支持require
    requireTransform({
      fileRegex: /.js$|.vue$/,
    }),
    // svg
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), "src/icons/svg")],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [".js", ".vue", ".json"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/main.scss";`
      }
    }
  },
  server: {
    port: 3182,
    host: "0.0.0.0",
    https: false,
    open: false,
    // 热更新
    hmr: {
      overlay: false,
    },
    proxy: {
      //匹配规则
      "/api": {
        //要访问的跨域的域名
        target: "http://localhost:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // 打包输出
  build: {
    sourcemap: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      input: {
        index: resolve("index.html"),
      },
      // 静态资源分类打包
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
})
