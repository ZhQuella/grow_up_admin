<template>
  <el-form
    ref="formRef"
    size="large"
    :model="formData"
    :rules="rules"
  >
    <el-form-item
      prop="password"
      class="enter-x"
    >
      <el-input
        v-model="formData.password"
        :placeholder="$t('LOGIN_WORD.NEW_PASSWORD_CONTEXT')"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item
      prop="newPassword"
      class="enter-x"
    >
      <el-input
        v-model="formData.newPassword"
        :placeholder="$t('LOGIN_WORD.ENTER_PASSWORD_CONTEXT')"
        type="password"
        show-password
      />
    </el-form-item>
    <PasswordIntensity :value="formData.password" />
  </el-form>
  <div class="pt-[10px] enter-x">
    <el-button
      type="primary"
      class="w-full"
      size="large"
      @click="onModifyPassword"
    >
      {{ $t("LOGIN_WORD.CONFIRM_TEXT") }}
    </el-button>
  </div>
  <div class="pt-[20px] enter-x">
    <el-button
      class="w-full"
      size="large"
      @click="onBack"
    >
      {{ $t("PUBLIC.BACK_TEXT") }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "./use/useForm";
import PasswordIntensity from "components/public/PasswordIntensity/index.vue";

const emit = defineEmits(["success", "back"]);

const props = defineProps({
  tagCode: {
    type: String,
    default: "",
  },
});

const { rules, formRef, formData, onModifyPassword, onBack } = useForm({
  tagCode: props.tagCode,
  emit,
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ChangePassword",
});
</script>
