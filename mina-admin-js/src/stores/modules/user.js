import {defineStore} from "pinia";
import {store} from "@/stores/index"
import {removeToken, setToken} from "@/utils/auth";
import {getUserInfoById, reqLogin} from "@/api/user";
import router from "@/router";

export const useUserStore = defineStore('user', {
    id: "mina-user",
    /** 管理用户数据 */
    state: () => {
        return {
            user_name: "",
            role: "",
            avatar: "",
            nick_name: "",
            id: 0 // 登录用户id
        };
    },
    getters: {
        // 获取头像
        getAvatar() {
            return this.avatar
        },
        // 获取当前登陆人的昵称
        getNickName() {
            return this.nick_name
        },
        // 获取当前登陆人用户id
        getUserId() {
            return this.id
        }
    },
    actions: {
        /** 存储用户名 */
        SET_USERNAME(username) {
            this.username = username;
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
            router.push("/login")
        }
    }
})

export function useUserStoreHook() {
    return useUserStore(store);
}
