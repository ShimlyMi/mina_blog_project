# 一、创建项目
## 1. 用脚手架创建
```
## 用vue脚手架创建项目 配置会更齐全一些

npm init vue@latest

## 用 vite 创建项目 
npm init vite@lastest

## 此项目采用的就是用vue脚手架创建项目
```
## 2. 安装依赖
```
## 三种 install 方式
## 本项目 采用 pnpm
pnpm install || npm install || yarn install

## 安装 element-plus
pnpm install element-plus --save

## 安装 sass sass-loader
pnpm install sass saas-loader -D

```
# 二、路由分析
## 1. 路由分析
· 前端路由使用的是 vue-router
· 项目结构为上中下
· 路由键值对: key-URL(地址中的路由)，value-相应的路由组件
## 2. 路由组件与非路由组件
· 路由组件
Home(首页)组件、Login(登录)组件、Register(注册)组件
· 非路由组件
Header: 【home、以及其他组件】
Footer: 【home、以及其他组件】
· $route & $router
$route: 一般获取路由信息[路径、query、params等]
$router: 一般进行编程式导航进行路由跳转[push|replace]
## 3. 路由参数
· params: 属于路径当中的一部分，在配置路由的时候，需要占位
· query：不属于路径当中的一部分，类似于ajax中的queryString -> /home?k=v&kv=, 不需要占位
# 三、axios 二次封装
在 `src/config/request.js` 下
```javascript
/** 安装 axios 
 * pnpm install axios -S
 * */
import axios from 'axios'

// 创建实例
const http = axios.create({
    timeout: 10000, // 请求从超时时间
    withCredentials: true,
    headers: {
        // 设置后端需要的传参类型
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径
})

/** 请求拦截器 */
http.interceptors.request.use(
    config => {
        const userStore = useUserStore();
        // userStore.getToken error
        if (userStore.token) {
            config.headers.Authorization = userStore.token
        }
        // 在发送请求之前做什么
        return config;
    },
    error => {
        // 对请求错误做些什么
        console.log(error);
        return Promise.reject(error);
    }
)
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
        const { status, data } = error.response
        switch (status + "") {
            case "401":
                // 403 表示用户未登录，或者token过期了
                ElNotification({
                    offset: 60,
                    title: "错误提示",
                    message: data.message || "登录过期"
                });
                // 进行重新登录
                // eslint-disable-next-line no-case-declarations
                const userStore = useUserStore();
                userStore.clearUserInfo();
                router.push("/login");
                break;
            case "403":
                // 403 表示权限不足
                ElNotification({
                    offset: 60,
                    title: "错误提示",
                    message: h(
                        "div",
                        { style: "color: #f56c6c; font-weight: 600;" },
                        data.message || "权限不足"
                    ),
                });
                break;
            case "404":
                ElNotification({
                    offset: 60,
                    title: "错误提示",
                    message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, "接口没有找到"),
                });
                break;
            case "408":
                // 205 表示给用户一些提示
                ElNotification({
                    offset: 60,
                    title: "温馨提示",
                    message: h(
                        "div",
                        { style: "color: #e6c081; font-weight: 600;" },
                        data.message || "服务端错误"
                    ),
                });
                break;
            case "500":
                ElNotification({
                    offset: 60,
                    title: "错误提示",
                    message: h(
                        "div",
                        { style: "color: #f56c6c; font-weight: 600;" },
                        data.message || "服务端错误"
                    ),
                });
                break;
            default:
                return;
        }
        return Promise.reject(error);
)
export default  http
```

