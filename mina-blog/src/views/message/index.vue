<script setup name="Message">
import { ref, reactive, onMounted, onBeforeMount, h, onActivated, nextTick } from "vue";
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

const pageGetMessageList = async () => {
  if (param.current == 1) {
    loading.value = true;
  }
  let res = await getMessageList(param);
  // console.log(res)
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



</script>

<template>
<div class="message !min-h-[60vh]">
  <div class="message-container">
    <img src="../../assets/rosie.jpg" alt="">
  </div>
</div>
</template>

<style lang="scss" scoped>
.message {
  //background-image: url("../../assets/rosie.jpg");
  height: 100%;
  .row-height {
    min-height: 22rem;

  }
  &-header {
    padding-top: 130px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .message-title {
    font-size: 2.4rem;
    font-weight: 600;
    color: #000;
  }
  .type-writer {
    color: #000;
  }

  .space {
    color: #000;
  }

  &-body {
    min-height: 35rem;
    .search-tab {
      width: 100%;
      min-height: 3rem;
      background-color: rgba(0, 0, 0, 0.2);
      margin-bottom: 1rem;
      border-radius: 2rem;
    }
    .tab {
      width: 100%;
      min-height: 3rem;
      padding: 0.5rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      flex-wrap: wrap;
      font-size: 1.2rem;
      font-weight: 600;

      li {
        margin-right: 1rem;
      }

      .tab-li {
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        padding: 0 0.6rem;
        border-radius: 1rem;
      }
      .active-tab {
        color: #fff;
        background-color: var(--primary);
      }
    }

    .message-card {
      position: relative;
      height: 20rem;
    }

    .img-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 5rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

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

    .message-comment {
      font-size: 12px;
      color: #fff;
      letter-spacing: 1px;
      padding: 3px 8px;
    }

    .option-top {
      color: #fff;
      padding: 3px 8px;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.2);
    }

    .option {
      color: #fff;
      padding: 1px 8px;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.2);
    }
    .top-header {
      height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .top {
      height: 17rem;
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
    .index-tag {
      font-size: 12px;
      color: #fff;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3rem;
      padding: 8px;
    }
  }

  .apply-tag {
    text-align: center;
    color: var(--font-color);
    font-size: 16px;
  }
}
.apply-button {
  position: relative;
  display: inline-block;
  padding: 5px 20px;
  background-color: transparent;
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: 900;
  font-size: 16px;
  background-image: var(--button-linear-gradient);
  color: var(--white);
  transition: all .6s;
  cursor: pointer;
  border: none;
  z-index: 1;
}
.apply-button:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  border-radius: 8px;
  z-index: -1;
  transition: opacity .6s ease-in-out;
  background-image: var(--button-linear-gradient-h);
}
.observer {
  text-align: center;
  font-size: 1rem;
  color: #000;
  margin-top: 10px;
  letter-spacing: 1px;
}
.btn {
  margin-left: 3px;
  color: var(--primary);
  cursor: pointer;
}

.scale {
  transition: all 0.3s;
}
.scale:hover {
  transform: scale(1.2);
}

.loading {
  width: 100%;
  height: 22rem;
  display: flex;
  justify-content: center;
  align-items: center;
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

.search {
  height: 28px;
  width: 220px;
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
