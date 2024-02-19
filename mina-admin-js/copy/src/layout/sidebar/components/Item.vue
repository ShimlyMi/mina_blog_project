<script>
export default {
  name: 'menuTree',
  props: {
    menuList: {
      type: Array
    }
  },
  setup(props) {
    return {}
  }
}
</script>

<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <!-- 分两种方式渲染，有子菜单和没有子菜单 -->

    </template>
  </div>
</template>

<style lang="scss" scoped>

</style>
