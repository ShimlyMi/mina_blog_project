<script setup lang="ts" name="PhotoAlbum">
import { onMounted, reactive, ref } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Plus from "@iconify-icons/ep/plus";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";
import CircleCheck from "@iconify-icons/ep/circle-check";
import RefreshLeft from "@iconify-icons/ep/refresh-left";
import DeleteFilled from "@iconify-icons/ep/delete-filled";
import { useNav } from "@/layout/hooks/useNav";
import { useStaticStoreHook } from "@/store/modules/static";
import {
  deletePictures,
  getPicListByAlbumId,
  revertPictures
} from "@/api/photo";
import { useRoute, useRouter } from "vue-router";
import { cloneDeep } from "@pureadmin/utils";
import { message } from "@/utils/message";

const route = useRoute();
const router = useRouter();
const { role } = useNav();
const photoTab = useStaticStoreHook().photoTab;

/** LIST */
const param = reactive({
  current: 1,
  size: 30,
  status: 1,
  id: null
});
/** 图库名称 */
const currentAlbumName = ref(null);
/** 图片相关 */
const photoList = ref([]);
const photoTotal = ref(0);
const isEdit = ref(false);
/** 图片视图有关 */
const previewList = ref([]);
const previewShow = ref(false);
const previewIndex = ref(0);

/** 点击  查看图片 */
const showPreview = (index: any) => {
  previewIndex.value = index;
  previewShow.value = true;
};
/** 关闭图片查看器 */
const closeImgPreview = () => {
  previewShow.value = false;
};

const tabChange = async (val: any) => {
  param.status = val.index ? Number(val.index) + 1 : null;
  await pageGetPics();
  // if (talkList.value.length < total.value) {
  //   observeTalkBottom();
  // }
};

/** 获取图片列表 */
const pageGetPics = async () => {
  const res = await getPicListByAlbumId(param);
  // console.log("获取相册列表", res);
  if (res.code == 0) {
    const { list, total } = res.result;
    photoList.value = list.map((l: any) => {
      return { id: l.id, url: l.url, checked: false };
    });
    previewList.value = list.map((l: any) => {
      return l.url;
    });
    photoTotal.value = total;
  }
};
/** 新增 */
const add = () => {
  router.push({
    path: "/photo/addPhoto",
    query: {
      id: param.id,
      albumName: currentAlbumName.value
    }
  });
};
/** 修改 */
const edit = () => {
  isEdit.value = true;
};
/** 取消 */
const cancel = () => {
  isEdit.value = false;
};
/** 批量删除 */
const deleteBatch = async () => {
  const list = photoList.value.filter(p => p.checked);
  if (list.length) {
    message("请选择需要删除的图片", { type: "warning" });
    return;
  }
  const res = await deletePictures({
    type: param.status,
    imgList: list.map(l => {
      return { id: l.id, url: l.url };
    })
  });
  if (res.code == 0) {
    message("删除成功", { type: "success" });
    isEdit.value = false;
    await pageGetPics();
  }
};
/** 批量恢复 */
const revertBatch = async () => {
  const list = photoList.value.filter(p => p.checked);
  if (!list.length) {
    message("请选择需要恢复的图片", { type: "warning" });
    return;
  }
  const res = await revertPictures({
    idList: list.map(l => l.id)
  });
  if (res.code == 0) {
    message("恢复成功", { type: "success" });
    await pageGetPics();
  }
};
/** 清空回收站 */
const clear = async () => {
  const res = await deletePictures({
    type: param.status,
    imgList: photoList.value.map(p => {
      return { id: p.id, url: p.url };
    })
  });
  if (res.code == 0) {
    message("清空回收站成功", { type: "success" });
    await pageGetPics();
  }
};
/** 处理分页器相关函数 */
const handleSizeChange = (val: any) => {
  param.size = val;
  pageGetPics();
};
const handleCurrentChange = (val: any) => {
  param.current = val;
  pageGetPics();
};

