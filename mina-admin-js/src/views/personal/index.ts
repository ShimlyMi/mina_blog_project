import { reactive, ref, onMounted } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { storageSession } from "@pureadmin/utils";
import { deepClone } from "@/utils/utils";
import { getUserInfoById, updateUserInfo } from "@/api/user";
import { userInfoType } from "@/store/modules/types";
import { ElLoading } from "element-plus";
import { imgUpload } from "@/api/site";
import { message } from "@/utils/message";

interface MyInfoForm {
  nick_name: string;
  avatar: string;
  avatarList: any;
}

interface PasswordForm {
  password: string;
  password1: string;
  password2: string;
}

export function useSite() {
  /** 个人信息表单 */
  const myInfoForm = reactive<MyInfoForm>({
    nick_name: "",
    avatar: "",
    avatarList: []
  });
  const primaryMyInfoFrom = reactive({});
  /** 密码表单 */
  const passwordForm = reactive<PasswordForm>({
    password: "",
    password1: "",
    password2: ""
  });
  /** 验证密码 */
  const password1V = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("请输入新密码"));
    } else if (value.length < 6 || value.length > 18) {
      callback(new Error("密码长度应该在6-18位"));
    } else if (value == passwordForm.password) {
      callback(new Error("新密码与旧密码应该不一致！"));
    } else {
      callback();
    }
  };
  const password2V = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value.length < 6 || value.length > 18) {
      callback(new Error("密码长度应该在6-18位"));
    } else if (value != passwordForm.password1) {
      callback(new Error("二次确认面膜与新密码不一致"));
    } else {
      callback();
    }
  };

  /** 个人信息表单校验规则 */
  const myInfoRules = reactive({
    nick_name: { required: true, message: "请输入昵称", trigger: ["blur"] }
  });
  /** 密码表单校验规则 */
  const passwordRules = reactive({
    password: [{ required: true, message: "请输入原密码", trigger: ["blur"] }],
    password1: [{ required: true, validator: password1V, trigger: ["blur"] }],
    password2: [{ required: true, validator: password2V, trigger: ["blur"] }]
  });

  /** 编辑与保存 */
  const isEditMyInfo = ref(false);
  const isEditPassword = ref(false);

  /** 保存按钮 */
  async function save(type, formRef) {
    await formRef.validate(async valid => {
      if (valid) {
        switch (type) {
          case "info":
            await updateMyInfo();
            isEditMyInfo.value = false;
            break;
          case "password":
            isEditPassword.value = false;
            break;
          default:
            break;
        }
      }
    });
  }

  /** 编辑按钮 */
  function edit(type) {
    switch (type) {
      case "info":
        isEditMyInfo.value = true;
        break;
      case "password":
        isEditPassword.value = true;
        break;
      default:
        break;
    }
  }

  /** 取消按钮 */
  function cancel(tyoe, ref) {
    ref.clearValidate();
    switch (tyoe) {
      case "info":
        isEditMyInfo.value = false;
        ref.clearValidate();
        Object.assign(myInfoForm, primaryMyInfoFrom);
        Object.assign(primaryMyInfoFrom, deepClone(myInfoForm));
        break;
      case "password":
        isEditPassword.value = false;
        ref.clearValidate();
        break;
      default:
        break;
    }
  }

  /** 初始化个人信息 */
  async function initMyInfo() {
    const res = await getUserInfoById();
    if (res.code == 0) {
      const { avatar, nick_name } = res.result;
      if (useUserStoreHook()?.getNickName != nick_name) {
        useUserStoreHook()?.SET_NICKNAME(nick_name);
        storageSession().setItem<userInfoType>("blogCurrentUser", {
          nick_name,
          avatar
        });
      }
      if (useUserStoreHook()?.getAvatar != avatar) {
        useUserStoreHook()?.SET_AVATAR(avatar);
        storageSession().setItem<userInfoType>("blogCurrentUser", {
          nick_name,
          avatar
        });
      }
      Object.assign(myInfoForm, res.result);
      if (avatar) {
        myInfoForm.avatarList = [
          { id: 1, name: avatar.split("/").slice(-1), url: avatar }
        ];
      }
      Object.assign(primaryMyInfoFrom, deepClone(myInfoForm));
    }
  }

  /** 修改个人信息 */
  async function updateMyInfo() {
    if (myInfoForm.avatarList.length && !myInfoForm.avatarList[0].id) {
      const uploadLoading = ElLoading.service({
        fullscreen: true,
        text: "图片上传中"
      });
      const imgRes = await imgUpload(myInfoForm.avatarList[0]);
      if (imgRes.code == 0) {
        const { url } = imgRes.result;
        myInfoForm.avatar = url;
      }
      uploadLoading.close();
    }
    if (!myInfoForm.avatarList.length) {
      myInfoForm.avatar = "";
    }
    const res = await updateUserInfo(myInfoForm);
    if (res.code == 0) {
      message("用户修改成功", { type: "success" });
      initMyInfo();
    }
  }

  async function init() {
    await initMyInfo();
  }

  onMounted(() => {
    init();
  });

  return {
    myInfoForm,
    myInfoRules,
    passwordForm,
    passwordRules,
    isEditMyInfo,
    isEditPassword,
    edit,
    cancel,
    save
  };
}
