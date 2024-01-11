const {DataTypes} = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")
const moment = require("moment");

const UserRole = seq.define('yz_user_role',
    {
        user_id: {
            type: DataTypes.INTEGER,
            require: true,
            comment: "用户id",
        },
        role_id: {
            type: DataTypes.INTEGER,
            require: true,
            comment: "角色id",
        },
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
    },
    {
        freezeTableName: true, // 强制表名不转复数
        paranoid: true,
    }
)

// 强制同步数据库 表创建完之后 要注释掉
// UserRole.sync({ force: true })
// console.log("User模型同步成功");

module.exports = UserRole;
