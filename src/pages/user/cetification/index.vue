<template>
  <!-- 实名认证结构 -->
  <el-card class="box-card">
    <!-- 卡片的头部 -->
    <template #header>
      <div class="card-header">
        <h1>实名信息</h1>
      </div>
    </template>
    <!-- 实名认证结构的提示部分 -->
    <div class="tip" style="color: #7f7f7f">
      <p>
        <el-icon><InfoFilled /></el-icon>
        完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
      </p>
    </div>
    <!-- 卡片身体的底部：认证成功的结构、认证未成功的结构 -->
    <el-descriptions
      v-if="true"
      class="margin-top"
      :column="1"
      border
      style="margin: 20px auto"
      size="small"
    >
      <el-descriptions-item label-align="center" :width="20">
        <template #label>
          <div class="cell-item">用户姓名</div>
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width="20">
        <template #label>
          <div class="cell-item">证件类型</div>
        </template>
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width="20">
        <template #label>
          <div class="cell-item">证件号码</div>
        </template>
        kooriookami
      </el-descriptions-item>
    </el-descriptions>
    <!-- 用户未认证的结构 -->
    <el-form style="width: 60%; margin: 20px auto" label-width="80">
      <el-form-item label="用户姓名">
        <el-input placeholder="请输入用户的姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select placeholder="请选择证件类型" style="width: 100%">
          <el-option label="身份证"></el-option>
          <el-option label="户口本"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input placeholder="请输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="上传证件">
        <el-upload list-type="picture-card">
          <img
            src="../../../assets/images/auth_example.png"
            alt=""
            style="width: 100%; height: 80%"
          />
        </el-upload>

        <el-dialog>
          <img w-full alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"> 提交</el-button>
        <el-button> 重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.box-card {
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
