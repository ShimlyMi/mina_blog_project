const { getWebDetail, updateDetailById } = require("../service/detail.service")
const { getWebDetailError } = require("../constant/err.type")
class DetailController {
    /** 修改设置 */
    async updateDetail(ctx) {
        try {
            console.log("detailUpdate",ctx.request.body)
            // 如果背景图不一致，删除原来的
            let res = await updateDetailById(ctx.request.body)
            console.log("detailUpdate",res)
            ctx.body = {
                code: 0,
                message: "修改网站设置成功",
                result: res
            }

        } catch (error) {
            console.error("修改网站设置失败")
            return ctx.app.emit("error",ctx)
        }
    }
    /** 获取详情信息 */
    async getDetail(ctx) {
        try {
            let res = await getWebDetail()
            // console.log("detail", res)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: "获取网站详情成功",
                    result: {
                        id: res.id,
                        blog_name: res.blog_name,
                        blog_avatar: res.blog_avatar,
                        avatar_bg: res.avatar_bg,
                        personality_signature: res.personality_signature
                    }
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
