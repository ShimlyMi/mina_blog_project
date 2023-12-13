<script setup>
import { ref, reactive, watch, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";

import {getUserInfoById, reqLogin, reqRegister} from "@/api/user.js";
import { useUserStore } from "@/stores/index.js";
import { _encrypt, _decrypt } from "@/utils/encipher.js";
import {_getLocalItem, _setLocalItem, _removeLocalItem, getWelcomeSay} from "@/utils/tool.js";

const route = useRoute();
const router = useRouter();
const isLogin = ref(true);
const isRemember = ref(false);
const userStore = useUserStore()
const usernameV = (rule, value, check) => {
  if (!value) {
    return check(new Error("请输入用户账号"));
  } else if (value.length > 16 || value.length < 5) {
    return check(new Error("用户账号长度应该在5-16之间"));
  }
  check();
};
const REGEXP_PWD = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/;
const passwordV = (rule, value, check) => {
  if (!value) {
    return check(new Error("请输入密码"))
  }else if (!REGEXP_PWD.test(value)) {
    return check(new Error("密码格式应该为8-18位数字、字母、符号的任意两种组合"));
  }
  check();
};

const loginFormRef = ref();
const loginForm = reactive({
  username: "",
  password: "",
});
const primaryLoginForm = reactive({ ...loginForm });

const registerFormRef = ref();
const registerForm = reactive({
  username: "",
  password: "",
  nick_name: "",
});
const primaryRegisterForm = reactive({ ...registerForm });

const loginRules = {
  username: [{ required: true, message: "请输入用户账号", trigger: 'blur' }],
  password: [{ required: true, message: "请输入用户密码", trigger: 'blur' }],
};
const registerRules = {
  username: [{ required: true, validator: usernameV, trigger: 'blur' }],
  password: [{ required: true, validator: passwordV, trigger: 'blur' }],
}

/** 用户注册 */
const userRegister = async () => {
  await registerFormRef.value.validate(async  (valid) => {
    if (valid) {
      const register = {
        user_name: registerForm.username,
        password: registerForm.password,
        nick_name: registerForm.nick_name,
      };
      const res = await reqRegister(register);
      if (res && res.code == 0) {
        ElNotification({
          offset: 60,
          title: '提示',
          message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "注册成功"),
        });
        // 自动登陆
        await userLogin("register");
      } else {
        ElNotification({
          offset: 60,
          title: '提示',
          message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message),
        });
      }
    }
  });
};

const welcome = (id, nick_name) => {
  // 欢迎
  let msg = getWelcomeSay(nick_name);
  if (id == 3) {
    msg = "小婷光临，真是三生有幸";
  }
  ElNotification({
    offset: 60,
    title: "欢迎～",
    message: h("div", { style: "font-weight: 600;" }, msg),
  });
};

