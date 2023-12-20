const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { decryptToken } = require("../controller/auth.controller")
const { tokenExpiredError, invalidToken, hasNotAdminPermission } = require("../constant/err.type")

const auth = async(ctx, next) => {
    /** 将 authorization 从 headers里面 去解构出来 */
    const { authorization = '' } = ctx.request.header;
    /** 拿到 token 并去掉 token前面的 “Bearer ” */
    const token = authorization.replace("Bearer ", "");
    // console.log(token);

    try {
        /** user 包含了 payload 的信息(id,user_name,is_admin) */
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user;
        return ctx.state.user
        console.log("token-user",user)
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }
    await next();
};

/** 管理员权限 */
const hadAdminPermission = async (ctx, next) => {
    const { role } = ctx.state.user;
    if (!role) {
        console.error("没有管理员权限", ctx.state.user);
        return ctx.app.emit('error', hasNotAdminPermission, ctx);
    }
    await next();
}


module.exports = {
    auth,
    hadAdminPermission
}
