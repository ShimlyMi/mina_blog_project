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
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径
})

/** 请求拦截器 */
http.interceptors.request.use(
    (config) => {
        // config 配置对象里 包含请求头 headers
        return config
    },
)
/** 响应拦截器 */
http.interceptors.response.use(
    (res) => {
        return res.data
    },
    (error) => {
        return Promise.reject(new Error("erorr"))
    }
)
export default  http
```
