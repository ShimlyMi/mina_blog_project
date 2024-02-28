import {$t} from "@/plugins/i18n";

const {VITE_HIDE_HOME} = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "homeFilled",
    title: $t("menus.hshome"),
    rank: 0
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: $t("menus.hshome"),
        showLink: VITE_HIDE_HOME !== "true"
      }
    }
    // {
    //   path: "/personal",
    //   name: "Personal",
    //   component: () => import("@/views/personal/index.vue"),
    //   meta: {
    //     title: "个人中心",
    //     showLink: VITE_HIDE_HOME !== "false"
    //   }
    // }
  ]
} as RouteConfigsTable;
