// 引入样式
import "./assets/css/iconfont/iconfont.css";
import 'normalize.css'
import '@/styles/main.scss'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia().use(piniaPersist));
app.use(router)

app.mount('#app')
