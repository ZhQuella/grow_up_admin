<template>
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
</template>

<script setup lang="ts">
import { h } from "vue";
import iconMap from "@/assets/icon";
import { useNaiveUI } from "hooks/useGrow";

const { renderIcon } = useNaiveUI();

const getIcon = (icon: string) => {
  return Reflect.get(iconMap, icon);
};

interface props { 
  menuList: any[],
  collapsed: boolean;
};

defineProps<props>();

const getComponentName = (item: any): string => {
  console.log(item);
  return item.children?'ElSubMenu':'ElMenuItem';
};
</script>

<script lang="ts">
import { ElSubMenu } from "element-plus";
import { defineComponent } from "vue";
export default defineComponent({
  name: "MenuItem",
  components: { ElSubMenu }
});
</script>