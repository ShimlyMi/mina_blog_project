export default {
  path: "/site",
  meta: {
    icon: "setting",
    title: "网站管理",
    rank: 10
  },
  children: [
    {
      path: "/site/message",
      name: "Message",
      component: () => import("@/views/message/index.vue"),
      meta: {
        title: "留言管理"
      }
    }
  ]
} as RouteConfigsTable;
