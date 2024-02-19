<script setup>
import {bg, singIn, logo} from '../login/utils/static'
import {ref, reactive} from "vue";
import {useRouter} from "vue-router";
import {reqRegister} from "@/api/user";
import {ElMessage} from "element-plus";

const router = useRouter()
const loading = ref(false)

const ruleFormRef = ref()
const ruleForm = reactive({
  user_name: "",
  password1: "", // 密码
  password2: "", // 确认密码
  nick_name: "" // 昵称
})
const REGEXP_PWD =
    /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/;

/** 注册校验 */
const registerRules = reactive({
  user_name: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名"));
        } else if (value.length < 4 || value.length > 16) {
          callback(new Error("用户名称程度应该在5-16之间"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  password1: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error("密码格式应为6-18位数字、字母、符号的任意两种组合"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  password2: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (ruleForm.password1 != ruleForm.password2) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
})

const onRegister = async () => {
  loading.value = true
  await ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(true)
      // 注册用户
      const registerObj = {
        user_name: ruleForm.user_name,
        password: ruleForm.password1,
        nick_name: ruleForm.nick_name
      }
      let res = await reqRegister(registerObj)
      if (res.code == 0) {
        const {user_name} = res.result
        ElMessage({
          type: 'success',
          message: '注册成功,请牢记密码哦~',
        })
        await router.push({path: "/login", query: {user_name}})
      } else {
        loading.value = false
      }
    } else {
      loading.value = false
      console.log(false)
    }

  })
}

const goLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div class="mi-login">
    <img :src="bg" class="wave">
    <div class="mi-login__container">
      <div class="img">
        <img :src="singIn">
      </div>
      <div class="login-box">
        <div class="login-form">
          <div class="title">
            <img :src="logo" class="logo">
            <h2 class="outline-none">米娜的小屋后台</h2>
          </div>
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="registerRules">
            <el-form-item prop="user_name">
              <el-input v-model="ruleForm.user_name" clearable placeholder="账号">
                <template #prefix>
                  <el-icon>
                    <UserFilled/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password1" clearable placeholder="密码" show-password>
                <template #prefix>
                  <el-icon>
                    <Lock/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password2" clearable placeholder="确认密码" show-password>
                <template #prefix>
                  <el-icon>
                    <Lock/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="nick_name">
              <el-input v-model="ruleForm.nick_name" clearable placeholder="昵称">
                <template #prefix>
                  <el-icon>
                    <UserFilled/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-button class="loginBtn" size="default" type="primary" @click="onRegister()">立即注册</el-button>
            <el-button class="loginBtn" size="default" type="primary" @click="goLogin()">返回登录</el-button>
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


.line {
  cursor: pointer;
  text-decoration: underline;
}

.loginBtn {
  width: 40%;
  border-radius: 20px;
  margin-top: 20px;
}
</style>

