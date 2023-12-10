import { http } from "@/utils/http"

export type UserResult = {
    code: number,
    message: String,
    result: {
        token: string,
        user_name: string,
        role: number,
        id: number,
    }
};

export type Result = {
    code: number,
    message: string,
    result: any
}

/** 登录 */
export const getLogin = (data?: object) => {
    return http.request<UserResult>("post", "/api/users/login", { data })
};

/** 注册 */
export const registerUser = (data?: object) => {
    return http.request<Result>("post", "/api/user/register", { data });
};

/** 获取当前登录人的信息 */
export const getUserInfoById = id => {
    return http.request<Result>("get", `/api/user/getUserInfoById/` + id, {});
};