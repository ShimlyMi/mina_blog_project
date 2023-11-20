import axios from "axios";
import { message,notification } from 'ant-design-vue';

// 设置默认请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

// 创建实例
const http = axios.create({
    // axios 中请求配置 的 baseUrl 选项，表示请求URL公共部分
    baseURL: process.env.BASE_API,
    // 请求超时时间
    timeout: 10000
});

// 请求拦截器
http.interceptors.request.use(config => {

})


export default http;