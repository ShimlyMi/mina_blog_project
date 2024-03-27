import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            directoryAsNamespace: true,
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            directoryAsNamespace: true,
        }),

    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        }
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
})
