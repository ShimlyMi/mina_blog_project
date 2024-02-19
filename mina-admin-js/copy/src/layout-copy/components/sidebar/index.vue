<script>
import {mapGetters} from 'vuex'
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import variables from '@/styles/variables.scss'

export default {
  components: {SidebarItem, Logo},
  computed: {
    ...mapGetters([
      "sidebar"
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const {meta, path} = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$route.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}

</script>

<template>
  <div :class="{'has-logo': showLogo}">
    <logo collapse="collapse>"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :active-text-color="variables.menuActiveText"
          :background-color="variables.menuBg"
          :collapse="isCollapse"
          :collapse-transition="false"
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
