// import RouteConfigsTable from "../../../types/router";
// const Layout = () => import("@/layout/index.vue");
export default {
  path: "/personal",
  name: "Personal",
  // component: Layout,
  // redirect: "/personal/management",
  component: () => import("@/views/personal/index.vue"),
  meta: {
    showLink: false,
    title: "个人中心",
    icon: "userFilled",
    rank: 10
  }
  // children: {
  //   path: "/management",
  //   component: () => import("@/views/personal/index.vue"),
  //   meta: {
  //     title: "个人中心",
  //     showLink: false
  //   }
  //}
} as RouteConfigsTable;
