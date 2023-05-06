import type { Ref } from "vue";
import { ref } from "vue";


interface Prop {
  getRoleList: Fn;
  page: Ref<number>;
  size: Ref<number>;
}

export const useTableFunc = ({ 
  getRoleList,
  page,
  size
}: Prop) => { 

  const tableRef = ref(null);


  const onCurrentChange = (_page: number) => {
    page.value = _page;
    getRoleList();
  };

  const onSizeChange = (_size: number) => { 
    size.value = _size;
    page.value = 1;
    getRoleList();
  };

  return {
    onCurrentChange,
    onSizeChange,
    tableRef
  };
};
