import { ref } from "vue";

export const useTable = () => {
  const pageSizes = [20, 50, 100, 200];
  const page = ref(1);
  const size = ref(pageSizes[0]);
  const layout = "total, sizes, prev, pager, next, jumper";
  const total = ref(0);

  return {
    pageSizes,
    page,
    size,
    layout,
    total
  };
};
