<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <a-config-provider
      :theme="{
      token: {
        colorPrimary: '#cf6cc9',
      },
    }"
  >
    <div id="app">
      <RouterView />
    </div>
  </a-config-provider>


</template>

<style lang="scss">
#app {
  @include bfc;
}
</style>
