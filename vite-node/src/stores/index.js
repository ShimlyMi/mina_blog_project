import {defineStore} from "pinia";

export const user = defineStore("user", {
    persist: {
        enabled: true, // 数据持久化
        strategies: [
            {
                key: "userState", // 保存的名称
                storage: localStorage, // 本地存储方式 | sessionStorage 当前存储 (即当会话结束后就会清除)
            },
        ],
    },
    state: () => {
        return {
            userInfo: {}, // 获取当前登录人信息
            token: "",
            tokenFlag: false,
        };
    },
    getters: {
        // 获取当前登陆人信息
        getUserInfo() {

        }
    }
})