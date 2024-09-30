<template>
  <div class="fixed top-0 left-0 bottom-0 w-full overflow-y-auto"
       style="backdrop-filter: blur(20px);">
    <div class="absolute top-[40%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
      <Unlock />
    </div>

    <div class="absolute bottom-0 left-0 p-[40px]">
      <p class="text-[24px] font-bold">{{ dateDetail }}</p>
      <p class="text-[18px] pt-[10px]">{{ weekDetail }} {{ timeDetail }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useI18n } from "vue-i18n";
import Unlock from "./Unlock.vue";

dayjs.extend(isoWeek);

const i18n = useI18n();
const days = [
  i18n.t('SYSTEM_CONTENT.SUNDAY'),
  i18n.t('SYSTEM_CONTENT.MONDAY'),
  i18n.t('SYSTEM_CONTENT.TUESDAY'),
  i18n.t('SYSTEM_CONTENT.WEDNESDAY'),
  i18n.t('SYSTEM_CONTENT.THURSDAY'),
  i18n.t('SYSTEM_CONTENT.SATURDAY'),
  i18n.t('SYSTEM_CONTENT.UNLOCK'),
];
const getDate = () => dayjs().format(`YYYY${i18n.t('SYSTEM_CONTENT.YEAR')}MM${i18n.t('SYSTEM_CONTENT.MONTH')}DD${i18n.t('SYSTEM_CONTENT.DAY')}`);
const getWeek = () => days[dayjs().isoWeekday()];
const getTime = () => dayjs().format("HH:mm:ss")

const dateDetail = ref(getDate());
const weekDetail = ref(getWeek());
const timeDetail = ref(getTime());
const timer = ref<any>(0);


const autoRefreshTime = () => {
  clearInterval(timer.value);
  timer.value = setInterval(() => {
    dateDetail.value = getDate();
    weekDetail.value = getWeek();
    timeDetail.value = getTime();
  }, 1000);
};

onMounted(autoRefreshTime);

onUnmounted(() => {
  clearInterval(timer.value);
  timer.value = 0;
});
</script>
