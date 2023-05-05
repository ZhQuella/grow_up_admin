<template>
  <div>
    <div class="h-[300px] enter-x">
      <div class="h-full w-[300px] mx-auto bg-slate-300" />
    </div>
    <div class="pt-[20px] enter-x">
      <el-button size="large" class="w-full" @click="onBackClick">
        {{ t("PUBLIC.BACK_TEXT") }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";


const { t } = useI18n();
const emit = defineEmits(["back"]);

const onBackClick = () => {
  emit("back", "login");
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "QrCodeLogin"
});
</script>
