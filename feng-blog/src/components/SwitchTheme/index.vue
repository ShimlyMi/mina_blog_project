<script setup>
import { onMounted } from "vue";
import { Moon, Sunrise } from "@element-plus/icons-vue";
onMounted(() => {

});

</script>

<template>
<el-switch
    size="default"
    :active-icon="Sunrise"
    inline-prompt
    :inactive-icon="Moon"
    active-color="#000"
    inactive-color="#000"
/>
</template>

<style scoped lang="scss">

</style>
