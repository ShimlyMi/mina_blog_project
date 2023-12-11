<script>
import { ref } from "vue";
import { UserFilled, Lock, Avatar } from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

export default {
  name: 'feng-login',
  components: {
    UserFilled,
    Lock,
    Avatar,
  },
  data () {
    return {
      isLogin: true,
      loginForm: {
        username: '',
        password: "",
        remember: false,
      },
      registerForm: {
        username: '',
        password: '',
        check_password: '',
        nick_name: '',
      },
    }
  },
  methods: {

  }

}
</script>

<template>
  <div class="mi-login">
    <div class="mi-login__main">
      <div :class="['mi-login-container', 'container-login',{ 'is-txl is-z200': isLogin }] ">
        <!-- 登录表  -->
        <el-form
            :model="loginForm"
            v-if="$route.name == 'feng-login'"
            name=""
            class="login-register--form"
        >
          <el-form-item>
            <h1 class="loginTitle">LOGIN</h1>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.username" placeholder="Username" clearable autocomplete="false">
              <template #prefix>
                <el-icon><UserFilled /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" placeholder="Username" show-password autocomplete="false">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-form-item>
              <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
            </el-form-item>
            <a class="login-register-form-forgo" href="" >忘记密码</a>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="formBtn login-register-form-button">登录</el-button>
          </el-form-item>
        </el-form>
        <!-- 登录表  -->
        <el-form
            :model="registerForm"
            v-else
            name=""
            class="login-register--form"
        >
          <el-form-item>
            <h1 class="loginTitle">Register</h1>
          </el-form-item>
          <el-form-item>
            <el-input v-model="registerForm.username" placeholder="Username" clearable autocomplete="false">
              <template #prefix>
                <el-icon><UserFilled /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="registerForm.password" placeholder="Password" show-password autocomplete="false">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="registerForm.check_password" placeholder="Password" show-password autocomplete="false">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="registerForm.nick_name" placeholder="NickName" show-password autocomplete="false">
              <template #prefix>
                <el-icon><Avatar /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="formBtn login-register-form-button">登录</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 登陆面板 -->
      <div :class="['mi-login--switch', { 'is-login': isLogin }]">
        <div class="mi-login--content">
          <h1>{{ $route.name == 'feng-login' ? "欢迎回来！" : "您好，欢迎！" }}</h1>
          <p>
            {{
              $route.name == 'feng-login'
                  ? "如果您还没有账号，请点击下方立即注册按钮进行账号注册"
                  : "如果您已经注册过账号，请点击下方立即登录按钮进行登录"
            }}
          </p>
          <div class="mi-login--btn" >
            <el-button v-if="$route.name == 'feng-login'" class="formBtn" >立即注册</el-button>
            <el-button v-if="$route.name == 'feng-register'" class="formBtn" >立即登录</el-button>
            <el-button class="formBtn" >返回首页</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  @include m(btn) {
    display: flex;
    .formBtn:first-child {
      margin-right: 5px;
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
  background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%); /* 按钮颜色 */
}
.login-register-form {
  max-width: 300px;
}

.login-register-form-forgot {
  float: right;
}

.login-register-form-button {
  width: 100%;
}
</style>
