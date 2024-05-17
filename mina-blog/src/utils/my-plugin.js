import Websocket from "@/utils/websocket.js";

const MyPlugin = {
    install(Vue) {
        Vue.prototype.$websocket = new Websocket('ws://localhost:8080')
    }
}
