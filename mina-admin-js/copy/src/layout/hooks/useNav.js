import {computed} from "vue";
import {storeToRefs} from "pinia";
import {getConfig} from "@/config";
import {useRoute, useRouter} from "vue-router";
import {useAppStore} from "@/stores/modules/app";
import {usePermissionStoreHook} from "@/store/modules/permission";
import {useUserStoreHook} from "@/stores/modules/user";
import router from "@/router";

const errorInfo = '当前路由配置不正确，请检查配置'

export function useNav() {
  const route = useRoute()
  const minaApp = useAppStore()
  const routers = useRouter().options.routes
  // const {wholeMenus} = storeToRefs(usePermissionStoreHook())

  /** 平分`layout`中所有`el-tooltip`的`effect`配置，默认`light` */
  const tooltipEffect = getConfig()?.TooltipEffect ?? 'light'

  /** 用户名 */
  const user_name = computed(() => {
    return useUserStoreHook()?.user_name
  })
  /** 昵称 */
  const nick_name = computed(() => {
    return useUserStoreHook().getNickName
  })
  const isCollapse = computed(() => {
    return !minaApp.getDevice
  })

  /** 动态 title */
  function changeTitle(meta) {
    const Title = getConfig().Title
    if (Title) document.title = `${meta.title} | ${Title}`
    else document.title = meta.title
  }

  /** 退出登录 */
  function logout() {
    useUserStoreHook().logOut()
  }

  function backHome() {
    router.push("/home").then()
  }

  function toggleSideBar() {
    minaApp.toggleSideBar()
  }

  return {
    route,
    routers,
    tooltipEffect,
    user_name,
    nick_name,
    isCollapse,
    changeTitle,
    logout,
    backHome,
    toggleSideBar,
  }
}

