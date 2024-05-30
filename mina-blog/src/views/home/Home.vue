<script setup name="Home">
import { ref, onMounted, reactive } from 'vue'
import RightSide from "@/components/RightSide/right-side.vue";
// import HomeArticle from "@/components/HomeArticle/Mallki.vue";
import { getConfig } from "@/api/config.js";
import {ElNotification} from "element-plus";
import {useUserStore} from "@/stores/userStore.js";

// const articleList = ref([])
// const articleTotal = ref()
const userStore = useUserStore();
/** 文章 */
// const param = reactive({
//   pageNum: 1, // 当前页
//   size: 5, // 每页条目数
//   loading: true, // 加载
// })
/** 获取文章列表 */
// const getArticleList = async (type) => {
//   param.loading = true
//   type === 'init' ? "" : (param.loading = true)
//   let res = await getHomeAticleList({ pageNum: param.pageNum, pageSize: param.size })
//   console.log("home",res)
//   if (res && res.code == 0) {
//     type === 'init' ? "" : (param.loading = false)
//     const  { list, total } = res.result
//     articleList.value = list
//     articleTotal.value = total
//     // console.log(article-list.length, total)
//   }
//   param.loading = false
// }
/** 网站右侧 的个人信息 */
const rightSizeLoading = ref(true);
const runtime = ref(0);
let configDetail = ref({});

/** 获取个人信息 */
const getConfigDetail = async () => {
  rightSizeLoading.value = true;
  let res = await getConfig()
  // console.log(res)
  if (res.code === 0 && typeof res.result != "string") {
    configDetail.value = res.result;
    userStore.setBlogAvatar(res.result.blog_avatar);
    // console.log(detailStore.getWebDetail)
  } else {
    ElNotification({
      offset: 60,
      title: "温馨提示",
      message: "获取设置失败"
    })
  }
  rightSizeLoading.value = false;
}
/** 数据初始化 */
const init = async () => {
  // await getArticleList()
  await getConfigDetail()
}

onMounted(async () => {
  await init()
})

</script>

<template>
  <div class="mi-home">
    <el-row>
      <el-col :sm="6" :xs="6">
        <!-- 我的博客信息 -->
        <RightSide :loading="rightSizeLoading" :config-detail="configDetail" />
      </el-col>
      <el-col :sm="18" :xs="24">
        <!--      <HomeArticle :articleList="articleList" :articleTotal="articleTotal" :param="param" />-->
      </el-col>

    </el-row>
  </div>
</template>

<style lang="scss" scoped>

</style>
