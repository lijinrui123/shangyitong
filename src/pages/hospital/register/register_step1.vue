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
    <!-- 中间展示日期的结构 -->
    <div class="center">
      <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <div
          class="item"
          :class="{
            active: item.status == -1 || item.availableNumber == -1,
            cur: item.workDate == workTime.workDate,
          }"
          v-for="item in workData.bookingScheduleList"
          :key="item"
          @click="changeTime(item)"
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
    <!-- 底部展示医生的结构 -->
    <div class="bottom1">
      <!-- 展示即将放号的时间 -->
      <div class="will" v-if="workTime.status == 1">
        <span class="time">2023xxxxxxxxxxxxx</span>
        <span class="willtext">放号</span>
      </div>
      <!-- 展示医生的结构 :上午、下午-->
      <div class="doctor" v-else>
        <div class="morning">
          <!-- 顶部文字提示 -->
          <div class="tip1">
            <svg
              t="1689336807398"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2545"
              width="32"
              height="32"
            >
              <path
                d="M304.5 691.8c0-145.3 117.8-263 263-263s263 117.8 263 263"
                fill="#FDDA09"
                p-id="2546"
              ></path>
              <path
                d="M567.5 428.8c-16.7 0-32.9 1.7-48.7 4.7 122 22.9 214.3 129.7 214.3 258.3h97.4c0.1-145.2-117.7-263-263-263z"
                fill="#FDA906"
                p-id="2547"
              ></path>
              <path
                d="M772.1 687.3c-8.3 0-15-6.7-15-15 0-66.2-25.8-128.5-72.6-175.4-46.8-46.8-109.1-72.6-175.4-72.6-66.2 0-128.5 25.8-175.4 72.6-46.8 46.8-72.6 109.1-72.6 175.4 0 8.3-6.7 15-15 15s-15-6.7-15-15c0-74.3 28.9-144.1 81.4-196.6 52.5-52.5 122.3-81.4 196.6-81.4s144.1 28.9 196.6 81.4c52.5 52.5 81.4 122.3 81.4 196.6 0 8.3-6.7 15-15 15z"
                fill=""
                p-id="2548"
              ></path>
              <path
                d="M914.1 704.5H120c-8.3 0-15-6.7-15-15s6.7-15 15-15h794.1c8.3 0 15 6.7 15 15s-6.7 15-15 15zM755.2 777.4H278.8c-8.3 0-15-6.7-15-15s6.7-15 15-15h476.5c8.3 0 15 6.7 15 15s-6.8 15-15.1 15zM605.6 858.1H428.5c-8.3 0-15-6.7-15-15s6.7-15 15-15h177.1c8.3 0 15 6.7 15 15s-6.8 15-15 15zM179.4 641h-63.5c-8.3 0-15-6.7-15-15s6.7-15 15-15h63.5c8.3 0 15 6.7 15 15s-6.7 15-15 15zM515.9 323.4c-8.3 0-15-6.7-15-15V181.3c0-8.3 6.7-15 15-15s15 6.7 15 15v127.1c0 8.3-6.7 15-15 15zM271 422.9c-3.8 0-7.7-1.5-10.6-4.4l-56.2-56.2c-5.9-5.9-5.9-15.4 0-21.2 5.9-5.9 15.4-5.9 21.2 0l56.2 56.2c5.9 5.9 5.9 15.4 0 21.2-2.9 3-6.8 4.4-10.6 4.4zM754.8 422.9c-3.8 0-7.7-1.5-10.6-4.4-5.9-5.9-5.9-15.4 0-21.2l56.2-56.2c5.9-5.9 15.4-5.9 21.2 0 5.9 5.9 5.9 15.4 0 21.2l-56.2 56.2c-2.9 3-6.7 4.4-10.6 4.4z"
                fill=""
                p-id="2549"
              ></path>
              <path
                d="M441.2 544.2a18.8 17.8 0 1 0 37.6 0 18.8 17.8 0 1 0-37.6 0Z"
                fill="#050400"
                p-id="2550"
              ></path>
              <path
                d="M553.9 544.2a18.8 17.8 0 1 0 37.6 0 18.8 17.8 0 1 0-37.6 0Z"
                fill="#050400"
                p-id="2551"
              ></path>
              <path
                d="M491.3 577.5c0 13.1 11.2 23.7 25 23.7s25-10.6 25-23.7h-50z"
                fill="#050400"
                p-id="2552"
              ></path>
              <path
                d="M406.9 588.6a21.9 20.7 0 1 0 43.8 0 21.9 20.7 0 1 0-43.8 0Z"
                fill="#FDA906"
                p-id="2553"
              ></path>
              <path
                d="M582.1 588.6a21.9 20.7 0 1 0 43.8 0 21.9 20.7 0 1 0-43.8 0Z"
                fill="#FDA906"
                p-id="2554"
              ></path>
            </svg>
            <span class="text">上午号源</span>
          </div>
          <!-- 每一个医生的信息 -->
          <div class="doc_info" v-for="doctor in morningArr" :key="doctor.id">
            <!-- 展示医生的名字|技能 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <!-- 右侧展示挂号的钱数 -->
            <div class="right">
              <div class="money">￥{{ doctor.amount }}元</div>
              <el-button type="primary">{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
        <div class="morning">
          <!-- 顶部文字提示 -->
          <div class="tip1">
            <svg
              t="1689338507838"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5411"
              width="32"
              height="32"
            >
              <path
                d="M369.86 594.04c45.34-78.5 145.73-105.38 224.23-60.04a164.171 164.171 0 0 1 60.04 60.04H369.86z m306.23 82.05z m-492.26 0h656.35c22.66 0 41.02 18.36 41.02 41.02 0 22.66-18.36 41.02-41.02 41.02H183.83c-22.66 0-41.02-18.36-41.02-41.02-0.01-22.66 18.36-41.02 41.02-41.02z"
                fill="#1296db"
                p-id="5412"
              ></path>
              <path
                d="M678.58 383.66l43.51-43.51c24.03-24.03 62.99-24.03 87.02 0 24.03 24.03 24.03 62.99 0 87.02l-43.51 43.51c-24.14 23.92-63.1 23.74-87.02-0.39-23.77-23.99-23.77-62.65 0-86.63zM512 204.34c33.98 0 61.53 27.55 61.53 61.53v61.53c-0.14 33.98-27.8 61.42-61.78 61.28-33.79-0.14-61.15-27.49-61.28-61.28v-61.53c0-33.98 27.55-61.53 61.53-61.53zM217.08 340.15c24.03-24.03 62.99-24.03 87.02 0l43.51 43.51c24.03 24.03 24.03 62.99 0 87.02-24.03 24.03-62.99 24.03-87.02 0l-43.51-43.51c-24.03-24.03-24.03-62.99 0-87.02z"
                fill="#1296db"
                opacity=".3"
                p-id="5413"
              ></path>
            </svg>
            <span class="text">下午号源</span>
          </div>
          <!-- 每一个医生的信息 -->
          <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
            <!-- 展示医生的名字|技能 -->
            <div class="left">
              <div class="info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="skill">{{ doctor.skill }}</div>
            </div>
            <!-- 右侧展示挂号的钱数 -->
            <div class="right">
              <div class="money">￥{{ doctor.amount }}元</div>
              <el-button type="primary">{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

import { reqHospitalWork, reqHospitalDoctor } from "@/api/hospital";

import type {
  HospitalWorkData,
  DoctorResponseData,
  DocArr,
  Doctor,
} from "@/api/hospital/type";

import { useRoute } from "vue-router";
// 获取路由对象
let $route = useRoute();

// 分页器当前页码
let pageNo = ref<number>(1);
// 每一页展示几条数据
let limit = ref<number>(6);

// 存储医院科室挂号的数据
let workData = ref<any>({});
// 存储当前排班日期：当前数据的第一个
let workTime: any = ref({});
// 存储排班医生的数据
let docArr = ref<DocArr>([]);

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
  // console.log(result);
  if (result.code == 200) {
    workData.value = result.data;
    // 存储第一天日期的数据
    // workTime.value=workData.bookingScheduleList[0]
    workTime.value = workData.value.bookingScheduleList[0];

    // 获取一次医生的数据
    getDoctorWorkData();
  }
};

// 获取医生排班信息
const getDoctorWorkData = async () => {
  // 医院的编号
  let hoscode: string = $route.query.hoscode as string;
  // 科室的编号
  let depcode: string = $route.query.depcode as string;
  // 时间
  let workDate: string = workTime.value.workDate;
  // 获取排班医生的数据
  let result: DoctorResponseData = await reqHospitalDoctor(
    hoscode,
    depcode,
    workDate
  );
  console.log(result);
  if (result.code == 200) {
    docArr.value = result.data;
  }
};

// 点击顶部某一天的时候触发回调
const changeTime = (item: any) => {
  // console.log(item);
  // 存储用户选择那一天的数据
  workTime.value = item;
  // 再发一次获取医生的排班的数据
  getDoctorWorkData();
};

// 计算出上午排班的医生数据
let morningArr = computed(() => {
  return docArr.value.filter((doc: Doctor) => {
    return doc.workTime == 0;
  });
});
// 计算出下午排班的医生数据
let afterArr = computed(() => {
  return docArr.value.filter((doc: Doctor) => {
    return doc.workTime == 1;
  });
});
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
    transition: all 0.5s;
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
        &.cur {
          transform: scale(1.1);
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
  .bottom1 {
    .will {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      .time {
        color: red;
      }
      .willtext {
        color: skyblue;
      }
    }

    .doctor {
      .morning {
        .tip1 {
          display: flex;
          align-items: center;
          .text {
            color: #7f7f7f;
            font-weight: 900;
          }
        }
        .doc_info {
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;
          .left {
            .info {
              color: skyblue;
              margin: 10px 0px;
              span {
                margin: 0px 5px;
                font-size: 18px;
                font-weight: 900;
              }
            }
            .skill {
              margin: 10px 0px;
              color: #7f7f7f;
            }
          }
          .right {
            display: flex;
            width: 150px;
            justify-content: space-between;
            align-items: center;
            .money {
              color: #7f7f7f;
              font-weight: 900;
            }
          }
        }
      }
    }
  }
}
</style>
