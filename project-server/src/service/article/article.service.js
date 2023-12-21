
const Article = require("../../model/article/article.model")
class ArticleService {
    async createArticle(article) {
        let res;
        try {
            // 判断当前分类是否存在，若是存在，则会有分类id
            res = await Article.create(article);
        } catch (err) {
            console.error(err);
        }
        return res ? res.dataValues : null;
    }

    /**
     * 修改文本信息
     * @param { article } article
     * @returns Boolean
     */
    async updateArticleById(article) {
        let res;
        try {
            res = await Article.update(article, { where: { id: article.id } })

        } catch (err) {
            console.error(err);
        }
        return res[0] > 0;
    }
    /**
     * 删除文本
     * @param {*} id 文章id
     * @param {*} status 文章状态 3 永久删除 1 2 回收站
     */
    async removeArticleById(id, status) {
        let res;
        if (Number(status) !== 3) {
            res = await Article.update({ status: 3 }, { where: { id } })
        } else {
            res = await Article.destroy({ where: { id } })
        }
        if (Number(status) === 3) {
            res = res > 0 ;
        } else {
            res = res[0] > 0;
        }
        return res;
    }
    /**
     * 恢复文章
     * @param {*} id 文章id
     */
    async revertArticle(id) {
        let res = await Article.restore({ status: 1 },{ where: { id } });
        return res > 0;
    }

    /**
     * 公开或隐藏文章
     * @param {*} id 文章id
     * @param {*} status  文章状态
     * @returns
     */
    async toggleArticlePublic(id, status) {
        status = Number(status) === 2 ? 1 : 2;
        let res = await Article.update({ status }, { where: { id } });
        return res[0] > 0;
    }
    /**
     * 根据文章标题获取文章信息 校验是否可以新增或编辑文章
     * @param {*} article_title
     */
    async getArticleInfoByTitle({ id, article_title }) {
        let res = await Article.findOne({attributes: ["id"],  where: { article_title },});
        if (res) {
            if (id) {
                return  res =  res.dataValues.id !== id;
            } else {
                return res = true;
            }
        } else {
            return res = false;
        }
    }

    /** 获得文章列表 */
    async findArticle(pageNum, pageSize) {
        // 1. 获取总数
        // const count = await Article.count();

        // 2. 获取分页具体数据
        const offset = (pageNum - 1) * pageSize
        // let rows = await Article.findAll({ offset: offset, limit: pageSize * 1 })
        const { count, rows } = await Article.findAndCountAll({ offset: offset, limit: pageSize * 1 })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }
}

module.exports = new ArticleService();
