import {createRouter, createWebHashHistory, } from 'vue-router'

/*const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'feng-user',
      component: () => import('../views/user/index.vue')
    },
    {
      path: '/register',
      name: 'feng-register',
      component: () => import('../views/user/index.vue')
    },
  ]
})*/
const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      name: "博客首页",
    },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      name: "用户登录"
    },
    component: () => import("@/views/user/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      name: "用户注册",
    },
    component: () => import("@/views/user/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  next();
});

export default router
