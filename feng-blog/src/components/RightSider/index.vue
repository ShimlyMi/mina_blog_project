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
  tags: {
    type: Array,
    default: () =>{}
  }
})
// console.log("right-side",props)

</script>

<template>
<div class="mi-rightSide">
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

<style scoped lang="scss">
@include b(rightSide) {
  width: 100%;
  .info-card {
    height: 29rem;
  }
}
</style>
