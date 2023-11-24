<template>
    <div class="yz-box">
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
import Header from './Header/index.vue';
import Content from './Content/index.vue';
import Footer from './Footer/index.vue';
</script>

<style scoped lang="scss">
@include b(box){
    @include bfc;
  width: 100vw;
    position: relative;
    display: flex;
    flex-direction: column;

}
</style>
