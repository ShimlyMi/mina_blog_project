import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'

// @ts-ignore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,

    },
    {
      component: () => import('../views/login/Login.vue'),
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      path: '/login',
    },

  ]
})

export default router
