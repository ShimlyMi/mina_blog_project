<template>
<div class="yz-login">
    <div class="yz-login__main">
        <div :class="['yz-login--container', 'container-login', { 'is-txl is-z200': isLogin }]">
            <a-form
                    :model="formState"
                    name="normal_login"
                    class="login-form"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed"
                    layout="horizontal"

            >
                <a-form-item>
                    <h1 class="loginTitle">{{ isLogin ? "LOGIN" : "REGISTER" }}</h1>
                </a-form-item>
                <a-form-item
                        label="Username"
                        name="username"
                        :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                    <a-input v-model:value="formState.username" size="large" >
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item
                        label="Password"
                        name="password"
                        :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                    <a-input-password v-model:value="formState.password" size="large">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item>
                    <a-form-item name="remember" no-style>
                        <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
                    </a-form-item>
                    <a class="login-form-forgot" href="">忘记密码？</a>
                </a-form-item>

                <a-form-item>
                    <a-button :disabled="disabled" type="primary" html-type="submit" class="formBtn login-form-button">
                        {{
                        isLogin ? "登录" : "注册"
                        }}
                    </a-button>
                </a-form-item>
            </a-form>
        </div>

        <!-- 登陆面板 -->
        <div :class="['yz-login--switch', { 'is-login': isLogin }]">
            <div class="yz-login--content">
                <h1>{{ isLogin ? "欢迎回来！" : "您好，欢迎！" }}</h1>
                <p>
                    {{
                    isLogin
                        ? "如果您还没有账号，请点击下方立即注册按钮进行账号注册"
                        : "如果您已经注册过账号，请点击下方立即登录按钮进行登录"
                    }}
                </p>
                <a-button class="formBtn signup" @click="isLogin = !isLogin">{{
                    isLogin ? "立即注册" : "立即登录"
                    }}</a-button>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from "vue-router";


import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';


const isLogin = ref(true)
interface FormState {
    username: string;
    password: string;
    remember: boolean;
}
const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
});
const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.username && formState.password);
});
</script>

<style lang="scss" scoped>
@include b(login) {
  @include bfc;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/images/bgimg.jpg"); /* 背景图片 */
  background-size: cover;
  background-repeat: no-repeat; /* 背景图片不重复 */
  padding: 20px;
  @include e(main) {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    height: 500px;
    min-height: 500px;
    padding: 25px;
    // box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }
  @include m(container) {
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

    .loginTitle {
      text-align: center;
    }
  }
  @include m(switch) {
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
  }
  @include m(content) {
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

.is-login {
  left: 0;
}

.formBtn {
  margin-top: 30px; /* 按钮顶部与输入框的距离 */
  width: 150px;
  height: 30px;
  color: white; /* 按钮字体颜色 */
  border: 0; /* 删除按钮边框 */
  border-radius: 20px; /* 按钮圆角边 */
  background-image: linear-gradient(to right, #b8cbb8 0%,#b8cbb8 0%,#b465da 0%,#cf6cc9 33%,#ee609c 66%, #ee609c 100%); /* 按钮颜色 */
}
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
    float: right;
}
 .login-form-button {
    width: 100%;
}
</style>