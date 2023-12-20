const User = require("../model/user.model")
const { randomNickname, getIpAddress } = require("../utils/tools");
// const filterSensitive = require("../utils/sensitive")

class UserService {
    /**
     * 用户注册
     * @param {*} user
     */
    async createUser(user) {
        // 键值对的名字一样时可以简写，即 只写一个
        // await 返回的是成功的值
        // 注意postman 发送请求 必须选择 JSON
        let { user_name, password, nick_name } = user;
        // 过滤敏感词
        // nick_name = await filterSensitive(nick_name);
        nick_name = nick_name ? nick_name : randomNickname("星星");
        const avatar = "http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg";
        const res = await User.create({ user_name, password, nick_name, avatar, role: 2 });
        // console.log(res);
        return res.dataValues
    };

    // 查询用户信息
    async getOneUserInfo({ id, user_name, password, role, nick_name, avatar }) {
        const whereOpt = {};
        /*
         * 判断 id user_name password id_admin 是否存在
         * assign 是拷贝
         */
        id && Object.assign(whereOpt, { id });
        user_name && Object.assign(whereOpt, { user_name });
        password && Object.assign(whereOpt, { password });
        role && Object.assign(whereOpt, { role });
        nick_name && Object.assign((whereOpt, { nick_name }));
        avatar && Object.assign(whereOpt, { avatar })
        // console.log(whereOpt)

        // 查询数据记录
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'role', 'nick_name', 'avatar'],
            where: whereOpt,
        });
        return res ? res.dataValues : null;
    }



    /** 更新用户ID */
    async updateById({ id, user_name, password, role }) {
        const whereOpt = { id };
        const newUser = {};

        user_name && Object.assign(newUser, { user_name });
        password && Object.assign(newUser, { password });
        role && Object.assign(newUser, { role });

        const res = await User.update(newUser, { where: whereOpt });

        return res[0] > 0 ? true : false;

    }


}

module.exports = new UserService()
