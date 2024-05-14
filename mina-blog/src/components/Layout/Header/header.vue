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
        <el-menu-item index="/home">
          <svg class="icon myIconStyle" aria-hidden="true">
            <use xlink:href="#icon-Untitled-1"></use>
          </svg>主页</el-menu-item>
        <el-menu-item index="/timeline">
          <svg class="icon myIconStyle icon-time">
            <use xlink:href="#icon-katongshizhong"></use>
          </svg>时间轴</el-menu-item>
        <el-sub-menu index="/article/list">
          <template #title>
            <svg class="icon myIconStyle">
              <use xlink:href="#icon-biji"></use>
            </svg>文章
          </template>
<!--          <el-menu-item index="/article/forefront"><i class="iconfont icon-qianduankaifa"></i>前端</el-menu-item>-->
<!--          <el-menu-item index="/article/backend"><i class="iconfont icon-houduankaifa"></i>后端</el-menu-item>-->
        </el-sub-menu>
        <el-menu-item index="category">
          <svg class="icon myIconStyle">
            <use xlink:href="#icon-dns"></use>
          </svg>分类</el-menu-item>
        <el-menu-item index="minaHouse">
          <svg class="icon myIconStyle icon-myHome">
            <use xlink:href="#icon-home"></use>
          </svg>小屋</el-menu-item>
        <el-menu-item index="/album">
          <svg class="icon myIconStyle">
            <use xlink:href="#icon-a-xiangcexiangpianzhaopian"></use>
          </svg>相册</el-menu-item>
        <el-menu-item index="/talk">
          <svg class="icon myIconStyle icon-chat">
            <use xlink:href="#icon-chat"></use>
          </svg>说说</el-menu-item>
        <el-menu-item index="/message/list">
          <svg class="icon myIconStyle">
            <use xlink:href="#icon-liuyanmoban"></use>
          </svg>留言板</el-menu-item>
        <el-menu-item index="/friendLink">
          <svg class="icon myIconStyle icon-youlink">
            <use xlink:href="#icon-naturallinks"></use>
          </svg>友链</el-menu-item>
<!--        <el-menu-item v-if="!getUserInfo.id" index="/login"><i class="iconfont icon-yonghu"></i>登录</el-menu-item>-->
        <el-sub-menu v-if="!getUserInfo.id" popper-class="login-sub-menu">
          <template #title>
            <el-avatar :src="getBlogAvatar" class="el-avatar" />
          </template>
          <el-menu-item index="/login">
            <svg class="icon myIconStyle">
              <use xlink:href="#icon-denglu"></use>
            </svg>登录</el-menu-item>
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

.iconfont, .myIconStyle {
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
  //color: #f7a7f2 !important;
  color: #303133!important;
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
  //color: #f7a7f2 !important;
  color: #303133!important;
  border-bottom: 2px #f7a7f2 solid;
  background: none;
}
.icon-time, .icon-myHome, .icon-youlink  {
  font-size: 0.9rem;
}
.icon-dakaixinxi {
  font-size: 1.2rem;
}
.icon-chat {
  font-size: 1.2rem;
}
</style>
