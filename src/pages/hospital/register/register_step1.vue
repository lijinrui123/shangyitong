<template>
  <div class="wrap">
    <!-- 顶部结构 -->
    <div class="top">
      <div class="hosname">{{ workData.baseMap?.hosname }}</div>
      <div class="line">|</div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div class="dot">.</div>
      <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
    </div>
    <div class="center">
      <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <div
          class="item"
          :class="{ active: item.status == -1 || item.availableNumber == -1 }"
          v-for="item in workData.bookingScheduleList"
          :key="item"
        >
          <div class="top2">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
          <div class="bottom">
            <div v-if="item.status == -1">停止挂号</div>
            <div v-if="item.status == 0">
              {{
                item.availableNumber == -1
                  ? `约满了`
                  : `有号(${item.availableNumber})`
              }}
            </div>
            <div v-if="item.status == 1">即将放号</div>
          </div>
        </div>
      </div>
      <el-pagination
        v-model:current-page="pageNo"
        layout="prev, pager, next"
        :total="workData.total"
        @current-change="fetchWorkData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { reqHospitalWork } from "@/api/hospital";

import type { HospitalWorkData } from "@/api/hospital/type";

import { useRoute } from "vue-router";
// 获取路由对象
let $route = useRoute();

// 分页器当前页码
let pageNo = ref<number>(1);
// 每一页展示几条数据
let limit = ref<number>(6);

// 存储医院科室挂号的数据
let workData = ref<any>({});

// 组件挂载完毕发一次请求
onMounted(() => {
  fetchWorkData();
});

// 获取挂号的数据
const fetchWorkData = async () => {
  let result: HospitalWorkData = await reqHospitalWork(
    pageNo.value,
    limit.value,
    $route.query.hoscode as string,
    $route.query.depcode as string
  );
  console.log(result);
  if (result.code == 200) {
    workData.value = result.data;
  }
};
</script>

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
        width: 100%;
        border: 1px solid skyblue;
        margin: 0px 5px;
        &.active {
          border: 1px solid #cccc;
          color: #7f7f7f;
          .top2 {
            background: #ccc;
          }
        }

        .top2 {
          background: #e8f2ff;
          /* margin: 5px 0px; */
          width: 100%;
          height: 30px;
          text-align: center;
          line-height: 30px;
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
