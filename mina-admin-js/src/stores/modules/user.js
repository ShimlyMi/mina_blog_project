import {defineStore} from "pinia";
import {removeToken, sessionKey, setToken} from "@/utils/auth";
import {getUserInfoById, reqLogin} from "@/api/user";
import {resetRouter} from "@/router";
import router from "@/router";
import {storageSession} from "@pureadmin/utils";
import {store} from "@/stores";

export const useUserStore = defineStore('user', {
    id: "mina-user",
    persist: {
        // enabled: true, // 数据持久化
        strategies: [{
            // 自定义存储的 key，默认是 store.$id
            key: "userStore",
            // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
            // storage: localStorage,
            // state 中的字段名，按组打包储存
            // paths: ["foo", "bar"]
        }]
    },
    /** 管理用户数据 */
    state: () => {
        return {
            user_name: storageSession().getItem(sessionKey)?.user_name ?? "",
            role: storageSession().getItem(sessionKey)?.role ?? "",
            avatar: "",
            nick_name: "",
            id: 0 // 登录用户id
        };
    },
    getters: {
        // 获取头像
        getAvatar() {
            return this.avatar || storageSession().getItem("blogCurrentUser")?.avatar
        },
        // 获取当前登陆人的昵称
        getNickName() {
            return this.nick_name || storageSession().getItem("blogCurrentUser")?.nick_name
        },
        // 获取当前登陆人用户id
        getUserId() {
            return this.id || storageSession().getItem("blogCurrentUser")?.id
        }
    },
    actions: {
        /** 存储用户名 */
        SET_USERNAME(username) {
            this.user_name = username;
        },
        /** 存储角色 */
        SET_ROLE(role) {
            this.role = role;
        },
        SET_TOKEN(token) {
            this.token = token;
        },
        SET_AVATAR(avatar) {
            this.avatar = avatar;
        },
        SET_NICKNAME(nick_name) {
            this.nick_name = nick_name;
        },
        SET_ID(id) {
            this.id = id;
        },
        /** 登入 */
        async loginByUsername(data) {
            return new Promise((resolve, reject) => {
                reqLogin(data).then(async res => {
                    if (res.code == 0) {
                        console.log(res)
                        setToken((res.result))
                        this.SET_ID(Number(res.result.id))
                        await this.saveUserInfo(res.result.id)
                        // 获取用户信息进行存储
                        resolve(res)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 保存当前登陆人信息
        async saveUserInfo() {
            const res = await getUserInfoById(this.getUserId)
            if (res.code == 0) {
                this.SET_AVATAR(res.result.avatar)
                this.SET_NICKNAME(res.result.nick_name)
                this.SET_ID(Number(res.result.id))
                sessionStorage.setItem("blogCurrentUser", res.result)
            }
        },
        // 前端登出
        logOut() {
            this.user_name = "";
            this.roles = [];
            removeToken()
            resetRouter();
            router.push("/login").then(() => {
                console.log("退出登录成功")
            })
        }
    }
})

export function useUserStoreHook() {
    return useUserStore(store);
}
