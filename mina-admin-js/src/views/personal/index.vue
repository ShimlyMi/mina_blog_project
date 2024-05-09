<script setup lang="ts" name="Personal">
import { ref } from "vue";
import PanThumb from "@/components/PanThumb/index.vue";
import Upload from "@/components/Upload/index.vue";
import { useSite } from "@/views/personal/index";
import UploadFilled from "@iconify-icons/ep/upload-filled";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

const myInfoFormRef = ref();
const passwordFormRef = ref();
/** 切换弹框 */
const toggleShow = () => {
  showImageUpload.value = !showImageUpload.value;
};

const closeDialog = () => {
  showImageUpload.value = false;
};

const {
  myInfoForm,
  myInfoRules,
  isEditMyInfo,
  passwordForm,
  passwordRules,
  isEditPassword,
  showImageUpload,
  edit,
  save,
  cancel
} = useSite();
</script>

<template>
  <div class="flex justify-between personal-card">
    <!-- 个人信息管理 -->
    <el-card class="left">
      <template #header>
        <div class="header">
          个人信息管理
          <div v-if="isEditMyInfo">
            <el-button
              type="primary"
              plain
              @click="cancel('info', myInfoFormRef)"
              >取消</el-button
            >
            <el-button type="primary" plain @click="save('info', myInfoFormRef)"
              >保存</el-button
            >
          </div>
          <el-button v-else type="primary" plain @click="edit('info')"
            >编辑</el-button
          >
        </div>
      </template>
      <el-form ref="myInfoFormRef" :model="myInfoForm" :rules="myInfoRules">
        <el-form-item>
          <div class="component-item">
            <pan-thumb width="100px" height="100px" :image="myInfoForm.avatar">
              {{ myInfoForm.nick_name }}
            </pan-thumb>
          </div>
          <el-button
            type="primary"
            :icon="useRenderIcon(UploadFilled)"
            style="margin-left: 10px"
            @click="toggleShow"
          >
            修改头像
          </el-button>
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name">
          <el-input
            v-if="isEditMyInfo"
            v-model="myInfoForm.nick_name"
            placeholder="请输入昵称"
            maxlength="20"
            clearable
            >{{ myInfoForm.nick_name }}</el-input
          >
          <span v-else>{{ myInfoForm.nick_name }}</span>
        </el-form-item>
      </el-form>
      <el-dialog v-model="showImageUpload" :width="400" title="头像上传">
        <Upload
          v-model:file-list="myInfoForm.avatarList"
          :limit="1"
          :width="150"
          :height="150"
          :preview="isEditMyInfo"
        />
        <template #footer>
          <div class="dialog-footer">
            <el-button type="info" plain @click="closeDialog">取消</el-button>
            <el-button type="danger" plain @click="save('info', myInfoFormRef)"
              >保存</el-button
            >
          </div>
        </template>
      </el-dialog>
    </el-card>

    <!-- 密码管理 -->
    <el-card class="right">
      <template #header>
        <div class="header">
          密码管理
          <div v-if="isEditPassword">
            <el-button
              type="primary"
              plain
              @click="cancel('password', myInfoFormRef)"
              >取消</el-button
            >
            <el-button
              type="primary"
              plain
              @click="save('password', myInfoFormRef)"
              >保存</el-button
            >
          </div>
          <el-button v-else type="primary" plain @click="edit('password')"
            >编辑</el-button
          >
        </div>
      </template>
      <el-form
        v-if="isEditPassword"
        ref="passwordFormRef"
        label-width="120"
        :model="passwordForm"
        :rule="passwordRules"
      >
        <el-form-item label="原密码" prop="password">
          <el-input
            v-model="passwordForm.password"
            show-password
            minlength="6"
            maxlength="18"
            placeholder="请输入原密码"
            clearable
          />
        </el-form-item>
        <el-form-item label="新密码" prop="password1">
          <el-input
            v-model="passwordForm.password1"
            show-password
            minlength="6"
            maxlength="18"
            placeholder="请输入新密码"
            clearable
          />
        </el-form-item>
        <el-form-item label="二次确认密码" prop="password2">
          <el-input
            v-model="passwordForm.password2"
            show-password
            minlength="6"
            maxlength="18"
            placeholder="请输入二次确认密码"
            clearable
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.hide-upload {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}

.personal-card {
  height: 82vh;

  .left {
    .user-avatar {
      margin-left: 30px;
    }
  }
}

.user-avatar {
  margin-left: 30px;
  height: 80px;
  width: 80px;
  z-index: 999;

  :deep(.el-upload-list__item) {
    width: 80px !important;
    height: 80px !important;
    margin: 0 !important;
    border: none !important;
    border-radius: 80px;
  }

  :deep(.el-upload-list--picture-card) {
    width: 80px !important;
    height: 80px !important;
    margin: 0 !important;
    border: none !important;
    border-radius: 80px;
  }

  :deep(.el-upload--picture-card) {
    width: 80px !important;
    height: 80px !important;
    border-radius: 80px;
  }
}

:deep(.el-card__body) {
  height: 90%;
}

@media screen and (min-width: 798px) {
  .personal-card {
    display: flex;
    justify-content: flex-start;
  }

  .left {
    width: 48%;
    height: 100%;
  }

  .right {
    margin-left: 20px;
    width: 40%;
    height: 100%;
  }
}

@media screen and (max-width: 798px) {
  .personal-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .left {
    width: 100%;
    height: 50%;
  }

  .right {
    margin-top: 20px;
    width: 100%;
    height: 50%;
  }
}
</style>
