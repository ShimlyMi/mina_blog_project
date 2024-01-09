import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from "@/layout/index.vue"
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
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
        meta: {title: 'Home'}
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
  routes: constantRoutes,
});


export default router
