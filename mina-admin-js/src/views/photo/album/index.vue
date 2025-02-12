<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Plus from "@iconify-icons/ep/plus";
import More from "@iconify-icons/ri/more-2-fill";
import Edit from "@iconify-icons/ep/edit";
import Delete from "@iconify-icons/ep/delete";
import Upload from "@/components/Upload/index.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import type { FormInstance } from "element-plus";
import { ElLoading } from "element-plus";
import { imgUpload } from "@/api/site";
import { updateAlbum, addAlbum, deleteAlbum, getAlbumList } from "@/api/photo";
import { message } from "@/utils/message";
import { cloneDeep } from "@pureadmin/utils";

const coverV = (callback: any) => {
  if (!albumForm.coverList.length) {
    return new Error("请上传相册封面");
  }
  callback();
};

const router = useRouter();
const albumList = ref([]);
const albumTotal = ref(0);
const param = reactive({
  current: 1,
  size: 10,
  album_name: ""
});

/** 新增相册 编辑相册 */
const dialogVisible = ref(false);
const albumFormRef = ref();
const albumForm = reactive({
  id: "",
  album_name: "",
  description: "",
  album_cover: "",
  coverList: []
});
const primaryAlbumForm = reactive({ ...albumForm });
const albumFormRules = reactive({
  album_name: {
    required: true,
    message: "请输入相册名称",
    trigger: ["blur"]
  },
  description: {
    required: true,
    message: "请输入相册描述",
    trigger: ["blur"]
  },
  album_cover: {
    required: true,
    validator: coverV,
    trigger: ["change"]
  }
});

/** 关闭 dialog */
const closeDialog = () => {
  albumFormRef.value.resetFields();
  Object.assign(albumForm, primaryAlbumForm);
  dialogVisible.value = false;
};

/** 提交表单 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      // 先上传图片
      if (!albumForm.coverList[0].id) {
        const uploadLoading = ElLoading.service({
          fullscreen: true,
          text: "图片上传中"
        });
        const imgRes = await imgUpload(albumForm.coverList[0]);
        if (imgRes.code == 0) {
          const { url } = imgRes.result;
          albumForm.album_cover = url;
        }
        uploadLoading.close();
      } else {
        albumForm.album_cover = albumForm.coverList[0].url;
      }

      /** 提交 */
      let res;
      if (albumForm.id) {
        res = await updateAlbum(albumForm);
      } else {
        res = await addAlbum(albumForm);
      }
      if (res.code == 0) {
        await pageGetAlbum();
        message(`${albumForm.id ? "修改" : "新增"}成功`, { type: "success" });
        formEl.resetFields();
        dialogVisible.value = false;
      }
    }
  });
};
/** 操作函数 */
const handleSizeChange = (val: any) => {
  param.size = val;
  pageGetAlbum();
};
const handleCurrentChange = (val: any) => {
  param.current = val;
  pageGetAlbum();
};

const operate = (type: string, val?: any) => {
  switch (type) {
    case "edit":
      Object.assign(albumForm, cloneDeep(val));
      dialogVisible.value = true;
      break;
    case "delete":
      deleteAlbumById(val);
      break;
    case "details":
      router.push({
        path: "/photo/list",
        query: {
          id: val.id,
          albumName: val.album_name
        }
      });
      break;
    case "add":
      dialogVisible.value = true;
      break;
    default:
      return;
  }
};

/** 删除相册 */
const deleteAlbumById = async (id: any) => {
  const res = await deleteAlbum(id);
  if (res.code == 0) {
    await pageGetAlbum();
    message("删除成功", { type: "success" });
  }
};

/** 获得相册列表 */
const pageGetAlbum = async () => {
  const res = await getAlbumList(param);
  if (res.code == 0) {
    const { list, total } = res.result;
    albumList.value = list.map((l: any) => {
      return {
        id: l.id,
        album_name: l.album_name,
        description: l.description,
        album_cover: l.album_cover,
        coverList: [{ id: 1, url: l.album_cover }]
      };
    });
    albumTotal.value = total;
  }
};

