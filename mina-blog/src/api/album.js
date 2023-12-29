import http from "@/config/request.js"

/** 获取所有相册 */
export const getAllAlbum = () => {
    return http({
        url: '/api/album/getAllAlbumList',
        method: 'get',
    })
}

/** 获取相册内的图片 */
export const getAllPicByAlbumId = (id) => {
    return http({
        url: `photo/getAllPictures/${id}`,
        method: 'get',
    })
}
