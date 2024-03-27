import { defineStore } from "pinia";
// setLocalItem 封装的缓存本地的方法 remove和get分别对应缓存的删除和获取
import { getLocalItem, setLocalItem } from "@/utils/tool";
// 可以去看看vueUse怎么使用useDark 这个可以快速切换主题
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
    // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
    storageKey: "useDarkKEY",
    // 暗黑class名字
    valueDark: "dark",
    // 高亮class名字
    valueLight: "light",
});
const toggle = useToggle(isDark);

export const staticData = defineStore("staticData", {
    // 数据存到store里刷新页面会重置，持久化就不会了
    persist: {
        enabled: true, //开启数据持久化
        strategies: [
            {
                key: "staticState", //给一个要保存的名称
                storage: localStorage, //sessionStorage / localStorage 存储方式
            },
        ],
    },
    state: () => {
        return {
            // 图片背景地址
            pageHeaderList: []
        }
    },
    getters: {
        // 获取 每个页面背景图
        getPageHeaderList() {
            return this.pageHeaderList
        }
    },
    actions: {
        // 缓存照片
        setPageHeaderList(list) {
            this.pageHeaderList = list;
        }
    }
})
