export default {
  path: "/talk",
  meta: {
    icon: "list",
    title: "说说",
    rank: 1
  },
  children: [
    {
      path: "/talk/list",
      name: "List",
      component: () => import("@/views/talk/talk-list/index.vue"),
      meta: {
        title: "说说列表"
      }
    }
  ]
} as RouteConfigsTable;
