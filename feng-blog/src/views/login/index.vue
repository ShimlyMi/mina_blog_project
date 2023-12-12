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
  <div class="mi-userform">
    <div class="mi-userform__container right-panel-active">
      <div class="mi-userform__containe--form container-login">
        <!-- 登陆表 -->
        <el-form :model="loginForm" class="login__form">
          <el-form-item>
            <h1 class="form__title">LOGIN</h1>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.username" placeholder="Username" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" placeholder="Password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-form-item>
              <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
            </el-form-item>
            <a class="">忘记密码</a>
          </el-form-item>
          <el-form-item>
            <el-button>立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="mi-userform__containe--form container-register">
      <!-- 登陆表 -->
      <el-form :model="registerForm" class="register__form">
        <el-form-item>
          <h1 class="form__title">LOGIN</h1>
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.username" placeholder="Username" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.password" placeholder="Password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.check_password" placeholder="Password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="registerForm.nick_name" placeholder="Nickname" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
      <!-- 登陆面板 -->
      <div class="container__overlay">
        <div class="overlay">
          <div :class="['overlay__panel', ]">
            <h1>{{ $route.name == 'login' ? "欢迎回来！" : "您好，欢迎！" }}</h1>
            <p>{{
                $route.name == 'login'
                    ? "如果您还没有账号，请点击下方立即注册按钮进行账号注册"
                    : "如果您已经注册过账号，请点击下方立即登录按钮进行登录"
              }}</p>
            <div class="yz-login--btn" >
              <a-button v-if="route.name == 'login'" >立即注册</a-button>
              <a-button v-if="route.name == 'register'">立即登录</a-button>
              <a-button class="formBtn" @click="goTo('/home')">返回首页</a-button>
            </div>
          </div>
      </div>

  </div>
</template>

<style scoped lang="scss">
@include b(userform) {
  @include bfc;
  display: grid;
  align-items: center;
  place-items: center;
  background-image: url("@/assets/images/bgimg.jpg"); /* 背景图片 */
  /* 决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。 */
  /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat; /* 背景图片不重复 */
  @include e(container) {
    background-color: var(--vt-c-white);
    border-radius: var(--button-radius);
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: var(--max-height);
    max-width: var(--max-width);
    overflow: hidden;
    position: relative;
    width: 100%;
    @include m(form) {
      height: 100%;
      position: absolute;
      top: 0;
      transition: all 0.6s ease-in-out;
    }
    .right-panel-active {
      .container-login {
        transform: translate(100%);
      }
      .container-register {
        animation: show 0.6s;
        opacity: 1;
        transform: translate(100%);
        z-index: 3;
      }
    }
  }
}

.container-login {
  right: 0;
  width: 50%;
  z-index: 2;
}
.container-register {
  right: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}
</style>
