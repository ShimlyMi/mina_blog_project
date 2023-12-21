const Config = require("../model/config/detail.model")
class DetailService {
    // 修改网站设置
    async updateDetail() {

    }
    // 获取网站设置
    async getWebDetail() {
        let res = await Config.findAll();
        // 这里不能反悔 res[0].dataValues 因为dataValues不能格式化时间
        return res.length ? res[0] : false
    }
}

module.exports = new DetailService()