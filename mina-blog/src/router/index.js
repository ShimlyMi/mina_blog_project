import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from "@/components/Layout/index.vue"
import {formatTwoStageRoutes} from "@/router/utils.js";
const routes = [

    {
        path: '/',
        name: "Layout",
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: '/home',
                name: "Home",
                component: () => import("@/views/Home/Home.vue"),
                meta: {
                    name: "首页"
                }
            },
            {
                path: '/album',
                name: 'Album',
                component: () => import("@/views/Photo/album.vue"),
            }
        ],

    },
    {
        path: '/login',
        name: "Login",
        component: () =>
            import ("@/views/Login/Login.vue"),
        meta: {
            name: "login"
        }
    },
    {
        path: '/register',
        name: "Register",
        component: () =>
            import ("@/views/Login/Register.vue"),
        meta: {
            name: "Rgister"
        }
    },
]

/** 重置路由 */
export function resetRouter() {
    router.getRoutes().forEach(route => {
        const {name, meta} = route
        if (name && router.hasRoute(name) && meta?.backstage) {
            router.removeRoute(name)
            router.options.routes = formatTwoStageRoutes()
        }
    })
}

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach(async(to, from, next) => {
    next();
});



export default router
