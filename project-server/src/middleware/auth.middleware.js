const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { decryptToken } = require("../controller/auth.controller")
const { tokenExpiredError, invalidToken, hasNotAdminPermission, hasSuperAminPermission } = require("../constant/err.type")

const auth = async(ctx, next) => {
    /** 将 authorization 从 headers里面 去解构出来 */
    const { authorization = '' } = ctx.request.header;
    /** 拿到 token 并去掉 token前面的 “Bearer ” */
    const token = authorization.replace("Bearer ", "");
    // console.log("token",ctx);

    try {
        /** user 包含了 payload 的信息(id,user_name,is_admin) */
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user;
        // console.log("token-user",user)
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
    if (Number(role) !== 1) {
        console.error("普通用户仅限查看哦~", ctx.state.user);
        return ctx.app.emit('error', hasNotAdminPermission, ctx);
    }
    await next();
}
/** 超级管理员 */
const isSuperAmin = async (ctx, next) => {
    const { user_name } = ctx.state.user
    if (user_name === 'admin') {
        console.error("管理员信息可通过配置修改")
        return ctx.app.emit('error', hasSuperAminPermission, ctx)
    }
}

module.exports = {
    auth,
    hadAdminPermission
}
