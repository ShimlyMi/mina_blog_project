import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入样式
import "./assets/css/iconfont/iconfont.css";


// animate
import "animate.css";

const app = createApp(App)

app.use(createPinia().use(piniaPersist));
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
