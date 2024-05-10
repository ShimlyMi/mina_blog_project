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
          path: '/timeline',
          name: 'Timeline',
          meta: {
            title: "时间轴"
          }
        },
        {
          path: '/article',
          name: 'Article',
          meta: {
            title: "文章"
          },
          children: [
            {
              path: 'list',
              name: 'ArticleList',
              meta: {
                title: "文章列表"
              },
            },
            {
              path: 'forefront',
              name: 'Forefront',
              meta: {
                title: "前端"
              },
            },
            {
              path: 'backend',
              name: 'Backend',
              meta: {
                title: "后端"
              },
            },
          ]
        },
        {
          path: '/category',
          name: 'Category',
          meta: {
            title: "分类"
          },
        },
        {
          path: '/minaHouse',
          name: 'MinaHouse',
          meta: {
            title: "米娜小屋"
          },
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
        },
        {
          path: '/message',
          name: 'Message',
          meta: {
            title: "留言板"
          },
          children: [
            {
              path: 'list',
              name: 'Message',
              component: () => import("@/views/message/index.vue"),
              meta: {
                title: "留言",
                keepAlive: true
              }
            },
            {
              path: 'publish',
              name: 'Publish',
              component: () => import("@/views/message/publish.vue"),
              meta: {
                title: "编辑/新增留言"
              }
            },
            {
              path: 'detail',
              name: 'Detail',
              component: () => import("@/views/message/detail.vue"),
              meta: {
                title: "留言详情"
              }
            }
          ]
        },
        {
          path: '/friendLink',
          name: 'FriendLink',
          meta: {
            title: "友链"
          },
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
