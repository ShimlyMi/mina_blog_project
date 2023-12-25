import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
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