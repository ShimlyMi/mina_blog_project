import axios from "axios";

import { getToken } from "../utils/auth.js"
// create an axios instance
const http = axios.create({
    timeout: 10000, // 请求超时时间
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    baseURL: import.meta.env.VITE_APP_BASE_URL
});

http.interceptors.request.use(
    config => {

    }
)
