import { useRouter } from "vue-router";
import { unref } from "vue";
import { useMultipleTab } from "store/modules/multipleTab";
import { useTabDropdown } from "components/base/Tabs/use/useTabDropdown";

export const useTabs = () => {
  const multipleTableStore = useMultipleTab();
  const { currentRoute } = useRouter();
  const {
    closeAllTags,
    closeLeftTags,
    closeRightTags,
    closeOthersTags,
    closeTag,
    redload,
  } = useTabDropdown();

  const setTab = (name: string) => {
    const visitedViews = multipleTableStore.getVisitedViews;
    const views = visitedViews.find(
      (el) => el.fullPath === unref(currentRoute).fullPath
    );
    if (views) {
      views.meta.label = name;
    }
  };

  const closeAll = () => {
    closeAllTags();
  };

  const closeLeft = () => {
    closeLeftTags(unref(currentRoute));
  };

  const closeRight = () => {
    closeRightTags(unref(currentRoute));
  };

  const closeOther = () => {
    closeOthersTags(unref(currentRoute));
  };

  const closeCurrent = () => {
    closeTag(unref(currentRoute));
  };

  const reloadCurrent = () => {
    redload(unref(currentRoute));
  };

  return {
    setTab,
    closeAll,
    closeLeft,
    closeRight,
    closeOther,
    closeCurrent,
    reloadCurrent,
  };
};
