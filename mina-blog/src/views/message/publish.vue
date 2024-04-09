<script setup>
import { reactive, onMounted, h } from "vue";
import { storeToRefs } from "pinia";
import { returnTime, getLocalItem, setLocalItem, containHTML } from "@/utils/tool.js";
import { likeMessage, cancelLikeMessage } from "@/api/message.js";
import { addLike, cancelLike } from "@/api/like.js";
import { useUserStore } from "@/stores/userStore.js";
import { ElNotification } from "element-plus";

const userStore = useUserStore();
const { getUserInfo } = storeToRefs(userStore);
const message = reactive({
  id: 0,
  message: "",
  color: "",
  font_size: 16,
  font_weight: 500,
  bg_color: "",
  bg_url: "",
  user_id: 0,
  tag: "",
  like_times: 0,
  nick_name: "",
  avatar: "",
  is_like: false,
});

const like = async (item) => {
  // 取消点赞
  if (item.is_like) {
    const res = await cancelLikeMessage(item.id);
    if (res.code == 0) {
      await cancelLike({ for_id: item.id, type: 3, user_id: getUserInfo.id});
      item.like_times--;
      item.is_like = false;
      ElNotification({
        offset: 60,
        title: "提示",
        message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "已经取消点赞啦~")
      });
    }
  }
  // 点赞
  else {
    const res = await likeMessage(item.id);
    if (res.code == 0) {
      await addLike({ for_id: item.id, type: 3, user_id: getUserInfo.id });
      item.like_times++;
      item.is_like = false;
      ElNotification({
        offset: 60,
        title: "提示",
        message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "已经取消点赞啦~")
      });
    }
  }
  setLocalItem("message-refresh", true);
};
onMounted(() => {
  const item = getLocalItem("blog-message-item");
  if (item) {
    Object.assign(message, item);
  }
});
</script>

<template>
<div class="message">
  <div class="center_box !pt-[80px]">
    <el-card>
      <div :style="{ backgroundColor: message.bg_color }" class="message-card animate__animated animate__fadeIn">
        <div class="top" :style="{ backgroundImage: message.bg_url ? `url(${message.bg_url})` : '' }">
          <div class="top-header">
            <div class="flex items-center cursor-pointer">
              <el-avatar class="left-avatar" :src="message.avatar">{{ message.nick_name }}</el-avatar>
              <span class="nick-name">{{ message.nick_name }}</span>
            </div>
          </div>
          <div
            v-if="containHTML(message.message)"
            v-html="message.message"
            :style="{
              color: message.color,
              fontSize: message.font_size + 'px',
              fontWeight: message.font_weight
             }"></div>
          <div v-else :style="{
              color: message.color,
              fontSize: message.font_size + 'px',
              fontWeight: message.font_weight
          }">{{ message.message }}</div>
        </div>
      </div>
    </el-card>
  </div>
</div>
</template>

<style lang="scss" scoped>
.message {
  .nick-name {
    color: #fff;
    margin-left: 1rem;
    letter-spacing: 1px;
    padding: 3px 8px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  .left {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 3px 8px;
  }

  .time {
    font-size: 12px;
    color: #fff;
    letter-spacing: 1px;
    margin-right: 10px;
  }
}
.message-card {
  height: 22rem;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.top {
  height: 19rem;
  padding: 8px;
  overflow: auto;
  white-space: pre-line;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  &::-webkit-scrollbar {
    display: none;
  }
}

.top-header {
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.index-tag {
  color: #fff;
  font-size: 12px;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 8px;
}
.option {
  color: #fff;
  padding: 1px 5px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}

.center_box {
  min-height: calc(100vh - 128px);
}

// pc
@media screen and (min-width: 768px) {
  .center_box {
    max-width: 600px !important;
  }
  .canter-top {
    .left-avatar {
      width: 48px;
      height: 48px;
    }
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
}
</style>
