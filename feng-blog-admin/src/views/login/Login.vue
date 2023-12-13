<template>
  <div class="yz-login">
    <div class="yz-login__main">
      <div :class="['yz-user--container', 'container-login', { 'is-txl is-z200': isLogin }]">
        <a-form
            v-if="route.name == 'user'"
            :model="loginForm"
            name="normal_login"
            ref="loginFormRef"
            class="login-register--form"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
            :rules="loginRules"
            layout="horizontal">
          <a-form-item>
            <h1 class="loginTitle">LOGIN</h1>
          </a-form-item>
          <a-form-item ref="user_name" name="user_name">
            <a-input v-model:value="loginForm.user_name" size="large" placeholder="Username" autocomplete="false" >
              <template #prefix>
                <UserOutlined class="site-form-item-icon"/>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
              name="password">
            <a-input-password v-model:value="loginForm.password" size="large" placeholder="Password" autocomplete="false">
              <template #prefix>
                <LockOutlined class="site-form-item-icon"/>
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="loginForm.remember">记住密码</a-checkbox>
            </a-form-item>
            <a class="login-register-form-forgot" href="">忘记密码？</a>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" class="formBtn login-register-form-button" @click="submit">登录</a-button>
          </a-form-item>
        </a-form>

        <!--  注册表  -->
        <a-form
            v-else
            :model="registerForm"
            layout="horizontal" >
          <a-form-item>
            <h1 class="loginTitle">Register</h1>
          </a-form-item>
          <a-form-item
              name="user_name">
            <a-input v-model:value="registerForm.user_name"  placeholder="输入用户名" autocomplete="false" >
              <template #prefix>
                <UserOutlined class="site-form-item-icon"/>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
              name="password">
            <a-input-password v-model:value="registerForm.password"  placeholder="输入密码" autocomplete="false">
              <template #prefix>
                <LockOutlined class="site-form-item-icon"/>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item
              name="password2">
            <a-input-password v-model:value="registerForm.check_password" placeholder="再次确认密码" autocomplete="off">
              <template #prefix>
                <LockOutlined class="site-form-item-icon"/>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="nocl_name">
            <a-input v-model:value="registerForm.nick_name"  placeholder="请输入昵称" autocomplete="off">
              <template #prefix>
                <UserOutlined class="site-form-item-icon"/>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="formBtn login-register-form-button" @click="submit">注册</a-button>
          </a-form-item>
        </a-form>

      </div>

      <!-- 登陆面板 -->
      <div :class="['yz-user--switch', { 'is-login': isLogin }]">
        <div class="yz-login--content">
          <h1>{{ route.name == 'user' ? "欢迎回来！" : "您好，欢迎！" }}</h1>
          <p>
            {{
              route.name == 'user'
                  ? "如果您还没有账号，请点击下方立即注册按钮进行账号注册"
                  : "如果您已经注册过账号，请点击下方立即登录按钮进行登录"
            }}
          </p>
          <div class="yz-login--btn" >
            <a-button v-if="route.name == 'user'" class="formBtn" @click="goTo('/register')">立即注册</a-button>
            <a-button v-if="route.name == 'register'" class="formBtn" @click="goTo('/user')">立即登录</a-button>
            <a-button class="formBtn" @click="goTo('/home')">返回首页</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, computed, UnwrapRef,toRaw} from 'vue';
import { useRoute, useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type {RuleObject} from "ant-design-vue/es/form";
import type {ValidateErrorEntity} from "ant-design-vue/es/form/interface";

/** 引入API 接口函数 */
import { reqRegister,reqLogin} from '@/api/user';
import { userStore } from "@/stores";
/** 本地数据加密文件 */
import { __encrypt, _decrypt } from "@/utils/encryption"


const route = useRoute();
const router = useRouter();
const userStroe = userStore();

const isLogin = ref(true);

const registerFormRef = ref();

/** 定义登录表单数据类型 */
interface loginFormState {
  user_name: string;
  password: string;
  remember: boolean;
};
/** 登录表单 */
const loginFormRef = ref();
const loginForm: UnwrapRef<loginFormState> = reactive({
  user_name: '',
  password: '',
  remember: true,
});
const primaryLoginForm = reactive({...loginForm});

/** 定义注册表单数据类型 */
interface registerFormState {
  user_name: string;
  password: string;
  check_password: string;
  nick_name: string;
};
/** 注册表单 */
const registerForm : UnwrapRef<registerFormState> = reactive({
  user_name: '',
  password: '',
  check_password: '',
  nick_name:'',
});
const primaryRegisterForm = reactive({...registerForm});


/** 验证用户名 */
let checkUsername = async (rule: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject("请输入用户账号");
  } else if (value.length > 16 || value.length < 5) {
    return Promise.reject("用户账户长度在5-16位之间");
  } return Promise.resolve();
};

