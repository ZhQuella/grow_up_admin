import type { EChartsOption } from "echarts";
import type { Ref } from "vue";
import { tryOnUnmounted } from "@vueuse/core";
import { computed, watch, unref, ref, nextTick } from "vue";
import { useThemeStore } from "store/modules/theme";
import echarts from "util/Echarts/index";
import { addEventResize, removeResizeListener } from "grow_utils";
import { useNaiveUI } from "hooks/useGrow/index";
import { debounce } from "util/index";

export const useEcharts = (elRef: Ref<HTMLDivElement>) => {
  const themeStore = useThemeStore();
  let chartInstance: echarts.ECharts | null = null;
  const resizeFn: Fn = resize;
  const { useBreakpoint } = useNaiveUI();
  const debounceFn = debounce(30);
  const shake = debounce(200);
  const cacheOptions = ref({}) as Ref<EChartsOption>;

  const themeType = computed(() => {
    return themeStore.getTheme;
  });

  async function resize() {
    await shake();
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: "quadraticIn",
      },
    });
  }

  const initCharts = async (t = themeType.value) => {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartInstance = echarts.init(el, t);
    addEventResize(elRef.value, resizeFn);
    const { widthRef, screenEnum } = useBreakpoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      await debounceFn();
      resizeFn();
    }
  };

  const getOptions: Ref<EChartsOption> = computed(() => {
    if (themeType.value !== "dark") {
      return unref(cacheOptions) as EChartsOption;
    }
    return {
      backgroundColor: "transparent",
      ...cacheOptions.value,
    } as EChartsOption;
  });

  const setOptions = async (options: EChartsOption, clear = true) => {
    cacheOptions.value = options;
    if (unref(elRef)?.offsetHeight === 0) {
      await debounceFn();
      await setOptions(unref(getOptions));
      return;
    }
    nextTick(async () => {
      await debounceFn();
      if (!chartInstance) {
        initCharts(themeType.value);
        if (!chartInstance) return;
      }
      clear && chartInstance?.clear();
      chartInstance?.setOption(unref(getOptions));
    });
  };

  const getInstance = (): echarts.ECharts | null => {
    if (!chartInstance) {
      initCharts(themeType.value);
    }
    return chartInstance;
  };

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeListener(elRef.value, resizeFn);
    chartInstance.dispose();
    chartInstance = null;
  });

  watch(
    () => themeType.value,
    async (theme) => {
      if (chartInstance) {
        chartInstance.dispose();
        await initCharts(theme);
        await setOptions(cacheOptions.value);
      }
    }
  );

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  };
};
