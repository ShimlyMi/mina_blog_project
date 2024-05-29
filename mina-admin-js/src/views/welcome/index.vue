<script lang="ts" setup>
defineOptions({
  name: "Welcome"
});
import Line from "./components/figures.vue";
import PanelGroup from "./components/panel.vue";
</script>

<template>
  <div class="home">
    <!--<template #header>首页</template>-->
    <panel-group />
    <!--    <el-row :gutter="40" class="panel-group">-->
    <!--      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
    <!--        <panel-group :label="'用户'" :value="staticData.userCount">-->
    <!--          <div class="card-panel-icon-wrapper icon-people">-->
    <!--            <IconifyIconOffline icon="views" class="card-panel-icon" />-->
    <!--          </div>-->
    <!--        </panel-group>-->
    <!--      </el-col>-->
    <!--      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
    <!--        <panel-group :label="'文章'" :value="staticData.articleCount">-->
    <!--          <div class="card-panel-icon-wrapper icon-article">-->
    <!--            <IconifyIconOffline icon="pencil" class="card-panel-icon" />-->
    <!--          </div>-->
    <!--        </panel-group>-->
    <!--      </el-col>-->
    <!--      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
    <!--        <panel-group :label="'标签'" :value="staticData.articleCount">-->
    <!--          <div class="card-panel-icon-wrapper icon-rank">-->
    <!--            <IconifyIconOffline icon="discount" class="card-panel-icon" />-->
    <!--          </div>-->
    <!--        </panel-group>-->
    <!--      </el-col>-->
    <!--      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
    <!--        <panel-group :label="'说说'" :value="staticData.talkCount">-->
    <!--          <div class="card-panel-icon-wrapper icon-talk">-->
    <!--            <IconifyIconOffline icon="chatDotRound" class="card-panel-icon" />-->
    <!--          </div>-->
    <!--        </panel-group>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <el-col :span="24">
        <Line />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-article {
        background: #36a3f7;
      }

      .icon-rank {
        background: #f4516c;
      }

      .icon-talk {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-article {
      color: #36a3f7;
    }

    .icon-rank {
      color: #f4516c;
    }

    .icon-talk {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: -16px 0 0 -16px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 26px 26px 0;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
