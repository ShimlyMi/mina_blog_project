import axios from "axios";
import {ElNotification} from "element-plus";

const http = axios.create({
    timeout: 10000,
    withCredentials: true,
    headers: {
        // 设置后端需要的传参类型
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    baseURL: import.meta.env.VITE_APP_BASE_URL
});

/** 请求拦截器 */
http.interceptors.request.use(
    config => {

        return config;
    },
    error => {
        // 对请求错误做些什么
        console.log(error);
        return Promise.reject(error);
    }
);

/** 响应拦截器 */
http.interceptors.response.use(
    (response) => {
        /** 对响应数据做些什么 */
        const dataAxios = response.data;
        const { code, message } = dataAxios;
        switch (code + "") {
            // 给用户一点提示
            case '100':
                ElNotification({
                    offset: 60,
                    title: "温馨提示",
                    message:  message
                });
                break;
        }
        return dataAxios;
    },
    (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么

        return Promise.reject(error);
    }
);
export default http;
