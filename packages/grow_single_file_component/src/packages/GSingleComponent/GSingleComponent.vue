<template>
  <div class="h-full">
    <GSplitPane :treeData="treeData">
      <template #redact>
        <div class="flex flex-col h-full">
          <div class="flex justify-between grow-0 shrink-0 h-[40px] px-[10px]">
            <div class="flex-1">
              <ElTabs v-model="tabsActive"
                      @tab-change="onTabChange"
                      @tab-remove="onTabsRemove">
                <ElTabPane v-for="(item) of tabsOptions"
                           v-bind="item"
                           :closable="item.label !== 'App.vue'"
                           :key="item.label"></ElTabPane>
              </ElTabs>
            </div>
            <div class="py-[5px]">
              <ElTooltip effect="dark"
                         content="新增"
                         placement="top">
                <ElButton text type="primary" size="small" @click="onHandleTabsAdd">
                  <ElIcon size="16">
                    <Add />
                  </ElIcon>
                </ElButton>
              </ElTooltip>
              <ElTooltip effect="dark"
                        content="运行"
                        placement="top">
                <ElButton text
                          type="primary"
                          size="small"
                          class="ml-[2px]"
                          @click="onPlayComponent">
                  <ElIcon size="16">
                    <PlayOutline />
                  </ElIcon>
                </ElButton>
              </ElTooltip>
            </div>
          </div>
          <div class="flex-1 h-full">
            <ElScrollbar class="h-full">
              <GCodemirror defaultModel="vue"
                           ref="codemirrorRef"
                           isPure
                           @change="onCodemirrorChange"/>
            </ElScrollbar>
          </div>
        </div>
      </template>
      <template #review v-if="reloadVisible">
        <sfc />
      </template>
    </GSplitPane>
  </div>

  <ElDialog v-model="dialogVisible"
            :modal="false"
            destroy-on-close
            draggable
            width="300px"
            title="文件名称">
    <FileName @close="onClose"
              @submit="onSubmit"/>
  </ElDialog>
</template>

<script setup lang="ts">
defineOptions({ name: "GSingleComponent" });
import { defineAsyncComponent, onMounted, ref, nextTick } from 'vue';
import { GSplitPane } from "grow_components";
import { GCodemirror } from "grow_editor";
import { defineSFC } from "vue-sfc-component";
import { PlayOutline, Add } from "@vicons/carbon";

import FileName from "./components/FileName.vue";

import { initView } from "./use/initView";
import { useTabsOption } from "./use/useTabsOption";
import { useSFC } from "./use/useSFC";
import { useEvent } from "./use/useEvent";

const codemirrorRef = ref();
const reloadVisible = ref(true);

const {
  options
} = useSFC();
const {
  treeData
} = initView();
const {
  tabsActive,
  tabsOptions,
  onTabChange,
  onTabsRemove
} = useTabsOption({
  options,
  codemirrorRef
});
const {
  onSubmit,
  onClose,
  onHandleTabsAdd,
  dialogVisible
} = useEvent({
  options,
  tabsActive,
  codemirrorRef
});

let sfc = defineAsyncComponent(() => defineSFC('App.vue', options) as any);

const onCodemirrorChange = ({ doc }) => {
  options.files[tabsActive.value] = doc;
};

const onPlayComponent = async () => {
  reloadVisible.value = false;
  console.log(options);
  await nextTick();
  sfc = defineAsyncComponent(() => defineSFC('App.vue', options) as any);
  reloadVisible.value = true;
};

onMounted(() => {
  codemirrorRef.value.setDoc(options.files[tabsActive.value]);
});
</script>
