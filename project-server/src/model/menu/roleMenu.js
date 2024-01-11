const {DataTypes} = require("sequelize")
// 导入 seq
const seq = require("../../db/seq")
const moment = require("moment");

const RoleMenu = seq.define('yz_role_menu',
    {
        role_id: {
            type: DataTypes.INTEGER,
            require: true,
            comment: "角色id",
        },
        menu_id: {
            type: DataTypes.INTEGER,
            require: true,
            comment: "菜单id",
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
RoleMenu.sync({force: true})
// console.log("User模型同步成功");

module.exports = RoleMenu;
