<script setup lang="ts" name="AddEditTalk">
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElLoading } from "element-plus";
import { conversion, imgUpload } from "@/api/site";
import { message } from "@/utils/message";
import { addPhotos } from "@/api/photo";
import Upload from "@/components/Upload/index.vue";

const route = useRoute();
const router = useRouter();

const currentAlbumName = ref(null);
const currentAlbumId = ref(null);

const imgUploadList = ref([]);

const save = async () => {
  if (!currentAlbumId.value) {
    message("请重新选择相册上传图片", { type: "error" });
    return;
  }

  const finalList = [];
  /** 批量压缩 */
  const conversionLoading = ElLoading.service({
    fullscreen: true,
    text: "图片压缩中"
  });
  const conversionPromiseList = imgUploadList.value.map(async v => {
    return await conversion(v.raw);
  });
  const conversionUploadList = [];
  await Promise.all(conversionPromiseList).then(res => {
    res.map(raw => {
      conversionUploadList.push({ raw });
    });
  });
  conversionLoading.close();

  // 图片上传
  const imgUpLoading = ElLoading.service({
    fullscreen: true,
    text: "图片正在努力上传中，请耐心等待......"
  });
  const promiseList = conversionUploadList.map(async v => {
    return await imgUpload(v);
  });
  await Promise.all(promiseList).then(res => {
    res.map(img => {
      if (img.code == 0) {
        const { url } = img.result;
        finalList.push({ album_id: currentAlbumId.value, url: url });
      } else {
        message("图片上传失败", { type: "error" });
      }
    });
  });
  imgUpLoading.close();

  /** 新增 / 修改说说  */
  const imgSaveLoading = ElLoading.service({
    fullscreen: true,
    text: "图片正在保存......"
  });
  const addPicsRes = await addPhotos({ photoList: finalList });
  if (addPicsRes.code == 0) {
    message("图片保存成功", { type: "success" });
  } else {
    imgSaveLoading.close();
    message("图片保存失败，请重新添加", { type: "error" });
  }
  imgSaveLoading.close();

  await router.push({
    path: "/photo/list",
    query: {
      id: currentAlbumId.value,
      albumName: currentAlbumName.value
    }
  });
};

const cancel = () => {
  router.push({
    path: "/photo/list",
    query: {
      id: currentAlbumId.value,
      albumName: currentAlbumName.value
    }
  });
};

onMounted(() => {
  if (route.query.id && route.query.albumName) {
    currentAlbumName.value = route.query.albumName;
    currentAlbumId.value = route.query.id;
  }
});
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <span style="font-weight: 600; color: #606266">图库名称 - {{ currentAlbumName }}</span>
        <div>
          <el-button type="info" size="small" @click="cancel" plain>取消</el-button>
          <el-button type="danger" size="small" @click="save">保存</el-button>
        </div>
      </div>
    </template>
    <div class="album-upload">
      <Upload
          v-model:fileList="imgUploadList"
          :limit="9"
          :width="100"
          :height="100"
          :multiple="true"
          :preview="false"
      />
      <div class="tips">
        <span />
        tips: 最多上传9张照片，并且总大小不能超过30M
      </div>
    </div>

  </el-card>
</template>
<style scoped lang="scss">
.album-upload {
  height: calc(100vh - 260px);
  overflow: auto;
}

.tips {
  font-size: 0.8rem;
  color: #f56c6c;
}

//:deep(.el-card__body) {
//  padding: 5px 5px 0 5px !important;
//}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 108px !important;
  height: 108px !important;
  margin: 3px !important;
  border: none !important;
  border-radius: 0;
}

:deep(.el-upload--picture-card) {
  width: 108px !important;
  height: 108px !important;
  margin: 3px !important;
}

:deep(.el-upload-list__item-cover) {
  object-fit: cover !important;
}
</style>
