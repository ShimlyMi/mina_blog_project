<script setup>
defineProps({
  // 宽度
  width: {
    type: [ Number, String ],
    default: "100%"
  },
  // 高度
  height: {
    type: [ Number, String ],
    default: '100%'
  },
  // 左外边距
  left: {
    type: [ Number, String ],
    default: 0
  },
  // 上外边距
  top: {
    type: [ Number, String ],
    default: 0
  }
})
</script>

<template>
  <el-skeleton-item :style="`width:${width}; height:${height}; margin-left:${left}; margin-top:${top}`" v-bind="$attrs" />
</template>
