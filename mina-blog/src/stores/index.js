import {defineStore} from "pinia";

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
