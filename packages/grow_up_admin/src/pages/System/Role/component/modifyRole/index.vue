<template>
  <div class="p-[20px]">
    <el-form>
      <el-form-item label="角色名称" prop="roleName">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="roleName">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="权限字符" prop="roleName">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="角色类型" prop="roleName">
        <el-select class="w-full"></el-select>
      </el-form-item>
      <el-form-item label="启用状态" prop="roleName">
        <el-select class="w-full"></el-select>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleName">
        <el-input type="textarea"
                  resize="none"
                  rows="3"
                  maxlength="120"
                  show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-end pt-[10px]">
      <el-button type="primary">
        提交
      </el-button>
      <el-button> 取消 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "modifyRole"
});
</script>
