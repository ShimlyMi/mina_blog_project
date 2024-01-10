<script setup>
// import header from './fiexd-header/index.vue'
import Sidebar from "./sidebar/index.vue";
import AppMain from "./app-main/index.vue";
</script>

<template>
  <div class="layout">
    <el-container>
      <sidebar/>
      <el-container>
        <!--      <header  />-->
        <app-main/>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>

</style>
