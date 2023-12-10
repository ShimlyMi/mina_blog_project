const { DataTypes } = require("sequelize")
// 导入 seq
const seq = require("../db/seq")

const ArticleTag =  seq.define('yz_article_tag', {
    article_id: {
        type: DataTypes.INTEGER,
        require: true,
        comment: "文章id",
    },
    tag_id: {
        type: DataTypes.INTEGER,
        require: true,
        comment: "标签id",
    },
})

module.exports = ArticleTag;