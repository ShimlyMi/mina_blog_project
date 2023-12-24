<script setup>
import { ref, h } from "vue";
import { useRouter } from "vue-router";
import { getUserInfo, reqLogin } from '@/api/user.js'
import { ElNotification, ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user/user.js";

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
      console.log("登录处理函数",res)
      if (res && res.code == 0) {
        // 保存token
        await userStore.setToken(res.result.token);
        // ElMessage({
        //   type: 'success',
        //   message: '登录成功'
        // })
          let userRes = await getUserInfo(res.result.id)
          console.log("userRes",userRes)
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


<template>
  <div class="userForm">
    <div class="userForm--container right-panel-active">
      <div class="userForm--container__form container-login">
        <!-- 登录表 -->
        <el-form
        :model="loginForm"
        class="loginForm"
        :rules="loginRules"
        ref="loginFormRef"
        >
          <el-form-item>
            <h1 class="form__title">LOGIN</h1>
          </el-form-item>
          <el-form-item prop="user_name">
            <el-input v-model="loginForm.user_name" placeholder="Username" autocomplete="off" clearable>
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" @keyup.enter="userLogin()">
            <el-input v-model="loginForm.password" placeholder="Password" autocomplete="off" show-password>
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox>记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" @click="userLogin()">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left" >
            <h1 class="title">欢迎回来！</h1>
            <p class="tips">如果您还没有账号，请点击下方立即注册按钮进行账号注册</p>
            <div class="signUp">
              <el-button class="formBtn" @click="goTo('/register')" >立即注册</el-button>
              <el-button class="formBtn">返回首页</el-button>
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
      .container-login {
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
      .loginForm {
        margin: 10px auto;
      }
    }
    .container__overlay {
      height: 100%;
      left: 50%;
      overflow: hidden;
      position: absolute;
      top: 0;
      // animation: show 0.6s;
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

.container-login {
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
