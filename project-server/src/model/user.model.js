// 	使用的是 seq.define 方法
const { DataTypes } = require("sequelize")
// 导入 seq
const seq = require("../db/seq")

// 创建模型 (所对应的数据表 yz_users)
const User = seq.define('yz_user', {
    // 编写表的字段
    /*
     * id 会被 sequelize 自动创建
     */
    // 用户名
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名,唯一",
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: "密码",
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: "是否为管理员,0:不是管理员(默认),1:是管理员",
    },
    nick_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
        comment: "用户昵称",
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
        comment: '用户头像'
    }
})

// 强制同步数据库 表创建完之后 要注释掉
// User.sync({ force: true })
// console.log("User模型同步成功");

module.exports = User
