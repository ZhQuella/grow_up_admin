<template>
  <div>
    <h4 class="enter-x font-bold text-TEXT_LIGHT1 text-[22px] pb-[10px]">
      {{ $t("LOGIN_WORD.FORGET_PASSWORD") }}
    </h4>
    <el-form
      ref="forgetFormRef"
      size="large"
      :rules="rules"
      :model="forgetForm"
    >
      <el-form-item
        prop="account"
        class="enter-x"
      >
        <el-input
          v-model="forgetForm.account"
          :placeholder="$t('LOGIN_WORD.ACCESS_MSG')"
        />
      </el-form-item>
      <el-form-item
        prop="phoneNumber"
        class="enter-x"
      >
        <el-input
          v-model="forgetForm.phoneNumber"
          :placeholder="$t('LOGIN_WORD.MOBILE_PHONE')"
        />
      </el-form-item>
      <el-form-item
        prop="verificationCode"
        class="enter-x"
      >
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
          @click="onForgetPassword"
        >
          {{ $t("LOGIN_WORD.CONFIRM_TEXT") }}
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
import { useBack } from "./use/useBack";
import { useVerifivationCode } from "../use/useVerifivationCode";
import { useForm } from "./use/useForm";
import axios from "api/Login";

const forgetMethod = axios.create("ForgetPassword");

const i18n = useI18n();
const emit = defineEmits(["back"]);

const { onBackClick } = useBack({ emit });
const { forgetFormRef, forgetForm, rules, onForgetPassword } = useForm({
  t: i18n.t,
  forgetMethod,
  emit,
});

const { isCooling, isGetCodeDisabled, codeContext, onGetVerificationCode } =
  useVerifivationCode({
    forgetForm,
    t: i18n.t,
  });
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ForgetPassword",
});
</script>
