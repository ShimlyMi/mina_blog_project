<script setup>
import RightSideTop from "./components/item/right-side-top.vue";
defineProps({
  configDetail: {
    type: Object,
    default: () => {}
  },
  runtime: {
    type: [String, Number],
    default: "半年不到"
  },
  loading: {
    type: Boolean,
    default: false
  },
  articleCount: {
    type: Array,
    default: () =>{}
  }
})
</script>

<template>
<div class="mi-right">
  <el-row>
    <el-col :span="24" class="right-side-space right-side-space1">
      <el-card class="info-card card-hover">
        <el-skeleton>
          <template #template>
            <RightSideTop :configDetail="configDetail" />
          </template>
        </el-skeleton>
      </el-card>
    </el-col>

  </el-row>
</div>
</template>

<style lang="scss" scoped>
.el-card :deep(.el-card__body) {
  padding: 0;
}
</style>
