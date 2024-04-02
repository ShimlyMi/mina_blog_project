const { getWebDetail, updateDetail } = require("../service/detail.service")
const { ERRORCODE, throwError, result, tipsResult } = require("../constant/err.type")
const errorCode = ERRORCODE.CONFIG
class DetailController {
    /** 修改设置 */
    async updateDetail(ctx) {
        try {
            let config = await getConfig();
            // 如果背景图不一致，删除原来的
            const { avatar_bg, blog_avatar } = ctx.request.body;
            if (UPLOADTYPE == "online") {
                if (avatar_bg && config.avatar_bg && avatar_bg != config.avatar_bg) {
                    await Utils.deleteOnlineImgs([config.avatar_bg.split("/").pop()]);
                }
                if (blog_avatar && config.blog_avatar && blog_avatar != config.blog_avatar) {
                    await Utils.deleteOnlineImgs([config.blog_avatar.split("/").pop()]);
                }
            }
            // 如果背景图不一致，删除原来的
            let res = await updateDetail(ctx.request.body)
            if (res) {
                console.log("detailUpdateRes",res)
                ctx.body = result("修改网站设置成功", res)
            } else {
                ctx.body = tipsResult("")
            }

        } catch (error) {
            console.error("修改网站设置失败")
            return ctx.app.emit("error",throwError(errorCode, "修改网站设置失败"), ctx)
        }
    }
    /** 获取详情信息 */
    async getDetail(ctx) {
        try {
            let res = await getWebDetail()
            // console.log("detail", res)
            if (res) {
                ctx.body = result("获取详情成功", {
                    id: res.id,
                    blog_name: res.blog_name,
                    blog_avatar: res.blog_avatar,
                    avatar_bg: res.avatar_bg,
                    personality_signature: res.personality_signature
                })
            } else {
                ctx.body = result("请到博客后台查看完整的详细信息", "")
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "获取详情失败"), ctx)
        }
    }
}

module.exports = new DetailController()
