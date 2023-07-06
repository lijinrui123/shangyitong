import { createRouter, createWebHistory } from "vue-router";
// createApp方法，用于创建路由器实例，可以管理多个路由
export default createRouter({
  // 路由模式的设置
  history: createWebHistory(),
  // 管理路由
  routes: [
    {
      path: "/home",
      //   路由懒加载模式
      component: () => import("@/pages/home/index.vue"),
    },
    {
      path: "/hospital",
      component: () => import("@/pages/hospital/index.vue"),
    },
    {
      path: "/",
      //   路由重定向到home
      redirect: "/home",
    },
  ],
  // 滚动行为：控制滚动条的位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
