<template>
  <!-- 展示全部订单的结构 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <!-- 提供用户选择的下拉菜单 -->
    <el-form :inline="true">
      <el-form-item label="就诊人">
        <!-- 修正拼写错误 -->
        <el-select placeholder="请选择就诊人">
          <el-option label="网易云"></el-option>
          <el-option label="网易云"></el-option>
          <el-option label="网易云"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="订单状态">
        <!-- 修正拼写错误 -->
        <el-select placeholder="请选择所有订单状态">
          <el-option label="网易云"></el-option>
          <el-option label="网易云"></el-option>
          <el-option label="网易云"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 表格展示订单数据 -->
    <el-table border style="margin: 10px 0px" :data="allOderArr">
      <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
      <el-table-column label="医院" prop="hosname"></el-table-column>
      <el-table-column label="科室" prop="depname"></el-table-column>
      <el-table-column label="医生" prop="title"></el-table-column>
      <el-table-column label="服务费" prop="amount"></el-table-column>
      <el-table-column label="就诊人" prop="patientName"></el-table-column>
      <el-table-column
        label="订单状态"
        prop="param.orderStatusString"
      ></el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button type="success" round @click="goDetail(row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @current-change="handler"
      @size-change="handlerSize"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// 引入获取订单的请求方法
import { reqUserOrderInfo } from "@/api/user";
import type { UserOrderInfoResponseData, Records } from "@/api/user/type";

// 获取路由器对象
let $router = useRouter();
// 当前分页器页码
let pageNo = ref<number>(1);
// 当前页码展示几条数据
let pageSize = ref<number>(10);
// 收集就诊人的ID
let patientId = ref<string>("");
// 订单状态
let orderStatus = ref<string>("");

// 存储全部的订单
let allOderArr = ref<Records>([]);
// 存储订单总个数
let total = ref<number>(0);

// 组件挂在完毕的回调
onMounted(() => [
  // 获取订单的方法
  getOrderInfo(),
]);

// c获取订单的2方法
const getOrderInfo = async () => {
  let result: UserOrderInfoResponseData = await reqUserOrderInfo(
    pageNo.value,
    pageSize.value,
    patientId.value,
    orderStatus.value
  );
  // console.log(result);
  if (result.code == 200) {
    allOderArr.value = result.data.records;
    total.value = result.data.total;
  }
};

// 详情按钮的回调
const goDetail = (row: any) => {
  $router.push({ path: "/user/order", query: { orderId: row.id } });
};

// 分页器组件当前页码的时间回调
const handler = (pager: number) => {
  pageNo.value = pager;
  getOrderInfo();
};

// 下拉菜单事件的回调
const handlerSize = (pageSizes: number) => {
  pageSize.value = pageSizes;
  getOrderInfo();
};
</script>

<style scoped lang="scss"></style>
