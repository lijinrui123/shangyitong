<template>
  <el-card class="box-card">
    <!-- 卡号头部结构 -->
    <template #header>
      <div class="detail">挂号详情</div>
    </template>
    <!-- 展示身体部分顶部结构 -->
    <div class="top">
      <!-- 左侧标签 -->
      <el-tag class="ml-2" type="success">
        <span>√</span>
        <span>{{ orderInfo.param?.orderStatusString }}</span>
      </el-tag>
      <div class="right_info">
        <img src="../../../assets/images/code_app.png" alt="" />
        <div class="info">
          <p>微信 关注 “北京114预约挂号”</p>
          <p>“快速预约挂号”</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <!-- 左侧展示信息 -->
      <div class="left">
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">就诊人信息</div>
            </template>
            {{ orderInfo.patientName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">就诊日期</div>
            </template>
            {{ orderInfo.reserveDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">就诊医院</div>
            </template>
            {{ orderInfo.hosname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">就诊科室</div>
            </template>
            {{ orderInfo.depname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">医生职称</div>
            </template>
            {{ orderInfo.title }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">医事服务费</div>
            </template>
            <span style="color: red">{{ orderInfo.amount }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">挂号订单</div>
            </template>
            {{ orderInfo.outTradeNo }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">挂号时间</div>
            </template>
            {{ orderInfo.createTime }}
          </el-descriptions-item>
        </el-descriptions>
        <div
          class="btn"
          v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1"
        >
          <el-popconfirm title="确定取消预约吗？" @confirm="cancel">
            <template #reference>
              <el-button> 取消预约 </el-button>
            </template>
          </el-popconfirm>

          <el-button type="primary" v-if="orderInfo.orderStatus == 0">
            支付
          </el-button>
        </div>
      </div>
      <div class="right">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>注意事项</span>
            </div>
          </template>
          <p>
            1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；
          </p>
          <p style="color: red">
            2.【取号】就诊当天需在{{ orderInfo.fetchTime }} 在医院{{
              orderInfo.fetchAddress
            }}取号，未取号视为爽约，该号不退不换；
          </p>
          <p>
            3.【退号】在{{ orderInfo.quitTime }}可在线退号
            ，逾期将不可办理退号退费；
          </p>
          <p>
            4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
          </p>
          <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
        </el-card>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { reqOrderInfo, reqCancelOreder } from "@/api/user";
import { useRoute } from "vue-router";
import type { OrderResponseData } from "@/api/user/type";
import { ElMessage } from "element-plus";

// 获取路由对象
let $route = useRoute();

// 存储订单详情数据
let orderInfo = ref<any>({});
// 组件挂载完毕
onMounted(() => {
  getOrderInfo();
});

// 获取订单详情的方法
const getOrderInfo = async () => {
  let result: OrderResponseData = await reqOrderInfo(
    $route.query.orderId as string
  );
  // console.log(result);
  if (result.code == 200) {
    orderInfo.value = result.data;
  }
};

// 取消订单  订单的状态有三种： -1 取消预约  0 预约但是没有支付  1支付成功
const cancel = async () => {
  try {
    // 取消预约成功
    await reqCancelOreder($route.query.orderId as string);
    // 再次获取订单详情数据
    getOrderInfo();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "取消预约失败",
    });
  }
};
</script>

<style scoped lang="scss">
.box-card {
  .detail {
    color: #7f7f7f;
    font-size: 900;
  }
  .top {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    border-bottom: 1px solid #ccc;
    padding: 10px;
    span {
      margin-left: 5px;
    }
    .right_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
      }
      .info {
        margin-left: 5px;
        p {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
  .bottom {
    display: flex;
    margin-top: 20px;
    .left {
      flex: 4;
      .btn {
        margin: 10px 0px;
      }
    }
    .right {
      margin-left: 20px;
      flex: 6;
      p {
        line-height: 30px;
      }
    }
  }
}
</style>
