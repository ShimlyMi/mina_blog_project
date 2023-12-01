const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError,invalidToken, userRegisterError} = require("../constant/err.type")
const auth = async (ctx,next) => {
    /** 将 authorization 从 headers里面 去解构出来 */
    const { authorization } = ctx.request.headers;

    // if (!authorization) {
    //     return ctx.app.emit('error',error,ctx)
    // }

    /** 拿到 token */
    const token = authorization.replace("Bearer ","");
    console.log(token);

    try {
        /** user 包含le payload 的信息(id,user_name,is_admin) */
        const user = jwt.verify(token,JWT_SECRET);
        ctx.state.user = user;
    } catch (err) {
        switch (err.name) {
            case "TokenExpiredError":
                console.error("token 已过期",err)
                return ctx.app.emit("tokenExpiredError",tokenExpiredError,ctx)
            case "JsonWebTokenError":
                console.error("token无效",err)
                return ctx.app.emit("JsonWebTokenError",invalidToken,ctx)
        }
    }
    await next();
};


module.exports = {
    auth,
}
