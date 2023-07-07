<template>
  <div>
    <!-- 首页轮播图组件 -->
    <Carousel />
    <!-- 首页搜索医院表单区域 -->
    <Search />
    <!-- 底部展示医院的结构 -->
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level />
        <!-- 地区 -->
        <Region />
        <!-- 展示医院的结构 -->
        <div class="hospital">
          <!-- :hospitalInfo="item"给子组件card传送数据 -->
          <Card
            class="item"
            v-for="(item, index) in hasHospitalArr"
            :key="index"
            :hospitalInfo="item"
          />
          <!-- 分页器 -->
        </div>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </el-col>
      <el-col :span="4">456</el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { onMounted, ref } from "vue";
import { reqHospital } from "@/api/home";
// 引入首页轮播图组件
import Carousel from "./carousel/index.vue";
// 引入首页搜索的组件
import Search from "./search/index.vue";
// 引入首页等级的组件
import Level from "./level/index.vue";
// 引入首页地区选择的组件
import Region from "./region/index.vue";
// 展示医院的卡片组件
import Card from "./card/index.vue";
// 分页器需要的数据
// import { ref } from "vue";
// 分页器当前页面
let pageNo = ref<number>(1);
// 一页展示几条数据
let pageSize = ref<number>(5);
// 存储已有的医院数据
let hasHospitalArr = ref([]);
// 存储医院总个数
let total = ref(0);

// 组件挂载完毕，发一次请求
onMounted(() => {
  getHospitalInfo();
});
// 获取已有的医院数据
const getHospitalInfo = async () => {
  // 获取医院的数据：默认获取第一页、一页十个医院的数据
  let result: any = await reqHospital(pageNo.value, pageSize.value);
  if (result.code == 200) {
    // 存储已有的医院数据
    hasHospitalArr.value = result.data.content;
    // 存储医院总个数
    total.value = result.data.totalElements;
    console.log(result);
  }
};

// 分页器页码发生变化时后的回调
const currentChange = () => {
  getHospitalInfo();
};
// 分页器下拉菜单发生变化时触发
const sizeChange = () => {
  // 当前页面归第一页
  pageNo.value = 1;
  // 再次发请求获取医院的数据
  getHospitalInfo();
};
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  /* 主轴方向一左一右 */
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0px;
  }
}
</style>
