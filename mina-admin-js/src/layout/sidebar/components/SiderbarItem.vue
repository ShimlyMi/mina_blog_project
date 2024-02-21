<script name="SidebarItem" setup>
import {ref} from 'vue'
import path from 'path'
import {isExternal} from '@/utils/validate'
import Item from './Item.vue'
import AppLink from './Link.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild = ref(null)

function hasOneShowingChild(children = [], parent) {
  const showingChildren = children.filter(item => {
    onlyOneChild.value = item
    return true
  })

  if (showingChildren[0]?.meta?.showParent) {
    return false
  }
  // 只有一个子路由
  if (showingChildren.length === 1) {
    return true
  }

  // 没有子路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = {...parent, path: "", noShowingChildren: true}
    return true
  }
  return false
}

function resolvePath(routePath) {
  if (isExternal(routePath) || isExternal(props.basePath)) {
    return routePath || props.basePath
  } else {
    // 使用path.posix.resolve替代path.resolve 避免windows环境下使用electron出现盘符问题
    return path.posix.resolve(props.basePath, routePath)
  }

}

</script>

<template>
    <template
        v-if="hasOneShowingChild(props.item.children.item, props.item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :class="{'submenu-title-noDropdown':!isNest}" :index="resolvePath(onlyOneChild.path)">
          <item :icon="onlyOneChild.meta.icon||(props.item.meta && props.item.meta.icon)"
                :title="onlyOneChild.meta.title"/>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(props.item.path)" propper-append-to-body>
      <template #title>
        <item v-if="props.item.meta" :icon="props.item.meta && props.item.meta.icon" :title="props.item.meta.title"/>
      </template>
      <siderbar-item
          v-for="child in props.item.children" :key="child.path" :base-path="resolvePath(child.path)"
          :is-nest="true" :item="child" class="nest-menu"
      />
    </el-sub-menu>
</template>

<style lang="scss" scoped>

</style>
