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
<!--    <template v-if="articleLlist.length > 0">-->

<!--    </template>-->
    <template>
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
