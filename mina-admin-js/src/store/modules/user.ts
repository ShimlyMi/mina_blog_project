import { defineStore } from "pinia";
import { store } from "@/store";
import { userType, userInfoType } from "./types";
import { routerArrays } from "@/layout/types";
import { router, resetRouter } from "@/router";
import { storageSession } from "@pureadmin/utils";
import { getLogin, getUserInfoById } from "@/api/user";
import { UserResult } from "@/api/user";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { type DataInfo, setToken, removeToken, sessionKey } from "@/utils/auth";

export const useUserStore = defineStore({
  id: "mina-user",
  state: (): userType => ({
    // 用户名
    user_name:
      storageSession().getItem<DataInfo<number>>(sessionKey)?.user_name ?? "",
    // 页面级别权限
    role: storageSession().getItem<DataInfo<number>>(sessionKey)?.role,
    avatar: "",
    nick_name: "",
    id: 0 // 登录用户的id
  }),
  getters: {
    getAvatar() {
      return (
        this.avatar ||
        storageSession().getItem<userInfoType>("blogCurrentUser")?.avatar
      );
    },
    getNickName() {
      return (
        this.nick_name ||
        storageSession().getItem<userInfoType>("blogCurrentUser")?.nick_name
      );
    },
    getUserId() {
      return (
        this.id || storageSession().getItem<userInfoType>("blogCurrentUser")?.id
      );
    },
  },
  actions: {
    /** 存储用户名 */
    SET_USERNAME(user_name: string) {
      this.user_name = user_name;
    },
    /** 存储角色 */
    SET_ROLES(role: number) {
      this.role = role;
    },
    SET_TOKEN(token: string) {
      this.token = token;
    },
    SET_AVATAR(avatar: string) {
      this.avatar = avatar;
    },
    SET_NICKNAME(nick_name: string) {
      this.nick_name = nick_name;
    },
    SET_ID(id: string) {
      this.id = id;
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then(async res => {
            if (res.code == 0) {
              setToken(res.result);
              this.SET_TOKEN(Number(res.result.id));
              await this.savaUserInfo(res.result.id);
              // 获取用户信息进行存储
              resolve(res);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 保存当前登录人信息
    async savaUserInfo() {
      const res = await getUserInfoById();
      if (res.code == 0) {
        this.SET_AVATAR(res.result.avatar);
        this.SET_NICKNAME(res.result.nick_name);
        this.SET_ID(Number(res.result.id));
        storageSession().setItem<userInfoType>("blogCurrentUser", res.result);
      }
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.user_name = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    }
    /** 刷新`token` */
    // async handRefreshToken(data) {
    //   return new Promise<RefreshTokenResult>((resolve, reject) => {
    //     refreshTokenApi(data)
    //       .then(data => {
    //         if (data) {
    //           setToken(data.data);
    //           resolve(data);
    //         }
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
