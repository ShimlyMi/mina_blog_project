<script setup lang="ts" name="TalkList">
import { useRouter } from "vue-router";
import TextOverflow from "@/components/TextOverflow/index.vue";
import { useNav } from "@/layout/hooks/useNav";
// import zhiding from "@/assets/svg/zhiding.svg?component";
import { onMounted, reactive, ref } from "vue";
import {
  getTalkList,
  revertTalk,
  deleteTalkById,
  togglePublic,
  toggleTop
} from "@/api/talk";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Plus from "@iconify-icons/ep/plus";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";

const router = useRouter();
const { nick_name, avatar, role } = useNav();

/** LIST */
const param = reactive({
  current: 1,
  size: 5,
  status: 1
});
const talkList = ref([]);
let observe;

const total = ref(0);
const talkTab = [
  {
    key: 1,
    content: "公开说说",
    title: "公开说说"
  },
  {
    key: 2,
    content: "私密说说",
    title: "私密说说"
  },
  {
    key: 3,
    content: "回收站",
    title: "回收站"
  }
];

/**  */
const tabChange = async (val: any) => {
  param.status = val.index ? Number(val.index) + 1 : null;
  param.current = 1;
  await pageGetTalkList();
  if (talkList.value.length < total.value) {
    observeTalkBottom();
  }
};
const pageGetTalkList = async (e?: any) => {
  // console.log(nick_name, avatar);
  const res = await getTalkList(param);
  if (res.code == 0) {
    talkList.value =
      param.current == 1
        ? res.result.list
        : talkList.value.concat(res.result.list);
    total.value = res.result.total;
    // console.log(talkList.value);
    if (e && talkList.value.length >= total.value) {
      observe.unobserve(e.target); // 停止监听
    }
  }
};

/** 公开 / 隐藏 */
const toggleP = async (id: number, status: number) => {
  const res = await togglePublic(id, status == 1 ? 2 : 1);
  if (res.code == 0) {
    message(`已将说说设置为${status == 1 ? "仅自己可见" : "所有人可见"}`, {
      type: "success"
    });
    pageGetTalkList();
  }
};
/** 置顶与否 */
const toggleT = async (id: number, is_top: number) => {
  const res = await toggleTop(id, is_top == 1 ? 2 : 1);
  if (res.code == 0) {
    message(`${is_top == 1 ? "取消置顶" : "置顶"}成功`, { type: "success" });
    pageGetTalkList();
  }
};
/** 编辑 */
const edit = (id: number) => {
  router.push({
    path: "/talk/edit",
    query: { id: id }
  });
};
/** 恢复 */
const revertT = async (id: number) => {
  const res = await revertTalk(id);
  if (res.code == 0) {
    message("恢复成功", { type: "success" });
    pageGetTalkList();
  }
};

/** 删除 */
const deleteT = async (id: number, status: number) => {
  const res = await deleteTalkById(id, status);
  if (res.code == 0) {
    message(`${status == 3 ? "彻底删除成功" : "说说已经入回收站"}`, {
      type: "success"
    });
    param.current = 1;
    pageGetTalkList();
  }
};

/** 处理下拉函数 */
const handleCommand = async (command: string, talk: any) => {
  switch (command) {
    case "toggleTop":
      toggleT(talk.id, talk.is_top);
      break;
    case "togglePublic":
      toggleP(talk.id, talk.status);
      break;
    case "revert":
      revertT(talk.id);
      break;
    case "edit":
      edit(talk.id);
      break;
    case "delete":
      ElMessageBox.confirm(
        `${talk.status == 3 ? "确认删除" : "确认回收"}`,
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }
      ).then(() => {
        deleteT(talk.id, talk.status);
      });
      break;
    default:
      break;
  }
};

const observeTalkBottom = () => {
  // 获取要监听的元素
  const box = document.querySelector(".observer");
  observe = new IntersectionObserver(
    entries => {
      entries.forEach(async e => {
        if (e.isIntersecting && e.intersectionRatio > 0) {
          param.current++;
          await pageGetTalkList(e);
        }
      });
    },
    { threshold: [1] }
  );
  observe.observe(box);
};

const operate = () => {
  router.push("/talk/add");
};

const returnTime = (time: any) => {
  time = time.replace(/-/g, "/"); // 解决ios系统上格式化时间出现NAN的bug
  const dateTime = new Date().getTime() - new Date(time).getTime();
  let res;
  if (dateTime < 6e4) {
    res = Math.trunc(dateTime / 1000) + "秒";
  } else if (dateTime >= 6e4 && dateTime < 3.6e6) {
    res = Math.trunc(dateTime / 6e4) + "分钟";
  } else if (dateTime >= 3.6e6 && dateTime < 8.64e7) {
    res = Math.trunc(dateTime / 3.6e6) + "小时";
  } else {
    res = Math.trunc(dateTime / 8.64e7) + "天";
  }
  return res;
};

