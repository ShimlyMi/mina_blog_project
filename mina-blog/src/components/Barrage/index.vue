<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore.js";

const userStore = useUserStore();
const { getBlogAvatar } = storeToRefs(userStore);
const barrage = ref();

const props = defineProps({
  barrageList: {
    type: Array,
    default: () => {},
  },
  avatar: {
    type: String,
    default: "",
  },
  nick_name: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  isShow: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  lanesCount: {
    type: Number,
    default: 10,
  },
  maxWordCount: {
    type: Number,
    default: 12
  },
  throttleGap: {
    type: Number,
    default: 2000
  },

});
watch(
    () => props.barrageList,
    {
      immediate: true,
      deep: true,
    }
)

</script>
<template>
    <vue-barrage
        :lanesCount="lanesCount"
        :isShow= "isShow"
        :barrageList = "barrageList"
        :loop = "loop"
        :maxWordCount = "maxWordCount"
    >
        <template slot="props">
          <el-avatar class="left-avatar" :src="avatar">{{ nick_name }}</el-avatar>
          <span class="user-massage">{{ message }}</span>
        </template>
    </vue-barrage>
</template>



<style scoped>

</style>
