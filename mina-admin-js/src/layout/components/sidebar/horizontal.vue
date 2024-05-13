<script lang="ts" setup>
import Search from "../search/index.vue";
import Notice from "../notice/index.vue";
import SidebarItem from "./sidebarItem.vue";
import { isAllEmpty } from "@pureadmin/utils";
import { ref, nextTick, computed } from "vue";
import { useNav } from "@/layout/hooks/useNav";
import { useTranslationLang } from "../../hooks/useTranslationLang";
import { usePermissionStoreHook } from "@/store/modules/permission";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import Setting from "@iconify-icons/ri/settings-3-line";
import User from "@iconify-icons/ri/user-3-fill";

const menuRef = ref();

const { t, route } = useTranslationLang(menuRef);
const { title, logout, backTopMenu, onPanel, user_name, avatar, avatarsStyle } =
  useNav();

const defaultActive = computed(() =>
  !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path
);

nextTick(() => {
  menuRef.value?.handleResize();
});
</script>

<template>
  <div
    v-loading="usePermissionStoreHook().wholeMenus.length === 0"
    class="horizontal-header"
  >
    <div class="horizontal-header-left" @click="backTopMenu">
      <img alt="logo" src="/logo.svg" />
      <span>{{ title }}</span>
    </div>
    <el-menu
      ref="menuRef"
      :default-active="defaultActive"
      class="horizontal-header-menu"
      mode="horizontal"
      router
    >
      <sidebar-item
        v-for="route in usePermissionStoreHook().wholeMenus"
        :key="route.path"
        :base-path="route.path"
        :item="route"
      />
    </el-menu>
    <div class="horizontal-header-right">
      <!-- 菜单搜索 -->
      <Search />
      <!-- 通知 -->
      <!--      <Notice id="header-notice" />-->
      <!-- 国际化 -->
      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <div class="el-dropdown-link navbar-bg-hover">
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
              <IconifyIconOffline
                :icon="LogoutCircleRLine"
                style="margin: 5px"
              />
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
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
