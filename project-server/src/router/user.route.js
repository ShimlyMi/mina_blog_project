const Router = require('koa-router')

// 导入 UserController 对象
const { userValidator, verifyUser, crpytPassword, verifyLogin } = require("../middleware/user.middleware")
const { auth, hadAdminPermission } = require("../middleware/auth.middleware")
const {register, login, getUserInfo, getUserInfoById} = require("../controller/user.controller")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post("/register", userValidator, verifyUser, crpytPassword, register)

// 登录接口
router.post("/login", userValidator,verifyLogin, login);

// 修改密码接口
router.patch("/", auth, (ctx,next) => {
   ctx.body = "修改密码成功"
})

// 获取信息
router.get('/info', auth, getUserInfo);
// 根据id获取
router.get('/info/:id', getUserInfoById)
module.exports = router;
