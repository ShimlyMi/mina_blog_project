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
.no-article {
  color: var(--font-color);
  margin: 10px auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
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
}
</style>
