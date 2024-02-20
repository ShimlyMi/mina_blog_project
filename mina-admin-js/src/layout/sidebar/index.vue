<script setup>
import SidebarItem from "./components/SiderbarItem.vue";

</script>

<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :active-text-color="variables.menuActiveText"
          :background-color="variables.menuBg"
          :collapse="isCollapse"
          :collapse-transitionz="false"
          :default-active="activeMenu"
          :text-color="variables.menuText"
          :unique-opened="false"
          mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :base-path="route.path" :item="route"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>

</style>
