<script setup lang="ts" name="Message">
import { useColumns } from "@/views/message/index";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import Delete from "@iconify-icons/ep/delete";

const {
  param,
  loading,
  columns,
  dataList,
  tableSize,
  pagination,
  loadingConfig,
  onSearch,
  resetParam,
  onSizeChange,
  onCurrentChange,
  deleteBatch,
  handleSelectionChange
} = useColumns();
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">留言管理</div>
    </template>
    <el-space class="float-right mb-4">
      <el-radio-group size="small" v-model="tableSize">
        <el-radio-button label="large">大</el-radio-button>
        <el-radio-button label="default">中</el-radio-button>
        <el-radio-button label="small">小</el-radio-button>
      </el-radio-group>
    </el-space>
    <el-form
      :model="param"
      :inline="true"
      label-suffix=":"
      class="bg-bg_color w-[99/100]"
    >
      <el-form-item label="留言内容" prop="user_name">
        <el-input
          v-model="param.message"
          placeholder="请输入留言内容"
          clearable
        />
      </el-form-item>
      <el-form-item label="留言时间" prop="user_name">
        <el-date-picker
          v-model="param.time"
          type="daterange"
          placeholder="请选择留言时间段"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
          >搜索</el-button
        >
        <el-button :icon="useRenderIcon(Refresh)" @click="resetParam"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-space class="mb-4 w-[100%] flex justify-between items-center">
      <el-button
        type="danger"
        size="small"
        :icon="useRenderIcon(Delete)"
        @click="deleteBatch"
        >批量删除</el-button
      >
    </el-space>
    <!-- 表格 -->
    <pure-table
      border
      alignWhole="center"
      row-key="id"
      showOverflowTooltip
      :columns="columns"
      :loading="loading"
      :loading-config="loadingConfig"
      :size="tableSize"
      :height="tableSize === 'small' ? 440 : 600"
      :data="dataList"
      :pagination="pagination"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      @select-change="handleSelectionChange"
    >
      <template #avatar="{ row }">
        <el-avatar :src="row.avatar">{{ row.nick_name }}</el-avatar>
      </template>
      <template #role="{ row }">
        <el-tag
          :type="row.type == 'qq' ? '' : row.type == 'wx' ? 'success' : 'info'"
          >{{ row.type }}</el-tag
        >
        <span class="ml-[5px]">{{ row.contact }}</span>
      </template>
    </pure-table>
  </el-card>
</template>

<style scoped lang="scss"></style>