onMounted(async () => {
  await pageGetTalkList();
  if (talkList.value.length < total.value) {
    observeTalkBottom();
  }
});
</script>

<template>
  <el-card class="talk-card">
    <template #header v-if="role == 1">
      <div class="flex justify-end items-center">
        <el-button
          v-waves
          type="primary"
          plain
          style="margin-left: 10px"
          :icon="useRenderIcon(Plus)"
          @click="operate"
        >
          发布说说
        </el-button>
      </div>
    </template>
    <el-tabs @tab-click="tabChange">
      <template v-for="item of talkTab" :key="item.key">
        <el-tab-pane :lazy="true">
          <template #label>
            <el-tooltip :content="item.content" placement="top-end">
              <span>{{ item.title }}</span>
            </el-tooltip>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
    <!-- 主题内容 -->
    <div class="talk-card__list">
      <el-card
        :class="[index ? 'mt-[20px]' : '', 'w-[500px]', 'talk-list']"
        v-for="(talk, index) in talkList"
        :key="talk.id"
      >
        <template #header>
          <div class="flex justify-between">
            <div class="hiding">
              <!--              <zhiding v-if="talk.status == 1 && talk.is_top == 1" />-->
            </div>
            <el-dropdown
              @command="
                val => {
                  handleCommand(val, talk);
                }
              "
              trigger="click"
            >
              <span class="el-dropdown-link">
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-if="[1, 2].includes(talk.status)"
                    command="edit"
                    >编辑</el-dropdown-item
                  >
                  <el-dropdown-item v-if="talk.status == 1" command="toggleTop">
                    {{ talk.is_top == 1 ? "取消置顶" : "置顶" }}
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="[1, 2].includes(talk.status)"
                    command="togglePublic"
                    >{{
                      talk.status == 1 ? "仅自己可见" : "所有人可见"
                    }}</el-dropdown-item
                  >
                  <el-dropdown-item v-if="talk.status == 3" command="revert"
                    >恢复说说</el-dropdown-item
                  >
                  <el-dropdown-item command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
        <div class="talk-header">
          <el-avatar
            class="talk-header__left"
            :size="40"
            :src="talk.avatar || avatar"
            shape="square"
          />
          <div class="talk-header__right">
            <span class="nick-name">{{ talk.nick_name || nick_name }}</span>
            <TextOverflow
              class="mt-[5px]"
              :text="talk.content"
              :width="273"
              :maxLines="8"
              :font-size="13"
            >
              <template v-slot:default="{ clickToggle, expanded }">
                <button @click="clickToggle" class="btn">
                  {{ expanded ? "收起" : "展开" }}
                </button>
              </template>
            </TextOverflow>
          </div>
        </div>
        <div
          class="talk-img"
          v-if="Array.isArray(talk.talkImgList) && talk.talkImgList.length > 1"
        >
          <el-image
            v-for="(url, index) in talk.talkImgList"
            :key="index"
            :src="url"
            class="w-[80px] h-[80px]"
            loading="lazy"
            preview-teleported
            :initial-index="index"
            fit="cover"
            :preview-src-list="talk.talkImgList.map(v => v)"
          />
        </div>
        <div
          class="talk-img-one"
          v-else-if="
            Array.isArray(talk.talkImgList) && talk.talkImgList.length == 1
          "
        >
          <el-image
            :key="index"
            :src="talk.talkImgList[0]"
            class="w-[120px] h-[120px]"
            loading="lazy"
            preview-teleported
            :initial-index="index"
            fit="cover"
            :preview-src-list="talk.talkImgList.map(v => v)"
          />
        </div>
        <div class="time">{{ returnTime(talk.createdAt) }}前</div>
      </el-card>
    </div>

    <div class="observer">
      {{ talkList.length >= total ? "暂无更多" : "下拉加载更多" }}
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.talk-card {
  height: calc(100vh - 130px);
  overflow: auto;
}
.filter-container {
  padding-bottom: 10px;
}
.talk-card::-webkit-scrollbar {
  display: none;
}

.hiding {
  width: 20px;
  height: 20px;
}
.talk-card__list {
  width: 500px;
  margin: 0 auto;
}

.talk {
  &-list {
    overflow-y: auto;
  }

  &-header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    &__left {
      width: 40px;
    }

    &__right {
      margin-left: 5px;
      width: 199px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .nick-name {
        font-size: 14px;
      }

      .btn {
        margin-left: 3px;
        background-color: #fff;
        color: #4091f7;
      }
    }
  }
  &-content {
    margin-left: 40px;
  }

  &-img {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 80px 80px 80px;
    grid-auto-rows: 80px;
    gap: 1px;
  }

  &-img-one {
    margin-top: 20px;
    width: 120px;
    height: 120px;
  }
}

.time {
  font-size: 12px;
  margin-top: 20px;
  letter-spacing: 1px;
  color: #676767;
}

.observer {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
  width: 100%;
}
</style>
