<script lang="ts" name="Register" setup>
// import { useI18n } from "vue-i18n";
import Motion from "../login/utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { useLayout } from "@/layout/hooks/useLayout";
import { bg, avatar, signIn } from "../login/utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, toRaw, onMounted, onBeforeUnmount } from "vue";
// import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
// import globalization from "@/assets/svg/globalization.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
// import Check from "@iconify-icons/ep/check";
import User from "@iconify-icons/ri/user-3-fill";

import { registerUser } from "@/api/user";

const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

// const { t } = useI18n();
const { dataTheme, dataThemeChange } = useDataThemeChange();
dataThemeChange();

// const { title, getDropdownItemStyle, getDropdownItemClass } = useNav();
const { title } = useNav();
// const { locale, translationCh, translationEn } = useTranslationLang();

const ruleForm = reactive({
  user_name: "",
  password1: "",
  password2: "",
  nick_name: ""
});
const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){6,18}$/;

const registerRules = reactive({
  username: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名"));
        } else if (value.length < 4 || value.length > 16) {
          callback(new Error("用户名长度应该在5-16之间"));
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
          callback(
            new Error("密码格式应为6-18位数字、字母、符号的任意两种组合")
          );
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
          callback(new Error("请输入确认密码"));
        } else if (ruleForm.password1 != ruleForm.password2) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});
const register = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const registerObj = {
        user_name: ruleForm.user_name,
        password: ruleForm.password1,
        nick_name: ruleForm.nick_name
      };
      const res = await registerUser(registerObj);
      if (res.code == 0) {
        const { user_name, nick_name } = res.result;
        console.log(res);
        message("注册成功，请牢记账号密码哦~", { type: "success" });
        router.push({ path: "/login", query: { user_name, nick_name } });
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
    register(ruleFormRef.value);
  }
}

const goLogin = () => {
  router.push("/login");
};

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
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
    </div>

    <div class="login-container">
      <div class="img">
        <component :is="toRaw(signIn)" />
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
            :rules="registerRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item prop="user_name">
                <el-input
                  v-model="ruleForm.user_name"
                  placeholder="请输入用户名"
                  :prefix-icon="useRenderIcon(User)"
                  clearable
                />
              </el-form-item>
            </Motion>
            <Motion :delay="150">
              <el-form-item prop="nickname">
                <el-input
                  v-model="ruleForm.nick_name"
                  :prefix-icon="useRenderIcon(User)"
                  clearable
                  placeholder="昵称"
                />
              </el-form-item>
            </Motion>
            <Motion :delay="150">
              <el-form-item prop="password1">
                <el-input
                  v-model="ruleForm.password1"
                  placeholder="请输入密码"
                  :prefix-icon="useRenderIcon(Lock)"
                  clearable
                  show-password
                />
              </el-form-item>
            </Motion>
            <Motion :delay="150">
              <el-form-item prop="password2">
                <el-input
                  v-model="ruleForm.password2"
                  placeholder="再次输入确认密码"
                  :prefix-icon="useRenderIcon(Lock)"
                  clearable
                  show-password
                />
              </el-form-item>
            </Motion>

            <Motion :delay="250" class="register">
              <div>
                已有账号？<span class="line" @click="goLogin">
                  点击此处去登录
                </span>
              </div>
            </Motion>
            <Motion :delay="250">
              <el-button
                :loading="loading"
                class="w-full mt-4"
                size="default"
                type="primary"
                @click="register(ruleFormRef)"
              >
                立即注册
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
  text-align: right;
  font-size: 0.8em;
  color: #676767;
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
