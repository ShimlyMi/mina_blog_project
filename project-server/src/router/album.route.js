const Router = require('koa-router');

const {addAlbum, getAlbumList, deleteAlbum, getAllAlbum} = require("../controller/album.controller")
const {auth, needAdminPermission} = require("../middleware/auth.middleware")
const router = new Router({prefix: "/album"})

/** 新增相册 */
router.post("/add", auth, needAdminPermission, addAlbum)

/** 删除相册 */
router.delete("/delete", auth, needAdminPermission, deleteAlbum)

/** 分页获取相册列表 */
router.post("/", getAlbumList)

/** 获取所有相册列表 */
router.get('/getAllAlbumList', getAllAlbum)


module.exports = router
