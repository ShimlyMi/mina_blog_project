<script setup lang="ts" name="TalkList">
import {useRouter} from "vue-router";
import {useNav} from "@/layout/hooks/useNav";
import {reactive, ref} from "vue";

const router = useRouter();
const { avatar, nick_name } = useNav();

const param = reactive({
  current: 1,
  size: 5,
  status: 1
});
const talkList = ref([]);
const total = ref(0);
const taklTab = [
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


</script>

<template>

</template>

<style scoped lang="scss">

</style>
