## 一、 初始化项目

### 1.  创建项目

```
pnpm init vue@latest
```
### 2. 安装依赖
(1) 安装 sass
```
pnpm install -D sass
```
Sass 官网：https://www.sass.hk/docs/

(2) 安装需要用到的前端框架
```
我用的是自己 最近知道的一个框架 是 阿里巴巴 的 Ant design vue

pnpm install --save ant-design-vue@next
```
Ant design vue 的官网：https://2x.antdv.com/docs/vue/getting-started-cn

(3) 编写 bem 模式

创建 bem saas 文件 `src/bem.scss`
```scss
// 定义变量
$namespace: 'yz' !default; // 命名 xm开头
$block-sel: "-" !default; // selector 选择器
$elem-sel: "__" !default; // element 元素
$mod-sel: "--" !default; // modify  修饰

@mixin bfc {
  min-height: 100vh;
}

// 混入 block
@mixin b($block) {// 接收参数
  // 定义变量 例如 <div class="yz-block">
  $B:#{$namespace + $block-sel + $block};
  // 初始化
  .#{$B} {
    @content; // 占位符
  }
}

// element
@mixin e($el) {
  $selector: &;
  // 跳出嵌套
  @at-root {
    #{$selector + $elem-sel + $el} {
      @content;
    }
  }
}

// modify
@mixin m($m) {
  $selector: &;
  // 跳出嵌套
  @at-root {
    #{$selector + $mod-sel + $m} {
      @content;
    }
  }
}
```

## 二、 设计登录注册界面
### 1. 布局思路
```
(1). 左右布局
    可以用 display: flex; 实现 左右布局
(2). 切换
    默认 左边是 提示语 右边是 form表单
    点击 立即注册 左边和右边 要切换 并且 路由也会跟着相对应的转换到注册去
    点击 立即登录 右边和左边 要切换 并且 路由也会跟着相对应的转换到登录去
```
### 2. 默认 登录界面
```vue
<template>
<!-- 最外边的根据 bem 的模式 来命名 -->
  <div class="yz-login">
    <div class="yz-login__main">
<!--   动态类名 根据 登录或注册 isLogin = true|false 来判断 是否添加相对应的样式   -->
<!--   'yz-login--container', 'container-login' 默认类名 默认整体样式   -->
      <div :class="['yz-login--container', 'container-login', { 'is-txl is-z200': isLogin }]">
        <!-- 登录表 默认在右边 -->
        <!-- 在 form 上面 根据 路由的名字是 登录还是注册 来判断是登录表还是注册表 -->
        <a-form
            v-if="route.name == 'login'" 
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
          <a-form-item
              name="user_name">
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
            <!--  -->
            <a-button :disabled="disabled" type="primary" html-type="submit" class="formBtn login-register-form-button" @click="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
      <!-- 左边面板 默认 -->
      <div :class="['yz-login--switch', { 'is-login': isLogin }]">
        <div class="yz-login--content">
          <!-- 标题 根据 路由 的名字 是否为 登录或注册 进行动态更换 -->
          <h1>{{ route.name == 'login' ? "欢迎回来！" : "您好，欢迎！" }}</h1>
          <!-- 段落 的判断 同上 -->
          <p>
            {{
            route.name == 'login'
            ? "如果您还没有账号，请点击下方立即注册按钮进行账号注册"
            : "如果您已经注册过账号，请点击下方立即登录按钮进行登录"
            }}
          </p>
          <div class="yz-login--btn" >
            <!-- 根据路由名字来显示对应的按钮，并且点击后到对应的界面 默认显示注册按钮，因为默认右边是登录界面 -->
            <a-button v-if="route.name == 'login'" class="formBtn" @click="goTo('/register')">立即注册</a-button>
            <a-button v-if="route.name == 'register'" class="formBtn" @click="goTo('/login')">立即登录</a-button>
            <!-- 默认显示的，点击回到首页 -->
            <a-button class="formBtn" @click="goTo('/home')">返回首页</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```
### 3. 注册界面
```vue
<template>
  <div class="yz-login">
    <div class="yz-login__main">
      <div :class="['yz-login--container', 'container-login', { 'is-txl is-z200': isLogin }]">
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
            <a-button :disabled="disabled" type="primary" html-type="submit" class="formBtn login-register-form-button" @click="submit">注册</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
```

