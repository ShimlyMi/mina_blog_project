import http from "@/config/request.js";
import { useUserStore } from "@/stores/index.js";


/** 登录 */
export const reqLogin = ({ user_name, password }) => {
    return http({
        url: '/api/users/login',
        method: 'post',
        data: {
            user_name,
            password
        }
    })
};

/** 注册 */
export const reqRegister = (data) => {
    return http({
        url: '/api/users/register',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
};

/** 获取当前登录人的信息 */
// export const getUserInfoById = (id) => {
//     return new Promise((resolve) => {
//         http.get("/api/users/info/" + id, {}).then((res) => {
//             resolve(res);
//         })
//     })
// }

export const getUserInfo = () => {
    return http({
        url: '/api/users/info/',
        method: 'get',
    })
}
