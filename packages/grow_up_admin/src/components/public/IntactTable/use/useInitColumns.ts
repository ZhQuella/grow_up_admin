import { watch, reactive, computed } from "vue";
import { deepCopy } from "util/index";

interface props {
  columns: any[];
}

export const useInitColumns = ({ columns }: props) => {
  const state = reactive({
    columns: [],
  });

  watch(
    () => columns,
    (newValue) => {
      state.columns = deepCopy(newValue);
    },
    {
      immediate: true,
    }
  );

  const allColumns = computed(() => {
    return state.columns.map((el) => {
      return {
        ...el,
        hidden: el.visible === false,
      };
    });
  });

  return {
    state,
    allColumns,
  };
};
