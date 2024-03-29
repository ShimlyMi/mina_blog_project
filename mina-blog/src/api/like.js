import http from "@/config/request.js";

/** 点赞 */
export const addLike = (data) => {
    return new Promise((resolve) => {
        http.post("/api/like/addLike", data).then((res) => {
            resolve(res);
        });
    });
};

/** 判断当前用户是否点赞了 */
export const getIsLikeByIdAndType = (data) => {
    return new Promise((resolve) => {
        http.post("/api/like/getIsLikeByIdAndType", data).then((res) => {
            resolve(res);
        });
    });
};

/** 取消点赞 */
export const cancelLike = (data) => {
    return new Promise((resolve) => {
        http.post("/api/like/cancelLike", data).then((res) => {
            resolve(res);
        });
    });
};
