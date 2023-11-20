import http from "@/config/request";
import { userStore } from "@/stores";

/* 登录 */
export const reqLogin = (data) => {
    return new Promise((resolve,reject) => {
        http.post('/api/users/login',data).then((res) => {
            resolve(res);
        })
    })
}

/* 注册接口 */
export const reqRegister = (data) => {
    return new Promise((resolve,reject) => {
        http.post('/api/users/register',data).then((res) => {
            resolve(res);
        })
    })
}