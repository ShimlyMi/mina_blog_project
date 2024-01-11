const {DataType, DataTypes} = require("sequelize")
const seq = require("../../db/seq")
const moment = require("moment/moment")

const Menu = seq.define('yz_menu',
    {
        /** 菜单名称 */
        menu_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: "菜单名称 唯一"
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
Menu.sync({force: true})
// console.log("User模型同步成功");

module.exports = Menu
