import {createApp} from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import store from "@/stores";

// 引入重置样式
import "./styles/reset.scss";
import 'normalize.css';
// 导入公共样式
import "./styles/index.scss";
import "./assets/css/iconfont/iconfont.css";
// 一定要在main.js中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./styles/tailwind.css";

import "element-plus/dist/index.css";

import "@/permission"

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(store)
app.use(router)

app.mount('#app')