### 4. 样式
```scss
/** 最外层的样式 */
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
  
  /** 默认界面的样式 */
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
/** 用于切换 的样式 */
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
/** 按钮样式 */
.formBtn {
  margin-top: 30px; /* 按钮顶部与输入框的距离 */
  width: 150px;
  height: 30px;
  color: white; /* 按钮字体颜色 */
  border: 0; /* 删除按钮边框 */
  border-radius: 20px; /* 按钮圆角边 */
  background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%); /* 按钮颜色 */ /* 按钮颜色 */
}

/** Ant design vue 的样式 */
#components-form-demo-normal-login .login-register-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-register-form-forgot {
  float: right;
}

.login-register-form-button {
  width: 100%;
}
```
### 5. 初始化 pinia
在 `stores/index.ts` 下 编写
```typescript
/** 因为 在创建项目的时候已经选择了 pinia 所以我这边不用自己在安装了
 * 如果创建项目的时候没有选 就要自己手动安装一下了
 *  pnpm install pinia
 * */
import {defineStore} from "pinia";
import { Names } from './store-name'

// 用户模块

export const userStore = defineStore(Names.USER, {
    state: () => {
        return {
            userInfo: {}, // 获取当前登录人信息
            token: "",
            infoFlag: false,
            tokenFlag: false,
        };
    },
    // 类似 computed 修饰修饰一些值
    getters: {
        // 获取当前登陆人信息
        getUserInfo():any {
            // @ts-ignore
            return this.userInfo;
        },
        // 获取 token
        getToken():any {
            return this.token;
        },
    },
    // 类似 methods 可以做同步 异步的操作 可以 提交 state
    actions: {
        // 设置用户信息
        setUserInfo(userInfo :any):any {
            this.infoFlag = true;
            this.userInfo = userInfo;
        },
        // 设置token
        setToken(token :any):any {
            this.infoFlag = true;
            this.token = token;
        }
    }
})
```
创建 `stores/stroes-name.ts`
```typescript
// 命名文件
// 用 枚举 方法 
export const enum Names {
    USER = 'user'
}
```
### 6. 简单 二次 封装 axios
创建 `src/config/request.js`
```javascript
import axios from "axios";
import { notification } from 'ant-design-vue';


// 创建一个实例
const http = axios.create({
    timeout: 10000, // 请求超时时间
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    baseURL: import.meta.env.VITE_APP_BASE_URL
});

// 添加请求拦截器
http.interceptors.request.use(
    config => {
        return config;
    }
)

// 响应拦截器
http.interceptors.response.use(
    (response) => {
        const { code,message,result } = response.data;
        if (code === 0) {
            return result;
        }
        notification.error({
            message: '错误提示',
            description: message
        });
        return Promise.reject(message);

    },
    (error) => {
        let message = '';
        let title = '';
        const { status } = error.response;
        switch (status) {
            case 404:
                title = '请求错误'
                message = '页面丢失啦';
                break;
            case 405:
                title = '请求错误';
                message = '您提交的方式不对，请重新提交';
                break;
            case 500:
                title = '系统错误';
                message = '请尝试刷新页面,或重新操作';
                break;
            case 502:
                title = '网络错误';
                message = '您的网络开小差了';
                break;
        }
        notification.warning({
            message: title,
            description: message
        });
        return Promise.reject(message);

    }
)

export default http;
```
创建 `.env.delelopment` 文件
```dotenv
# 端口号是后端的端口号
VITE_APP_BASE_URL='http://127.0.0.1:8888'
```
### 7. 编写 API
创建 `src/api/user.js`
```javascript
import http from "@/config/request";
import { userStore } from "@/stores";

/* 登录 */
export const reqLogin = (data) => {
    return new Promise((resolve,reject) => {
        http.post('/api/users/login',data).then((res) => {
            resolve(res);
        })
    })
}

/* 注册接口 */
export const reqRegister = (data) => {
    return new Promise((resolve,reject) => {
        http.post('/api/users/register',data).then((res) => {
            resolve(res);
        })
    })
}
```
### 8. 操作
```typescript
/** 首先引入 路由 */
import { useRoute, useRouter } from "vue-router";
/** 引入 Ant design vue 自带的 icon */
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
/** 引入API 接口函数 */
import { reqRegister,reqLogin} from '@/api/user';
/** 引入 要用到的 pinia 状态管理库 */
import { userStore } from "@/stores";

/** 定义变量 */
const route = useRoute();
const router = useRouter();
const userStroe = userStore();
const isLogin = ref(true);

/** 操作函数 */

/** 按钮根据路由跳转 登录或注册页面 */
const goTo = (path:string) => {
    router.push(path);
    isLogin.value = !isLogin.value;
};

```