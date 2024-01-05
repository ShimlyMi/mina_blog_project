import {createWebHashHistory} from 'vue-router'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouter = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  history: createWebHashHistory(),
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouter
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
