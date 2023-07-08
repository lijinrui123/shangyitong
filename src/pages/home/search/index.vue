<template>
  <div class="search">
    <el-autocomplete
      @select="goDetail"
      :trigger-on-focus="false"
      clearable
      class="inline-input w-50"
      placeholder="请你输入医院的名称"
      v-model="hosname"
      :fetch-suggestions="fetchData"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
// 引入element-plus提供的图标
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
// 收集搜索的关键字（医院的名字）
import { ref } from "vue";
// 引入请求方法
import { reqHospitalInfo } from "@/api/home";
// 引入ts数据类型
import type { HospitalInfo } from "@/api/home/type";
// 创建路由对象
let $router = useRouter();
let hosname = ref<string>("");
// 顶部组件的回调
const fetchData = async (keyword: string, cb: any) => {
  // console.log(keyword);
  // 当用户输入完关键字函数会执行一次，发送获取需要提示展示的数据即可
  let result: HospitalInfo = await reqHospitalInfo(keyword);
  // console.log(result);
  // Z整理数据，变成人家组件需要的数据格式
  let showData = result.data.map((item) => {
    return {
      // 展示的数据是对象，而对象都有一个value值
      value: item.hosname, //展示医院的名字
      hoscode: item.hoscode, //存储医院的编码
    };
  });
  // 给组件提供展示的数据
  cb(showData);
};
// 点击某一个搜索选项的推荐项
const goDetail = (item: any) => {
  // console.log(item);
  // 点击推荐项进入医院详情页，将来需要携带query参数（医院的编码）
  $router.push({
    path: "/hospital/register",
    query: { hoscode: item.hoscode },
  });
};
</script>
<script lang="ts">
export default {
  name: "Search",
};
</script>
<!-- 深度选择器:>>>    /deep/  ::v-deep -->
<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  :deep(.el-input__wrapper) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>
