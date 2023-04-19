<template>
  <div>
    <h4 class="enter-x font-bold text-TEXT_LIGHT1 text-[22px] pb-[10px]">
      {{ $t("LOGIN_WORD.LOGIN_TEXT") }}
    </h4>
    <el-form
      ref="loginFormRef"
      size="large"
      :model="loginFormData"
      :rules="formRules"
    >
      <el-form-item
        prop="account"
        class="enter-x"
      >
        <el-input
          v-model="loginFormData.account"
          :placeholder="$t('LOGIN_WORD.ACCESS_MSG')"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="password"
        class="enter-x"
      >
        <el-input
          v-model="loginFormData.password"
          :placeholder="$t('LOGIN_WORD.PASSORD_MSG')"
          type="password"
          clearable
          show-password
        />
      </el-form-item>
      <div class="flex justify-between">
        <div class="-enter-x">
          <ElCheckbox v-model="loginFormData.isRemember">
            {{ $t("LOGIN_WORD.REMEMBER_ME") }}
          </ElCheckbox>
        </div>
        <el-button
          class="enter-x"
          link
          type="primary"
          @click="onForgetPass"
        >
          {{ $t("LOGIN_WORD.FORGET_PASSWORD") }}
        </el-button>
      </div>
      <div class="pt-[20px] enter-x">
        <el-button
          type="primary"
          class="w-full"
          :loading="loading"
          @click="onLogin"
        >
          {{ $t("LOGIN_WORD.LOGIN_TEXT") }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "./use/useForm";
import { useForget } from "./use/useForget";
const emit = defineEmits(["forget"]);

const { loginFormData, loginFormRef, formRules, loading, onLogin } = useForm();

const { onForgetPass } = useForget({
  emit,
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LoginForm",
});
</script>
