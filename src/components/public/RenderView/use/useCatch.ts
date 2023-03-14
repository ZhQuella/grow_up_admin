import { computed } from "vue";
import { useMultipleTab } from "store/modules/multipleTab";

export const useCatch = () => {

  const multipleTab = useMultipleTab();

  const cachedViews = computed(():string[] => {
    return multipleTab.getCachedViews;
  });

  return {
    cachedViews
  };

};
