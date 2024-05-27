<script setup name="Message">
import vueDanmaku from 'vue3-danmaku';
import { ref, reactive, onMounted, onActivated, h } from "vue";
import { storeToRefs } from "pinia";
import { addMessage, getMessageList } from "@/api/message.js";
import { useUserStore } from "@/stores/userStore.js";
import { getLocalItem, removeLocalItem, setLocalItem } from "@/utils/tool.js";
import { ElNotification } from "element-plus";

const userStore = useUserStore();
const { getUserInfo, getBlogAvatar } = storeToRefs(userStore);
const loading = ref(false);
const param = reactive({
  current: 1,
  size: 10,
  message: "",
  user_id: getUserInfo.id,
});
const primaryParam = reactive({...param});
const form = reactive({
  id: 0,
  message: "",
  user_id: 0,
  nick_name: "",
  // type: MESSAGE_TYPE.NORMAL
});
const primaryForm = reactive({...form});
const messageList = ref([]);
const danmakuRef = ref(null);

// const avatar = getLocalItem('avatar');

const message = async () => {
  if (form.message.trim() === '') {
    ElNotification({
      offset: 60,
      title: "温馨提示",
      message: h("div", { style: "color: #e6c081; font-weight: 600;" }, "留言内容不能为空"),
    });
    return false;
  }
  // console.log(getUserInfo.avatar)
  // 新增
  let res;
  if (!form.id) {
    form.user_id = 0;
    if (form.user_id !== 0) {
      form.nick_name = getUserInfo.nick_name;
    }
    res = await addMessage(form);
  }

  if (res && res.code === 0) {
    ElNotification({
      offset: 60,
      title: "提示",
      message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "留言成功"),
    });
    Object.assign(form, primaryForm);
    messageList.value.push(res.result.list);
    await pageGetMessageList();
    danmakuRef.value.play();
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
const pageGetMessageList = async () => {
  if (param.current === 1) {
    loading.value = true;
  }
  let res = await getMessageList(param);
  if (res && res.code === 0) {
    messageList.value = param.current === 1 ? res.result.list : messageList.value.concat(res.result.list);
    danmakuRef.value.play();
    loading.value = false;
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
      <vue-danmaku
          use-slot
          ref="danmakuRef"
          class="danmaku"
          v-model:danmus="messageList"
          :random-channel="true"

          autoplay
          :top="50"

          :right="50"
          :isSuspend="true"
      >
        <template v-slot:dm="{ danmu }">
          <div class="bullet-item" >
            <div class="common-message">
              <el-avatar class="left-avatar" :src="danmu.user_id === 0 ? getBlogAvatar : getUserInfo.avatar">{{ danmu.nick_name }}</el-avatar>
<!--              <el-avatar class="left-avatar" v-else :src="getUserInfo.avatar">{{ danmu.nick_name }}</el-avatar>-->
              <span class="user-massage">{{ danmu.message }}</span>
            </div>
          </div>
        </template>
      </vue-danmaku>
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
            @click="message"
        >发射</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  height: 100vh;
  background: url("../../assets/rosie.jpg") no-repeat fixed;
  background-size: cover;
  overflow: hidden;

  .bullet-wrap {
    height: 100%;
    width: 100%;
    position: relative;
    margin-top: 60px;
  }
  .danmaku {
    height: calc(100vh - 60px);
    width: 100vw;
  }
  .bullet-item {
    //position: absolute;
    min-width: 30px;
    text-align: center;
    border: 2px #fff solid;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    //padding: 10px;
    //animation: rightToLeft 10s linear both;
    .common-message {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 0;
    }
    .left-avatar {
      width: 25px;
      height: 25px;
      margin-right: 0.3rem;
    }
    .user-message {
      color: #fff;
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

//@keyframes rightToLeft {
//  0% {
//    transform: translate(100vw);
//  }
//  100% {
//    transform: translate(-100%);
//  }
//}

// pc
@media screen and (min-width: 768px) {
  .center-top {
    .left-avatar {
      width: 25px;
      height: 25px;
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
      width: 25px;
      height: 25px;
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

:deep(.vue-danmaku .danmus .dm.move) {
  animation-duration: 10s!important;
}
</style>
