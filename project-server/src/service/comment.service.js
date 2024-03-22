const Comment = require("../model/comment/comment.model");
const { Op } = require("sequelize");
const { getOneUserInfo } = require("./user.service");



/**
 * 评论服务层
 * */
class CommentService {
    /**
     *  新增评论
     * @param {*} comment
     * @returns Boolean
     * */
    async createComment(comment) {
        const { type, for_id, from_id, from_name, from_avatar, content } = comment;
        const res = await Comment.create({ type, for_id, from_id, from_name, from_avatar, content })
        return res.dataValues;
    }

    /**
     * 回复评论
     * @param {*} comment
     * @returns Boolean
     * */

    async applyComment(comment) {
        const { parent_id, type, for_id, from_id, from_avatar, from_name, to_id, to_name, to_avatar, content } = comment
        const res = await Comment.create({
            parent_id, type, for_id, from_id, from_avatar, from_name, to_id, to_name, to_avatar, content
        })
        return res.dataValues;
    }

    /**
     * 点赞评论
     * @param { id }
     * */
    async thumbUpComment(id) {
        let comment = await Comment.findByPk(id);
        if (comment) {
            await comment.increment("thumb_up", { by: 1 });
        }
        return !!comment
    }

    /**
     * 取消点赞评论
     * @param { id }
     * */
    async cancelThumbUp(id) {
        let comment = await Comment.findByPk(id);
        if (comment) {
            await comment.decrement("thumb_up", { by: 1 });
        }
        return !!comment;
    }

    /** 删除评论 */
    async deleteComment(id, parent_id) {
        let res;
        if (parent_id > 0) {
            res = await Comment.destroy({ where: { id } });
        } else {
            res = await Comment.destroy({ where: { id } });
            await Comment.destroy({ where: { parent_id: id } });
        }

        return res ? res : null;
    }

    /**
     * 后台分页获取评论列表
     * @param current
     * @param size
     * @param {*} content
     * @param {*} from_name
     * @param {*} to_name
     * @param {*} time
     * @returns
     * */
    async backGetCommentList({ current, size, content, to_name, time, from_name }){
        const whereOp = {};
        const offset = (current - 1) * size;
        const limit = size * 1;

        content && Object.assign(whereOp, { content: { [Op.like]: `%${content}%` } });
        to_name && Object.assign(whereOp, { name: { [Op.like]: `%${to_name}%` } });
        from_name && Object.assign(whereOp, { name: { [Op.like]: `%${from_name}%` } });
        time && Object.assign(whereOp, { createdAt: { [Op.between]: time } });

        const { count, rows } = await Comment.findAndCountAll({
            offset, limit, where: whereOp, order: [["createdAt", "DESC"]]
        });

        const fromIdPromiseList = rows.map(async (row) => {
            let res;
            if (row.from_id) {
                res = await getOneUserInfo({ id: row.from_id })
            }
            return res;
        });
        await Promise.all(fromIdPromiseList).then((result) => {
            result.forEach((r, index) => {
                if (r) {
                    rows[index].dataValues.from_avatar = r.avatar;
                    rows[index].dataValues.from_name = r.nick_name;
                }
            });
        });

        const toIdPromiseList = rows.map(async (row) => {
            let res;
            if (row.to_id) {
                res = await getOneUserInfo({ id: row.to_id })
            }
            return res;
        });
        await Promise.all(toIdPromiseList).then((result) => {
            result.forEach((r, index) => {
                if (r) {
                    rows[index].dataValues.to_avatar = r.avatar;
                    rows[index].dataValues.to_name = r.nick_name;
                }
            });
        });

        return {
            current: current,
            size: size,
            total: count,
            list: rows
        };
    }

    /**
     * 前台分页获取父级评论
     * @param {*} type
     * @param {*} id
     * */
    async frontGetParentComment({ current, size, type, for_id, user_id, order }) {
        const whereOpt = {};
        const offset = (current - 1) * size;
        const limit = size * 1;
        type && Object.assign(whereOpt, { type });
        for_id && Object.assign(whereOpt, { for_id });
        Object.assign(whereOpt, { parent_id: null });

        const orderArr = order == "new" ? ["createdAt", "DESC"] : ["thumbs_up", "DESC"]
        const { count, rows } = await Comment.findAndCountAll({
            offset, limit, where: whereOpt, order: [orderArr]
        });

        const promiseList = rows.map(async (row) => {
            let res;
            if (row.defaultValue.from_id) {
                res = await getOneUserInfo({ id: row.from_id });
            }
            return res;
        });
        await Promise.all(promiseList).then((result) => {
            result.forEach((r) => {
                if (r) {
                    let index = rows.findIndex((row) =>  row.from_id == r.id)
                    if (index != -1) {
                        rows[index].dataValues.from_avatar = r.avatar;
                        rows[index].dataValues.from_name = r.nick_name;
                    }
                }
            })
        });

        if (user_id) {
            const promiseList = rows.map((row) => {

            })
        }
    }
}
