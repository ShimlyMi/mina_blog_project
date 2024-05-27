<script setup>
import { nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";

import { numberFormate } from "@/utils/tool";
import { gsapTransY } from "@/utils/transform";

import RightSideTop from "./components/item/right-side-top.vue";
import RightSideItem from "./components/item/right-side-item.vue";

defineProps({
  configDetail: {
    type: Object,
    default: () => {}
  },
  runtime: {
    type: [String, Number],
    default: "半年不到"
  },
  loading: {
    type: Boolean,
    default: false
  },
  articleCount: {
    type: Number,
    default: 0
  }
});

const router = useRouter();

// const goToArticleList = (item) => {
//   router.push({ path: "/article/list", query: { id: item.id, type: 'tag', name: item.tag_name } })
// }

onMounted(() => {
  let list = [];
  for (let i = 1; i <= 5; i++) {
    if (i > 1) {
      list.push(".right-side-space" + i);
    }
  }
  nextTick(() => {
    gsapTransY(list, 50, 0.6, "none");
  });
});
</script>

<template>
<div class="mi-right">
  <el-row>
    <el-col :span="24" class="right-side-space right-side-space1">
      <el-card class="info-card card-hover">
        <el-skeleton>
          <template #template>
            <RightSideTop :configDetail="configDetail" />
          </template>
        </el-skeleton>
      </el-card>
    </el-col>

    <!-- 公告 -->
    <el-col :xs="0" :sm="24"  class="right-side-space right-side-space2">
      <el-card class="right-card card-hover flex_c_center animate__animated animate__fadeIn" shadow="hover">
        <el-skeleton :loading="loading" animated>
          <template #template>
            <RightSideSkeletonItem />
          </template>
          <template #default>
            <RightSideItem icon="icon-laba" title="" color="#FF8C00">
              <div class="notice-text">{{ configDetail.blog_notice }}</div>
            </RightSideItem>
          </template>
        </el-skeleton>
      </el-card>
    </el-col>

    <!-- 热门文章 -->

  </el-row>
</div>
</template>

<style lang="scss" scoped>
.el-card :deep(.el-card__body) {
  padding: 0;
}

.right-side-space {
  width: 100%;

  .info-card {
    height: 26rem;
  }
  .right-card {
    padding: 1rem 1.4rem;
    color: #676767;
    min-height: 10rem;

    .card-title {
      font-size: 1.2rem;
      line-height: 2.4;

      .icon-laba {
        font-weight: 900;
      }
    }
  }

  .notice-text {
    min-height: 6rem;
    font-size: 1.1rem;
    line-height: 1.2;
    white-space: pre-line;
    //padding: 0 10px 10px 10px;
    display: inline-block;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
