import { ref, computed } from 'vue'
import { defineStore } from "pinia";


export const useUserStore = defineStore('user', () => {
    const userState = ref({
        blogAvatar: "",
        userInfo: {}, // 当前登录人的信息
        token: "",
        infoFlag: false,
        tokenFlag: false,
    })

    /** 获取当前登陆人的头像 */
    function getBlogAvatar() {
        return this.blogAvatar
    }
    /** 获取当前登陆人的信息 */
    function getUserInfo() {
        // console.log("this.userInfo",this.userInfo)
        return this.infoFlag ? this.userInfo : "";
    }
    /** 获取token */
    function getToken() {
        console.log("this.token",this.token)
        console.log("this.tokenFlag",this.tokenFlag)
        return this.tokenFlag ? this.token : "";
    }
    const userGetters = computed(
        getBlogAvatar,
        getUserInfo,
        getToken
    )

    // 设置头像
    function setBlogAvatar(avatar) {
        this.blogAvatar = avatar;
    }

    // 设置用户信息
    function setUserInfo(userInfo) {
        this.infoFlag = true;
        this.userInfo = userInfo;
    }
    // 设置token
    function setToken(token) {
        console.log(token)
        this.tokenFlag = true;
        this.token = token

    }
    // 清除用户信息
    function clearUserInfo() {
        this.userInfo = {};
        this.token = "";
        this.tokenFlag = "";
        this.infoFlag = "";
    }
    function userActions() {
        return {
            setBlogAvatar,
            setUserInfo,
            setToken,
            clearUserInfo
        }
    }
    return {
        userState,
        userGetters,
        userActions
    }
})
