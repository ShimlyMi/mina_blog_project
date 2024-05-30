<script setup lang="ts">
import PanThumb from "@/components/PanThumb/index.vue";
import Mallki from "@/components/TextHoverEffect/Mallki.vue";
import { useNav } from "@/layout/hooks/useNav";

const { avatar } = useNav();
</script>

<template>
  <el-card class="box-card-component">
    <div slot="header" class="box-card-header">
      <img src="../../assets/backend_bg.jpg" alt="背景图片" />
    </div>
    <div style="position: relative">
      <pan-thumb :image="avatar" class="panThumb" />
      <mallki class-name="mallki-text" text="米娜小屋后台" />
      <div style="padding-top: 35px" class="progress-item">
        <span>Vue</span>
        <el-progress :stroke-width="10" :percentage="70" striped striped-flow />
      </div>
      <div class="progress-item">
        <span>Vue</span>
        <el-progress :stroke-width="10" :percentage="70" striped striped-flow />
      </div>
      <div class="progress-item">
        <span>Vue</span>
        <el-progress :stroke-width="10" :percentage="70" striped striped-flow />
      </div>
      <div class="progress-item">
        <span>Vue</span>
        <el-progress :stroke-width="10" :percentage="70" striped striped-flow />
      </div>
    </div>
  </el-card>
</template>

<style lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0 !important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    //height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  }
  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -35px;
    left: 45px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;
    :deep(.pan-info) {
      box-shadow: none !important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
    .panThumb {
      height: 50px !important;
      width: 50px !important;
      top: -20px;
      left: 20px !important;
    }
  }
  :deep(.el-progress-bar__outer) {
    height: 10px;
  }
}
</style>
