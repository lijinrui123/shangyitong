<template>
  <!-- 就诊人组件结构 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button class="button" type="success" :icon="User"
          >添加就诊人</el-button
        >
      </div>
    </template>
    <!-- 就诊人管理模块展示就诊人信息 -->
    <div class="visitors">
      <Visitor
        class="item"
        v-for="(user, index) in userArr"
        :key="user.id"
        :user="user"
        :index="index"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import { reqGetUser } from "@/api/hospital";
import { onMounted, ref } from "vue";
import type { UserResponseData, UserArr } from "@/api/hospital/type";

// 存储全部就诊人信息
let userArr = ref<UserArr>([]);

// 组件挂载完毕获取一次就诊人信息
onMounted(() => {
  // 获取就诊人信息
  getAllUse();
});

// 获取全部就诊人信息
const getAllUse = async () => {
  let result: UserResponseData = await reqGetUser();
  // console.log(result);
  if ((result.code = 200)) {
    userArr.value = result.data;
  }
};
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.visitors {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 32%;
    margin: 5px;
  }
}
</style>
