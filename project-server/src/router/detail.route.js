/**
 * 网站设置路由
 * @author: MINA
 */
const Router = require('koa-router');

const { getDetail, updateDetail } = require("../controller/detail.controller")
// const { updateDetailById } = require("../service/detail.service")
const { hadAdminPermission } = require("../middleware/auth.middleware")

const router = new Router({ prefix: '/config' });


/** 更新设置 */
// router.post("/update", updateDetail)

/** 获得详情 */
router.get("/detail", getDetail)

module.exports = router
