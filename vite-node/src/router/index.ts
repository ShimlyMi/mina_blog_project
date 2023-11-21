import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/Layout/index.vue'

// @ts-ignore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      meta: {
        name: 'Layout',
      },
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            name: '首页',
          },
          component: () => import('../views/home/home.vue')
        }
      ]
    },
    {
      component: () => import('../views/login/index.vue'),
      name: 'login',
      meta: {
        name: '用户登录',
      },
      path: '/login',
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        name: '用户注册'
      },
      component: () => import('../views/login/index.vue')
    }

  ]
})

export default router
