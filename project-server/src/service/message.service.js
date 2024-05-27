const Message = require("../model/message/message.model");
const { getOneUserInfo } = require("./user.service");
const { getIsLikeByIdAndType } = require("./like.service");
const {Op} = require("sequelize");

class MessageService {
    /** 新增留言 */
    async addMessage({ message, user_id, nick_name }) {
        const res = await Message.create({ message, user_id, nick_name, });
        return !!res;
    }

    /**
     * 点赞留言
     * @param id
     * */
    async likeMessage(id) {
        let message = await Message.findByPk(id);
        if (message) {
            await message.increment("like_times", {by: 1})
        }
        return !!message
    }

    /**
     * 分页获取留言
     * */
    async getMessageList({current, size, message, time }) {
        const offset = (current - 1) * size;
        const limit = size * 1;
        const whereOpt = {};
        message && Object.assign(whereOpt, {message: {[Op.like]: `%${message}%`}});
        time && Object.assign(whereOpt, {createdAt: {[Op.between]: time}});
        const { rows, count } = await Message.findAndCountAll({
            limit, offset, where: whereOpt, order: [["createdAt", "DESC"]]
        });
        return {
            current, size, list: rows, total: count
        }
    }
}
module.exports = new MessageService();
