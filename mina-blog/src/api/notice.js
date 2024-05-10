import http from "@/config/request.js";

/** 获取消息推送 */
export const getNoticeList = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/notify/getNotifyList", data).then((res) => {
            resolve(res);
        });
    });
};

/** 阅读消息列表 */
export const updateNotice = (id) => {
    return new Promise((resolve, reject) => {
        http.put("/api/notify/update/" + id, {}).then((res) => {
            resolve(res);
        });
    });
};

/** 删除消息推送 */
export const deleteNotice = (id) => {
    return new Promise((resolve, reject) => {
        http.put("/api/notify/delete/" + id, {}).then((res) => {
            resolve(res);
        });
    });
}
