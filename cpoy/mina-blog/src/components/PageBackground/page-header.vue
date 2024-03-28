<script setup>
import {watch, computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {staticData} from "@/stores/index.js";
import {storeToRefs} from "pinia";

const staticStore = staticData()
const {getPageHeaderList} = storeToRefs(staticStore);
const route = useRoute();
const router = useRouter();

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  bgUrl: {
    type: String,
    default: "",
  },
  photoAlbumList: {
    type: Array,
    default: () => {
      [];
    },
  },
});
const finalUrl = ref("");

const getBgCover = computed(() => {
  const bgList = getPageHeaderList.value
  let url;
  if (route.path == '/article') {
    url = props.article.article_cover
  } else if (props.bgUrl) {
    url = props.bgUrl
  } else {
    let index = bgList.findIndex((bg) => bg.route_name == route);
    url = index == -1 ? "https://mrzym.gitee.io/blogimg/cover/cute.jpg" : bgList[index].bg_url;
  }
  // eslint-disable-next-line
  finalUrl.value = url;
  return `background-image: url(${url});}`;
})
const getTitle = computed(() => {
  return route.query.pageTitle ? route.meta.name + " - " + route.query.pageTitle : route.meta.name;
});
watch(
    () => route.path,
    {
      immediate: true,
    }
);
</script>

<template>
  <div :style="getBgCover" class="page-header fadeIn">
    <div v-image="finalUrl" class="loading"></div>
    <div v-if="route.path != '/article'" class="route-font animate__animated animate__fadeIn">

    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
