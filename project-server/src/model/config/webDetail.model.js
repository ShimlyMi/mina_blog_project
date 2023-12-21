const { Sequelize, DataType, DataTypes} = require("sequelize")
const seq = require("../../db/seq")

const Config = seq.define(
    "mi_blog_config",
    {
        blog_name: {
            type: DataTypes.STRING(55),
            require: true,
            comment: "博客名称",
            defaultValue: "米娜的小屋",
        },
        blog_avatar: {
            type: DataTypes.STRING, // STRING 默认255
            require: true,
            comment: "博客头像",
            defaultValue: "http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg"
        },
        avatar_bg: {
            type: DataTypes.STRING,
            require: true,
            comment: "博客头像背景图",
        },
        personality_signature: {
            type: DataTypes.STRING,
            require: true,
            comment: "个性签名"
        },
        blog_notice: {
            type: DataTypes.STRING,
            comment: "博客公告"
        },
        qq_link: {
            type: DataTypes.STRING,
            require: true,
            comment: "QQ链接",
        },
        we_chat_link: {
            type: DataTypes.STRING,
            require: true,
            comment: "微信链接",
        },
        github_link: {
            type: DataTypes.STRING,
            require: true,
            comment: "github链接"
        },
        git_ee_link: {
            type: DataTypes.STRING,
            require: true,
            comment: "git_ee链接",
        },
        view_time: {
            type: DataTypes.INTEGER,
            require: true,
            defaultValue: 0,
            comment: "博客访问次数"
        },
    },
    {
        freezeTableName: true, // 强制表名不转复数
    }
)
// Config.sync({ alter: true }) // 同步数据表
module.exports = Config;
