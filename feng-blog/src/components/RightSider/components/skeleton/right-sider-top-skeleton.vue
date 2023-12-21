<script setup>
import SkeletonItem from "@/components/SkeletonItem/index.vue"
</script>

<template>
  <SkeletonItem variant="image" height="8rem" />
  <div class="flex_r_start">
    <SkeletonItem variant="circle" width="60px" height="80px" top="-2rem" left="1rem" />
    <SkeletonItem width="40%" height="1rem"  left="0.3rem" />
  </div>
  <div style="padding: 5px">
    <SkeletonItem width="50%" height="1rem"  />
    <SkeletonItem width="80%" height="1rem"  />
    <SkeletonItem width="30%" height="1rem"  />
  </div>
  <div class="flex_r_around" style="padding: 1.85rem 1rem">
    <SkeletonItem v-for="i in 3" :key="i" width="14%" height="3rem"  />
  </div>
  <div style="padding: 0 1.5rem">
    <SkeletonItem variant="text" height="2rem"  />
  </div>
  <div class="flex_r_around" style="padding: 1rem 3rem">
    <SkeletonItem variant="circle" width="2rem" height="2rem"  />
    <SkeletonItem variant="circle" width="2rem" height="2rem"  />
    <SkeletonItem variant="circle" width="2rem" height="2rem"  />
    <SkeletonItem variant="circle" width="2rem" height="2rem"  />
  </div>
</template>

<style scoped lang="scss">

</style>
