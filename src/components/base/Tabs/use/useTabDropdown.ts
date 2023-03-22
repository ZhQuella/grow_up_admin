import type { RouteLocationNormalizedLoaded } from "vue-router";
import { contextMenuType, tabMenuMethod } from "types/multipleTab";
import { reactive, computed, ref, nextTick, unref } from "vue";
import { useMultipleTab } from "store/modules/multipleTab";
import { useRouter } from "vue-router";
import sortable from "sortablejs";

export const useTabDropdown = () => {
  const tabsViewStore = useMultipleTab();

  const state = reactive({
    catchTab: <any>null,
  });

  const { currentRoute, push, replace, getRoutes } = useRouter();

  const currentName = computed(() => {
    return tabsViewStore.activeKey;
  });

  const curRoute = computed(() => {
    return state.catchTab || unref(currentRoute);
  });

  const addDrag = () => {
    const wrap = document.querySelector(".app-tab-warp .n-tabs-wrapper");
    sortable.create(wrap, {
      animation: 200,
      onEnd(event: any) {
        const { newIndex, oldIndex } = event;
        const { visitedViews } = tabsViewStore;
        const _visitedViews = [...visitedViews];
        const currRow = _visitedViews.splice(oldIndex - 1, 1)[0];
        _visitedViews.splice(newIndex - 1, 0, currRow);
        tabsViewStore.saveVisitedViews(_visitedViews);
      },
    });
  };

  const onHandleContextMenu = (visible: boolean, item: contextMenuType) => {
    if (visible) {
      state.catchTab = item;
    } else {
      state.catchTab = null;
    }
  };

  const tabsList = computed(() => {
    return tabsViewStore.getVisitedViews;
  });

  const onClickoutside = () => {
    state.catchTab = null;
  };

  const redload = async (view: RouteLocationNormalizedLoaded) => {
    if (!view) return;
    tabsViewStore.delCachedView();
    const { path, query } = view;
    await nextTick();
    replace({
      name: "Redirect",
      params: {
        path,
      },
      query,
    });
  };

  const closeTag = (view: RouteLocationNormalizedLoaded) => {
    tabsViewStore.delView(view);
    alert(JSON.stringify(view));
    alert(isActive(view));
    if (isActive(view)) {
      toLastView();
    }
  };

  const isActive = (route: RouteLocationNormalizedLoaded): boolean => {
    alert(route.path);
    alert(unref(currentRoute).path);
    return route.path === unref(currentRoute).path;
  };

  const toLastView = () => {
    const visitedViews = tabsViewStore.getVisitedViews;
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
      push(latestView);
    }
  };

  // 关闭右侧
  const closeRightTags = (view: RouteLocationNormalizedLoaded) => {
    tabsViewStore.delRightViews(unref(view) as RouteLocationNormalizedLoaded);
    toLastView();
  };

  // 关闭左侧
  const closeLeftTags = (view: RouteLocationNormalizedLoaded) => {
    tabsViewStore.delLeftViews(unref(view) as RouteLocationNormalizedLoaded);
    toLastView();
  };

  // 关闭其他
  const closeOthersTags = (view: RouteLocationNormalizedLoaded) => {
    tabsViewStore.delOthersViews(unref(view) as RouteLocationNormalizedLoaded);
    toLastView();
  };

  const closeAllTags = () => {
    tabsViewStore.delAllViews();
    toLastView();
  };

  const onDropdownSelect = (value: contextMenuType) => {
    const methods: tabMenuMethod = {
      redload,
      closeTag,
      closeLeftTag: closeLeftTags,
      closeRightTag: closeRightTags,
      closeOtherTag: closeOthersTags,
      closeAllTag: closeAllTags,
      addTag: tabsViewStore.addTabs,
    };
    methods[value](state.catchTab || unref(currentRoute));
    state.catchTab = null;
  };

  const onRedload = () => {
    redload(unref(currentRoute));
  };

  return {
    tabsList,
    currentName,
    closeTag,
    addDrag,
    onHandleContextMenu,
    onClickoutside,
    onDropdownSelect,
    onRedload,
    curRoute,
  };
};
