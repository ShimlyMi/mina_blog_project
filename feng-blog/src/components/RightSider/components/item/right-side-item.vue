<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "-"
  },
  title: {
    type: String,
    default: "-"
  },
  size: {
    type: String,
    default: "1.2rem"
  },
  color: {
    type: String,
    default: "#666"
  }
})
</script>

<template>
  <div class="card-title">
    <i :class="['iconfont', props.icon]" :style="{ fontSize: props.size, color: props.color }"></i>
    <span>P{{ props.title }}</span>
  </div>
</template>

<style scoped lang="scss">
.card-title {
  font-size: 1.2rem;
  line-height: 2.4;
  .iconfont {
    font-weight: 900;
  }
  span {
    margin-left: 0.5rem;
  }
}
</style>
