const path = require("path");
// 导入 JWT
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require("../config/config.default")

const { createUser, getOneUserInfo, updateById } = require("../service/user.service")
const { decryptToken }  = require("../service/auth.service")

const { userRegisterError, unSupportedFileType, fileUploadError } = require("../constant/err.type")



class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body);
        // const { user_name, password } = ctx.request.body
        // 2. 操作数据库
        console.log(123)
        try {
            const res = await createUser(ctx.request.body);
            // 3. 返回数据
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name,
                }
            };
        } catch (err) {
            console.log(err);
            ctx.app.emit('userRegisterError', userRegisterError, ctx);
        }


    }

    async login(ctx, next) {
        const { user_name } = ctx.request.body;
        // 1. 获取用户信息(在 token 的 payload 中 记录 id, user_name, is_admin)
        // console.log("ctx", ctx.request.body);
        try {
            // 从 返回结果 剔除掉 password ，把剩下的结果 放在 res 中
            const { password, ...res } = await getOneUserInfo({ user_name });
            // console.log("res", res);
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    /* 调用 jwt.sign() 方法生成 JWT 字符串
                     * 第一个参数：用户信息对象
                     * 第二个参数：加密的密钥
                     * 第三个参数：配置对象，配置token有效期
                     * */
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1h' }),
                    user_name: res.user_name,
                    nick_name: res.nick_name,
                    id: res.id,
                    avatar: res.avatar
                }
            }

        } catch (err) {
            console.error("用户登录失败", err);
        }
    }

    /** 修改密码 */
    async changePassword(ctx, next) {
        /** 获取数据 */
        const id = ctx.stale.user.id;
        const password = ctx.request.body.password;

        /** 操作数据库 */
        if (await updateById({ id, password, })) {
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: '',
            }
        } else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: '',
            }
        }
    }

    /** 获取个人信息 */
    async getUserInfo(ctx) {
        try {

            let res = decryptToken()
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = new UserController();
