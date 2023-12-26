<script setup>

</script>

<template>
  <div class="mi-main">
    <div class="mi-main__container">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.fullPath"></component>
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.fullPath"></component>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@include b(main) {
  @include bfc;
}
</style>
