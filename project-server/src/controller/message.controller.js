const { result, throwError, ERRORCODE } = require("../constant/err.type");
const errorCode = ERRORCODE.MESSAGE;
const {
    addMessage, deleteMessage, getMessageList, cancelLikeMessage, likeMessage, updateMessage
} = require("../service/message.service");
const { randomNickname } = require("../utils/tools");
const { addNotify } = require("./notify.controller")

class MessageController {
    /** 发布留言 */
    async addMessage(ctx) {
        try {
            let { user_id, message, nick_name, avatar, ...rest } = ctx.request.body
            if (!user_id) {
                nick_name = randomNickname("游客", 5);
                avatar = 'http://http://127.0.0.1:8888/b211b5e11aae0c61acb80cf00.jpg'
            }
            const res = await addMessage({ user_id, message, nick_name, avatar, ...rest })
            // 发送消息推送
            if (user_id != 1) {
                await addNotify({
                    user_id: 1,
                    type: 3,
                    message: `您收到了来自于 ${nick_name} 的留言: ${message}!`
                })
            }
            ctx.body = result("发布成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "发布失败"), ctx)
        }
    }

    /**
     * 修改留言
     * @param {*} ctx
     *  */
    async updateMessage(ctx) {
        try {
            const res = await updateMessage(ctx.request.body)
            ctx.body = result("修改成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "修改留言失败"), ctx)
        }
    }

    /** 删除留言 */
    async deleteMessage(ctx) {
        try {
            const { idList } = ctx.request.body
            const res = await deleteMessage(idList)
            ctx.body = result("删除留言成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "删除留言失败"), ctx)
        }
    }

    /** 留言点赞 */
    async likeMessage(ctx) {
        try {
            const res = await likeMessage(ctx.params.id)
            ctx.body = result("点赞留言成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "点赞留言失败"), ctx)
        }
    }

    /** 取消留言点赞 */
    async cancelLikeMessage(ctx) {
        try {
            const res = await cancelLikeMessage(ctx.params.id)
            ctx.body = result("取消点赞留言成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "取消点赞留言失败"), ctx)
        }
    }

    /**
     * 分页获取留言
     *  */
    async getMessageList(ctx) {
        try {
            const res = await getMessageList(ctx.request.body)
            ctx.body = result("分页获取留言成功", res)
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", throwError(errorCode, "分页获取留言失败"), ctx)
        }
    }

    /**
     * 获取热门标签
     * @param {*} ctx
     *  */
    // async getMessageTag(ctx) {
    //     try {
    //         const res = await getMessageTag()
    //         ctx.body = result("获取留言所有标签成功", res)
    //     } catch (err) {
    //         console.error(err)
    //         return ctx.app.emit("error", throwError(errorCode, "获取留言所有标签失败"), ctx)
    //     }
    // }

}

module.exports = new MessageController();
