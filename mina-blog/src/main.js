// import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// 引入样式
// import ElementPlus from 'element-plus';
// 数据持久化
import pinaPluginPersist from 'pinia-plugin-persist'
// 引入样式
import "./assets/css/iconfont/iconfont.css";
import 'normalize.css';
import 'element-plus/dist/index.css';
import "element-plus/theme-chalk/dark/css-vars.css";
// tailwind.css  https://www.tailwindcss.cn/docs
import "./styles/tailwind.scss";

import App from './App.vue';
import router from './router';
// 引入ep图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 指令
import vCopy from "@/directives/copy.js";
import image from "@/directives/imageLoading.js";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.directive("copy", vCopy);
app.directive("image", image);
app.use(router).use(createPinia().use(pinaPluginPersist)).mount('#app');
