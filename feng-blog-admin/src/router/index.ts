import {createWebHistory } from 'vue-router'


export const constantRouter = [
  {

  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  history: createWebHistory(import.meta.env.BASE_URL),
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
