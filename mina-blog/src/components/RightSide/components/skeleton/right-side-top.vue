<script setup>
import SkeletonItem from "@/components/SkeletonItem/index.vue"
</script>

<template>
  <SkeletonItem height="8rem" variant="image" />
  <div class="flex_r_start">
    <SkeletonItem height="80px" left="1rem" top="-2rem" variant="circle" width="60px" />
    <SkeletonItem height="1rem" left="0.3rem"  width="40%" />
  </div>
  <div style="padding: 5px">
    <SkeletonItem height="1rem" width="50%"  />
    <SkeletonItem height="1rem" width="80%"  />
    <SkeletonItem height="1rem" width="30%"  />
  </div>
  <div class="flex_r_around" style="padding: 1.85rem 1rem">
    <SkeletonItem v-for="i in 3" :key="i" height="3rem" width="14%"  />
  </div>
  <div style="padding: 0 1.5rem">
    <SkeletonItem height="2rem" variant="text"  />
  </div>
  <div class="flex_r_around" style="padding: 1rem 3rem">
    <SkeletonItem height="2rem" variant="circle" width="2rem"  />
    <SkeletonItem height="2rem" variant="circle" width="2rem"  />
    <SkeletonItem height="2rem" variant="circle" width="2rem"  />
    <SkeletonItem height="2rem" variant="circle" width="2rem"  />
  </div>
</template>

<style lang="scss" scoped>

</style>
