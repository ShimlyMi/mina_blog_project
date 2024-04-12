<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore.js";
import { ElNotification } from "element-plus";
import { getLocalItem, setLocalItem, removeLocalItem, debounce } from "@/utils/tool.js";
import { fontSizeList, fontWeightList, opTabList, predefineColors } from "./useMessage.js";
import { imgUpload } from "@/api/user.js";
import Upload from "@/components/Upload/index.vue";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { getUserInfo } = storeToRefs(userStore);
const loading = ref(false);
const tabList = ref([]);

function keepLastIndex(dom) {
  let range;
  if (window.getSelection) {
    // IE 11/10/9 firefox safari
    dom.focus(); // 解决 ff 不获取焦点无法定位的问题
    range = window.getSelection(); // 创建 range
    range.selectAllChildren(dom); // range 选择obj下所有子内容
    range.collapseToEnd(); // 光标移至最后
  } else if (document.selection) {
    range = document.selection.createRange(); // 创建选择对象
    range.moveToElementText(dom); // range 定位到 obj
    range.collapse(false); // 光标移至最后
    range.select();
  }
}

const form = reactive({
  id: 0,
  message: "",
  color: "#676767",
  font_size: 16,
  font_weight: 500,
  bg_color: "transparent",
  bg_url: "",
  user_id: 0,
  tag: "",
  nick_name: "",
  bgList: []
});
const primaryForm = Object.assign({ ...form });
const activeTab = ref(0);
</script>

<template>

</template>

<style lang="scss" scoped>

</style>
