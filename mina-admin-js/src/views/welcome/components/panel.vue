<script setup lang="ts" name="PanelGroup">
import { CountTo } from "vue3-count-to";
import { ref, onMounted } from "vue";

import { getStatistic } from "@/api/statistic";

const staticData = ref({
  articleCount: 0,
  talkCount: 0,
  tagCount: 0,
  userCount: 0,
  commitList: []
});

const getStatisticData = async () => {
  const res = await getStatistic();
  if (res.code === 0) {
    Object.assign(staticData.value, res.result);
  }
};

onMounted(async () => {
  await getStatisticData();
});
</script>
<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <!--          <svg-icon name="peoples" class="card-panel-icon" />-->
          <IconifyIconOffline icon="views" class="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户</div>
          <count-to
            :startVal="0"
            :endVal="staticData.userCount"
            :duration="5000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-article">
          <IconifyIconOffline icon="pencil" class="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">文章</div>
          <count-to
            :startVal="0"
            :endVal="staticData.articleCount"
            :duration="5000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-rank">
          <IconifyIconOffline icon="discount" class="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">标签</div>
          <count-to
            :startVal="0"
            :endVal="staticData.tagCount"
            :duration="5000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-talk">
          <IconifyIconOffline icon="chatDotRound" class="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">说说</div>
          <count-to
            :startVal="0"
            :endVal="staticData.talkCount"
            :duration="5000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
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
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

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
      margin: 10px 0 0 10px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 56px;
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

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
