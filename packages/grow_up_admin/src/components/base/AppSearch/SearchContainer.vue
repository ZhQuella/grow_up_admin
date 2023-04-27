<template>
  <div class="min-h-[100px]">
    <div v-if="state.filterList.length">
      <router-link
        v-for="item of state.filterList"
        :key="item.label"
        :to="{
          path: `/home/${item.path}`
        }"
        class="block mb-[5px] text-[14px] leading-[40px] p-[5px] overflow-hidden border-solid border-[1px] rounded-[4px] border-gray-300 text-gray-500 hover:bg-sky-700 hover:text-gray-300 transition-all"
        @click="onSelect"
      >
        {{ item.label }}
      </router-link>
    </div>
    <p v-else class="leading-[100px] text-center text-[12px] text-gray-400">
      {{ $t("APP_SEARCH.NOT_SEARCH_DATA") }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { MenuType } from "types/menu";
import { watch, toRefs, unref, reactive } from "vue";
import { useMenuStore } from "store/modules/menu";
import { debounce } from "util/index";

const debounceFn = debounce(200);

const { menuList } = useMenuStore();

const props = defineProps({
  searchValue: {
    type: String,
    default: ""
  }
});
const emit = defineEmits(["select"]);

const state = reactive<{
  filterList: MenuType[];
}>({
  filterList: []
});

const onSelect = () => {
  emit("select");
};

const { searchValue } = toRefs(props);

const filterMenuList = (menuList: MenuType[], value: string): MenuType[] => {
  const flareoutMenus = [];
  for (let i = 0, item; (item = menuList[i++]); ) {
    const flareoutMenu = DFSMethod(item);
    flareoutMenus.push(...flareoutMenu);
  }
  const beforeFilterMenus = joinMenus(flareoutMenus);
  const result = filterMenu(beforeFilterMenus, value);
  return result;
};

const joinMenus = (fileMenus: MenuType[][]): MenuType[] => {
  return fileMenus.map((el: MenuType[]) => {
    const label = el.map((ele) => ele.label).join(" > ");
    return {
      ...el[el.length - 1],
      label
    };
  }) as MenuType[];
};

const filterMenu = (filterMenus: MenuType[], value: string): MenuType[] => {
  return filterMenus.filter((ele) => {
    let { label } = ele;
    label = label.split(" > ").join("");
    const reg = new RegExp(value, "i");
    return reg.test(label);
  });
};

const DFSMethod = (node: MenuType, result: MenuType[][] = [], current: MenuType[] = []) => {
  node.name && current.push(node);
  if (node.name && node?.children?.length) {
    node.children.forEach((v) => DFSMethod(v, result, current));
  } else {
    result.push([...current]);
  }
  node.name && current.pop();
  return result;
};

watch(searchValue, async () => {
  await debounceFn();
  if (!searchValue.value) {
    state.filterList = [];
    return;
  }
  const value = unref(searchValue);
  const result = filterMenuList(menuList, value);
  state.filterList = result;
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchContainer"
});
</script>
