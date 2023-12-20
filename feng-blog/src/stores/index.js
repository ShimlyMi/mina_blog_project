import { defineStore } from 'pinia';
import { _decrypt, _encrypt } from "@/utils/encipher.js";

export const useUserStore = defineStore("user", {
    persist: {
        enabled: true, // 数据持久化
        strategies: [{
            // 自定义存储的 key，默认是 store.$id
            key: "userStore",
            // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
            storage: localStorage,
            // state 中的字段名，按组打包储存
            // paths: ["foo", "bar"]
        }]
    },
    /** 管理用户数据 */
    state: () => {
        return {
            blogAvatar: "",
            userInfo: {}, // 当前登录人的信息
            token: "",
            infoFlag: false,
            tokenFlag: false,
        };
    },
    /** 管理接口数据 */
    actions: {
        // 设置头像
        setBlogAvatar(avatar) {
            this.blogAvatar = avatar;
        },

        // 设置用户信息
        setUserInfo(userInfo) {
            this.infoFlag = true;
            this.userInfo = userInfo;
        },
        // 设置token
        setToken(token) {
            this.tokenFlag = true;
            this.token = token
        },
        // 清除用户信息
        clearUserInfo() {
            this.userInfo = {};
            this.token = "";
            this.tokenFlag = "";
            this.infoFlag = "";
        },
    },
    /**  */
    getters: {
        // 获取当前登陆人头像
        getBlogAvatar() {
            return this.blogAvatar;
        },
        // 获取当前登陆人的信息
        getUserInfo() {
            return this.infoFlag ? this.userInfo : "";
        },
        // 获取token
        getToken() {
            return this.tokenFlag ? this.token : "";
        },
    },

});
