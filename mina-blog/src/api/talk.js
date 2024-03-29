import http from "@/config/request.js";

/** 获取说说列表 */
export const getTalkList = (param) => {
    return new Promise((resolve) => {
        http.post("/api/talk/getTalkList", param).then((res) => {
            resolve(res);
        });
    });
};

/** 点赞说说 */
export const talkLike = (id) => {
    return new Promise((resolve) => {
        http.post("/api/talk/like/" + id, {}).then((res) => {
            resolve(res);
        });
    });
};

/** 取消点赞说说 */
export const cancelTalkLike = (id) => {
    return new Promise((resolve) => {
        http.post("/api/talk/cancelLike/" + id, {}).then((res) => {
            resolve(res);
        });
    });
};
