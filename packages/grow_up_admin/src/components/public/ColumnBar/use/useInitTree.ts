import type { Ref } from "vue";
import { computed, ref, reactive, watch, nextTick } from "vue";
import { deepCopy } from "util/index";

interface initProps {
  columns: Ref<any[]>;
  nodeKey: Ref<string>;
}

export const useInitTree = ({ columns, nodeKey }: initProps) => {
  const treeRef = ref();
  const state = reactive({
    catchTreeCheckedKeys: [],
    catchVisible: {},
    treeData: []
  });

  watch(
    () => columns.value,
    async (newValue: any) => {
      await nextTick();
      state.treeData = deepCopy(newValue);
      setTreeNodeSelect();
      setDisabled();
      catchCheckedKeys();
      catchInitVisible();
    },
    {
      immediate: true,
      deep: true
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
    const visible = allChild
      .filter((el) => el.visible !== false && el[nodeKey.value])
      .map((el) => el[nodeKey.value]);
    treeRef.value && treeRef.value.setCheckedKeys(visible);
  };

  const setDisabled = () => {
    const allColumns = getAllChild(state.treeData);
    for (const item of allColumns) {
      if (["operate", "serial"].includes(item[nodeKey.value])) {
        Reflect.set(item, "disabled", true);
      }
    }
  };

  const catchCheckedKeys = async () => {
    await nextTick();
    const keys = treeRef.value.getCheckedKeys();
    state.catchTreeCheckedKeys = keys.filter((el: string) => el);
  };

  const catchInitVisible = () => {
    for (const item of allChild.value) {
      const value = item.visible !== false;
      Reflect.set(state.catchVisible, item[nodeKey.value], value);
    }
  };

  const isAllChecked = computed(() => {
    return state.catchTreeCheckedKeys.length === allChild.value.length;
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
