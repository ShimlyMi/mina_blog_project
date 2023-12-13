<script setup>
import { ref, reactive } from "vue";
import { UserFilled, Lock, Avatar } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const isLogin = ref(true);


const loginFormRef =  ref();
const loginForm = reactive({
  username: "",
  password: "",
  remember: "",
})

const registerFormRef = ref();
const registerForm = reactive({
  username: "",
  password: "",
  check_password: "",
  nick_name: "",
})

/** 按钮根据路由跳转 登录或注册页面 */
const goTo = (path) => {
  router.push(path);
  isLogin.value = !isLogin.value
};

</script>
<script>
import { UserFilled,Lock, Avatar } from "@element-plus/icons-vue";

export default {
  components: {
    // Method 3: or we can use `unplugin-auto-import` to auto import icon component and register manally. not recommended)
    // 方法 3：或者我们还可以使用 `unplugin-auto-import` 来自动导入组件，再手动注册组件。（不推荐）
    UserFilled, Lock, Avatar,
  },
}
</script>
<template>
  <div class="mi-userform">
    <div :class="['mi-userform__container', { 'right-panel-active': isLogin }]">
      <div class="container__form container-login">
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
            <el-checkbox v-model="loginForm.remember" label="记住我" name="rememberMe"></el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button class="btn">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="container__form container-register">
        <!-- 登陆表 -->
        <el-form :model="registerForm" class="register__form" >
          <el-form-item>
            <h1 class="form__title">REGISTER</h1>
          </el-form-item>
          <el-form-item label="创建用户:">
            <el-input v-model="registerForm.username" placeholder="Username" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="设置密码:">
            <el-input v-model="registerForm.password" placeholder="Password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码:">
            <el-input v-model="registerForm.check_password" placeholder="Password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="创建昵称:">
            <el-input v-model="registerForm.nick_name" placeholder="Nickname" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 登陆面板 -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <h1 class="title">欢迎回来！</h1>
            <p class="tips">如果您还没有账号，请点击下方立即注册按钮进行账号注册</p>
            <div class="signUp" >
              <el-button class="formBtn" @click="goTo('/register')">立即注册</el-button>
              <el-button class="formBtn">返回首页</el-button>
            </div>
          </div>
          <div class="overlay__panel overlay--right">
            <h1 class="title">您好，欢迎！</h1>
            <p class="tips">如果您已经注册过账号，请点击下方立即登录按钮进行登录</p>
            <div class="signUp" >
              <el-button class="formBtn" @click="goTo('/login')">立即登录</el-button>
              <el-button class="formBtn">返回首页</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@include b(userform) {
  @include bfc;
  align-items: center;
  background-color: var(--white);
  background: url("../../assets/images/bgimg.jpg");
  /* 决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。 */
  /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
  @include e(container) {
    //background-color: var(--white);
    border-radius: var(--button-radius);
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: var(--max-height);
    max-width: var(--max-width);
    overflow: hidden;
    position: relative;
    width: 100%;

    &.right-panel-active {
      .container-login {
        animation: show 0.6s;
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
      }
      .container-register {
        transform: translateX(100%);
      }
      .container__overlay {
        transform: translateX(-100%);
      }
      .overlay {
        transform: translateX(0%);
      }
      .overlay--left {
        opacity: 1;
        transform: translateX(-20%);
      }
      .overlay--right {
        opacity: 0;
        transform: translateX(120%);
      }
    }
  }
}
.form__title {
  width: 100%;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.container__form {
  display: flex;
  position: absolute;
  top: 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  transition: all 0.6s ease-in-out;
  background-color: var(--white);
}

.container-login {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
.container-register {
  left: 0;
  width: 50%;
  z-index: 2;
}
.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  animation: show 0.6s;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  color: var(--white);
  z-index: 100;
}
.overlay {
  height: 100%;
  left: 20%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}
.overlay__panel {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  text-align: center;
  top: 0;
  height: 100%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .tips {
    margin-bottom: 30px;
  }
}
.overlay--left {
  opacity: 0;
  transform: translate(-120%);
}
.overlay--right {
  transform: translateX(-20%);
}
.btn {
  width: 100%;
  height: 30px;
  color: white; /* 按钮字体颜色 */
  border: 0; /* 删除按钮边框 */
  border-radius: 20px; /* 按钮圆角边 */
  background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%); /* 按钮颜色 */
}
.formBtn {
  width: 150px;
  height: 30px;
  color: white; /* 按钮字体颜色 */
  border: 0; /* 删除按钮边框 */
  border-radius: 20px; /* 按钮圆角边 */
  background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%); /* 按钮颜色 */
}
.end {
  float: right;
}
@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>
