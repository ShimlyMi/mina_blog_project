<script setup lang="ts" name="Personal">
import { ref } from "vue";
import PanThumb from "@/components/PanThumb/index.vue";
import Upload from "@/components/Upload/index.vue";
import { useSite } from "@/views/personal/index";

const myInfoFormRef = ref();

const {
  myInfoForm,
  myInfoRules,
  isEditMyInfo,
  passwordForm,
  passwordRules,
  isEditPassword,
  edit,
  save,
  cancel
} = useSite();
</script>

<template>
  <div class="flex justify-between personal-card">
    <el-card class="left">
      <el-form ref="myInfoFormRef" :model="myInfoForm" :rules="myInfoRules">
        <el-form-item>
          <Upload />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
