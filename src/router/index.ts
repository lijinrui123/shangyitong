import { createRouter, createWebHistory } from "vue-router";
// createApp方法，用于创建路由器实例，可以管理多个路由
export default createRouter({
  // 路由模式的设置
  history: createWebHistory(),
  // 管理路由
  routes: [
    // 首页
    {
      path: "/home",
      //   路由懒加载模式
      component: () => import("@/pages/home/index.vue"),
    },
    // 医院
    {
      path: "/hospital",
      component: () => import("@/pages/hospital/index.vue"),
      children: [
        {
          path: "register",
          component: () => import("@/pages/hospital/register/index.vue"),
        },
        {
          path: "detail",
          component: () => import("@/pages/hospital/detail/index.vue"),
        },
        {
          path: "notice",
          component: () => import("@/pages/hospital/notice/index.vue"),
        },
        {
          path: "close",
          component: () => import("@/pages/hospital/close/index.vue"),
        },
        {
          path: "search",
          component: () => import("@/pages/hospital/search/index.vue"),
        },
        {
          path: "register_step1",
          component: () =>
            import("@/pages/hospital/register/register_step1.vue"),
        },
        {
          path: "register_step2",
          component: () =>
            import("@/pages/hospital/register/register_step2.vue"),
        },
      ],
    },

    // 微信扫码登录
    {
      path: "/wxlogin",
      component: () => import("@/pages/wxlogin/index.vue"),
    },
    {
      path: "/",
      //   路由重定向到home
      redirect: "/home",
    },
    {
      path: "/user",
      component: () => import("@/pages/user/index.vue"),
      children: [
        {
          path: "cetification",
          component: () => import("@/pages/user/cetification/index.vue"),
        },
        {
          path: "order",
          component: () => import("@/pages/user/order/index.vue"),
        },
        {
          path: "patient",
          component: () => import("@/pages/user/patient/index.vue"),
        },
        {
          path: "profile",
          component: () => import("@/pages/user/profile/index.vue"),
        },
        {
          path: "feedback",
          component: () => import("@/pages/user/feedback/index.vue"),
        },
      ],
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
