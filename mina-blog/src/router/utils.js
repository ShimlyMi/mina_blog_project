/**
 * 一维数组处理成多级嵌套数组（三级及以上的路由全部拍成二级，keep-alive 只支持到二级缓存）
 * https://github.com/pure-admin/vue-pure-admin/issues/67
 * @param routesList 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成规定路由的格式
 */
function formatTwoStageRoutes(routesList) {
    if (routesList.length === 0) return routesList;
    const newRoutesList = [];
    routesList.forEach((v) => {
        if (v.path === "/") {
            newRoutesList.push({
                component: v.component,
                name: v.name,
                path: v.path,
                redirect: v.redirect,
                meta: v.meta,
                children: []
            });
        } else {
            newRoutesList[0]?.children.push({...v});
        }
    });
    return newRoutesList;
}

export {
    formatTwoStageRoutes
}