onMounted(async () => {
  await pageGetAlbum();
});
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        相册管理
        <el-button
          type="primary"
          plain
          :icon="useRenderIcon(Plus)"
          v-waves
          @click="operate('add')"
          >新增相册</el-button
        >
      </div>
    </template>
    <!-- 主体内容 -->
    <el-row class="album">
      <template v-if="!albumList.length">
        <div class="observer">还未新增相册，请先添加相册哦~</div>
      </template>
      <template v-else>
        <el-col
          style="padding: 10px"
          :xs="24"
          :sm="6"
          v-for="item in albumList"
          :key="item.id"
        >
          <div class="album-card">
            <div class="flex_r_between pad_5">
              <!-- 相册标题 -->
              <div class="album-title">
                <span :title="item.album_name">{{ item.album_name }}</span>
              </div>
              <div class="operator flex_r_between">
                <el-icon
                  class="mr-[5px]"
                  color="#67c23a"
                  size="18"
                  @click="operate('edit', item)"
                  ><IconifyIconOffline :icon="Edit"
                /></el-icon>
                <el-popconfirm
                  :title="`删除相册-${item.album_name}?`"
                  icon-color="#66b1ff"
                  @click="operate('delete', item)"
                >
                  <template #reference>
                    <el-icon color="#f56c6c" size="16"
                      ><IconifyIconOffline :icon="Delete"
                    /></el-icon>
                  </template>
                </el-popconfirm>
                <el-icon
                  color="#66b1ff"
                  size="18"
                  @click="operate('details', item)"
                  ><IconifyIconOffline :icon="More"
                /></el-icon>
              </div>
            </div>
            <span class="album-desc" :title="item.desc">{{
              item.description
            }}</span>
            <el-image
              class="album-image animate__animated animate__fadeIn"
              :src="item.album_cover"
              fit="cover"
              loading="lazy"
              preview-teleported
              :preview-src-list="[item.album_cover]"
            />
          </div>
        </el-col>
      </template>
    </el-row>
    <el-pagination
      v-show="albumTotal > 0"
      class="pagination"
      v-model:current-page="param.current"
      v-model:page-size="param.size"
      :page-size="[10, 12, 16]"
      :small="true"
      :disabled="false"
      :background="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="albumTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      :title="albumForm.id ? '编辑相册' : '新增相册'"
      v-model="dialogVisible"
      :width="400"
      :before-close="closeDialog"
    >
      <el-form
        ref="albumFormRef"
        :model="albumForm"
        :rules="albumFormRules"
        class="bg-bg_color w-[99/100]"
        label-width="100"
        label-suffix=":"
      >
        <el-form-item prop="album_name" class="form-item80" label="相册名称">
          <el-input
            v-model="albumForm.album_name"
            placeholder="请输入相册名称"
            clearable
            maxlength="25"
          />
        </el-form-item>
        <el-form-item prop="description" class="form-item80" label="相册描述">
          <el-input
            v-model="albumForm.description"
            type="textarea"
            placeholder="请输入相册描述"
            clearable
            maxlength="25"
          />
        </el-form-item>
        <el-form-item prop="cover" class="cover" label="相册封面">
          <Upload
            v-model:fileList="albumForm.coverList"
            :width="200"
            :height="200"
            :limit="1"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button
          type="danger"
          size="small"
          plain
          @click="submitForm(albumFormRef)"
          >保存</el-button
        >
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped lang="scss">
.album {
  height: calc(100vh - 220px);
  overflow: auto;

  &-card {
    position: relative;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    padding: 5px;
  }

  &-title {
    font-weight: 600;
    width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: all 0.5s;
    color: #606266;
    vertical-align: baseline;

    &:hover {
      cursor: pointer;
      color: #66b1ff;
    }
  }

  &-desc {
    font-size: 0.8em;
    display: inline-block;
    padding: 0 10px;
    width: 95%;
    color: #606266;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &-image {
    vertical-align: bottom;
    width: 100%;
    position: relative;
    transition: all 0.5s;

    &:hover {
      cursor: pointer;
    }
  }
}

.album::-webkit-scrollbar {
  display: none;
}

:deep(.el-card__body) {
  padding: 0 !important;
}

.pagination {
  margin: 0 0 10px 10px;
  justify-content: center;
}

.flex_r_b {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.operate {
  &:hover {
    cursor: pointer;
  }
}

.pad5 {
  padding: 5px;
}

.form-item {
  &50 {
    width: 50%;
    font-weight: bold;
  }

  &80 {
    width: 80%;
    font-weight: bold;
  }
}

.cover {
  font-weight: bold;

  :deep(.el-form-item__content) {
    width: 200px;
    height: 200px;
  }

  :deep(.el-upload-list__item) {
    width: 200px !important;
    height: 200px !important;
    margin: 0 !important;
    border: none !important;
    border-radius: 0;
  }

  :deep(.el-upload-list--picture-card) {
    width: 200px !important;
    height: 200px !important;
    margin: 0 !important;
    border: none !important;
    border-radius: 0;
  }

  :deep(.el-upload--picture-card) {
    width: 200px !important;
    height: 200px !important;
    border-radius: 0;
  }
}

@media screen and (max-width: 798px) {
  .album-image {
    height: 240px;
  }
}

@media screen and (min-width: 799px) {
  .album-image {
    height: 200px;
  }
}

.observer {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
  width: 100%;
}
</style>
