q<template>
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
                         content="Import Map"
                         placement="top">
                <ElButton text
                          type="primary"
                          size="small"
                          @click="onShowImportMap">
                  <ElIcon size="16">
                    <WorkspaceImport />
                  </ElIcon>
                </ElButton>
              </ElTooltip>
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
                           @change="onCodemirrorChange"
                           @save="onPlayComponent" />
            </ElScrollbar>
          </div>
        </div>
      </template>
      <template #review>
        <GSingleRenderView  ref="renderRef"/>
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

  <ElDrawer v-model="drawerRef"
            title="设置导入"
            :modal="false"
            :destroy-on-close="true">
    <ImportMap @close="drawerRef = false"
               @submit="onImportSubmit"
              ref="importMapRef"/>
  </ElDrawer>

</template>

<script setup lang="ts">
defineOptions({ name: "GSingleComponent" });
import { computed, ref, onMounted } from 'vue';
import { GSplitPane } from "grow_components";
import { GCodemirror } from "grow_editor";
import { defaultTemplate } from "../../static/tempalteStr";
import { PlayOutline, Add, WorkspaceImport } from "@vicons/carbon";

import ImportMap from "./components/ImportMap.vue";
import FileName from "./components/FileName.vue";
import GSingleRenderView from "../GSingleRenderView/GSingleRenderView.vue";

import { initView } from "./use/initView";
import { useTabsOption } from "./use/useTabsOption";
import { useEvent } from "./use/useEvent";
import { useDrawer } from "./use/useDrawer";

const codemirrorRef = ref();
const renderRef = ref();

const codeOptions = ref({
  files: { 'App.vue': defaultTemplate }
});

const options = computed(() => {
  return codeOptions.value;
});

const {
  treeData
} = initView();
const {
  tabsActive,
  tabsOptions,
  onTabChange,
  onTabsRemove
} = useTabsOption({
  codeOptions,
  options,
  codemirrorRef
});
const {
  onSubmit,
  onClose,
  onHandleTabsAdd,
  dialogVisible
} = useEvent({
  codeOptions,
  tabsActive,
  codemirrorRef
});
const {
  drawerRef,
  onShowImportMap,
  onImportSubmit,
  importMapRef,
  catchImportRef
} = useDrawer();

const onCodemirrorChange = ({ doc }) => {
  (options.value.files || {})[tabsActive.value] = doc || "";
};

const runOptions = computed(() => {
  const { files, imports = {} } = options.value;
  return {
    files,
    imports: {
      ...imports,
      ...catchImportRef.value
    }
  }
});

const onPlayComponent = async () => {
  renderRef!.value!.setCode(runOptions.value);
};

const setCode = async (option) => {
  codeOptions.value = option;
  await init();
};

const init = async () => {
  codemirrorRef.value!.setDoc(options.value.files[tabsActive.value]);
  await onPlayComponent();
}

onMounted(init);

defineExpose({
  setCode
});
</script>
