import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

// 引入重置样式
import "./styles/reset.scss";
// 导入公共样式
import "./styles/index.scss";
// 一定要在main.js中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
// import "./styles/tailwind.css";
import "element-plus/dist/index.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
