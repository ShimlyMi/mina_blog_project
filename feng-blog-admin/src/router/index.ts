import {
  Router,
  RouteComponent,
  RouteRecordRaw,
  RouterHistory,
  createWebHistory,
  RouteRecordNormalized, createRouter, createWebHashHistory
} from "vue-router";
import rermainingRouter from "./modules/remaining"

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true
  }
);

/** 原始静态路由（未做任何处理） */
const routes = [];
Object.keys(modules).forEach(key => {
  routes.push(modules[key].default);
});

/** 创建路由实例 */
const router = createRouter({
  history: createWebHashHistory(),
  routes:
})
