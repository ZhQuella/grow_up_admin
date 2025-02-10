import { computed, reactive, watch } from "vue";
import { deepCopy } from "util/index";

interface argProp {
  props: any;
}

export const useInitColumns = ({ props }: argProp) => {
  const state = reactive({
    columns: []
  });

  watch(
    () => props.columns,
    (newValue) => {
      state.columns = deepCopy(newValue);
    },
    {
      immediate: true
    }
  );

  const currentColumns = computed(() => {
    return state.columns;
  });

  const isSerial = computed(() => {
    return state.columns.map((el) => el.field).includes("serial");
  });

  const isOperate = computed(() => {
    return state.columns.map((el) => el.field).includes("operate");
  });

  const serialColumn = computed(() => {
    return state.columns.find((el) => el.field === "serial") || {};
  });

  const operateColumn = computed(() => {
    return state.columns.find((el) => el.field === "operate") || {};
  });

  const allColumns = computed(() => {
    return state.columns.filter((el) => {
      return !["serial", "operate"].includes(el.field) && el.visible !== false;
    });
  });

  return {
    isSerial,
    allColumns,
    serialColumn,
    isOperate,
    operateColumn,
    currentColumns,
    state
  };
};
