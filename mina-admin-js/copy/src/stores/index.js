import {createPinia} from "pinia";
import persist from 'pinia-plugin-persistedstate'
import getters from "@/stores/getters";
import {useUserStoreHook} from './modules/user'


const store = createPinia()
store.use(persist)


export {
  store,
    useUserStoreHook,
    getters
}


