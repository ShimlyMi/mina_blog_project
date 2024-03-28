import http from "@/config/request.js"

/** 获取网站详情 */
export const getWebDetail = () => {
    return http({
        url: '/api/config/detail',
        method: "get"
    })
}
