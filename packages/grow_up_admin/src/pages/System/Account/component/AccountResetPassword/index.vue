<template>
  <div class="p-[20px]">
    <el-form
      ref="formRef"
      :model="formData"
      label-width="100px"
      :rules="rules"
      onsubmit="return false"
    >
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入重置密码" />
      </el-form-item>
      <div class="pl-[100px] pb-[20px]">
        <PasswordIntensity :value="formData.password" />
      </div>
    </el-form>
    <div class="flex justify-end pt-[10]">
      <el-button :loading="buttonLoading" type="primary" @click="onReset"> 提交 </el-button>
      <el-button @click="onClean"> 取消 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PasswordIntensity from "components/public/PasswordIntensity/index.vue";

import { useForm } from "./use/useForm";

const emit = defineEmits(["close", "success"]);

const { formData, rules, formRef, buttonLoading, onReset, onClean } = useForm({
  emit
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AccountResetPassword"
});
</script>
