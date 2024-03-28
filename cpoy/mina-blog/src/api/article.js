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
