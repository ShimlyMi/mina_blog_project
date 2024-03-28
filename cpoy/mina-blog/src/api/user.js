import http from "@/config/request.js";

/** 登录 */
export const reqLogin = (data) => {
    return new Promise((resolve) => {
        http.post("/api/users/login", data).then((res) => {
            resolve(res);
        })
    })
};
/** 注册 */
export const reqRegister = (data) => {
    return new Promise((resolve) => {
        http.post("/api/users/register", data).then((res) => {
            resolve(res);
        })
    })
};

/** 获取当前登录人信息 */
export const getUserInfo = () => {
    return http({
        url: '/api/users/info',
        method: 'get',
    })
}

/** 获取当前登录人信息 */
export const getUserInfoById = (id) => {
    return new Promise((resolve) => {
        http.get("/api/users/getUserInfoById/" + id, {}).then((res) => {
            resolve(res);
        })
    })
}
