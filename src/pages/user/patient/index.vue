<template>
  <!-- 就诊人组件结构 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button class="button" type="success" :icon="User" @click="addUser"
          >添加就诊人</el-button
        >
      </div>
    </template>
    <!-- 就诊人管理模块展示就诊人信息 -->
    <div class="visitors" v-if="scene == 0">
      <Visitor
        @changeScene="changeScene"
        class="item"
        v-for="(user, index) in userArr"
        :key="user.id"
        :user="user"
        :index="index"
      />
    </div>
    <!-- 添加就诊人|修改已有就诊人信息的结构 -->
    <div class="form" v-else>
      <el-divider content-position="left"> 就诊人信息</el-divider>
      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请你选择证件类型" style="width: 100%">
            <el-option label="身份证"></el-option>
            <el-option label="户口本"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入用户证件号码"> </el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker type="date" placeholder="请你选择日期" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入用户手机号码"> </el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left"
        >建档信息（完善后部分医院首次就诊不排队建档</el-divider
      >

      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="婚姻状况">
          <el-radio-group>
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group>
            <el-radio :label="1">自费</el-radio>
            <el-radio :label="0">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址">
          <el-select placeholder="请选择用户地址">
            <el-option v-for="item in 10" :label="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input placeholder="请输入用户详细地址"> </el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">联系人信息（选填）</el-divider>
      <el-form style="width: 60%; margin: 10px auto" label-width="80">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请你选择证件类型" style="width: 100%">
            <el-option label="身份证"></el-option>
            <el-option label="户口本"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入用户证件号码"> </el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入用户手机号码"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button type="success">重写</el-button>
        </el-form-item>
      </el-form>
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

// 定义一个响应式数据：决定卡片的身体部分展示的内容
let scene = ref<number>(0);

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

// 添加就诊人按钮回调
const addUser = () => {
  // 切换场景
  scene.value = 1;
};

// 就诊人子组件自定义事件回调
const changeScene = () => {
  scene.value = 1;
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
