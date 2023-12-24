<script setup>
import { onMounted, reactive, ref } from 'vue'
import HomeArticleList from "@/components/HomeArticle/index.vue"
import RightSide from "@/components/RightSider/index.vue"
import { getHomeAticleList, getWebDetail } from "@/api/article.js";
import { ElNotification } from "element-plus";
import { useDetailStore } from "@/stores/detail/detail.js";

const detailStore = useDetailStore()
const articleList = ref([])
const articleTotal = ref()
/** 文章 */
const param = reactive({
  pageNum: 1, // 当前页
  size: 5, // 每页条目数
  loading: true, // 加载
})
/** 获取文章列表 */
const getArticleList = async (type) => {
  param.loading = true
  type === 'init' ? "" : (param.loading = true)
  let res = await getHomeAticleList({ pageNum: param.pageNum, pageSize: param.size })
  console.log("home",res)
  if (res && res.code === 0) {
    type === 'init' ? "" : (param.loading = false)
    const  { list, total } = res.result
    articleList.value = list
    articleTotal.value = total
      console.log(list.length)
  }
  param.loading = false
}
/** 网站右侧 */
const rightSideLoading = ref(true)
const runtime = ref(0)
let configDetail = ref({})
let tags = ref([])
/** 获取网站详情 */
const getConfigDetail = async () => {
  let res = await getWebDetail()
  // console.log(res)
  if (res && res.code === 0) {
      console.log(123)
    configDetail.value = res.result
    await detailStore.setWebDetail(configDetail.value)
    // console.log(detailStore.getWebDetail)
  } else {
    ElNotification({
      offset: 60,
      title: "温馨提示",
      message: "获取设置失败"
    })
  }
}

/** 数据初始化 */
const init = async () => {
  await getArticleList('init')
  await getConfigDetail()
}
onMounted(async () => {
  await init()
})
</script>

<template>

  <div class="mi-homeCenter">
    <el-row>
      <el-col :xs="24" :sm="18">
<!--        <el-card
            class="mobile-top-card mobile-card info-card animate__animated animate__fadeIn"
            shadow="hover"
        >
          <el-skeleton :loading="rightSideLoading" animated>
            <template #template>
              <MobileTopSkeleton />
            </template>
            <template #default>
              <RightSideTop :configDetail="configDetail" />
            </template>
          </el-skeleton>
        </el-card>-->
          <HomeArticleList :articleList="articleList" :articleTotal="articleTotal" :param="param"></HomeArticleList>
      </el-col>
      <el-col :xs="0" :sm="6">
        <!-- 我的博客信息 -->
        <RightSide :configDetail="configDetail"
                   :tags="tags"
                   :runtime="runtime"
                   :loading="rightSideLoading" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.mobile-top-card {
  height: 31rem;
  margin: 4px;
  :deep(.info-avatar) {
    padding: 0 2rem;
  }
  :deep(.personal-say) {
    padding-left: 1rem;
  }
  :deep(.info-background) {
    height: 10rem;
    width: 100%;
  }
  :deep(.common-menu) {
    padding: 1.5rem 5.5rem;
  }
  :deep(.git-ee) {
    padding: 0 4rem;
  }
  :deep(.personal-link) {
    padding: 1rem 6rem;
  }
}
.mobile-bottom-card {
  margin: 4px;
  padding: 1rem;
  .icon-localoffer {
    font-weight: 900;
  }
  span {
    margin-left: 0.3rem;
  }
  .site-info {
    padding: 0.3rem 1rem;
    line-height: 2;
    font-size: 1rem;

    .value {
      font-weight: 600;
    }
  }
}

.group {
  margin-left: 0.3rem;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .img {
    width: 80px;
    height: 80px;
  }
}
</style>
