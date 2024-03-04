import type { ComputedRef, Ref } from "vue"
import type { DictItem } from "types/Dict"
import type { DictsItem } from "../types/index"
import { computed, ref, unref, onMounted, resolveComponent, h } from "vue"
import { Column } from "types/TableColumn"
import dictAxios from "api/systemMent"
import { ElTag } from "element-plus"



interface DictRequest {
  getDictDataList: (data: any) => Promise<any>
};


interface Prop {
  page: Ref<number>;
  size: Ref<number>;
  DictTypeDicts: Ref<DictItem[]>;
  stateList: Ref<DictItem[]>
}


export const useTableOption = ({
  page,
  size,
  DictTypeDicts,
  stateList
}: Prop) => {

  const dictRequest: DictRequest = dictAxios.create("dictMent", ["getDictDataList"]);
  const tableList: Ref<DictsItem[]> = ref([]);

  const tableColumns: ComputedRef<Column[]> = computed(() => [
    {
      field: "label",
      title: "字典名称",
      showOverflowTooltip: true,
      minWidth: 220,
      fixed: "left"
    },
    {
      field: "menuType",
      title: "字典类型",
      showOverflowTooltip: true,
      width: 120,
      formatter: (space: any): any[] => {
        const item: DictItem = DictTypeDicts.value.find(
          (el: DictItem): boolean => el.code === space.menuType
        );
        if (!item) return [];
        const type: "warning" | "" = ["warning", ""][Number(item.code)] as
          | ""
          | "warning";
        return [<ElTag type={type}>{item.label}</ElTag>];
      }
    },
    {
      field: "state",
      title: "状态",
      showOverflowTooltip: true,
      width: 120,
      formatter: (space: any): any[] => {
        const item: DictItem = stateList.value.find(
          (el: DictItem): boolean => el.code === space.state
        );
        if (!item) return [];
        const type: "danger" | "success" = ["danger", "success"][Number(item.code)] as
          | "success"
          | "danger";
        return [<ElTag type={type}>{item.label}</ElTag>];
      }
    },
    {
      field: "createTime",
      title: "创建时间",
      showOverflowTooltip: true,
      width: 220
    },
    {
      field: "operate",
      title: "操作",
      fixed: "right",
      width: 200
    }

  ])

  const getMenuDataList = async () => {
    const data = {
      params: {
        page: unref(page),
        size: unref(size)
      }
    };
    const { dictList } = await dictRequest.getDictDataList(data);
    tableList.value = [...dictList];
  };
  onMounted(async () => {
    await getMenuDataList();
    
  })

  return {
    tableColumns,
    tableList
  };
}