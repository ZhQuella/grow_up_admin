import type { ComputedRef, Ref } from "vue";
import type { DictItem } from "types/Dict";
import type { MenuItem } from "../types/index";
import { computed, ref, unref, onMounted, resolveComponent, h } from "vue";
import { Column } from "types/TableColumn";
import menuAxios from "api/systemMent";
import { ElTag } from "element-plus";

interface MenuRequest {
  getMenuDataList: (data: any) => Promise<any>;
}

interface Prop {
  page: Ref<number>;
  size: Ref<number>;
  menuTypeDicts: Ref<DictItem[]>;
  stateList: Ref<DictItem[]>;
}

export const useTableOption = ({ page, size, menuTypeDicts, stateList }: Prop) => {
  const menuRequest: MenuRequest = menuAxios.create("menuMent", ["getMenuDataList"]);
  const tableList: Ref<MenuItem[]> = ref([]);

  const tableColumns: ComputedRef<Column[]> = computed(() => [
    {
      field: "label",
      title: "菜单名称",
      showOverflowTooltip: true,
      minWidth: 220,
      fixed: "left"
    },
    {
      field: "menuType",
      title: "菜单类型",
      showOverflowTooltip: true,
      width: 120,
      formatter: (space: any): any[] => {
        const item: DictItem = menuTypeDicts.value.find(
          (el: DictItem): boolean => el.code === space.menuType
        );
        if (!item) return [];
        const type: "warning" | "" = ["warning", ""][Number(item.code)] as "" | "warning";
        return [<ElTag type={type}>{item.label}</ElTag>];
      }
    },
    {
      field: "icon",
      title: "图标",
      showOverflowTooltip: true,
      width: 80,
      formatter: (space: any): any[] => {
        return [<el-icon>{h(resolveComponent(space.icon))}</el-icon>];
      }
    },
    {
      field: "sort",
      title: "排序",
      showOverflowTooltip: true,
      width: 80
    },
    {
      field: "path",
      title: "路由地址",
      showOverflowTooltip: true,
      minWidth: 180
    },
    {
      field: "component",
      title: "组件路径",
      showOverflowTooltip: true,
      minWidth: 220
    },
    {
      field: "name",
      title: "组件名称",
      showOverflowTooltip: true,
      width: 320
    },
    {
      field: "hidden",
      title: "是否显示",
      showOverflowTooltip: true,
      width: 120,
      formatter: (space: any): any[] => {
        const type: "danger" | "success" = space.hidden ? "success" : "danger";
        const label: "隐藏" | "显示" = space.hidden ? "显示" : "隐藏";
        return [<ElTag type={type}>{label}</ElTag>];
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
  ]);

  const getMenuDataList = async () => {
    const data = {
      params: {
        page: unref(page),
        size: unref(size)
      }
    };
    const { menuList } = await menuRequest.getMenuDataList(data);
    tableList.value = [...menuList];
  };

  onMounted(async () => {
    await getMenuDataList();
  });

  return {
    tableColumns,
    tableList
  };
};
