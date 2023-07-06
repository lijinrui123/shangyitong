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
          <Card class="item" v-for="item in 10" :key="item" />
          <!-- 分页器 -->
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout=" prev, pager, next, jumper, ->,sizes,total"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
      <el-col :span="4">456</el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
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
import { ref } from "vue";
// 分页器当前页面
let pageNo = ref<number>(1);
// 一页展示几条数据
let pageSize = ref<number>(10);
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
