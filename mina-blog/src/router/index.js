import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from "@/components/Layout/index.vue"
const routes = [

    {
        path: '/',
        name: "Layout",
        component: Layout,
        children: [
            {
                path: 'home',
                name: "Home",
                component: () => import("@/views/Home/Home.vue"),
                meta: {
                    name: "首页"
                }
            }
        ],
        redirect: "/home"
    },
    {
        path: '/login',
        name: "Login",
        component: () =>
            import ("@/views/Login/Login.vue"),
        meta: {
            name: "Login"
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

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach(async(to, from, next) => {
    next();
});



export default router
