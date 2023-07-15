<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片：展示就诊人信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button class="button" type="primary" size="default" :icon="User"
            >添加就诊人</el-button
          >
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <!-- :user="user"   父组件传数据给子组件 -->
        <Visitor
          v-for="user in userArr"
          :key="user.id"
          class="item"
          :user="user"
        />
      </div>
    </el-card>
    <!-- 底部展示医生的信息 -->
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片的身体部分：展示医生的信息-->
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期：</div>
          </template>
          {{ docInfo.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院：</div>
          </template>
          {{ docInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室：</div>
          </template>
          {{ docInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名：</div>
          </template>
          {{ docInfo?.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称：</div>
          </template>
          {{ docInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长：</div>
          </template>
          {{ docInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务费：</div>
          </template>
          <span style="color: red">{{ docInfo.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 确定挂号按钮 -->
    <div class="btn">
      <el-button type="primary" size="default">确定挂号</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";

// 引入获取就诊人的信息接口
import { reqGetUser, reqDoctorInfo } from "@/api/hospital";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type {
  UserResponseData,
  UserArr,
  DoctorInfoData,
  Doctor,
} from "@/api/hospital/type";
// 就诊人组件
import Visitor from "./visitor.vue";

// 获取路由对象
let $route = useRoute();
// 存储全部就诊人信息
let userArr = ref<UserArr>([]);

// 存储医生的信息
let docInfo = ref<any>({});
// 组件挂载完毕获取数据
onMounted(() => {
  // 获取就诊人信息
  fetchUserData();
  //   获取医生信息
  fetchInfo();
});

// 获取就诊人信息
const fetchUserData = async () => {
  let result: UserResponseData = await reqGetUser();
  //   console.log(result);
  if (result.code == 200) {
    userArr.value = result.data;
  }
};

// 获取医生信息
const fetchInfo = async () => {
  let result: DoctorInfoData = await reqDoctorInfo(
    $route.query.docId as string
  );
  if (result.code == 200) {
    docInfo.value = result.data;
  }
};
</script>

<style scoped lang="scss">
.container {
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 20px;
  }
  .box-card {
    margin: 20px 0px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
