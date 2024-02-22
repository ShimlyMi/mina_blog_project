import {http} from "@/utils/http";

export type UserResult = {
  success: boolean;
  code: number;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  code: number;
  data: any;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/api/users/login", {data});
};
/** 注册 */
export const registerUser = (data?: object) => {
  return http.request<UserResult>("post", "/api/users/register", {data});
};

/** 获取当前登录人的信息 */
export const getUserInfoById = id => {
  return http.request<UserResult>("get", "/api/users/info" + id, {});
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refreshToken", {data});
};
