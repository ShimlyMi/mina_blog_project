<script setup>
import { watch } from 'vue'
import ArticleSkeleton from "./components/article-skeleton.vue"
const props = defineProps({
  articleLlist:{
    type: Array,
    default: () => {}
  },
  articleTotal: {
    type: Number,
    default: 0
  },
  param: {
    type: Object,
    default: () => {}
  }
})
watch(
    () => props.articleLlist
)
</script>

<template>
<el-row>
  <template v-if="param.loading">
    <el-col v-for="item in 5" :key="item">
      <el-card class="card-hover">
        <div class="mi-articleBox">
          <el-skeleton :loading="param.loading" style="height: 100%;" animated>
            <template #template>
              <ArticleSkeleton />
            </template>
          </el-skeleton>
        </div>
      </el-card>
    </el-col>
  </template>
  <template v-else>
    <template v-if="articleLlist.length > 0">
        <el-col v-for="{ item, index } in articleLlist" :key="index">
            <el-card>
                <div class="article-box">
                    <div>
                        <div v-image="item.article_cover"
                             class="scale flex justify-center items-center"
                             style="width: 100%; height: 100%">
                            <el-image :src="item.article_cover" fit="cover" class="image">
                                <template #error>
                                    <div class="image-slot">
                                        <el-icon><icon-picture /></el-icon>
                                    </div>
                                </template>
                            </el-image>
                        </div>
                    </div>
                    <!-- 文章信息 -->
                    <div class="article-info flex_c_between">
                        <span class="title text_overflow" :title="item.article_title">
                            {{ item.article_title }}
                        </span>
                        <div class="meta">
                            <span class="to_printer">
                                <span class="meta-label">发表于</span>
                                <span class="meta-value">{{ item.createdAt }}</span>
                            </span>
                          <span class="to_printer">
                                <span class="meta-label">发表于</span>
                                <span class="meta-value">{{ item.createdAt }}</span>
                            </span>
                          <span class="to_printer">
                                <span class="meta-label">发表于</span>
                                <span class="meta-value">{{ item.createdAt }}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </el-card>
        </el-col>
    </template>
    <template v-else>
      <div class="no-article">暂无文章，请博主在后台发表文章哦~</div>
    </template>
  </template>
</el-row>
</template>

<style scoped lang="scss">
.article-cover {
  .image {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }
}
.no-article {
  color: var(--font-color);
  margin: 10px auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.article-info {
  .title {
    display: inline-block;
    width: 100%;
    font-size: 1.8rem;
    color: #676767;
    font-weight: 600;
    line-height: 3;
    transition: 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      color: var(--primary);
    }
  }

  .meta {
    color: #858585;
    line-height: 1.4;
    font-size: 100%;
    font-weight: 500;

    &-label {
      padding-right: 0.2rem;
    }

    &-value {
      padding-right: 0.2rem;
    }

    .article-meta__separator {
      margin: 0 0.4rem;
      font-size: 1.1rem;
      position: relative;

      &::after {
        content: "|";
        position: absolute;
        top: -3px;
        right: 0;
      }
    }

    i {
      margin: 0 0.2rem 0 0;
    }
  }
}
/** mobile */
@media screen and (max-width: 768px) {
  @include b(articleBox) {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 30rem;
  }
}

@media screen and (min-width: 768px) {
  @include b(articleBox) {
    display: flex;
    align-items: center;
    height: 20rem;
  }
  .article-cover {
    width: 45%;
    height: 100%;
    overflow: hidden;
  }

  .article-info {
    width: 55%;
    padding: 0 40px;
    overflow: hidden;
    display: inline-block;
  }
}
}
</style>
