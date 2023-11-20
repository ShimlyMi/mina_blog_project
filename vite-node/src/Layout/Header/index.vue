<template>
    <div class="yz-header">
      <div class="yz-header__left">
        <span>LOGO</span>
      </div>
      <div class="yz-header__right">
        <a-style-provider hash-priority="high" :transformers="[legacyLogicalPropertiesTransformer]" >
          <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
        </a-style-provider>
        <div class="yz-header__right--switch">
          <a-switch v-model:checked="state.checked3" checked-children="深色" un-checked-children="浅色" size="small"></a-switch>
        </div>

      </div>
    </div>
</template>
<script lang="ts" setup>
import { h, ref, reactive  } from 'vue';
import { RouterLink } from "vue-router";
import { MenuProps,legacyLogicalPropertiesTransformer } from 'ant-design-vue';
import { HomeOutlined,MessageOutlined,BarsOutlined,ClockCircleOutlined,TeamOutlined,CommentOutlined,UserOutlined } from '@ant-design/icons-vue';

const state = reactive({checked3: false,})
const current = ref<string[]>(['mail']);
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
    margin-left: 20px;
  }
  @include e(right) {
    display: flex;
    margin-right: 20px;
    @include m(switch) {
      //line-height: 70px;
      margin-left: 5px;
    }
  }

}


</style>