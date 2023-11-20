import {defineStore} from "pinia";
import { Names } from './store-name'

// 用户模块

export const userStore = defineStore(Names.USER, {
    state: () => {
        return {
            userInfo: {}, // 获取当前登录人信息
            token: "",
            infoFlag: false,
            tokenFlag: false,
        };
    },
    // 类似 computed 修饰修饰一些值
    getters: {
        // 获取当前登陆人信息
        getUserInfo():any {
            // @ts-ignore
            return this.userInfo;
        },
        // 获取 token
        getToken():any {
            return this.token;
        },
    },
    // 类似 methods 可以做同步 异步的操作 可以 提交 state
    actions: {
        // 设置用户信息
        setUserInfo(userInfo :any):any {
            this.infoFlag = true;
            this.userInfo = userInfo;
        },
        // 设置token
        setToken(token :any):any {
            this.infoFlag = true;
            this.token = token;
        }
    }
})