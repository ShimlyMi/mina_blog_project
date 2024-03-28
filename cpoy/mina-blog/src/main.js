import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

// 引入样式
import "./assets/css/iconfont/iconfont.css";
import 'normalize.css'
import 'element-plus/dist/index.css'
import "element-plus/theme-chalk/dark/css-vars.css";
// tailwind.css  https://www.tailwindcss.cn/docs
import "./styles/tailwind.scss";
// svg
// import "virtual:svg-icons-register";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia().use(piniaPluginPersist));
app.use(router)

app.mount('#app')
