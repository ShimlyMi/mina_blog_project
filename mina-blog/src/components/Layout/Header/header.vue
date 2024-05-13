<script setup>
import { computed, } from 'vue';
import  {useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore.js";
import MessageBox from "@/components/MessageBox/message-box.vue";


const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { getUserInfo, getBlogAvatar } = storeToRefs(userStore);

// console.log(getUserInfo)
const getPath = computed(() => {
  return route.path;
})

const logout = () => {
  userStore.clearUserInfo();
  router.push("/home")
}
</script>

<template>
<div class="mi-header">
  <div class="mi-header__menu flex_r_between">
    <div class="sub-avatar">
      <router-link to="/">
        <img src="@/assets/logo.jpg" />
<!--        <el-avatar :src="getBlogAvatar" class="el-avatar" />-->
      </router-link>
      <MessageBox class="ml-[10px]" v-if="getUserInfo.id" :user-id="getUserInfo.id" type="pc" />
    </div>
    <div class="flex_r_around">
      <el-menu
          :default-active="getPath"
          :ellipsis="false"
          class="sub-menu el-menu-demo"
          mode="horizontal"
          router
      >
        <el-menu-item index="/home"><i class="iconfont icon-shouye1"></i>主页</el-menu-item>
        <el-menu-item index="/timeline"><i class="iconfont icon-shizhong"></i>时间轴</el-menu-item>
        <el-sub-menu index="/article/list">
          <template #title>
            <i class="iconfont icon-yingyongzhongxin"></i>文章
          </template>
          <el-menu-item index="/article/forefront"><i class="iconfont icon-qianduankaifa"></i>前端</el-menu-item>
          <el-menu-item index="/article/backend"><i class="iconfont icon-houduankaifa"></i>后端</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="category"><i class="iconfont icon-liebiao"></i>分类</el-menu-item>
        <el-menu-item index="minaHouse"><i class="iconfont icon-shouye-zhihui"></i>小屋</el-menu-item>
        <el-menu-item index="/album"><i class="iconfont icon-tupian1"></i>相册</el-menu-item>
        <el-menu-item index="/talk"><i class="iconfont icon-duihua"></i>说说</el-menu-item>
        <el-menu-item index="/message/list"><i class="iconfont icon-dakaixinxi"></i>留言板</el-menu-item>
        <el-menu-item index="/friendLink"><i class="iconfont icon-lianjie2"></i>友链</el-menu-item>
<!--        <el-menu-item v-if="!getUserInfo.id" index="/login"><i class="iconfont icon-yonghu"></i>登录</el-menu-item>-->
        <el-sub-menu v-if="!getUserInfo.id" popper-class="login-sub-menu">
          <template #title>
            <el-avatar :src="getBlogAvatar" class="el-avatar" />
          </template>
          <el-menu-item index="/login"><i class="iconfont icon-yonghu"></i>登录</el-menu-item>
        </el-sub-menu>
        <div v-else class="user">
          <el-sub-menu index="/#">
            <template #title>
              <el-avatar :size="30" :src="getUserInfo.avatar">{{ getUserInfo.nick_name }}</el-avatar>
            </template>
            <el-menu-item><el-icon><Avatar /></el-icon>个人中心</el-menu-item>
            <el-menu-item @click="logout"><el-icon><SwitchButton /></el-icon>退出登录</el-menu-item>
          </el-sub-menu>
        </div>
<!--        <el-menu-item>-->
<!--          <SwitchTheme />-->
<!--        </el-menu-item>-->
      </el-menu>

    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
@include b(header) {
  .sub-avatar {
    padding: 0px 0 0 10px;
    display: flex;
    align-items: center;
  }
  .sub-menu {
    height: 100%;

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

:deep(.el-menu) {
  background-color: transparent;
}
:deep(.el-menu--horizontal.el-menu) {
  border-bottom: 0;
}
:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title) {
  border: 0;
}
:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title:hover) {
  color: #f7a7f2 !important;
  background: none;
}

:deep(.el-sub-menu__title) {
  font-size: var(--global-font-size);
  font-weight: 600;
}
:deep(.el-menu:not(.el-menu--collapse) .el-sub-menu__title) {
  padding: 0 10px;
}
:deep(.el-menu--horizontal>.el-menu-item.is-active) {
  color: #f7a7f2 !important;
  border-bottom: 0;
  background: none;
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
.icon-shouye1 {
  font-size: 1.1rem;
}
</style>
