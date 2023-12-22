import http from "@/config/request.js"

/** 查询网站列表 */
export const getHomeAticleList = ({pageNum, pageSize}) =>{
    return http({
        url: '/api/article/',
        method: 'get',
        params: {
            pageNum, pageSize
        }
    })
}

/** 获取网站详情 */
export const getWebDetail = () => {
    return http({
        url: '/api/config/detail',
        method: "get"
    })
}
