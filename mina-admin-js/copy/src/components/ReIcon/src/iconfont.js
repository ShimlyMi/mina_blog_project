import {h, defineComponent} from "vue";

/** 封装 iconfont 组件， 默认 使用 `font-class`，支持`unicode`引用、`font-class`引用、`symbol`引用 */
export default defineComponent({
  name: "FontIcon",
  props: {
    icon: {
      type: String,
      default: ""
    }
  },
  render() {
    const attrs = this.$attrs
    if (Object.keys(attrs).includes("uni")) {
      return h(
        'i',
        {
          class: "iconfont",
          ...attrs
        },
        this.icon
      )
    } else if (Object.keys(attrs).includes("svg")) {
      return h(
        "svg",
        {
          class: "icon-svg",
          "aria-hidden": true
        },
        {
          default: () => [
            h("use", {"xlink:href": `${this.icon}`})
          ]
        }
      )
    } else {
      return h("i", {class: `iconfont ${this.icon}`, ...attrs})
    }
  }
})
