<script setup>
import { ref, onMounted, reactive, h } from "vue";
import { useRouter } from "vue-router";

import { getNoticeList, deleteNotice, updateNotice } from "@/api/notice.js";
import { containHTML } from "@/utils/tool.js";

import { ElNotification } from "element-plus";
import { Delete, Compass } from "@element-plus/icons-vue";

const router = useRouter();

const props = defineProps({
  type: {
    type: String,
    default: ""
  },
  userId: {
    type: Number,
    default: 0
  }
});
const drawerShow = ref(false);
const messageList = ref([]);

const params = reactive({
  current: 1,
  size: 10,
  userId: 0
});
const messageTotal = ref(0);
const redTotal = ref(0);

const toggleDrawer = async () => {
  drawerShow.value = !drawerShow.value;
  params.current = 1;

  if (drawerShow.value) {
    await getMessageList();
  }
};

// 关闭消息推送
const handleClose = async () => {
  params.current = 1;
  await getMessageList();
  drawerShow.value = false;
};

const readMessage = async (id) => {
  await updateNotice(id);
};

const jump = async (item) => {
  // 消费message
  item.isView == 1 && (await readMessage(item.id));

  switch (item.type + "") {
    // 文章
    case "1":
      router.push({ path: "/article", query: { id: item.to_id } });
      break;
      // 说说
    case "2":
      router.push({ path: "/talk", query: { id: item.to_id } });
      break;
    // 留言
    case "3":
      router.push({ path: "/message/list" });
      break;
      // 友链
    case "4":
      // window.open(" ")
      router.push({ path: "/message/list" });
      break;
  }
  await handleClose();
}

const deleteMessage = async (confirm) => {
   const res = await deleteNotice(confirm.id);
   if (res && res.code == 0) {
     ElNotification({
       offset: 60,
       title: "提示",
       message: h("div", {style: "color: #7ec050; font-weight: 600;"}, "删除成功")
     });
     params.current = 1;
     await getMessageList();
   } else {
     ElNotification({
       offset: 60,
       title: "错误提示",
       message: h("div", {style: "color: #f56cbc; font-weight: 600;"}, res.message)
     });
   }
}

const getMore = () => {
  params.current++;
  getMessageList();
};

const getMessageList = async () => {
  redTotal.value = 0;
  params.userId = props.userId;
  const res = await getNoticeList(params);
  if (res.code == 0) {
     const { list, total } = res.result;
     messageList.value = params.current == 1 ? list : messageList.value.concat(list);
     messageTotal.value = total;
     Array.isArray(messageList.value) && messageList.value.forEach((v) => {
       if (v.isView == 1) {
         redTotal.value++;
       }
     });
  }
};

onMounted(async () => {
  await getMessageList();
});
</script>

<template>
  <div class="message-drawer">
    <i class="iconfont icon-bell1" @click="toggleDrawer">
      <el-badge class="red-total" v-if="redTotal" :value="redTotal" :max="9"></el-badge>
    </i>
    <el-drawer
        class="message-drawer__body"
        v-model="drawerShow"
        :size="type == 'pc' ? '40%' : '80%'"
        title="我的消息"
        direction="ltr"
        :before-close="handleClose"
        :append-to-body="true"
    >
      <el-card class="p-[15px] mt-[10px] card-hover" v-for="item in messageList" :key="item.id">
        <div class="flex items-center" @click="jump(item)">
          <el-badge class="w-[90%]" v-if="item.isView == 1" :value="'new'">
            <span v-if="containHTML(item.message)" v-html="item.message"></span>
            <span v-else>{{ item.message }}</span>
          </el-badge>
          <div v-else class="grey w-[90%]">
            <span v-if="containHTML(item.message)" v-html="item.message"></span>
            <span v-else>{{ item.message }}</span>
          </div>
        </div>

        <div class="flex items-center justify-end">
          <el-icon @click="jump(item)">
            <Compass :class="['jump', item.isView != 1 ? 'grey' : '']" />
          </el-icon>
          <el-popconfirm
              width="120"
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon-color="#626AEF"
              title="确定要删除吗?"
              @confirm="deleteMessage(item)"
          >
            <template #reference>
              <el-icon class="ml-[5px]"><Delete class="delete" /></el-icon>
            </template>
          </el-popconfirm>
        </div>
      </el-card>
      <div class="observer" @click="getMore">
        {{ !messageList.length ? '啥也没有' : messageList.length >= messageTotal ? '已经到底啦~' : '加载更多' }}
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.message-drawer {
  .icon-bell1 {
    position: relative;
    font-size: 1.6rem;
  }

  .red-total {
    position: absolute;
    bottom: 6px;
    left: 12px;
  }
}

.grey {
  color: #ccc !important;
}

.delete {
  cursor: pointer;
  color: var(--hot-color);
  transition: all 0.5s;
  &:hover {
    color: red;
    transform: scale(1.1);
  }
}

.jump {
  cursor: pointer;
  color: var(--primary);
  transition: all 0.5s;
  &:hover {
    color: var(--md-active);
    transform: scale(1.1);
  }
}

.observer {
  text-align: center;
  font-size: 1rem;
  color: var(--primary);
  margin-top: 8px;
  letter-spacing: 1px;
  cursor: pointer;
}
</style>
