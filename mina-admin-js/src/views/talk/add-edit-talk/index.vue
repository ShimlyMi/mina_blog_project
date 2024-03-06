<script setup lang="ts" name="AddEditTalk">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElLoading } from "element-plus";
import { conversion, imgUpload } from "@/api/site";
import { message } from "@/utils/message";

const route = useRoute();
const router = useRouter();

const form = reactive({
  id: null,
  content: "", //说说内容
  is_top: 2, // 置顶 2 取消置顶 3
  status: 1, // 1 公开 2 私密
  talkImgList: [],
  user_id: 0
});

const save = async () => {
  if (form.content || form.talkImgList.length > 0) {
    let needUploadList = [];
    const resetList = [];
    if (route.query.id) {
      needUploadList = form.talkImgList.filter(item => !item.id);
      form.talkImgList.forEach(img => {
        if (img.id) {
          resetList.push({ id: img.id, url: img.url });
        }
      });
    } else {
      needUploadList = form.talkImgList;
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
  }
};
</script>

<template />

<style scoped lang="scss"></style>
