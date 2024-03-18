const Album = require("../model/photo/album.model")

class AlbumService {
    /**
     * 新增相册
     * @param {*} 相册名称 param 相册描述信息
     * @returns
     * */
    async addAlbum({album_name, album_cover, description}) {
        let res = await Album.create({album_name, album_cover, description})
        return res
    }

    /** 根据 id 删除相册 */
    async deleteAlbum(id) {
        let res = await Album.destroy({where: id})
        return res > 0
    }

    /** 根据 id 或者 相册名称 获取相册信息 */
    async getOneAlbum({id, album_name}) {
        const whereOpt = {}

        id && Object.assign(whereOpt, {id})
        album_name && Object.assign(whereOpt, {album_name})

        let res = await Album.findOne({where: whereOpt})
        console.log(res)
    }

    /** 分页获取相册相册列表 */
    async getAlbumList(pageNum, pageSize) {
        // 2. 获取分页具体数据
        const offset = (pageNum - 1) * pageSize
        // const whereOpt = {}

        // album_name && Object.assign(whereOpt, { album_name })

        let {count, rows} = await Album.findAndCountAll({offset: offset, limit: pageSize * 1})

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }

    /** 获取所有相册 */
    async getAllAlbumList() {
        /** 升序 查找 */
        let res = await Album.findAll({
            order: [["createAt", "DESC"]]
        })
        return res
    }

    /**
     * 编辑相册
     * @param {*} param0 id param1 相册名称 param2 相册描述
     * */
    async updateAlbum({ id, album_name, album_cover, description }) {
        let res = await Album.update(
            { album_name, album_cover, description },
            { where: { id } }
        )
        return res[0] > 0;
    }
}

module.exports = new AlbumService()
