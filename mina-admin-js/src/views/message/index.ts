import { onMounted, reactive, ref } from "vue";
import { LoadingConfig, PaginationProps } from "@pureadmin/table";
import { message } from "@/utils/message";
import { getMessageList, deleteMessage } from "@/api/message";
import { ElMessageBox } from "element-plus";

export function useColumns() {
  const param = reactive<any>({
    current: 1,
    size: 10,
    time: "",
    message: ""
  });
  const primaryParam = reactive({ ...param });
  const dataList = ref([]);
  const loading = ref(false);
  const tableSize = ref("default");
  const selectList = ref<any>([]);
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "序号",
      type: "index",
      width: 55
    },
    {
      label: "昵称",
      prop: "nick_name"
    },
    {
      label: "头像",
      prop: "avatar",
      slot: "avatar"
    },
    {
      label: "留言内容",
      prop: "message"
    },
    {
      label: "留言日期",
      prop: "createdAt"
    }
  ];

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
    getPageMessageList();
  }
  /** 处理重置函数 */
  const resetParam = () => {
    Object.assign(param, primaryParam);
    onSearch();
  };
  function handleSelectionChange(val) {
    selectList.value = val;
  }
  /** 处理显示条数更改函数 */
  function onSizeChange(val: any) {
    param.size = val;
    getPageMessageList();
  }
  /** 处理页数更改函数 */
  async function onCurrentChange(val: any) {
    if (typeof val == "number") {
      loadingConfig.text = `正在加载第${val}页...`;
      param.current = val;
      loading.value = true;
      await getPageMessageList();
    }
  }
  /** 批量删除留言 */
  function deleteBatch() {
    if (selectList.value.length) {
      ElMessageBox.confirm("确认删除？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(async () => {
        const list = selectList.value.map(se => se.id);
        const res = await deleteMessage({ idList: list });
        if (res.code == 0) {
          message(`批量删除留言成功`, { type: "success" });
          await getPageMessageList();
        } else {
          message(res.message, { type: "error" });
        }
      });
    } else {
      message("请先选择留言", { type: "warning" });
    }
  }
  async function getPageMessageList() {
    const res = await getMessageList(param);
    if (res.code == 0) {
      dataList.value = res.result.list;
      pagination.total = res.result.total;
      loading.value = false;
    } else {
      loading.value = false;
      message("请求失败", { type: "error" });
    }
  }
  onMounted(async () => {
    await getPageMessageList();
  });

  return {
    param,
    loading,
    columns,
    dataList,
    tableSize,
    pagination,
    loadingConfig,
    onSearch,
    resetParam,
    onSizeChange,
    onCurrentChange,
    deleteBatch,
    handleSelectionChange
  };
}
