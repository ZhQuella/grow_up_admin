<template>
  <el-dropdown
    placement="bottom-end"
  >
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item) of internationOption"
                          :key="item.key"
                          @click="onHandleSelect(item.key)">{{ item.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
    <span class="el-dropdown-link leading-[36px]">
      <el-icon :size="20" class="mr-[5px] align-middle text-TEXT_LIGHT1">
        <Language />
      </el-icon>
      <span class="leading-[36px] text-TEXT_LIGHT1">{{ context }}</span>
    </span>
  </el-dropdown>
</template>

<script setup lang="ts">
import type { LanguageItem, LanguageType } from "types/language";
import type { PropType } from "vue";
import { computed } from "vue";
import { Language } from "@vicons/carbon";
import { internationOption } from "@/assets/state/data/staticData";
import { useLanguageStore } from "store/modules/language";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const localeStore = useLanguageStore();

const props = defineProps({
  title: {
    type: [String, Object] as PropType<string | Title18n>,
    required: true,
    default: '',
  }
});

const onHandleSelect = (value: LanguageType) => { 
  localeStore.setLocale(value);
  locale.value = value;
};

const context = computed(() => {
  const key:LanguageType = localeStore.locale;
  const item:LanguageItem = internationOption.find(el => el.key === key)!;
  return item.label;
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SwitchLanguage"
});
</script>