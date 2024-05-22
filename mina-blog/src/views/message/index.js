import {h, reactive, ref, onMounted, onActivated} from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore.js";
// import { MESSAGE_TYPE } from "vue-baberrage";
import { getMessageList, addMessage } from "@/api/message.js";

import Barrage from "@/components/Barrage/index.vue";
import {ElNotification} from "element-plus";
import {getLocalItem, removeLocalItem, setLocalItem} from "@/utils/tool.js";
import {random} from "gsap/gsap-core";

const userStore = useUserStore();
const { getBlogAvatar, getUserInfo } = storeToRefs(userStore);

const loading = ref(false);

const param = reactive({
    current: 1,
    size: 10,
    message: "",
    user_id: getUserInfo.value.id,
    avatar: "",
});
const primaryParam = reactive({...param});

const form = reactive({
    id: 0,
    message: "",
    user_id: 0,
    nick_name: "",
    // type: MESSAGE_TYPE.NORMAL
})
const primaryForm = reactive({...form});
const barrageList = ref([]);
const position = Math.random() * 9;

const pageGetMessageList = async () => {
    let res = await getMessageList(param);
    if (res.code === 0) {
        const { list } = res.result;
        // list.forEach((v) => {
        //   barrageList.value.push({
        //     id: v.id,
        //     user_id: v.user_id,
        //     message: v.message,
        //     type: MESSAGE_TYPE.NORMAL
        //   });
        // })
        barrageList.value = param.current === 1 ? list : barrageList.value.concat(list);
    }

}

const message = async () => {
    if (form.message.trim() === '') {
        ElNotification({
            offset: 60,
            title: "温馨提示",
            message: h("div", { style: "color: #e6c081; font-weight: 600;" }, "留言内容不能为空"),
        });
        return false;
    }

    let res;
    if (!form.id) {
        res = await addMessage(form);
    } else if (getUserInfo.id) {
        form.user_id = getUserInfo.value.id;
        res = await addMessage(form);
    }
    if (res && res.code === 0) {
        ElNotification({
            offset: 60,
            title: "提示",
            message: h("div", { style: "color: #7ec050; font-weight: 600;" }, "留言成功"),
        });
        Object.assign(form, primaryForm);
        removeLocalItem("blog-massage-item");
        setLocalItem("message-refresh", true);
    } else {
        ElNotification({
            offset: 60,
            title: "错误提示",
            message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, res.message),
        });
    }
}

onMounted(async () => {
    removeLocalItem("message-refresh");
    await pageGetMessageList();
});
onActivated(async () => {
    if (getLocalItem("message-refresh")) {
        Object.assign(param, primaryParam);
        await pageGetMessageList();
        removeLocalItem("message-refresh");
    }
});
/**
 * <div class="bullet-wrap">
 *     <div class="bullet-item" v-for="item in barrageList" :key="item.id">
 *     <template v-if="!getUserInfo.id">
 *         <vue-barrage
 *         :lanesCount="10"
 *         :isShow= "true"
 *         :barrage-list="barrageList"
 *         :loop="true"
 *         :position="position"
 *         >
 *         <el-avatar class="left-avatar" :src="getBlogAvatar">{{ item.nick_name }}</el-avatar>
 *     <span class="user-massage">{{ item.message }}</span>
 * </vue-barrage>
 * </template>
 * <template v-else>
 *     <vue-barrage
 *     :lanesCount="4"
 *     :isShow= "true"
 *     :loop="true"
 *     :barrageList = "barrageList"
 *     :position="position"
 *     >
 *     <el-avatar class="left-avatar" :src="getUserInfo.avatar">{{ getUserInfo.nick_name }}</el-avatar>
 * <span class="user-massage">{{ item.message }}</span>
 * </vue-barrage>
 * </template>
 * </div>
 * </div>
 * */
