<script setup>
import { ref, watch } from "vue";

const barrage = ref();

const props = defineProps({
  avatar: {
    type: String,
    default: ""
  },
  nick_name: {
    type: String,
    default: ""
  },
  message: {
    type: String,
    default: ""
  },
  barrageList: {
    type: Array,
    default: () => {},
  },
  loop: { // 弹幕是否循环
    type: Boolean,
    default: false
  },
  isShow: { // 是否显示弹幕
    type: Boolean,
    default: true
  },
  lanesCount: {  // 泳道
    type: Number,
    default: 10
  }
})

watch(
    () => props.barrageList,
    {
      immediate: true,
      deep: true,
    }
);
</script>

<template>
<vue-babarrage
  ref="barrage"
  :lanesCount="lanesCount"
  :loop="loop"
  :isShow="isShow"
  :barrageList="barrageList"
>
  <template slot="props">
    <el-avatar class="left-avatar" :src="avatar">{{ nick_name }}</el-avatar>
    <span class="user-message">{{ message }}</span>
  </template>
</vue-babarrage>
</template>

<style scoped lang="scss">
.left-avatar {
  width: 30px;
  height: 30px;
}
.user-message {
  color: #fff;
  margin-left: 0.3rem;
  letter-spacing: 1px;
  font-size: 16px;
}
</style>
