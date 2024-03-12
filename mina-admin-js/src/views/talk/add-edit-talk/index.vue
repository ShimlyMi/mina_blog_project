<script setup lang="ts" name="AddEditTalk">
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElLoading } from "element-plus";
import { conversion, imgUpload } from "@/api/site";
import { message } from "@/utils/message";
import { useUserStoreHook } from "@/store/modules/user";
import { addTalk, editTalk, getTalkById } from "@/api/talk";
import Upload from "@/components/Upload/index.vue";

const route = useRoute();
const router = useRouter();

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

const save = async () => {
  if (talkForm.content || talkForm.talkImgList.length > 0) {
    let needUploadList = [];
    const resetList = [];
    if (route.query.id) {
      needUploadList = talkForm.talkImgList.filter(item => !item.id);
      talkForm.talkImgList.forEach(img => {
        if (img.id) {
          resetList.push({ id: img.id, url: img.url });
        }
      });
    } else {
      needUploadList = talkForm.talkImgList;
    }
    // 压缩
    const conversionLoading = ElLoading.service({
      fullscreen: true,
      text: "图片压缩中"
    });
    const conversionPromiseList = needUploadList.map(async v => {
      return await conversion(v.raw);
    });
    const conversionUploadList = [];
    await Promise.all(conversionPromiseList).then(res => {
      res.map(raw => {
        conversionUploadList.push({ raw });
      });
    });
    conversionLoading.close();

    // 图片上传
    const imgUpLoading = ElLoading.service({
      fullscreen: true,
      text: "图片正在努力上传中，请耐心等待......"
    });
    const promiseList = conversionUploadList.map(async v => {
      return await imgUpload(v);
    });
    await Promise.all(promiseList).then(res => {
      res.map(img => {
        if (img.code == 0) {
          const { url } = img.result;
          const obj = route.query.id
            ? { id: route.query.id, url: url }
            : { url };
          resetList.push(obj);
        } else {
          message("图片上传失败", { type: "error" });
        }
      });
    });
    imgUpLoading.close();

    /** 新增 / 修改说说  */
    talkForm.talkImgList = resetList;
    if (!route.query.id) {
      const userId = useUserStoreHook()?.getUserId;
      Object.assign(talkForm, { user_id: userId });
    }
    const res = route.query.id
      ? await editTalk(talkForm)
      : await addTalk(talkForm);
    if (res.code == 0) {
      message(route.query.id ? "修改成功" : "发布成功");
      router.go(-1);
    }
  } else {
    message("说说图片或说说内容不能都为空", { type: "warning" });
  }
};

const cancel = () => {
  talkFormRef.value.resetFields();
  Object.assign(talkForm, primaryTalkForm);
  dialogVisible.value = false;
  router.go(-1);
};

const getTalkDetailById = async id => {
  const res = await getTalkById(id);
  if (res.code == 0) {
    res.result.talkImgList = res.result.talkImgList.map(img => {
      return { id: id, url: img };
    });
    Object.assign(talkForm, res.result);
  }
};

onMounted(() => {
  if (route.query.id) {
    getTalkDetailById(route.query.id);
  }
});
</script>

<template>
  <!--  DIALOG  -->
  <el-dialog
    :title="talkForm.id ? '编辑说说' : '新增说说'"
    v-model="dialogVisible"
    :width="400"
    :before-close="cancel"
    draggable
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
          v-model:fileList="talkForm.talkImgList"
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
          :active-value="1"
          :inactive-value="2"
          inactive-text="off"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="talkForm.status" class="w-[120px]">
          <el-option label="仅自己可见" :value="1" />
          <el-option label="所有人可见" :value="2" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="small" type="danger" @click="cancel()" plain
        >取消</el-button
      >
      <el-button size="small" plain @click="save()">保存</el-button>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
