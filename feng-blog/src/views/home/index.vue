<script setup>
import { onMounted, reactive, ref } from 'vue'
import HomeArticleList from "@/components/HomeArticle/index.vue"
import RightSide from "@/components/RightSider/index.vue"
import { getHomeAticleList, getWebDetail } from "@/api/article.js";
import {ElNotification} from "element-plus";

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
  console.log(res)
  if (res && res.code === 0) {
    configDetail.value = res.result
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
        <el-card
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
        </el-card>
        <!-- 博客文章 -->
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

</style>
