const Notify = require("../model/notify/notify.model");

class NotifyService {
    /**
     * 新增消息通知
     * */
    async createNotify(notify) {
        const { user_id, type, to_id, message } = notify;
        const res = await Notify.create({ user_id, type, to_id, message });
        return  res.dataValues
    }

    /**
     * 已阅消息通知
     * @param {*} id
     * */
    async updateNotify(id) {
        const res = await Notify.update({ isView: 2 }, { where: { id } })
        return res[0] > 0
    }

    /**
     * 删除消息通知
     * @param {*} id
     * */
    async deleteNotify(id) {
        const res = await Notify.destroy({ where: { id } })
        return res
    }

    /**
     * 获取当前消息推送
     * */
    async getNotifyList({ current, size, userId }) {
        const whereOpt = {};
        const offset = (current - 1) * size
        const limit = size * 1
        userId && Object.assign(whereOpt, { user_id: userId })
        const { count, rows } = await Notify.findAndCountAll({
            offset, limit,where: whereOpt, order: [["isView", "ASC"], ["createdAt", "DESC"]]
        })
        return {
            current: current,
            size: size,
            total: count,
            list: rows
        }
    }
}

module.exports = new NotifyService();
