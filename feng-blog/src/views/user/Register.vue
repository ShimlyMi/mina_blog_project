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
        let res = await reqRegister(registerForm);
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
  <div class="userForm">
    <div class="userForm--container right-panel-active">
      <div class="userForm--container__form container-register">
        <!-- 登录表 -->
        <el-form
        :model="registerForm"
        class="registerForm"
        :rules="registerRules"
        >
          <el-form-item>
            <h1 class="form__title">LOGIN</h1>
          </el-form-item>
          <el-form-item prop="user_name">
            <el-input v-model="registerForm.user_name" placeholder="Username" autocomplete="off" clearable>
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" @keyup.enter="userLogin()">
            <el-input v-model="registerForm.password" placeholder="Password" autocomplete="off" show-password>
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
            <el-button class="btn" @click="userRegister">立即注册</el-button>
          </el-form-item>
        </el-form>

      </div>
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left" >
            <h1 class="title">您好，欢迎！！</h1>
            <p class="tips">如果您已经注册了账号，请点击下方立即登录按钮进行登录</p>
            <div class="signUp">
              <el-button class="formBtn" @click="goTo('/login')" >立即登录</el-button>
              <el-button class="formBtn" @click="goTo('/home')">返回首页</el-button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">

.userForm {
  min-height: 100vh;
  align-items: center;
  /* 决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。 */
  background:  url("../../assets/images/bgimg.jpg") no-repeat fixed center;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
 .userForm--container {
    //background-color: var(--white);
    border-radius: 0.7rem;
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: 500px;
    max-width: 1000px;
    overflow: hidden;
    position: relative;
    width: 100%;

    &.right-panel-active {
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
        transform: translateX(-20%);
      }

    }
    .userForm--container__form {
      display: flex;
      position: absolute;
      top: 0;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      transition: all 0.6s ease-in-out;
      background-color: white;
      .form__title {
        width: 100%;
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
      }
      .registerForm {
        margin: 10px auto;
      }
    }
    .container__overlay {
      height: 100%;
      left: 50%;
      overflow: hidden;
      position: absolute;
      top: 0;
      // animation: show 1s;
      transition: transform 0.6s ease-in-out;
      width: 50%;
      color: var(--white);
      z-index: 100;
      .overlay {
        height: 100%;
        left: 20%;
        position: relative;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
        width: 100%;
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
        // transform: translateX(0);
        transition: transform 0.6s ease-in-out;
        width: 100%;
        .title {
          color: #fff;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .tips {
          color: #fff;
          margin-bottom: 30px;
        }
      }
    }
  }
}
:deep(.el-form-item) {
  margin-bottom: 25px;
}

.container-register {
  left: 0;
  width: 50%;
  z-index: 1;
}


.overlay--left {
  transform: translate(-20%);
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
