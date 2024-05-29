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
      <template #review>
        todo<br/>
        生产环境有问题，暂时不知道什么原因，待修复
        <div id="single-com" class="h-full"></div>
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
import { defineAsyncComponent, onMounted, ref, createApp } from 'vue';
import { GSplitPane } from "grow_components";
import { GCodemirror } from "grow_editor";
import { defineSFC } from "vue-sfc-component";
import { PlayOutline, Add } from "@vicons/carbon";

import FileName from "./components/FileName.vue";

import { initView } from "./use/initView";
import { useTabsOption } from "./use/useTabsOption";
import { useSfcOption } from "./use/useSfcOption";
import { useEvent } from "./use/useEvent";

const randomLetter = (length = 10)  => {
  let result = '';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lettersLength = letters.length;
  for (let i = 0; i < length; i++) {
    result += letters[Math.floor(Math.random() * lettersLength)];
  }
  return result;
};

const wrapId = randomLetter();
const codemirrorRef = ref();

const {
  options
} = useSfcOption();
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

// let sfc = defineAsyncComponent(() => defineSFC('App.vue', options) as any);

const onCodemirrorChange = ({ doc }) => {
  options.files[tabsActive.value] = doc;
};

const resetEle = () => {
  const parent = document!.getElementById("single-com")!;
  parent.innerHTML = "";
  const oDiv = document.createElement("div");
  oDiv.setAttribute("id", wrapId);
  parent.appendChild(oDiv);
};

const onPlayComponent = async () => {
  resetEle();
  console.log(options);
  const app = createApp({
    components: {
      'sfc-component': defineAsyncComponent(() => defineSFC('App.vue', options) as any),
    },
    template: `<sfc-component></sfc-component>`
  });
  app.mount(`#${wrapId}`);
};

onMounted(() => {
  codemirrorRef.value.setDoc(options.files[tabsActive.value]);
  resetEle();
  onPlayComponent();
});
</script>
