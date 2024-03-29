<script setup lang="ts" name="websiteManagement">
import { ref } from "vue";
import { useWebsite } from "./index";
import Upload from "@/components/Upload/index.vue";

const siteInfoFromRef = ref();

const {
  loading,
  siteInfoForm,
  siteInfoRules,
  isEditSiteInfo,
  save,
  edit,
  cancel
} = useWebsite();
</script>

<template>
  <el-form
    label-width="100"
    ref="siteInfoFromRef"
    :model="siteInfoForm"
    :rules="siteInfoRules"
    label-suffix=":"
  >
    <div class="site-layout">
      <el-card class="site-card">
        <template #header>
          <div v-if="isEditSiteInfo">
            <el-button type="info" plain @click="cancel">取消</el-button>
            <el-button
              type="danger"
              plain
              :disabled="loading"
              :loading="loading"
              @click="save('site', siteInfoFromRef)"
              >保存</el-button
            >
          </div>
          <el-button v-else type="primary" plain @click="edit('site')"
            >编辑</el-button
          >
        </template>
        <el-form-item class="avatar-form" prop="blog_avatar">
          <div class="bg-upload">
            <Upload
              v-model:file-list="siteInfoForm.bgList"
              :limit="1"
              :preview="!isEditSiteInfo"
              :width="300"
              :height="140"
            />
          </div>
          <div class="avatar-upload">
            <Upload
              v-model:file-list="siteInfoForm.avatarList"
              :limit="1"
              :preview="!isEditSiteInfo"
              :width="60"
              :height="60"
            />
          </div>
        </el-form-item>
        <el-form-item label="博客名称" prop="blog_name">
          <el-input
            v-if="isEditSiteInfo"
            v-model="siteInfoForm.blog_name"
            clearable
            placeholder="请输入博客名称"
            maxlength="20"
          />
          <span v-else>{{ siteInfoForm.blog_name }}</span>
        </el-form-item>
        <el-form-item label="个性签名" prop="personality_signature">
          <el-input
            type="textarea"
            v-if="isEditSiteInfo"
            v-model="siteInfoForm.personality_signature"
            clearable
            placeholder="请输入个性签名"
            maxlength="225"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
            show-word-limit
          />
          <span v-else>{{
            siteInfoForm.personality_signature || "这个人很懒什么也没留下~"
          }}</span>
        </el-form-item>
        <el-form-item label="博客公告">
          <el-input
            type="textarea"
            v-if="isEditSiteInfo"
            v-model="siteInfoForm.blog_notice"
            placeholder="请输入博客公告"
            maxlength="225"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
            show-word-limit
          />
          <span v-else>{{ siteInfoForm.blog_notice || "暂无公告" }}</span>
        </el-form-item>
      </el-card>
    </div>
  </el-form>
</template>

<style lang="scss" scoped>
.flex_row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-card {
  height: 82vh;
  position: relative;

  :deep(.el-card__body) {
    height: 100%;
    overflow: auto;
  }

  :deep(.el-card__body::-webkit-scrollbar) {
    display: none;
    /* Chrome Safari */
  }

  .avatar-form {
    height: 160px;
    margin-left: -50px;
  }

  .site-avatar {
    margin: 100px 0 0 30px;
    z-index: 999;
  }

  .site-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 140px;
  }
}

.hide-upload {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}

.bg-upload {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  :deep(.el-upload--picture-card) {
    width: 300px;
    height: 140px;
  }

  :deep(.el-upload-list__item) {
    width: 300px;
    height: 140px;
    border: none;
  }

  :deep(.el-upload-list--picture-card) {
    width: 300px;
    height: 140px;
    border: none;
  }
}

.avatar-upload {
  margin: 100px 0 0 30px;
  height: 60px;
  width: 60px;

  :deep(.el-upload--picture-card) {
    width: 60px !important;
    height: 60px !important;
    border-radius: 30px !important;
  }

  :deep(.el-upload-list__item) {
    width: 60px !important;
    height: 60px !important;
    border-radius: 30px !important;
    margin: 0;
  }

  :deep(.el-upload-list--picture-card) {
    width: 60px !important;
    height: 60px !important;
    border-radius: 30px !important;
  }
}

.link-cover {
  :deep(.el-form-item__content) {
    height: 80px;
  }

  :deep(.el-upload-list__item) {
    width: 80px !important;
    height: 80px !important;
    margin: 0 !important;
    border: none !important;
  }

  :deep(.el-upload--picture-card) {
    width: 80px !important;
    height: 80px !important;
  }

  :deep(.el-upload-list--picture-card) {
    width: 80px !important;
    height: 80px !important;
  }
}

:deep(.el-card__body) {
  height: 90%;
}

@media screen and (max-width: 798px) {
  .site-layout {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .site-card {
    width: 100%;
  }
}

@media screen and (min-width: 798px) {
  .site-layout {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .site-card {
    width: 48%;
  }
}
</style>
