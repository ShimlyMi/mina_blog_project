<script setup>
import {bg, singIn} from './utils/static'
import {toRaw} from "vue";
</script>

<template>
  <div class="mi-login">
    <img :src="bg" class="wave">
    <div class="mi-login__container">
      <div class="img">
        <component :is="toRaw(singIn)"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
