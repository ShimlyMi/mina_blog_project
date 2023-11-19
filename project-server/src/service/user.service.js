const User = require("../model/user.model")


class UserService {
    async createUser(user_name, password) {
        // 键值对的名字一样时可以简写，即 只写一个
        // await 返回的是成功的值
        // 注意postman 发送请求 必须选择 JSON
        const res = await User.create({ user_name, password })
        // console.log(res);
        return res.dataValues
    };

    // 查询用户信息
    async getUserInfo({id, user_name, password, is_admin}) {
        const whereOpt = {};
        /*
         * 判断 id user_name password id_admin 是否存在
         * assign 是拷贝
         */
        id && Object.assign(whereOpt, { id });
        user_name && Object.assign(whereOpt, { user_name });
        password && Object.assign(whereOpt, { password });
        is_admin && Object.assign(whereOpt, { is_admin });
        console.log(whereOpt)

        // 查询数据记录
        const res = await User.findOne({
            attributes:['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt,
        });
        return res ? res.dataValues : null;
    }
}

module.exports = new UserService()