onMounted(() => {
  if (route.query.id && route.query.albumName) {
    const { id, albumName } = route.query;
    currentAlbumName.value = albumName;
    param.id = Number(cloneDeep(id));
  }
  pageGetPics();
});
</script>

<template>
  <el-card class="album">
    <template #header>
      <div class="flex_r_b">
        <span>图库名称 - {{ currentAlbumName }}</span>
        <!-- 按钮区分 -->
        <div v-show="role == 1">
          <div v-if="param.status == 1">
            <template v-if="!isEdit">
              <el-button
                type="primary"
                plain
                :icon="useRenderIcon(Plus)"
                @click="add"
                >新增</el-button
              >
              <el-button
                type="success"
                :icon="useRenderIcon(EditPen)"
                @click="edit"
                >编辑</el-button
              >
            </template>
            <template v-else>
              <el-button
                type="danger"
                :icon="useRenderIcon(Delete)"
                @click="deleteBatch"
                >批量删除</el-button
              >
              <el-button
                type="info"
                plain
                :icon="useRenderIcon(CircleCheck)"
                @click="cancel"
                >取消</el-button
              >
            </template>
          </div>
          <div v-else>
            <el-button
              type="danger"
              :icon="useRenderIcon(Delete)"
              @click="deleteBatch"
              >批量删除</el-button
            >
            <el-button
              type="success"
              :icon="useRenderIcon(RefreshLeft)"
              @click="revertBatch"
              >批量恢复</el-button
            >
            <el-button
              type="info"
              :icon="useRenderIcon(DeleteFilled)"
              @click="clear"
              >清空回收站</el-button
            >
          </div>
        </div>
      </div>
    </template>
    <el-tabs @tab-click="tabChange">
      <template v-for="item of photoTab" :key="item.key">
        <el-tab-pane :lazy="true">
          <template #label>
            <el-tooltip :content="item.content" placement="top-end">
              <span>{{ item.title }}</span>
            </el-tooltip>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
    <div class="album-upload">
      <template v-if="!photoList.length">
        <div class="observer">
          {{ photoList.length >= photoTotal ? "还没有照片哦~" : "加载更多" }}
        </div>
      </template>
      <template v-else>
        <div
          class="retrieve-box"
          v-for="(item, index) in photoList"
          :key="item.id"
        >
          <el-checkbox
            class="retrieve-box__checkbox"
            v-model="item.checked"
            v-if="(isEdit && param.status == 1) || param.status == 2"
          />
          <el-image
            class="retrieve-box__img"
            fit="cover"
            :data-src="item.url"
            :src="item.url"
            @click="showPreview(index)"
          />
        </div>
      </template>
    </div>
    <!-- 分页器 -->
    <el-pagination
      class="pagination"
      v-model:current-page="param.current"
      v-model:page-size="param.size"
      :small="true"
      :disabled="false"
      :background="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="photoTotal"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <!-- 图片查看器 -->
    <el-image-viewer
      v-if="previewShow"
      :url-list="previewList"
      :initial-index="previewIndex"
      @close="closeImgPreview"
    />
  </el-card>
</template>

<style scoped lang="scss">
.album-upload {
  height: calc(100vh - 350px);
  overflow: auto;
  //margin-bottom: 20px;
}

.album-upload::-webkit-scrollbar {
  display: none;
}

//:deep(.el-card__body) {
//  padding: 20px 20px 0 20px !important;
//}

.pagination {
  margin: 10px;
  justify-content: center;
}

.flex_r_b {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.operate {
  width: 30%;

  &:hover {
    cursor: pointer;
  }
}

.retrieve-box {
  margin: 5px;
  width: 108px;
  height: 108px;
  position: relative;
  display: inline-block;

  &__checkbox {
    position: absolute;
    top: -3px;
    right: 5px;
  }

  &__img {
    width: 100%;
    height: 100%;
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
