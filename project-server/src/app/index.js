const Koa = require('koa');
// 注册中间件，要在所有路由请求之前
const { koaBody } = require("koa-body");

const errorHandle = require("./errorHandle")

const router = require("../router")

const app = new Koa();
app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods())


/* 监听 app.on */
app.on("error", errorHandle);
// 向外暴露 app 接口
module.exports = app;