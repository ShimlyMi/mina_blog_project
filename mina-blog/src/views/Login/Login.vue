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
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="loginForm">
          <el-form-item prop="user_name">
            <el-input v-model="loginForm.user_name" autocomplete="off" clearable placeholder="Username">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" @keyup.enter="userLogin()">
            <el-input v-model="loginForm.password" autocomplete="off" placeholder="Password" show-password type="password">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="signIn">
              <el-button class="btn" @click="userLogin">立即登录</el-button>
              <el-button class="btn" @click="goTo('/home')">回到首页</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { useRouter } from "vue-router";
import { getUserInfo, reqLogin } from '@/api/user.js'
import { ElNotification } from "element-plus";
import { useUserStore } from "@/stores/user-store.js";

const router = useRouter()
// const route = useRoute()
const userStore = useUserStore()

const loginFormRef = ref();
// const primaryLoginForm = reactive({...loginForm})
const loginForm = ref({
  user_name: "",
  password: "",
  remember: false
})


/** 定义登录表单验证规则 */
const loginRules = {
  user_name: [{ required: true, message: "请输入用户账号", trigger: 'blur' }],
  password: [{ required: true, min:8, max: 16, message: "密码长度应在8-16位英文、数字或符号任意两种组合", trigger: 'blur' }],
}



/** 用户登录 */
const userLogin = async () => {
  const { user_name, password } = loginForm.value
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(true);
      let res = await reqLogin( { user_name, password })
      // console.log("登录处理函数",res)
      if (res && res.code == 0) {
        // 保存token
        await userStore.setToken(res.result.token);
        // ElMessage({
        //   type: 'success',
        //   message: '登录成功'
        // })
        let userRes = await getUserInfo(res.result.id)
        // console.log("userRes",userRes)
        if (userRes.code == 0) {
          await userStore.setUserInfo(userRes.result)
          ElNotification({
            offset: 60,
            title: "您好，欢迎",
            message: h("div", { style: "color: #ffb6c1; font-weight: 600; font-size: 14px;" },"欢迎" + userRes.result.nick_name + "来到米娜的小屋")
          })
        } else {
          ElNotification({
            offset: 60,
            title: "温馨提示",
            message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, userRes.message ),
          })
        }
        await router.replace({ path: '/home' })
      } else {
        ElNotification({
          offset: 60,
          title: "温馨提示",
          message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message ),
        })
      }
    } else {
      console.log(false);
    }
  })

}

const goTo = (path) => {
  router.push(path)
}



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
      transform: translateY(70%);
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
  height: 40px;
}
</style>>
