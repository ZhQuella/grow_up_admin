<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item) of state.breadcrumbMap"
                      :key="item.name">
      {{ item.label }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import type { MenuType } from "types/menu";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { useRouter } from "vue-router";
import { computed, unref, watch, reactive, nextTick } from "vue";
import { useMenuStore } from "store/modules/menu";
import { useMultipleTab } from "store/modules/multipleTab";

const menuStore = useMenuStore();
const multipleTab = useMultipleTab();
const { currentRoute } = useRouter();

const state = reactive<any>({
  breadcrumbMap: []
});

const visitedViews = computed(() => {
  return multipleTab.getVisitedViews;
});

const resetMenuOption = (menuList: MenuType[]): any[] => {
  return [...menuList].map((el): any => { 
    const { label, name, children } = el;
    const menu = {
      label,
      name
    };
    if (children) { 
      const childs = resetMenuOption(children) as never[];
      Reflect.set(menu, "children", childs);
    };
    return menu;
  });
};

const getPathById = (tree: any[], target: RouteLocationNormalizedLoaded):any[]  => {
  if (!tree.length) { 
    return [];
  };
  const targetData:any = {};
  const loops = (data:any[] = [], parent?: any) => {
    return data.map((item: any) => {
      const node: any = {
        item,
        parent
      };
      targetData[item.name] = node;
      node.children = loops(item.children, node);
      return;
    });
  };

  const getNode = (target: any): any => {
    let node: any = [];
    let currentNode = targetData[target.name];
    if (!currentNode) return node;
    node.push(currentNode.item);
    if (currentNode.parent) {
      node = [...getNode(currentNode.parent.item), ...node];
    }
    return node;
  }
  loops(tree as any);
  const result = getNode(target);
  return result;
};

const allMenuList = computed(() => {
  return resetMenuOption(menuStore.allMenuList);
});

watch(() => unref(currentRoute), async (newValue) => {
  const allMenu = unref(allMenuList);
  const result = getPathById(allMenu, newValue);
  await nextTick();
  if (!result.length) { 
    let catchList = unref(visitedViews);
    const tabItem = catchList.find(el => el.fullPath === newValue.fullPath);
    if (tabItem) { 
      result.push({
        label: tabItem?.meta?.label,
        name: tabItem?.meta?.componentName,
      });
    }
  };
  state.breadcrumbMap = result;
}, {
  immediate: true
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NavigationPath"
});
</script>
