<template>
  <div>
    <h4 class="enter-x font-bold text-TEXT_LIGHT1 text-[22px] pb-[10px]">
      {{ $t("LOGIN_WORD.LOGIN_TEXT") }}
    </h4>
    <el-form size="large">
      <el-form-item class="enter-x">
        <el-input :placeholder="$t('LOGIN_WORD.ACCESS_MSG')" />
      </el-form-item>
      <el-form-item class="enter-x">
        <el-input :placeholder="$t('LOGIN_WORD.PASSORD_MSG')" />
      </el-form-item>
      <div class="flex justify-between">
        <div class="-enter-x">
          <ElCheckbox>{{ $t("LOGIN_WORD.REMEMBER_ME") }}</ElCheckbox>
        </div>
        <el-button
          class="enter-x"
          link
          type="primary"
          @click="onForgetPass"
        >
          {{
            $t("LOGIN_WORD.FORGET_PASSWORD")
          }}
        </el-button>
      </div>
      <div class="pt-[20px] enter-x">
        <el-button
          type="primary"
          class="w-full"
          @click="onLogin"
        >
          {{
            $t("LOGIN_WORD.LOGIN_TEXT")
          }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const emit = defineEmits(["forget"]);

const router = useRouter();

const onForgetPass = () => {
  emit("forget", "forgetPassword");
};

const onLogin = () => {
  router.push({
    name: "Home",
  });
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LoginForm",
});
</script>
