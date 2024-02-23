import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from "@/layout/index.vue"

export const constantRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        hidden: true,
        meta: {
            title: '登录',
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/register/index.vue'),
        hidden: true,
        meta: {
            title: '注册'
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: "home",
                name: "Home",
                component: () => import("@/views/home/index.vue"),
              meta: {title: 'Home', icon: 'Home'},
              hidden: false,
            }
        ]
    },
    {
        path: '/article',
        component: Layout,
        redirect: '/article/list',
        name: 'Article',
        meta: {title: 'Article', icon: '<el-icon><Document /></el-icon>'},
        children: [
            {
                path: 'list',
                name: 'List',
                component: () => import('@/views/article/article-list/index.vue'),
              hidden: false,
                meta: {title: 'List', icon: '<el-icon><List /></el-icon>'}
            },
            {
                path: 'addArticle',
                name: 'addArticle',
                component: () => import('@/views/article/add-article/index.vue'),
              hidden: false,
                meta: {title: 'addArticle', icon: '<el-icon><DocumentAdd /></el-icon>'}
            },
            {
                path: 'tag',
                name: 'tagManagement',
                component: () => import('@/views/article/tag/index.vue'),
              hidden: false,
                meta: {title: 'tagManagement', icon: '<el-icon><CollectionTag /></el-icon>'}
            },
            {
                path: 'category',
                name: 'category',
                component: () => import('@/views/article/category/index.vue'),
              hidden: false,
                meta: {title: 'category', icon: '<el-icon><PriceTag /></el-icon>'}
            }
        ]
    }
]

export function resetRouter() {
    //获取所有路由
    router.getRoutes().forEach((route) => {
        const {name} = route;   //获取路由name
        if (name && !whiteList.includes(name)) {      //路由不属于白名单,则删除
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
}

/** 路由白名单 */
const whiteList = ['/login', '/register']

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes,
});


export default router
