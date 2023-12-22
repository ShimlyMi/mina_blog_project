const { getOneUserInfo } = require("../service/user.service")

// 加密文件
const bcrypt = require("bcryptjs")
    // 引入 错误类型文件
const {
    userFormatError,
    userAlreadyExited,
    userRegisterError,
    userDoesNotExist,
    userLoginError,
    invalidPassword,
} = require("../constant/err.type")
const {auth} = require("./auth.middleware");

// 用户验证器
const userValidator = async(ctx, next) => {
    console.log("vvvv")
    const { user_name, password } = ctx.request.body;
    // console.log(user_name, password)
    // console.log(ctx)
    /* 判断错误 合法性 */
    if (!user_name || !password) {
        console.error("用户名或密码为空", ctx.request.body)
        ctx.app.emit('error', userFormatError, ctx);
        return
    }
    await next()
}

const verifyUser = async(ctx, next) => {
    console.log("ccc")
    const { user_name } = ctx.request.body;
    // 因为 getUserInfo 是异步请求，所以有两种方式可以
    /* 第一种：直接加 await */
    // if (await getUserInfo({ user_name })) {
    //     console.error("用户已经存在", ctx.request.body)
    //     ctx.app.this.$emit('error', userAlreadyExited, ctx);
    //     return
    // }
    /* 第二种 用 try-catch 去判断 用户信息(这种会更好一些) */
    // console.log(user_name);
    try {
        const res = await getOneUserInfo({ user_name });
        if (res) {
            console.log("用户名已存在", ctx.request.body);
            ctx.app.emit('error', userAlreadyExited, ctx);
            return;
        }
    } catch (err) {
        console.error("获取用户信息错误", err);
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }
    await next();
}

// 密码加密处理
const crpytPassword = async(ctx, next) => {
    console.log("pppp")
    // 获取密码
    const { password } = ctx.request.body;
    // 加盐
    const salt = bcrypt.genSaltSync(10);
    // 哈希加密
    const hash = bcrypt.hashSync(password, salt);
    // 让 用户的密码 加密 为 哈希值 存入数据库
    ctx.request.body.password = hash;

    await next();
}

// 验证登录
const verifyLogin = async(ctx, next) => {
    // 1. 判断用户是否存在
    const { user_name, password } = ctx.request.body;
    try {
        const res = await getOneUserInfo({ user_name })
        if (!res) {
            console.log("当前用户不存在", ctx.request.body);
            ctx.app.emit('error', userDoesNotExist, ctx);
            return;
        }
        // 2. 判断密码是否匹配
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx);
            return;
        }
    } catch (err) {
        console.error("用户登录失败", err);
        return ctx.app.emit('error', userLoginError, ctx);
    }

    await next();
}

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,

}
