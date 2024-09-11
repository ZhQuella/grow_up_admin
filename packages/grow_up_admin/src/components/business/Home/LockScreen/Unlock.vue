<template>
  <ElCard>
    <div class="p-[40px]">
      <div class="h-[100px] w-[100px] m-[auto] mb-[10px]">
        <el-icon class="w-full h-full flex justify-center"
                 size="90px"
                 color="#999">
          <Unlocked />
        </el-icon>
      </div>
      <ElForm @submit.native.prevent>
        <ElFormItem>
          <ElInput :placeholder="i18n.t('SYSTEM_CONTENT.UNLOCK')"
                   class="w-[300px]"
                   type="password"
                   v-model="password"
                   show-password
                   size="large"/>
        </ElFormItem>
      </ElForm>
      <ElButton class="block w-full"
                type="primary"
                size="large"
                @click="onUnLockScreen">{{ i18n.t("SYSTEM_CONTENT.BTN_UNLOCK") }}</ElButton>
    </div>
  </ElCard>
</template>

<script setup lang="ts">
defineOptions({ name: "Unlock" });
import { ref } from "vue";
import { Unlocked } from "@vicons/carbon";
import {useI18n} from "vue-i18n";
import { useLockScreen } from "store/modules/LockScreen";


const i18n = useI18n();
const lockScreenStore = useLockScreen();
const password = ref("");

const onUnLockScreen = () => {
  lockScreenStore.setIsLockScreen(false);
};
</script>
