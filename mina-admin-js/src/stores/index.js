import {createPinia} from "pinia";
import persist from 'pinia-plugin-persistedstate'
import getters from "@/stores/getters";
import {useUserStoreHook} from './modules/user'
import sidebar from "@/stores/modules/app";

const store = createPinia()
store.use(persist)

export default store

export {
    useUserStoreHook,
    sidebar,
    getters
}


