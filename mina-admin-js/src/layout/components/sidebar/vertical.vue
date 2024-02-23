<script lang="ts" setup>
import Logo from "./logo.vue";
import {useRoute} from "vue-router";
import {emitter} from "@/utils/mitt";
import SidebarItem from "./sidebarItem.vue";
import leftCollapse from "./leftCollapse.vue";
import {useNav} from "@/layout/hooks/useNav";
import {responsiveStorageNameSpace} from "@/config";
import {storageLocal, isAllEmpty} from "@pureadmin/utils";
import {findRouteByPath, getParentPaths} from "@/router/utils";
import {usePermissionStoreHook} from "@/store/modules/permission";
import {ref, computed, watch, onMounted, onBeforeUnmount} from "vue";

const route = useRoute();
const showLogo = ref(
  storageLocal().getItem<StorageConfigs>(
    `${responsiveStorageNameSpace()}configure`
  )?.showLogo ?? true
);

const {device, minaApp, isCollapse, menuSelect, toggleSideBar} = useNav();

const subMenuData = ref([]);

const menuData = computed(() => {
  return minaApp.layout === "mix" && device.value !== "mobile"
    ? subMenuData.value
    : usePermissionStoreHook().wholeMenus;
});

const loading = computed(() =>
  minaApp.layout === "mix" ? false : menuData.value.length === 0 ? true : false
);

const defaultActive = computed(() =>
  !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path
);

function getSubMenuData() {
  let path = "";
  path = defaultActive.value;
  subMenuData.value = [];
  // path的上级路由组成的数组
  const parentPathArr = getParentPaths(
    path,
    usePermissionStoreHook().wholeMenus
  );
  // 当前路由的父级路由信息
  const parenetRoute = findRouteByPath(
    parentPathArr[0] || path,
    usePermissionStoreHook().wholeMenus
  );
  if (!parenetRoute?.children) return;
  subMenuData.value = parenetRoute?.children;
}

watch(
  () => [route.path, usePermissionStoreHook().wholeMenus],
  () => {
    if (route.path.includes("/redirect")) return;
    getSubMenuData();
    menuSelect(route.path);
  }
);

onMounted(() => {
  getSubMenuData();

  emitter.on("logoChange", key => {
    showLogo.value = key;
  });
});

onBeforeUnmount(() => {
  // 解绑`logoChange`公共事件，防止多次触发
  emitter.off("logoChange");
});
</script>

<template>
  <div
    v-loading="loading"
    :class="['sidebar-container', showLogo ? 'has-logo' : '']"
  >
    <Logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar
      :class="[device === 'mobile' ? 'mobile' : 'pc']"
      wrap-class="scrollbar-wrapper"
    >
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="defaultActive"
        class="outer-most select-none"
        mode="vertical"
        router
        unique-opened
      >
        <sidebar-item
          v-for="routes in menuData"
          :key="routes.path"
          :base-path="routes.path"
          :item="routes"
          class="outer-most select-none"
        />
      </el-menu>
    </el-scrollbar>
    <leftCollapse
      v-if="device !== 'mobile'"
      :is-active="minaApp.sidebar.opened"
      @toggleClick="toggleSideBar"
    />
  </div>
</template>

<style scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}
</style>
