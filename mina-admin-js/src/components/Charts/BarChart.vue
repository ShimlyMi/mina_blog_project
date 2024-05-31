<script setup lang="ts" name="BarChart">
import { ref, computed, watch, type Ref } from "vue";
import { EchartOptions, useDark, useECharts } from "@pureadmin/utils";

// const props = defineProps({
//   commitList: {
//     type: Array,
//     default: () => {}
//   }
// });

const animationDuration = 6000;

const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "default";
});
const barChartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(barChartRef as Ref<HTMLDivElement>, {
  theme
});
const loading = ref(true);
const xData = (() => {
  const data: any[] = [];
  for (let i = 1; i < 31; i++) {
    data.push(`${i}日`);
  }
  return data;
})();
const init = () => {
  setOptions({
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["Rainfall", "Evaporation"]
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ["line", "bar"] },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    calculable: true,
    xAxis: [
      {
        type: "category",
        // prettier-ignore
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "Rainfall",
        type: "bar",
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ],
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" }
          ]
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }]
        },
        animationDuration
      },
      {
        name: "Evaporation",
        type: "bar",
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ],
        markPoint: {
          data: [
            { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
            { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 }
          ]
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }]
        },
        animationDuration
      }
    ],
    addTooltip: true
  });
};

watch(
  // () => props.commitList,
  // newV => {
  //   if (newV.length > 0) {
  //     loading.value = false;
  //     init();
  //   } else {
  //     loading.value = true;
  //   }
  // },
  () => init(),
  {
    deep: true,
    immediate: true
  }
);
</script>

<template>
  <el-card class="barChart-card">
    <div ref="barChartRef" style="width: 100%; height: 57.1vh" />
  </el-card>
</template>

<style scoped lang="scss">
//.barChart-card {
//  height: ;
//}
</style>
