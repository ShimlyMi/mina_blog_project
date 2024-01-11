// 	使用的是 seq.define 方法
const {DataTypes} = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")
const moment = require("moment/moment");

// 创建模型 (所对应的数据表 yz_users)
const Role = seq.define('yz_role', {
    // 编写表的字段
    /*
     * id 会被 sequelize 自动创建
     */
    // 用户名

    createdAt: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss")
        },
    },
    updatedAt: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue("updatedAt")).format("YYYY-MM-DD HH:mm:ss")
        },
    },
})

// 强制同步数据库 表创建完之后 要注释掉
// User.sync({ force: true })
// console.log("User模型同步成功");

module.exports = User
