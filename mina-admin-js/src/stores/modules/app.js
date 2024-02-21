import {store} from '@/stores'
import {defineStore} from 'pinia'
import {storageLocal, deviceDetection} from '@pureadmin/utils'
import {getConfig} from '@/config'

export const useAppStore = defineStore({
  id: 'mina-app',
  state: () => {
    return {
      sidebar: {
        opened: storageLocal().getItem("responsive-layout")?.sidebarStatus ?? getConfig().SidebarStatus,
        withoutAnimation: false,
        isClickCollapse: false,
      },
      // 这里的layout 用于 监听容器拖拉后恢复对应的导航模式
      layout: storageLocal().getItem("responsive-layout")?.layout ?? getConfig().Layout,
      device: deviceDetection() ? "mobile" : "desktop"
    }
  },
  getters: {
    // 获取 sidebar 状态
    getSidebarStatus() {
      return this.sidebar.opened
    },
    // 获取 设备
    getDevice() {
      return this.device
    }
  },
  actions: {
    TOGGLE_SIDEBAR(opened, resize) {
      const layout = storageLocal().getItem("responsive-layout")
      if (opened && resize) {
        this.sidebar.withoutAnimation = true
        this.sidebar.opened = true
        layout.sidebarStatus = true
      } else if (!opened && resize) {
        this.sidebar.withoutAnimation = true
        this.sidebar.opened = false
        layout.sidebarStatus = false
      } else if (!opened && !resize) {
        this.sidebar.withoutAnimation = false
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.isClickCollapse = !this.sidebar.isClickCollapse
        layout.sidebarStatus = this.sidebar.opened
      }
      storageLocal().setItem("responsive-layout", layout)
    },
    async toggleSideBar(opened, resize) {
      await this.TOGGLE_SIDEBAR(opened, resize)
    },
    toggleDevice(device) {
      this.device = device
    },
    setLayout(layout) {
      this.layout = layout
    }
  }
})

export function useAppStoreHook() {
  return useAppStore(store)
}
