export default {
  path: "/photo",
  meta: {
    icon: "pictureFilled",
    title: "相册管理",
    rank: 2
  },
  children: [
    {
      path: "/photo/album",
      name: "albumList",
      component: () => import("@/views/photo/album/index.vue"),
      meta: {
        title: "相册列表"
      }
    },
    {
      path: "/photo/list",
      name: "photoList",
      component: () => import("@/views/photo/list/photo-list.vue"),
      meta: {
        title: "图片列表",
        showLink: false
      }
    },
    {
      path: "/photo/addPhoto",
      name: "addPhoto",
      component: () => import("@/views/photo/list/add-edit-photo.vue"),
      meta: {
        title: "新增图片",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
