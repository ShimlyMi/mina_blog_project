<script lang="ts" setup>
defineOptions({
  name: "Welcome"
});
import Line from "./components/figures.vue";
import PanelGroup from "./components/panel.vue";
</script>

<template>
  <div class="home">
<!--    <template #header>首页</template>-->
    <panel-group />
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <el-col :span="24">
        <Line />
      </el-col>
    </el-row>
  </div>
</template>
