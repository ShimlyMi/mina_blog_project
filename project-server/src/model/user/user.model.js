// 	使用的是 seq.define 方法
// const { DataTypes } = require("sequelize")
// 导入 seq
// const seq = require("../../db/seq")
const moment = require("moment/moment");
const Sequelize = require("sequelize")

// 创建模型 (所对应的数据表 yz_users)
module.exports = sequelize => {
    const User = sequelize.define('mi_user', {
        // 编写表的字段
        /*
         * id 会被 sequelize 自动创建
         */
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "用户ID 唯一"
        },
        // 用户名
        user_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            comment: "用户名,唯一",
        },
        password: {
            type: Sequelize.CHAR(64),
            allowNull: false,
            comment: "密码",
        },
        // role: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 2,
        //     comment: "用户角色 1 管理员 2 普通用户",
        // },
        nick_name: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: '',
            comment: "用户昵称",
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg',
            comment: '用户头像'
        },
        createdAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss")
            },
        },
        updatedAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue("updatedAt")).format("YYYY-MM-DD HH:mm:ss")
            },
        },
    });
    return User
}


// 强制同步数据库 表创建完之后 要注释掉
// User.sync({ force: true })
// console.log("User模型同步成功");

// module.exports = User
