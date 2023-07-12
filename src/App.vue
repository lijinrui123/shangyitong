<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop />
    <!-- 展示路由组件的区域 -->
    <div class="content">
      <!-- 展示路由组件的区域 -->
      <!-- 路由出口 -->
      <router-view></router-view>
    </div>
    <!-- 底部全局组件 -->
    <HospitalBottom />
  </div>
  <!-- 登陆组件 -->
  <Login v-if="userStore.visiable" />
</template>

<script setup lang="ts">
// 引入仓库
import useUserStore from "./store/modules/user";
let userStore = useUserStore();

// import request from "@/utils/request";
// import { onMounted } from "vue";
// onMounted(() => {
//   request.get("/hosp/hospital/department/1000_0").then((res) => {
//     console.log("App", res);
//   });
// });
</script>

<style scoped lang="scss">
.container {
  display: flex;
  /* 切换主轴方向 */
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>
