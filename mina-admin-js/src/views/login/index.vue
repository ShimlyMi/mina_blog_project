<script setup>
import {ref} from 'vue'
import {bg, singUp, logo} from './utils/static'
import {loginRules} from "@/utils/rules";

const ruleform = ref({
    user_name: "",
    password: "",
})


</script>

<template>
  <div class="mi-login">
    <img :src="bg" class="wave">
    <div class="mi-login__container">
      <div class="img">
        <img :src="singUp">
      </div>
      <div class="login-box">
        <div class="login-form">
          <div class="title">
            <img :src="logo" class="logo">
            <h2 class="outline-none">米娜的小屋后台</h2>
          </div>
          <el-form :model="ruleform" :rules="loginRules">
            <el-form-item prop="user_name">
              <el-input v-model="ruleform.user_name" clearable placeholder="账号">
                <template #prefix>
                  <el-icon>
                    <UserFilled/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="ruleform.password" clearable placeholder="密码">
                <template #prefix>
                  <el-icon>
                    <Lock/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <div class="register">
              <el-checkbox>记住我</el-checkbox>
              <div>没有账号？<span class="line">去注册</span></div>
            </div>
            <el-form-item>
              <el-button class="loginBtn" size="default" type="primary">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/styles/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

:deep(.el-input__wrapper) {
  border-radius: 20px;
  height: 2.5rem;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 50px;
  margin-bottom: 20px;
}

.register {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8em;
  color: #676767;

  :deep(.el-checkbox.el-checkbox--large .el-checkbox__label) {
    font-size: 0.8em;
    color: #676767;
  }
}

.line {
  cursor: pointer;
  text-decoration: underline;
}

.loginBtn {
  width: 100%;
  border-radius: 20px;
  margin-top: 20px;
}
</style>
