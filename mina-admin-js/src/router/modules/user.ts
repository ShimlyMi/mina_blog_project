export default {
  path: "/users",
  redirect: "/users/management",
  meta: {
    role: 1,
    rank: 8,
    title: "用户管理",
    icon: "user"
  },
  children: [
    {
      path: "/users/management",
      name: "userManagement",
      component: () => import("@/views/user/index.vue"),
      meta: {
        title: "用户管理"
      }
    }
  ]
} as RouteConfigsTable;
