import type { Ref } from "vue";
import { ref, computed } from "vue";

interface argProp { 
  onlyKey: string;
  emit: any,
  state: any
};

export const useEvent = ({ 
  onlyKey,
  emit,
  state
}: argProp) => { 

  const mouseKey = ref("");
  const selectData:Ref<any[]> = ref([]);

  const onRowMouseEnter = (row: any, column: any, cell:any, event: Event) => { 
    mouseKey.value = row[onlyKey];
  };

  const onRowMouseLeave = () => { 
    mouseKey.value = "";
  };

  const selectOnlyKeys = computed(() => { 
    return selectData.value.map(el => el[onlyKey]);
  });

  const onTableCheckboxSelect = (value: boolean, rowConfig: any) => { 
    const { row } = rowConfig;
    const cellValue = row[onlyKey];
    if (value) { 
      selectData.value.push(row);
    }
    else { 
      const index = selectData.value.findIndex((val) => val[onlyKey] === cellValue);
      if (index !== -1) { 
        selectData.value.splice(index, 1);
      }
    };
    emit("select", [...selectData.value]);
  };

  const rowClassName = ({ row }: any): string => { 
    if (!row) return "";
    const isSelect = selectOnlyKeys.value.includes(row[onlyKey]);
    return isSelect ? "tr-selected" : "";
  };

  const setColumns = (columns: any[]) => { 
    state.columns = columns;
  };

  return {
    mouseKey,
    selectOnlyKeys,
    onRowMouseEnter,
    onRowMouseLeave,
    onTableCheckboxSelect,
    rowClassName,
    setColumns
  };

};
