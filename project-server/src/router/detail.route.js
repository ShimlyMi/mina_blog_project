/**
 * 网站设置路由
 * @author: MINA
 */
const Router = require('koa-router');
const router = new Router({ prefix: '/config' });
const { getDetail } = require("../controller/detail.controller")

router.get("/detail", getDetail)

module.exports = router