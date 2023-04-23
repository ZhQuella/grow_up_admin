import { computed, ref, onMounted, reactive, watch } from "vue";
import { deepCopy } from "util/index";

interface initProps {
  columns: any[];
  nodeKey: string;
}

export const useInitTree = ({ columns, nodeKey }: initProps) => {
  const treeRef = ref();
  const state = reactive({
    catchTreeCheckedKeys: [],
    catchVisible: {},
    treeData: []
  });

  watch(
    () => columns,
    (newValue: any) => {
      state.treeData = deepCopy(newValue);
    },
    {
      immediate: true
    }
  );

  const allChild = computed(() => {
    const allChild = [...state.treeData];
    const result = [];
    for (const item of allChild) {
      const { children } = item;
      if (children) {
        allChild.push(...children);
      }
      result.push(item);
    }
    return result;
  });

  const getAllChild = (columns: any[]) => {
    const arr = [...columns];
    for (const item of arr) {
      if (item.children) {
        arr.push(...item.children);
      }
    }
    return arr;
  };

  const renderLabel = (data: any) => {
    return data.title;
  };

  const setTreeNodeSelect = () => {
    const allChild = getAllChild(state.treeData);
    const visibles = allChild
      .filter((el) => el.visible !== false && el[nodeKey])
      .map((el) => el[nodeKey]);
    treeRef.value && treeRef.value.setCheckedKeys(visibles);
  };

  const setDisabled = () => {
    const allColumns = getAllChild(state.treeData);
    for (const item of allColumns) {
      if (["operate", "serial"].includes(item[nodeKey])) {
        Reflect.set(item, "disabled", true);
      }
    }
  };

  const catchCheckedKeys = () => {
    const keys = treeRef.value.getCheckedKeys();
    state.catchTreeCheckedKeys = keys.filter((el: string) => el);
  };

  const catchInitVisible = () => {
    for (const item of allChild.value) {
      const value = item.visible !== false;
      Reflect.set(state.catchVisible, item[nodeKey], value);
    }
  };

  const isAllChecked = computed(() => {
    return state.catchTreeCheckedKeys.length === allChild.value.length;
  });

  onMounted(() => {
    setTreeNodeSelect();
    setDisabled();
    catchCheckedKeys();
    catchInitVisible();
  });

  return {
    catchCheckedKeys,
    renderLabel,
    treeRef,
    state,
    allChild,
    isAllChecked,
    getAllChild
  };
};
