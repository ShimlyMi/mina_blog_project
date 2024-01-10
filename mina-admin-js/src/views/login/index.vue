<script setup>
import {ref, onMounted, onBeforeUnmount, watch} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {bg, singUp, logo} from './utils/static'
import {loginRules} from "@/utils/rules";
import {reqLogin} from "@/api/user";
import {storageLocal} from "@pureadmin/utils";
import {useUserStoreHook} from "@/stores";
import {ElMessage} from "element-plus";

const router = useRouter()

const ruleFormRef = ref()
const ruleForm = ref({
    user_name: "",
    password: "",
})
const loading = ref(false)
const isRememberMe = ref(false)
const redirect = ref(undefined)

const onLogin = async () => {
  loading.value = true
  await ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(true)
      if (isRememberMe.value) {
        storageLocal().setItem("loginInfo", ruleForm.value)
      } else {
        storageLocal().removeItem("loginInfo")
      }
      const res = await reqLogin(ruleForm.value)
      // console.log(ruleForm.value)
      if (res && res.code == 0) {
        useUserStoreHook().loginByUsername(ruleForm.value).then(res => {
          if (res.code == 0) {
            router.replace({path: redirect.value || '/'})
            ElMessage({
              type: 'success',
              message: '登录成功'
            })
          }
        })
      } else {
        loading.value = false
      }
    } else {
      loading.value = false
      console.log(false);
    }
  })
}

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({code}) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}

watch(
  () => {

  },
)
onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
  const route = useRoute();
  if (route.query.user_name) {
    ruleForm.value.user_name = route.query.user_name + "";
    isRememberMe.value = true;
  } else {
    if (storageLocal().getItem("loginInfo")) {
      isRememberMe.value = true;
      Object.assign(ruleForm, storageLocal().getItem("loginInfo"));
    }
  }
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});

const goRegister = () => {
  router.push("/register");
};

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
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="loginRules">
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
              <el-input v-model="ruleForm.password" clearable placeholder="密码" show-password>
                <template #prefix>
                  <el-icon>
                    <Lock/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <div class="register">
              <el-checkbox v-model="isRememberMe">记住我</el-checkbox>
              <div>没有账号？<span class="line" @click="goRegister">去注册</span></div>
            </div>
            <el-button class="loginBtn" size="default" type="primary" @click="onLogin()">立即登录</el-button>
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
  padding: 0 10px;

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
