
import http from "@/config/request.js"

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
