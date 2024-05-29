/** @Desctiption 获取一些 统计信息 */
const { getArticleCount } = require("../service/article/article.service");
const { getTalkCount } = require("../service/talk/talk.service");
const { getUserCount } = require("../service/user.service");

const { result, ERRORCODE, throwError } = require("../constant/err.type");
const errorCode = ERRORCODE.STATISTIC;

class StatisticController {
    async homeStatistic(ctx) {
        try {
            let articleCount = await getArticleCount();
            let talkCount = await getTalkCount();
            let userCount = await getUserCount();
            ctx.body = result("获取数据统计成功", {
                articleCount,
                talkCount,
                userCount
            })
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", throwError(errorCode, "获取数据统计失败"), ctx);
        }
    }
}

module.exports = new StatisticController();
