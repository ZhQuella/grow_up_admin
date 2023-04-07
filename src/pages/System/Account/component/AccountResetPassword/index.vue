<template>
  <div class="p-[20px]">
    <el-form label-width="100px">
      <el-form-item label="密码">
        <el-input
          v-model="formData.password"
          placeholder="请输入重置密码"
        />
      </el-form-item>
      <div class="pl-[100px]">
        <PasswordIntensity :value="formData.password" />
      </div>
    </el-form>
    <div class="flex justify-end pt-[10]">
      <el-button type="primary">
        提交
      </el-button>
      <el-button @click="onClean">
        取消
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import PasswordIntensity from "components/public/PasswordIntensity/index.vue";

const formData = reactive({
  password: ""
});

const emit = defineEmits(["close"]);

const onClean = () => { 
  emit("close");
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AccountResetPassword",
});
</script>
