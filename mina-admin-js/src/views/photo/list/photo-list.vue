<script setup lang="ts" name="PhotoAlbum">
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import Plus from "@iconify-icons/ep/plus";
import EditPen from "@iconify-icons/ep/edit-pen";
import CirlcleCheck from "@iconify-icons/ep/circle-check";
import Delete from "@iconify-icons/ep/delete";
import RefreshLeft from "@iconify-icons/ep/refresh-left";
import ToiletPaper from "@iconify-icons/ep/toilet-paper";
import {
  deletePictures,
  getPicListByAlbumId,
  revertPictures
} from "@/api/photo";
import { message } from "@/utils/message";
import { cloneDeep } from "@pureadmin/utils";
import {useStaticStoreHook} from "@/store/modules/static";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";

const route = useRoute();
const router = useRouter();
const photoTab = useStaticStoreHook().photoTab;
const photoList = ref([]);
const photoTotal = ref(0);
const param = reactive({
  current: 1,
  size: 50,
  status: 1,
  id: null
});
const currentAlbumName = ref(null);
const isEdit = ref(false);

const previewShow = ref(false);
const previewList = ref([]);
const previewIndex = ref(0);

/** 与图片视图有关 */
const showPreview = (index: any) => {
  previewIndex.value = index;
  previewShow.value = true;
};
const closeImgViewer = () => {
  previewShow.value = false;
};

/** 与 分页 有关 */
const handleSizeChange = (val: any) => {
  param.size = val;
  pageGetPhoto();
};
const handleCurrentChange = (val: any) => {
  param.size = val;
  pageGetPhoto();
};

/** 根据相册id获取图片列表 */
const pageGetPhoto = async () => {
  const res = await getPicListByAlbumId(param);
  if (res.code == 0) {
    const { list, total } = res.result;
    photoList.value = list.map((l: any) => {
      return {
        id: l.id,
        url: l.url,
        checked: false
      };
    });
    previewList.value = list.map(l => {
      return l.url;
    });
    photoTotal.value = total;
  }
};

/** 切换 tabs */
const tabChange = (val: any) => {
  param.status = val.index ? Number(val.index) + 1 : null;
  pageGetPhoto();
};

/** 与操作有关 */
const edit = () => {
  isEdit.value = true;
};
const add = () => {
  router.push({
    path: "/photo/addPhoto",
    query: { id: param.id, albumName: currentAlbumName.value }
  });
};
const cancle = () => {
  isEdit.value = false;
};
/** 批量删除 */
const deleteBatch = async () => {
  const list = photoList.value.filter(p => p.checked);
  if (!list.length) {
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
    await pageGetPhoto();
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
    await pageGetPhoto();
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
    await pageGetPhoto();
  }
};
onMounted(async () => {
  // 初始化
  if (route.query.id && route.query.albumName) {
    const { id, albumName } = route.query;
    currentAlbumName.value = albumName;
    param.id = Number(cloneDeep(id));
  }
  await pageGetPhoto();
});
</script>

<template>
  <el-card class="album">
    <el-tabs @tab-click="tabChange">
      <template v-for="item of photoTab" :key="item.key">
        <el-tab-pane :lazy="true">
          <template #label>
            <el-tooltip :content="item.content" placement="top-end">
              <span>{{ item.content }}</span>
            </el-tooltip>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
    <template #header>
      <div class="flex_r_between">
        <span>图库名称 - {{ currentAlbumName }}</span>
      </div>
      <div class="flex_r_between mt-[5px]">
        <div />
        <div v-if="param.status == 1">
          <template>
            <el-button type="primary" :icon="useRenderIcon(Plus)">新增</el-button>
            <el-button type="success" :icon="useRenderIcon(EditPen)">编辑</el-button>
          </template>
          <template>
            <el-button type="danger" :icon="useRenderIcon(CirlcleCheck)">批量删除</el-button>
            <el-button type="info" :icon="useRenderIcon(CirlcleCheck)">取消</el-button>
          </template>
        </div>
        <div>
          <el-button type="danger" :icon="useRenderIcon(Delete)">批量删除</el-button>
          <el-button type="success" :icon="useRenderIcon(RefreshLeft)">批量恢复</el-button>
          <el-button type="info" :icon="useRenderIcon(ToiletPaper)">清空回收站</el-button>
        </div>
      </div>
    </template>
    <div class="album_upload">
      <template v-if="!photoList.length">
        <div>没有图片了~ 快去添加图片吧~</div>
      </template>
      <template v-else>
        <div class="retrieve-box" v-for="(item, index) in photoList" :key="item.id">
          <el-checkbox class="retrieve-box__checkbox" v-model="item.checked" v-if="(isEdit && param.status == 1) || param.status == 2" />
          <el-image class="retrieve-box__img" fit="cover" :data-src="item.url"  :src="item.url" @click="showPreview"/>
        </div>
      </template>
    </div>
    <el-pagination
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="param.current"
      v-model:page-size="param.size"
      :page-size="[50, 100, 200, 999]"
      :small="true"
      :disabled="false"
      :background="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-image-viewer v-if="previewShow" :url-list="previewList" :initial-index="previewIndex" @close="closeImgViewer" />
  </el-card>
</template>

<style scoped lang="scss">
.album-upload {
  height: calc(100vh - 280px);
  overflow: auto;
}

.album-upload::-webkit-scrollbar {
  display: none;
}

:deep(.el-card__body) {
  padding: 5px 5px 0 5px !important;
}

.pagination {
  margin: 0 0 10px 10px;
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
</style>
