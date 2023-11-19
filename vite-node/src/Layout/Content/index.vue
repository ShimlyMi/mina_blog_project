<template>
    <div class="yz-content">
        <div class="yz-content__items" v-for="item in 50">{{item}}</div>
    </div>
</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">
@include b(content) {
    flex: 1;
    overflow: auto;
    @include e(items) {
        border: 1px solid #333;
        border-radius: 4px;
        padding: 10px;
        margin: 5px;
    }
}
</style>