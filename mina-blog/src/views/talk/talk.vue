<script setup name="Talk">
import { ref, h,reactive, onMounted, onBeforeMount } from "vue";
import SkeletonItem from "@/components/SkeletonItem/index.vue";
import TextOverflow from "@/components/TextOverflow/index.vue";
import Comment from "@/components/Comment/Comment.vue";
import {useUserStore} from "@/stores/userStore.js";
import {cancelTalkLike, getTalkList, talkLike} from "@/api/talk.js";
import {addLike, cancelLike} from "@/api/like.js";
import { returnTime } from "@/utils/tool.js";
import {ElNotification} from "element-plus";

const userStore = useUserStore();
const loading = ref(false);

const param = reactive({
  current: 1,
  size: 5,
  user_id: userStore.getUserInfo.id
});
const talkList = ref([]);
const total = ref(0);

let observe;
let box;

const observeBox = () => {
  // 获取要监听的元素
  box = document.querySelector(".observer");
  observe = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (e) => {
          if (e.isIntersecting && e.intersectionRatio > 0) {
            if (total.value > talkList.value.length) {
              param.current++;
              await pageGetTalkList();
            }
          }
        });
      },
      { threshold: [1] }
  );
  observe.observe(box);
};

const pageGetTalkList = async () => {
  // 第一次进入才loading
  if (param.current == 1) {
    loading.value = true;
  }
  let res = await getTalkList(param);
  if (res.code == 0) {
    talkList.value = param.current == 1 ? res.result.list : talkList.value.concat(res.result.list);
    total.value = res.result.total;
    loading.value = false;
  }
  // console.log("talk",res)
};

/** 点赞 */
const like = async (item, index) => {
  // 取消点赞
  if (item.is_like) {
    let tRes = await cancelTalkLike(item.id);
    if (tRes.code == 0) {
      await cancelLike({ for_id: item.id, type: 2, user_id: userStore.getUserInfo.id });
      talkList.value[index].is_like = false;
      talkList.value[index].like_times--;
      ElNotification({
        offset: 60,
        title: "提示",
        message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "已取消点赞")
      });
    }
  } else {
    // 点赞
    let tRes = await talkLike(item.id);
    if (tRes.code == 0) {
      await addLike({ for_id: item.id, type: 2, user_id: userStore.getUserInfo.id });
      talkList.value[index].is_like = true;
      talkList.value[index].like_times++;
      ElNotification({
        offset: 60,
        title: "提示",
        message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "点赞成功")
      });
    }
  }
};

onMounted(async () =>{
  await pageGetTalkList();
  if (talkList.value.length < total.value) {
    observeBox();
  }
});

onBeforeMount(() => {
  observe && observe.unobserve(box);
  observe = null;
});
</script>

