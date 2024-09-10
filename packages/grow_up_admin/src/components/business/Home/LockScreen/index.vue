<template>
  <div class="fixed top-0 left-0 bottom-0 w-full overflow-y-auto z-[3000]">
    <div class="absolute top-[50%] left-[50%]">
      <div class="text-center text-[24px] leading-[32px]">待完成</div>
      <ElButton @click="onUnLockScreen"
                size="large">Unlock</ElButton>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useLockScreen } from "store/modules/LockScreen";

const lockScreenStore = useLockScreen();

const onUnLockScreen = () => {
  lockScreenStore.setIsLockScreen(false);
}
</script>
