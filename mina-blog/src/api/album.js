import http from "@/config/request.js"

/** 获取所有相册 */
export const getAllAlbum = () => {
    return new Promise((resolve) => {
        http.get("/api/album/getAllAlbumList", {}).then((res) => {
            resolve(res);
        });
    });
};

/** 获取相册内的图片 */
export const getAllPicByAlbumId = (id) => {
    return new Promise((resolve) => {
        http.get("/api/photo/getAllPictures/" + id, {}).then((res) => {
            resolve(res);
        });
    });
};

