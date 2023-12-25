<template>
  <div class="mi-container">
    <div class="mi-container__login">
      <div class="top">
        <div class="title">LOGIN</div>
      </div>
      <div class="login">
        <div class="to-register">
          <span class="to_printer">还没有账号?<el-icon><Right /></el-icon></span>
          <router-link to="/register">点击注册账号</router-link>
        </div>
        <el-form :model="loginForm" class="loginForm">
          <el-form-item prop="user_name">
            <el-input v-model="loginForm.user_name" clearable placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="Password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <div class="signIn">
              <el-button class="btn">立即登录</el-button>
              <el-button class="btn">回到首页</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
const loginForm = ref({
  user_name: "",
  password: ""
})
export default defineComponent({
  setup() {
    return {
      loginForm,
    }
  }
})
</script>

<style lang="scss" scoped>
@include b(container) {
  @include bfc;
  align-items: center;
  background: url("../../assets/images/tiamkong.jpg") no-repeat fixed center;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
  @include e(login) {
    background-color: rgba(0,0,0,.3);
    max-width: 500px;
    height: 500px;
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    overflow: hidden;
    position: relative;
    width: 100%;
    padding: 20px;
    .title {
      color: #ffc0cb;
      font-weight: 600;
      font-size: 3rem;
      text-align: center;
      transform: translateY(110%);
      transition: transform 0.6s ease-in-out;
    }
    .login {
      display: flex;
      //align-items: center;
      flex-direction: column;
      //justify-content: center;
      height: 100%;
      transform: translateY(20%);
      transition: transform 0.6s ease-in-out;
    }
    .signIn {
      width: 100%;
      text-align: center;
    }
    .btn {
      width: 48%;
      height: 30px;
      color: white; /* 按钮字体颜色 */
      border: 0; /* 删除按钮边框 */
      border-radius: 5px; /* 按钮圆角边 */
      background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%); /* 按钮颜色 */
    }
    .to-register {
      display: flex;
      justify-content: right;
      color: #f8f8ff;
      margin-bottom: 5px;
    }
  }
}
:deep(.el-input) {
  width: 100%;
}
</style>>
