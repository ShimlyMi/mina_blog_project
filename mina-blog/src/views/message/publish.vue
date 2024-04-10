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
</script>

<template>

</template>

<style lang="scss" scoped>

</style>
