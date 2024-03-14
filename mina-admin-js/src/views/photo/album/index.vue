<script setup lang="ts">
import Plus from "@iconify-icons/ep/plus";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
</script>

<template>
<el-card>
  <template #header>
    <div class="flex justify-between items-center">
      相册管理
      <el-button type="primary" plain :icon="useRenderIcon(Plus)" v-waves>新增相册</el-button>
    </div>
  </template>
  <!-- 主体内容 -->
  <el-row>
    <el-col :xs="24" :sm="6">
      <div>
        <div class="flex_r_between pad_5">
          <!-- 相册标题 -->
          <div class="album-title">
            <span></span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</el-card>
</template>

<style scoped lang="scss">

</style>
