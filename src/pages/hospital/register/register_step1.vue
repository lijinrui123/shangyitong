<template>
  <div class="wrap">
    <!-- 顶部结构 -->
    <div class="top">
      <div class="hosname">北京某某医院</div>
      <div class="line">|</div>
      <div>专科</div>
      <div class="dot">.</div>
      <div class="hosdeparment">xx科室</div>
    </div>
    <div class="center">
      <h1 class="time">2023年6月3日</h1>
      <div class="container">
        <div class="item" v-for="item in 6" :key="item">
          <div class="top2">111</div>
          <div class="bottom">233</div>
        </div>
      </div>
      <el-pagination layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;
    .line {
      width: 5px;
      height: 20px;
      background: skyblue;
      margin: 0px 5px;
    }
    .dot {
      margin: 0px 5px;
      color: skyblue;
    }
  }
  .center {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .time {
      font-weight: 900;
    }
    .container {
      width: 100%;
      display: flex;
      margin: 30px 0px;
      .item {
        flex: 1;
        border: 1px solid skyblue;
        margin: 0px 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top2 {
          background: #e8f2ff;
          width: 100%;
          height: 30px;
          text-align: center;
        }
        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }
}
</style>
