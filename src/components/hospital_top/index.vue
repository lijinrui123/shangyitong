<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="" />
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <div class="help">帮助中心</div>
        <!-- 如果没有用户信息：显示登录注册 -->
        <div class="login" @click="login" v-if="!userStore.userInfo.name">
          登录/注册
        </div>
        <!-- 如果有用户信息展示用户信息 -->

        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>实名认证</el-dropdown-item>
              <el-dropdown-item>挂号订单</el-dropdown-item>
              <el-dropdown-item>就诊人管理</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入路由器
import { useRouter } from "vue-router";
// 获取user仓库的数据visiable，可以控制login组件的对话框显示与隐藏
import useUserStore from "@/store/modules/user";
import { ArrowDown } from "@element-plus/icons-vue";
let userStore = useUserStore();

let $router = useRouter();
const goHome = () => {
  // 编程式导航跳回到首页
  $router.push({ path: "/home" });
};

// 点击登录与注册按钮的时候弹出对话框
const login = () => {
  userStore.visiable = true;
};
</script>

<style scoped lang="scss">
.top {
  /* 固定到顶部 */
  position: fixed;
  /* 层级 */
  z-index: 999;
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  /* 主轴上居中 */
  justify-content: center;
  .content {
    width: 1200px;
    height: 70px;
    background: white;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      /* 主轴侧轴都居中 */
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p {
        font-size: 20px;
        color: #55a6fe;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #bbb;
      .help {
        margin-right: 10px;
      }
    }
  }

}
</style>
