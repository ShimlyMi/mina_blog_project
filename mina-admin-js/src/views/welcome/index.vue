<script lang="ts" setup>
import { ref } from "vue";
import BarChart from "@/components/Charts/BarChart.vue";
import BoxCard from "@/components/BoxCard/index.vue";
import Line from "./components/figures.vue";
import PanelGroup from "./components/panel.vue";
// import { getCommitList } from "@/api/site";

defineOptions({
  name: "Welcome"
});

// const statisticData = ref({
//   commitList: []
// });
</script>

<template>
  <div class="home">
    <!--<template #header>首页</template>-->
    <panel-group />
    <!--    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">-->
    <!--      <el-col :span="24">-->
    <!--        <Line />-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 8 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <box-card />
      </el-col>

      <!--      <el-col :xs="24" :sm="12" :lg="8" style="margin-bottom: 30px">-->
      <!--        11-->
      <!--      </el-col>-->
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 16 }"
        :xl="{ span: 16 }"
      >
        <bar-chart />
        <!--        <div class="chart-wrapper">-->
        <!--                    <bar-chart height="57vh" />-->
        <!--          <bar-chart />-->
        <!--        </div>-->
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

.chart-wrapper {
  //background: #fff;
  //padding: 16px 16px 0;
  margin-bottom: 32px;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
