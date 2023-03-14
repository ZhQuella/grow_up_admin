<template>
  <ElDropdown :trigger="trigger"
              popper-class="v-context-menu-popper"
              placement="bottom-start"
              ref="elDropdownMenuRef"
              class="w-full h-full"
              @command="onDropdownCommand"
              @visible-change="visibleChange">
    <slot></slot>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="(item) of contextMenuOptions"
                        :key="item.key"
                        :divided="item.divided"
                        :disabled="item.disabled"
                        :command="item">
          <component :is="item.icon" 
                    class="w-[15px] h-[15px] mr-[4px]"/> 
          <span>{{ item.label }}</span>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
import type { contextMenuSchema } from "types/contextMenu";
import type { PropType } from 'vue';
import { useContextMenu } from "./use/useContextMenu";

const props = defineProps({
  trigger: {
    type: String as PropType<'click' | 'hover' | 'focus' | 'contextmenu'>,
    default: 'contextmenu'
  },
  tagItem: {
    type: Object,
    default: () => ({})
  },
  curRoute: {
    type: Object,
    default: () => ({})
  }
});

const { contextMenuOptions } = useContextMenu(props);

const emit = defineEmits(["select","visibleChange"]);

const onDropdownCommand = (value: contextMenuSchema) => { 
  emit("select", value.key)
};

const visibleChange = (visible: boolean) => {
  emit('visibleChange', visible, props.tagItem);
}
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ContextMenu"
});
</script>