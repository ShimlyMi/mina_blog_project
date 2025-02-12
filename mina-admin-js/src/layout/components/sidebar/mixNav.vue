<script lang="ts" setup>
import extraIcon from "./extraIcon.vue";
import Search from "../search/index.vue";
import Notice from "../notice/index.vue";
import { isAllEmpty } from "@pureadmin/utils";
import { useNav } from "@/layout/hooks/useNav";
import { transformI18n } from "@/plugins/i18n";
import { ref, toRaw, watch, onMounted, nextTick } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getParentPaths, findRouteByPath } from "@/router/utils";
import { useTranslationLang } from "../../hooks/useTranslationLang";
import { usePermissionStoreHook } from "@/store/modules/permission";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import Setting from "@iconify-icons/ri/settings-3-line";
import User from "@iconify-icons/ri/user-3-fill";

const menuRef = ref();
const defaultActive = ref(null);

const { t, route } = useTranslationLang(menuRef);
const {
  device,
  logout,
  onPanel,
  resolvePath,
  user_name,
  avatar,
  getDivStyle,
  avatarsStyle
} = useNav();

function getDefaultActive(routePath) {
  const wholeMenus = usePermissionStoreHook().wholeMenus;
  /** 当前路由的父级路径 */
  const parentRoutes = getParentPaths(routePath, wholeMenus)[0];
  defaultActive.value = !isAllEmpty(route.meta?.activePath)
    ? route.meta.activePath
    : findRouteByPath(parentRoutes, wholeMenus)?.children[0]?.path;
}

onMounted(() => {
  getDefaultActive(route.path);
});

nextTick(() => {
  menuRef.value?.handleResize();
});

watch(
  () => [route.path, usePermissionStoreHook().wholeMenus],
  () => {
    getDefaultActive(route.path);
  }
);
</script>

<template>
  <div
    v-if="device !== 'mobile'"
    v-loading="usePermissionStoreHook().wholeMenus.length === 0"
    class="horizontal-header"
  >
    <el-menu
      ref="menuRef"
      :default-active="defaultActive"
      class="horizontal-header-menu"
      mode="horizontal"
      router
    >
      <el-menu-item
        v-for="route in usePermissionStoreHook().wholeMenus"
        :key="route.path"
        :index="resolvePath(route) || route.redirect"
      >
        <template #title>
          <div
            v-if="toRaw(route.meta.icon)"
            :class="['sub-menu-icon', route.meta.icon]"
          >
            <component
              :is="useRenderIcon(route.meta && toRaw(route.meta.icon))"
            />
          </div>
          <div :style="getDivStyle">
            <span class="select-none">
              {{ transformI18n(route.meta.title) }}
            </span>
            <extraIcon :extraIcon="route.meta.extraIcon" />
          </div>
        </template>
      </el-menu-item>
    </el-menu>
    <div class="horizontal-header-right">
      <!-- 菜单搜索 -->
      <Search />
      <!-- 通知 -->
      <!--      <Notice id="header-notice" />-->
      <!-- 国际化 -->
      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <div class="el-dropdown-link navbar-bg-hover select-none">
          <img :src="avatar" :style="avatarsStyle" :alt="user_name" />
          <p v-if="user_name" class="dark:text-white">{{ user_name }}</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <router-link to="/personal">
              <el-dropdown-item>
                <IconifyIconOffline :icon="User" style="margin: 5px" />
                个人中心
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="logout">
              <IconifyIconOffline :icon="LogoutCircleRLine" />
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span
        :title="t('buttons.hssystemSet')"
        class="set-icon navbar-bg-hover"
        @click="onPanel"
      >
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}

.logout {
  max-width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 10px !important;
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
