import type { MenuType } from "types/menu";
import type { RouteRecordRaw } from "vue-router";
import { useRouter } from "vue-router";
import { unref } from "vue";
import { useMenuStore } from "store/modules/menu";
import { useMultipleTab } from "store/modules/multipleTab";

export const useTabs = () => {
  const multipleTableStore = useMultipleTab();
  const { currentRoute } = useRouter();

  const setTab = (name: string) => {
    const visitedViews = multipleTableStore.getVisitedViews;
    const views = visitedViews.find(
      (el) => el.fullPath === unref(currentRoute).fullPath
    );
    if (views) {
      views.meta.label = name;
    }
  };

  return {
    setTab,
  };
};
