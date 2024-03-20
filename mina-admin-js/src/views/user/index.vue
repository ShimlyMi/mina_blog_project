<script setup lang="ts" name="userManagement">
import { ref } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import EditPen from "@iconify-icons/ep/edit-pen";
import Upload from "@/components/Upload/index.vue";
import { useColumns } from "./index";

const { param, columns, tableForm } = useColumns();
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">用户管理</div>
    </template>
    <el-space class="float-right mb-4">
      <el-radio-group size="small">
        <el-radio-button label="large">大</el-radio-button>
        <el-radio-button label="default">中</el-radio-button>
        <el-radio-button label="small">小</el-radio-button>
      </el-radio-group>
    </el-space>
    <el-form :inline="true" label-suffix=":" class="bg-bg_color w-[99/100]">
      <el-form-item label="用户昵称">
        <el-input placeholder="请输入昵称" clearable class="!w-[100px]" />
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select placeholder="选择用户角色" clearable class="!w-[100px]">
          <el-option label="管理员" :value="1" />
          <el-option label="普通用户" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="useRenderIcon(Search)">搜索</el-button>
        <el-button :icon="useRenderIcon(Refresh)">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <pure-table :columns="columns" border>
     <template #avatar="{ row }">
       <el-avatar :size="45" :src="row.avatar" />
     </template>
    </pure-table>
  </el-card>
</template>

<style scoped lang="scss">

</style>
