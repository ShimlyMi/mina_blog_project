<script setup lang="ts" name="BarChart">
import { ref, onMounted, nextTick } from "vue";
import echarts from "@/plugins/echarts";

const props = defineProps({
  id: {
    type: String,
    default: "chart"
  },
  className: {
    type: String,
    default: "chart"
  },
  height: {
    type: String,
    default: "100%"
  },
  width: {
    type: String,
    default: "100%"
  }
});

const chart = ref(null);
const initChart = () => {
  chart.value = echarts.init(document.getElementById(props.id));
  const xAxisData: string[] = [];
  const data: number[] = [];
  const data2: number[] = [];
  for (let i = 0; i < 50; i++) {
    xAxisData.push(i.toString());
    data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3);
  }
  chart.value.setOption({
    backgroundColor: "#fff",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999"
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ["Evaporation", "Precipitation", "Temperature"]
    },
    grid: {
      top: 10,
      left: "2%",
      right: "2%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisPointer: {
          type: "shadow"
        },
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "Precipitation",
        min: 0,
        max: 250,
        interval: 50,
        axisTick: {
          show: false
        }
      },
      {
        type: "value",
        name: "Temperature",
        min: 0,
        max: 25,
        interval: 5,
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        name: "Evaporation",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + " ml";
          }
        },
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name: "Precipitation",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + " ml";
          }
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: "Temperature",
        type: "line",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return (value as number) + " °C";
          }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  });
};

onMounted(() =>
  nextTick(() => {
    initChart();
  })
);
</script>

<template>
  <div
    :id="props.id"
    :class="props.className"
    :style="{ height: props.height, width: props.width }"
  />
</template>

<style scoped lang="scss"></style>
