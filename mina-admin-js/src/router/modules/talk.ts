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
    },
    {
      path: "/talk/add",
      mame: "addTalk",
      component: () => import("@/views/talk/add-edit-talk/index.vue"),
      meta: {
        title: "发布说说",
        showLink: false
      }
    },
    {
      path: "/talk/edit",
      mame: "editTalk",
      component: () => import("@/views/talk/add-edit-talk/index.vue"),
      meta: {
        title: "修改说说",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
