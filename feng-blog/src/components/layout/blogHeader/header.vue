<script setup>
import { computed, reactive, } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/index.js";

import SwitchTheme from "@/components/SwitchTheme/index.vue"

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { getBlogAvatar, getUserInfo } = storeToRefs(userStore);
const headerState = reactive({
  drawerShow: false,
  startScrollTop: 0,
  headerClass: "",
  activeIndex: 0,
})

const getPath = computed(() => {
  return route.path;
})

// 导航固定
const scroll = () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  const { startScrollTop } = headerState;
  if (scrollTop <= 50) {
    headerState.headerClass = "fixed-header";
    headerState.startScrollTop = scrollTop;
    return;
  }
  if (startScrollTop > scrollTop) {
    headerState.headerClass = "fixed-header";
  } else if (startScrollTop <= scrollTop) {
    headerState.headerClass = "hide-header";
  }
  headerState.startScrollTop = scrollTop;
};
</script>

<template>
<div class="fy-header">
  <div class="fy-header--menu flex_r_between">
    <div class="sub-avatar">
      <router-link v-if="getBlogAvatar" to="/">
        <el-avatar class="el-avatar" :src="getBlogAvatar" />
      </router-link>
    </div>
    <div class="flex_r_around">
      <el-menu
        class="sub-menu el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :default-active="getPath"
      >
        <el-menu-item index="/home"><i class="iconfont icon-shouye1"></i>主页</el-menu-item>
        <el-menu-item><i class="iconfont icon-shizhongfill"></i>时间轴</el-menu-item>
        <el-sub-menu>
          <template #title>
            <i class="iconfont icon-yingyongzhongxin"></i>资源导航
          </template>
          <el-menu-item><i class="iconfont con-qianduankaifa"></i>前端</el-menu-item>
          <el-menu-item><i class="iconfont icon-houduankaif"></i>后端</el-menu-item>
        </el-sub-menu>
        <el-menu-item><i class="iconfont icon-liebiao"></i>分类</el-menu-item>
        <el-menu-item><i class="iconfont icon-tupian1"></i>相册</el-menu-item>
        <el-menu-item><i class="iconfont icon-duihua"></i>说说</el-menu-item>
        <el-menu-item><i class="iconfont icon-dakaixinxi"></i>留言板</el-menu-item>
        <el-menu-item><i class="iconfont icon-lianjie2"></i>友链</el-menu-item>
        <el-menu-item index="/login"><i class="iconfont icon-yonghu"></i>登录</el-menu-item>
        <div class="user">
          <el-sub-menu index="/#">
            <template #title>
              <el-avatar :src="getUserInfo.avatar" :size="30">{{ getUserInfo.nick_name }}</el-avatar>
            </template>
            <el-menu-item><el-icon><Avatar /></el-icon>个人中心</el-menu-item>
            <el-menu-item><el-icon><SwitchButton /></el-icon>退出登录</el-menu-item>
          </el-sub-menu>
        </div>
        <el-menu-item>
          <SwitchTheme />
        </el-menu-item>
      </el-menu>

    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@include b(header) {
  .sub-avatar {
    padding: 5px 0 0 0;
    display: flex;
    align-items: center;
  }
  .sub-menu {
    height: 53px;

  }
  @include e(menu){
    height: 100%;
  }
}
.flex-grow {
  flex-grow: 1;
}
.el-sub-menu {
  :deep(.el-sub-menu__icon-arrow) {
    display: none;
  }
}

.iconfont {
  font-size: 1.1rem;
  margin-right: 5px;
}
:deep(.el-menu--horizontal.el-menu) {
  border-bottom: 0;
}
:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title) {
  border: 0;
}
:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title:hover) {
  color: #f7a7f2;
  background-color: transparent;
}
:deep(.el-sub-menu__title) {
  font-size: var(--global-font-size);
  font-weight: 600;
}
:deep(.el-menu:not(.el-menu--collapse) .el-sub-menu__title) {
  padding: 0 10px;
}
.icon-lianjie2 {
  font-size: 1.2rem;
}
.icon-yingyongzhongxin {
  font-size: 1rem;
}
.icon-dakaixinxi {
  font-size: 1.2rem;
}
.icon-yonghu {
  font-size: 1rem;
}

</style>
