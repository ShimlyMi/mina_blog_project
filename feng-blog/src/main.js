import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "element-plus/dist/index.css"; // 引入样式
import "element-plus/theme-chalk/dark/css-vars.css";
// 引入动画
import Particles from 'particles.vue3'
import VueKinesis from "vue-kinesis";
// 引入样式
import "./assets/css/iconfont/iconfont.css";
import 'normalize.css'
import '@/styles/base.scss'

// animate
// import "animate.css";

const app = createApp(App)

app.use(createPinia().use(piniaPersist));
app.use(Particles)
app.use(VueKinesis)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
