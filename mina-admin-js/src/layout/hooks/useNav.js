import {computed} from "vue";
import {storeToRefs} from "pinia";
import {getConfig} from "@/config";
import {useRoute, useRouter} from "vue-router";
import {useAppStore} from "@/stores/modules/app";
import {usePermissionStoreHook} from "@/store/modules/permission";

const errorInfo = '当前路由配置不正确，请检查配置'

export function useNav() {
  const route = useRoute()
  const minaApp = useAppStore()
  const routers = useRouter().options.routes
  const {wholeMenus} = storeToRefs(usePermissionStoreHook())
}
