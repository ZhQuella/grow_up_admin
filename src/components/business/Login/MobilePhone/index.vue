<template>
  <div>
    <h4 class="enter-x font-bold text-TEXT_LIGHT1 text-[22px] pb-[10px]">
      {{ $t("LOGIN_WORD.NUMBER_LOGIN") }}
    </h4>
    <el-form
      ref="formRef"
      size="large"
      :rules="rules"
      :model="forgetForm"
    >
      <el-form-item class="enter-x">
        <el-input
          v-model="forgetForm.phoneNumber" 
          :placeholder="$t('LOGIN_WORD.MOBILE_PHONE')"
        />
      </el-form-item>
      <el-form-item class="enter-x">
        <el-row class="w-full">
          <el-col
            :span="18"
            class="pr-[10px]"
          >
            <el-input
              v-model="forgetForm.verificationCode" 
              :placeholder="$t('LOGIN_WORD.VERIFICATION_CODE')"
            />
          </el-col>
          <el-col :span="6">
            <el-button
              class="w-full"
              :disabled="isCooling || isGetCodeDisabled"
              @click="onGetVerificationCode"
            >
              {{ codeContext }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <div class="pt-[10px] enter-x">
        <el-button
          type="primary"
          class="w-full"
          :loading="loginLoading"
          @click="onPhoneLogin"
        >
          {{ $t("LOGIN_WORD.LOGIN_TEXT") }}
        </el-button>
      </div>
      <div class="pt-[20px] enter-x">
        <el-button
          class="w-full"
          @click="onBackClick"
        >
          {{ $t("PUBLIC.BACK_TEXT") }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useVerifivationCode } from "../use/useVerifivationCode";
import { useLogin } from "./use/useLogin";
const i18n = useI18n();
const emit = defineEmits(["back"]);

const forgetForm = reactive({
  phoneNumber: "13800138000",
  verificationCode: ""
});

const onBackClick = () => {
  emit("back", "login");
};

const {
  loginLoading,
  rules,
  formRef,
  onPhoneLogin
} = useLogin({
  formData: forgetForm,
  t: i18n.t
});

const { 
  isCooling,
  isGetCodeDisabled,
  codeContext,
  onGetVerificationCode
} = useVerifivationCode({
  forgetForm,
  t: i18n.t
});
</script>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "MobilePhone",
});
</script>
