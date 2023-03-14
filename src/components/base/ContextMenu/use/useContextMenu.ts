import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { tabMenuMethod, contextMenuType } from "types/contextMenu";
import { computed, unref, nextTick, reactive } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useMultipleTab } from "store/modules/multipleTab";

export const useContextMenu = (props: any) => { 

  const i18n = useI18n();
  const tabsViewStore = useMultipleTab();
  const { currentRoute, push, replace, getRoutes } = useRouter();

  const state = reactive({
    catchTab: <any>null
  });

  const curRoute = computed(() => { 
    return props.curRoute;
  });

  const tabsList = computed(() => {
    return tabsViewStore.getVisitedViews;
  });

  const closeRightDisabled = computed(() => {
    const index = tabsList.value.findIndex(item => item?.path === curRoute.value?.path);
    const rightTabs = tabsList.value.filter((item, i) => (i > index && !item?.meta?.default));
    return !Boolean(rightTabs.length);
  });

  const closeLeftDisabled = computed(() => {
    const index = tabsList.value.findIndex(item => item?.path === curRoute.value?.path);
    const rightTabs = tabsList.value.filter((item, i) => (i < index && !item?.meta?.default));
    return !Boolean(rightTabs.length);
  });

  const closeOtherDisabled = computed(() => {
    const index = tabsList.value.findIndex(item => item?.path === curRoute.value?.path);
    const rightTabs = tabsList.value.filter((item, i) =>  !item?.meta?.default && index !== i);
    return !Boolean(rightTabs.length);
  });

  const closeAllDisabled = computed(() => {
    const rightTabs = tabsList.value.filter((item) => !item?.meta?.default);
    return !Boolean(rightTabs.length);
  });

  const contextMenuOptions = computed(() => [{
    label: i18n.t("TABS_DROPDOWN_OPTION.RELOAD"),
    key: 'redload',
    icon: "ReloadOutlined"
  },{
    label: i18n.t("TABS_DROPDOWN_OPTION.CLOSE_TAG"),
    key: 'closeTag',
    icon: "CloseOutlined",
    disabled: (state.catchTab || unref(currentRoute))?.meta?.default
  },{
    label: i18n.t("TABS_DROPDOWN_OPTION.CLOSE_RIGHT_TAG"),
    key: 'closeRightTag',
    icon: 'VerticalLeftOutlined',
    divided: true,
    disabled: closeRightDisabled.value
  },{
    label: i18n.t("TABS_DROPDOWN_OPTION.CLOSE_LEFT_TAG"),
    key: 'closeLeftTag',
    icon: 'VerticalRightOutlined',
    disabled: closeLeftDisabled.value
  },{
    label: i18n.t("TABS_DROPDOWN_OPTION.CLOSE_OTHER_TAG"),
    key: 'closeOtherTag',
    icon: 'CloseSquareOutlined',
    divided: true,
    disabled: closeOtherDisabled.value
  },{
    label: i18n.t("TABS_DROPDOWN_OPTION.CLOSE_ALL_TAG"),
    key: 'closeAllTag',
    icon: 'CloseCircleOutlined',
    disabled: closeAllDisabled.value
  }]);

    const redload = async (view: RouteLocationNormalizedLoaded) => {
      if (!view) return
      tabsViewStore.delCachedView();
      const { path, query } = view;
      await nextTick();
      replace({
        name: 'Redirect',
        params: {
          path
        },
        query
      });
    };
  
    const closeTag = (view: RouteLocationNormalizedLoaded) => {
      tabsViewStore.delView(view);
      if (isActive(view)) {
        toLastView()
      }
    };
  
    const isActive = (route: RouteLocationNormalizedLoaded): boolean => {
      return route.path === unref(currentRoute).path
    }
    
    const toLastView = () => {
      const visitedViews = tabsViewStore.getVisitedViews
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        push(latestView)
      };
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
      addTag: () => {}
    };
    methods[value](state.catchTab || unref(currentRoute));
    state.catchTab = null;
  };

  return {
    contextMenuOptions,
    onDropdownSelect
  };
};

