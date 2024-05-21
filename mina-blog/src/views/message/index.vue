<script setup name="Message">
import {h, reactive, ref, onMounted, onActivated} from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore.js";
import { MESSAGE_TYPE } from "vue-baberrage";
import { getMessageList, addMessage } from "@/api/message.js";

import Barrage from "@/components/Barrage/index.vue";
import {ElNotification} from "element-plus";
import {getLocalItem, removeLocalItem, setLocalItem} from "@/utils/tool.js";

const userStore = useUserStore();
const { getBlogAvatar, getUserInfo } = storeToRefs(userStore);

const loading = ref(false);

const param = reactive({
  current: 1,
  size: 10,
  message: "",
  user_id: getUserInfo.value.id
});
const primaryParam = reactive({...param});

const form = reactive({
  id: 0,
  message: "",
  user_id: 0,
  type: MESSAGE_TYPE.NORMAL
})
const primaryForm = reactive({...form});
const barrageList = ref([]);

const pageGetMessageList = async () => {
  let res = await getMessageList(param);
  if (res.code === 0) {
    const { list } = res.result;
    barrageList.value = param.current === 1 ? list : barrageList.value.concat(list);
  }
}

const message = async () => {
  if (form.message.trim() === '') {
    ElNotification({
      offset: 60,
      title: "温馨提示",
      message: h("div", { style: "color: #e6c081; font-weight: 600;" }, "留言内容不能为空"),
    });
    return false;
  }

  let res;
  if (!form.id) {
    res = await addMessage(form);
  } else if (getUserInfo.id) {
    form.user_id = getUserInfo.value.id;
    res = await addMessage(form);
  }
  if (res && res.code === 0) {
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
      <div class="bullet-item">
        <template v-if="!getUserInfo.id">
          <Barrage
              :avatar="getBlogAvatar"
              :barrage-list="barrageList"
              :loop="true"
              :message="form.message"
              :nick_name="getUserInfo.nick_name"
          />
        </template>
        <template v-else>
          <Barrage
              :avatar="getUserInfo.avatar"
              :barrage-list="barrageList"
              :loop="true"
              :message="form.message"
              :nick_name="getUserInfo.nick_name"
          />
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
            @click="message"
        >发射</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  height: 100vh;
  //background: url("../../../assets/rosie.jpg") no-repeat fixed;
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