<script setup>
import {ref} from 'vue'
import SidebarItem from "./components/SiderbarItem.vue";
import Logo from "./components/Logo.vue"
import {sidebar} from "@/stores"

function showLogo() {
  return this.$store.state.settings.sidebarLogo
}

const routes = () => {
  return this.$router.options.routes
}
const activeMenu = () => {
  const route = this.$route
  const {meta, path} = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
}
const isCollapse = ref(true)
</script>

<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="!isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active=""
        :unique-opened="false"
        active-text-color="#409EFF"
        background-color="#304156"
        mode="vertical"
        text-color="#bfcbd9"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :base-path="route.path" :item="route"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>

</style>
