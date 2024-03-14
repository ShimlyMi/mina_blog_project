<script lang="ts" name="Login" setup>
import Motion from "./utils/motion";
import { useRouter, useRoute } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { $t, transformI18n } from "@/plugins/i18n";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter } from "@/router/utils";
import { bg, avatar, signUp } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, toRaw, onMounted, onBeforeUnmount } from "vue";

import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import { storageLocal } from "@pureadmin/utils";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";

import Lock from "@iconify-icons/ri/lock-fill";

import User from "@iconify-icons/ri/user-3-fill";

import { getLogin } from "@/api/user";

type RuleFormType = {
  user_name?: string;
  password?: string;
};
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

const { dataTheme, dataThemeChange } = useDataThemeChange();
dataThemeChange();
const { title } = useNav();

const ruleForm = ref<RuleFormType>({
  user_name: "",
  password: ""
});

const isRememberMe = ref(false);

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (isRememberMe.value) {
        storageLocal().setItem("loginInfo", ruleForm.value);
      } else {
        storageLocal().removeItem("loginInfo");
      }
      const res = await getLogin(ruleForm.value);
      // console.log(ruleForm.value);
      if (res.code == 0) {
        useUserStoreHook()
          .loginByUsername(ruleForm.value)
          .then(res => {
            if (res.code == 0) {
              // 获取后端路由
              initRouter().then(() => {
                router.push("/");
                message("登录成功", { type: "success" });
              });
            }
          });
      } else {
        loading.value = false;
      }
    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}

const changeAccount = () => {
  ruleForm.value.password = "";
}

const goRegister = () => {
  router.push("/register");
};

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
  const route = useRoute();
  if (route.query.user_name) {
    ruleForm.value.user_name = route.query.user_name + "";
    isRememberMe.value = true;
  } else {
    if (storageLocal().getItem("loginInfo")) {
      isRememberMe.value = true;
      Object.assign(ruleForm.value, storageLocal().getItem("loginInfo"));
    }
  }
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        inline-prompt
        @change="dataThemeChange"
      />
      <!-- 国际化 -->
    </div>

    <div class="login-container">
      <div class="img">
        <component :is="toRaw(signUp)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <div class="topInfo">
            <avatar class="avatar" />
            <Motion>
              <h2 class="outline-none">{{ title }}</h2>
            </Motion>
          </div>

          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    required: true,
                    message: transformI18n($t('login.usernameReg')),
                    trigger: 'blur'
                  }
                ]"
                prop="user_name"
              >
                <el-input
                  v-model="ruleForm.user_name"
                  placeholder="账号"
                  @clear="changeAccount"
                  :prefix-icon="useRenderIcon(User)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  placeholder="密码"
                  :prefix-icon="useRenderIcon(Lock)"
                  clearable
                  show-password
                />
              </el-form-item>
            </Motion>
            <Motion :delay="250" class="register">
              <el-checkbox v-model="isRememberMe">记住我</el-checkbox>
              <div>
                没有账号？<span class="line" @click="goRegister">去注册</span>
              </div>
            </Motion>
            <Motion :delay="250">
              <el-button
                :loading="loading"
                class="w-full mt-4"
                size="default"
                type="primary"
                @click="onLogin(ruleFormRef)"
              >
                立即登录
              </el-button>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
.register {
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8em;
  color: #676767;

  :deep(.el-checkbox.el-checkbox--large .el-checkbox__label) {
    font-size: 0.8em;
    color: #676767;
  }
}
.line {
  cursor: pointer;
  text-decoration: underline;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
