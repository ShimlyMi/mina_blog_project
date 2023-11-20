import axios from "axios";
import { notification } from 'ant-design-vue';


// 创建一个实例
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

// 添加请求拦截器
http.interceptors.request.use(
    config => {
        return config;
    }
)

// 响应拦截器
http.interceptors.response.use(
    (response) => {
        const { code,message,result } = response.data;
        if (code === 0) {
            return result;
        }
        notification.error({
            message: '错误提示',
            description: message
        });
        return Promise.reject(message);

    },
    (error) => {
        let message = '';
        let title = '';
        const { status } = error.response;
        switch (status) {
            case 404:
                title = '请求错误'
                message = '页面丢失啦';
                break;
            case 405:
                title = '请求错误';
                message = '您提交的方式不对，请重新提交';
                break;
            case 500:
                title = '系统错误';
                message = '请尝试刷新页面,或重新操作';
                break;
            case 502:
                title = '网络错误';
                message = '您的网络开小差了';
                break;
        }
        notification.warning({
            message: title,
            description: message
        });
        return Promise.reject(message);

    }
)

export default http;