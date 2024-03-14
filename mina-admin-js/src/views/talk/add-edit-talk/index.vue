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
  // console.log("talkForm.talkImgList.length", talkForm.talkImgList.length);
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
    console.log("route.query.id", route.query.id);
    if (res.code == 0) {
      message(route.query.id ? "修改成功" : "发布成功", { type: "success" });
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

const getTalkDetailById = async (id: any) => {
  const res = await getTalkById(id);
  if (res.code == 0) {
    res.result.talkImgList = res.result.talkImgList.map((img: any) => {
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
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        {{ route.query.id ? "编辑说说" : "新增说说" }}
      </div>
    </template>
    <el-form
      ref="talkFormRef"
      :model="talkForm"
      label-suffix=":"
      class="talk-form"
    >
      <el-form-item label="内容">
        <el-input
          v-model="talkForm.content"
          type="textarea"
          class="max-w=[300px]"
          clearable
          :autosize="{ minRows: 4, maxRows: 8 }"
        />
      </el-form-item>
      <el-form-item label="图片" class="img-form">
        <!--
        action	    必选参数，上传的地址	string
        list-type	文件列表的类型	   string	text/picture/picture-card	text
        on-preview	点击文件列表中已上传的文件时的钩子	function(file)
        on-remove	文件列表移除文件时的钩子	function(file, fileList)
        on-success	文件上传成功时的钩子	function(response, file, fileList)
        on-error	文件上传失败时的钩子	function(err, file, fileList)
        on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用	function(file, fileList)
        auto-upload	是否在选取文件后立即进行上传	boolean	—	true
        on-exceed	文件超出个数限制时的钩子	function(files, fileList)
        multiple	是否支持多选文件	boolean
     -->
        <Upload
          v-model:fileList="talkForm.talkImgList"
          :width="80"
          :height="80"
          :limit="9"
          :multiple="true"
          :preview="false"
        />
      </el-form-item>
      <el-form-item label="置顶">
        <el-switch
          v-model="talkForm.is_top"
          :active-value="1"
          :inactive-value="2"
          active-text="on"
          inactive-text="off"
          inline-prompt
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select class="w-[120px]" v-model="talkForm.status">
          <el-option label="所有人可见" :value="1" />
          <el-option label="仅自己可见" :value="2" />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="flex justify-center items-center talk-form-btn">
      <el-button type="info" size="small" @click="cancel" plain>取消</el-button>
      <el-button type="danger" size="small" @click="save">保存</el-button>
    </div>
  </el-card>
</template>
<style scoped lang="scss">
.talk-card {
  height: calc(100vh - 130px);
  overflow: auto;
}
.talk-form {
  width: 500px;
  margin: 0 auto;
}
.talk-form-btn {
  border-top: 1px solid #d5d5d5;
  width: 100%;
  :deep(.el-button ) {
    margin-top: 10px;
  }
}

.img-form {
  :deep(.el-form-item__content) {
    width: 250px;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }
}

// 上传图片展示的大小
:deep(.el-upload-list__item) {
  width: 80px !important;
  height: 80px !important;
  margin: 3px !important;
  border: none !important;
  border-radius: 0;
}

// 加号背景大小
:deep(.el-upload--picture-card) {
  width: 80px !important;
  height: 80px !important;
  margin: 3px !important;
}

// 上传盒子总体的大小
:deep(.el-upload-list--picture-card) {
  width: 268px;
}
</style>
