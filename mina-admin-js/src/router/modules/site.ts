export default {
  path: "/website",
  redirect: "/website/management",
  meta: {
    icon: "setting",
    title: "网站管理",
    rank: 10
  },
  children: [
    {
      path: "/website/management",
      name: "websiteManagement",
      component: () => import("@/views/website/detail.vue"),
      meta: {
        title: "博客信息管理"
      }
    },
    {
      path: "/website/message",
      name: "Message",
      component: () => import("@/views/message/index.vue"),
      meta: {
        title: "留言管理"
      }
    },
    {
      path: "/website/background",
      name: "headerBg",
      // component: () => import("@/views/message/index.vue"),
      meta: {
        title: "背景管理"
      }
    },
    {
      path: "/website/links",
      name: "Links",
      // component: () => import("@/views/message/index.vue"),
      meta: {
        title: "友链管理"
      }
    }
  ]
} as RouteConfigsTable;
