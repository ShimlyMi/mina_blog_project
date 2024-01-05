import {createRouter, createWebHashHistory} from 'vue-router'
// import Vue from 'vue'
// import Router from 'vue-router'
//
// Vue.use(Router)


export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    }
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});
// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   history: createWebHashHistory(),
//   // scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes
// })
// const router = createRouter()
// // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export default router
