<script setup name="Message">
import { ref, reactive, onMounted, onBeforeMount, h, onActivated, nextTick } from "vue";
import {useRoute, useRouter} from "vue-router";
import { storeToRefs } from "pinia";
import { Edit, Delete, Search } from "@element-plus/icons-vue";
import { ElNotification, ElMessageBox } from "element-plus";
import { gsapTransXScale } from "@/utils/transform.js";
import TypeWriter from "@/components/TypeWriter/type-writer.vue";
import {
  getMessageList,
  likeMessage,
  cancelLikeMessage,
  deleteMessage,
  updateMessage,
  addMessage
} from "@/api/message.js";
import { addLike, cancelLike } from "@/api/like.js";
import svgIcon from "@/components/SvgIcon/index.vue";
import { returnTime, setLocalItem, removeLocalItem, getLocalItem, containHTML, filterMessage } from "@/utils/tool.js";
import { useUserStore } from "@/stores/userStore.js";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { getUserInfo, getBlogAvatar } = storeToRefs(userStore);
const messageList = ref([]);

const param = reactive({
  current: 1,
  size: 10,
  tag: "",
  message: "",
  user_id: getUserInfo.value.id
});
const primaryParam = reactive({...param});

// 发布留言
const form = reactive({
  id: 0,
  message: "",
  user_id: 0,
  nick_name: ''
});
const primaryForm = Object.assign({ ...form });
const inputCommentRef = ref("");

const line = ref(0);

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
// 当鼠标点入输入框做的事情  光标得在最后一位
const focusCommentInput = () => {
  if (inputCommentRef.value.innerHTML == "留下点什么再走吧~") {
    inputCommentRef.value.innerHtml = "";
  }
  keepLastIndex(inputCommentRef.value);
};

/** 获取留言列表 */
const pageGetMessageList = async () => {
  let res = await getMessageList(param);
  if (res.code == 0) {
    const { list } = res.result;
    messageList.value = param.current == 1 ? list : messageList.value.concat(list);
  }
}

const messgae = async () => {
  if (!form.message) {
    ElNotification({
      offset: 60,
      title: "温馨提示",
      message: h("div", { style: "color: #e6c081; font-weight: 600;" }, "留言内容不能为空"),
    });
    return;
  }
  // 新增
  if (!form.id) {
    form.user_id = getUserInfo.value.id;
  }

  let res;
  if (form.id) {
    res = await updateMessage(form);
  } else {
    res = await addMessage(form);
  }
  if (res && res.code == 0) {
    ElNotification({
      offset: 60,
      title: "提示",
      message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "留言成功"),
    });
    Object.assign(form, primaryForm);
    removeLocalItem("blog-massage-item");
    setLocalItem("message-refresh", true);
  } else {
    ElNotification({
      offset: 60,
      title: "错误提示",
      message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message),
    });
  }
}

onMounted(async () => {
  removeLocalItem("message-refresh");
  await pageGetMessageList();
});
onActivated(async () => {
  if (getLocalItem("message-refresh")) {
    Object.assign(param, primaryParam);
    await pageGetMessageList();
    removeLocalItem("message-refresh");
  }
});
</script>

<template>
<div class="message">
  <!-- 留言弹幕 -->
  <div class="bullet-wrap">
    <div class="bullet-item" v-for="item in messageList" :key="item.id">
      <div v-if="!item.user_id" class="no-user-message">
        <el-avatar class="left-avatar" :src="getBlogAvatar">{{ item.nick_name }}</el-avatar>
        <span class="user-message">{{ item.message }}</span>
      </div>
      <template v-else>
        <el-avatar class="left-avatar" :src="item.avatar">{{ item.nick_name }}</el-avatar>
        <span class="user-message">{{ item.message }}</span>
      </template>
    </div>
  </div>
  <div class="message-body">
<!--    <img src="../../assets/rosie.jpg" alt="">-->
    <div class="comment clearfix">
      <el-input
          v-model="form.message"
          class="publish"
          placeholder="留下什么再走吧~"
          clearable
          maxlength="12"
          type="text"
      />
    </div>
    <div class="p-btn">
      <el-button
          class="leave-message"
          @click="messgae"
      >发射</el-button>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.message {
  height: 100vh;
  background: url("../../../assets/rosie.jpg") no-repeat fixed;
  background-size: cover;
  overflow: hidden;

  .bullet-wrap {
    height: 100%;
    position: relative;
    margin-top: 60px;
  }
  .bullet-item {
    position: absolute;
    min-width: 50px;
    text-align: center;
    border: 2px #fff solid;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    animation: rightToLeft 10s linear both;
    .no-user-message {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 10px;
    }
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
  }

  &-body {
    display: flex;
    overflow: hidden;
    .comment, p-btn {
      height: 100vh;
      position: relative;

    }
    .publish {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .p-btn {
      position: fixed;
      top: 50%;
      left: calc(50% + 150px);
      transform: translate(-50%, -50%);
    }

    .leave-message {
      width: 50px;
      height: 35px;
      border-radius: 10px;
      color: #fff;
      margin-left: 10px;
      background-color: transparent;
    }
  }
}

:deep(.el-input) {
  --el-input-bg-color: transparentize(0);
  --el-input-border-color: #fff;
  --el-input-text-color: #fff;
}
:deep(.el-input__inner) {
  &::placeholder{
    color: #fff;
  }
}

@keyframes rightToLeft {
  0% {
    transform: translate(100vw);
  }
  100% {
    transform: translate(-100%);
  }
}

// pc
@media screen and (min-width: 768px) {
  .center-top {
    .left-avatar {
      width: 48px;
      height: 48px;
    }
  }

  .publish-pc {
    position: fixed;
    top: 150px;
    right: 50px;
    z-index: 3001;
    cursor: pointer;
    border: none;
  }

  .publish-mobile {
    display: none;
  }
}

.publish {
  height: 35px;
  width: 250px;
  :deep(.el-input__wrapper) {
    border-radius: 20px;
  }
}

// mobile
@media screen and (max-width: 768px) {
  .center-top {
    .left-avatar {
      width: 40px;
      height: 40px;
    }
  }

  .publish-mobile {
    position: fixed;
    top: 150px;
    right: 10px;
    z-index: 3001;
    cursor: pointer;
    border: none;
  }

  .publish-pc {
    display: none;
  }
}
</style>
