import { http } from "@/utils/http";

export type UserResult = {
  code: number;
  message: String;
  result: {
    /** 用户名 */
    user_name: string;
    /** 当前登陆用户的角色 */
    role: number;
    /** `token` */
    token: string;
    id: number; // 用户id
    nick_name: string;
  };
};

export type Result = {
  code: number;
  message: string;
  result: any;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/api/users/login", { data });
};
/** 注册 */
export const registerUser = (data?: object) => {
  return http.request<Result>("post", "/api/users/register", { data });
};

/** 获取当前登录人的信息 */
export const getUserInfo = () => {
  return http.request<Result>("get", "/api/users/info", {});
};
/** 根据ID获取用户信息 */
export const getUserInfoById = (id: number) => {
  return http.request<Result>("get", `/api/users/getUserInfoById/${id}`);
};
/** 刷新token */
// export const refreshTokenApi = (data?: object) => {
//   return http.request<RefreshTokenResult>("post", "/refreshToken", { data });
// };

/** 用户修改个人信息 */
export const updateUserInfo = (data?: object) => {
  return http.request<Result>("put", "/api/users/updateOwnUserInfo", { data });
};

/** 条件分页获取用户列表 */
export const getUserList = (data?: object) => {
  return http.request<Result>("post", "/api/users/getUserList", { data });
};

/** 管理员修改用户角色 */
export const updateUserRole = (id: any, role: any) => {
  return http.request<Result>("put", `/api/users/updateRole/${id}/${role}`, {});
};
