<template>
    <div class="yz-header">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
            <el-menu-item index="0">
                <img
                    style="width: 100px"
                    src="/images/element-plus-logo.svg"
                    alt="Element logo"
                />
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
        </el-menu>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
@include b(header) {
    height: 80px;
    min-height: 80px;
    line-height: 80px;

}
.flex-grow {
    flex-grow: 1;
}
.el-menu {
    background-image: linear-gradient(
            to right,
            #b8cbb8 0%,
            #b8cbb8 0%,
            #b465da 0%,
            #cf6cc9 33%,
            #ee609c 66%,
            #ee609c 100%
    );
    opacity: 0.5;
}
.el-menu-item {
    font-size: 16px;
}
.el-menu--horizontal {
    height: 100%;
    font-size: 16px;
}
</style>