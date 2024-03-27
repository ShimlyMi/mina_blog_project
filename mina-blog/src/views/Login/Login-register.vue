<script setup>
import { ref, h, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {getUserInfoById, reqLogin, reqRegister} from '@/api/user.js';
import { ElNotification } from "element-plus";
import { useUserStore } from "@/stores/user-store.js";
import {getLocalItem, removeLocalItem, setLocalItem} from "@/utils/tool.js";
import {decrypt, encrypt} from "@/utils/encipher.js";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

/** 注册时验证 用户名 */
const usernameV = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入用户账号"));
  } else if (value.length > 16 || value.length < 4) {
    return callback(new Error("用户账号长度应该在5-16之间"));
  }
  callback();
};
/** 注册时验证 密码 */
const REGEXP_PWD =
    /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/;
const password1V = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入账号密码"));
  } else if (!REGEXP_PWD.test(value)) {
    return callback(new Error("密码格式应为6-18位数字、字母、符号的任意两种组合"));
  }
  callback();
};
const password2V = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入二次确认密码"));
  } else if (value != registerForm.password1) {
    return callback(new Error("两次密码不一致"));
  }
  callback();
};
/** 注册表 */
const registerFormRef = ref();
const registerForm = reactive({
  user_name: "", // 用户名
  password1: "", // 密码
  password2: "", // 确认密码
  nick_name: "", // 昵称
});
const primaryRegisterForm = reactive({...registerForm})
/** 注册表校验规则 */
const registerRules = {
  user_name: [{ required: true, validator: usernameV, trigger: "blur" }],
  password1: [{ required: true, validator: password1V, trigger: "blur" }],
  password2: [{ required: true, validator: password2V, trigger: "blur" }],
};


/** 登录表 */
const loginFormRef = ref();
const loginForm = ref({
  user_name: "",
  password: ""
});
const primaryLoginForm = reactive({...loginForm});
/** 记住密码 */
const isRemember = ref(false);

/** 定义登录表单验证规则 */
const loginRules = {
  user_name: [{ required: true, message: "请输入用户账号", trigger: 'blur' }],
  password: [{ required: true, min:8, max: 16, message: "密码长度应在8-16位英文、数字或符号任意两种组合", trigger: 'blur' }],
};

/** 用户注册 */
const userRegister = async () => {
  await registerFormRef.value.validate(async (valid) => {
    if (valid) {
      const register = {
        user_name: registerForm.user_name,
        password: registerForm.password1,
        nick_name: registerForm.nick_name
      };
      const res = await reqRegister(register);
      if (res && res.code == 0) {
        ElNotification({
          offset: 60,
          title: "提示",
          message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message)
        });
        await userLogin("register");
      } else {
        ElNotification({
          offset: 60,
          title: "错误提示",
          message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message)
        });
      }
    }
  });
};

