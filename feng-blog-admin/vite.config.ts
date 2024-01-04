import { fileURLToPath, URL } from 'node:url'
import * as path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {resolve} from "path";
import dayjs from "dayjs";

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};
/** 设置别名 */
// const alias: Record<string, string> = {
//   "@": pathResolve("src"),
//   "@build": pathResolve("build")
// };



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': pathResolve("src"),
      '@build': pathResolve("build"),
    }
  },
  server: {
    host: "0.0.0.0",
    open: false,
    proxy: {
      "/api": {
        // 要访问的跨域域名
        target: "http://127.0.0.1:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,""),
      }
    }
  }
})
