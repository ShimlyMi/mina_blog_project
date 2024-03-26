/**
 * 留言的路由
 * @author: MINA
 */
const Router = require("koa-router");
const router = new Router({ prefix: "/notify" });
const { deleteNotify, getNotifyList, updateNotify } = require("../controller/notify.controller")

// 修改消息推送
router.put("/update/:id", updateNotify);
// 删除消息推送
router.put("/delete/:id", deleteNotify);
// 条件分页获取消息推送
router.post("/getNotifyList", getNotifyList);

module.exports = router


