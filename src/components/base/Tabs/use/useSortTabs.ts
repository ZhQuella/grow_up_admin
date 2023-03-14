import { onMounted } from "vue";
import { useMultipleTab } from "store/modules/multipleTab";
import Sortable from "sortablejs";

export const useSortTabs = () => { 

  const tabsViewStore = useMultipleTab();

  const addDrag = () => { 
    const wrap = document.querySelector(".syetem-tabs-warp .el-tabs__nav");
    new Sortable(wrap, {
      animation: 350,
      filter: '.el-tabs__active-bar',
      onEnd(event: any) {
        const { newIndex, oldIndex } = event;
        const { visitedViews } = tabsViewStore;
        const _visitedViews = [...visitedViews];
        const currRow = _visitedViews.splice(oldIndex - 1, 1)[0];
        _visitedViews.splice(newIndex - 1, 0, currRow);
        tabsViewStore.saveVisitedViews(_visitedViews);
      }
    });
  };

  onMounted(() => { 
    addDrag();
  });
};
