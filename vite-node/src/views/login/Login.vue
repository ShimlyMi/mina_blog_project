<template>
    <div class="login-box">
        <div class="main-box">
            <div
                    :class="['container', 'container-login', { 'is-txl is-z200': isLogin }]"
            >
                <el-form
                        :model="ruleForm"
                        status-icon
                        class="formContent"
                        label-position="left"
                >
                    <el-form-item>
                        <h1 class="loginTitle">{{ isLogin ? "LOGIN" : "REGISTER" }}</h1>
                    </el-form-item>
                    <el-form-item label="username:">
                        <el-input
                                v-model="ruleForm.username"
                                placeholder="username"
                                size="large"
                        />
                    </el-form-item>
                    <el-form-item label="password:">
                        <el-input
                                v-model="ruleForm.password"
                                type="password"
                                placeholder="password"
                                size="large"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button class="registerBtn">{{
                            isLogin ? "登录" : "注册"
                            }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 登陆面板 -->
            <div :class="['switch', { 'is-login': isLogin }]">
                <div class="switch-container">
                    <h1>{{ isLogin ? "欢迎回来！" : "您好，欢迎！" }}</h1>
                    <p>
                        {{
                        isLogin
                            ? "如果您还没有账号，请点击下方立即注册按钮进行账号注册"
                            : "如果您已经注册过账号，请点击下方立即登录按钮进行登录"
                        }}
                    </p>
                    <el-button class="formBtn signup" @click="isLogin = !isLogin">{{
                        isLogin ? "立即注册" : "立即登录"
                        }}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            isLogin: true,
            ruleForm: {
                username: "",
                password: "",
            },
        }
    }
}
</script>

<style lang="less" scoped>
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
}
.el-form-item {
    margin-top: 15px;
    &:last-child {
        margin-top: 20px;
        margin-bottom: 0;
    }
    &:first-child {
        margin-top: 0;
    }
    .el-button {
        width: 150px;
        height: 30px;
        color: white; /* 按钮字体颜色 */
        border: 0; /* 删除按钮边框 */
        border-radius: 20px; /* 按钮圆角边 */

        background-image: linear-gradient(
            to right,
            #b8cbb8 0%,
            #b8cbb8 0%,
            #b465da 0%,
            #cf6cc9 33%,
            #ee609c 66%,
            #ee609c 100%
        ); /* 按钮颜色 */
    }
    /deep/.el-form-item__content {
        justify-content: center;
    }
}
.login-box {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("@/assets/images/bgimg.jpg"); /* 背景图片 */
    background-size: cover;
    background-repeat: no-repeat; /* 背景图片不重复 */
    padding: 20px;
}

.main-box {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    height: 500px;
    min-height: 500px;
    padding: 25px;
    // box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 50%;
        height: 100%;
        top: 0;
        // left: calc(100% - 400px);
        padding: 25px;
        background-color: #fff;
        transition: all 1.25s;
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);

        .formContent {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            color: #000;

            .loginTitle {
                padding: 15px 0;
            }
        }
    }
}

.container-register {
    z-index: 0;
    left: calc(100% - 500px);
    opacity: 0;
}

.container-login {
    z-index: 0;
    left: 0;
}

.is-txl {
    left: calc(100% - 500px);
    transition: 1.25s;
    transform-origin: right;
}

.is-z200 {
    // z-index: 200;
    transition: 1.25s;
}

.switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: calc(100% - 500px);
    height: 100%;
    width: 50%;
    // padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    // box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
    color: #a0a5a8;

    .switch-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        width: 100%;
        padding: 50px 55px;
        transition: 1.25s;

        h1 {
            font-size: 26px;
            font-weight: 700;
            line-height: 3;
            color: #fff;
        }

        p {
            font-size: 14px;
            letter-spacing: 0.25px;
            text-align: center;
            line-height: 1.6;
        }
    }
}
.is-login {
    left: 0;
}
.formBtn {
    margin-top: 50px;
    margin-top: 30px; /* 按钮顶部与输入框的距离 */
    width: 150px;
    height: 30px;
    color: white; /* 按钮字体颜色 */
    border: 0; /* 删除按钮边框 */
    border-radius: 20px; /* 按钮圆角边 */
    background-image: linear-gradient(
        to right,
        #b8cbb8 0%,
        #b8cbb8 0%,
        #b465da 0%,
        #cf6cc9 33%,
        #ee609c 66%,
        #ee609c 100%
    ); /* 按钮颜色 */
}

@media (max-width: 1200px) {
    .main {
        transform: scale(0.7);
    }
}

@media (max-width: 991px) {
    .main {
        max-width: 400px;
        transform: scale(0.6);
    }
}

@media (max-width: 800px) {
    .main {
        transform: scale(0.5);
    }
}

@media (max-width: 600px) {
    .main {
        transform: scale(0.4);
    }
}
</style>