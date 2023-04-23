import type { Tree } from "types/Tree";
import { reactive, computed, onMounted, ref } from "vue";
import request from "api/systemMent";

export const useDeptTree = () => {
  const deptMethods = request.create("deptMent");
  const deptSearchValue = ref("");
  const state = reactive({
    deptTreeList: [],
    filterResult: []
  });

  const deptTreeList = computed(() => {
    return JSON.parse(JSON.stringify(state.deptTreeList));
  });

  const filterResult = computed(() => {
    return state.filterResult;
  });

  const getDeptList = async () => {
    const { deptTree } = await deptMethods.getDeptStructureList();
    state.deptTreeList = [...deptTree];
  };

  const DFSMethod = (node: Tree, result: Tree[][] = [], current: Tree[] = []) => {
    node.label && current.push(node);
    if (node.label && node?.children?.length) {
      node.children.forEach((v) => DFSMethod(v, result, current));
    } else {
      result.push([...current]);
    }
    node.label && current.pop();
    return result;
  };

  const getTreeFlatten = (): Tree[][] => {
    const result = [];
    for (let i = 0; i < deptTreeList.value.length; i++) {
      const item = deptTreeList.value[i];
      const itemAll = DFSMethod(item);
      result.push(...itemAll);
    }
    return result;
  };

  const filterFlattenList = (depts: Tree[][], value: string): Tree[] => {
    const result = [];
    for (let i = 0; i < depts.length; i++) {
      const deptItem = depts[i];
      const id = deptItem[deptItem.length - 1].id;
      const labels = deptItem.map((el) => el.label);
      const label = labels.join(">");
      const index = label.indexOf(value);
      if (index !== -1) {
        result.push({
          id,
          label
        });
      }
    }
    return result;
  };

  const onDeptInput = () => {
    const flattenDeptTree = getTreeFlatten();
    const result = filterFlattenList(flattenDeptTree, deptSearchValue.value);
    state.filterResult = result;
  };

  onMounted(() => {
    getDeptList();
  });

  return {
    onDeptInput,
    deptSearchValue,
    deptTreeList,
    filterResult
  };
};
