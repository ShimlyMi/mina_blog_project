<script setup name="Message">
import { ref, reactive, onMounted, onBeforeMount, h } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Edit, Delete, Search } from "@element-plus/icons-vue";
import { ElNotification, ElMessageBox } from "element-plus";
import { gsapTransXScale } from "@/utils/transform.js";
import TypeWriter from "@/components/TypeWriter/type-writer.vue";
import { getMessageList, likeMessage, cancelLikeMessage, deleteMessage, getMessageTag } from "@/api/message.js";
import { addLike, cancelLike } from "@/api/like.js";
import svgIcon from "@/components/SvgIcon/index.vue";
import { returnTime, setLocalItem, removeLocalItem, getLocalItem, containHTML, filterMessage } from "@/utils/tool.js";
import { useUserStore } from "@/stores/userStore.js";

const router = useRouter();
const userStore = useUserStore();
const { getUserInfo } = storeToRefs(userStore);
const messageList = ref([]);
const total = ref(0);
const loading = ref(false);
let observe;
let box;
const param = reactive({
  current: 1,
  size: 4,
  tag: "",
  message: "",
  user_id: getUserInfo.value.id
});
const primaryParam = reactive({...param});
const activeTab = ref(0);
const tabList = ref([]);
const showSearch = ref(false);
const searchTag = ref("");

const changeTab = (key, label) => {
  activeTab.value =  key;
  param.tag = label;
  searchTag.value = "";
  if (label == "全部") {
    param.tag = "";
  }
  param.current = 1;
  pageGetMessageList();
};
const observeBox = () => {
  // 获取要监听的元素
  box = document.querySelector(".observer");
  observe = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (e) => {
          if (e.isIntersecting && e.intersectionRatio > 0) {
            if (total.value > messageList.value.length && !loading.value) {
              param.current++;
              await pageGetMessageList();
            }
          }
        });
      },
      { threshold: [1] }
  );
  box && observe.observe(box);
};
const pageGetMessageList = async () => {
  if (param.current == 1) {
    loading.value = true;
  }
  let res = await getMessageList(param);
  if (res.code == 0) {
    const { list } = res.result;
    messageList.value = param.current == 1 ? res.result.list : messageList.value.concat(res.result.list);
    let classList = res.result.list.map((item, index) => {
      return ".message" + (messageList.value.length - list.length + index);
    });
    total.value = res.result.total;
    if (messageList.value.length < total.value) {
      observeBox();
    } else {
      observe && observe.unobserve(box);
      observe = null;
    }
    await nextTick(() => {
      gsapTransXScale(classList, 0.85, 0.8);
    });
    loading.value = false;
  }
};
const like = async (item, index) => {
  // 取消点赞
  if (item.is_like) {
    const res = await cancelLikeMessage(item.id);
    if (res.code == 0) {
      // 记录 留言取消点赞
      if (getUserInfo.value.id) {
        await cancelLike({ for_id: item.id, type: 3, user_id: getUserInfo.value.id });
      }
      messageList.value[index].like_times--;
      messageList.value[index].is_like = false;
      ElNotification({
        offset: 60,
        title: '提示',
        message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "已经取消点赞啦~")
      });
    }
  }
  // 点赞
  else {
    const res = await likeMessage(item.id);
    if (res.code == 0) {
      // 记录 留言点赞
      if (getUserInfo.value.id) {
        await cancelLike({ for_id: item.id, type: 3, user_id: getUserInfo.value.id });
      }
      messageList.value[index].like_times++;
      messageList.value[index].is_like = true;
      ElNotification({
        offset: 60,
        title: '提示',
        message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "已经取消点赞啦~")
      });
    }
  }
};
const comment = (item) => {
  if (item) {
    setLocalItem("blog-message-item", item);
  }
  router.push({ path: "/message/detail" });
};
const handleEditMessage = (item) => {
  if (item) {
    setLocalItem("blog-message-item", item);
  }
  router.push({ path: "/message/publish", query: { type: "edit" } });
};
const addMessage = () => {
  router.push({ path: "/message/publish", query: { type: "add" } });
};
const handleDeleteMessage = (item) => {
  ElMessageBox.confirm("确认删除此留言吗？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消"
  }).then(async () => {
    const res = await deleteMessage(item.id);
    if (res && res.code == 0) {
      ElNotification({
        offset: 60,
        title: "提示",
        message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "删除成功"),
      });
      observe && observe.unobserve(box);
      observe = null;
      param.current = 1;
      await pageGetMessageList();
    } else {
      ElNotification({
        offset: 60,
        title: "错误提示",
        message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message),
      });
    }
  })
};

</script>

<template>

</template>

<style scoped lang="scss">

</style>
