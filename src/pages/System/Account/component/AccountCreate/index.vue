<template>
  <div>
    <el-alert
      title="未绑定人员账号无法获知登录人员"
      type="warning"
      :closable="false"
    />
    <div class="p-[20px]">
      <el-form
        ref="accountForm"
        label-width="100px"
        size="mini"
        :model="formData"
        :rules="rules"
      >
        <el-form-item
          label="账号"
          prop="account"
        >
          <el-input
            v-model="formData.account"
            placeholder="请输入账号"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="初始密码"
          prop="password"
        >
          <el-input
            v-model="formData.password"
            placeholder="请输入初始密码"
            clearable
          />
        </el-form-item>
        <div class="pl-[100px] pb-[20px]">
          <PasswordIntensity :value="formData.password" />
        </div>
        <el-form-item
          label="状态"
          prop="state"
        >
          <el-select
            v-model="formData.state"
            class="w-full"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item of accountStates"
              :key="item.code"
              :label="item.label"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="使用人"
          prop="personnel"
        >
          <el-select
            v-model="formData.personnel"
            class="w-full"
            placeholder="请选择使用人"
          />
        </el-form-item>
      </el-form>
      <div class="flex justify-end pt-[10px]">
        <el-button
          type="primary"
          :loading="buttonLoading"
          @click="onCreateAccount"
        >
          提交
        </el-button>
        <el-button @click="onClose">
          取消
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PasswordIntensity from "components/public/PasswordIntensity/index.vue";
import { useDict } from "../use/useDict";
import { useForm } from "./use/useForm";

const emit = defineEmits(["close", "success"]);

const { accountStates } = useDict();

const { rules, formData, accountForm, buttonLoading, onCreateAccount } =
  useForm({
    emit,
  });

const onClose = () => {
  emit("close");
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AccountCreate",
});
</script>
