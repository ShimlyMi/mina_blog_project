<script setup>
import Header from "./Header/header.vue";
import Footer from "./Footer/footer.vue";
import Main from "./Main/main.vue"
</script>

<template>
<div class="mi-layout">
  <Header />
  <Main />
  <Footer />
</div>
</template>

<style lang="scss" scoped>
@include b(mi-layout) {
  @include bfc;
  overflow: hidden;
}
</style>
