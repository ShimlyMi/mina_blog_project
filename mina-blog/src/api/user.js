import http from "@/config/request.js";
import { useUserStore } from "@/stores/userStore.js";
import { h } from "vue";
import { ElNotification } from "element-plus";
import imageCompression from "browser-image-compression";

/** 登录 */
export const reqLogin = (data) => {
    return new Promise((resolve) => {
        http.post("/api/users/login", data).then((res) => {
            resolve(res);
        })
    })
};
/** 注册 */
export const reqRegister = (data) => {
    return new Promise((resolve) => {
        http.post("/api/users/register", data).then((res) => {
            resolve(res);
        })
    })
};

/** 获取当前登录人信息 */
export const getUserInfo = () => {
    return http({
        url: '/api/users/info',
        method: 'get',
    })
}

/** 获取当前登录人信息 */
export const getUserInfoById = (id) => {
    return new Promise((resolve) => {
        http.get("/api/users/getUserInfoById/" + id, {}).then((res) => {
            resolve(res);
        })
    })
}

/** 图片上传 */
export const imgUpload = async (data) => {
    // 文件压缩 太大了上传不了
    let res;
    // 没有 raw.size 就表示已经压缩过了。 有的话小于 800 的 不用压缩
    if (data.raw.size > 800) {
        const file = await conversion(data.raw);
        if (!file) {
            ElNotification({
                offset: 60,
                title: "错误提示",
                message: h("div", { style: "color: #f56c6c; font-weight: 600;" }, "图片上传失败")
            });
            return;
        } else {
            res = file;
        }
    } else {
        res = data.raw;
    }
    const formData = new FormData();
    formData.append("file", res);
    const userStore = useUserStore();
    return new Promise((resolve) => {
        http.post("/api/upload/", formData, {
            config: {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": userStore.getToken,
                }
            }
        }).then((res) => {
            resolve(res);
        });
    });
};

// 图片压缩
export const conversion = (file) => {
    return new Promise((resolve) => {
        // https://www.npmjs.com/package/browser-image-compression?activeTab=readme
        imageCompression(file, { maxSizeMB: 0.8 }).then((res) => {
            resolve(res);
        });
    });
};
