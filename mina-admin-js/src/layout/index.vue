<script setup>
import FixedHeader from './fiexd-header/index.vue'
import Sidebar from "./sidebar/index.vue";
import AppMain from "./app-main/index.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <sidebar/>
      </el-aside>
      <el-container>
        <el-header>
          <fixed-header/>
        </el-header>
        <el-main>
          <app-main/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>

</style>
