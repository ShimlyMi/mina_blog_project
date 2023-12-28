const {addAlbum, getAlbumList, getAllAlbumList, deleteAlbum} = require("../service/album.service")
const {albumAlreadyExisted, getAlbumListError, deleteAlbumError} = require("../constant/err.type")

class AlbumController {
    /** 新增相册 */
    async addAlbum(ctx) {
        try {
            const {album_name} = ctx.request.body
            let res = await addAlbum(ctx.request.body)
            // console.log(res)
            ctx.body = {
                code: 0,
                message: "添加相册成功",
                result: res
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", albumAlreadyExisted, ctx)

        }
    }

    /** 根据id删除相册
     *
     * */
    async deleteAlbum(ctx) {
        try {
            const {id} = ctx.params
            let res = await deleteAlbum(id)
            ctx.body = {
                code: 0,
                message: "删除相册成功",
                result: ""
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", deleteAlbumError, ctx)
        }
    }

    /** 分页获取相册列表 */
    async getAlbumList(ctx) {
        try {
            // 解析 pageNum pageSize
            const {pageNum = 1, pageSize = 10} = ctx.request.query;
            let res = await getAlbumList(pageNum, pageSize)
            ctx.body = {
                code: 0,
                message: "分页查询相册列表成功",
                result: res
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", getAlbumListError, ctx)
        }
    }

    /** 获取所有相册列表 */
    async getAllAlbum(ctx) {
        try {
            const res = await getAllAlbumList()
            ctx.body = {
                code: 0,
                message: "获取所有相册列表成功",
                result: res
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit("error", getAlbumListError, ctx)
        }
    }
}

module.exports = new AlbumController()
