const Talk = require("../../model/talk/talk.model")

const { publishTalkPhoto, deleteTalkPhoto, getPhotoByTalkId } = require("./talkPhoto.servide")
const { getOneUserInfo } = require("../user.service")
const Article = require("../../model/article/article.model");

/**
 * 说说服务层
 * */

class TalkService {
    /**
     * 新增说说
     * @param {*} talk
     * */
    async publishTalk(talk) {
        const { talkImgList, ...resTalk } = talk
        const res = await Talk.create(resTalk)
        if (res.dataValues.id) {
            let imgList = talkImgList.map((img) => {
                return {
                    talk_id: res.dataValues.id,
                    url: img.url
                }
            })
            await publishTalkPhoto(imgList)
        }
        return res.dataValues
    }

    /**
     * 修改说说
     * @param {*} talk
     * */
    async updateTalk(talk) {
        const { id, talkImgList, ...resTalk } = talk
        const res = await Talk.update({ ...resTalk }, { where: { id } })
        // 先删除图片关联
        await deleteTalkPhoto(id)
        let imgList = talkImgList.map((img) => {
            return {
                talk_id: id,
                url: img.url
            }
        })
        // 添加图片
        await publishTalkPhoto(imgList)

        return res[0] > 0
    }

    /**
     * 删除说说
     * @param id
     * @param status
     * */
    async deleteTalkById(id, status) {
        let res;
        if (Number(status) == 1 || Number(status) == 2) {
            res = await Talk.update({ status: 3 }, { where: { id } })
        } else {
            res = await Talk.destroy({ where: { id } })
            await deleteTalkPhoto(id)
        }
        return res
    }

    /**
     * 切换说说 公开性
     * @param id
     * @param status
     * */
    async togglePublic(id, status){
        const res = await Talk.update({ status }, { where: { id } })
        return !!res
    }

    /**
     * 恢复说说
     * */
    async revertTalk(id) {
        const res = await Talk.update({ status: 1 }, { where: { id } })
        return !!res
    }

    /**
     * 置顶/取消置顶
     * */
    async toggleTop(id, is_top) {
        const res = await Talk.update({ is_top }, { where: { id } })
        return !!res
    }

    /**
     * 说说点赞
     * @param {*} id
     * */
    async talkLike(id) {
        let talk = await Talk.findByPk(id)
        if (talk) {
            await talk.increment("like_times", { by: 1 })
        }
        return !!talk
    }

    /**
     * 取消说说点赞
     * @param {*} id
     */
    async cancelTalkLike(id) {
        let talk = await Talk.findByPk(id);
        if (talk) {
            await talk.decrement("like_times", { by: 1 });
        }

        return !!talk;
    }

    /**
     *
     * @param {*} current 当前页
     * @param {*} size 数量
     * @param {*} status 状态
     * @param {*} is_top 置顶状态
     */
    async getTalkList(current, size, status) {
        const offset = (current - 1) * size
        const limit = size * 1
        const whereOpt = {}
        status && Object.assign(whereOpt, { status })
        const { rows, count } = await  Talk.findAndCountAll({
            limit,
            offset,
            where: whereOpt,
        })
        let promiseList = [];
        promiseList = rows.map(async (v) => {
            return await getPhotoByTalkId(v.id)
        })
        await Promise.all(promiseList).then((res) => {
            res.forEach((v) => {
                if (v.length) {
                    let index = rows.findIndex((r) => r.dataValues.id == v[0].talk_id)
                    if (index !== -1) {
                        rows[index].dataValues.talkImgList = v.map((v) => v.url)
                    }
                }
            })
        })
        let userList = rows.map(async (row) => {
            return getOneUserInfo({id: row.user_id});
        })
        await Promise.all(userList).then((res) => {
            res.forEach((r, index) => {
                if (r) {
                    rows[index].dataValues.nick_name = r.nick_name
                    rows[index].dataValues.avatar = r.avatar
                }
            })
        })

        return { current, size, list: rows, total: count }
    }

    /**
     * 根据id获取说谁详情
     * */
    async getTalkById(id) {
        let res = await Talk.findByPk(id)
        let imgs = await getPhotoByTalkId(id)
        return {
            ...res.dataValues,
            talkImgList: imgs.length ? imgs.map((v) => v.url) : []
        }
    }
    /** 获取说说总数 */
    async getTalkCount() {
        let res = await Talk.count({
            where: { status: 1 }
        });
        return res;
    }

    /**
     * 前台获取说说列表
     * */
    async blogGetTalkList(current, size, user_id) {
        const offset = (current - 1) * size
        const limit = size * 1
        const { rows, count } = await Talk.findAndCountAll({
            limit, offset,
            where: { status: 1 }
        })
        let promiseList = [];
        promiseList = rows.map(async (v) => {
            return await getPhotoByTalkId(v.id)
        })
        await Promise.all(promiseList).then((res) => {
            res.forEach((v) => {
                if (v.length) {
                    let index = rows.findIndex((r) => r.dataValues.id == v[0].talk_id)
                    if (index !== -1) {
                        rows[index].dataValues.talkImgList = v.map((v) => v.url)
                    }
                }
            })
        })
        let userList = rows.map(async (row) => {
            return getOneUserInfo({id: row.user_id});
        })
        await Promise.all(userList).then((res) => {
            res.forEach((r, index) => {
                if (r) {
                    rows[index].dataValues.nick_name = r.nick_name
                    rows[index].dataValues.avatar = r.avatar
                }
            })
        })

        // 判断当前登录用户是否点赞了
        if (user_id) {
            const promiseLikeList = rows.map((row) => {
                return getIsLikeByIdAndType({ for_id: row.id, type: 2, user_id });
            });
            await Promise.all(promiseLikeList).then((result) => {
                result.forEach((r, index) => {
                    rows[index].dataValues.is_like = r;
                });
            });
        }

        return { current, size, list: rows, total: count }
    }
}

module.exports = new TalkService()
