<template>
  <div class="h-full">
    <el-scrollbar
      class="top-0 left-0 right-0 bottom-0 absolute overflow-x-hidden bg-BG_COLOR"
      @scroll="onPageContentScroll"
    >
      <div
        class="-enter-y w-full h-[60px] box-border fixed z-20 flex px-[20px] bg-[length:4px_4px] justify-between"
        :style="[
          {
            backgroundImage: `radial-gradient(transparent 1px,rgba(var(--bg-color2), ${opacityNum}) 1px)`,
            backdropFilter: `saturate(50%) blur(${opacityNum}px)`
          }
        ]"
      >
        <div class="px-[5px] pt-[10px]">
          <GLogo :is-opacity="isShowBorder" />
        </div>
        <div class="flex">
          <div class="pt-[10px]">
            <SwitchTheme size="large" />
          </div>
          <div class="pt-[10px] pl-[20px]">
            <SwitchLanguage />
          </div>
          <div class="pt-[12px] pl-[20px]">
            <a href="https://github.com/ZhQuella/grow_up_admin" target="_blank">
              <GithubFilled class="w-[30px] h-[30px] text-MAIN_TEXT" />
            </a>
          </div>
        </div>
      </div>
      <div class="max-w-[1200px] mx-[auto] pt-[100px] px-[20px]">
        <div class="flex lg:justify-between sm:flex-col-reverse lg:flex-row">
          <Introduction class="-enter-x" />
          <div
            class="md:w-[340px] md:h-[340px] sm:w-[200px] sm:h-[200px] relative enter-x shrink-0 grow-0 sm:mx-auto lg:mx-0"
          >
            <img class="block w-full blur-[80px]" :src="getImageUrl(setting.logUrl)" />
            <img class="block w-full translate-y-[-100%]" :src="getImageUrl(setting.logUrl)" />
          </div>
        </div>
        <div class="lg:py-[80px] sm:py-[30px] -enter-y">
          <el-divider border-style="double" />
        </div>
        <div class="flex flex-wrap">
          <!-- xl:w-[300px] lg:w-[300px] md:w-[420px] sm:w-full -->
          <div
            v-for="(item, index) in traitIntroduces"
            :key="index"
            class="p-[10px] xl:w-4/12 lg:w-6/12 md:w-6/12 sm:w-full -enter-y"
          >
            <Describe v-bind="item" />
          </div>
        </div>
        <div class="text-[24px] text-center py-[24px] text-MAIN_TEXT font-bold">
          {{ $t("INDEX_SYETEM_DESCRIBE.SPONSOR_TITLE") }}
        </div>
        <div class="p-[20px]" />
      </div>
      <el-divider border-style="double" />
      <div class="max-w-[1200px] mx-[auto] pb-[20px] text-center text-[12px] text-TEXT_LIGHT2">
        <p>{{ $t("RECORD_INFO.DESCRIBE") }}</p>
        <p>Copyright © 2022-present **************</p>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useContainer } from "./use/useContainer";
import GLogo from "components/base/GLogo/index.vue";
import Introduction from "components/business/Index/Introduction/index.vue";
import Describe from "components/business/Index/Describe/index.vue";
import SwitchLanguage from "components/base/SwitchLanguage/index.vue";
import SwitchTheme from "components/base/SwitchTheme/index.vue";

import { getImageUrl } from "util/System";
import setting from "@/setting";

const { onPageContentScroll, opacityNum, isShowBorder, traitIntroduces } = useContainer();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IndexPage"
});
</script>
