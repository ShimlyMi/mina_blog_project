import {defineStore} from "pinia";
import {store} from "@/stores";

export const usePermissionStore = defineStore({
  id: "mina-permission",
  state: () => ({
    // 静态路由生成的菜单
    constantMenus: [],
    // 整体路由什么生成的菜单(静态、动态)
    wholeMenus: [],
    // 缓存页面生成的菜单
    cachePageList: []
  }),
  actions: {
    /** 组装整体路由生成的菜单 */

  }
})
