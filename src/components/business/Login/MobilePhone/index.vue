<template>
  <div>
    <h4 class="enter-x font-bold text-TEXT_LIGHT1 text-[22px] pb-[10px]">
      {{ $t("LOGIN_WORD.NUMBER_LOGIN") }}
    </h4>
    <el-form size="large">
      <el-form-item class="enter-x">
        <el-input :placeholder="$t('LOGIN_WORD.MOBILE_PHONE')" />
      </el-form-item>
      <el-form-item class="enter-x">
        <el-row class="w-full">
          <el-col
            :span="18"
            class="pr-[10px]"
          >
            <el-input
              :placeholder="$t('LOGIN_WORD.VERIFICATION_CODE')"
            />
          </el-col>
          <el-col :span="6">
            <el-button class="w-full">
              {{
                $t("LOGIN_WORD.GET_CODE")
              }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <div class="pt-[10px] enter-x">
        <el-button
          type="primary"
          class="w-full"
        >
          {{
            $t("LOGIN_WORD.LOGIN_TEXT")
          }}
        </el-button>
      </div>
      <div class="pt-[20px] enter-x">
        <el-button
          class="w-full"
          @click="onBackClick"
        >
          {{
            $t("PUBLIC.BACK_TEXT")
          }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["back"]);

const onBackClick = () => {
  emit("back", "login");
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MobilePhone",
});
</script>
