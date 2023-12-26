<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { reqRegister } from '@/api/user.js'
import { ElNotification } from "element-plus";

const router = useRouter()

const registerFormRef = ref()
const registerForm = ref({
  user_name: "",
  password: "",
  nick_name: "",
})
/** 验证用户名 */
const checkUsername = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入用户账号'))
  } else if (value.length > 16 || value.length < 5) {
    return callback(new Error("用户账号长度应该在5-16位英文数字之间"));
  }
  return callback();
}
/** 定义密码验证 */
const REGEXP_PWD = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/;
/** 验证密码 */
const checkPassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  } else if (!REGEXP_PWD.test(value)) {
    return callback(new Error("密码格式应该为8-18位数字、字母、符号的任意两种组合"));
  }
  return callback();
}

/** 定义注册表单验证规则 */
const registerRules = {
  user_name: [{ required: true, validator: checkUsername, trigger: 'blur' }],
  password: [{ required: true, validator: checkPassword, trigger: 'blur' }],
}

/** 用户注册 */
const userRegister = async () => {
  await registerFormRef.value.validate(async (valid) => {
    if (valid) {
      let res = await reqRegister(registerForm.value);
      // console.log(res)
      if (res && res.code === 0) {
        ElNotification({
          offset: 60,
          title: "提示",
          message: "注册成功"
        })
        router.replace({ path: '/login' })
      } else {
        ElNotification({
          offset: 60,
          title: "提示",
          message: res.message
        })
      }
    }
  })
}

const goTo = (path) => {
  router.push(path)
}
</script>
<template>
  <div class="mi-container">
    <div class="mi-container__register">
      <div class="top">
        <div class="title to_printer">REGISTER</div>
      </div>
      <div class="register">
        <div class="to-register">
          <span class="to_printer">已有帐号了?<el-icon><Right /></el-icon></span>
          <router-link to="/login">点击立即登录</router-link>
        </div>
        <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" class="registerForm">
          <el-form-item prop="user_name">
            <el-input v-model="registerForm.user_name" autocomplete="off" clearable placeholder="Username">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" @keyup.enter="userRegister()">
            <el-input v-model="registerForm.password" autocomplete="off" placeholder="Password" show-password type="password">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="registerForm.nick_name" placeholder="Nickname">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="signIn">
              <el-button class="btn" @click="userRegister">立即注册</el-button>
              <el-button class="btn" @click="goTo('/home')">回到首页</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@include b(container) {
  @include bfc;
  align-items: center;
  background: url("../../assets/images/bgimg.jpg") no-repeat fixed center;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
  @include e(register) {
    background-color: rgba(255,255,255,.3);
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
      text-shadow: 0px 3px 4px #f8f8ff;
      transform: translateY(70%);
      transition: transform 0.6s ease-in-out;
    }
    .register {
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
      color: #ffc0cb;
      //color: #f8f8ff;
      margin-bottom: 5px;
      a {
        color: #ffc0cb;
        &:hover {
          color: #f8f8ff;
        }
      }
      span:hover {
        color: #f8f8ff;
      }
    }
  }
}
:deep(.el-input) {
  width: 100%;
  height: 40px;
}
:deep(.el-input__inner) {
  background-color: #fff!important;
}
</style>>
