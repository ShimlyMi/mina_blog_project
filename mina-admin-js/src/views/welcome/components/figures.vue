<script setup lang="ts" name="LineChart">
import { computed, Ref, ref, watch } from "vue";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";
import { useAppStoreHook } from "@/store/modules/app";

const { isDark } = useDark();
const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});
// 初始化Echarts
const lineChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(lineChartRef as Ref<HTMLDivElement>, {
  theme
});

// 根据配置项渲染ECharts
setOptions({
  /** 配置项 https://echarts.apache.org/zh/option.html */
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross"
    }
  },
  legend: {
    data: ["expected", "actual"]
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: 10,
    right: 10,
    bottom: 20,
    top: 30,
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: false
      }
    }
  ],
  series: [
    {
      name: "expected",
      type: "line",
      stack: "Total",
      itemStyle: {
        color: "#FF005A"
      },
      lineStyle: {
        color: "#FF005A",
        width: 2
      },
      smooth: true,
      emphasis: {
        focus: "series"
      },
      animationDuration: 2800,
      animationEasing: "cubicInOut",
      data: [385, 332, 1000, 500, 900, 457, 689]
    },
    {
      name: "actual",
      smooth: true,
      type: "line",
      itemStyle: {
        color: "#3888fa"
      },
      lineStyle: {
        color: "#3888fa",
        width: 2
      },
      areaStyle: {
        color: "#f3f8ff"
      },
      animationDuration: 2800,
      animationEasing: "quadraticOut",
      data: [522, 636, 901, 934, 678, 855, 666]
    }
  ]
});
watch(
  () => useAppStoreHook().getSidebarStatus,
  () => {
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="lineChartRef" style="width: 100%; height: 35vh" />
</template>
