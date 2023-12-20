import { createRouter, createWebHashHistory, } from 'vue-router'
import Layout from '@/components/layout/index.vue'
import NavPage from '@/views/index.vue'

const routes = [
    {
        path: '/',
        name: 'Nav',
        component: NavPage,
        meta: {
            name: '导航页'
        }
    },
    {
        path: "/",
        name: "Layout",
        meta: {
            name: "Layout",
        },
        component: Layout,
        redirect: "/home",
        children: [{
            path: "/home",
            name: "home",
            meta: {
                name: "博客首页",
            },
            component: () =>
                import ("@/views/home/index.vue"),
        }]
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            name: "用户登录"
        },
        component: () =>
            import ("@/views/user/Login.vue"),
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            name: "用户注册",
        },
        component: () =>
            import ("@/views/user/Register.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    next();
});

export default router
