<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left">
        <img src="../../assets/images/logo.png" alt="" />
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <div class="help">帮助中心</div>
        <div class="login">登录/注册</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
