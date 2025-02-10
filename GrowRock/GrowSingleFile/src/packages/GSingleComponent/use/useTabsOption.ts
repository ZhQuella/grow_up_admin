import { computed, ref } from "vue";

export const useTabsOption = ({ options, codeOptions, codemirrorRef }) => {
  const tabsActive = ref("App.vue");

  const tabsOptions = computed(() => {
    if (!options.value.files) return [];
    return Object.keys(options.value.files)
      .filter((key) => {
        const [, type]: any = key.match(/\.([^.]+)$/);
        return type === "vue";
      })
      .map((el) => {
        return {
          label: el,
          name: el
        };
      });
  });

  const onTabChange = () => {
    codemirrorRef.value.setDoc(codeOptions.value.files[tabsActive.value]);
  };

  const onTabsRemove = (key: string) => {
    const index = Math.max(tabsOptions.value.findIndex((el) => el.name === key) - 1, 0);
    tabsActive.value = tabsOptions.value[index].name;
    Reflect.deleteProperty(codeOptions.value.files, key);
  };

  return {
    tabsActive,
    tabsOptions,
    onTabChange,
    onTabsRemove
  };
};