<template>
<div class="talk center_box">
  <el-card class="talk-card">
    <el-skeleton :loading="loading" style="height: 100%" animated>
      <template #template>
        <div class="flex justify-start w-[100%] !mt-[10px]" v-for="i in 3" :key="i">
          <SkeletonItem variant="text" width="80px" height="80px" />
          <div class="w-[70%] !ml-[10px]">
            <SkeletonItem variant="text" width="40%" height="20px" />
            <SkeletonItem variant="image" width="80%" height="150px" top="10px" />
            <SkeletonItem variant="text" width="60%" height="20px" top="10px" />
          </div>
        </div>
      </template>
      <div class="w-[100%] talk-item-line" v-for="(talk, index) in talkList" :key="index">
        <div class="talk-card__item animate__animated animate__fadeIn">
          <div class="left">
            <el-avatar class="left-avatar" :src="talk.avatar" shape="square" />
          </div>
          <div class="w-[100%]">
            <div class="right">
              <div class="right-top relative">
                <i v-if="talk.is_top == 1" class="iconfont icon-zhiding"></i>
                <span class="nick-name">{{ talk.nick_name }}</span>
                <TextOverflow
                    class="content"
                    :text="talk.content"
                    :width="308"
                    :maxLines="8"
                    :font-size="14"
                >
                  <template v-slot:default="{ clickToggle, expanded }">
                    <span @click="clickToggle" class="btn">
                      {{ expanded ? "收起" : "展开" }}
                    </span>
                  </template>
                </TextOverflow>
              </div>
              <div
                  class="right-bottom"
                  v-if="Array.isArray(talk.talkImgList) && talk.talkImgList.length > 1"
              >
                <div
                    class="image"
                    v-image="url"
                    v-for="(url, index) in talk.talkImgList"
                    :key="index"
                >
                  <el-image
                      class="w-[100%] h-[100%]"
                      :src="url"
                      loading="lazy"
                      preview-teleported
                      :initial-index="index"
                      fit="cover"
                      :preview-src-list="talk.talkImgList.map((v) => v)"
                  >
                    <template #error>
                      <div class="w-[100%] h-[100%] grid place-items-center">
                        <svg-icon name="image404" :width="5" :height="5"></svg-icon>
                      </div>
                    </template>
                  </el-image>
                </div>
              </div>
              <!-- 只有一张图片时 单独大图显示 -->
              <div
                  class="right-bottom-one"
                  v-else-if="Array.isArray(talk.talkImgList) && talk.talkImgList.length === 1"
              >
                <div
                    class="flex justify-center items-center w-[100%] h-[100%] overflow-hidden"
                    v-image="talk.talkImgList[0]"
                >
                  <el-image
                      class="w-[100%] h-[100%]"
                      :src="talk.talkImgList[0]"
                      loading="lazy"
                      preview-teleported
                      :initial-index="index"
                      fit="cover"
                      :preview-src-list="talk.talkImgList.map((v) => v)"
                  >
                    <template #error>
                      <div class="w-[100%] h-[100%] grid place-items-center">
                        <svg-icon name="image404" :width="8" :height="8"></svg-icon>
                      </div>
                    </template>
                  </el-image>
                </div>
              </div>
              <div class="like !mt-[15px]">
                <div class="time">{{ returnTime(talk.createdAt) }}前</div>
                <div>
                  <i
                      :class="['iconfont', talk.is_like ? 'is-like' : '']"
                      @click="like(talk, index)"
                  >&#xe871;</i>
                  <span :class="[talk.is_like ? 'is-like' : '', '!ml-[5px]']">{{ talk.like_times }}</span>
                </div>
              </div>
              <div class="!mt-[10px]">
                <Comment class="w-[100%]" type="talk" :id="talk.id" :author-id="talk.user_id" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="observer">
        {{ talkList.length >= total ? "暂无更多" : "下拉加载更多" }}
      </div>
    </el-skeleton>
  </el-card>
</div>
</template>

<style lang="scss" scoped>
.talk {
  .relative {
    position: relative;
  }

  .icon-zhiding {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.8rem;
    color: var(--top);
  }

  &-card {
    margin-top: 25px;

    &__item {
      padding: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  .nick-name {
    color: var(--font-color);
    font-weight: bold;
  }

  .mt-10 {
    margin-top: 10px;
  }
  .time {
    font-size: 12px;
    color: var(--font-color);
    letter-spacing: 1px;
  }

  .is-like {
    color: var(--primary);
  }

  .observer {
    text-align: center;
    font-size: 1rem;
    color: var(--font-color);
    margin-top: 3px;
    letter-spacing: 1px;
  }
}
.like {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  margin-left: 3px;
  color: var(--primary);
  cursor: pointer;
}

.talk-item-line {
  border-bottom: 1px solid #c3c3c3;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}

// pc
@media screen and (min-width: 768px) {
  .talk-card {
    padding: 40px 50px;
  }
  .left {
    width: 60px;
    height: 60px;

    &-avatar {
      width: 60px;
      height: 60px;
    }
  }

  .like {
    width: 368px;
  }

  .right {
    width: 368px;
    margin-left: 10px;

    &-top {
      min-height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .content {
        margin-top: 15px;
      }
    }

    &-bottom {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 120px 120px 120px;
      grid-auto-rows: 120px;
      gap: 1px;
    }

    &-bottom-one {
      margin-top: 10px;
      width: 220px;
      height: 220px;
      display: grid;
      place-items: center;
    }
  }
}

// mobile
@media screen and (max-width: 768px) {
  .talk-card {
    padding: 40px 3px;
  }
  .left {
    width: 40px;
    height: 40px;

    &-avatar {
      width: 40px;
      height: 40px;
    }
  }
  .like {
    width: 308px;
  }
  .right {
    width: 308px;
    margin-left: 10px;

    &-top {
      min-height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .content {
        margin-top: 3px;
      }
    }

    &-bottom {
      margin-top: 5px;
      display: grid;
      grid-template-columns: 100px 100px 100px;
      grid-auto-rows: 100px;
      gap: 1px;
    }

    &-bottom-one {
      margin-top: 10px;
      width: 180px;
      height: 180px;
      display: grid;
      place-items: center;
    }
  }
}
</style>
