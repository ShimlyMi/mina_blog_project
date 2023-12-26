
import http from "@/config/request.js"

/** 登录 */
export const reqLogin = ({ user_name, password }) => {
    return http({
        url: '/api/users/login/',
        method: 'post',
        headers: {
            isToken: true
        },
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

/** 获取当前登录人信息 */
export const getUserInfo = () => {
    return http({
        url: '/api/users/info/',
        method: 'get',
    })
}
