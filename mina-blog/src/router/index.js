import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from "@/components/Layout/index.vue"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import("@/views/home/Home.vue"),
          meta: {
            title: "首页"
          }
        },
        {
          path: '/album',
          name: 'Album',
          component: () => import("@/views/photo/album.vue"),
          meta: {
            title: "相册"
          }
        },
        {
          path: '/talk',
          name: 'Talk',
          component: () => import("@/views/talk/talk.vue"),
          meta: {
            title: "说说"
          }
        }
      ]
    },
    /** 登录 */
    {
      path: '/login',
      name: 'Login',
      component: () => import("@/views/user/login-register.vue"),
      meta: {
        title: "登录",
        name: 'Login'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import("@/views/user/login-register.vue"),
      meta: {
        title: "注册",
        name: 'Register'
      }
    }
  ]
})

/** 重置路由 */
export function resetRouter() {
  //获取所有路由
  router.getRoutes().forEach((route) => {
    const {name} = route;   //获取路由name
    if (name && !whiteList.includes(name)) {      //路由不属于白名单,则删除
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
/**
 * 在router/index.js中定义$addRoutes,调用这个方法来添加路由，这个方法会先重置路由
 这个路由只会包括非权限页，比如登录页，再调用router.addRoutes添加权限路由，
 此方法亲测，完美解决，方法来自GitHub的issues,https://github.com/vuejs/vue-router/issues/2886
 */
const constantRouterMap = [] // 默认的路由规则，比如登录页（非权限页）

/** 路由白名单 */
const whiteList = ['/login', '/register']

router.beforeEach(async(to, from, next) => {
  next();
});
export default router
