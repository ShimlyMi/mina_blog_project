import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'feng-login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/register',
      name: 'feng-register',
      component: () => import('../views/login/index.vue')
    },
  ]
})

export default router
