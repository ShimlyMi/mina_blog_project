import { ECharts } from "echarts";
import { Component, Vue } from "vue-property-decorator";
import echarts from "@/plugins/echarts";

@Component({
  name: "ResizeMixin"
})
export default class extends Vue {
  protected chart!: ECharts | null;
  private sidebarElm?: Element;

  mounted() {
    this.initResizeEvent();
    this.initSidebarResizeEvent();
  }

  beforeDestroy() {
    this.destroyResizeEvent();
    this.destroySidebarResizeEvent();
  }

  activated() {
    this.initResizeEvent();
    this.initSidebarResizeEvent();
  }

  deactivated() {
    this.destroyResizeEvent();
    this.destroySidebarResizeEvent();
  }
  private chartResizeHandler() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  private sidebarResizeHandler(e: TransitionEvent) {
    if (e.propertyName === "width") {
      this.chartResizeHandler();
    }
  }

  private initResizeEvent() {
    if (this.chartResizeHandler) {
      window.addEventListener("resize", this.chartResizeHandler);
    }
  }

  private destroyResizeEvent() {
    if (this.chartResizeHandler) {
      window.removeEventListener("resize", this.chartResizeHandler);
    }
  }

  private initSidebarResizeEvent() {
    this.sidebarElm = document.getElementsByClassName("sidebar-container");
    if (this.sidebarElm) {
      this.sidebarElm.addEventListener(
        "transitionend",
        this.sidebarResizeHandler as EventListener
      );
    }
  }

  private destroySidebarResizeEvent() {
    if (this.sidebarElm) {
      this.sidebarElm.removeEventListener(
        "transitionend",
        this.sidebarResizeHandler as EventListener
      );
    }
  }
}
// const initChart = () => {
//   chart.value = echarts.init(document.getElementById(props.id));
//   const xAxisData: string[] = [];
//   const data: number[] = [];
//   const data2: number[] = [];
//   for (let i = 0; i < 50; i++) {
//     xAxisData.push(i.toString());
//     data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
//     data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3);
//   }
//   chart.value.setOption({
//     backgroundColor: "#08263a",
//     tooltip: {
//       trigger: "axis",
//       axisPointer: {
//         // 坐标轴指示器，坐标轴触发有效
//         type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
//       }
//     },
//     grid: {
//       left: "5%",
//       right: "5%"
//     },
//     xAxis: [
//       {
//         show: false,
//         data: xAxisData
//       },
//       {
//         show: false,
//         data: xAxisData
//       }
//     ],
//     visualMap: [
//       {
//         show: false,
//         min: 0,
//         max: 50,
//         dimension: 0,
//         inRange: {
//           color: [
//             "#4a657a",
//             "#308e92",
//             "#b1cfa5",
//             "#f5d69f",
//             "#f5898b",
//             "#ef5055"
//           ]
//         }
//       }
//     ],
//     yAxis: [
//       {
//         axisLine: {
//           show: false
//         },
//         axisLabel: {
//           color: "#43657a"
//         },
//         splitLine: {
//           show: true,
//           lineStyle: {
//             color: "#08263f"
//           }
//         },
//         axisTick: {
//           show: false
//         }
//       }
//     ],
//     series: [
//       {
//         name: "back",
//         type: "bar",
//         data: data2,
//         z: 1,
//         itemStyle: {
//           opacity: 0.4,
//           barBorderRadius: 5,
//           shadowBlur: 3,
//           shadowColor: "#111"
//         }
//       },
//       {
//         name: "Simulate Shadow",
//         type: "line",
//         data,
//         z: 2,
//         showSymbol: false,
//         animationDelay: 0,
//         animationEasing: "linear",
//         animationDuration: 1200,
//         lineStyle: {
//           color: "transparent"
//         },
//         areaStyle: {
//           color: "#08263a",
//           shadowBlur: 50,
//           shadowColor: "#000"
//         }
//       },
//       {
//         name: "front",
//         type: "bar",
//         data,
//         xAxisIndex: 1,
//         z: 3,
//         itemStyle: {
//           barBorderRadius: 5
//         }
//       }
//     ],
//     animationEasing: "elasticOut",
//     animationEasingUpdate: "elasticOut",
//     animationDelay(idx: number) {
//       return idx * 20;
//     },
//     animationDelayUpdate(idx: number) {
//       return idx * 20;
//     }
//   });
// };
