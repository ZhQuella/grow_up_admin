<template>
  <el-menu :default-active="menuActiveKey"
          router
          size="samll"
          :mode="menuMode"
          :collapse="collapsed"
          :class="{
            'h-[49px]': isRoof,
            'bg-transparent': isRoof,
            'border-none': isRoof
          }"
          :unique-opened="true"
          v-if="menuList.length">
    <template v-for="(item) of menuList"
    :key="item.name">
      <ElMenuItem v-if="!item.children" :index="item.name">
          <el-icon>
            <component :is="item.icon"/>
          </el-icon>
          <span>{{ item.label }}</span>
        </ElMenuItem>
        <el-sub-menu v-else :index="item.label">
          <template #title>
            <el-icon>
              <component :is="item.icon"/>
            </el-icon>
            <span>{{ item.label }}</span>
          </template>
          <MenuItem :menuList="item.children" collapsed/>
        </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import MenuItem from "./MenuItem.vue";
import { useResizeEle } from "./use/useResizeEle";
import { useOptions } from "./use/useOptions";

const {
  menuList,
  menuActiveKey
} = useOptions();

const {
  collapsed,
  menuMode,
  isRoof
} = useResizeEle();
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Menu"
});
</script>