/** 验证输入的密码 */
const REGEXP_PWD = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/;
/** 第一次输入密码 */
let validatePwd = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject("请输入密码");
  } else if (registerForm.check_password !== '') {
    await loginFormRef.value.validateFields("check_password")
  } else if (!REGEXP_PWD.test(value)) {
    return Promise.reject("密码格式应为8-18位英文、数字或字母任意两种组合")
  }
  return Promise.resolve();
}

/** 第二次输入密码 */
let validatePwd2 = (rule: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject("请输入二次确认密码");
  } else if (value !== registerForm.password) {
    return Promise.reject("两次密码不一致，请重新输入");
  }
  return Promise.resolve();
}

/** 登录接单验证规则 */
const loginRules = {
  user_name: [{ required: true, message: '用户名不得为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不得为空', trigger: 'blur' }]
};
/** 注册表单验证郭泽 */
const registerRules = {
  user_name: [{ required: true, validator: checkUsername, message: '用户名不得为空', trigger: 'blur' },],
  password: [{ required: true, validator: validatePwd, message: '密码不得为空', trigger: 'blur' }],
  check_password: [{ required: true, validator: validatePwd2, message: '再次输入确认密码', trigger: 'blur' }],
};
const handleFinish = (values: loginFormState) => {
  console.log(values, loginForm);
};
const handleFinishFailed = (errors: ValidateErrorEntity<loginFormState>) => {
  console.log(errors);
};
/** 注册接口 发送注册请求 */
const userRegister = () => {

}


/** 登录接口 */
const userLogin  = async () => {

};


// const disabled = computed(() => {
//   return !(loginForm.user_name && loginForm.password);
// });

/** 按钮根据路由跳转 登录或注册页面 */
const goTo = (path:string) => {
  router.push(path);
  isLogin.value = !isLogin.value;
};

/** 登录注册按钮 */
const submit = () => {
  if (route.name == 'user;') {
    userLogin();
  } else {
    registerFormRef.value
        .validate()
        .then(() => {
          console.log('values', registerForm, toRaw(registerForm));
        })
        .catch((error: ValidateErrorEntity<registerFormState>) => {
          console.log('error', error);
        });
  }
};


</script>

<style lang="scss" scoped>
@include b(login) {
  @include bfc;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/images/bgimg.jpg"); /* 背景图片 */
  background-size: cover;
  background-repeat: no-repeat; /* 背景图片不重复 */
  padding: 20px;
  @include e(main) {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    height: 500px;
    min-height: 500px;
    padding: 25px;
    // box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }
  @include m(container) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    // left: calc(100% - 400px);
    padding: 25px;
    background-color: #fff;
    transition: all 1.25s;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);

    .loginTitle {
      text-align: center;
    }
  }
  @include m(switch) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: calc(100% - 500px);
    height: 100%;
    width: 50%;
    // padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    // box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
    color: #a0a5a8;
  }
  @include m(content) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 100%;
    padding: 50px 55px;
    transition: 1.25s;

    h1 {
      font-size: 26px;
      font-weight: 700;
      line-height: 3;
      color: #fff;
    }

    p {
      font-size: 14px;
      letter-spacing: 0.25px;
      text-align: center;
      line-height: 1.6;
    }
  }
  @include m(btn) {
    display: flex;
    .formBtn:first-child {
      margin-right: 5px;
    }
  }

}

.container-register {
  z-index: 0;
  left: calc(100% - 500px);
  opacity: 0;
}

.container-login {
  z-index: 0;
  left: 0;
}

.is-txl {
  left: calc(100% - 500px);
  transition: 1.25s;
  transform-origin: right;
}

.is-z200 {
  // z-index: 200;
  transition: 1.25s;
}

.is-login {
  left: 0;
}

.formBtn {
  margin-top: 30px; /* 按钮顶部与输入框的距离 */
  width: 150px;
  height: 30px;
  color: white; /* 按钮字体颜色 */
  border: 0; /* 删除按钮边框 */
  border-radius: 20px; /* 按钮圆角边 */
  background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%); /* 按钮颜色 */
}

#components-form-demo-normal-login .login-register-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-register-form-forgot {
  float: right;
}

.login-register-form-button {
  width: 100%;
}
</style>
