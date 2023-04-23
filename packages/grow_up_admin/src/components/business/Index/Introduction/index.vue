<template>
  <div>
    <div>
      <h2
        class="lg:text-[85px] sm:text-[50px] font-bold text-MAIN_TEXT bg-gradient-to-r -enter-x from-violet-500 to-fuchsia-500 bg-clip-text text-[transparent] lg:text-left sm:text-center"
      >
        <span> Grow Admin </span>
        <el-tag class="translate-y-[-10px]">
          {{ version }}
        </el-tag>
      </h2>
      <h3
        class="md:text-[36px] sm:text-[22px] font-bold text-TEXT_LIGHT1 -enter-x lg:text-left sm:text-center"
      >
        {{ $t("INDEX_SYETEM_DESCRIBE.DESCRIBE_1") }}
      </h3>
      <h3
        class="md:text-[36px] sm:text-[22px] font-bold text-TEXT_LIGHT1 -enter-x lg:text-left sm:text-center"
      >
        {{ $t("INDEX_SYETEM_DESCRIBE.DESCRIBE_2") }}
      </h3>
      <p
        class="md:text-[18px] sm:text-[15px] text-TEXT_LIGHT2 -enter-x lg:text-left sm:text-center"
      >
        {{ $t("INDEX_SYETEM_DESCRIBE.VICE_DESC_1") }}
      </p>
      <p
        class="md:text-[18px] sm:text-[15px] text-TEXT_LIGHT2 -enter-x lg:text-left sm:text-center"
      >
        {{ $t("INDEX_SYETEM_DESCRIBE.VICE_DESC_2") }}
      </p>
      <div class="pt-[20px] -enter-x lg:text-left sm:text-center">
        <el-button
          class="w-[140px] h-[40px] text-[16px]"
          size="medium"
          type="primary"
          @click="onFastStart"
        >
          {{ $t("INDEX_SYETEM_DESCRIBE.BUTTON_TEXT") }}
          <el-icon>
            <ChevronRight />
          </el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from "@vicons/carbon";
import { useRouter } from "vue-router";
import { version } from "../../../../../package.json";

const router = useRouter();

const onFastStart = () => {
  router.push({
    name: "Login"
  });
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IntroductionComponent"
});
</script>
