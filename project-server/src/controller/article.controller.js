
const { createArticle, updateArticleById, removeArticleById, revertArticle, toggleArticlePublic, getArticleInfoByTitle, findArticle } = require("../service/article.service");
const { publishArticleError, invalidArticle, invalidArticleID, listArticleError } = require("../constant/err.type");
const tty = require("tty");

class ArticleController {
    // 新增文章
    async create(ctx) {
        // 直接调用 service 里的 createArticle 方法
        try {
           let { createdAt, updatedAt, ...res } =  await createArticle(ctx.request.body);
           ctx.body = {
               code: 0,
               message: "文章发布成功",
               result: res,
           }
        } catch (err) {
            console.error(err);
            return ctx.app.emit('error', publishArticleError, ctx);
        }

    }
    // 修改文章接口
    async update(ctx) {
        try {
            const res = await updateArticleById(ctx.request.body);
            if (res) {
                ctx.body = {
                    code: 0,
                    message: "修改商品成功",
                    result: "",
                }
            } else {
                return ctx.app.emit('error',invalidArticle,ctx);
            }
        } catch (err) {
            console.error(err);

        }
    }
    // 删除文章
    async remove(ctx) {
        try {
            const { id } = ctx.params;
            const res = await removeArticleById(id);
            console.log(res)
            ctx.body = {
                code: 0,
                message: "文章下架成功",
                result: "",
            }
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", invalidArticleID, ctx);
        }
    }
    // 恢复文章
    async restore(ctx) {
        try {
            const res = await revertArticle(ctx.params.id);
            ctx.body = {
                code: 0,
                message: "文章恢复成功",
                result: '',
            }
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", invalidArticleID, ctx);
        }
    }
    // 公开或隐藏文章
    async toggleArticlePublic(ctx) {
        try {
            const { id, status } = ctx.params;
            let res = await toggleArticlePublic(id, status);
            let message = Number(status) === 1 ? "隐藏文章" : "公开文章";
            ctx.body = {
                code: 0,
                message: message + "成功",
                result: res,
            }
        } catch (err) {
            console.error(err);
        }
    }
    /** 查找所有文章列表 */
    async findAll(ctx) {
        try {
            // 解析 pageNum pageSize
            const { pageNum = 1, pageSize = 10 } = ctx.request.query;
            // 调用数据处理方法
            let res = await  findArticle(pageNum, pageSize);
            // 返回结果
            ctx.body = {
                code: 0,
                message: "文章列表查询成功",
                result: res,
            }
        } catch (err) {
            console.error(err);
            return ctx.app.emit('error', listArticleError, ctx);
        }


    }
}

module.exports = new ArticleController();