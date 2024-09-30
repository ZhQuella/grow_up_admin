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
      <div class="flex flex-col">
        <div>
          <ElButton type="primary"
                    class="block w-full"
                    size="large"
                    @click="onUnLockScreen">{{ i18n.t("SYSTEM_CONTENT.BTN_UNLOCK") }}</ElButton>
        </div>
        <div class="pt-[10px]">
          <ElButton text
                    class="block w-full"
                    size="large"
                    @click="onLoginOut">{{ i18n.t("APP_SEARCH.LOG_OUT") }}</ElButton>
        </div>
      </div>
    </div>
  </ElCard>
</template>

<script setup lang="ts">
import { ElNotification, ElMessage } from "element-plus";
import { ref } from "vue";
import { Unlocked } from "@vicons/carbon";
import { useI18n } from "vue-i18n";
import { useLockScreen } from "store/modules/LockScreen";
import { useLoginOut } from "hooks/useLoginOut";
import request from "api/Login";
defineOptions({ name: "Unlock" });

const i18n = useI18n();
const { loginOut } = useLoginOut({ t: i18n.t });
const lockScreenStore = useLockScreen();
const password = ref("123789456");
const axios = request.create("LoginMethod", ["accountUnlock"]);
const onUnLockScreen = async () => {
  try{
    await axios.accountUnlock({ data: { password: password.value } });
    lockScreenStore.setIsLockScreen(false);
    if(lockScreenStore.getCrackingTimes){
      ElNotification({
        duration: 0,
        title: i18n.t("UNLOCK_TIP.TITLE"),
        message: `${i18n.t("UNLOCK_TIP.BEFORE_CONTENT")}${lockScreenStore.getCrackingTimes}${i18n.t("UNLOCK_TIP.AFTER_CONTENT")}`,
        type: 'warning',
        showClose: true
      });
      lockScreenStore.setCrackingTimes(0);
    };
  }
  catch(error){
    lockScreenStore.setCrackingTimes(lockScreenStore.getCrackingTimes + 1);
    ElMessage.error(error.message);
  }
};

const onLoginOut = () => {
  loginOut();
};
</script>
