<template>
  <div class="flex">
    <template
      v-for="(item, index) of showBtns"
      :key="index"
    >
      <el-tooltip
        effect="dark"
        :content="item.title"
        placement="top"
      >
        <span class="pr-[10px]">
          <el-button
            link
            :type="item.type"
            :disabled="item.disabled ? item.disabled(data) : false"
            class="middle-btn"
            @click="onGroupClick(item)"
          >
            <template #icon>
              <el-icon size="19px">
                <component :is="item.icon" />
              </el-icon>
            </template>
            <span v-if="showText">
              {{ item.title }}
            </span>
          </el-button>
        </span>
      </el-tooltip>
    </template>
    <el-popover
      v-if="hidenBtns.length"
      v-model:visible="visible"
      trigger="click"
      placement="bottom-end"
    >
      <template #reference>
        <el-button link>
          <template #icon>
            <el-icon size="19px">
              <component :is="`MoreOutlined`" />
            </el-icon>
          </template>
        </el-button>
      </template>
      <div
        v-for="(item, index) of hidenBtns"
        :key="index"
        class="p-[10px]"
      >
        <el-button
          :type="item.type"
          link
          class="block w-full text-left middle-btn"
          :disabled="item.disabled ? item.disabled() : false"
          @click="onGroupClick(item)"
        >
          <template #icon>
            <el-icon
              size="19px"
              class="align-middle"
            >
              <component :is="item.icon" />
            </el-icon>
          </template>
          {{ item.title }}
        </el-button>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { GroupBtn } from "types/ButtonGroup";
import { computed, ref } from "vue";
import { useAuthorityStore } from "store/modules/authority";

const authorityStore = useAuthorityStore();
const visible = ref(false);

const authorityList = computed(() => {
  return authorityStore.authorityList;
});

interface propsType {
  buttonGroup: GroupBtn[];
  max: number;
  data?: any;
  showText?: boolean;
}

const props = defineProps<propsType>();

const buttonVisibles = computed(() => {
  return props.buttonGroup.filter((el) => { 
    let isShow = true;
    if (el.show) { 
      isShow = el.show(props.data);
    }
    return authorityList.value.includes(el.authority) && isShow;
  });
});

const showBtns = computed(() => {
  return buttonVisibles.value.filter((_, index) => index < props.max);
});

const hidenBtns = computed(() => {
  return buttonVisibles.value.filter((_, index) => index >= props.max);
});

const onGroupClick = (item: GroupBtn) => {
  item.func && item.func(props.data);
  visible.value = false;
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ButtonGroup",
});
</script>
