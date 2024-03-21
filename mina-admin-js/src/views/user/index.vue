<script setup lang="ts" name="userManagement">
import { ref } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import EditPen from "@iconify-icons/ep/edit-pen";
import Upload from "@/components/Upload/index.vue";
import { useColumns } from "./index";

const userFormRef = ref(null);

const {
  param,
  columns,
  tableForm,
  tableSize,
  tableFormRules,
  dataList,
  dialogVisible,
  loading,
  loadingConfig,
  pagination,
  resetParam,
  onSizeChange,
  onCurrentChange,
  roleChange,
  closeDialog,
  editUser,
  submitForm,
  onSearch
} = useColumns();
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">用户管理</div>
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
      <el-form-item label="用户昵称" prop="nick_name">
        <el-input
          v-model="param.nick_name"
          placeholder="请输入昵称"
          clearable
          class="!w-[100px]"
        />
      </el-form-item>
      <el-form-item label="用户角色" prop="role">
        <el-select
          v-model="param.role"
          placeholder="选择用户角色"
          clearable
          class="!w-[100px]"
        >
          <el-option label="管理员" :value="1" />
          <el-option label="普通用户" :value="2" />
        </el-select>
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
    >
      <template #avatar="{ row }">
        <el-avatar :size="45" :src="row.avatar" />
      </template>
      <template #role="{ row }">
        <el-switch
          v-model="row.role"
          :active-value="1"
          :inactive-value="2"
          active-text="管理员"
          inactive-text="普通用户"
          inline-prompt
          @change="roleChange(row)"
        />
      </template>
      <template #operation="{ row }">
        <el-button
          class="reset-margin"
          link
          type="primary"
          size="small"
          :icon="useRenderIcon(EditPen)"
          @click="editUser(row)"
          >修改</el-button
        >
      </template>
    </pure-table>
    <el-dialog
      title="编辑用户"
      v-model="dialogVisible"
      :width="400"
      draggable
      :before-close="closeDialog"
    >
      <el-form
        ref="userFormRef"
        :model="tableForm"
        :rules="tableFormRules"
        label-width="100px"
        label-suffix=":"
      >
        <el-form-item label="昵称" prop="nick_name">
          <el-input
            v-model="tableForm.nick_name"
            :style="{ width: '300px' }"
            placeholder="请输入昵称"
            clearable
          />
        </el-form-item>
        <el-form-item label="头像" class="user-avatar">
          <Upload
            v-model:file-list="tableForm.avatarList"
            :width="80"
            :height="80"
            :limit="1"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm(userFormRef)"
          >保存</el-button
        >
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped lang="scss"></style>
