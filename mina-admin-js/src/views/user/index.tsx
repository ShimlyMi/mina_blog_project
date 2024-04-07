import { onMounted, reactive, ref } from "vue";
import { LoadingConfig, PaginationProps } from "@pureadmin/table";
import { adminUpdateUserInfo, getUserList, updateUserRole } from "@/api/user";
import { message } from "@/utils/message";
import { ElLoading } from "element-plus";
import { imgUpload } from "@/api/site";

export function useColumns() {
  const param = reactive({
    current: 1,
    size: 10,
    nick_name: "",
    role: null
  });
  const primaryParam = reactive({ ...param });
  /** 数据列表 */
  const dataList = ref([]);
  /** 加载 */
  const loading = ref(false);
  /** 表格大小 */
  const tableSize = ref("default");
  /** 列数 */
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "序号",
      type: "index",
      width: 80
    },
    {
      label: "用户名",
      prop: "user_name",
      minWidth: 100
    },
    {
      label: "用户昵称",
      prop: "nick_name",
      minWidth: 120
    },
    {
      label: "头像",
      prop: "avatar",
      minWidth: 100,
      slot: "avatar"
    },
    {
      label: "角色",
      prop: "role",
      minWidth: 100,
      slot: "role"
    },
    {
      label: "创建日期",
      prop: "updatedAt"
    },
    {
      label: "操作",
      fixed: "right",
      width: 80,
      slot: "operation"
    }
  ];
  /** 表格 */
  const tableForm = reactive({
    id: "",
    nick_name: "",
    avatar: "",
    avatarList: []
  });
  const primaryTableForm = reactive({ ...tableForm });
  const tableFormRules = reactive({
    nick_name: [{ required: true, message: "请输入昵称", trigger: "blur" }]
  });
  /** 对话框 */
  const dialogVisible = ref(false);

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 10,
    currentPage: 1,
    pageSizes: [10, 15, 20],
    total: 0,
    align: "center",
    background: true,
    small: true
  });

  /** 加载动画配置 */
  const loadingConfig = reactive<LoadingConfig>({
    text: "正在加载第一页...",
    viewBox: "-10, -10, 50, 50",
    spinner: `
           <path class="path" d="
           M 30 25
           L 28 17
           M 25.61 25.61
           A 15 15, 0, 0, 1, 15 30
           A 15 15, 0, 0, 1, 27.99 7.5
           L 15 15" style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)" />`
  });

  /** 处理搜索函数 */
  function onSearch() {
    getPageUserList();
  }
  /** 处理重置函数 */
  const resetParam = () => {
    Object.assign(param, primaryParam);
    onSearch();
  };
  /** 处理显示条数更改函数 */
  function onSizeChange(val: any) {
    param.size = val;
    getPageUserList();
  }
  /** 处理页数更改函数 */
  async function onCurrentChange(val: any) {
    if (typeof val == "number") {
      loadingConfig.text = `正在加载第${val}页...`;
      param.current = val;
      loading.value = true;
      await getPageUserList();
    }
  }
  /** 分页获取用户列表 */
  async function getPageUserList() {
    const res = await getUserList(param);
    if (res.code === 0) {
      dataList.value = res.result.list;
      pagination.total = res.result.total;
      loading.value = false;
      message("查询成功", { type: "success" });
    } else {
      loading.value = false;
      message("请求失败", { type: "error" });
    }
  }
  /** 角色更改函数 */
  async function roleChange(user: any) {
    const { id, role } = user;
    const res = await updateUserRole(id, role);
    if (res.code == 0) {
      message("修改用户角色成功", { type: "success" });
      await getPageUserList();
    }
  }
  /** 修改用户 */
  const editUser = (row: any) => {
    Object.assign(tableForm, row);
    if (row.avatar) {
      tableForm.avatarList = [
        {
          id: 1,
          url: row.avatar
        }
      ];
    }
    dialogVisible.value = true;
  };
  /** 重置表格 */
  const resetForm = (formEl: any) => {
    if (!formEl) return;
    formEl.resetFields();
  };
  /** 关闭对话框 */
  function closeDialog() {
    Object.assign(tableForm, primaryTableForm);
    dialogVisible.value = false;
  }
  /** 表格提交 */
  async function submitForm(formEl) {
    if (!formEl) return;
    await formEl.validate(async valid => {
      if (valid) {
        // 先上传图片
        if (tableForm.avatarList.length) {
          if (!tableForm.avatarList[0].id) {
            const uploadLoading = ElLoading.service({
              fullscreen: true,
              text: "图片正在上传中"
            });
            const res = await imgUpload(tableForm.avatarList[0]);
            if (res.code == 0) {
              const { url } = res.result;
              tableForm.avatar = url;
            }
            uploadLoading.close();
          } else {
            tableForm.avatar = tableForm.avatarList[0].url;
          }
        } else {
          tableForm.avatar = "";
        }

        /** 修改用户 */
        const { id, nick_name, avatar } = tableForm;
        const res = await adminUpdateUserInfo({ id, nick_name, avatar });
        if (res.code == 0) {
          message("修改成功", { type: "success" });
          dialogVisible.value = false;
          resetForm(formEl);
          Object.assign(tableForm, primaryTableForm);
          await getPageUserList();
        } else {
          message(res.message, { type: "error" });
        }
      }
    });
  }
  onMounted(() => {
    getPageUserList();
  });

  return {
    param,
    primaryParam,
    columns,
    tableForm,
    primaryTableForm,
    tableSize,
    tableFormRules,
    dataList,
    dialogVisible,
    loading,
    loadingConfig,
    pagination,
    resetParam,
    onSizeChange,
    onCurrentChange,
    roleChange,
    closeDialog,
    editUser,
    submitForm,
    onSearch
  };
}