/** 用户登录 */
const userLogin = async (type) => {
  if (type == 'register') {
    const loginForm = {
      user_name: registerForm.username,
      password: registerForm.password,
    };
    const res = await reqLogin(loginForm);
    if (res.code == 0) {
      await userStore.setToken("登录成功");
      await router.push("/home");
      console.log(res.result.message)
    } else {
      console.log('error', res.result.message)
    }
  }

}
/*const userLogin = async (type) => {
  // 如果是用户注册以后进行登录的 参数需要整合一下
  if (type == 'register') {
    const loginForm = {
      user_name: registerForm.username,
      password: registerForm.password,
    };
    const res = await reqLogin(loginForm);
    if (res && res.code == 0) {
      await userStore.setToken(res.result.token);
      // 记住密码
      _setLocalItem("loginForm", _encrypt(loginForm));
      ElNotification({
        offset: 60,
        title: "提示",
        message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "自动登录成功"),
      });
      // 获取并保存当前用户信息
      const userRes = await getUserInfoById(res.result.id);
      if (userRes.code == 0) {
        await userStore.setUserInfo(userRes.result);
        Object.assign(registerForm, primaryRegisterForm);
        const { id, nick_name } = userRes.result;
        await welcome(id, nick_name);
        if (_getLocalItem("blogLastRouter")) {
          router.push(_getLocalItem("blogLastRouter"));
        } else {
          router.go(-2);
        }
      } else {
        ElNotification({
          offset: 60,
          title: "错误提示",
          message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message),
        });
      }
    } else {
      ElNotification({
        offset: 60,
        title: "错误提示",
        message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message),
      });
    }
  } else {
    await loginFormRef.value.validate(async (valid) => {
      if (valid) {
        const res = await reqLogin(loginForm);
        const token = res.result.token;
        if (res && res.code == 0) {
          // 保存token
          await userStore.setToken(token);
          ElNotification({
            offset: 60,
            title: "提示",
            message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "登录成功"),
          });
          if (isRemember.value) {
            // 记住密码
            _setLocalItem("loginForm", _encrypt(loginForm));
          } else {
            _removeLocalItem("loginForm");
          }
          // 获取并保存当前用户信息
          const userRes = await getUserInfoById(res.result.id);
          if (userRes.code == 0) {
            await userStore.setUserInfo(userRes.result);
            Object.assign(loginForm, primaryLoginForm);
            const { id, nick_name } = userRes.result;
            await welcome(id, nick_name);
            if (_getLocalItem("blogLastRouter")) {
              router.push(_getLocalItem("blogLastRouter"));
            } else {
              router.go(-1);
            }
          } else {
            ElNotification({
              offset: 60,
              title: "错误提示",
              message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message),
            });
          }
        } else {
          ElNotification({
            offset: 60,
            title: "错误提示",
            message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message),
          });
        }

      }
    });
  }
};*/

/** 按钮根据路由跳转 登录或注册页面 */
const goTo = (path) => {
  router.push(path);
  isLogin.value = !isLogin.value
};

// 提交
// 提交
const submit = () => {
  if (route.name == "Login") {
    userLogin();
  } else {
    userRegister();
  }
};
</script>


<template>
  <div class="mi-userform">
    <div :class="['mi-userform__container', { 'right-panel-active': isLogin }]">
      <div class="container__form container-login" >
        <!-- 登陆表 -->
        <el-form
            :model="loginForm"
            class="login__form"
            v-if="route.name == 'Login'"
            ref="loginFormRef">
          <el-form-item>
            <h1 class="form__title">LOGIN</h1>
          </el-form-item>
          <el-form-item prop="user_name">
            <el-input v-model="loginForm.username" :style="{ width: '100%' }" placeholder="Username" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" :style="{ width: '100%' }" placeholder="Password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="isRemember" label="记住我" name="rememberMe"></el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button class="btn">立即登录</el-button>
          </el-form-item>
        </el-form>
        <!-- 登陆表 -->
        <el-form :model="registerForm" class="register__form" v-else ref="registerFormRef">
          <el-form-item>
            <h1 class="form__title">REGISTER</h1>
          </el-form-item>
          <el-form-item label="创建用户:" prop="user_name">
            <el-input v-model="registerForm.username" placeholder="Username" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="设置密码:" prop="password">
            <el-input v-model="registerForm.password" placeholder="Password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="创建昵称:" prop="nick_name">
            <el-input v-model="registerForm.nick_name" placeholder="Nickname" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" @click="submit">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 登陆面板 -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left" >
            <h1 class="title">{{ route.name == 'Login' ? "欢迎回来！" : "您好，欢迎！" }}</h1>
            <p class="tips">{{
                route.name == 'Login'
                    ? "如果您还没有账号，请点击下方立即注册按钮进行账号注册"
                    : "如果您已经注册过账号，请点击下方立即登录按钮进行登录"
              }}</p>
            <div class="signUp">
              <el-button class="formBtn" @click="goTo('/register')" v-show="route.name == 'Login'">立即注册</el-button>
              <el-button class="formBtn" @click="goTo('/login')" v-show="route.name == 'Register'">立即登录</el-button>
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
  z-index: 1;
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
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 100%;
  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .tips {
    margin-bottom: 30px;
  }
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
