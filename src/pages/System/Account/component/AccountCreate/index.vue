<template>
  <div>
    <el-form
      label-width="100px"
      size="mini"
    >
      <el-form-item label="账号">
        <el-input placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="初始密码">
        <el-input placeholder="请输入初始密码" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          class="w-full"
          placeholder="请选择状态"
        />
      </el-form-item>
    </el-form>
    <div class="flex justify-end pt-[10px]">
      <el-button type="primary">
        提交
      </el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AccountCreate",
});
</script>
