<script setup>
import RightSideTopSkeleton from "./components/skeleton/right-sider-top-skeleton.vue"
import RightSideTop from "./components/item/right-side-top.vue";
import RightSideItem from "./components/item/right-side-item.vue";
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
  tags: {
    type: Array,
    default: () =>{}
  }
})
</script>

<template>
<div class="mi-rightSide">
  <el-row>
    <el-col :span="24" class="right-side-space right-side-space1">
      <el-card class="info-card card-hover">
        <el-skeleton>
          <template #template>
            <RightSideTopSkeleton />
          </template>
          <template #default>
            <RightSideTop :configDetail="configDetail" />
          </template>
        </el-skeleton>
      </el-card>
    </el-col>

  </el-row>
</div>
</template>

<style scoped lang="scss">
@include b(rightSide) {
  width: 100%;
  .info-card {
    height: 29rem;
  }
}
</style>
