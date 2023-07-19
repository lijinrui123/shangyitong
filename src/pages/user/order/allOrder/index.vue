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
    <el-table border style="margin: 10px 0px">
      <el-table-column label="就诊时间"></el-table-column>
      <el-table-column label="医院"></el-table-column>
      <el-table-column label="科室"></el-table-column>
      <el-table-column label="医生"></el-table-column>
      <el-table-column label="服务费"></el-table-column>
      <el-table-column label="就诊人"></el-table-column>
      <el-table-column label="订单状态"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="400"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 当前分页器页码
let pageNo = ref<number>(1);
// 当前页码展示几条数据
let pageSize = ref<number>(10);
</script>

<style scoped lang="scss"></style>
