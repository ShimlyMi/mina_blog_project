<script setup lang="ts" name="TalkList">
import { useRouter } from "vue-router";
import Upload from "@/components/Upload/index.vue";
import { useNav } from "@/layout/hooks/useNav";
import zhiding from "@/assets/svg/zhiding.svg?component";
import { onMounted, reactive, ref } from "vue";
import { getTalkList } from "@/api/talk";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Plus from "@iconify-icons/ep/plus";
import Delete from "@iconify-icons/ep/delete";

const router = useRouter();
const { nick_name } = useNav();

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

const talkFormRef = ref();
const talkForm = reactive({
  id: null,
  content: "", //说说内容
  is_top: 2, // 置顶 2 取消置顶 3
  status: 1, // 1 公开 2 私密
  talkImgList: [],
  user_id: 0
});
const dialogVisible = ref(false);
const primaryTalkForm = reactive({ ...talkForm });
const tabChange = async (val: any) => {
  param.status = val.index ? Number(val.index) + 1 : null;
  param.current = 1;
  await pageGetTalkList();
  if (talkList.value.length < total.value) {
    observeTalkBottom();
  }
};
const pageGetTalkList = async (e?) => {
  const res = await getTalkList(param);
  if (res.code == 0) {
    talkList.value =
      param.current == 1
        ? res.result.list
        : talkList.value.concat(res.result.list);
    total.value = res.result.total;
    if (e && talkList.value.length >= total.value) {
      observe.unobserve(e.target); // 停止监听
    }
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

const closeDialog = () => {
  talkFormRef.value.resetFields();
  Object.assign(talkForm, primaryTalkForm);
  dialogVisible.value = false;
};
const operate = (type, val?) => {
  switch (type) {
    case "add":
      dialogVisible.value = true;
      break;
    default:
      return;
  }
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
    <template #header>
      <div class="flex justify-end items-center">
        <el-button
          v-waves
          type="primary"
          plain
          style="margin-left: 10px"
          :icon="useRenderIcon(Plus)"
          @click="operate('add')"
        >
          发布说说
        </el-button>
        <el-button
          v-waves
          type="danger"
          plain
          style="margin-left: 10px"
          :icon="useRenderIcon(Delete)"
        >
          批量删除
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
    <el-card
      :class="[index ? 'mt-[20px]' : '', 'w-[284px', 'talk-list']"
      v-for="(talk, index) in talkList"
      :key="talk.id"
    >
      <template #header>
        <div class="flex justify-between">
          <div><zhiding v-if="talk.status == 1 && talk.is_top == 1" /></div>
        </div>
      </template>
    </el-card>

    <!--  DIALOG  -->
    <el-dialog
      :title="talkForm.id ? '编辑说说' : '新增说说'"
      v-model="dialogVisible"
      :width="400"
      :before-close="closeDialog"
    >
      <el-form
        ref="talkFormRef"
        :model="talkForm"
        label-width="60px"
        label-suffix=":"
      >
        <el-form-item label="内容">
          <el-input
            type="textarea"
            v-model="talkForm.content"
            clearable
            class="max-w-[300px]"
          />
        </el-form-item>
        <el-form-item label="图片">
          <Upload
            v-model:fileListt="talkForm.talkImgList"
            :width="200"
            :height="200"
            :limit="1"
          />
        </el-form-item>
        <el-form-item label="置顶">
          <el-switch
            v-model="talkForm.is_top"
            inline-prompt
            active-text="on"
            :active-value="2"
            :inactive-value="1"
            inactive-text="off"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="talkForm.status" class="w-[120px]">
            <el-option label="公开" :value="1" />
            <el-option label="私密" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" type="danger" @click="closeDialog()" plain>取消</el-button>
        <el-button size="small" plain>保存</el-button>
      </template>
    </el-dialog>

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

.zhiding {
  width: 20px;
  height: 20px;
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
