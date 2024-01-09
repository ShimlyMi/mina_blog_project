import http from "@/utils/request"

/** 用户登录 */
export const reqLogin = (data) => {
    return http({
        url: '/api/users/login',
        method: 'post',
        data: data
    })
}

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
export const getUserInfoById = (id) => {
    return http({
        url: '/api/users/info/' + id,
        method: 'get',
    });
};

