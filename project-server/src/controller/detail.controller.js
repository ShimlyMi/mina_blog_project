const { getWebDetail } = require("../service/detail.service")
const { getWebDetailError } = require("../constant/err.type")
class DetailController {
    async getDetail(ctx) {
        try {
            let res = await getWebDetail()
            console.log("detail", res)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: "获取网站详情成功",
                    result: res
                }
            } else {
                ctx.body = {
                    code: 100,
                    message: "请到博客后台查看完整的详细信息",
                    result: ""
                }
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", getWebDetailError, ctx)
        }
    }
}

module.exports = new DetailController()