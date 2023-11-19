import axios from "axios";


// 创建一个实例
const http = axios.create({
    timeout: 10000, // 请求超时时间
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

// 添加请求拦截器
http.interceptors.request.use(

)