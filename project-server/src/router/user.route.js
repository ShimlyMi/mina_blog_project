const Router = require('koa-router')

// 导入 UserController 对象
const { userValidator, verifyUser, crpytPassword, verifyLogin } = require("../middleware/user.middleware")
const { auth, hadAdminPermission } = require("../middleware/auth.middleware")
const { register, login, uploadAvatar } = require("../controller/user.controller")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post("/register", userValidator, verifyUser, crpytPassword, register)

// 登录接口
router.post("/login", userValidator,verifyLogin, login);

// 修改密码接口
router.patch("/", auth, (ctx,next) => {
   ctx.body = "修改密码成功"
})

// 上传头像图片
router.post("/upload", auth, uploadAvatar)

module.exports = router;