/** 用户登录 */
const userLogin = async (type) => {
  // 如果是用户注册以后进行登录的 参数需要正好一下
  if (type == "register") {
    const loginForm = {
      user_name: registerForm.user_name,
      password: registerForm.password1
    };
    const res = await reqLogin(loginForm);
    if (res && res.code == 0) {
      // 保存token
      await userStore.setToken(res.result.token);
      // 记住密码
      setLocalItem("loginForm", encrypt(loginForm));
      ElNotification({
        offset: 60,
        title: "提示",
        message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, "自动登录成功")
      });
      // 获取并保存当前用户信息
      const userRes = await getUserInfoById(res.result.id);
      if (userRes.code == 0) {
        // await userStore.setUserInfo(userRes.result)
        console.log("userRes", userRes)
        Object.assign(registerForm, primaryRegisterForm);
        if (getLocalItem("blogLastRouter")) {
          await router.push(getLocalItem("blogLastRouter"));
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
    }
  } else {
    await loginFormRef.value.validate(async (valid) => {
      if (valid) {
        console.log(true);
        let res = await reqLogin(loginForm);
        const token = res.result.token;
        console.log("登录处理函数",res)
        if (res && res.code == 0) {
          // 保存token
          userStore.setToken(token);
          ElNotification({
            offset: 60,
            title: "您好，欢迎",
            message: h("div", { style: "color: #ffb6c1; font-weight: 600; font-size: 14px;" },"登录成功")
          });
          if (isRemember.value) {
            // 记住密码
            setLocalItem("loginForm", encrypt(loginForm));
          } else {
            removeLocalItem("loginForm");
          }
          // 保存并获取当前用户信息
          let userRes = await getUserInfoById(res.result.id);
          console.log("userRes",userRes)
          if (userRes.code == 0) {
            await userStore.setUserInfo(userRes.data);
            Object.assign(loginForm, primaryLoginForm);
            if (getLocalItem("blogLastRouter")) {
              await router.push(getLocalItem("blogLastRouter"));
            } else {
              router.go(-1);
            }
          } else {
            ElNotification({
              offset: 60,
              title: "温馨提示",
              message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, userRes.message ),
            })
          }
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
    });
  }
};

const goTo = (path) => {
  router.push(path)
};

// 提交表单
const submit = () => {
  if (route.name == "Login") {
    userLogin();
  } else {
    userRegister();
  }
};

watch(
    () => route.name,
    (newV) => {
      if (newV == "Login") {
        loginFormRef.value && loginFormRef.value.resetFields();
        // 判断用户是否被记住了
        let form = decrypt(getLocalItem("loginForm"));
        if (form) {
          isRemember.value = true;
          Object.assign(loginForm, JSON.parse(form));
        }
      } else {
        registerForm.valid && registerFormRef.value.resetFields();
      }
    },
    {
      immediate: true
    }
);

</script>

<template>
  <div class="layout">
    <div class="mi-container">
      <div class="mi-container__login">
        <div class="top">
          <div class="title">{{ route.name == "Login" ? "LOGIN" : "REGISTER" }}</div>
        </div>
        <div class="login">
          <div v-if="route.name == 'Login'" class="to-register">
            <span class="to_printer">还没有账号?<el-icon><Right /></el-icon></span>
            <span @click="goTo('/register')" class="to_pointer">点击注册账号</span>
          </div>
          <div v-if="route.name == 'Register'" class="to-register">
            <span class="to_printer">已有账号?<el-icon><Right /></el-icon></span>
            <span @click="goTo('/login')" class="to_pointer">点击立即登录</span>
          </div>
          <!-- 登录表 -->
          <el-form
              v-if="route.name == 'Login'"
              ref="loginFormRef"
              :model="loginForm"
              :rules="loginRules"
              class="loginForm">
            <el-form-item prop="user_name">
              <el-input v-model="loginForm.user_name" autocomplete="off" clearable placeholder="Username">
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password" @keyup.enter="submit">
              <el-input v-model="loginForm.password" autocomplete="off" placeholder="Password" clearable show-password type="password">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="remember-me">
              <div class="flex justify-between items-center w-[100%]">
                <el-checkbox v-model="isRemember">记住我</el-checkbox>
                <span></span>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="signIn">
                <el-button class="btn" @click="submit">立即登录</el-button>
                <el-button class="btn" @click="goTo('/home')">回到首页</el-button>
              </div>
            </el-form-item>
          </el-form>
          <!-- 注册表 -->
          <el-form
              v-else
              ref="registerFormRef"
              :model="registerForm"
              :rules="registerRules"
              class="loginForm">
            <el-form-item prop="user_name">
              <el-input v-model="registerForm.user_name" autocomplete="off" clearable placeholder="请输入账号名称">
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="registerForm.password1" autocomplete="off" placeholder="请输入密码" clearable show-password type="password">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="registerForm.password2" autocomplete="off" placeholder="请输入确认密码" clearable show-password type="password">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="nick_name">
              <el-input v-model="registerForm.nick_name" autocomplete="off" placeholder="请输入确认昵称" clearable show-password type="password">
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="signIn">
                <el-button class="btn" @click="submit">立即注册</el-button>
                <el-button class="btn" @click="goTo('/home')">回到首页</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>


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
