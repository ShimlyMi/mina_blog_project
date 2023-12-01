<template>
    <div class="yz-header">
      <div class="yz-header__left">
        <a-avatar :src="avatarSrc">
          <router-link to="/">LOGO</router-link>
        </a-avatar>
      </div>
      <div class="yz-header__right">
        <a-style-provider hash-priority="high" :transformers="[legacyLogicalPropertiesTransformer]" >
          <a-menu v-model:selectedKeys="current" mode="horizontal" disabledOverflow="true">
            <a-menu-item key="home">
              <template #icon>
                <HomeOutlined/>
              </template>
              <router-link to="/home">首页</router-link>
            </a-menu-item>
            <a-menu-item key="timeline">
              <template #icon>
                <ClockCircleOutlined/>
              </template>
              时间轴
            </a-menu-item>
            <a-menu-item key="type">
              <template #icon>
                <BarsOutlined/>
              </template>
              分类
            </a-menu-item>
            <a-menu-item key="article">
              <template #icon>
                <CommentOutlined/>
              </template>
              说说
            </a-menu-item>
            <a-menu-item key="link">
              <template #icon>
                <TeamOutlined/>
              </template>
              友链
            </a-menu-item>
            <a-menu-item key="message">
              <template #icon>
                <MessageOutlined/>
              </template>
              留言板
            </a-menu-item>
            <a-menu-item>
              <a-switch v-model:checked="state.checked" checked-children="深色" un-checked-children="浅色" size="small" ></a-switch>
            </a-menu-item>
          </a-menu>
        </a-style-provider>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { h, ref, reactive  } from 'vue';
import { RouterLink } from "vue-router";
import {legacyLogicalPropertiesTransformer, MenuProps} from 'ant-design-vue';
import {
  HomeOutlined,
  MessageOutlined,
  BarsOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  CommentOutlined,
  UserOutlined
} from '@ant-design/icons-vue';

const state = reactive({checked: false,})
const current = ref<string[]>(['']);

/** 折叠时渲染 */
const items = ref<MenuProps['items']>([
  {
    key: 'go-back-home',
    icon: () => h(HomeOutlined),
    label: h(RouterLink, { to: { name: 'home' } }, '首页'),
    title: '首页',
  },
  {
    title: '时间轴',
    label: '时间轴',
    key:'timeline',
    icon: () => h(ClockCircleOutlined)
  },
  {
    title: '分类',
    label: '分类',
    key: 'types',
    icon: () => h(BarsOutlined)
  },
  {
    title: '说说',
    label: '说说',
    key: 'article',
    icon: () => h(CommentOutlined)
  },
  {
    title: '友链',
    label: '友链',
    key: 'link',
    icon: () => h(TeamOutlined),
  },
  {
    title: '留言板',
    label: '留言板',
    key: 'message',
    icon: () => h(MessageOutlined)
  },
  {
    title: '登录',
    label: h( RouterLink, { to: { name: 'login' } }, '登录' ),
    key: 'go-to-login',
    icon: () => h(UserOutlined)
  }
]);

const avatarSrc = ref<string>('../assets/images/logo.jpg')

</script>

<style scoped lang="scss">
@include b(header) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 70px;
    line-height: 70px;
    overflow-x: auto;
    overflow-y: hidden ;
    display: flex;
    justify-content: space-between;
    background-color: rgb(255,255,255,0.8);
    border-bottom: 1px solid rgba(5,5,5,0.06);
  @include e(left) {
    //float: left;
    margin-left: 20px;
  }
  @include e(right) {
    //float: right;
    //display: flex;
    margin-right: 20px;
    //flex: 1;
    //width: 40%;
    @include m(switch) {
      //line-height: 70px;
      margin-top: -1px;
      margin-left: 5px;
    }
  }

}


</style>
