import { Ref } from "vue";

interface propsArg { 
  catchCheckedKeys:Fn
  allChild: any[],
  treeRef: any,
  state: any,
  getAllChild: Fn,
  emit: Fn,
  visible: Ref<boolean>
};

export const useEvent = ({ 
  catchCheckedKeys,
  allChild,
  treeRef,
  state,
  getAllChild,
  emit,
  visible
}: propsArg) => { 


  const onTreeChange = () => { 
    catchCheckedKeys();
  };

  const onAllSelectChange = (value: boolean) => { 
    if (value) {
      const keys = allChild.map(el => el.field);
      treeRef.value.setCheckedKeys(keys);
      state.catchTreeCheckedKeys = keys;
    }
    else { 
      const keys = allChild.filter(el => el.disabled).map(el => el.field);
      treeRef.value.setCheckedKeys(keys);
      state.catchTreeCheckedKeys = keys;
    }
  };

  const onSetColumns = () => { 
    const { treeData } = state;
    const keys = treeRef.value.getCheckedKeys();
    const allChild = getAllChild(treeData);
    setVisabled(keys, allChild);
  };

  const setVisabled = (keys: string[], allChild: any[]) => { 
    const columns = allChild.filter(el => el.field);
    for (let column of columns) { 
      const isIn = keys.includes(column.field);
      Reflect.set(column, "visible", isIn);
    };
    emit("confirm", [...columns]);
    visible.value = false;
  };

  const onResetColumns = () => { 
    const { treeData, catchVisible } = state;
    const allChild = getAllChild(treeData);
    const keys = Object.entries(catchVisible).filter(el => el[1]).map(el => el[0]);
    setVisabled(keys, allChild);
    treeRef.value.setCheckedKeys(keys);
    visible.value = false;
  };

  return {
    onTreeChange,
    onAllSelectChange,
    onSetColumns,
    onResetColumns
  };
};
